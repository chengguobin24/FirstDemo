import type { Metadata } from "next";
import { VideoLibrary } from "@/components/VideoLibrary";
import { listPublishedVideos } from "@/lib/video-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "JUNSU Videos",
  description: "Fence, gate, pavilion and installation videos for JUNSU aluminum systems.",
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "JUNSU Videos | Aluminum Fence, Gate & Pavilion Systems",
    description: "Fence, gate, pavilion and installation videos for JUNSU aluminum systems.",
    url: "/videos",
    images: [
      {
        url: "/og.png",
        alt: "JUNSU aluminum system video library",
      },
    ],
  },
};

export default async function VideosPage() {
  const videos = await listPublishedVideos().catch(() => []);

  return (
    <>
      <section className="page-hero video-page-hero">
        <p className="kicker ink">Video library</p>
        <h1>Videos</h1>
        <p>
          Browse fence, gate, pavilion and installation videos.
        </p>
      </section>
      <section className="page-section video-library-section">
        <VideoLibrary videos={videos} />
      </section>
    </>
  );
}
