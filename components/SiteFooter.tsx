import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead"><div><p className="kicker">Project-specific support</p><h2>Have dimensions or a drawing?</h2></div><Link className="button light" href="/contact">Send your requirements <span aria-hidden="true">↗</span></Link></div>
      <div className="footer-grid">
        <div className="footer-brand"><span className="brand-mark">JS</span><div><strong>JUNSU</strong><small>Henan Junsu Technology Co., Ltd.</small></div></div>
        <div><strong>Systems</strong><Link href="/products/aluminum-fences">Fences</Link><Link href="/products/aluminum-gates">Gates</Link><Link href="/products/aluminum-pergolas">Pergolas</Link></div>
        <div><strong>Work with us</strong><Link href="/solutions">Solutions</Link><Link href="/oem-odm">OEM / ODM</Link><Link href="/projects">Projects</Link></div>
        <div><strong>Resources</strong><Link href="/videos">Videos</Link><Link href="/resources">Downloads & FAQ</Link><Link href="/privacy">Privacy</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} JUNSU</span><span>Built for distributors, contractors and architectural projects.</span></div>
    </footer>
  );
}
