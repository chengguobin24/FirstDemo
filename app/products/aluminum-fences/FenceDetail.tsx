import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import gateStyles from "../aluminum-gates/swing-gates/swing-gates.module.css";
import fenceDetailStyles from "./fence-detail.module.css";
import { FenceStyleCarousel } from "./FenceStyleCarousel";
import { commonFenceFaqs, fenceContent, fenceHeroContent, fenceHeroImages, type FenceImageKey, type FenceVariant } from "./fence-content";

export type FencePageProps = {
  searchParams?: Promise<{ image?: string | string[] }>;
};

const typeLinks = [
  ["All systems", "/products/aluminum-fences"],
  ["Open-slat", "/products/aluminum-fences/open-slat-fences"],
  ["Privacy", "/products/aluminum-fences/privacy-fences"],
  ["Semi-privacy", "/products/aluminum-fences/semi-privacy-fences"],
] as const;

const variantImageKeys: Record<FenceVariant, readonly FenceImageKey[]> = {
  systems: ["fence-01", "fence-02", "fence-03", "fence-04", "fence-05"],
  open: ["fence-03", "fence-04"],
  privacy: ["fence-05"],
  "semi-privacy": ["fence-01", "fence-02"],
};

function getRequestedFenceImage(variant: FenceVariant, requestedImage: string | string[] | undefined) {
  const imageKey = Array.isArray(requestedImage) ? requestedImage[0] : requestedImage;
  return imageKey && variantImageKeys[variant].includes(imageKey as FenceImageKey)
    ? imageKey as FenceImageKey
    : null;
}

export async function generateFenceMetadata({
  variant,
  searchParams,
  title,
  description,
  canonical,
}: FencePageProps & { variant: FenceVariant; title: string; description: string; canonical: string }): Promise<Metadata> {
  const selectedKey = getRequestedFenceImage(variant, (await searchParams)?.image);
  const selectedContent = selectedKey ? fenceHeroContent[selectedKey] : null;

  return {
    title: selectedContent?.seoTitle ?? title,
    description: selectedContent?.seoDescription ?? description,
    alternates: { canonical },
  };
}

export async function FenceDetail({ variant, searchParams }: FencePageProps & { variant: FenceVariant }) {
  const content = fenceContent[variant];
  const requestedImage = (await searchParams)?.image;
  const selectedKey = getRequestedFenceImage(variant, requestedImage);
  const selectedContent = selectedKey ? fenceHeroContent[selectedKey] : null;
  const heroImage = fenceHeroImages[selectedKey ?? content.defaultImage];
  const heroEyebrow = selectedContent?.eyebrow ?? content.eyebrow;
  const heroTitle = selectedContent?.title ?? content.h1;
  const heroConfiguration = selectedContent?.configuration ?? content.configuration;
  const heroParagraphs = selectedContent?.paragraphs ?? content.introduction;
  const heroTags = selectedContent?.tags ?? content.heroTags;
  const specifications = [
    ["Fence system", content.fenceType],
    ["Post", "80 × 80 × 2.0 mm"],
    ["Material", "6063-T5 aluminum"],
    ["Slat direction", "Horizontal or vertical"],
    ["Frame", "40 × 60 × 1.5 mm"],
    ["Aluminum rectangular tube", "20 × 80 × 1.2 mm"],
    ["Surface finish", "Fluorocarbon powder coating"],
    ["Dimensions", "Confirmed for the site and approved drawing"],
  ] as const;
  const faqs = [...content.typeFaqs, ...commonFenceFaqs];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: selectedContent?.title ?? content.schemaName,
    category: content.schemaCategory,
    material: "6063-T5 aluminum",
    description: selectedContent?.seoDescription ?? content.schemaDescription,
    image: heroImage[0],
    manufacturer: { "@type": "Organization", name: "JUNSU" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Post", value: "80 × 80 × 2.0 mm" },
      { "@type": "PropertyValue", name: "Frame", value: "40 × 60 × 1.5 mm" },
      { "@type": "PropertyValue", name: "Aluminum rectangular tube", value: "20 × 80 × 1.2 mm" },
      { "@type": "PropertyValue", name: "Slat layout", value: "Horizontal or vertical" },
      { "@type": "PropertyValue", name: "Surface finish", value: "Fluorocarbon powder coating" },
    ],
  };

  return (
    <main className={`${gateStyles.page} ${gateStyles.foldingPage}`}>
      <section className={gateStyles.hero}>
        <div className={gateStyles.breadcrumb}><Link href="/products">Products</Link><span>/</span><span>Aluminum fences</span></div>
        <div className={gateStyles.heroGrid}>
          <figure className={`${gateStyles.heroMedia} site-reveal site-reveal-image`}>
            <Image src={heroImage[0]} alt={heroImage[1]} fill priority unoptimized sizes="(max-width: 900px) 100vw, 50vw" />
          </figure>
          <div className={`${gateStyles.heroCopy} site-reveal site-reveal-text`}>
            <p className={gateStyles.eyebrow}>{heroEyebrow}</p>
            <h1>{heroTitle}</h1>
            <p className={gateStyles.configuration}>{heroConfiguration}</p>
            <div className={gateStyles.introduction}>{heroParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className={`${gateStyles.heroTags} ${fenceDetailStyles.heroTags}`} aria-label="Selected aluminum fence characteristics">{heroTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <Link className={`button dark ${fenceDetailStyles.heroInquiry}`} href="/#quote">Send an inquiry <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className={gateStyles.stylesSection}>
        <header className={`${gateStyles.catalogHeading} site-reveal site-reveal-text`}>
          <div className={gateStyles.catalogCopy}>
            <h2>Aluminum Fencing That Completes the Landscape</h2>
            <p>From open-slat garden boundaries and louvered semi-privacy panels to closed privacy fencing, our powder-coated aluminum fence systems define outdoor spaces while complementing planting, architecture and matching gates. Horizontal or vertical layouts and project-specific spacing make them suitable for villa gardens, residential boundaries, landscape divisions and commercial perimeters.</p>
          </div>
          <div className={gateStyles.catalogActions}>
            <a href="/catalogs/junsu-aluminum-fence-catalog.pdf" target="_blank" rel="noopener noreferrer">Online preview <span aria-hidden="true">↗</span></a>
            <a className={gateStyles.catalogDownload} href="/catalogs/junsu-aluminum-fence-catalog.pdf" download="JUNSU-Aluminum-Fence-Catalog.pdf">Download PDF <span aria-hidden="true">↓</span></a>
          </div>
        </header>
        <nav className="fence-type-nav" aria-label="Fence system types">
          {typeLinks.map(([label, href]) => <Link className={label === content.activeLabel ? "fence-type-active" : undefined} href={href} key={href}>{label}</Link>)}
        </nav>
        <FenceStyleCarousel />
        <div className="fence-spacing-row site-reveal site-reveal-text">
          <div><p className={gateStyles.eyebrow}>Custom aluminum fence production</p><h3>{content.spacingTitle}</h3><p>{content.spacingCopy}</p></div>
          <div className="fence-factory-collage" aria-label="Factory samples showing customizable aluminum fence styles and spacing">
            <figure className="fence-factory-collage-wide">
              <Image src="/images/products/fences/factory-louver-spacing-compact.png" alt="Factory louvered aluminum fence samples showing different controlled blade spacing" fill unoptimized sizes="(max-width: 760px) 52vw, 31vw" />
            </figure>
            <figure className="fence-factory-collage-tall">
              <Image src="/images/products/fences/factory-custom-fence-samples-compact.png" alt="Factory display of custom aluminum fence panels in varied vertical, horizontal and decorative designs" fill unoptimized sizes="(max-width: 760px) 43vw, 25vw" />
            </figure>
          </div>
        </div>
      </section>

      <section className={gateStyles.specSection}>
        <div className={`${gateStyles.specContent} site-reveal site-reveal-text`}><p className={gateStyles.eyebrow}>Product specification</p><h2>Engineered for the boundary.</h2><p>Final panel dimensions, spacing, posts and connection details are reviewed against the site information and approved drawing before production.</p><dl className={gateStyles.specTable}>{specifications.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></div>
        <div className={`${gateStyles.specMosaic} site-reveal site-reveal-image`} aria-label="Fence material and production image area">
          <figure className={gateStyles.specImageLarge}><Image src="/images/products/fences/factory-fence-post-and-panels.webp" alt="Powder-coated aluminum fence post and prefabricated fence panels in the production workshop" fill unoptimized sizes="(max-width: 1050px) 100vw, 35vw" /></figure>
          <figure><Image src="/images/products/fences/fence-accessories-four-panel.webp" alt="Four-panel overview of powder-coated aluminum fence post caps, connectors, rivets and protective plugs" fill unoptimized sizes="(max-width: 1050px) 50vw, 20vw" /></figure>
          <figure><Image src="/images/products/fences/factory-fence-panels-loading-restored.webp" alt="Finished aluminum fence panels and packaged components prepared in the production workshop" fill unoptimized sizes="(max-width: 1050px) 50vw, 20vw" /></figure>
        </div>
      </section>

      <section className={gateStyles.applicationSection}>
        <header className={`${gateStyles.sectionHeading} site-reveal site-reveal-text`}><div><p className={gateStyles.eyebrow}>Application</p><h2>{content.applicationTitle}</h2></div><p>{content.applicationCopy}</p></header>
        <div className={gateStyles.applicationGrid}>
          {content.applications.map((application, index) => <figure className={`${gateStyles.applicationItem} ${index === 0 ? gateStyles.applicationLarge : ""} site-reveal site-reveal-image`} key={application.title}><div className={application.contain ? gateStyles.applicationContain : undefined}><Image src={application.src} alt={application.alt} fill unoptimized sizes={index === 0 ? "(max-width: 850px) 100vw, 65vw" : "(max-width: 850px) 100vw, 35vw"} /></div><figcaption><span>0{index + 1}</span>{application.title}</figcaption></figure>)}
        </div>
      </section>

      <section className={gateStyles.faqSection}>
        <div className={`${gateStyles.faqHeading} site-reveal site-reveal-text`}><p className={gateStyles.eyebrow}>Before your inquiry</p><h2>{content.faqHeading}</h2><div className={gateStyles.faqActions}><Link className="button dark" href="/#quote">Send an inquiry <span aria-hidden="true">→</span></Link><a className={gateStyles.whatsappButton} href="https://wa.me/8613525568065" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">→</span></a></div></div>
        <div className={`${gateStyles.faqList} site-reveal site-reveal-text`}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </main>
  );
}
