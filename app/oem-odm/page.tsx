import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./oem-page.module.css";

export const metadata: Metadata = {
  title: "OEM & ODM Aluminum Systems",
  description:
    "OEM and ODM support for aluminum fences, gates and pergolas, from drawing review and product development to branded production and delivery preparation.",
  alternates: { canonical: "/oem-odm" },
};

const faqs = [
  ["What should I send for an initial review?", "Share the product type, dimensions, application, target market and any available drawings or reference images. More complete information leads to a more useful first proposal."],
  ["How quickly can I receive an initial design?", "An initial design direction is prepared within three days after complete dimensions and project requirements are received."],
  ["Can I request a material sample?", "Yes. Material samples are supplied without charge; the customer arranges or pays the international freight."],
  ["What are the MOQ and production lead time?", "Both are confirmed according to the product, customization scope, final specifications and order quantity."],
] as const;

export default function OemPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <Image
            src="/images/oem-odm/junsu-gate-villa-soft-light-16x9.png"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className={styles.heroCopy}>
          <p className="kicker">OEM &amp; ODM service</p>
          <h1>Aluminum systems developed for your market.</h1>
          <p>
            Product and project support for importers, distributors, contractors,
            overseas brands and architectural design companies.
          </p>
          <div className={styles.actions}>
            <Link className="button light" href="/#quote">Start a project inquiry</Link>
            <a className={styles.whatsapp} href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              Contact on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.introduction}>
        <div className={styles.factoryImage}>
          <Image
            src="/images/oem-odm/factory-black-pergola-concrete-floor.png"
            alt="Matte black aluminum pergola being assembled inside the JUNSU factory"
            fill
            unoptimized
            sizes="(max-width: 1000px) 100vw, 50vw"
          />
        </div>
        <div className={styles.introCopy}>
          <p className="kicker ink">Our service</p>
          <h2>From your requirement to a production-ready solution.</h2>
          <p>
            JUNSU reviews drawings, checks manufacturing feasibility and supports
            the development of aluminum exterior systems. Existing models can be
            adapted, while new products are evaluated case by case before the scope
            is confirmed.
          </p>
          <div className={styles.commercialNotes}>
            <span>Flexible MOQ</span>
            <span>Free material samples*</span>
            <span>Customer design protection</span>
          </div>
          <small>* International sample freight is paid by the customer.</small>
        </div>
      </section>

      <section className={styles.materialSection}>
        <div className={styles.materialOverview}>
          <div className={styles.materialCopy}>
            <p className="kicker ink">Raw material advantage</p>
            <h2>6063-T5 aluminum for reliable outdoor systems.</h2>
            <p>
              JUNSU selects 6063-T5 aluminum for fence, gate and pergola
              profiles because it combines practical strength, dimensional
              stability and clean extrusion quality at a lower weight than
              steel. Its consistent surface also provides a dependable base for
              machining and powder coating. Profile dimensions, wall thickness
              and reinforcement are then matched to the product structure and
              intended application.
            </p>
          </div>
          <figure className={styles.materialVisual}>
            <Image
              src="/images/oem-odm/6063-t5-aluminum-factory-material.webp"
              alt="Raw 6063-T5 aluminum extrusion profiles stored on a rack inside the JUNSU factory"
              fill
              unoptimized
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </figure>
        </div>

        <div className={styles.materialCards}>
          <article>
            <span>01</span>
            <h3>6063-T5 material foundation</h3>
            <p>
              Selected for a useful balance of rigidity, lower weight,
              corrosion performance and surface quality, 6063-T5 gives JUNSU a
              consistent material base for exterior aluminum systems.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Drawing and structure support</h3>
            <p>
              Our technical team reviews dimensions, profile sections,
              connection details and installation conditions before production,
              helping turn customer concepts into practical manufacturing
              specifications.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Factory-controlled production</h3>
            <p>
              Material preparation, cutting, machining, surface finishing,
              trial assembly and packing are coordinated through one production
              process, with progress confirmation available for OEM / ODM
              projects.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.process}>
        <header>
          <p className="kicker ink">Cooperation process</p>
          <h2>A straightforward route from brief to delivery.</h2>
          <p>
            From complete requirements and feasibility review to production
            updates and export packing, each stage is confirmed before the next
            one begins.
          </p>
        </header>
        <figure className={styles.processVisual}>
          <div className={styles.processImage}>
            <Image
              src="/images/oem-odm/junsu-cooperation-process.png"
              alt="Eight-step JUNSU cooperation process from customer requirements to export-ready packing and delivery"
              fill
              unoptimized
              sizes="(max-width: 1000px) 100vw, 62vw"
            />
          </div>
          <figcaption>
            Eight coordinated steps from inquiry to export-ready delivery.
          </figcaption>
        </figure>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqIntro}>
          <p className="kicker ink">Frequently asked questions</p>
          <h2>Before you send a brief.</h2>
          <p>If your requirement is still at an early stage, send the information you already have. We will identify what needs to be confirmed next.</p>
        </div>
        <div className={styles.faqList}>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

    </main>
  );
}
