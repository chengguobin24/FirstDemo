export const videoCategories = [
  { value: "fence", label: "Fence", shortLabel: "Fence" },
  { value: "gate", label: "Gate", shortLabel: "Gate" },
  { value: "pavilion", label: "Pavilion", shortLabel: "Pavilion" },
  { value: "installation", label: "Installation", shortLabel: "Installation" },
] as const;

export type VideoCategory = (typeof videoCategories)[number]["value"];
export type VideoStatus = "hidden" | "published" | "archived";

export interface WebsiteVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: VideoCategory;
  status: VideoStatus;
  publishedAt: number | null;
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
}

export type WebsiteVideoInput = Omit<
  WebsiteVideo,
  "id" | "createdAt" | "updatedAt" | "updatedBy"
> & {
  id?: string;
  youtubeUrl?: string;
};

export function normalizeVideoCategory(category: string): VideoCategory {
  switch (category) {
    case "aluminum-fences":
      return "fence";
    case "aluminum-gates":
      return "gate";
    case "aluminum-pergolas":
      return "pavilion";
    case "factory-production":
    case "installation-guides":
      return "installation";
    default:
      return videoCategories.some((item) => item.value === category)
        ? category as VideoCategory
        : "installation";
  }
}

export function videoCategoryLabel(category: VideoCategory): string {
  return videoCategories.find((item) => item.value === category)?.label || category;
}
