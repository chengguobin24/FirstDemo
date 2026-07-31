import { getD1Database } from "./cloudflare-context";
import type {
  VideoCategory,
  VideoStatus,
  WebsiteVideo,
  WebsiteVideoInput,
} from "./video-types";
import { normalizeVideoCategory, videoCategories } from "./video-types";
import { extractYouTubeId } from "./youtube";

type VideoRow = {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: string;
  status: VideoStatus;
  publishedAt: number | null;
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
};

const schemaPromises = new WeakMap<object, Promise<void>>();
const categoryValues = new Set<string>(videoCategories.map((item) => item.value));

const selectVideoColumns = `
  id,
  youtube_id AS youtubeId,
  title,
  description,
  category,
  status,
  published_at AS publishedAt,
  created_at AS createdAt,
  updated_at AS updatedAt,
  updated_by AS updatedBy
`;

function mapVideoRow(row: VideoRow): WebsiteVideo {
  return {
    ...row,
    category: normalizeVideoCategory(row.category),
  };
}

function requireDatabase(): D1Database {
  const db = getD1Database();
  if (!db) throw new Error("The video database binding is unavailable.");
  return db;
}

async function initializeDatabase(db: D1Database): Promise<void> {
  const existing = schemaPromises.get(db as object);
  if (existing) return existing;

  const initialization = db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY NOT NULL,
        youtube_id TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'hidden'
          CHECK (status IN ('hidden', 'published', 'archived')),
        published_at INTEGER,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        updated_by TEXT NOT NULL
      )
    `),
    db.prepare(
      "CREATE UNIQUE INDEX IF NOT EXISTS videos_youtube_id_unique ON videos (youtube_id)",
    ),
    db.prepare(
      "CREATE INDEX IF NOT EXISTS videos_status_published_idx ON videos (status, published_at)",
    ),
    db.prepare(
      "CREATE INDEX IF NOT EXISTS videos_category_published_idx ON videos (category, published_at)",
    ),
  ]).then(() => undefined);

  schemaPromises.set(db as object, initialization);
  return initialization;
}

async function readyDatabase(): Promise<D1Database> {
  const db = requireDatabase();
  await initializeDatabase(db);
  return db;
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string"
    ? value.replace(/\u0000/g, "").trim().slice(0, maxLength)
    : "";
}

export function normalizeVideoInput(value: unknown): WebsiteVideoInput {
  const input = value && typeof value === "object"
    ? value as Record<string, unknown>
    : {};
  const title = cleanText(input.title, 180);
  const youtubeId = extractYouTubeId(
    cleanText(input.youtubeUrl, 2_000) || cleanText(input.youtubeId, 100),
  );
  const rawCategory = normalizeVideoCategory(cleanText(input.category, 80));
  const rawStatus = cleanText(input.status, 20);
  const status: VideoStatus =
    rawStatus === "published" || rawStatus === "archived" ? rawStatus : "hidden";
  const publishedAt =
    typeof input.publishedAt === "number" && Number.isFinite(input.publishedAt)
      ? Math.round(input.publishedAt)
      : null;

  if (!title) throw new Error("Video title is required.");
  if (!youtubeId) throw new Error("Enter a valid YouTube video link or video ID.");
  if (!categoryValues.has(rawCategory)) throw new Error("Select a valid video category.");

  return {
    id: cleanText(input.id, 80) || undefined,
    youtubeId,
    title,
    description: cleanText(input.description, 1_000),
    category: rawCategory as VideoCategory,
    status,
    publishedAt,
  };
}

async function getVideoFromDatabase(
  db: D1Database,
  id: string,
): Promise<WebsiteVideo | null> {
  const row = await db
    .prepare(`SELECT ${selectVideoColumns} FROM videos WHERE id = ? LIMIT 1`)
    .bind(id)
    .first<VideoRow>();
  return row ? mapVideoRow(row) : null;
}

export async function listPublishedVideos(): Promise<WebsiteVideo[]> {
  const db = await readyDatabase();
  const result = await db.prepare(`
    SELECT ${selectVideoColumns}
    FROM videos
    WHERE status = 'published'
    ORDER BY published_at DESC, updated_at DESC
  `).all<VideoRow>();
  return result.results.map(mapVideoRow);
}

export async function listAdminVideos(): Promise<WebsiteVideo[]> {
  const db = await readyDatabase();
  const result = await db.prepare(`
    SELECT ${selectVideoColumns}
    FROM videos
    ORDER BY status = 'archived', updated_at DESC
  `).all<VideoRow>();
  return result.results.map(mapVideoRow);
}

export async function getAdminVideo(id: string): Promise<WebsiteVideo | null> {
  const db = await readyDatabase();
  return getVideoFromDatabase(db, id);
}

export async function saveVideo(
  rawInput: unknown,
  editorEmail: string,
): Promise<WebsiteVideo> {
  const db = await readyDatabase();
  const input = normalizeVideoInput(rawInput);
  const now = Date.now();

  if (!input.id) {
    const id = crypto.randomUUID();
    const publishedAt = input.status === "published"
      ? input.publishedAt ?? now
      : input.publishedAt;
    await db.prepare(`
      INSERT INTO videos (
        id, youtube_id, title, description, category, status,
        published_at, created_at, updated_at, updated_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      input.youtubeId,
      input.title,
      input.description,
      input.category,
      input.status,
      publishedAt,
      now,
      now,
      editorEmail,
    ).run();
    const created = await getVideoFromDatabase(db, id);
    if (!created) throw new Error("The video could not be created.");
    return created;
  }

  const current = await getVideoFromDatabase(db, input.id);
  if (!current) throw new Error("Video not found.");
  const publishedAt = input.status === "published"
    ? input.publishedAt ?? current.publishedAt ?? now
    : current.publishedAt ?? input.publishedAt;
  await db.prepare(`
    UPDATE videos SET
      youtube_id = ?,
      title = ?,
      description = ?,
      category = ?,
      status = ?,
      published_at = ?,
      updated_at = ?,
      updated_by = ?
    WHERE id = ?
  `).bind(
    input.youtubeId,
    input.title,
    input.description,
    input.category,
    input.status,
    publishedAt,
    now,
    editorEmail,
    input.id,
  ).run();
  const updated = await getVideoFromDatabase(db, input.id);
  if (!updated) throw new Error("The video could not be updated.");
  return updated;
}

export async function archiveVideo(
  id: string,
  editorEmail: string,
): Promise<void> {
  const db = await readyDatabase();
  const current = await getVideoFromDatabase(db, id);
  if (!current) throw new Error("Video not found.");
  await db.prepare(`
    UPDATE videos
    SET status = 'archived', updated_at = ?, updated_by = ?
    WHERE id = ?
  `).bind(Date.now(), editorEmail, id).run();
}
