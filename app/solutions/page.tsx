import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/lib/site-data";

export const metadata: Metadata = { title: "B2B Project Solutions", description: "Support models for distributors, contractors and architectural projects.", alternates: { canonical: "/solutions" } };

export default function SolutionsPage() {
  return <><section className="page-hero"><p className="kicker ink">B2B solutions</p><h1>Support shaped around<br /><em>how you deliver.</em></h1><p>Different partners need different documents, review steps and delivery preparation. Choose the workflow closest to your role.</p></section><section className="page-section dark"><div className="solution-grid">{solutions.map((solution, index) => <Link href={`/solutions/${solution.slug}`} className="solution-card" key={solution.slug}><span>0{index + 1}</span><h3>{solution.name}</h3><p>{solution.summary}</p><b>Explore solution ↗</b></Link>)}</div></section></>;
}
