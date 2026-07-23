import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/site-data";
import { defaultPergolaSeo, getRequestedPergolaImage, PergolaDetail, pergolaHeroContent } from "@/components/PergolaDetail";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

type ProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ image?: string | string[] }>;
};

export async function generateMetadata({ params, searchParams }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  if (slug === "aluminum-pergolas") {
    const selectedKey = getRequestedPergolaImage((await searchParams)?.image);
    const selectedContent = selectedKey ? pergolaHeroContent[selectedKey] : null;
    return {
      title: selectedContent?.seoTitle ?? defaultPergolaSeo.title,
      description: selectedContent?.seoDescription ?? defaultPergolaSeo.description,
      alternates: { canonical: "/products/aluminum-pergolas" },
    };
  }
  return { title: product.name, description: product.summary, alternates: { canonical: `/products/${product.slug}` } };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  if (slug === "aluminum-pergolas") {
    const selectedKey = getRequestedPergolaImage((await searchParams)?.image) ?? "pergola-05";
    return <PergolaDetail selectedKey={selectedKey} />;
  }
  return <><section className="page-hero"><div className="breadcrumb"><Link href="/products">Products</Link> / {product.shortName}</div><div className="page-hero-grid"><div><p className="kicker ink">{product.eyebrow}</p><h1>{product.name}</h1></div><div><p>{product.description}</p><Link className="button dark" href="/#quote">Request specifications</Link></div></div></section><section className="page-section alt"><div className="two-column"><div><p className="kicker ink">Configuration capability</p><h2>Built around the project.</h2><p>Final dimensions, profiles, finish and hardware are confirmed against drawings and production capability before an order is accepted.</p></div><ol className="numbered-list">{product.capabilities.map((item, index) => <li key={item}><span>0{index + 1}</span><div><h3>{item}</h3><p>Confirmed during technical and commercial review.</p></div></li>)}</ol></div></section><section className="page-section"><div className="two-column"><div><p className="kicker ink">Applications</p><h2>Where this system fits.</h2></div><div className="content-grid">{product.applications.map((item, index) => <article className="content-card" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>Reference photography and verified project details will be added here.</p></article>)}</div></div></section></>;
}
