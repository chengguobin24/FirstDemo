"use client";

import { FormEvent, useRef, useState } from "react";
import { TurnstileWidget } from "@/components/TurnstileWidget";

type Status = { type: "idle" | "sending" | "success" | "error"; message: string };

export function InquiryForm() {
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("startedAt", String(startedAt.current));
    const attachment = data.get("attachment");
    if (attachment instanceof File && attachment.size > 10 * 1024 * 1024) { setStatus({ type: "error", message: "The attachment must be 10 MB or smaller." }); return; }
    setStatus({ type: "sending", message: "Sending your project request…" });
    try {
      const response = await fetch("/api/inquiry", { method: "POST", body: data });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "The request could not be sent.");
      setStatus({ type: "success", message: "Thank you. Your request has been sent to our export team." });
      form.reset();
      startedAt.current = 0;
    } catch (error) { setStatus({ type: "error", message: error instanceof Error ? error.message : "The request could not be sent." }); }
  }

  return (
    <form className="inquiry-form" onSubmit={submit} onFocusCapture={() => { if (!startedAt.current) startedAt.current = Date.now(); }} encType="multipart/form-data">
      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" type="text" required autoComplete="name" /></div>
      <div className="field"><label htmlFor="company">Company *</label><input id="company" name="company" type="text" required autoComplete="organization" /></div>
      <div className="field"><label htmlFor="email">Business email *</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
      <div className="field"><label htmlFor="country">Country / region *</label><input id="country" name="country" type="text" required autoComplete="country-name" /></div>
      <div className="field"><label htmlFor="product">Product interest *</label><select id="product" name="product" required defaultValue=""><option value="" disabled>Select a system</option><option>Aluminum Fence</option><option>Aluminum Gate</option><option>Aluminum Pergola</option><option>Multiple Products</option><option>OEM / ODM Program</option></select></div>
      <div className="field full"><label htmlFor="message">Dimensions, quantity and project details *</label><textarea id="message" name="message" rows={6} required /></div>
      <div className="field full"><label htmlFor="attachment">Attach drawing or reference</label><input id="attachment" name="attachment" type="file" accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.webp" /><small>PDF, DWG, DXF, JPG, PNG or WebP · maximum 10 MB</small></div>
      <label className="consent full"><input type="checkbox" name="consent" value="yes" required /><span>I agree that JUNSU may use this information to respond to my project inquiry. *</span></label>
      <TurnstileWidget />
      <button className="submit-button full" type="submit" disabled={status.type === "sending"}>{status.type === "sending" ? "Sending…" : "Send project request"}<span aria-hidden="true">↗</span></button>
      <p className={`form-status full ${status.type}`} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
