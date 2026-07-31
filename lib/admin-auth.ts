import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

export interface AdminIdentity {
  email: string;
  mode: "development" | "cloudflare-access" | "password";
}

type HeaderReader = Pick<Headers, "get">;

export const ADMIN_SESSION_COOKIE = "junsu_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
const encoder = new TextEncoder();

function normalizedTeamDomain(): string {
  return (process.env.CF_ACCESS_TEAM_DOMAIN || "").replace(/\/+$/, "");
}

function allowedEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

function jwtAudienceIncludes(payload: JWTPayload, expected: string): boolean {
  return Array.isArray(payload.aud)
    ? payload.aud.includes(expected)
    : payload.aud === expected;
}

function base64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function adminPasswordKey(): Promise<CryptoKey | null> {
  const password = process.env.ADMIN_PASSWORD || "";
  if (!password) return null;
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signSession(expiresAt: number): Promise<string | null> {
  const key = await adminPasswordKey();
  if (!key) return null;
  const payload = `admin:${expiresAt}`;
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${expiresAt}.${base64Url(new Uint8Array(signature))}`;
}

async function verifySessionToken(token: string): Promise<boolean> {
  const key = await adminPasswordKey();
  if (!key) return false;

  const [expiresAtRaw, signature] = token.split(".");
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt || !signature) {
    return false;
  }

  const expected = await signSession(expiresAt);
  return expected === token;
}

function readCookie(headers: HeaderReader, name: string): string {
  const cookie = headers.get("cookie") || "";
  return cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1) || "";
}

export async function createAdminSessionToken(): Promise<string | null> {
  return signSession(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
}

export function adminSessionMaxAge(): number {
  return SESSION_MAX_AGE_SECONDS;
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function isValidAdminPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD || "";
  return Boolean(configured) && password === configured;
}

export async function getAdminIdentity(
  headers: HeaderReader,
): Promise<AdminIdentity | null> {
  if (process.env.NODE_ENV !== "production") {
    return {
      email: "local-admin@junsu.dev",
      mode: "development",
    };
  }

  const passwordSession = readCookie(headers, ADMIN_SESSION_COOKIE);
  if (passwordSession && await verifySessionToken(passwordSession)) {
    return {
      email: "password-admin@junsu.local",
      mode: "password",
    };
  }

  const configuredHost = (process.env.ADMIN_HOST || "").toLowerCase();
  const requestHost = (headers.get("x-forwarded-host") || headers.get("host") || "")
    .split(":")[0]
    .toLowerCase();
  if (configuredHost && requestHost !== configuredHost) {
    return null;
  }

  const teamDomain = normalizedTeamDomain();
  const audience = process.env.CF_ACCESS_AUD || "";
  const token = headers.get("cf-access-jwt-assertion") || "";
  if (!teamDomain || !audience || !token) {
    return null;
  }

  try {
    let jwks = jwksCache.get(teamDomain);
    if (!jwks) {
      jwks = createRemoteJWKSet(
        new URL(`${teamDomain}/cdn-cgi/access/certs`),
      );
      jwksCache.set(teamDomain, jwks);
    }

    const { payload } = await jwtVerify(token, jwks, {
      issuer: teamDomain,
      audience,
    });
    if (!jwtAudienceIncludes(payload, audience)) return null;

    const email =
      typeof payload.email === "string" ? payload.email.toLowerCase() : "";
    const allowed = allowedEmails();
    if (!email || allowed.size === 0 || !allowed.has(email)) {
      return null;
    }

    return { email, mode: "cloudflare-access" };
  } catch {
    return null;
  }
}

export async function requireAdminRequest(
  request: Request,
): Promise<AdminIdentity> {
  const identity = await getAdminIdentity(request.headers);
  if (!identity) {
    throw new AdminAuthorizationError();
  }
  return identity;
}

export class AdminAuthorizationError extends Error {
  constructor() {
    super("Administrator access is required.");
    this.name = "AdminAuthorizationError";
  }
}
