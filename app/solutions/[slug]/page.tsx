import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions } from "@/lib/site-data";

export function generateStaticParams() { return solutions.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  return solution ? { title: solution.name, description: solution.summary, alternates: { canonical: `/solutions/${solution.slug}` } } : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) notFound();
  return <><section className="page-hero"><div className="breadcrumb"><Link href="/solutions">Solutions</Link> / {solution.name}</div><p className="kicker ink">Project support model</p><h1>{solution.name}</h1><p>{solution.summary}</p><div className="hero-actions"><Link className="button dark" href="/contact">Discuss your program</Link></div></section><section className="page-section alt"><div className="two-column"><div><p className="kicker ink">What we coordinate</p><h2>A clear route from inquiry to delivery.</h2></div><ol className="numbered-list">{solution.needs.map((need, index) => <li key={need}><span>0{index + 1}</span><div><h3>{need}</h3><p>Scope and deliverables are confirmed for each order or project.</p></div></li>)}</ol></div></section></>;
}
