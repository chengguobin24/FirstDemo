import type { Metadata } from "next";
import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";

/* eslint-disable @next/next/no-css-tags */

export const metadata: Metadata = {
  title: "About JUNSU | Aluminum Fence, Gate & Pergola Manufacturer",
  description:
    "Explore JUNSU's aluminum manufacturing facility and learn how its technical, sales and production teams support custom fence, gate and pergola projects.",
  alternates: { canonical: "/about" },
};

const factoryImages = [
  ["/images/about/factory-capability-01-natural.webp", "Automated aluminum profile machining line with an operator in the JUNSU factory"],
  ["/images/about/factory-capability-02-natural.webp", "Aluminum profile processing equipment on the JUNSU production floor"],
  ["/images/about/factory-capability-03-natural.webp", "Aluminum profiles organized in the JUNSU factory material storage area"],
  ["/images/about/factory-capability-04-natural.webp", "Wide view of the JUNSU aluminum production hall and manufacturing equipment"],
  ["/images/about/factory-capability-05-natural.webp", "Industrial robot operating beside an aluminum processing line"],
  ["/images/about/factory-capability-06-natural.webp", "Prepared aluminum profile stock arranged inside the factory"],
] as const;

const teams = [
  {
    name: "Technical team",
    copy: "Reviews drawings, dimensions and interfaces, then helps turn project requirements into a clear, production-ready direction.",
    image: {
      src: "/images/about/technical-team-su-cheng-li-v3.webp",
      alt: "JUNSU technical team members Su, Cheng and Li",
    },
  },
  {
    name: "Sales team",
    copy: "Organizes requirements, keeps communication aligned and coordinates updates from the first discussion through delivery preparation.",
    image: {
      src: "/images/about/sales-team-portraits.webp",
      alt: "JUNSU sales team members Eva Wu, Freya Fang, Ray Ying and Ziyi He",
    },
  },
  {
    name: "Production team",
    copy: "Carries confirmed details into fabrication, assembly, inspection and export packing with practical attention at every stage.",
    image: {
      src: "/images/about/production-team-portraits-v2.webp",
      alt: "JUNSU production team members Yang, Chen, Chang and Wang wearing factory safety helmets and workwear",
    },
  },
] as const;

export default function AboutPage() {
  return (
    <article className="about-page">
      <link rel="stylesheet" href="/about.css" />

      <header className="about-hero">
        <div className="about-heroCopy">
          <p className="about-eyebrow">About JUNSU · Since 2000</p>
          <h1>Custom aluminum systems, built around real projects.</h1>
          <p>
            Based in Zhengzhou, China, JUNSU develops aluminum fence, gate and
            pergola systems for importers, distributors, contractors, overseas
            brands and architectural project teams.
          </p>
          <p>
            Our work connects product customization with coordinated
            manufacturing and export preparation, helping customers move from
            an initial requirement to a clearly confirmed solution.
          </p>
          <div className="about-productLine" aria-label="Product range">
            <span>Aluminum fences</span>
            <span>Aluminum gates</span>
            <span>Pergola systems</span>
          </div>
        </div>
        <figure className="about-heroMedia">
          <Image
            src="/images/about/junsu-factory-exterior-hero-v2.png"
            alt="JUNSU aluminum fence, gate and pergola manufacturing facility exterior"
            fill
            priority
            unoptimized
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </figure>
      </header>

      <section className="about-factory" aria-labelledby="about-factory-title">
        <div className="about-sectionHeading">
          <p className="about-eyebrow">Manufacturing strength</p>
          <h2 id="about-factory-title">A factory focused on project-specific aluminum systems.</h2>
          <p>
            Behind every fence, gate and pergola is a coordinated production
            process. JUNSU develops confirmed dimensions, finishes and
            configurations while keeping manufacturing and export preparation
            visible to the customer.
          </p>
        </div>
        <div className="about-factoryGallery" aria-label="JUNSU factory image gallery">
          {factoryImages.map(([src, alt]) => (
            <figure className="about-factoryImage site-reveal site-reveal-image" key={src}>
              <Image src={src} alt={alt} fill unoptimized sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
            </figure>
          ))}
        </div>
      </section>

      <section className="about-teams" aria-labelledby="about-teams-title">
        <div className="about-sectionHeading about-teamHeading">
          <p className="about-eyebrow">People behind the project</p>
          <h2 id="about-teams-title">Three teams, one coordinated response.</h2>
        </div>
        <div className="about-teamStrip">
          {teams.map((team, index) => (
            <figure className="about-team" key={team.name}>
              <h3>{team.name}</h3>
              <div className="about-teamPlaceholder" role={team.image ? undefined : "img"} aria-label={team.image ? undefined : `Reserved for ${team.name} photograph`}>
                {team.image ? (
                  <Image src={team.image.src} alt={team.image.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 33vw" />
                ) : (
                  <span>{String(index + 1).padStart(2, "0")}</span>
                )}
              </div>
              <figcaption>
                <p>{team.copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="about-contact" id="about-inquiry" aria-labelledby="about-contact-title">
        <div className="about-contactCopy">
          <p className="about-eyebrow">Start a conversation</p>
          <h2 id="about-contact-title">Tell us what you are planning.</h2>
          <p>
            Share the product type, dimensions, quantity, finish and destination.
            A drawing or reference image will help our team understand the project
            more clearly.
          </p>
        </div>
        <InquiryForm />
      </section>
    </article>
  );
}
