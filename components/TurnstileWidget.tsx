"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: { sitekey: string; theme: "light" | "dark" }) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget() {
  const container = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !container.current) return;
    let widgetId: string | undefined;
    const render = () => {
      if (window.turnstile && container.current && !widgetId) widgetId = window.turnstile.render(container.current, { sitekey: siteKey, theme: "dark" });
    };
    const existing = document.getElementById("turnstile-api") as HTMLScriptElement | null;
    if (existing) {
      if (window.turnstile) render(); else existing.addEventListener("load", render, { once: true });
    } else {
      const script = document.createElement("script");
      script.id = "turnstile-api";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", render, { once: true });
      document.head.appendChild(script);
    }
    return () => { if (widgetId && window.turnstile) window.turnstile.remove(widgetId); };
  }, [siteKey]);

  if (!siteKey) return null;
  return <div className="full" ref={container} aria-label="Security verification" />;
}
