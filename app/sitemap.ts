import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog-db";
import { products } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = [
    "",
    "/products",
    "/oem-odm",
    "/videos",
    "/blog",
    "/about",
    "/products/aluminum-gates/swing-gates",
    "/products/aluminum-gates/folding-gates",
    "/products/aluminum-gates/sliding-gates",
    "/products/aluminum-fences/open-slat-fences",
    "/products/aluminum-fences/privacy-fences",
    "/products/aluminum-fences/semi-privacy-fences",
    ...products.map((item) => `/products/${item.slug}`),
  ];
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/blog" ? .8 : .7,
  }));

  try {
    const posts = await listPublishedPosts();
    return [
      ...staticEntries,
      ...posts.map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: .7,
      })),
    ];
  } catch {
    return staticEntries;
  }
}
