import type { Metadata } from "next";
import Link from "next/link";
import { projectPlaceholders } from "@/lib/site-data";

export const metadata: Metadata = { title: "Project Gallery", description: "Aluminum fence, gate and pergola project applications by JUNSU.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <><section className="page-hero"><p className="kicker ink">Application gallery</p><h1>Made for real places.</h1><p>Verified project photography, location, system and installation details will be published as materials are approved.</p></section><section className="page-section"><div className="project-gallery">{projectPlaceholders.map((project, index) => <article className={`project-item ${project.shape}`} key={`${project.title}-${index}`}><div className="placeholder-media"><span>{project.category} project media pending</span></div><div className="project-meta"><span>{project.category}</span><h2>{project.title}</h2><p>{project.location}</p></div></article>)}</div><div style={{marginTop:70}}><Link className="button dark" href="/contact">Share a similar project</Link></div></section></>;
}
