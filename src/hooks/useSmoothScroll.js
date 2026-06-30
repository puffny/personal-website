import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldUseNativeScroll = window.matchMedia("(max-width: 760px)").matches;
    if (reduceMotion || shouldUseNativeScroll) {
      ScrollTrigger.refresh();
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.1,
      smoothWheel: true,
    });
    window.__liangPortfolioLenis = lenis;

    const updateScrollTriggers = () => ScrollTrigger.update();
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    let isDisposed = false;
    let resizeTimer = 0;
    let initialRefreshFrame = 0;

    const refreshScrollTriggers = () => {
      if (!isDisposed) ScrollTrigger.refresh();
    };
    const refreshScrollTriggersAfterResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refreshScrollTriggers, 150);
    };

    lenis.on("scroll", updateScrollTriggers);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener("load", refreshScrollTriggers);
    window.addEventListener("resize", refreshScrollTriggersAfterResize);
    document.fonts?.ready.then(refreshScrollTriggers).catch(() => {});

    const loadingImages = Array.from(document.images).filter((image) => !image.complete);
    loadingImages.forEach((image) => {
      image.addEventListener("load", refreshScrollTriggers, { once: true });
      image.addEventListener("error", refreshScrollTriggers, { once: true });
    });
    initialRefreshFrame = requestAnimationFrame(refreshScrollTriggers);

    return () => {
      isDisposed = true;
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(initialRefreshFrame);
      lenis.off("scroll", updateScrollTriggers);
      gsap.ticker.remove(raf);
      window.removeEventListener("load", refreshScrollTriggers);
      window.removeEventListener("resize", refreshScrollTriggersAfterResize);
      loadingImages.forEach((image) => {
        image.removeEventListener("load", refreshScrollTriggers);
        image.removeEventListener("error", refreshScrollTriggers);
      });
      if (window.__liangPortfolioLenis === lenis) {
        delete window.__liangPortfolioLenis;
      }
      lenis.destroy();
    };
  }, []);
}
