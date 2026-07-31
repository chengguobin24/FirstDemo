"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { BlogBlock, BlogPost, BlogPostInput, PostStatus } from "@/lib/blog-types";
import {
  addableBlockTypes,
  blocksForTemplate,
  blogTemplates,
  createEmptyBlock,
  type AddableBlockType,
  type BlogTemplateId,
} from "@/lib/blog-templates";
import styles from "@/app/admin/admin.module.css";

type EditorPost = BlogPostInput & { id?: string };

const blankPost: EditorPost = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Buyer guides",
  coverImage: "",
  coverAlt: "",
  seoTitle: "",
  seoDescription: "",
  status: "draft",
  publishedAt: null,
  blocks: blocksForTemplate("buyer-guide"),
};

function blockLabel(type: BlogBlock["type"]): string {
  return addableBlockTypes.find(([value]) => value === type)?.[1] || type;
}

function lineList(values: string[]): string {
  return values.join("\n");
}

function parseLineList(value: string): string[] {
  return value.split("\n").map((item) => item.trim());
}

function pipeRows(rows: string[][]): string {
  return rows.map((row) => row.join(" | ")).join("\n");
}

function parsePipeRows(value: string): string[][] {
  return value.split("\n").map((row) => row.split("|").map((cell) => cell.trim()));
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {textarea ? (
        <textarea value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function BlockFields({
  block,
  onChange,
}: {
  block: BlogBlock;
  onChange: (block: BlogBlock) => void;
}) {
  switch (block.type) {
    case "heading":
      return (
        <div className={styles.blockFields}>
          <Field label="Heading" value={block.text} onChange={(text) => onChange({ ...block, text })} />
          <label className={styles.field}>
            <span>Level</span>
            <select value={block.level} onChange={(event) => onChange({ ...block, level: Number(event.target.value) === 3 ? 3 : 2 })}>
              <option value={2}>Section heading</option>
              <option value={3}>Subheading</option>
            </select>
          </label>
        </div>
      );
    case "paragraph":
      return <Field label="Paragraph" textarea value={block.text} onChange={(text) => onChange({ ...block, text })} />;
    case "image":
      return (
        <div className={styles.blockFields}>
          <Field label="Image URL" value={block.url} onChange={(url) => onChange({ ...block, url })} placeholder="/images/..." />
          <Field label="Alt text" value={block.alt} onChange={(alt) => onChange({ ...block, alt })} />
          <Field label="Caption" value={block.caption || ""} onChange={(caption) => onChange({ ...block, caption })} />
        </div>
      );
    case "imageText":
      return (
        <div className={styles.blockFields}>
          <Field label="Image URL" value={block.url} onChange={(url) => onChange({ ...block, url })} />
          <Field label="Alt text" value={block.alt} onChange={(alt) => onChange({ ...block, alt })} />
          <Field label="Heading" value={block.heading} onChange={(heading) => onChange({ ...block, heading })} />
          <Field label="Text" textarea value={block.text} onChange={(text) => onChange({ ...block, text })} />
          <label className={styles.field}>
            <span>Image position</span>
            <select value={block.imagePosition} onChange={(event) => onChange({ ...block, imagePosition: event.target.value === "right" ? "right" : "left" })}>
              <option value="left">Left</option><option value="right">Right</option>
            </select>
          </label>
        </div>
      );
    case "gallery":
      return (
        <Field
          label="Images — one per line: URL | alt text | caption"
          textarea
          value={block.images.map((item) => [item.url, item.alt, item.caption || ""].join(" | ")).join("\n")}
          onChange={(value) => onChange({
            ...block,
            images: parsePipeRows(value).map(([url = "", alt = "", caption = ""]) => ({ url, alt, caption })),
          })}
        />
      );
    case "table":
      return (
        <div className={styles.blockFields}>
          <Field label="Table caption" value={block.caption || ""} onChange={(caption) => onChange({ ...block, caption })} />
          <Field label="Column headings — separated by |" value={block.headers.join(" | ")} onChange={(value) => onChange({ ...block, headers: value.split("|").map((item) => item.trim()) })} />
          <Field label="Rows — one row per line, cells separated by |" textarea value={pipeRows(block.rows)} onChange={(value) => onChange({ ...block, rows: parsePipeRows(value) })} />
        </div>
      );
    case "checklist":
      return (
        <div className={styles.blockFields}>
          <Field label="Section title" value={block.title || ""} onChange={(title) => onChange({ ...block, title })} />
          <Field label="Checklist — one item per line" textarea value={lineList(block.items)} onChange={(value) => onChange({ ...block, items: parseLineList(value) })} />
        </div>
      );
    case "steps":
      return (
        <div className={styles.blockFields}>
          <Field label="Section title" value={block.title || ""} onChange={(title) => onChange({ ...block, title })} />
          <Field
            label="Steps — one per line: title | explanation"
            textarea
            value={block.items.map((item) => `${item.title} | ${item.text}`).join("\n")}
            onChange={(value) => onChange({ ...block, items: parsePipeRows(value).map(([title = "", text = ""]) => ({ title, text })) })}
          />
        </div>
      );
    case "callout":
      return (
        <div className={styles.blockFields}>
          <Field label="Heading" value={block.heading || ""} onChange={(heading) => onChange({ ...block, heading })} />
          <Field label="Highlighted text" textarea value={block.text} onChange={(text) => onChange({ ...block, text })} />
          <label className={styles.field}>
            <span>Style</span>
            <select value={block.tone} onChange={(event) => onChange({ ...block, tone: event.target.value === "dark" ? "dark" : "warm" })}>
              <option value="warm">Warm</option><option value="dark">Dark</option>
            </select>
          </label>
        </div>
      );
    case "quote":
      return (
        <div className={styles.blockFields}>
          <Field label="Quote" textarea value={block.text} onChange={(text) => onChange({ ...block, text })} />
          <Field label="Attribution" value={block.attribution || ""} onChange={(attribution) => onChange({ ...block, attribution })} />
        </div>
      );
    case "video":
      return (
        <div className={styles.blockFields}>
          <Field label="Video URL" value={block.url} onChange={(url) => onChange({ ...block, url })} />
          <Field label="Video title" value={block.title} onChange={(title) => onChange({ ...block, title })} />
        </div>
      );
    case "download":
      return (
        <div className={styles.blockFields}>
          <Field label="File URL" value={block.url} onChange={(url) => onChange({ ...block, url })} />
          <Field label="Button label" value={block.label} onChange={(label) => onChange({ ...block, label })} />
          <Field label="Note" value={block.note || ""} onChange={(note) => onChange({ ...block, note })} />
        </div>
      );
    case "products":
      return (
        <div className={styles.blockFields}>
          <Field label="Section title" value={block.title || ""} onChange={(title) => onChange({ ...block, title })} />
          <Field
            label="Links — one per line: label | URL"
            textarea
            value={block.links.map((item) => `${item.label} | ${item.url}`).join("\n")}
            onChange={(value) => onChange({ ...block, links: parsePipeRows(value).map(([label = "", url = ""]) => ({ label, url })) })}
          />
        </div>
      );
    case "inquiry":
      return (
        <div className={styles.blockFields}>
          <Field label="Heading" value={block.heading} onChange={(heading) => onChange({ ...block, heading })} />
          <Field label="Supporting text" textarea value={block.text || ""} onChange={(text) => onChange({ ...block, text })} />
          <Field label="Button label" value={block.label} onChange={(label) => onChange({ ...block, label })} />
        </div>
      );
    case "faq":
      return (
        <div className={styles.blockFields}>
          <Field label="Section title" value={block.title || ""} onChange={(title) => onChange({ ...block, title })} />
          <Field
            label="Questions — one per line: question | answer"
            textarea
            value={block.items.map((item) => `${item.question} | ${item.answer}`).join("\n")}
            onChange={(value) => onChange({ ...block, items: parsePipeRows(value).map(([question = "", answer = ""]) => ({ question, answer })) })}
          />
        </div>
      );
  }
}

export function AdminEditor({ initialPost }: { initialPost?: BlogPost }) {
  const router = useRouter();
  const [post, setPost] = useState<EditorPost>(initialPost || blankPost);
  const [template, setTemplate] = useState<BlogTemplateId>("buyer-guide");
  const [newBlockType, setNewBlockType] = useState<AddableBlockType>("paragraph");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const wordCount = useMemo(
    () => JSON.stringify(post.blocks).split(/\s+/).filter(Boolean).length,
    [post.blocks],
  );

  function patchPost(patch: Partial<EditorPost>) {
    setPost((current) => ({ ...current, ...patch }));
  }

  function updateBlock(index: number, block: BlogBlock) {
    setPost((current) => ({
      ...current,
      blocks: current.blocks.map((item, itemIndex) => itemIndex === index ? block : item),
    }));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= post.blocks.length) return;
    setPost((current) => {
      const blocks = [...current.blocks];
      [blocks[index], blocks[nextIndex]] = [blocks[nextIndex], blocks[index]];
      return { ...current, blocks };
    });
  }

  function removeBlock(index: number) {
    setPost((current) => ({ ...current, blocks: current.blocks.filter((_, itemIndex) => itemIndex !== index) }));
  }

  function duplicateBlock(index: number) {
    setPost((current) => {
      const clone = { ...current.blocks[index], id: crypto.randomUUID() } as BlogBlock;
      const blocks = [...current.blocks];
      blocks.splice(index + 1, 0, clone);
      return { ...current, blocks };
    });
  }

  function applyTemplate() {
    if (post.blocks.length && !window.confirm("Replace the current content modules with this starting template?")) return;
    patchPost({ blocks: blocksForTemplate(template) });
  }

  async function save(status: PostStatus) {
    setSaving(true);
    setMessage("");
    try {
      const payload = { ...post, status };
      const endpoint = post.id ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
      const response = await fetch(endpoint, {
        method: post.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { post?: BlogPost; error?: string };
      if (!response.ok || !result.post) throw new Error(result.error || "The article could not be saved.");
      setPost(result.post);
      setMessage(status === "published" ? "Article published." : "Draft saved.");
      if (!initialPost) router.replace(`/admin/posts/${result.post.id}`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The article could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  async function removePost() {
    if (!post.id || !window.confirm("Move this article to the archive?")) return;
    const response = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (response.ok) router.push("/admin");
    else setMessage("The article could not be archived.");
  }

  return (
    <div className={styles.editor}>
      <header className={styles.editorTop}>
        <div>
          <Link href="/admin">← Articles</Link>
          <span>{post.id ? "Edit article" : "New article"}</span>
          <strong>{wordCount} editor words</strong>
        </div>
        <div className={styles.editorActions}>
          {post.id ? <Link className={styles.secondaryButton} href={`/admin/preview/${post.id}`} target="_blank">Preview</Link> : null}
          <button type="button" className={styles.secondaryButton} disabled={saving} onClick={() => save("draft")}>Save draft</button>
          <button type="button" className={styles.primaryButton} disabled={saving} onClick={() => save("published")}>{saving ? "Saving…" : "Publish"}</button>
        </div>
      </header>

      {message ? <div className={styles.message} role="status">{message}</div> : null}

      <div className={styles.editorLayout}>
        <main className={styles.editorMain}>
          <section className={styles.editorSection}>
            <p className={styles.sectionLabel}>Article basics</p>
            <Field label="Article title" value={post.title} onChange={(title) => patchPost({ title })} />
            <div className={styles.twoFields}>
              <Field label="URL slug" value={post.slug} placeholder="aluminum-fence-buying-guide" onChange={(slug) => patchPost({ slug })} />
              <Field label="Category" value={post.category} onChange={(category) => patchPost({ category })} />
            </div>
            <Field label="Summary" textarea value={post.excerpt} onChange={(excerpt) => patchPost({ excerpt })} />
          </section>

          <section className={styles.editorSection}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.sectionLabel}>Flexible article body</p><h2>Content modules</h2></div>
              <div className={styles.templateTools}>
                <select value={template} onChange={(event) => setTemplate(event.target.value as BlogTemplateId)}>
                  {blogTemplates.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
                <button type="button" onClick={applyTemplate}>Apply starting template</button>
              </div>
            </div>

            <div className={styles.blocks}>
              {post.blocks.map((block, index) => (
                <article className={styles.blockCard} key={block.id}>
                  <header>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{blockLabel(block.type)}</strong>
                    <div>
                      <button type="button" aria-label="Move up" onClick={() => moveBlock(index, -1)}>↑</button>
                      <button type="button" aria-label="Move down" onClick={() => moveBlock(index, 1)}>↓</button>
                      <button type="button" onClick={() => duplicateBlock(index)}>Duplicate</button>
                      <button type="button" onClick={() => removeBlock(index)}>Remove</button>
                    </div>
                  </header>
                  <BlockFields block={block} onChange={(next) => updateBlock(index, next)} />
                </article>
              ))}
            </div>

            <div className={styles.addBlock}>
              <select value={newBlockType} onChange={(event) => setNewBlockType(event.target.value as AddableBlockType)}>
                {addableBlockTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
              </select>
              <button type="button" onClick={() => patchPost({ blocks: [...post.blocks, createEmptyBlock(newBlockType)] })}>+ Add module</button>
            </div>
          </section>
        </main>

        <aside className={styles.editorSidebar}>
          <section>
            <p className={styles.sectionLabel}>Publishing</p>
            <label className={styles.field}>
              <span>Status</span>
              <select value={post.status} onChange={(event) => patchPost({ status: event.target.value as PostStatus })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
          </section>
          <section>
            <p className={styles.sectionLabel}>Cover</p>
            <Field label="Cover image URL" value={post.coverImage} onChange={(coverImage) => patchPost({ coverImage })} />
            <Field label="Cover image alt text" value={post.coverAlt} onChange={(coverAlt) => patchPost({ coverAlt })} />
            <p className={styles.help}>R2 is not active. Use an existing website image path or an approved external image URL.</p>
          </section>
          <section>
            <p className={styles.sectionLabel}>Search and sharing</p>
            <Field label="SEO title" value={post.seoTitle} onChange={(seoTitle) => patchPost({ seoTitle })} />
            <Field label="SEO description" textarea value={post.seoDescription} onChange={(seoDescription) => patchPost({ seoDescription })} />
          </section>
          {post.id ? <button className={styles.archiveButton} type="button" onClick={removePost}>Archive article</button> : null}
        </aside>
      </div>
    </div>
  );
}
