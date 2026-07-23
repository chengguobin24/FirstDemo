import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { applicationGallery } from "@/lib/site-data";

export const metadata: Metadata = { title: "Project Gallery", description: "Aluminum fence, gate and pergola project applications by JUNSU.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <><section className="page-hero"><p className="kicker ink">Application gallery</p><h1>See the systems<br /><em>in context.</em></h1><p>Explore fence, gate and pergola configurations for residential boundaries, entrances and outdoor living spaces. Each system can be reviewed around your dimensions, finish and installation conditions.</p></section><section className="page-section"><div className="project-gallery">{applicationGallery.map((item) => <article className={`project-item ${item.shape}`} key={item.image}><div className="project-media"><Image src={item.image} alt={item.alt} fill unoptimized sizes="(max-width: 650px) 100vw, 50vw" /></div><div className="project-meta"><span>{item.category}</span><h2>{item.title}</h2><p>{item.context}</p></div></article>)}</div><div style={{marginTop:70}}><Link className="button dark" href="/#quote">Discuss a similar project</Link></div></section></>;
}
