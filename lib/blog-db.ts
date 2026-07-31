import { demoPost } from "./blog-demo";
import type {
  BlogBlock,
  BlogPost,
  BlogPostInput,
  BlogPostSummary,
  PostStatus,
} from "./blog-types";
import { getD1Database } from "./cloudflare-context";

type PostRow = {
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
  contentJson: string;
  publishedAt: number | null;
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
  deletedAt: number | null;
};

const schemaPromises = new WeakMap<object, Promise<void>>();

const selectPostColumns = `
  id,
  slug,
  title,
  excerpt,
  category,
  cover_image AS coverImage,
  cover_alt AS coverAlt,
  seo_title AS seoTitle,
  seo_description AS seoDescription,
  status,
  content_json AS contentJson,
  published_at AS publishedAt,
  created_at AS createdAt,
  updated_at AS updatedAt,
  updated_by AS updatedBy,
  deleted_at AS deletedAt
`;

function requireDatabase(): D1Database {
  const db = getD1Database();
  if (!db) {
    throw new Error("The blog database binding is unavailable.");
  }
  return db;
}

async function initializeDatabase(db: D1Database): Promise<void> {
  const existing = schemaPromises.get(db as object);
  if (existing) {
    return existing;
  }

  const initialization = (async () => {
    await db.batch([
      db.prepare(`
        CREATE TABLE IF NOT EXISTS posts (
          id TEXT PRIMARY KEY NOT NULL,
          slug TEXT NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT NOT NULL DEFAULT '',
          category TEXT NOT NULL DEFAULT 'Insights',
          cover_image TEXT NOT NULL DEFAULT '',
          cover_alt TEXT NOT NULL DEFAULT '',
          seo_title TEXT NOT NULL DEFAULT '',
          seo_description TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL DEFAULT 'draft'
            CHECK (status IN ('draft', 'published', 'archived')),
          content_json TEXT NOT NULL DEFAULT '[]',
          published_at INTEGER,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL,
          updated_by TEXT NOT NULL,
          deleted_at INTEGER
        )
      `),
      db.prepare(
        "CREATE UNIQUE INDEX IF NOT EXISTS posts_slug_unique ON posts (slug)",
      ),
      db.prepare(
        "CREATE INDEX IF NOT EXISTS posts_status_published_idx ON posts (status, published_at)",
      ),
      db.prepare(`
        CREATE TABLE IF NOT EXISTS post_revisions (
          id TEXT PRIMARY KEY NOT NULL,
          post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
          snapshot_json TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          created_by TEXT NOT NULL
        )
      `),
      db.prepare(
        "CREATE INDEX IF NOT EXISTS post_revisions_post_idx ON post_revisions (post_id, created_at)",
      ),
    ]);

    if (process.env.NODE_ENV !== "production") {
      const count = await db
        .prepare("SELECT COUNT(*) AS count FROM posts")
        .first<{ count: number }>();
      if (!count?.count) {
        await insertPost(db, demoPost, "local-editorial-preview@junsu.dev");
      }
    }
  })();

  schemaPromises.set(db as object, initialization);
  return initialization;
}

async function readyDatabase(): Promise<D1Database> {
  const db = requireDatabase();
  await initializeDatabase(db);
  return db;
}

function parseBlocks(contentJson: string): BlogBlock[] {
  try {
    const parsed = JSON.parse(contentJson);
    return Array.isArray(parsed) ? (parsed as BlogBlock[]) : [];
  } catch {
    return [];
  }
}

function rowToPost(row: PostRow): BlogPost {
  return {
    ...row,
    blocks: parseBlocks(row.contentJson),
  };
}

function summaryFromRow(row: PostRow): BlogPostSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    coverImage: row.coverImage,
    coverAlt: row.coverAlt,
    status: row.status,
    publishedAt: row.publishedAt,
    updatedAt: row.updatedAt,
    deletedAt: row.deletedAt,
  };
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string"
    ? value.replace(/\u0000/g, "").trim().slice(0, maxLength)
    : "";
}

function cleanUrl(value: unknown): string {
  const url = cleanText(value, 2_000);
  if (!url) return "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? url : "";
  } catch {
    return "";
  }
}

function cleanList(value: unknown, maxItems = 30): string[] {
  return Array.isArray(value)
    ? value.slice(0, maxItems).map((item) => cleanText(item, 1_000)).filter(Boolean)
    : [];
}

function cleanBlocks(value: unknown): BlogBlock[] {
  if (!Array.isArray(value)) return [];

  return value.slice(0, 80).flatMap((raw): BlogBlock[] => {
    if (!raw || typeof raw !== "object") return [];
    const block = raw as Record<string, unknown>;
    const id = cleanText(block.id, 80) || crypto.randomUUID();

    switch (block.type) {
      case "heading":
        return [{
          id,
          type: "heading",
          text: cleanText(block.text, 300),
          level: block.level === 3 ? 3 : 2,
        }];
      case "paragraph":
        return [{ id, type: "paragraph", text: cleanText(block.text, 12_000) }];
      case "image":
        return [{
          id,
          type: "image",
          url: cleanUrl(block.url),
          alt: cleanText(block.alt, 300),
          caption: cleanText(block.caption, 500),
        }];
      case "imageText":
        return [{
          id,
          type: "imageText",
          url: cleanUrl(block.url),
          alt: cleanText(block.alt, 300),
          heading: cleanText(block.heading, 300),
          text: cleanText(block.text, 6_000),
          imagePosition: block.imagePosition === "right" ? "right" : "left",
        }];
      case "gallery": {
        const images = Array.isArray(block.images)
          ? block.images.slice(0, 12).flatMap((item) => {
              if (!item || typeof item !== "object") return [];
              const image = item as Record<string, unknown>;
              const url = cleanUrl(image.url);
              return url
                ? [{
                    url,
                    alt: cleanText(image.alt, 300),
                    caption: cleanText(image.caption, 500),
                  }]
                : [];
            })
          : [];
        return [{ id, type: "gallery", images }];
      }
      case "table":
        return [{
          id,
          type: "table",
          caption: cleanText(block.caption, 300),
          headers: cleanList(block.headers, 8),
          rows: Array.isArray(block.rows)
            ? block.rows.slice(0, 40).map((row) => cleanList(row, 8))
            : [],
        }];
      case "checklist":
        return [{
          id,
          type: "checklist",
          title: cleanText(block.title, 300),
          items: cleanList(block.items),
        }];
      case "steps":
        return [{
          id,
          type: "steps",
          title: cleanText(block.title, 300),
          items: Array.isArray(block.items)
            ? block.items.slice(0, 20).flatMap((item) => {
                if (!item || typeof item !== "object") return [];
                const step = item as Record<string, unknown>;
                return [{
                  title: cleanText(step.title, 300),
                  text: cleanText(step.text, 2_000),
                }];
              })
            : [],
        }];
      case "callout":
        return [{
          id,
          type: "callout",
          heading: cleanText(block.heading, 300),
          text: cleanText(block.text, 4_000),
          tone: block.tone === "dark" ? "dark" : "warm",
        }];
      case "quote":
        return [{
          id,
          type: "quote",
          text: cleanText(block.text, 4_000),
          attribution: cleanText(block.attribution, 300),
        }];
      case "video":
        return [{
          id,
          type: "video",
          url: cleanUrl(block.url),
          title: cleanText(block.title, 300),
        }];
      case "download":
        return [{
          id,
          type: "download",
          url: cleanUrl(block.url),
          label: cleanText(block.label, 200),
          note: cleanText(block.note, 500),
        }];
      case "products":
        return [{
          id,
          type: "products",
          title: cleanText(block.title, 300),
          links: Array.isArray(block.links)
            ? block.links.slice(0, 12).flatMap((item) => {
                if (!item || typeof item !== "object") return [];
                const link = item as Record<string, unknown>;
                const url = cleanUrl(link.url);
                return url
                  ? [{ label: cleanText(link.label, 200), url }]
                  : [];
              })
            : [],
        }];
      case "inquiry":
        return [{
          id,
          type: "inquiry",
          heading: cleanText(block.heading, 300),
          text: cleanText(block.text, 2_000),
          label: cleanText(block.label, 120) || "Start a project",
        }];
      case "faq":
        return [{
          id,
          type: "faq",
          title: cleanText(block.title, 300),
          items: Array.isArray(block.items)
            ? block.items.slice(0, 20).flatMap((item) => {
                if (!item || typeof item !== "object") return [];
                const faq = item as Record<string, unknown>;
                return [{
                  question: cleanText(faq.question, 500),
                  answer: cleanText(faq.answer, 3_000),
                }];
              })
            : [],
        }];
      default:
        return [];
    }
  });
}

export function normalizePostInput(value: unknown): BlogPostInput {
  const input = value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
  const title = cleanText(input.title, 180);
  const slug = cleanText(input.slug, 180)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const rawStatus = cleanText(input.status, 20);
  const status: PostStatus =
    rawStatus === "published" || rawStatus === "archived" ? rawStatus : "draft";
  const parsedPublishedAt =
    typeof input.publishedAt === "number" && Number.isFinite(input.publishedAt)
      ? Math.round(input.publishedAt)
      : null;

  if (!title) throw new Error("Article title is required.");
  if (!slug) throw new Error("A valid article URL is required.");

  return {
    id: cleanText(input.id, 80) || undefined,
    slug,
    title,
    excerpt: cleanText(input.excerpt, 600),
    category: cleanText(input.category, 100) || "Insights",
    coverImage: cleanUrl(input.coverImage),
    coverAlt: cleanText(input.coverAlt, 300),
    seoTitle: cleanText(input.seoTitle, 180),
    seoDescription: cleanText(input.seoDescription, 320),
    status,
    blocks: cleanBlocks(input.blocks),
    publishedAt:
      status === "published" ? parsedPublishedAt ?? Date.now() : parsedPublishedAt,
  };
}

async function insertPost(
  db: D1Database,
  rawInput: unknown,
  editorEmail: string,
): Promise<BlogPost> {
  const input = normalizePostInput(rawInput);
  const id = input.id || crypto.randomUUID();
  const now = Date.now();
  await db.prepare(`
    INSERT INTO posts (
      id, slug, title, excerpt, category, cover_image, cover_alt,
      seo_title, seo_description, status, content_json, published_at,
      created_at, updated_at, updated_by, deleted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
  `).bind(
    id,
    input.slug,
    input.title,
    input.excerpt,
    input.category,
    input.coverImage,
    input.coverAlt,
    input.seoTitle,
    input.seoDescription,
    input.status,
    JSON.stringify(input.blocks),
    input.publishedAt,
    now,
    now,
    editorEmail,
  ).run();
  const created = await getPostByIdFromDatabase(db, id);
  if (!created) throw new Error("The article could not be created.");
  return created;
}

async function getPostByIdFromDatabase(
  db: D1Database,
  id: string,
): Promise<BlogPost | null> {
  const row = await db
    .prepare(`SELECT ${selectPostColumns} FROM posts WHERE id = ? LIMIT 1`)
    .bind(id)
    .first<PostRow>();
  return row ? rowToPost(row) : null;
}

export async function listPublishedPosts(): Promise<BlogPostSummary[]> {
  const db = await readyDatabase();
  const result = await db.prepare(`
    SELECT ${selectPostColumns}
    FROM posts
    WHERE status = 'published' AND deleted_at IS NULL
    ORDER BY published_at DESC, updated_at DESC
  `).all<PostRow>();
  return result.results.map(summaryFromRow);
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const db = await readyDatabase();
  const row = await db.prepare(`
    SELECT ${selectPostColumns}
    FROM posts
    WHERE slug = ? AND status = 'published' AND deleted_at IS NULL
    LIMIT 1
  `).bind(slug).first<PostRow>();
  return row ? rowToPost(row) : null;
}

export async function listAdminPosts(): Promise<BlogPostSummary[]> {
  const db = await readyDatabase();
  const result = await db.prepare(`
    SELECT ${selectPostColumns}
    FROM posts
    ORDER BY deleted_at IS NOT NULL, updated_at DESC
  `).all<PostRow>();
  return result.results.map(summaryFromRow);
}

export async function getAdminPost(id: string): Promise<BlogPost | null> {
  const db = await readyDatabase();
  return getPostByIdFromDatabase(db, id);
}

export async function savePost(
  rawInput: unknown,
  editorEmail: string,
): Promise<BlogPost> {
  const db = await readyDatabase();
  const input = normalizePostInput(rawInput);
  if (!input.id) {
    return insertPost(db, input, editorEmail);
  }

  const current = await getPostByIdFromDatabase(db, input.id);
  if (!current) throw new Error("Article not found.");
  const now = Date.now();
  await db.batch([
    db.prepare(`
      INSERT INTO post_revisions (
        id, post_id, snapshot_json, created_at, created_by
      ) VALUES (?, ?, ?, ?, ?)
    `).bind(
      crypto.randomUUID(),
      current.id,
      JSON.stringify(current),
      now,
      editorEmail,
    ),
    db.prepare(`
      UPDATE posts SET
        slug = ?,
        title = ?,
        excerpt = ?,
        category = ?,
        cover_image = ?,
        cover_alt = ?,
        seo_title = ?,
        seo_description = ?,
        status = ?,
        content_json = ?,
        published_at = ?,
        updated_at = ?,
        updated_by = ?,
        deleted_at = NULL
      WHERE id = ?
    `).bind(
      input.slug,
      input.title,
      input.excerpt,
      input.category,
      input.coverImage,
      input.coverAlt,
      input.seoTitle,
      input.seoDescription,
      input.status,
      JSON.stringify(input.blocks),
      input.publishedAt,
      now,
      editorEmail,
      input.id,
    ),
  ]);

  const updated = await getPostByIdFromDatabase(db, input.id);
  if (!updated) throw new Error("The article could not be updated.");
  return updated;
}

export async function softDeletePost(
  id: string,
  editorEmail: string,
): Promise<void> {
  const db = await readyDatabase();
  const current = await getPostByIdFromDatabase(db, id);
  if (!current) throw new Error("Article not found.");
  const now = Date.now();
  await db.batch([
    db.prepare(`
      INSERT INTO post_revisions (
        id, post_id, snapshot_json, created_at, created_by
      ) VALUES (?, ?, ?, ?, ?)
    `).bind(
      crypto.randomUUID(),
      id,
      JSON.stringify(current),
      now,
      editorEmail,
    ),
    db.prepare(`
      UPDATE posts
      SET deleted_at = ?, status = 'archived', updated_at = ?, updated_by = ?
      WHERE id = ?
    `).bind(now, now, editorEmail, id),
  ]);
}
