import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/site-data";

export const metadata: Metadata = { title: "Aluminum Product Systems", description: "Explore JUNSU aluminum fence, gate and pergola systems for B2B projects.", alternates: { canonical: "/products" } };

export default function ProductsPage() {
  return <><section className="page-hero"><p className="kicker ink">Product systems</p><h1>Three systems.<br /><em>One material language.</em></h1><p>Explore coordinated aluminum products prepared for customization, international delivery and project-specific installation.</p></section><section className="page-section"><div className="content-grid">{products.map((product) => <Link className="content-card" href={`/products/${product.slug}`} key={product.slug}><span>{product.number} · {product.eyebrow}</span><h2>{product.name}</h2><p>{product.summary}</p><b>View capabilities ↗</b></Link>)}</div></section></>;
}
