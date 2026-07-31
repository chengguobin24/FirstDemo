import { YouTubePlayer } from "@/components/YouTubePlayer";
import { videoCategoryLabel, type WebsiteVideo } from "@/lib/video-types";

export function VideoCard({
  youtubeId,
  title,
  category,
  description,
}: Pick<WebsiteVideo, "youtubeId" | "title" | "category" | "description">) {
  return (
    <article className="video-card">
      <YouTubePlayer className="video-frame" videoId={youtubeId} title={title} />
      <div className="video-copy">
        <span>{videoCategoryLabel(category)}</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </article>
  );
}
