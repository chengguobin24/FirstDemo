import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = { title: "Request a Quote", description: "Send dimensions, drawings and project requirements to the JUNSU export team.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <><section className="page-hero"><p className="kicker ink">Start a project</p><h1>Tell us what<br /><em>you need to deliver.</em></h1><p>Share dimensions, quantity, application, destination and reference files. The export team will review the available information before responding.</p></section><section className="contact-layout"><div className="contact-intro"><p className="kicker">Project inquiry</p><h2>Useful details create a faster quotation.</h2><p>For drawing-based requests, attach a PDF, DWG or DXF file. For large files, mention that a cloud link is available and the team can request it in the reply.</p><div className="contact-note"><strong>Response target</strong><p>Initial response within one business day. Technical review may require additional time.</p></div><div className="contact-note"><strong>Direct contact details</strong><p>Verified email, phone, WhatsApp and factory address are required before public launch.</p></div></div><InquiryForm /></section></>;
}
