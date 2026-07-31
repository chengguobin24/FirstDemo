import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("production worker contains the D1 blog binding", async () => {
  const config = JSON.parse(
    await readFile(new URL("../dist/server/wrangler.json", import.meta.url), "utf8"),
  );
  assert.ok(
    config.d1_databases.some((binding) => binding.binding === "DB"),
    "Expected a DB D1 binding in the built Worker configuration",
  );
});

test("article renderer supports the approved flexible modules", async () => {
  const renderer = await readFile(
    new URL("../components/BlogBlocks.tsx", import.meta.url),
    "utf8",
  );
  for (const type of [
    "paragraph",
    "imageText",
    "gallery",
    "table",
    "checklist",
    "steps",
    "callout",
    "download",
    "products",
    "inquiry",
    "faq",
  ]) {
    assert.match(renderer, new RegExp(`case "${type}"`));
  }
});

test("admin APIs require server-side administrator verification", async () => {
  const routes = await Promise.all([
    readFile(new URL("../app/api/admin/posts/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/admin/posts/[id]/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/admin/videos/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/admin/videos/[id]/route.ts", import.meta.url), "utf8"),
  ]);
  for (const route of routes) {
    assert.match(route, /requireAdminRequest\(request\)/);
  }
});

test("video library uses privacy-enhanced lazy YouTube embeds", async () => {
  const [player, library, page] = await Promise.all([
    readFile(new URL("../components/YouTubePlayer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/VideoLibrary.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/videos/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(player, /youtubeEmbedUrl\(videoId, true\)/);
  assert.match(player, /loading="lazy"/);
  assert.match(library, /videoCategories\.map/);
  assert.match(page, /listPublishedVideos/);
});

test("video migration stores YouTube metadata without media files", async () => {
  const migration = await readFile(
    new URL("../drizzle/0001_chunky_mach_iv.sql", import.meta.url),
    "utf8",
  );
  assert.match(migration, /CREATE TABLE `videos`/);
  assert.match(migration, /`youtube_id` text NOT NULL/);
  assert.doesNotMatch(migration, /blob|binary/i);
});

test("admin indexes provide compact title and date search", async () => {
  const [articles, videos, search] = await Promise.all([
    readFile(new URL("../app/admin/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/videos/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/admin-search.ts", import.meta.url), "utf8"),
  ]);
  assert.match(articles, /AdminSearchToolbar/);
  assert.match(videos, /AdminSearchToolbar/);
  assert.doesNotMatch(articles, /emptyAdmin/);
  assert.doesNotMatch(videos, /emptyAdmin/);
  assert.match(search, /adminSearchMatches/);
  assert.match(search, /monthLong/);
  assert.match(search, /`\$\{month\}\/\$\{day\}`/);
});
