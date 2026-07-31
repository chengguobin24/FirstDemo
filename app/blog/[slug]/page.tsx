/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBlocks } from "@/components/BlogBlocks";
import { ShareBar } from "@/components/ShareBar";
import { getPublishedPostBySlug, listPublishedPosts } from "@/lib/blog-db";
import styles from "../blog.module.css";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

function formatDate(value: number | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function coverAlt(post: { title: string; coverAlt?: string }): string {
  return post.coverAlt?.trim() || `${post.title} cover image`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPublishedPostBySlug(slug);
    if (!post) return { title: "Article not found" };
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        type: "article",
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        publishedTime: post.publishedAt
          ? new Date(post.publishedAt).toISOString()
          : undefined,
        modifiedTime: new Date(post.updatedAt).toISOString(),
        images: post.coverImage ? [{ url: post.coverImage, alt: coverAlt(post) }] : [],
      },
    };
  } catch {
    return { title: "JUNSU Journal" };
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const related = (await listPublishedPosts().catch(() => []))
    .filter((item) => item.id !== post.id)
    .slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [new URL(post.coverImage, siteUrl).toString()] : [],
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : undefined,
    dateModified: new Date(post.updatedAt).toISOString(),
    author: { "@type": "Organization", name: "JUNSU Aluminum Systems" },
    publisher: { "@type": "Organization", name: "JUNSU Aluminum Systems" },
    mainEntityOfPage: articleUrl,
  };

  return (
    <article className={styles.article}>
      <header className={styles.articleHero}>
        <div className={styles.articleMeta}>
          <span>{post.category}</span>
          <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>
      {post.coverImage ? <img className={styles.cover} src={post.coverImage} alt={coverAlt(post)} /> : null}
      <div className={styles.articleLayout}>
        <aside className={styles.articleAside}>
          <Link className={styles.backLink} href="/blog">← All articles</Link>
          <ShareBar title={post.title} url={articleUrl} />
        </aside>
        <div className={styles.articleBody}>
          <BlogBlocks blocks={post.blocks} />
        </div>
      </div>

      {related.length ? (
        <section className={styles.related}>
          <p className="kicker ink">Continue reading</p>
          <h2>Related insights</h2>
          <div className={styles.grid}>
            {related.map((item) => (
              <Link className={styles.card} href={`/blog/${item.slug}`} key={item.id}>
                <div className={styles.cardMedia}>
                  {item.coverImage ? <img src={item.coverImage} alt={coverAlt(item)} /> : null}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}><span>{item.category}</span></div>
                  <h2>{item.title}</h2>
                  <p>{item.excerpt}</p>
                  <strong>Read article ↗</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </article>
  );
}
