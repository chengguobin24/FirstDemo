"use client";

import Image from "next/image";
import { useState } from "react";

type VideoCardProps = { title: string; category: string; description: string; poster: string; src: string | null };

export function VideoCard({ title, category, description, poster, src }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="video-card">
      <div className="video-frame">
        {playing && src ? <video controls autoPlay playsInline preload="metadata" poster={poster} aria-label={title}><source src={src} type="video/mp4" /></video> : <><Image src={poster} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" /><button type="button" disabled={!src} onClick={() => setPlaying(true)} aria-label={src ? `Play ${title}` : `${title} video pending`}><span aria-hidden="true">{src ? "▶" : "+"}</span>{src ? "Play video" : "Media pending"}</button></>}
      </div>
      <div className="video-copy"><span>{category}</span><h2>{title}</h2><p>{description}</p></div>
    </article>
  );
}
