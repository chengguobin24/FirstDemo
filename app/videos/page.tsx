import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { videoSlots } from "@/lib/site-data";

export const metadata: Metadata = { title: "Factory & Installation Videos", description: "Factory, production and installation video library for JUNSU aluminum systems.", alternates: { canonical: "/videos" } };

export default function VideosPage() {
  return <><section className="page-hero"><p className="kicker ink">Video library</p><h1>See how the systems<br /><em>are made and installed.</em></h1><p>Video files are loaded only when selected. This keeps the page responsive while still providing manufacturing and installation evidence.</p></section><section className="page-section"><div className="video-grid">{videoSlots.map((video) => <VideoCard key={video.slug} {...video} />)}</div></section></>;
}
