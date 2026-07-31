"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/TurnstileWidget";

type Status = { type: "idle" | "sending" | "success" | "error"; message: string };

export function InquiryForm({ variant = "default", productDefault = "", pergolaProject = false }: { variant?: "default" | "original"; productDefault?: string; pergolaProject?: boolean }) {
  const startedAt = useRef(0);
  const turnstile = useRef<TurnstileWidgetHandle>(null);
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const handleVerifiedChange = useCallback((nextVerified: boolean) => setVerified(nextVerified), []);

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
    finally { turnstile.current?.reset(); }
  }

  return (
    <form className={`inquiry-form${variant === "original" ? " original-inquiry" : ""}`} onSubmit={submit} onFocusCapture={() => { if (!startedAt.current) startedAt.current = Date.now(); }} encType="multipart/form-data">
      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {pergolaProject && <input type="hidden" name="inquiryContext" value="pergola-detail" />}
      <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" type="text" required autoComplete="name" /></div>
      <div className="field"><label htmlFor="company">Company *</label><input id="company" name="company" type="text" required autoComplete="organization" /></div>
      <div className="field"><label htmlFor="email">Business email *</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
      <input type="hidden" name="country" value="Not specified" />
      <input type="hidden" name="product" value={productDefault || "General project inquiry"} />
      {pergolaProject && <><div className="field"><label htmlFor="installationDimensions">Installation dimensions *</label><input id="installationDimensions" name="installationDimensions" type="text" required placeholder="Length × width or available area" /></div><div className="field"><label htmlFor="roofType">Preferred roof type *</label><select id="roofType" name="roofType" required defaultValue=""><option value="" disabled>Select a roof type</option><option>Rotating louver roof</option><option>Retractable louver roof</option><option>Custom fixed roof request</option><option>Need a recommendation</option></select></div><div className="field"><label htmlFor="operation">Opening method *</label><select id="operation" name="operation" required defaultValue=""><option value="" disabled>Select an opening method</option><option>Manual operation</option><option>Electric operation</option><option>Need a recommendation</option></select></div></>}
      <div className="field full"><label htmlFor="message">{pergolaProject ? "Quantity, accessories and project details *" : "Dimensions, quantity and project details *"}</label><textarea id="message" name="message" rows={2} required placeholder={pergolaProject ? "Tell us the quantity, colour, accessories, mounting conditions and any other requirements." : "Tell us the application, dimensions, quantity, finish and destination."} /></div>
      <div className="field full"><label htmlFor="attachment">{pergolaProject ? "Attach a site photo, drawing or reference" : "Attach drawing or reference"}</label><input id="attachment" name="attachment" type="file" accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.webp" /><small>PDF, DWG, DXF, JPG, PNG or WebP · maximum 10 MB</small></div>
      <TurnstileWidget ref={turnstile} onVerifiedChange={handleVerifiedChange} />
      <button className="submit-button full" type="submit" disabled={status.type === "sending" || !verified}>{status.type === "sending" ? "Sending…" : verified ? "Send project request" : "Completing security check…"}<span aria-hidden="true">↗</span></button>
      <p className={`form-status full ${status.type}`} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
