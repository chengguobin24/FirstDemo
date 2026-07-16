import type { Metadata } from "next";
import Link from "next/link";
import { searchablePages } from "@/lib/site-data";

export const metadata: Metadata = { title: "Search", robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const results = query ? searchablePages.filter((page) => `${page.title} ${page.text}`.toLowerCase().includes(query)) : [];
  return <><section className="page-hero"><p className="kicker ink">Site search</p><h1>Find a system or resource.</h1><form className="search-form" action="/search" role="search"><label className="sr-only" htmlFor="search-query">Search</label><input id="search-query" name="q" type="search" defaultValue={q} placeholder="Fence, gate, pergola…" autoFocus /><button type="submit">Search ↗</button></form></section><section className="page-section">{query ? <><p>{results.length} result{results.length === 1 ? "" : "s"} for “{q}”</p><div className="search-results">{results.map((result) => <Link className="search-result" href={result.href} key={result.href}><h2>{result.title}</h2><span>View page ↗</span></Link>)}</div>{results.length === 0 && <p>Try a product name, application or document type.</p>}</> : <p>Enter a product, application or resource above.</p>}</section></>;
}
