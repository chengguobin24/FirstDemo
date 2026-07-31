import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "dwg", "dxf", "jpg", "jpeg", "png", "webp"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_ACTION = "turnstile-spin-v2";

function value(data: FormData, name: string) {
  return String(data.get(name) || "").trim();
}

function safeText(text: string, max = 5000) {
  return text.replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, max);
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character] || character));
}

async function verifyTurnstile(token: string, ip: string | null, expectedHostname: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token || token.length > 2048) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!response.ok) return false;
    const result = await response.json() as { success?: boolean; action?: string; hostname?: string };
    return result.success === true
      && result.action === TURNSTILE_ACTION
      && (process.env.NODE_ENV !== "production" || result.hostname === expectedHostname);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== requestUrl.host) return NextResponse.json({ message: "This request was blocked." }, { status: 403 });

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_ATTACHMENT_BYTES + 100_000) return NextResponse.json({ message: "The submitted file is too large." }, { status: 413 });

  let data: FormData;
  try { data = await request.formData(); } catch { return NextResponse.json({ message: "The submitted form could not be read." }, { status: 400 }); }
  if (value(data, "website")) return NextResponse.json({ ok: true });

  const startedAt = Number(value(data, "startedAt"));
  if (!startedAt || Date.now() - startedAt < 1500) return NextResponse.json({ message: "Please review the form and try again." }, { status: 400 });

  const fields = {
    name: safeText(value(data, "name"), 120),
    company: safeText(value(data, "company"), 180),
    email: safeText(value(data, "email"), 200),
    phone: safeText(value(data, "phone"), 80),
    country: safeText(value(data, "country"), 120),
    product: safeText(value(data, "product"), 120),
    installationDimensions: safeText(value(data, "installationDimensions"), 240),
    roofType: safeText(value(data, "roofType"), 120),
    operation: safeText(value(data, "operation"), 120),
    message: safeText(value(data, "message")),
  };

  if (!fields.name || !fields.company || !fields.email || !fields.country || !fields.product || !fields.message) return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  if (value(data, "inquiryContext") === "pergola-detail" && (!fields.installationDimensions || !fields.roofType || !fields.operation)) return NextResponse.json({ message: "Please complete the pergola configuration fields." }, { status: 400 });
  if (!EMAIL_PATTERN.test(fields.email)) return NextResponse.json({ message: "Please enter a valid business email." }, { status: 400 });

  const ip = request.headers.get("CF-Connecting-IP");
  if (!await verifyTurnstile(value(data, "cf-turnstile-response"), ip, requestUrl.hostname)) return NextResponse.json({ message: "Security verification failed. Please try again." }, { status: 403 });

  const attachment = data.get("attachment");
  let emailAttachment: { filename: string; content: string } | undefined;
  if (attachment instanceof File && attachment.size > 0) {
    const extension = attachment.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.has(extension)) return NextResponse.json({ message: "This attachment type is not supported." }, { status: 400 });
    if (attachment.size > MAX_ATTACHMENT_BYTES) return NextResponse.json({ message: "The attachment must be 10 MB or smaller." }, { status: 413 });
    emailAttachment = { filename: attachment.name.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 180), content: Buffer.from(await attachment.arrayBuffer()).toString("base64") };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return NextResponse.json({ message: "Inquiry delivery is being configured. Please use the direct contact details shown on this page." }, { status: 503 });

  const rows = Object.entries(fields).map(([label, entry]) => `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(entry)}</td></tr>`).join("");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: fields.email,
      subject: `[JUNSU inquiry] ${fields.product} — ${fields.company}`,
      html: `<h1>New website inquiry</h1><table style="border-collapse:collapse;width:100%">${rows}</table>`,
      attachments: emailAttachment ? [emailAttachment] : undefined,
      headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
    }),
  });

  if (!response.ok) {
    console.error("Inquiry email provider returned", response.status);
    return NextResponse.json({ message: "Your request could not be delivered. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

export function GET() { return NextResponse.json({ message: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } }); }
