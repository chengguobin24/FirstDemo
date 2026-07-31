import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image
            src="/brand/junsu-shield.png"
            alt=""
            width={1254}
            height={1254}
          />
          <div><strong>JUNSU</strong><small>Become your go-to expert for scene matching</small></div>
        </div>
        <div><strong>Systems</strong><Link href="/products#fences">Fences</Link><Link href="/products#gates">Gates</Link><Link href="/products#pergolas">Pergolas</Link></div>
        <div><strong>Work with us</strong><Link href="/oem-odm">OEM / ODM</Link></div>
        <div><strong>Resources</strong><Link href="/blog">Blog</Link><Link href="/videos">Videos</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} JUNSU</span><span>Built for distributors, contractors and architectural projects.</span></div>
    </footer>
  );
}
