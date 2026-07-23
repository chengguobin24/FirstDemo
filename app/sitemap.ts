import type { MetadataRoute } from "next";
import { products } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/products", "/oem-odm", "/projects", "/videos", "/about", "/products/aluminum-gates/swing-gates", "/products/aluminum-gates/folding-gates", "/products/aluminum-gates/sliding-gates", "/products/aluminum-fences/open-slat-fences", "/products/aluminum-fences/privacy-fences", "/products/aluminum-fences/semi-privacy-fences", ...products.map((item) => `/products/${item.slug}`)];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : .7 }));
}
