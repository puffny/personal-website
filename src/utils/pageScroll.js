export function jumpToPageY(top) {
  const y = Number.isFinite(top) ? top : 0;
  const lenis = window.__liangPortfolioLenis;

  window.scrollTo({ top: y, left: 0, behavior: "auto" });

  if (lenis?.scrollTo) {
    lenis.resize?.();
    lenis.reset?.();
    lenis.scrollTo(y, { immediate: true, force: true });
  }

  window.scrollTo({ top: y, left: 0, behavior: "auto" });
}

export function scrollPageToTop({ smooth = false } = {}) {
  const lenis = window.__liangPortfolioLenis;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (lenis?.scrollTo) {
    lenis.scrollTo(0, {
      immediate: !smooth || reduceMotion,
      duration: smooth && !reduceMotion ? 0.65 : undefined,
      force: true,
      lock: !smooth || reduceMotion,
    });
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: smooth && !reduceMotion ? "smooth" : "auto" });
}
