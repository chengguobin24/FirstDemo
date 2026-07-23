"use client";

import { useLayoutEffect } from "react";

const REVEAL_SELECTOR = [
  "#main .site-reveal",
  "#main h1",
  "#main h2",
  "#main h3",
  "#main p",
  "#main blockquote",
  "#main figcaption",
  "#main img",
].join(",");

function isRevealTarget(element: Element): element is HTMLElement {
  return element instanceof HTMLElement && !element.closest("[data-no-reveal]");
}

export function ScrollReveal() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      document.documentElement.classList.add("scroll-reveal-disabled");
      return;
    }

    document.documentElement.classList.add("scroll-reveal-enabled");

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.classList.add("is-revealed");
          intersectionObserver.unobserve(target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    const register = (scope: ParentNode) => {
      const scopeMatch = scope instanceof Element && scope.matches(REVEAL_SELECTOR) ? [scope] : [];
      const candidates = [...scopeMatch, ...Array.from(scope.querySelectorAll(REVEAL_SELECTOR))].filter(isRevealTarget);
      const parentOrder = new Map<Element, number>();

      candidates.forEach((element) => {
        if (element.dataset.revealReady === "true") return;

        element.dataset.revealReady = "true";
        element.classList.add("site-reveal");
        if (!element.classList.contains("site-reveal-image") && !element.classList.contains("site-reveal-text")) {
          element.classList.add(element.tagName === "IMG" ? "site-reveal-image" : "site-reveal-text");
        }

        const parent = element.parentElement;
        if (parent) {
          const order = parentOrder.get(parent) ?? 0;
          element.style.setProperty("--reveal-delay", `${Math.min(order, 3) * 70}ms`);
          parentOrder.set(parent, order + 1);
        }

        intersectionObserver.observe(element);
      });
    };

    register(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && (node.id === "main" || node.closest("#main") || node.querySelector("#main"))) {
            register(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
      document.documentElement.classList.remove("scroll-reveal-enabled");
    };
  }, []);

  return null;
}
