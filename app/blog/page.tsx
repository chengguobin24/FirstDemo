/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedPosts } from "@/lib/blog-db";
import type { BlogPostSummary } from "@/lib/blog-types";
import styles from "./blog.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Aluminum Fence, Gate & Pergola Insights",
  description:
    "Practical sourcing, design and project guidance for aluminum fence, gate and pergola buyers.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Aluminum Fence, Gate & Pergola Insights | JUNSU",
    description:
      "Practical sourcing, design and project guidance for aluminum fence, gate and pergola buyers.",
    url: "/blog",
    images: [
      {
        url: "/og.png",
        alt: "JUNSU aluminum systems insights and buyer guides",
      },
    ],
  },
};

function formatDate(value: number | null): string {
  if (!value) return "Draft";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(value));
}

function coverAlt(post: BlogPostSummary): string {
  return post.coverAlt?.trim() || `${post.title} cover image`;
}

async function loadPosts(): Promise<BlogPostSummary[]> {
  try {
    return await listPublishedPosts();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <div className={styles.blogPage}>
      <section className={styles.index}>
        <div className={styles.indexHeader}>
          <h2>Latest insights</h2>
          <span>{posts.length} article{posts.length === 1 ? "" : "s"}</span>
        </div>
        {posts.length ? (
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link className={styles.card} href={`/blog/${post.slug}`} key={post.id}>
                <div className={styles.cardMedia}>
                  {post.coverImage ? <img src={post.coverImage} alt={coverAlt(post)} /> : null}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span>{post.category}</span>
                    <time>{formatDate(post.publishedAt)}</time>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <strong>Read article ↗</strong>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2>Editorial work is in progress.</h2>
            <p>New project and product insights will be published here.</p>
          </div>
        )}
      </section>
    </div>
  );
}
