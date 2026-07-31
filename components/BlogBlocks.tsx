/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { BlogBlock } from "@/lib/blog-types";

function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)(?:$|\?)/i.test(url);
}

function imageAlt(alt: string | undefined, fallback: string): string {
  return alt?.trim() || fallback;
}

export function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="blog-blocks">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading":
            return block.level === 3
              ? <h3 key={block.id}>{block.text}</h3>
              : <h2 key={block.id}>{block.text}</h2>;
          case "paragraph":
            return <p className="blog-paragraph" key={block.id}>{block.text}</p>;
          case "image":
            return block.url ? (
              <figure className="blog-image" key={block.id}>
                <img src={block.url} alt={imageAlt(block.alt, block.caption || "JUNSU aluminum project reference image")} />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            ) : null;
          case "imageText":
            return (
              <section
                className={`blog-image-text ${block.imagePosition === "right" ? "image-right" : ""}`}
                key={block.id}
              >
                {block.url ? <img src={block.url} alt={imageAlt(block.alt, block.heading || "JUNSU aluminum system detail image")} /> : <div className="blog-image-placeholder">Image</div>}
                <div>
                  <h2>{block.heading}</h2>
                  <p>{block.text}</p>
                </div>
              </section>
            );
          case "gallery":
            return (
              <div className="blog-gallery" key={block.id}>
                {block.images.map((image, index) => (
                  <figure key={`${block.id}-${index}`}>
                    <img src={image.url} alt={imageAlt(image.alt, image.caption || `JUNSU aluminum project gallery image ${index + 1}`)} />
                    {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            );
          case "table":
            return (
              <div className="blog-table-wrap" key={block.id}>
                <table>
                  {block.caption ? <caption>{block.caption}</caption> : null}
                  {block.headers.length ? (
                    <thead>
                      <tr>{block.headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
                    </thead>
                  ) : null}
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "checklist":
            return (
              <section className="blog-checklist" key={block.id}>
                {block.title ? <h2>{block.title}</h2> : null}
                <ul>{block.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
              </section>
            );
          case "steps":
            return (
              <section className="blog-steps" key={block.id}>
                {block.title ? <h2>{block.title}</h2> : null}
                <ol>
                  {block.items.map((item, index) => (
                    <li key={index}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><h3>{item.title}</h3><p>{item.text}</p></div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "callout":
            return (
              <aside className={`blog-callout ${block.tone === "dark" ? "dark" : ""}`} key={block.id}>
                {block.heading ? <strong>{block.heading}</strong> : null}
                <p>{block.text}</p>
              </aside>
            );
          case "quote":
            return (
              <blockquote className="blog-quote" key={block.id}>
                <p>{block.text}</p>
                {block.attribution ? <cite>{block.attribution}</cite> : null}
              </blockquote>
            );
          case "video":
            return (
              <figure className="blog-video" key={block.id}>
                {block.url && isVideoFile(block.url) ? (
                  <video controls preload="metadata" aria-label={block.title}>
                    <source src={block.url} />
                  </video>
                ) : (
                  <a href={block.url} target="_blank" rel="noreferrer">
                    <span>Play video</span>
                    <strong>{block.title}</strong>
                  </a>
                )}
              </figure>
            );
          case "download":
            return (
              <a className="blog-download" href={block.url} key={block.id} target="_blank" rel="noreferrer">
                <span>Resource</span>
                <strong>{block.label}</strong>
                {block.note ? <small>{block.note}</small> : null}
                <b>Open ↗</b>
              </a>
            );
          case "products":
            return (
              <section className="blog-products" key={block.id}>
                <h2>{block.title || "Related systems"}</h2>
                <div>
                  {block.links.map((link, index) => (
                    <Link href={link.url} key={index}>{link.label}<span>↗</span></Link>
                  ))}
                </div>
              </section>
            );
          case "inquiry":
            return (
              <section className="blog-inquiry" key={block.id}>
                <div><span>Project discussion</span><h2>{block.heading}</h2>{block.text ? <p>{block.text}</p> : null}</div>
                <Link className="button light" href="/#quote">{block.label}<span>↗</span></Link>
              </section>
            );
          case "faq":
            return (
              <section className="blog-faq" key={block.id}>
                <h2>{block.title || "Frequently asked questions"}</h2>
                <div>
                  {block.items.map((item, index) => (
                    <details key={index}>
                      <summary>{item.question}<span>+</span></summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
