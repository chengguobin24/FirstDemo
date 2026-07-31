const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function extractYouTubeId(value: string): string | null {
  const input = value.trim();
  if (YOUTUBE_ID_PATTERN.test(input)) return input;

  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    let candidate = "";

    if (host === "youtu.be") {
      candidate = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (
      host === "youtube.com"
      || host === "m.youtube.com"
      || host === "music.youtube.com"
    ) {
      if (url.pathname === "/watch") {
        candidate = url.searchParams.get("v") || "";
      } else {
        const [kind, id] = url.pathname.split("/").filter(Boolean);
        if (kind === "embed" || kind === "shorts" || kind === "live") {
          candidate = id || "";
        }
      }
    } else if (host === "youtube-nocookie.com") {
      const [kind, id] = url.pathname.split("/").filter(Boolean);
      if (kind === "embed") candidate = id || "";
    }

    return YOUTUBE_ID_PATTERN.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function youtubeEmbedUrl(videoId: string, autoplay = false): string {
  const query = new URLSearchParams({
    rel: "0",
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${query}`;
}

export function youtubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
