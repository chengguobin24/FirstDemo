"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./PergolaDetail.module.css";

export function ModelProfilePreview({ src, alt, model }: { src: string; alt: string; model: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button type="button" className={styles.profilePreview} aria-label={`Open model ${model} profile drawing`} onClick={() => setOpen(true)}>
        <Image className={styles.profileThumbnail} src={src} alt={alt} width={260} height={150} unoptimized />
        <span className={styles.profileHint}>Click to preview</span>
      </button>
      {open && createPortal(
        <div className={styles.profileOverlay} role="dialog" aria-modal="true" aria-label={`Model ${model} profile drawing preview`} onClick={() => setOpen(false)}>
          <div className={styles.profileOverlayCard} onClick={(event) => event.stopPropagation()}>
            <Image src={src} alt={alt} fill unoptimized sizes="80vw" style={{ objectFit: "contain" }} />
            <strong>Model {model}</strong>
            <button type="button" className={styles.profileClose} aria-label="Close image preview" onClick={() => setOpen(false)}>×</button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
