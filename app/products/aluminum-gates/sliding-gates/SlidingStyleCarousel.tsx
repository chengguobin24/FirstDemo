"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../swing-gates/swing-gates.module.css";

const slidingGateStyles = [
  ["/images/product-gallery/gates/gate-07.jpg", "Long automatic aluminum sliding driveway gate with coordinated pedestrian access", "Driveway Access"],
  ["/images/product-gallery/gates/gate-08.png", "Decorative aluminum sliding entrance system for a villa project", "Architectural Infill"],
] as const;

export function SlidingStyleCarousel() {
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

  const renderCards = (duplicate = false) => slidingGateStyles.map(([src, alt, label], index) => (
    <figure className={styles.carouselCard} key={`${duplicate ? "duplicate-" : ""}${src}`} aria-hidden={duplicate || undefined}>
      <div><Image src={src} alt={duplicate ? "" : alt} fill unoptimized sizes="(max-width: 700px) 82vw, 36vw" draggable={false} /></div>
      <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></figcaption>
    </figure>
  ));

  return (
    <div className={styles.carouselShell} data-no-reveal>
      <div className={styles.carouselControls}><span>Drag to explore sliding gate references</span></div>
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
