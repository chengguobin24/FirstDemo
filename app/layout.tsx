import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "JUNSU | Custom Aluminum Fence, Gate & Pergola Systems", template: "%s | JUNSU" },
  description: "Project-specific aluminum fence, gate and pergola systems for distributors, contractors and architectural projects.",
  keywords: [
    "aluminum fence manufacturer",
    "aluminum gate manufacturer",
    "aluminum pergola manufacturer",
    "custom aluminum outdoor systems",
    "JUNSU aluminum systems",
  ],
  applicationName: "JUNSU Aluminum Systems",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "JUNSU Aluminum Systems",
    title: "JUNSU | Custom Aluminum Outdoor Systems",
    description: "Custom aluminum fences, gates and pergolas prepared for international project delivery.",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "JUNSU Aluminum Systems - fences, gates and pergolas" }],
  },
  twitter: { card: "summary_large_image", title: "JUNSU Aluminum Systems", description: "Custom aluminum fences, gates and pergolas for B2B projects.", images: ["/og.png"] },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Henan Junsu Technology Co., Ltd.",
    brand: "JUNSU",
    url: siteUrl,
    description: "Manufacturer of project-specific aluminum fence, gate and pergola systems.",
    telephone: "+86 135 2556 8065",
    email: "junsu@junsutech.com",
  };

  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
