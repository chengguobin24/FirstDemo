import Image from "next/image";
import Link from "next/link";
import { ModelProfilePreview } from "@/components/ModelProfilePreview";
import { PergolaAccessorySelector } from "@/components/PergolaAccessorySelector";
import heroStyles from "@/app/products/aluminum-gates/swing-gates/swing-gates.module.css";
import styles from "./PergolaDetail.module.css";

const models = [
  { model: "147", roof: "Rotating louver", louver: "147 × 28 × 1.2 mm", beam: "152 × 90 × 1.5 mm", post: "120 × 120 × 1.5 mm", image: "/images/products/pergola-profile-147.png", imageAlt: "Model 147 pergola louver, beam, post and manual operating component profile parameters" },
  { model: "163", roof: "Rotating louver", louver: "163 × 35.3 × 1.25 mm / 163 × 33.3 × 1.1 mm", beam: "152 × 90 × 1.5 mm", post: "120 × 120 × 1.5 mm", image: "/images/products/pergola-profile-163.png", imageAlt: "Model 163 pergola bevelled, curved and flat louver profile parameters" },
  { model: "175", roof: "Rotating louver", louver: "175 × 40 × 1.5 mm", beam: "Selected to suit span", post: "150 × 150 × 2.0 mm / 180 × 180 × 2.2 mm", image: "/images/products/pergola-profile-175-v2.png", imageAlt: "Model 175 pergola blade, beam, drainage sink and optional column profile dimensions" },
  { model: "180", roof: "Retractable louver", louver: "181 × 40 × 1.2 mm", beam: "175 × 40 × 1.8 mm", post: "Project-selected", image: "/images/products/pergola-profile-180.png", imageAlt: "Model 180 retractable pergola beam, sink and track beam profile parameters" },
  { model: "220", roof: "Rotating louver", louver: "220 × 55 × 1.5 mm", beam: "280 × 46.8 × 2.0 mm", post: "150 × 150 × 2.0 mm / 180 × 180 × 2.2 mm", image: "/images/products/pergola-profile-220.png", imageAlt: "Model 220 pergola louver, beam, sink and post profile parameters" },
] as const;

const gallery = [
  ["/images/product-gallery/pergolas/pergola-project-reference-01.png", "Dark aluminum louvered pergola over a residential patio beside a brick house in the United Kingdom"],
  ["/images/product-gallery/pergolas/pergola-project-reference-02.png", "Dark aluminum louvered pergola above a children's activity area in a Mediterranean courtyard"],
] as const;

export const defaultPergolaSeo = {
  title: "Custom Aluminum Pergola Manufacturer | Louvered Roof Systems",
  description: "Custom aluminum pergola systems with manual or motorized rotating and retractable louver roofs for residential, hospitality and commercial outdoor projects.",
};

export const pergolaHeroImages = {
  "pergola-01": ["/images/product-gallery/pergolas/pergola-01.jpg", "White freestanding aluminum louvered pergola over a residential patio seating area"],
  "pergola-02": ["/images/product-gallery/pergolas/pergola-02.jpg", "Freestanding aluminum louvered pergola with integrated lighting beside a residential pool"],
  "pergola-03": ["/images/product-gallery/pergolas/pergola-03.jpg", "Decorative aluminum garden pergola with architectural screens and integrated lighting"],
  "pergola-04": ["/images/product-gallery/pergolas/pergola-04.jpg", "Wide two-tone aluminum pergola with a dark roof in a landscaped garden"],
  "pergola-05": ["/images/product-gallery/pergolas/pergola-05.jpg", "Dark aluminum louvered pergola with integrated lighting and glass side panels"],
} as const;

export const pergolaHeroContent = {
  "pergola-01": {
    seoTitle: "Custom White Aluminum Pergola for Residential Patios",
    seoDescription: "Custom white aluminum pergola for residential patios and garden seating, with project-specific dimensions, adjustable louvers, finishes and operating options.",
    eyebrow: "Residential patio shade structures",
    title: "Custom White Aluminum Pergola for Residential Patios",
    configuration: "Freestanding layout · Adjustable louvered roof direction",
    paragraphs: [
      "This white freestanding aluminum pergola creates a clear outdoor room above a residential patio without visually separating the seating area from the surrounding garden. The slim frame and open louver rhythm suit contemporary villas, landscaped courtyards and private outdoor-living projects.",
      "Dimensions, column positions, louver profile, finish and roof operation are developed around the site plan and approved drawing. Manual or motorized operation can be reviewed with the selected pergola model, while compatible lighting, screens and other accessories are confirmed for the final configuration.",
      "Choose this custom aluminum pergola for residential patios and garden seating areas that need project-specific shade, ventilation and a clean architectural relationship with the house.",
    ],
    tags: ["Residential patio", "Freestanding system", "Project-specific size"],
  },
  "pergola-02": {
    seoTitle: "Poolside Motorized Louvered Pergola | Custom Aluminum",
    seoDescription: "Poolside aluminum louvered pergola with integrated lighting, custom dimensions and optional motorized roof operation for residential outdoor dining areas.",
    eyebrow: "Poolside outdoor dining systems",
    title: "Poolside Motorized Louvered Pergola",
    configuration: "Outdoor dining layout · Integrated linear lighting",
    paragraphs: [
      "Positioned between the pool and residence, this freestanding aluminum pergola defines a dedicated outdoor dining area while maintaining open views across the landscape. The broad rectangular frame gives tables and seating a clear architectural boundary without enclosing the space.",
      "A motorized louvered pergola configuration can be developed around the required footprint, roof profile, color and control preference. Integrated LED lighting, drainage planning and compatible side elements are reviewed together with the approved dimensions and installation conditions.",
      "This layout is suited to villa gardens, poolside terraces and residential entertaining areas where adjustable overhead shade and evening lighting need to work as one coordinated system.",
    ],
    tags: ["Poolside dining", "Motorized option", "Integrated lighting"],
  },
  "pergola-03": {
    seoTitle: "Decorative Aluminum Garden Pergola | Custom Outdoor Lounge",
    seoDescription: "Decorative aluminum garden pergola with architectural screens, integrated lighting and project-specific planning for outdoor lounges and landscaped courtyards.",
    eyebrow: "Architectural garden lounge structures",
    title: "Decorative Aluminum Garden Pergola",
    configuration: "Architectural screen design · Outdoor lounge layout",
    paragraphs: [
      "This decorative garden pergola uses vertical aluminum screens and a circular focal opening to turn an outdoor lounge into a more composed landscape feature. The screen rhythm adds visual separation while keeping the seating area connected to planting and surrounding pathways.",
      "Decorative panel proportions, frame color, roof configuration, lighting and overall dimensions are reviewed as part of the project drawing. A rotating or retractable louvered pergola roof can be coordinated where the confirmed structure and site conditions allow.",
      "Use this custom outdoor aluminum pergola direction for landscaped courtyards, hospitality gardens and private lounge areas that need a stronger architectural identity than a simple open frame.",
    ],
    tags: ["Garden lounge", "Decorative screens", "Custom configuration"],
  },
  "pergola-04": {
    seoTitle: "Wide Aluminum Louvered Pergola for Garden Projects",
    seoDescription: "Wide freestanding aluminum louvered pergola with a contrasting roof, custom project dimensions and manual or electric operation for gardens and terraces.",
    eyebrow: "Wide freestanding garden structures",
    title: "Wide Aluminum Louvered Pergola for Garden Projects",
    configuration: "Freestanding layout · Contrasting frame and roof finish",
    paragraphs: [
      "The wide, low-profile composition of this two-tone aluminum pergola creates a strong horizontal shelter within an open landscape. A light frame and darker roof help the structure remain visually defined without adding heavy walls or decorative enclosures.",
      "Pergola width, depth, column layout, louver family and finish combination are selected according to the site and approved project drawing. Manual or electric roof operation can be reviewed, with final profile selection and allowable layout confirmed during technical evaluation.",
      "This freestanding aluminum louvered pergola direction is relevant to villa gardens, terraces, outdoor event areas and commercial aluminum pergola projects that require a larger covered footprint with a clean modern appearance.",
    ],
    tags: ["Wide footprint", "Two-tone finish", "Garden projects"],
  },
  "pergola-05": {
    seoTitle: "Enclosed Motorized Louvered Pergola with Glass Screens",
    seoDescription: "Enclosed motorized aluminum louvered pergola with integrated LED lighting, glass side panels and custom configuration for terraces and hospitality spaces.",
    eyebrow: "Enclosed outdoor room systems",
    title: "Enclosed Motorized Louvered Pergola",
    configuration: "Adjustable louvered roof · Glass side panels · Integrated lighting",
    paragraphs: [
      "This dark aluminum louvered pergola combines an adjustable roof, perimeter lighting and transparent side panels to create a more sheltered outdoor room. The glass maintains views and daylight while giving the terrace a defined edge and a more complete architectural character.",
      "As a custom aluminum pergola manufacturer, JUNSU coordinates roof operation, frame dimensions, glass interfaces, lighting and compatible accessories through the approved project drawing. Motorized louver control, windproof screens, ceiling fans, heaters and sensors can be reviewed according to the selected model and installation requirements.",
      "The enclosed pergola system suits residential terraces, hotel courtyards, restaurant seating and commercial outdoor spaces that need flexible shade with a coordinated lighting and side-enclosure strategy.",
    ],
    tags: ["Motorized louvers", "Glass enclosure", "Hospitality spaces"],
  },
} as const;

export type PergolaImageKey = keyof typeof pergolaHeroImages;

export function getRequestedPergolaImage(requestedImage: string | string[] | undefined) {
  const imageKey = Array.isArray(requestedImage) ? requestedImage[0] : requestedImage;
  return imageKey && imageKey in pergolaHeroImages ? imageKey as PergolaImageKey : null;
}

export function PergolaDetail({ selectedKey = "pergola-05" }: { selectedKey?: PergolaImageKey }) {
  const heroImage = pergolaHeroImages[selectedKey];
  const heroContent = pergolaHeroContent[selectedKey];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: heroContent.title,
    category: "Aluminum louvered pergolas",
    material: "6063 aluminum alloy",
    description: heroContent.seoDescription,
    image: heroImage[0],
    brand: { "@type": "Brand", name: "JUNSU" },
  };

  return (
    <article className={styles.page}>
      <section className={heroStyles.hero} id="overview">
        <div className={heroStyles.breadcrumb}><Link href="/products">Products</Link><span>/</span><span>Aluminum pergolas</span></div>
        <div className={heroStyles.heroGrid}>
          <figure className={`${heroStyles.heroMedia} site-reveal site-reveal-image`}>
            <Image src={heroImage[0]} alt={heroImage[1]} fill priority unoptimized sizes="(max-width: 900px) 100vw, 50vw" />
          </figure>
          <div className={`${heroStyles.heroCopy} site-reveal site-reveal-text`}>
            <p className={heroStyles.eyebrow}>{heroContent.eyebrow}</p>
            <h1>{heroContent.title}</h1>
            <p className={heroStyles.configuration}>{heroContent.configuration}</p>
            <div className={heroStyles.introduction}>{heroContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className={heroStyles.heroTags} aria-label="Selected aluminum pergola characteristics">{heroContent.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <Link className="button dark" href="/#quote">Send an inquiry <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label="Pergola page sections">
        <a href="#overview">Overview</a>
        <a href="#roof-systems">Roof systems</a>
        <a href="#finishes-accessories">Finishes &amp; accessories</a>
        <a href="#models">Model comparison</a>
        <a href="#applications">Applications</a>
      </nav>

      <section className={styles.roofSection} id="roof-systems">
        <div className={styles.sectionHeading}>
          <h2>Two ways to<br /><em>open the sky.</em></h2>
          <p>Both roof-opening systems are customized around the project dimensions. Manual or electric operation, controls and final configuration are confirmed during technical review.</p>
        </div>
        <div className={styles.roofGrid}>
          <article>
            <div className={styles.mechanismImage}><Image src="/images/products/pergola-rotating-roof-open-closed.png" alt="Rotating pergola louvers shown fully closed and open" fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <span>01 / Adjustable angle</span><h3>Rotating louver roof</h3>
          </article>
          <article>
            <div className={`${styles.mechanismImage} ${styles.retractableImage}`}><Image src="/images/products/pergola-retractable-roof-motion.png" alt="Retractable pergola louvers folding and stacking to the right with a directional movement arrow" fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <span>02 / Folding movement</span><h3>Retractable louver roof</h3>
          </article>
        </div>
      </section>

      <PergolaAccessorySelector />

      <section className={styles.models} id="models">
        <div className={styles.sectionHeading}>
          <h2>Compare the<br /><em>louver families.</em></h2>
          <p>Profile values are extracted from the supplied technical materials. Final sections and allowable spans must be confirmed against the approved project drawing before quotation or production.</p>
        </div>
        <div className={styles.modelTable} role="region" aria-label="Pergola model comparison" tabIndex={0}>
          <table>
            <thead><tr><th>Model</th><th>Roof type</th><th>Louver profile</th><th>Beam profile</th><th>Post profile</th><th>Profile preview</th></tr></thead>
            <tbody>{models.map((model) => <tr key={model.model}><th><span>{model.model}</span><small>Manual / electric</small></th><td>{model.roof}</td><td>{model.louver}</td><td>{model.beam}</td><td>{model.post}</td><td><ModelProfilePreview src={model.image} alt={model.imageAlt} model={model.model} /></td></tr>)}</tbody>
          </table>
        </div>
        <div className={styles.modelContact}>
          <p>Pergolas are custom products. The dimensions shown are standard-size references only. Please contact our team to discuss your project requirements in detail.</p>
          <div className={styles.modelContactActions}>
            <a className={`${styles.modelContactButton} ${styles.whatsAppButton}`} href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
            <Link className={`${styles.modelContactButton} ${styles.inquiryButton}`} href="/#quote">Submit an inquiry <span aria-hidden="true">↓</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.gallery} id="applications">
        <div className={styles.galleryHeading}><p className="kicker ink">Application references</p><h2>Built for terraces,<br /><em>gardens and hospitality.</em></h2></div>
        <div className={styles.galleryGrid}>{gallery.map(([src, alt], index) => <figure key={src}><div><Image src={src} alt={alt} fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" /></div><figcaption>{String(index + 1).padStart(2, "0")} / Project reference</figcaption></figure>)}</div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </article>
  );
}
