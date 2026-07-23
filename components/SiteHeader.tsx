"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="JUNSU home"><span className="brand-mark" aria-hidden="true">JS</span><span><strong>JUNSU</strong><small>Aluminum Systems</small></span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => item.href === "/products" ? <div className="nav-product" key={item.href}><Link className={pathname.startsWith("/products") ? "active" : ""} href="/products">Products</Link><div className="product-dropdown"><Link href="/products#fences">Aluminum Fences</Link><Link href="/products#gates">Aluminum Gates</Link><Link href="/products#pergolas">Aluminum Pergolas</Link></div></div> : <Link key={item.href} className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "active" : ""} href={item.href}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link className="header-cta" href="/#quote">Start a project <span aria-hidden="true">↗</span></Link>
      </div>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}><span /><span /><span className="sr-only">Menu</span></button>
      <div className={open ? "mobile-panel open" : "mobile-panel"} id="mobile-nav">
        <nav aria-label="Mobile navigation">{navItems.map((item) => item.href === "/products" ? <details className="mobile-products" key={item.href}><summary>Products</summary><Link href="/products#fences" onClick={() => setOpen(false)}>Aluminum Fences</Link><Link href="/products#gates" onClick={() => setOpen(false)}>Aluminum Gates</Link><Link href="/products#pergolas" onClick={() => setOpen(false)}>Aluminum Pergolas</Link></details> : <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/#quote" onClick={() => setOpen(false)}>Start a project</Link></nav>
      </div>
    </header>
  );
}
