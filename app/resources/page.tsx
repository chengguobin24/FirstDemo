import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/site-data";

export const metadata: Metadata = { title: "Resources, Downloads & FAQ", description: "Request catalogs, specifications and installation references for JUNSU aluminum systems.", alternates: { canonical: "/resources" } };

const resources = [
  ["Product catalog", "Fence, gate and pergola system overview", "Catalog file pending approval"],
  ["Specification sheets", "Configuration and option references", "Technical files pending approval"],
  ["Installation references", "Project preparation and installation guidance", "Documents supplied by confirmed system"],
];

export default function ResourcesPage() {
  return <><section className="page-hero"><p className="kicker ink">Resource center</p><h1>Information for<br /><em>better project decisions.</em></h1><p>Request the documents relevant to your market or project. Approved public downloads will be added when final files are available.</p></section><section className="page-section alt"><div className="content-grid">{resources.map(([title, copy, status], index) => <article className="content-card" key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p><b>{status}</b><div style={{marginTop:24}}><Link className="text-link dark-text" href={`/contact?resource=${encodeURIComponent(title)}`}>Request document ↗</Link></div></article>)}</div></section><section className="page-section"><div className="two-column"><div><p className="kicker ink">Frequently asked questions</p><h2>Before you send a brief.</h2></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></div></section></>;
}
