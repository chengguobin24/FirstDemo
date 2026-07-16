import type { MetadataRoute } from "next";
import { products, solutions } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/products", "/solutions", "/oem-odm", "/projects", "/videos", "/resources", "/about", "/contact", "/privacy", ...products.map((item) => `/products/${item.slug}`), ...solutions.map((item) => `/solutions/${item.slug}`)];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/contact" ? .9 : .7 }));
}
