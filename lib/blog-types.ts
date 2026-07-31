export type PostStatus = "draft" | "published" | "archived";

export type BlogBlock =
  | { id: string; type: "heading"; text: string; level: 2 | 3 }
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "image"; url: string; alt: string; caption?: string }
  | {
      id: string;
      type: "imageText";
      url: string;
      alt: string;
      heading: string;
      text: string;
      imagePosition: "left" | "right";
    }
  | {
      id: string;
      type: "gallery";
      images: Array<{ url: string; alt: string; caption?: string }>;
    }
  | {
      id: string;
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | { id: string; type: "checklist"; title?: string; items: string[] }
  | {
      id: string;
      type: "steps";
      title?: string;
      items: Array<{ title: string; text: string }>;
    }
  | {
      id: string;
      type: "callout";
      heading?: string;
      text: string;
      tone: "warm" | "dark";
    }
  | { id: string; type: "quote"; text: string; attribution?: string }
  | { id: string; type: "video"; url: string; title: string }
  | { id: string; type: "download"; url: string; label: string; note?: string }
  | {
      id: string;
      type: "products";
      title?: string;
      links: Array<{ label: string; url: string }>;
    }
  | {
      id: string;
      type: "inquiry";
      heading: string;
      text?: string;
      label: string;
    }
  | {
      id: string;
      type: "faq";
      title?: string;
      items: Array<{ question: string; answer: string }>;
    };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverAlt: string;
  seoTitle: string;
  seoDescription: string;
  status: PostStatus;
  blocks: BlogBlock[];
  publishedAt: number | null;
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
  deletedAt: number | null;
}

export type BlogPostInput = Omit<
  BlogPost,
  "id" | "createdAt" | "updatedAt" | "updatedBy" | "deletedAt"
> & {
  id?: string;
};

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverAlt: string;
  status: PostStatus;
  publishedAt: number | null;
  updatedAt: number;
  deletedAt: number | null;
}

export function createBlockId(): string {
  return crypto.randomUUID();
}
