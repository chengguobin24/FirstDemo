import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminSearchToolbar } from "@/components/AdminSearchToolbar";
import { getAdminIdentity } from "@/lib/admin-auth";
import { adminSearchMatches, readAdminQuery } from "@/lib/admin-search";
import { listAdminPosts } from "@/lib/blog-db";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

function formatDate(value: number): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(value));
}

type PageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function AdminPage({ searchParams }: PageProps) {
  const identity = await getAdminIdentity(await headers());
  if (!identity) redirect("/admin/login");
  const posts = await listAdminPosts().catch(() => []);
  const { q } = await searchParams;
  const query = readAdminQuery(q);
  const filteredPosts = posts.filter((post) => adminSearchMatches(
    query,
    [post.title, post.slug, post.category, post.status],
    [post.publishedAt, post.updatedAt],
  ));

  return (
    <div className={styles.adminPage}>
      <AdminHeader identity={identity} />
      <main className={styles.adminContent}>
        <AdminSearchToolbar
          action="/admin"
          query={query}
          newHref="/admin/posts/new"
          newLabel="New article"
          placeholder="Search article title or date — fence, Jul 29, 7/29"
        />

        {filteredPosts.length ? (
          <div className={styles.postTable}>
            {filteredPosts.map((post) => (
              <div className={styles.postRow} key={post.id}>
                <div><strong>{post.title}</strong><small>/blog/{post.slug}</small></div>
                <span>{post.category}</span>
                <span className={`${styles.status} ${post.status === "published" ? styles.statusPublished : ""}`}>{post.deletedAt ? "Deleted" : post.status}</span>
                <time>{formatDate(post.publishedAt || post.updatedAt)}</time>
                <Link href={`/admin/posts/${post.id}`}>Edit ↗</Link>
              </div>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
