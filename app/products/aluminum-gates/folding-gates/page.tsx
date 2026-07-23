import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../swing-gates/swing-gates.module.css";
import { FoldingStyleCarousel } from "./FoldingStyleCarousel";

const defaultSeo = {
  title: "Space-Saving Aluminum Folding Gates | Automatic",
  description: "Space-saving automatic aluminum folding gates with a trackless cantilever structure, Alcano motor, corrosion-resistant materials and smart access options.",
};

const heroImages = {
  "gate-05": ["/images/product-gallery/gates/gate-05.jpg", "Wide automatic aluminum folding gate opening toward both sides of a courtyard"],
  "gate-06": ["/images/product-gallery/gates/gate-06.jpg", "Black trackless aluminum folding gate installed at a modern residence"],
} as const;

const heroContent = {
  "gate-05": {
    seoTitle: "Open-Slat Aluminum Bi-Fold Driveway Gate",
    seoDescription: "Open-slat automatic aluminum bi-fold driveway gate with two-side folding, trackless travel and space-saving access for courtyards and residences.",
    eyebrow: "Open-slat automatic bi-fold driveway gates",
    title: "Open-Slat Aluminum Folding Gate",
    configuration: "Two-side folding · Light-filtering vertical infill",
    paragraphs: [
      "This automatic bi-fold driveway gate uses open vertical infill to define the entrance while retaining a lighter view toward the courtyard. Four coordinated folding sections move toward both sides, reducing the operating depth required by a conventional wide swing gate and preserving a balanced architectural appearance when open or closed.",
      "The trackless cantilever folding structure avoids a continuous rail across the driveway and is engineered around the opening width, folding clearance and ground condition. 6063-T5 aluminum profiles, stainless-steel hardware and outdoor coating options provide a corrosion-resistant system for regular residential access.",
      "Powered by an Alcano motor, the gate can be prepared with remote control, mobile control, vehicle sensing and intelligent opening functions. It is a strong option for private courtyards and space-limited driveways that prefer visible spacing instead of a fully closed privacy panel.",
    ],
    tags: ["Open-slat design", "Space-saving fold", "Courtyard access"],
  },
  "gate-06": {
    seoTitle: "Louvered Trackless Aluminum Folding Gate",
    seoDescription: "Louvered automatic aluminum folding gate with filtered privacy, trackless cantilever movement and smart access options for modern villa driveways.",
    eyebrow: "Louvered trackless folding entrances",
    title: "Louvered Trackless Aluminum Folding Gate",
    configuration: "Filtered privacy · Automatic two-side folding",
    paragraphs: [
      "Angled louver panels give this trackless aluminum folding gate a more private and composed street-facing appearance. The repeated horizontal blades filter direct views while keeping the four folding leaves visually consistent with modern facades, louver fencing and coordinated pedestrian access.",
      "The automatic two-side folding system uses a trackless cantilever structure, making it suitable for entrances where a continuous ground rail is undesirable or the installation surface needs a cleaner crossing. Final panel proportions, folding path and clear opening are confirmed through the approved site drawing.",
      "The 6063-T5 aluminum structure, stainless-steel hardware, Alcano motor and intelligent opening options support daily villa and residential driveway use. Powder coating or fluorocarbon coating, color and louver arrangement are prepared for the confirmed project rather than treated as a fixed catalogue configuration.",
    ],
    tags: ["Louvered privacy", "Trackless system", "Modern villa entrance"],
  },
} as const;

const specifications = [
  ["Gate type", "Folding aluminum gate"],
  ["Operating system", "Automatic trackless cantilever folding"],
  ["Material", "Corrosion-resistant aluminum 6063-T5"],
  ["Style", "Great Wall panel / laser engraving"],
  ["Size", "Customized to the opening and site conditions"],
  ["Surface finish", "Powder coating / fluorocarbon coating"],
  ["Hardware", "Stainless-steel hinges and connection components"],
  ["Motor", "Alcano motor with 3-year motor warranty"],
  ["Smart control", "Remote control, mobile control, vehicle sensing and intelligent opening"],
] as const;

const applications = [
  ["/images/product-gallery/gates/gate-06.jpg", "Trackless aluminum folding driveway gate across an uneven residential entrance", "Uneven entrance sites"],
  ["/images/product-gallery/gates/gate-05.jpg", "Automatic aluminum bi-fold gate opening toward both sides of a private courtyard", "Space-limited driveways"],
  ["/images/product-gallery/gates/gate-06.jpg", "Corrosion-resistant black aluminum folding gate for a modern coastal residence", "Coastal residences"],
] as const;

const faqs = [
  ["Does the folding gate require a ground track?", "No. This system uses a trackless cantilever folding structure, avoiding a continuous ground rail across the entrance. It is especially suitable where the installation area is uneven or where a ground track would be difficult to maintain."],
  ["Can the folding gate be operated manually?", "No. The folding gate is designed as an automatic system. It can be configured with remote control, mobile control, vehicle sensing and other intelligent opening methods according to the project."],
  ["Can the gate dimensions be customized?", "Yes. Width, height and panel arrangement are engineered around the confirmed opening, site conditions, folding clearance and approved project drawing rather than a fixed catalogue size."],
  ["Which motor and warranty are supplied?", "The system is configured with an Alcano motor. The motor is covered by a three-year warranty, subject to the confirmed project specification and operating conditions."],
  ["Is the gate suitable for coastal areas?", "Yes. The aluminum structure, stainless-steel hardware and outdoor coating options are selected for corrosion resistance. This helps coastal users reduce routine maintenance compared with materials that are more vulnerable to rust."],
  ["What information is needed for a quotation?", "Please provide the opening width and height, site photographs, ground condition, quantity, preferred finish, destination and required smart-control functions. A drawing or reference image is also helpful."],
] as const;

type FoldingGatePageProps = {
  searchParams?: Promise<{ image?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: FoldingGatePageProps): Promise<Metadata> {
  const requestedImage = (await searchParams)?.image;
  const imageKey = Array.isArray(requestedImage) ? requestedImage[0] : requestedImage;
  const selectedContent = imageKey && imageKey in heroContent ? heroContent[imageKey as keyof typeof heroContent] : null;

  return {
    title: selectedContent?.seoTitle ?? defaultSeo.title,
    description: selectedContent?.seoDescription ?? defaultSeo.description,
    alternates: { canonical: "/products/aluminum-gates/folding-gates" },
  };
}

export default async function AluminumFoldingGatesPage({ searchParams }: FoldingGatePageProps) {
  const requestedImage = (await searchParams)?.image;
  const imageKey = Array.isArray(requestedImage) ? requestedImage[0] : requestedImage;
  const selectedKey = imageKey && imageKey in heroImages ? imageKey as keyof typeof heroImages : "gate-06";
  const heroImage = heroImages[selectedKey];
  const selectedContent = heroContent[selectedKey];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Space-Saving Aluminum Folding Gates",
    category: "Aluminum folding gates",
    material: "6063-T5 aluminum",
    description: "Automatic trackless cantilever aluminum folding gates customized for residential driveways, uneven entrances and space-limited openings.",
    manufacturer: { "@type": "Organization", name: "JUNSU" },
  };

  return (
    <main className={`${styles.page} ${styles.foldingPage}`}>
      <section className={styles.hero}>
        <div className={styles.breadcrumb}><Link href="/products">Products</Link><span>/</span><Link href="/products/aluminum-gates">Aluminum gates</Link><span>/</span><span>Folding gates</span></div>
        <div className={styles.heroGrid}>
          <figure className={`${styles.heroMedia} site-reveal site-reveal-image`}>
            <Image src={heroImage[0]} alt={heroImage[1]} fill priority unoptimized sizes="(max-width: 900px) 100vw, 50vw" />
          </figure>
          <div className={`${styles.heroCopy} site-reveal site-reveal-text`}>
            <p className={styles.eyebrow}>{selectedContent.eyebrow}</p>
            <h1>{selectedContent.title}</h1>
            <p className={styles.configuration}>{selectedContent.configuration}</p>
            <div className={styles.introduction}>{selectedContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className={styles.heroTags} aria-label="Selected folding gate characteristics">{selectedContent.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <Link className="button dark" href="/#quote">Send an inquiry <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.stylesSection}>
        <header className={`${styles.catalogHeading} site-reveal site-reveal-text`}>
          <div className={styles.catalogCopy}>
            <p className={styles.eyebrow}>Trackless aluminum bi-fold gates</p>
            <h2>Trackless Folding Access for Difficult Entrances</h2>
            <p>Explore automatic aluminum folding gate configurations developed for restricted driveways, uneven entrance surfaces and modern residential projects. Two-side folding movement reduces the swing radius, while corrosion-resistant aluminum, stainless-steel hardware and smart access options support reliable daily use.</p>
          </div>
        </header>
        <FoldingStyleCarousel />
        <div className={`${styles.finishRow} site-reveal site-reveal-text`}>
          <div><p className={styles.eyebrow}>Color references</p><h3>Standard or project-specific.</h3></div>
          <div className={styles.swatches} aria-label="Available color references">
            <div><span className={styles.blackSwatch} /><b>Black</b></div><div><span className={styles.greySwatch} /><b>Anthracite grey</b></div><div><span className={styles.whiteSwatch} /><b>White</b></div><div><span className={styles.customSwatch} /><b>Custom color</b></div>
          </div>
        </div>
      </section>

      <section className={styles.specSection}>
        <div className={`${styles.specContent} site-reveal site-reveal-text`}><p className={styles.eyebrow}>Product specification</p><h2>Automatic control, engineered to fit.</h2><p>Final panel proportions, folding clearances, motor selection and smart controls are confirmed against the opening dimensions and site conditions before production.</p><dl className={styles.specTable}>{specifications.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></div>
        <div className={`${styles.specMosaic} site-reveal site-reveal-image`} aria-label="Material and production image area">
          <figure className={styles.specImageLarge}><Image src="/images/products/gate-aluminum-profiles-factory.webp" alt="Stacked aluminum gate profile sections in the production workshop" fill unoptimized sizes="(max-width: 1050px) 100vw, 35vw" /></figure>
          <figure><Image src="/images/products/gate-frames-production.webp" alt="Fabricated aluminum gate frames prepared in the production workshop" fill unoptimized sizes="(max-width: 1050px) 50vw, 20vw" /></figure>
          <figure><Image src="/images/product-gallery/gates/gate-05.jpg" alt="Finished automatic aluminum folding gate reference" fill unoptimized sizes="(max-width: 1050px) 50vw, 20vw" /></figure>
        </div>
      </section>

      <section className={styles.applicationSection}>
        <header className={`${styles.sectionHeading} site-reveal site-reveal-text`}><div><p className={styles.eyebrow}>Application</p><h2>Built for difficult entrances.</h2></div><p>Trackless folding operation is suited to uneven ground, limited opening space and residential driveways that require automatic, intelligent access.</p></header>
        <div className={styles.applicationGrid}>
          {applications.map(([src, alt, title], index) => <figure className={`${styles.applicationItem} ${index === 0 ? styles.applicationLarge : ""} site-reveal site-reveal-image`} key={title}><div><Image src={src} alt={alt} fill unoptimized sizes={index === 0 ? "(max-width: 850px) 100vw, 65vw" : "(max-width: 850px) 100vw, 35vw"} /></div><figcaption><span>0{index + 1}</span>{title}</figcaption></figure>)}
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={`${styles.faqHeading} site-reveal site-reveal-text`}><p className={styles.eyebrow}>Before your inquiry</p><h2>Frequently asked questions.</h2><div className={styles.faqActions}><Link className="button dark" href="/#quote">Send an inquiry <span aria-hidden="true">↗</span></Link><a className={styles.whatsappButton} href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a></div></div>
        <div className={`${styles.faqList} site-reveal site-reveal-text`}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </main>
  );
}
