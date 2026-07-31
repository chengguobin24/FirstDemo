"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
} from "@/lib/youtube";

export function YouTubePlayer({
  videoId,
  title,
  className = "",
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`youtube-player ${className}`.trim()}>
      {playing ? (
        <iframe
          src={youtubeEmbedUrl(videoId, true)}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          <img src={youtubeThumbnailUrl(videoId)} alt={`${title} video thumbnail`} />
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
            <span aria-hidden="true">▶</span>
            Play video
          </button>
        </>
      )}
      <a
        className="youtube-fallback"
        href={youtubeWatchUrl(videoId)}
        target="_blank"
        rel="noreferrer"
      >
        Watch on YouTube ↗
      </a>
    </div>
  );
}
