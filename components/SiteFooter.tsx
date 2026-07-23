import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand"><span className="brand-mark">JS</span><div><strong>JUNSU</strong><small>Henan Junsu Technology Co., Ltd.</small></div></div>
        <div><strong>Systems</strong><Link href="/products#fences">Fences</Link><Link href="/products#gates">Gates</Link><Link href="/products#pergolas">Pergolas</Link></div>
        <div><strong>Work with us</strong><Link href="/oem-odm">OEM / ODM</Link><Link href="/projects">Projects</Link></div>
        <div><strong>Resources</strong><Link href="/videos">Videos</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} JUNSU</span><span>Built for distributors, contractors and architectural projects.</span></div>
    </footer>
  );
}
