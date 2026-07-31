"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "@/app/admin/admin.module.css";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import {
  videoCategories,
  type VideoCategory,
  type VideoStatus,
  type WebsiteVideo,
} from "@/lib/video-types";
import { extractYouTubeId, youtubeWatchUrl } from "@/lib/youtube";

type EditorVideo = {
  id?: string;
  youtubeUrl: string;
  title: string;
  description: string;
  category: VideoCategory;
  status: VideoStatus;
  publishedAt: number | null;
};

const blankVideo: EditorVideo = {
  youtubeUrl: "",
  title: "",
  description: "",
  category: "fence",
  status: "hidden",
  publishedAt: null,
};

function toEditorVideo(video?: WebsiteVideo): EditorVideo {
  return video
    ? {
        id: video.id,
        youtubeUrl: youtubeWatchUrl(video.youtubeId),
        title: video.title,
        description: video.description,
        category: video.category,
        status: video.status,
        publishedAt: video.publishedAt,
      }
    : blankVideo;
}

export function VideoEditor({ initialVideo }: { initialVideo?: WebsiteVideo }) {
  const router = useRouter();
  const [video, setVideo] = useState<EditorVideo>(() => toEditorVideo(initialVideo));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const youtubeId = useMemo(
    () => extractYouTubeId(video.youtubeUrl),
    [video.youtubeUrl],
  );

  function patchVideo(patch: Partial<EditorVideo>) {
    setVideo((current) => ({ ...current, ...patch }));
    setMessage("");
  }

  async function save(status: "hidden" | "published") {
    setSaving(true);
    setMessage("");
    setIsError(false);
    try {
      const payload = { ...video, status };
      const endpoint = video.id
        ? `/api/admin/videos/${video.id}`
        : "/api/admin/videos";
      const response = await fetch(endpoint, {
        method: video.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as {
        video?: WebsiteVideo;
        error?: string;
      };
      if (!response.ok || !result.video) {
        throw new Error(result.error || "The video could not be saved.");
      }
      setVideo(toEditorVideo(result.video));
      setMessage(status === "published" ? "Video published." : "Video saved as hidden.");
      if (!initialVideo) router.replace(`/admin/videos/${result.video.id}`);
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "The video could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  async function archive() {
    if (!video.id || !window.confirm("Move this video to the archive?")) return;
    const response = await fetch(`/api/admin/videos/${video.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/admin/videos");
      router.refresh();
    } else {
      setIsError(true);
      setMessage("The video could not be archived.");
    }
  }

  return (
    <div className={styles.editor}>
      <header className={styles.editorTop}>
        <div>
          <Link href="/admin/videos">← Videos</Link>
          <span>{video.id ? "Edit video" : "New video"}</span>
          <strong>{video.status === "published" ? "Public" : video.status}</strong>
        </div>
        <div className={styles.editorActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={saving}
            onClick={() => save("hidden")}
          >
            Save hidden
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={saving}
            onClick={() => save("published")}
          >
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </header>

      {message ? (
        <div
          className={`${styles.message} ${isError ? styles.messageError : ""}`}
          role={isError ? "alert" : "status"}
        >
          {message}
        </div>
      ) : null}

      <div className={`${styles.editorLayout} ${styles.videoEditorLayout}`}>
        <main className={styles.editorMain}>
          <section className={styles.editorSection}>
            <p className={styles.sectionLabel}>YouTube video</p>
            <label className={styles.field}>
              <span>YouTube link or video ID</span>
              <input
                value={video.youtubeUrl}
                placeholder="https://www.youtube.com/watch?v=..."
                onChange={(event) => patchVideo({ youtubeUrl: event.target.value })}
              />
            </label>
            {video.youtubeUrl && !youtubeId ? (
              <p className={styles.inlineError}>
                Enter a valid youtube.com or youtu.be video link.
              </p>
            ) : null}
            <label className={styles.field}>
              <span>Video title</span>
              <input
                value={video.title}
                onChange={(event) => patchVideo({ title: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Short description</span>
              <textarea
                value={video.description}
                onChange={(event) => patchVideo({ description: event.target.value })}
              />
            </label>
          </section>
        </main>

        <aside className={styles.editorSidebar}>
          <section>
            <p className={styles.sectionLabel}>Classification</p>
            <label className={styles.field}>
              <span>Category</span>
              <select
                value={video.category}
                onChange={(event) => patchVideo({
                  category: event.target.value as VideoCategory,
                })}
              >
                {videoCategories.map((category) => (
                  <option value={category.value} key={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            <p className={styles.help}>
              Choose the video page category. It will appear under the matching
              horizontal filter.
            </p>
          </section>

          <section>
            <p className={styles.sectionLabel}>Player preview</p>
            {youtubeId ? (
              <YouTubePlayer
                className={styles.adminVideoPreview}
                videoId={youtubeId}
                title={video.title || "YouTube video preview"}
              />
            ) : (
              <div className={styles.videoPreviewEmpty}>
                Paste a valid YouTube link to preview the player.
              </div>
            )}
          </section>

          {video.id ? (
            <button className={styles.archiveButton} type="button" onClick={archive}>
              Archive video
            </button>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
