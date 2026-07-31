import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminSearchToolbar } from "@/components/AdminSearchToolbar";
import { getAdminIdentity } from "@/lib/admin-auth";
import { adminSearchMatches, readAdminQuery } from "@/lib/admin-search";
import { listAdminVideos } from "@/lib/video-db";
import { videoCategoryLabel } from "@/lib/video-types";
import styles from "../admin.module.css";

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

export default async function AdminVideosPage({ searchParams }: PageProps) {
  const identity = await getAdminIdentity(await headers());
  if (!identity) redirect("/admin/login?next=/admin/videos");
  const videos = await listAdminVideos().catch(() => []);
  const { q } = await searchParams;
  const query = readAdminQuery(q);
  const filteredVideos = videos.filter((video) => adminSearchMatches(
    query,
    [
      video.title,
      video.description,
      videoCategoryLabel(video.category),
      video.status,
      video.youtubeId,
    ],
    [video.publishedAt, video.updatedAt],
  ));

  return (
    <div className={styles.adminPage}>
      <AdminHeader identity={identity} active="videos" />
      <main className={styles.adminContent}>
        <AdminSearchToolbar
          action="/admin/videos"
          query={query}
          newHref="/admin/videos/new"
          newLabel="New video"
          placeholder="Search video title or date — gate, Jul 29, 7/29"
        />

        {filteredVideos.length ? (
          <div className={styles.postTable}>
            {filteredVideos.map((video) => (
              <div className={`${styles.postRow} ${styles.videoAdminRow}`} key={video.id}>
                <div>
                  <strong>{video.title}</strong>
                  <small>youtube.com/watch?v={video.youtubeId}</small>
                </div>
                <span>{videoCategoryLabel(video.category)}</span>
                <span
                  className={`${styles.status} ${
                    video.status === "published" ? styles.statusPublished : ""
                  }`}
                >
                  {video.status}
                </span>
                <time>{formatDate(video.updatedAt)}</time>
                <Link href={`/admin/videos/${video.id}`}>Edit ↗</Link>
              </div>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
