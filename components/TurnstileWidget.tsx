"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: {
        sitekey: string;
        theme: "light" | "dark";
        action: string;
        callback: () => void;
        "expired-callback": () => void;
        "error-callback": () => void;
      }) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export type TurnstileWidgetHandle = {
  reset: () => void;
};

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, { onVerifiedChange: (verified: boolean) => void }>(
function TurnstileWidget({ onVerifiedChange }, ref) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useImperativeHandle(ref, () => ({
    reset() {
      onVerifiedChange(false);
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    },
  }), [onVerifiedChange]);

  useEffect(() => {
    if (!siteKey || !container.current) return;
    const render = () => {
      if (window.turnstile && container.current && !widgetId.current) {
        widgetId.current = window.turnstile.render(container.current, {
          sitekey: siteKey,
          theme: "light",
          action: "turnstile-spin-v2",
          callback: () => onVerifiedChange(true),
          "expired-callback": () => onVerifiedChange(false),
          "error-callback": () => onVerifiedChange(false),
        });
      }
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
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [onVerifiedChange, siteKey]);

  if (!siteKey) return null;
  return <div className="full turnstile-widget" ref={container} aria-label="Security verification" />;
});
