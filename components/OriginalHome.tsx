"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { InquiryForm } from "@/components/InquiryForm";
import styles from "@/components/OriginalHome.module.css";

type ProductKey = "fence" | "gate" | "pergola";

const products: Record<ProductKey, {
  number: string;
  name: string;
  label: string;
  title: string;
  copy: string;
  specs: string[];
  route: string;
  image: string;
  imageAlt: string;
}> = {
  fence: {
    number: "01",
    name: "Aluminum Privacy Fences",
    label: "Horizontal slat fence systems",
    title: "Custom aluminum privacy fence panels for modern boundaries.",
    copy: "Powder-coated horizontal slat aluminum fence panels and louvered privacy fencing configured for residential boundaries, commercial perimeter screening, custom dimensions and modular installation.",
    specs: ["Horizontal slat fence panels", "Privacy & semi-privacy options", "Powder-coated aluminum", "Custom project dimensions"],
    route: "/products#fences",
    image: "/images/products/aluminum-privacy-fence-carousel-v2.webp",
    imageAlt: "Dark gray horizontal slat aluminum privacy fence installed around a modern residence",
  },
  gate: {
    number: "02",
    name: "Aluminum Driveway Gates",
    label: "Sliding, swing & pedestrian gates",
    title: "Custom aluminum driveway gates coordinated with pedestrian access.",
    copy: "Powder-coated aluminum sliding gates, swing driveway gates and pedestrian gates prepared for automation, custom infill patterns and coordinated fence lines.",
    specs: ["Sliding driveway gates", "Swing & pedestrian gates", "Automation-ready designs", "Custom powder-coated finish"],
    route: "/products#gates",
    image: "/images/products/aluminum-driveway-gate-carousel-v2.webp",
    imageAlt: "Modern dark gray aluminum driveway gate with an integrated pedestrian access gate",
  },
  pergola: {
    number: "03",
    name: "Louvered Aluminum Pergolas",
    label: "Motorized louvered roof systems",
    title: "Motorized louvered pergolas for adaptable outdoor living.",
    copy: "Custom aluminum pergola systems with adjustable louvered roofs for patios, terraces, hospitality spaces and commercial outdoor areas, with drainage, lighting and screen options.",
    specs: ["Motorized adjustable louvers", "Integrated rain drainage", "LED lighting & side screens", "Freestanding or wall-mounted"],
    route: "/products#pergolas",
    image: "/images/products/motorized-louvered-pergola-carousel-v2.webp",
    imageAlt: "Freestanding aluminum pergola with an adjustable louvered roof in a landscaped garden",
  },
};

const factoryCapabilities = [
  ["01", "Engineering review", "Dimensions, interfaces and project drawings"],
  ["02", "Controlled production", "Fabrication and finish to confirmed details"],
  ["03", "Quality checks", "Dimensions, finish and component completeness"],
  ["04", "Export preparation", "Protected packing and component labeling"],
] as const;

const companyAdvantages = [
  ["01", "Factory-direct production", "Work directly with the manufacturer from requirement review through production preparation, reducing communication layers and keeping confirmed project details visible."],
  ["02", "Technical project support", "Our technical team reviews drawings, dimensions, interfaces and production feasibility, helping turn reference ideas into a clearer manufacturing direction."],
  ["03", "OEM / ODM development", "Existing systems can be adapted and new concepts assessed, with support for project colors, accessories, branding, documents, packaging and installation information."],
  ["04", "Quality-focused aluminum materials", "Specified aluminum profiles, finishes and compatible components are checked against the approved product direction before fabrication and assembly begin."],
] as const;

const companyAdvantageImages: Record<string, readonly [string, string]> = {
  "01": [
    "/images/home/factory-production-floor-restored.webp",
    "JUNSU aluminum production floor with fabricated frames and profiles prepared for manufacturing",
  ],
  "02": [
    "/images/home/cad-pergola-technical-support.webp",
    "JUNSU technical team reviewing a louvered pergola CAD drawing at a design workstation",
  ],
  "03": [
    "/images/home/factory-export-packing-crates.webp",
    "Export packing crates arranged inside the JUNSU aluminum systems factory",
  ],
  "04": [
    "/images/home/cnc-aluminum-profile-processing-restored.webp",
    "JUNSU factory operator processing aluminum profiles with CNC equipment",
  ],
};

const productKeys: ProductKey[] = ["fence", "gate", "pergola"];
const cx = (...names: Array<string | false | undefined>) => names.filter(Boolean).map((name) => styles[name as string]).join(" ");

export function OriginalHome() {
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeProduct, setActiveProduct] = useState<ProductKey>("fence");
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (carouselPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setActiveProduct((current) => productKeys[(productKeys.indexOf(current) + 1) % productKeys.length]);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [activeProduct, carouselPaused]);

  const product = products[activeProduct];
  const moveProduct = (step: number) => {
    const current = productKeys.indexOf(activeProduct);
    setActiveProduct(productKeys[(current + step + productKeys.length) % productKeys.length]);
  };

  return (
    <div className={`${cx("page")} site-home-page`}>
      <div className={cx("scroll-progress")} aria-hidden="true"><span ref={progressRef} /></div>
      <div>
        <section className={`${cx("factory-hero")} site-home-hero`} id="top">
          <div className={cx("factory-media")}>
            <Image src="/images/junsu-hero.jpg" alt="Coordinated dark aluminum fence, sliding gate and louvered pergola at a modern residence" fill priority unoptimized sizes="100vw" />
          </div>
          <div className={cx("hero-grid")} aria-hidden="true" />
          <div className={cx("factory-copy")}><p className={cx("kicker")}>Fence · Gate · Pergola systems</p><h1>One exterior language,<br /><em>engineered around the project.</em></h1><p>JUNSU develops project-specific aluminum fence, gate and pergola systems for distributors, contractors and architectural projects.</p><div className={cx("hero-actions")}><Link className={cx("button")} href="/products">Explore our systems</Link><Link className={cx("line-link")} href="/#quote">Discuss your project <span>↗</span></Link></div></div>
          <div className={cx("capability-strip")}>{factoryCapabilities.map(([number, title, copy]) => <div key={number}><span>{number}</span><strong>{title}</strong><small>{copy}</small></div>)}</div>
        </section>

        <section className={cx("products-screen")} id="products">
          <div className={cx("section-heading")}><p className={cx("kicker", "dark")}>Product categories</p></div>
          <div className={cx("product-carousel")} onMouseEnter={() => setCarouselPaused(true)} onMouseLeave={() => setCarouselPaused(false)} onFocusCapture={() => setCarouselPaused(true)} onBlurCapture={() => setCarouselPaused(false)}>
            <div className={cx("product-tabs")} role="tablist" aria-label="Product categories">{productKeys.map((key) => <button key={key} className={cx(activeProduct === key && "active")} type="button" role="tab" aria-selected={activeProduct === key} onClick={() => setActiveProduct(key)}><span>{products[key].number}</span>{products[key].name}</button>)}</div>
            <div className={cx("product-slide")} key={activeProduct}>
              <div className={cx("product-media")}>
                <Link className={cx("product-visual")} href={product.route} aria-label={`View ${product.name}`}><Image key={product.image} src={product.image} alt={product.imageAlt} fill unoptimized sizes="(max-width: 1150px) 100vw, 42vw" /><span>{product.name}</span></Link>
                <div className={cx("carousel-controls")} aria-label="Product carousel controls"><button type="button" onClick={() => moveProduct(-1)} aria-label="Previous product"><span className={cx("carousel-chevron")} aria-hidden="true" /></button><span aria-live="polite">{productKeys.indexOf(activeProduct) + 1} / {productKeys.length}</span><button type="button" onClick={() => moveProduct(1)} aria-label="Next product"><span className={cx("carousel-chevron")} aria-hidden="true" /></button></div>
              </div>
              <div className={cx("product-detail")}><p className={cx("product-label")}>{product.label} / {product.number}</p><h3>{product.title}</h3><p>{product.copy}</p><div className={cx("spec-list")}>{product.specs.map((spec) => <span key={spec}>{spec}</span>)}</div><div className={cx("product-actions")}><Link className={cx("button", "bronze")} href={product.route}>View product</Link><Link className={cx("line-link", "dark-link")} href="/#quote">Request specifications <span>↗</span></Link></div></div>
            </div>
          </div>
        </section>

        <section className={cx("advantages-screen")}>
          <header className={cx("advantage-heading")}>
            <h2>WHY CHOOSE JUNSU ALUMINUM?</h2>
            <div className={cx("advantage-summary")}>
              <p>JUNSU Aluminum combines strong production capability with responsive technical service to support projects from the first idea through manufacturing and delivery. Our team works closely with importers, distributors, contractors and project professionals to review drawings, refine product details, coordinate materials and finishes, and develop practical OEM / ODM solutions for different market requirements.</p>
              <p>We are more than an aluminum product manufacturer. We help customers identify potential issues, improve product feasibility and turn project requirements into reliable, production-ready solutions. With direct factory coordination, experienced technical support and a focus on quality materials, JUNSU makes complex custom projects easier to manage.</p>
            </div>
          </header>
          <div className={cx("advantage-grid")}>
            {companyAdvantages.map(([number, title, copy]) => {
              const advantageImage = companyAdvantageImages[number];

              return (
                <article className={cx("advantage-item")} key={number}>
                  <div className={cx("advantage-media")}>
                    {advantageImage ? (
                      <Image
                        src={advantageImage[0]}
                        alt={advantageImage[1]}
                        fill
                        unoptimized
                        sizes="(max-width: 700px) 78vw, 260px"
                      />
                    ) : (
                      <span>Image {number}</span>
                    )}
                  </div>
                  <div className={cx("advantage-item-copy")}>
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={cx("about-screen")}>
          <div><p className={cx("kicker")}>About us</p><h2>JUNSU</h2><span className={cx("about-word")}>ABOUT US</span></div>
          <div className={cx("about-copy")}><h3>A focused partner for aluminum outdoor systems.</h3><p>Henan Junsu Technology Co., Ltd. develops aluminum fence, gate and pergola solutions around project requirements. Our role is to connect product configuration, manufacturing preparation and export delivery through one clear working process.</p><p>We support distributors, contractors and project teams that need coordinated products, drawing review, finish selection and practical delivery preparation.</p><div className={cx("audiences")}><span>Distributors</span><span>Contractors</span><span>Architectural projects</span></div><Link className={cx("button", "light")} href="/about">Read our story</Link></div>
        </section>

        <section className={cx("quote-screen")} id="quote">
          <div className={cx("quote-copy")}><p className={cx("kicker", "dark")}>Start a project</p><h2>Tell us what<br /><em>you need.</em></h2><p>Share the product, dimensions, quantity, finish and destination. Attach a drawing or reference image when available.</p></div>
          <InquiryForm variant="original" />
        </section>
      </div>
    </div>
  );
}
