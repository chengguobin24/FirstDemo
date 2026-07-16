"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import { navItems } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  function submitSearch(event: FormEvent<HTMLFormElement>) {
    const query = new FormData(event.currentTarget).get("q")?.toString().trim();
    if (!query) event.preventDefault();
  }

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="JUNSU home"><span className="brand-mark" aria-hidden="true">JS</span><span><strong>JUNSU</strong><small>Aluminum Systems</small></span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => <Link key={item.href} className={pathname.startsWith(item.href) ? "active" : ""} href={item.href}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <form className="header-search" action="/search" onSubmit={submitSearch} role="search"><label className="sr-only" htmlFor="site-search">Search the website</label><input id="site-search" name="q" type="search" placeholder="Search" /></form>
        <Link className="header-cta" href="/contact">Start a project <span aria-hidden="true">↗</span></Link>
      </div>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}><span /><span /><span className="sr-only">Menu</span></button>
      <div className={open ? "mobile-panel open" : "mobile-panel"} id="mobile-nav">
        <nav aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Start a project</Link></nav>
        <form action="/search" role="search" onSubmit={submitSearch}><label htmlFor="mobile-search">Search the website</label><div><input id="mobile-search" name="q" type="search" /><button type="submit">Search</button></div></form>
      </div>
    </header>
  );
}
