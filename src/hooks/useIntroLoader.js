import { useEffect } from "react";
import { introLoaderIcons } from "../data/siteData";

const introLoaderSessionKey = "liangPortfolioIntroPlayed";
const introLoaderDebugHold = false;

export function shouldSkipIntroLoader() {
  const params = new URLSearchParams(window.location.search);
  return sessionStorage.getItem(introLoaderSessionKey) === "1" || params.get("restoreProjectScroll") === "1";
}

export function useIntroLoader() {
  useEffect(() => {
    const introLoader = document.querySelector(".intro-loader");
    const introPercent = document.getElementById("intro-percent");
    const introIcon = document.getElementById("intro-ui-icon");
    const introLoaderLine = document.getElementById("intro-loader-line");
    const completeIntroState = () => {
      document.body.classList.remove("intro-running");
      document.body.classList.add("intro-complete");
    };
    const hideIntroLoader = () => {
      introLoader.classList.add("is-finished", "is-hidden");
    };

    if (!introLoader || !introPercent || !introIcon || !introLoaderLine) {
      completeIntroState();
      return;
    }

    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navigationEntry?.type === "reload";
    const hasPlayedIntro = sessionStorage.getItem(introLoaderSessionKey) === "1";
    const isRestoringProjectScroll = new URLSearchParams(window.location.search).get("restoreProjectScroll") === "1";
    if ((hasPlayedIntro && !isReload) || isRestoringProjectScroll) {
      sessionStorage.setItem(introLoaderSessionKey, "1");
      completeIntroState();
      hideIntroLoader();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      sessionStorage.setItem(introLoaderSessionKey, "1");
      completeIntroState();
      hideIntroLoader();
      return;
    }

    const duration = 3600;
    const countDuration = 1850;
    let start = performance.now();
    let lastIconIndex = -1;
    let frameId = 0;
    let removeTimer = 0;

    const updateIcon = (index) => {
      if (index === lastIconIndex) return;
      lastIconIndex = index;
      introIcon.innerHTML = introLoaderIcons[index];
      introIcon.style.animation = "none";
      void introIcon.offsetWidth;
      introIcon.style.animation = "introIconSlide 0.62s cubic-bezier(0.22, 1, 0.36, 1)";
    };

    const tick = (now) => {
      const elapsed = Math.min(now - start, duration);
      const progress = Math.min(elapsed / countDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 2.4);
      const value = Math.max(1, Math.round(1 + eased * 99));
      const iconIndex = Math.min(introLoaderIcons.length - 1, Math.floor(progress / 0.2));

      introPercent.textContent = `${value}%`;
      introLoaderLine.style.transform = `scaleX(${progress})`;
      updateIcon(iconIndex);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      introLoader.classList.add("is-finished");
      completeIntroState();
      sessionStorage.setItem(introLoaderSessionKey, "1");
      if (introLoaderDebugHold) return;
      removeTimer = window.setTimeout(hideIntroLoader, 500);
    };

    frameId = requestAnimationFrame((now) => {
      start = now;
      frameId = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(removeTimer);
    };
  }, []);
}
