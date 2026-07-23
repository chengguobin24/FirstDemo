"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../swing-gates/swing-gates.module.css";

const foldingGateStyles = [
  ["/images/product-gallery/gates/folding-gate-carousel-01.png", "Four-panel black aluminum folding driveway gate with vertical open slats at a modern residence", "Four-Panel Slat Gate"],
  ["/images/product-gallery/gates/folding-gate-carousel-02.png", "Black four-panel aluminum folding gate opening from the center of a residential courtyard", "Center-Opening Gate"],
  ["/images/product-gallery/gates/folding-gate-carousel-03.png", "Curved black aluminum folding entrance gate with closely spaced vertical louvers", "Curved Louver Gate"],
  ["/images/product-gallery/gates/folding-gate-carousel-04.png", "Decorative four-panel black aluminum folding gate with geometric border inserts", "Decorative Folding Gate"],
  ["/images/product-gallery/gates/folding-gate-carousel-05.png", "Contemporary four-panel aluminum folding driveway gate with dark vertical infill and gold handles", "Contemporary Panel Gate"],
  ["/images/product-gallery/gates/folding-gate-carousel-06.png", "Four-panel black aluminum folding gate with traditional geometric border details", "Geometric Border Gate"],
] as const;

export function FoldingStyleCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const position = useRef(0);
  const resumeAt = useRef(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (dragging || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let previousTime = performance.now();
    position.current = trackRef.current?.scrollLeft ?? position.current;

    const animate = (time: number) => {
      const track = trackRef.current;
      const group = firstGroupRef.current;
      if (track && group) {
        const elapsed = Math.min(time - previousTime, 50);
        if (time < resumeAt.current) {
          position.current = track.scrollLeft;
        } else {
          position.current += elapsed * .043;
          if (position.current >= group.offsetWidth) position.current -= group.offsetWidth;
          track.scrollLeft = position.current;
        }
      }
      previousTime = time;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [dragging]);

  const renderCards = (duplicate = false) =>
    foldingGateStyles.map(([src, alt, label], index) => (
      <figure className={`${styles.carouselCard} ${styles.containImage}`} key={`${duplicate ? "duplicate-" : ""}${src}`} aria-hidden={duplicate || undefined}>
        <div><Image src={src} alt={duplicate ? "" : alt} fill unoptimized sizes="(max-width: 700px) 82vw, 36vw" draggable={false} /></div>
        <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></figcaption>
      </figure>
    ));

  return (
    <div className={styles.carouselShell} data-no-reveal>
      <div className={styles.carouselControls}><span>Drag to explore folding gate styles</span></div>
      <div
        ref={trackRef}
        className={`${styles.carouselTrack} ${dragging ? styles.carouselDragging : ""}`}
        onPointerDown={(event) => {
          if (!trackRef.current) return;
          dragStart.current = { x: event.clientX, scrollLeft: trackRef.current.scrollLeft };
          position.current = trackRef.current.scrollLeft;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragging || !trackRef.current) return;
          trackRef.current.scrollLeft = dragStart.current.scrollLeft - (event.clientX - dragStart.current.x);
          position.current = trackRef.current.scrollLeft;
        }}
        onPointerUp={(event) => {
          position.current = trackRef.current?.scrollLeft ?? position.current;
          resumeAt.current = performance.now() + 160;
          setDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          position.current = trackRef.current?.scrollLeft ?? position.current;
          resumeAt.current = performance.now() + 160;
          setDragging(false);
        }}
      >
        <div className={styles.carouselGroup} ref={firstGroupRef}>{renderCards()}</div>
        <div className={styles.carouselGroup}>{renderCards(true)}</div>
      </div>
    </div>
  );
}
