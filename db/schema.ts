import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable(
  "posts",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    category: text("category").notNull().default("Insights"),
    coverImage: text("cover_image").notNull().default(""),
    coverAlt: text("cover_alt").notNull().default(""),
    seoTitle: text("seo_title").notNull().default(""),
    seoDescription: text("seo_description").notNull().default(""),
    status: text("status", { enum: ["draft", "published", "archived"] })
      .notNull()
      .default("draft"),
    contentJson: text("content_json").notNull().default("[]"),
    publishedAt: integer("published_at"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
    updatedBy: text("updated_by").notNull(),
    deletedAt: integer("deleted_at"),
  },
  (table) => [
    uniqueIndex("posts_slug_unique").on(table.slug),
    index("posts_status_published_idx").on(table.status, table.publishedAt),
    index("posts_updated_idx").on(table.updatedAt),
  ],
);

export const postRevisions = sqliteTable(
  "post_revisions",
  {
    id: text("id").primaryKey(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    snapshotJson: text("snapshot_json").notNull(),
    createdAt: integer("created_at").notNull(),
    createdBy: text("created_by").notNull(),
  },
  (table) => [index("post_revisions_post_idx").on(table.postId, table.createdAt)],
);

export const videos = sqliteTable(
  "videos",
  {
    id: text("id").primaryKey(),
    youtubeId: text("youtube_id").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    category: text("category", {
      enum: [
        "factory-production",
        "aluminum-fences",
        "aluminum-gates",
        "aluminum-pergolas",
        "installation-guides",
      ],
    }).notNull(),
    status: text("status", { enum: ["hidden", "published", "archived"] })
      .notNull()
      .default("hidden"),
    publishedAt: integer("published_at"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
    updatedBy: text("updated_by").notNull(),
  },
  (table) => [
    uniqueIndex("videos_youtube_id_unique").on(table.youtubeId),
    index("videos_status_published_idx").on(table.status, table.publishedAt),
    index("videos_category_published_idx").on(table.category, table.publishedAt),
  ],
);
