"use client";

import { useState } from "react";

export function ShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2_000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="blog-share" aria-label="Share this article">
      <span className="share-label">Share</span>
      <div className="share-actions">
        <a
          className="share-icon linkedin"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on LinkedIn"
          title="LinkedIn"
        >
          <span className="brand-icon" aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
        <a
          className="share-icon whatsapp"
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on WhatsApp"
          title="WhatsApp"
        >
          <span className="brand-icon" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
        <a
          className="share-icon facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on Facebook"
          title="Facebook"
        >
          <span className="brand-icon" aria-hidden="true" />
          <span>Facebook</span>
        </a>
        <a
          className="share-icon email"
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          aria-label="Share by email"
          title="Email"
        >
          <span className="brand-icon" aria-hidden="true" />
          <span>Email</span>
        </a>
        <button
          className="share-icon copy"
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy article link"}
          title={copied ? "Copied" : "Copy link"}
        >
          <span className="brand-icon" aria-hidden="true" />
          <span>{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>
      <span className="copy-feedback" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
