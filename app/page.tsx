import Image from "next/image";
import Link from "next/link";
import { faqs, products, solutions } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image className="hero-image" src="/images/junsu-hero.jpg" alt="Coordinated aluminum fence, gate and pergola system on a modern residence" fill priority sizes="100vw" />
        <div className="hero-overlay" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">Manufacturer · Custom engineering · Global delivery</p>
          <h1>Aluminum systems<br /><em>shaped for space.</em></h1>
          <p>Coordinated fence, gate and pergola solutions developed for distributors, contractors and architectural projects.</p>
          <div className="hero-actions"><Link className="button dark" href="/products">Explore systems</Link><Link className="text-link" href="/contact">Send project drawing <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="hero-proof"><span>01</span><p>One coordinated product language across boundary, entrance and outdoor systems.</p></div>
      </section>

      <section className="section intro-section">
        <div className="section-index">01 / Product portfolio</div>
        <div className="split-heading"><div><p className="kicker ink">Focused product portfolio</p><h2>One partner for the complete<br /><em>aluminum exterior.</em></h2></div><p>Start with the system you need. Each inquiry is reviewed around application, dimensions, finish and destination instead of forcing a generic configuration.</p></div>
        <div className="product-grid">
          {products.map((product) => (
            <Link className="product-card" href={`/products/${product.slug}`} key={product.slug}>
              <div className={`system-diagram diagram-${product.number}`} aria-hidden="true"><span /><i /><b /></div>
              <div><span>{product.number} · {product.eyebrow}</span><h3>{product.name}</h3><p>{product.summary}</p><strong>Explore system ↗</strong></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section dark-section">
        <div className="section-index light">02 / Project support</div>
        <div className="split-heading"><div><p className="kicker">Built for B2B delivery</p><h2>More than a product supplier.</h2></div><p>Product configuration, drawing review and delivery preparation are organized around the people responsible for specifying, selling and installing each system.</p></div>
        <div className="solution-grid">
          {solutions.map((solution, index) => <Link href={`/solutions/${solution.slug}`} className="solution-card" key={solution.slug}><span>0{index + 1}</span><h3>{solution.name}</h3><p>{solution.summary}</p><b>View support model ↗</b></Link>)}
        </div>
      </section>

      <section className="section media-strategy">
        <div className="media-visual"><Image src="/images/junsu-hero.jpg" alt="Aluminum exterior system detail" fill sizes="(max-width: 900px) 100vw, 55vw" /><div className="media-label"><span>Factory & installation media</span><b>Loaded only when requested</b></div></div>
        <div className="media-copy"><p className="kicker ink">Fast by design</p><h2>Proof without a slow first screen.</h2><p>Factory and installation videos use lightweight poster images. The video file is requested only after a visitor chooses to play it, keeping the homepage responsive on mobile networks.</p><ul className="check-list"><li>Responsive WebP/AVIF poster images</li><li>Click-to-load video files</li><li>CDN caching and byte-range streaming</li><li>Separate mobile and desktop media</li></ul><Link className="button dark" href="/videos">View video library</Link></div>
      </section>

      <section className="section process-section">
        <div className="section-index">03 / Workflow</div>
        <div className="split-heading"><div><p className="kicker ink">Project workflow</p><h2>Clear at every step.</h2></div><p>Requirements become a confirmed production specification through five visible stages.</p></div>
        <ol className="process-list">
          {[ ["Brief", "Dimensions, quantity, use and destination"], ["Review", "Drawing, profiles, finish and interfaces"], ["Confirm", "Quotation, samples and production details"], ["Produce", "Fabrication, coating and documented checks"], ["Deliver", "Labeling, packaging and installation references"] ].map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}
        </ol>
      </section>

      <section className="section faq-section">
        <div><p className="kicker ink">Before you inquire</p><h2>Common project questions.</h2><Link className="text-link dark-text" href="/resources">All resources <span>↗</span></Link></div>
        <div className="faq-list">{faqs.slice(0, 4).map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>
    </>
  );
}
