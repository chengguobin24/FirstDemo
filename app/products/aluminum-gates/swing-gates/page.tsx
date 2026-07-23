import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./swing-gates.module.css";
import { StyleCarousel } from "./StyleCarousel";

const defaultSeo = {
  title: "Durable Aluminum Swing Gates | Single & Double",
  description: "Durable 6063-T5 aluminum single and double swing gates for driveways and entrances, with tailored sizes, outdoor finishes and smart access options.",
};

const heroImages = {
  "gate-01": ["/images/product-gallery/gates/gate-01.jpg", "Dark aluminum pedestrian swing gate at a residential entrance"],
  "gate-02": ["/images/product-gallery/gates/gate-02.jpg", "Decorative dark aluminum swing gate with an integrated access keypad"],
  "gate-03": ["/images/product-gallery/gates/gate-03.jpg", "Wide aluminum swing gate system with coordinated pedestrian access"],
  "gate-04": ["/images/product-gallery/gates/gate-04.png", "Modern double aluminum swing gate installed at a residential driveway"],
} as const;

const heroContent = {
  "gate-01": {
    seoTitle: "Aluminum Pedestrian Swing Gate | Vertical Slat",
    seoDescription: "Single-leaf aluminum pedestrian swing gate with vertical slats, project-specific sizing, outdoor finishes and lock preparation for residential entrances.",
    eyebrow: "Compact residential pedestrian access",
    title: "Secure Aluminum Pedestrian Swing Gate",
    configuration: "Single-leaf access · Vertical architectural slats",
    paragraphs: [
      "Designed for a private walkway or side entrance, this single-leaf aluminum pedestrian gate creates a defined access point without the visual weight of a full driveway system. Closely arranged vertical slats give the narrow opening a taller architectural rhythm and help the gate sit cleanly between rendered walls or aluminum posts.",
      "Width, height, slat spacing, opening direction and lock preparation are reviewed around the confirmed entrance, while powder coating or fluorocarbon coating can be selected for the required outdoor finish.",
      "This compact swing gate suits villa walkways, garden entrances and residential side access where everyday pedestrian movement, controlled entry and a coordinated boundary appearance matter more than vehicle clearance.",
    ],
    tags: ["Pedestrian entrance", "Compact opening", "Vertical slats"],
  },
  "gate-02": {
    seoTitle: "Smart Decorative Pedestrian Gate | Keypad Ready",
    seoDescription: "Decorative aluminum pedestrian swing gate with privacy infill and keypad-ready smart access for villas, courtyards and residential walkways.",
    eyebrow: "Smart decorative pedestrian entrances",
    title: "Smart Decorative Pedestrian Swing Gate",
    configuration: "Keypad-ready access · Full-height privacy design",
    paragraphs: [
      "This decorative aluminum pedestrian gate combines a solid privacy area, vertical relief and geometric border details in one composed entrance. The visible access keypad makes the design especially relevant to private villas and courtyard projects that want a more formal front entrance with controlled daily access.",
      "Gate size, decorative proportions, handle position and smart-lock preparation are developed through the approved drawing. The 6063-T5 aluminum leaf can be powder coated or fluorocarbon coated, with the color and surface character coordinated with the entrance wall, lighting and surrounding fence.",
      "Choose this direction when a single-leaf swing gate must do more than close a walkway: it can become an architectural focal point while supporting a lock, keypad or project-specific access-control arrangement.",
    ],
    tags: ["Smart lock ready", "Decorative privacy", "Villa access"],
  },
  "gate-03": {
    seoTitle: "Driveway & Pedestrian Swing Gate | Coordinated",
    seoDescription: "Coordinated aluminum driveway and pedestrian swing gate system with matching vertical infill, decorative bands and project-specific entrance planning.",
    eyebrow: "Coordinated driveway and walk-through access",
    title: "Unified Driveway and Pedestrian Swing Gate",
    configuration: "Wide entrance composition · Matching walk-through access",
    paragraphs: [
      "This wide aluminum swing entrance coordinates vehicle access and a pedestrian passage within the same visual composition. Repeated vertical infill and decorative bands align the larger leaves with the walk-through section, avoiding the disconnected appearance that can occur when driveway and pedestrian gates are selected separately.",
      "The double-leaf arrangement, pedestrian access position, hinge direction and clear opening are prepared around the entrance plan. 6063-T5 aluminum, stainless-steel connection hardware and project-selected outdoor coatings support a consistent finish across the complete gate and matching boundary system.",
      "The layout is well suited to private courtyards, villa driveways and residential compounds that require frequent pedestrian entry alongside a wider vehicle opening, with manual or motorized swing operation confirmed for the final project.",
    ],
    tags: ["Coordinated access", "Double-leaf entrance", "Matching pedestrian gate"],
  },
  "gate-04": {
    seoTitle: "Modern Double-Leaf Aluminum Driveway Gate",
    seoDescription: "Modern double-leaf aluminum swing gate with semi-open vertical infill, tailored driveway clearance and manual or motorized residential operation.",
    eyebrow: "Contemporary double-leaf driveway gates",
    title: "Modern Double-Leaf Aluminum Swing Gate",
    configuration: "Balanced two-leaf opening · Semi-open vertical infill",
    paragraphs: [
      "A balanced double-leaf swing layout creates a welcoming driveway entrance and divides the moving width between two leaves. The vertical semi-open infill keeps the elevation light and contemporary, making this design appropriate where the customer wants a defined boundary without a completely closed visual screen.",
      "Leaf proportions, slat spacing, inward or outward opening direction, finish and color are confirmed around the driveway clearance and approved project drawing.",
      "This modern aluminum driveway gate can be supplied for manual or motorized use and coordinated with pedestrian gates, fencing and smart access equipment for villas, residential driveways and private courtyard entrances.",
    ],
    tags: ["Double-leaf swing", "Semi-open infill", "Residential driveway"],
  },
} as const;

const specifications = [
  ["Gate type", "Single or double swing gate"],
  ["Material", "Aluminum 6063-T5"],
  ["Style", "Great Wall panel / laser engraving"],
  ["Size", "Customized to project requirements"],
  ["Surface finish", "Powder coating / fluorocarbon coating"],
  ["Operation", "Manual or motorized"],
  ["Color", "Standard or customized colors"],
  ["Optional systems", "Motor, lock and smart access control"],
] as const;

const applications = [
  ["/images/product-gallery/gates/gate-04.png", "Double aluminum swing gate for a modern residential driveway", "Residential driveways"],
  ["/images/product-gallery/gates/gate-01.jpg", "Single aluminum swing gate for a private pedestrian entrance", "Pedestrian entrances"],
  ["/images/product-gallery/gates/gate-03.jpg", "Coordinated aluminum gate system for a private courtyard", "Private courtyards"],
] as const;

const faqs = [
  ["Can the gate dimensions be customized?", "Yes. Width and height are prepared around the confirmed opening, operating clearance and installation conditions rather than a fixed catalogue size."],
  ["Can the gate be supplied with a motor?", "Yes. Manual and motorized configurations are available. Motor, lock and smart access-control requirements are confirmed during the project review."],
  ["Which finish options are available?", "Powder coating and fluorocarbon coating are available. Standard colors or a customer-specified color can be reviewed before production."],
  ["What should be provided for a quotation?", "Please provide the opening width and height, quantity, preferred single or double configuration, finish, operating method, destination and any available drawing or reference image."],
] as const;

type SwingGatePageProps = {
  searchParams?: Promise<{ image?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: SwingGatePageProps): Promise<Metadata> {
  const requestedImage = (await searchParams)?.image;
  const imageKey = Array.isArray(requestedImage) ? requestedImage[0] : requestedImage;
  const selectedContent = imageKey && imageKey in heroContent ? heroContent[imageKey as keyof typeof heroContent] : null;

  return {
    title: selectedContent?.seoTitle ?? defaultSeo.title,
    description: selectedContent?.seoDescription ?? defaultSeo.description,
    alternates: { canonical: "/products/aluminum-gates/swing-gates" },
  };
}

export default async function AluminumSwingGatesPage({ searchParams }: SwingGatePageProps) {
  const requestedImage = (await searchParams)?.image;
  const imageKey = Array.isArray(requestedImage) ? requestedImage[0] : requestedImage;
  const selectedKey = imageKey && imageKey in heroImages ? imageKey as keyof typeof heroImages : "gate-04";
  const heroImage = heroImages[selectedKey];
  const selectedContent = heroContent[selectedKey];
  const catalogPreviewUrl = process.env.NEXT_PUBLIC_SWING_GATE_CATALOG_PREVIEW_URL;
  const catalogDownloadUrl = process.env.NEXT_PUBLIC_SWING_GATE_CATALOG_DOWNLOAD_URL;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Durable Aluminum Swing Gates",
    category: "Aluminum swing gates",
    material: "6063-T5 aluminum",
    description: "Custom single and double aluminum swing gates for residential entrances, driveways and courtyard projects, available with manual or motorized operation.",
    manufacturer: { "@type": "Organization", name: "JUNSU" },
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.breadcrumb}><Link href="/products">Products</Link><span>/</span><Link href="/products/aluminum-gates">Aluminum gates</Link><span>/</span><span>Swing gates</span></div>
        <div className={styles.heroGrid}>
          <figure className={`${styles.heroMedia} site-reveal site-reveal-image`}>
            <Image src={heroImage[0]} alt={heroImage[1]} fill priority unoptimized sizes="(max-width: 900px) 100vw, 50vw" />
          </figure>
          <div className={`${styles.heroCopy} site-reveal site-reveal-text`}>
            <p className={styles.eyebrow}>{selectedContent.eyebrow}</p>
            <h1>{selectedContent.title}</h1>
            <p className={styles.configuration}>{selectedContent.configuration}</p>
            <div className={styles.introduction}>{selectedContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className={styles.heroTags} aria-label="Selected swing gate characteristics">{selectedContent.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <Link className="button dark" href="/#quote">Send an inquiry <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.stylesSection}>
        <header className={`${styles.catalogHeading} site-reveal site-reveal-text`}>
          <div className={styles.catalogCopy}>
            <p className={styles.eyebrow}>Tailored aluminum swing gates</p>
            <h2>Single and Double Gates for Modern Entrances</h2>
            <p>Explore custom aluminum swing gate designs for pedestrian entrances, private courtyards and residential driveways. Manufactured from 6063-T5 aluminum in custom single- or double-leaf configurations, each gate can be specified with powder-coated or fluorocarbon-coated finishes, manual or motorized opening, smart locks and coordinated access-control systems.</p>
          </div>
          <div className={styles.catalogActions}>
            {catalogPreviewUrl ? <a href={catalogPreviewUrl} target="_blank" rel="noopener noreferrer">Online preview <span aria-hidden="true">↗</span></a> : <span aria-disabled="true">Online preview <b>PDF</b></span>}
            {catalogDownloadUrl ? <a className={styles.catalogDownload} href={catalogDownloadUrl}>Download PDF <span aria-hidden="true">↓</span></a> : <span className={styles.catalogDownload} aria-disabled="true">Download PDF <b>PDF</b></span>}
          </div>
        </header>
        <StyleCarousel />
        <div className={`${styles.finishRow} site-reveal site-reveal-text`}>
          <div><p className={styles.eyebrow}>Color references</p><h3>Standard or project-specific.</h3></div>
          <div className={styles.swatches} aria-label="Available color references">
            <div><span className={styles.blackSwatch} /><b>Black</b></div><div><span className={styles.greySwatch} /><b>Anthracite grey</b></div><div><span className={styles.whiteSwatch} /><b>White</b></div><div><span className={styles.customSwatch} /><b>Custom color</b></div>
          </div>
        </div>
      </section>

      <section className={styles.specSection}>
        <div className={`${styles.specContent} site-reveal site-reveal-text`}><p className={styles.eyebrow}>Product specification</p><h2>Built around each opening.</h2><p>Final dimensions, hardware and operating clearances are reviewed against the customer drawing and site conditions before production.</p><dl className={styles.specTable}>{specifications.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></div>
        <div className={`${styles.specMosaic} site-reveal site-reveal-image`} aria-label="Material and production image area">
          <figure className={styles.specImageLarge}><Image src="/images/products/gate-aluminum-profiles-factory.webp" alt="Stacked aluminum gate profile sections in the production workshop" fill unoptimized sizes="(max-width: 1050px) 100vw, 35vw" /></figure>
          <figure><Image src="/images/products/gate-frames-production.webp" alt="Fabricated aluminum gate frames prepared in the production workshop" fill unoptimized sizes="(max-width: 1050px) 50vw, 20vw" /></figure>
          <figure><Image src="/images/product-gallery/gates/gate-04.png" alt="Finished black aluminum swing gate reference" fill unoptimized sizes="(max-width: 1050px) 50vw, 20vw" /></figure>
        </div>
      </section>

      <section className={styles.applicationSection}>
        <header className={`${styles.sectionHeading} site-reveal site-reveal-text`}><div><p className={styles.eyebrow}>Application</p><h2>Made for real entrances.</h2></div><p>Residential entrances, driveway openings and private courtyards can be coordinated with the building, surrounding fence and preferred access system.</p></header>
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
