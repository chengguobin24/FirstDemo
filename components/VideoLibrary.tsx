"use client";

import { useMemo, useState } from "react";
import { VideoCard } from "@/components/VideoCard";
import {
  videoCategories,
  type VideoCategory,
  type WebsiteVideo,
} from "@/lib/video-types";

type CategoryFilter = "all" | VideoCategory;

export function VideoLibrary({ videos }: { videos: WebsiteVideo[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const filteredVideos = useMemo(
    () => activeCategory === "all"
      ? videos
      : videos.filter((video) => video.category === activeCategory),
    [activeCategory, videos],
  );

  return (
    <>
      <div className="video-filters" aria-label="Video categories">
        <button
          type="button"
          className={activeCategory === "all" ? "active" : ""}
          onClick={() => setActiveCategory("all")}
          aria-pressed={activeCategory === "all"}
        >
          All <span>{videos.length}</span>
        </button>
        {videoCategories.map((category) => {
          const count = videos.filter((video) => video.category === category.value).length;
          return (
            <button
              type="button"
              className={activeCategory === category.value ? "active" : ""}
              onClick={() => setActiveCategory(category.value)}
              aria-pressed={activeCategory === category.value}
              key={category.value}
            >
              {category.shortLabel} <span>{count}</span>
            </button>
          );
        })}
      </div>

      {filteredVideos.length ? (
        <div className="video-grid">
          {filteredVideos.map((video) => <VideoCard key={video.id} {...video} />)}
        </div>
      ) : (
        <div className="video-empty">
          <span>Video library</span>
          <h2>No videos in this category yet.</h2>
          <p>New factory, product and installation footage will be added here.</p>
        </div>
      )}
    </>
  );
}
