"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PergolaDetail.module.css";

const finishes = [
  { id: "grey", label: "Grey", image: "/images/products/pergola-color-grey-v2.png", alt: "Grey powder-coated aluminum pergola on a modern residential terrace" },
  { id: "white", label: "White", image: "/images/products/pergola-color-white-v2.png", alt: "White powder-coated aluminum pergola on a modern residential terrace" },
  { id: "coffee", label: "Coffee", image: "/images/products/pergola-color-coffee-v2.png", alt: "Coffee brown powder-coated aluminum pergola on a modern residential terrace" },
  { id: "black", label: "Black", image: "/images/products/pergola-color-black-v2.png", alt: "Black powder-coated aluminum pergola on a modern residential terrace" },
] as const;

type FinishId = (typeof finishes)[number]["id"];

const accessories = [
  { id: "led-lighting", label: "Integrated LED lighting", image: "/images/products/pergola-accessory-led-lighting.png", alt: "Aluminum pergola with warm integrated LED lighting in the roof louvers and perimeter beams" },
  { id: "ceiling-fan", label: "Ceiling fan", image: "/images/products/pergola-accessory-ceiling-fan.png", alt: "Aluminum pergola with a ceiling fan mounted beneath the center of the louvered roof" },
  { id: "ceiling-heater", label: "Ceiling-mounted heater", image: "/images/products/pergola-accessory-ceiling-heater.png", alt: "Aluminum pergola with a glowing infrared heater mounted beneath the center of the roof" },
  { id: "windproof-screen", label: "Windproof screen", image: "/images/products/pergola-accessory-windproof-screens.png", alt: "Aluminum pergola with full-height ZIP windproof screens installed on both sides" },
  { id: "wind-speed-sensor", label: "Wind speed sensor", image: "/images/products/pergola-accessory-wind-speed-sensor.png", alt: "Wind speed sensor mounted on an aluminum pergola in strong windy conditions with a magnified product detail" },
] as const;

export function PergolaAccessorySelector() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [finishId, setFinishId] = useState<FinishId>("black");
  const activeAccessory = accessories.find((item) => item.id === activeId && "image" in item);
  const activeFinish = finishes.find((item) => item.id === finishId) ?? finishes[3];
  const view = activeAccessory && "image" in activeAccessory ? activeAccessory : activeFinish;

  useEffect(() => {
    finishes.forEach((finish) => {
      const image = new window.Image();
      image.src = finish.image;
    });
  }, []);

  return (
    <section className={styles.options} id="finishes-accessories" onClick={() => setActiveId(null)}>
      <div className={`${styles.optionBlock} ${styles.optionVisualBlock}`}>
        <div className={`${styles.colourPreview} ${activeAccessory ? styles.accessoryPreviewMode : ""}`}>
          {!activeAccessory && (
            <div className={styles.colourControls} onClick={(event) => event.stopPropagation()}>
              <div className={styles.colourHeading}>
                <span>Colour reference</span>
                <strong>Four standard finishes</strong>
              </div>
              <div className={styles.colourButtons} aria-label="Preview pergola colours">
                {finishes.map((finish) => (
                  <button
                    type="button"
                    className={`${styles.colourButton} ${finish.id === finishId ? styles.colourButtonActive : ""}`}
                    data-finish={finish.id}
                    aria-pressed={finish.id === finishId}
                    onClick={() => setFinishId(finish.id)}
                    key={finish.id}
                  >
                    <i aria-hidden="true" />
                    <span>{finish.label}</span>
                  </button>
                ))}
              </div>
              <p>Custom colours can be reviewed for confirmed projects.</p>
            </div>
          )}
          <div className={styles.optionVisual}>
            <Image key={view.image} className={styles.optionSwapImage} src={view.image} alt={view.alt} fill priority unoptimized sizes="(max-width: 1050px) 100vw, 44vw" />
            {activeAccessory && <div className={styles.optionImageLabel} aria-live="polite"><span>Previewing</span><strong>{activeAccessory.label}</strong></div>}
          </div>
        </div>
      </div>
      <div className={styles.optionBlock}>
        <h2>Complete the<br /><em>outdoor space.</em></h2>
        <ul className={styles.accessoryList}>
          {accessories.map((item, index) => {
            const available = "image" in item;
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <button type="button" className={`${styles.accessoryButton} ${active ? styles.accessoryActive : ""}`} disabled={!available} aria-pressed={available ? active : undefined} onClick={(event) => { event.stopPropagation(); if (available) setActiveId(active ? null : item.id); }}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                  <small>{available ? (active ? "Viewing" : "View") : "Image coming soon"}</small>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
