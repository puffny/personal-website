import { useEffect } from "react";

export function useRevealInteractions() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = sortRevealTargets([
      ".content-shell",
      ".content-main h2",
      ".large-copy p",
      ".about-stat",
      ".tool-marquee",
      ".core-scroll-stage",
      ".selected-work-card",
      ".selected-work-metric",
      ".selected-work-tags span",
      ".selected-work-result",
      ".ai-lab-copy p",
      ".work-card",
      ".project-list a",
      ".selected-project",
      ".thinking-article > *",
      ".article-figure img",
      ".skill-group span",
      ".tool-grid span",
      ".info-columns > div",
      ".showcase-card",
      ".career-timeline article",
    ]
      .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
      .filter(
        (element, index, elements) =>
          elements.indexOf(element) === index &&
          !element.closest(".final-contact-section") &&
          !element.closest("#ai-lab") &&
          (!element.closest("#core") || element.matches("#core .content-main h2")),
      ));

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-item");
      decorateRevealItem(element);
      element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
    });

    let observer;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px 8% 0px" },
      );

      revealTargets.forEach((element) => observer.observe(element));
    }

    const cleanupMagnetic = initMagneticHover();
    const cleanupEdgeGlow = initProjectEdgeGlow();

    return () => {
      observer?.disconnect();
      cleanupMagnetic();
      cleanupEdgeGlow();
    };
  }, []);
}

function sortRevealTargets(elements) {
  return [...elements].sort((elementA, elementB) => {
    const rectA = elementA.getBoundingClientRect();
    const rectB = elementB.getBoundingClientRect();
    const topDelta = rectA.top + window.scrollY - (rectB.top + window.scrollY);

    if (Math.abs(topDelta) > 24) return topDelta;
    return rectA.left - rectB.left;
  });
}

function decorateRevealItem(element) {
  element.style.setProperty("--reveal-drift-x", "0px");
  element.style.setProperty("--reveal-drift-y", "32px");

  if (element.matches(".content-main h2")) {
    element.classList.add("reveal-heading");
    element.style.setProperty("--reveal-drift-y", "32px");
    return;
  }

  if (element.matches(".large-copy p, .ai-lab-copy p, .selected-work-copy > p, .selected-work-result")) {
    element.classList.add("reveal-copy");
    element.style.setProperty("--reveal-drift-y", "32px");
    return;
  }

  if (element.matches(".about-stat, .selected-work-metric, .selected-work-tags span")) {
    element.classList.add("reveal-stat");
    element.style.setProperty("--reveal-drift-y", "32px");
    return;
  }

  if (element.matches(".ai-lab-step, .career-timeline article")) {
    element.classList.add("reveal-step");
    element.style.setProperty("--reveal-drift-y", "32px");
  }
}

function initMagneticHover() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const cleanups = [];
  const magneticItems = Array.from(
    document.querySelectorAll(".pill-button, .tool-marquee span, .project-list a, .showcase-card"),
  );

  magneticItems.forEach((item) => {
    item.classList.add("magnetic-hover");

    const handleMouseMove = (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.1;
      item.style.setProperty("--magnetic-x", `${x}px`);
      item.style.setProperty("--magnetic-y", `${y}px`);
      item.style.transform = "translate3d(var(--magnetic-x), var(--magnetic-y), 0)";
    };

    const handleMouseLeave = () => {
      item.style.removeProperty("--magnetic-x");
      item.style.removeProperty("--magnetic-y");
      item.style.transform = "";
    };

    item.addEventListener("mousemove", handleMouseMove);
    item.addEventListener("mouseleave", handleMouseLeave);
    cleanups.push(() => {
      item.removeEventListener("mousemove", handleMouseMove);
      item.removeEventListener("mouseleave", handleMouseLeave);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initProjectEdgeGlow() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups = [];
  const edgeGlowCards = Array.from(document.querySelectorAll(".showcase-card"));

  edgeGlowCards.forEach((card) => {
    card.classList.add("edge-glow-card");
    card.style.setProperty("--edge-proximity", "0");
    card.style.setProperty("--cursor-angle", "45deg");
  });

  if (reduceMotion) return () => {};

  edgeGlowCards.forEach((card) => {
    const handlePointerMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceToEdge = Math.min(x, y, rect.width - x, rect.height - y);
      const edgeProximity = Math.max(0, Math.min(100, 100 - (distanceToEdge / 34) * 100));
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;

      card.style.setProperty("--edge-proximity", edgeProximity.toFixed(2));
      card.style.setProperty("--cursor-angle", `${angle.toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
    };

    const handlePointerLeave = () => {
      card.style.setProperty("--edge-proximity", "0");
    };

    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);
    cleanups.push(() => {
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
