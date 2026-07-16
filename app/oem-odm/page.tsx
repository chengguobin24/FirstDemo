import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "OEM / ODM Aluminum Systems", description: "A drawing-led OEM and ODM workflow for custom aluminum exterior systems.", alternates: { canonical: "/oem-odm" } };

const stages = [
  ["Requirement", "Market, product, application, target dimensions and commercial expectations."],
  ["Engineering review", "Profiles, interfaces, finish, hardware and installation conditions."],
  ["Sample confirmation", "Physical sample, color reference or prototype when required."],
  ["Production", "Confirmed specification, documented checks and order coordination."],
  ["Delivery preparation", "Packaging, labels, document set and installation references."],
];

export default function OemPage() {
  return <><section className="page-hero"><p className="kicker ink">OEM / ODM</p><h1>From market requirement<br /><em>to repeatable system.</em></h1><p>A structured development path for distributors and project partners who need more than an off-the-shelf product.</p><div className="hero-actions"><Link className="button dark" href="/contact">Start an OEM / ODM brief</Link></div></section><section className="page-section dark"><div className="two-column"><div><p className="kicker">Development workflow</p><h2>Five confirmation stages.</h2><p style={{color:"rgba(255,255,255,.6)"}}>No production claim is made before drawings, samples and order requirements are confirmed.</p></div><ol className="numbered-list">{stages.map(([title, copy], index) => <li key={title} style={{borderColor:"rgba(255,255,255,.2)"}}><span>0{index + 1}</span><div><h3>{title}</h3><p style={{color:"rgba(255,255,255,.6)"}}>{copy}</p></div></li>)}</ol></div></section></>;
}
