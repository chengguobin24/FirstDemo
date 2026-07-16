import Link from "next/link";

export default function NotFound() {
  return <section className="page-hero compact"><p className="kicker ink">404</p><h1>That page could not be found.</h1><p>The address may have changed. Return to the product overview or send us your project requirements.</p><div className="hero-actions"><Link className="button dark" href="/products">View products</Link><Link className="text-link dark-text" href="/contact">Contact us ↗</Link></div></section>;
}
