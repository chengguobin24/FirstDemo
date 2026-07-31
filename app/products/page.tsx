import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aluminum Fences, Gates & Pergolas",
  description: "Explore JUNSU aluminum fence, gate and pergola systems for residential, commercial and project applications.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Aluminum Fences, Gates & Pergolas | JUNSU",
    description: "Explore JUNSU aluminum fence, gate and pergola systems for residential, commercial and project applications.",
    url: "/products",
    images: [
      {
        url: "/images/junsu-hero-edited-gate-pergola.png",
        alt: "JUNSU coordinated aluminum fence, gate and pergola systems",
      },
    ],
  },
};

const collections = [
  {
    id: "fences",
    number: "01",
    eyebrow: "Aluminum fence systems",
    title: "Fences",
    description: "A visual selection of aluminum fence systems. Styles, dimensions, spacing and finishes can be reviewed around the installation setting and project requirements.",
    selectionNote: "Selected references only—not a fixed catalogue. Slat direction, spacing, privacy level and panel proportions are developed around each project.",
    detail: "/products/aluminum-fences",
    guide: {
      title: "Fence Style & Privacy Guide",
      copy: "Compare representative layouts before we develop the spacing, privacy and proportions for your project.",
    },
    images: [
      ["/images/product-gallery/fences/fence-01.jpg", "Installed dark aluminum fence with solid panels and louvered upper sections", "tall"],
      ["/images/product-gallery/fences/fence-02.png", "Dark aluminum louver privacy fence enclosing a modern landscaped patio", "standard"],
      ["/images/product-gallery/fences/fence-03.jpg", "Vertical aluminum boundary fence in front of a residence", "wide"],
      ["/images/product-gallery/fences/fence-04.png", "Horizontal slat aluminum fence installed along a residential boundary", "wide"],
      ["/images/product-gallery/fences/fence-05.png", "Solid horizontal aluminum privacy fence panels", "standard"],
      ["/images/product-gallery/fences/fence-options-compact.png", "Compact selection of available aluminum fence panel styles", "standard"],
    ],
  },
  {
    id: "gates",
    number: "02",
    eyebrow: "Aluminum gate systems",
    title: "Gates",
    description: "Aluminum entrance systems shown without fixed style labels. Opening method, dimensions, infill, hardware and automation can be configured for the site and customer preference.",
    selectionNote: "Selected references only—not a fixed catalogue. Opening method, panel layout, pedestrian access and decorative details can be configured for the entrance.",
    detail: "/products/aluminum-gates",
    guide: {
      title: "Gate Opening & Configuration Guide",
      copy: "Use these representative arrangements to begin planning the opening method, access and panel design.",
    },
    images: [
      ["/images/product-gallery/gates/gate-01.jpg", "Dark aluminum pedestrian entrance gate", "tall"],
      ["/images/product-gallery/gates/gate-02.jpg", "Decorative dark aluminum residential entrance door", "tall"],
      ["/images/product-gallery/gates/gate-03.jpg", "Wide aluminum entrance gate with integrated pedestrian access", "wide"],
      ["/images/product-gallery/gates/gate-04.png", "Modern double aluminum entrance gate", "standard"],
      ["/images/product-gallery/gates/gate-05.jpg", "Wide folding aluminum courtyard gate", "standard"],
      ["/images/product-gallery/gates/gate-06.jpg", "Aluminum louver entrance gate at a modern residence", "wide"],
      ["/images/product-gallery/gates/gate-07.jpg", "Long dark aluminum driveway gate with pedestrian door", "wide"],
      ["/images/product-gallery/gates/gate-08.png", "Decorative aluminum driveway and pedestrian gate system", "standard"],
      ["/images/product-gallery/gates/gate-09.png", "Diagram of customizable aluminum entrance configurations", "standard"],
    ],
  },
  {
    id: "pergolas",
    number: "03",
    eyebrow: "Aluminum pergola systems",
    title: "Pergolas",
    description: "Aluminum outdoor structures for patios, gardens and hospitality spaces. Roof configuration, size, lighting, screens and mounting method can be reviewed for each project.",
    selectionNote: "Selected references only—not a fixed catalogue. Dimensions, mounting, roof system, color and compatible side elements are reviewed for the site.",
    detail: "/products/aluminum-pergolas",
    guide: {
      title: "Pergola Layout & Configuration Guide",
      copy: "Review representative layouts, then confirm the dimensions, roof, mounting and side elements with our team.",
    },
    images: [
      ["/images/product-gallery/pergolas/pergola-01.jpg", "White aluminum pergola over a residential outdoor seating area", "standard"],
      ["/images/product-gallery/pergolas/pergola-02.jpg", "Freestanding aluminum pergola beside a residential pool", "standard"],
      ["/images/product-gallery/pergolas/pergola-03.jpg", "Decorative fixed-roof garden pergola", "standard"],
      ["/images/product-gallery/pergolas/pergola-04.jpg", "Wide white aluminum pergola in a landscaped garden", "wide"],
      ["/images/product-gallery/pergolas/pergola-05.jpg", "Enclosed aluminum louvered pergola with lighting and glass screens", "tall"],
      ["/images/product-gallery/pergolas/pergola-06.png", "Diagram of aluminum pergola installation configurations", "wide"],
    ],
  },
] as const;

function getProductDetailHref(collectionId: string, detail: string, index: number) {
  if (collectionId === "fences") {
    const route = index < 2
      ? "/products/aluminum-fences/semi-privacy-fences"
      : index < 4
        ? "/products/aluminum-fences/open-slat-fences"
        : "/products/aluminum-fences/privacy-fences";
    const image = `fence-${String(index + 1).padStart(2, "0")}`;

    return `${route}?image=${image}`;
  }

  if (collectionId === "pergolas") {
    const image = `pergola-${String(index + 1).padStart(2, "0")}`;
    return `${detail}?image=${image}`;
  }

  if (collectionId !== "gates") return detail;

  const route = index < 4
    ? "/products/aluminum-gates/swing-gates"
    : index < 6
      ? "/products/aluminum-gates/folding-gates"
      : "/products/aluminum-gates/sliding-gates";
  const image = `gate-${String(index + 1).padStart(2, "0")}`;

  return `${route}?image=${image}`;
}

export default function ProductsPage() {
  return (
    <>
      {collections.map((collection) => (
        <section className="products-page-collection" id={collection.id} key={collection.id}>
          <header className="products-page-collection-header">
            <div><p className="kicker ink">{collection.number} · {collection.eyebrow}</p><h2>{collection.title}</h2></div>
            <div><p>{collection.description}</p><p className="products-page-collection-note">{collection.selectionNote}</p><Link className="text-link dark-text" href={collection.detail}>View {collection.title.toLowerCase()} capabilities ↗</Link></div>
          </header>
          <div className="products-page-gallery">
            {collection.images.map(([src, alt], index) => {
              const isGuide = index === collection.images.length - 1;

              if (isGuide) {
                return (
                  <figure className="products-page-gallery-item products-page-gallery-guide" key={src}>
                    <div className="products-page-gallery-guide-media">
                      <Image src={src} alt={alt} fill unoptimized sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                    </div>
                    <figcaption>
                      <strong>{collection.guide.title}</strong>
                      <span>{collection.guide.copy}</span>
                    </figcaption>
                  </figure>
                );
              }

              return (
                <Link className="products-page-gallery-item" href={getProductDetailHref(collection.id, collection.detail, index)} key={src} aria-label={`View ${collection.title.toLowerCase()} details`}>
                  <Image src={src} alt={alt} fill unoptimized sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  <span className="products-page-gallery-label">{collection.eyebrow} · {String(index + 1).padStart(2, "0")}</span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
