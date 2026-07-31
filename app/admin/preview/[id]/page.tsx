import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { BlogBlocks } from "@/components/BlogBlocks";
import { getAdminIdentity } from "@/lib/admin-auth";
import { getAdminPost } from "@/lib/blog-db";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function PreviewArticlePage({ params }: PageProps) {
  const identity = await getAdminIdentity(await headers());
  const { id } = await params;
  if (!identity) redirect(`/admin/login?next=/admin/preview/${encodeURIComponent(id)}`);
  const post = await getAdminPost(id).catch(() => null);
  if (!post) notFound();

  return (
    <div className={styles.previewPage}>
      <div className={styles.previewBar}>
        <span>Protected editorial preview · {post.status}</span>
        <Link href={`/admin/posts/${post.id}`}>Return to editor</Link>
      </div>
      <header className={styles.previewHero}>
        <p className="kicker ink">{post.category}</p>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>
      <main className={styles.previewBody}>
        <BlogBlocks blocks={post.blocks} />
      </main>
    </div>
  );
}
