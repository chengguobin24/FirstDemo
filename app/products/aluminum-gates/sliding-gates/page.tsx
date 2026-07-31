import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../swing-gates/swing-gates.module.css";
import { SlidingStyleCarousel } from "./SlidingStyleCarousel";

const defaultSeo = {
  title: "Automatic Aluminum Sliding Gates | Track & Cantilever",
  description: "Automatic aluminum sliding gates with ground-track or trackless cantilever systems, Alcano motors, smart access and corrosion-resistant 6063-T5 construction.",
};

const heroImages = {
  "gate-07": ["/images/product-gallery/gates/gate-07.jpg", "Long automatic aluminum sliding driveway gate with coordinated pedestrian access"],
  "gate-08": ["/images/product-gallery/gates/gate-08.png", "Decorative aluminum sliding entrance system designed for a villa project"],
} as const;

const heroContent = {
  "gate-07": {
    seoTitle: "Privacy Sliding Gate with Pedestrian Access",
    seoDescription: "Automatic aluminum sliding driveway gate with full-height vertical privacy infill and coordinated pedestrian access for villas and residences.",
    eyebrow: "Integrated residential sliding entrances",
    title: "Private Sliding Gate with Pedestrian Access",
    configuration: "Full-height vertical infill · Coordinated walk-through access",
    paragraphs: [
      "This automatic aluminum sliding driveway gate combines a wide vehicle entrance with pedestrian access in one continuous vertical-slat elevation. The closely arranged infill creates a strong privacy screen, while the coordinated walk-through section avoids adding an unrelated side gate to a carefully designed residential boundary.",
      "The moving leaf can be engineered as a guided ground-track gate or a trackless cantilever sliding gate after the run-back space, ground condition and clear opening are reviewed. Gate dimensions, pedestrian access position and panel proportions are confirmed through the approved entrance drawing.",
      "6063-T5 aluminum, stainless-steel hardware and an Alcano motor support electric single-side travel for villa entrances and residential driveways. Remote control, mobile control, vehicle sensing and intelligent opening functions can be coordinated with the required daily access sequence.",
    ],
    tags: ["Integrated pedestrian access", "Full-privacy infill", "Automatic driveway gate"],
  },
  "gate-08": {
    seoTitle: "Decorative Aluminum Sliding Gate for Villas",
    seoDescription: "Decorative automatic aluminum sliding gate with geometric border details, privacy infill and smart access planning for villa and courtyard entrances.",
    eyebrow: "Decorative automatic villa entrances",
    title: "Decorative Aluminum Sliding Entrance Gate",
    configuration: "Geometric border details · Coordinated vehicle access",
    paragraphs: [
      "Geometric upper and lower bands give this aluminum sliding gate a more decorative architectural identity than a plain privacy panel. The vertical infill maintains a strong entrance rhythm, while the repeated detailing across the wide composition helps the gate complement villa walls, columns and a matching pedestrian entrance.",
      "The decorative pattern, leaf length, opening width and sliding direction are developed around the approved elevation. A ground-track system can provide guided travel, while a cantilever option removes the need for a continuous rail across the clear entrance when site conditions favor that structure.",
      "Electric single-side movement is powered by an Alcano motor and can be connected with project-specific intelligent access functions. This design direction suits villa driveways and private courtyard entrances where privacy, automation and ornamental character need to work as one system.",
    ],
    tags: ["Decorative detailing", "Villa driveway", "Smart sliding access"],
  },
} as const;

const specifications = [
  ["Gate type", "Single-side automatic aluminum sliding gate"],
  ["Sliding system", "Ground-track or trackless cantilever"],
  ["Operation", "Electric only with intelligent opening system"],
  ["Material", "Corrosion-resistant aluminum 6063-T5"],
  ["Style", "Great Wall panel / laser engraving"],
  ["Size", "Customized to the opening and site conditions"],
  ["Surface finish", "Powder coating / fluorocarbon coating"],
  ["Hardware", "Stainless-steel hardware"],
  ["Motor", "Alcano motor with 3-year motor warranty"],
  ["Smart control", "Remote control, mobile control, vehicle sensing and intelligent opening"],
] as const;

const applications = [
  ["/images/product-gallery/gates/gate-07.jpg", "Automatic aluminum sliding gate across a wide residential driveway", "Residential driveways"],
  ["/images/product-gallery/gates/gate-08.png", "Decorative aluminum sliding entrance system for a villa", "Villa entrances"],
] as const;

const faqs = [
  ["What is the difference between a ground-track and cantilever sliding gate?", "A ground-track gate travels along a guided rail at the entrance. A trackless cantilever gate supports the moving leaf without a continuous rail across the opening. The appropriate system is selected after reviewing the ground condition, available run-back space and project requirements."],
  ["Can the sliding gate be operated manually?", "No. JUNSU sliding gates are designed as electric systems with intelligent opening control. The operating configuration is confirmed with the motor and access requirements before production."],
  ["Which motor and warranty are supplied?", "The sliding system uses an Alcano motor. The motor is covered by a three-year warranty, subject to the confirmed project specification and operating conditions."],
  ["Which smart opening methods are available?", "The gate can be coordinated with remote control, mobile control, vehicle sensing and an intelligent opening system. Required functions are confirmed for each entrance project."],
  ["Are the dimensions fixed?", "No. Gate width, height, leaf proportions, travel distance and structural arrangement are developed around the opening dimensions and site conditions."],
  ["What information is needed for a quotation?", "Please provide the opening width and height, available sliding space, ground condition, site photographs, quantity, preferred finish, destination and required smart-control functions. A drawing or reference image is also helpful."],
] as const;

type SlidingGatePageProps = {
  searchParams?: Promise<{ image?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: SlidingGatePageProps): Promise<Metadata> {
  const requestedImage = (await searchParams)?.image;
  const imageKey = Array.isArray(requestedImage) ? requestedImage[0] : requestedImage;
  const selectedContent = imageKey && imageKey in heroContent ? heroContent[imageKey as keyof typeof heroContent] : null;

  return {
    title: selectedContent?.seoTitle ?? defaultSeo.title,
    description: selectedContent?.seoDescription ?? defaultSeo.description,
    alternates: { canonical: "/products/aluminum-gates/sliding-gates" },
  };
}

export default async function AluminumSlidingGatesPage({ searchParams }: SlidingGatePageProps) {
  const requestedImage = (await searchParams)?.image;
  const imageKey = Array.isArray(requestedImage) ? requestedImage[0] : requestedImage;
  const selectedKey = imageKey && imageKey in heroImages ? imageKey as keyof typeof heroImages : "gate-07";
  const heroImage = heroImages[selectedKey];
  const selectedContent = heroContent[selectedKey];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Automatic Aluminum Sliding Gates",
    category: "Aluminum sliding gates",
    material: "6063-T5 aluminum",
    description: "Electric single-side aluminum sliding gates with ground-track or trackless cantilever systems for driveways, villa entrances and commercial access projects.",
    manufacturer: { "@type": "Organization", name: "JUNSU" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Sliding system", value: "Ground-track or trackless cantilever" },
      { "@type": "PropertyValue", name: "Motor", value: "Alcano motor" },
      { "@type": "PropertyValue", name: "Operation", value: "Automatic single-side sliding" },
    ],
  };

  return (
    <main className={`${styles.page} ${styles.foldingPage} ${styles.slidingPage}`}>
      <section className={styles.hero}>
        <div className={styles.breadcrumb}><Link href="/products">Products</Link><span>/</span><Link href="/products/aluminum-gates">Aluminum gates</Link><span>/</span><span>Sliding gates</span></div>
        <div className={styles.heroGrid}>
          <figure className={`${styles.heroMedia} site-reveal site-reveal-image`}>
            <Image src={heroImage[0]} alt={heroImage[1]} fill priority unoptimized sizes="(max-width: 900px) 100vw, 50vw" />
          </figure>
          <div className={`${styles.heroCopy} site-reveal site-reveal-text`}>
            <p className={styles.eyebrow}>{selectedContent.eyebrow}</p>
            <h1>{selectedContent.title}</h1>
            <p className={styles.configuration}>{selectedContent.configuration}</p>
            <div className={styles.introduction}>{selectedContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className={styles.heroTags} aria-label="Selected sliding gate characteristics">{selectedContent.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <Link className="button dark" href="/#quote">Send an inquiry <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.stylesSection}>
        <header className={`${styles.catalogHeading} site-reveal site-reveal-text`}>
          <div className={styles.catalogCopy}>
            <p className={styles.eyebrow}>Automatic aluminum sliding systems</p>
            <h2>Choose Ground Track or Cantilever Movement</h2>
            <p>Ground-track sliding supports guided travel along the entrance, while a cantilever configuration keeps a continuous rail out of the clear opening. Both systems use project-specific dimensions, corrosion-resistant aluminum construction and intelligent access options, allowing the operating structure to match the site instead of forcing one solution onto every entrance.</p>
          </div>
        </header>
        <SlidingStyleCarousel />
        <div className={`${styles.finishRow} site-reveal site-reveal-text`}>
          <div><p className={styles.eyebrow}>Color references</p><h3>Finish the entrance as one system.</h3></div>
          <div className={styles.swatches} aria-label="Available color references">
            <div><span className={styles.blackSwatch} /><b>Black</b></div><div><span className={styles.greySwatch} /><b>Anthracite grey</b></div><div><span className={styles.whiteSwatch} /><b>White</b></div><div><span className={styles.customSwatch} /><b>Project color</b></div>
          </div>
        </div>
      </section>

      <section className={styles.specSection}>
        <div className={`${styles.specContent} site-reveal site-reveal-text`}><p className={styles.eyebrow}>Sliding gate specification</p><h2>Specified for reliable travel.</h2><p>Track type, cantilever balance, travel space, motor configuration and intelligent controls are reviewed against the entrance plan before production.</p><dl className={styles.specTable}>{specifications.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></div>
        <div className={`${styles.specMosaic} site-reveal site-reveal-image`} aria-label="Sliding gate material and production image area">
          <figure className={styles.specImageLarge}><Image src="/images/products/gate-aluminum-profiles-factory.webp" alt="Stacked aluminum gate profile sections in the production workshop" fill unoptimized sizes="(max-width: 1050px) 100vw, 35vw" /></figure>
          <figure><Image src="/images/products/gate-frames-production.webp" alt="Fabricated aluminum gate frames prepared in the production workshop" fill unoptimized sizes="(max-width: 1050px) 50vw, 20vw" /></figure>
          <figure><Image src="/images/product-gallery/gates/gate-07.jpg" alt="Finished automatic aluminum sliding driveway gate reference" fill unoptimized sizes="(max-width: 1050px) 50vw, 20vw" /></figure>
        </div>
      </section>

      <section className={styles.applicationSection}>
        <header className={`${styles.sectionHeading} site-reveal site-reveal-text`}><div><p className={styles.eyebrow}>Application</p><h2>Clear access for busy entrances.</h2></div><p>Automatic single-side travel serves private driveways, villa entrances and commercial access points where controlled opening and clear vehicle movement matter.</p></header>
        <div className={styles.applicationGrid}>
          {applications.map(([src, alt, title], index) => <figure className={`${styles.applicationItem} ${styles.applicationLarge} site-reveal site-reveal-image`} key={title}><div><Image src={src} alt={alt} fill unoptimized sizes={index === 0 ? "(max-width: 850px) 100vw, 58vw" : "(max-width: 850px) 100vw, 42vw"} /></div><figcaption><span>0{index + 1}</span>{title}</figcaption></figure>)}
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={`${styles.faqHeading} site-reveal site-reveal-text`}><p className={styles.eyebrow}>Plan the sliding path</p><h2>Sliding gate questions.</h2><div className={styles.faqActions}><Link className="button dark" href="/#quote">Send an inquiry <span aria-hidden="true">↗</span></Link><a className={styles.whatsappButton} href="https://wa.me/8613525568065" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a></div></div>
        <div className={`${styles.faqList} site-reveal site-reveal-text`}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </main>
  );
}
