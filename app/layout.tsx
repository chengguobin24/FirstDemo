import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "JUNSU | Custom Aluminum Fence, Gate & Pergola Systems", template: "%s | JUNSU" },
  description: "Project-specific aluminum fence, gate and pergola systems for distributors, contractors and architectural projects.",
  applicationName: "JUNSU Aluminum Systems",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "JUNSU Aluminum Systems",
    title: "JUNSU | Custom Aluminum Outdoor Systems",
    description: "Custom aluminum fences, gates and pergolas prepared for international project delivery.",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "JUNSU Aluminum Systems — Fences, Gates and Pergolas" }],
  },
  twitter: { card: "summary_large_image", title: "JUNSU Aluminum Systems", description: "Custom aluminum fences, gates and pergolas for B2B projects.", images: ["/og.png"] },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f1e9" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Henan Junsu Technology Co., Ltd.",
    brand: "JUNSU",
    url: siteUrl,
    description: "Manufacturer of project-specific aluminum fence, gate and pergola systems.",
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
