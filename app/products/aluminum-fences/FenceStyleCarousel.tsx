"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gateStyles from "../aluminum-gates/swing-gates/swing-gates.module.css";
import detailStyles from "./fence-detail.module.css";

const fenceStyles = [
  ["/images/product-gallery/fences/fence-project-reference-01.webp", "Gray mixed solid and open-slat aluminum privacy fence beside a modern white residence", "Mixed Privacy"],
  ["/images/product-gallery/fences/fence-project-reference-02.webp", "Dark gray horizontal louvered aluminum privacy fence installed beside a villa", "Louvered Privacy"],
  ["/images/product-gallery/fences/fence-project-reference-03.webp", "Anthracite horizontal louvered aluminum fence along a modern residential garden", "Horizontal Louvers"],
  ["/images/product-gallery/fences/fence-project-reference-04.webp", "Black vertical-slat aluminum boundary fence around a landscaped modern residence", "Vertical Slats"],
  ["/images/product-gallery/fences/fence-05.png", "Solid horizontal aluminum privacy fence", "Closed Privacy"],
  ["/images/product-gallery/fences/fence-project-reference-06.webp", "Black horizontal open-slat aluminum fence installed along a residential boundary", "Open Horizontal"],
] as const;

export function FenceStyleCarousel() {
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

  const renderCards = (duplicate = false) => fenceStyles.map(([src, alt, label], index) => (
    <figure className={gateStyles.carouselCard} key={`${duplicate ? "duplicate-" : ""}${src}`} aria-hidden={duplicate || undefined}>
      <div><Image src={src} alt={duplicate ? "" : alt} fill unoptimized sizes="(max-width: 700px) 82vw, 36vw" draggable={false} /></div>
      <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></figcaption>
    </figure>
  ));

  return (
    <div className={`${gateStyles.carouselShell} ${detailStyles.fenceCarousel}`} data-no-reveal>
      <div className={gateStyles.carouselControls}><span>Drag to explore fence systems</span></div>
      <div
        ref={trackRef}
        className={`${gateStyles.carouselTrack} ${dragging ? gateStyles.carouselDragging : ""}`}
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
        <div className={gateStyles.carouselGroup} ref={firstGroupRef}>{renderCards()}</div>
        <div className={gateStyles.carouselGroup}>{renderCards(true)}</div>
      </div>
    </div>
  );
}
