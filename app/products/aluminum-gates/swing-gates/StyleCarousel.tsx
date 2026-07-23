"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./swing-gates.module.css";

const stylesGallery = [
  ["/images/product-gallery/gates/gate-carousel-single-01.webp", "Black single pedestrian aluminum gate with vertical open slats and keypad access", "Single Pedestrian Gate"],
  ["/images/product-gallery/gates/gate-carousel-single-02.webp", "Black single aluminum entrance gate with vertical and horizontal louver details", "Single Louvered Gate"],
  ["/images/product-gallery/gates/gate-carousel-double-01.webp", "Modern black double aluminum swing gate with asymmetric vertical slat details", "Double Slat Gate"],
  ["/images/product-gallery/gates/gate-carousel-double-02.webp", "Black double aluminum swing gate with a circular open-slat design and keypad lock", "Double Circle Gate"],
  ["/images/product-gallery/gates/gate-carousel-double-03.webp", "Black double aluminum swing gate with alternating vertical open-slat sections", "Double Open-Slat Gate"],
  ["/images/product-gallery/gates/gate-carousel-double-04.webp", "Decorative black double aluminum swing gate with geometric metal screen inserts", "Double Decorative Gate"],
  ["/images/product-gallery/gates/gate-carousel-sliding-01.webp", "Wide black aluminum sliding driveway gate with coordinated pedestrian entrance", "Sliding Entrance Gate"],
] as const;

export function StyleCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const continuousPosition = useRef(0);
  const manualMotionUntil = useRef(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (dragging || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrame = 0;
    let previousTime = performance.now();
    continuousPosition.current = trackRef.current?.scrollLeft ?? continuousPosition.current;

    const animate = (time: number) => {
      const track = trackRef.current;
      const group = firstGroupRef.current;
      if (track && group) {
        const elapsed = Math.min(time - previousTime, 50);
        if (time < manualMotionUntil.current) {
          continuousPosition.current = track.scrollLeft;
        } else {
          continuousPosition.current += elapsed * .043;
          if (continuousPosition.current >= group.offsetWidth) continuousPosition.current -= group.offsetWidth;
          track.scrollLeft = continuousPosition.current;
        }
      }
      previousTime = time;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [dragging]);

  const renderCards = (duplicate = false) => stylesGallery.map(([src, alt, label], index) => (
    <figure className={styles.carouselCard} key={`${duplicate ? "duplicate-" : ""}${src}`} aria-hidden={duplicate || undefined}>
      <div><Image src={src} alt={duplicate ? "" : alt} fill unoptimized sizes="(max-width: 700px) 82vw, 36vw" draggable={false} /></div>
      <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></figcaption>
    </figure>
  ));

  return (
    <div className={styles.carouselShell} data-no-reveal>
      <div className={styles.carouselControls}>
        <span>Drag to explore gate styles</span>
      </div>
      <div
        ref={trackRef}
        className={`${styles.carouselTrack} ${dragging ? styles.carouselDragging : ""}`}
        onPointerDown={(event) => {
          if (!trackRef.current) return;
          dragStart.current = { x: event.clientX, scrollLeft: trackRef.current.scrollLeft };
          continuousPosition.current = trackRef.current.scrollLeft;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragging || !trackRef.current) return;
          trackRef.current.scrollLeft = dragStart.current.scrollLeft - (event.clientX - dragStart.current.x);
          continuousPosition.current = trackRef.current.scrollLeft;
        }}
        onPointerUp={(event) => {
          continuousPosition.current = trackRef.current?.scrollLeft ?? continuousPosition.current;
          manualMotionUntil.current = performance.now() + 160;
          setDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          continuousPosition.current = trackRef.current?.scrollLeft ?? continuousPosition.current;
          manualMotionUntil.current = performance.now() + 160;
          setDragging(false);
        }}
      >
        <div className={styles.carouselGroup} ref={firstGroupRef}>{renderCards()}</div>
        <div className={styles.carouselGroup}>{renderCards(true)}</div>
      </div>
    </div>
  );
}
