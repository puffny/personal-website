import { useEffect } from "react";
import { introLoaderIcons } from "../data/siteData";

const introLoaderSessionKey = "liangPortfolioIntroPlayed";
const introLoaderDebugHold = false;
const introContentReadyLeadMs = 1000;

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
    const markIntroContentReady = () => {
      document.body.classList.add("intro-content-ready");
    };
    const hideIntroLoader = () => {
      introLoader.classList.add("is-finished", "is-hidden");
      markIntroContentReady();
    };

    if (!introLoader || !introPercent || !introIcon || !introLoaderLine) {
      completeIntroState();
      document.body.classList.add("intro-content-ready");
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
    const introIconChangeIntervalMs = 680;
    const introIconTransitionMs = 560;
    let start = performance.now();
    let lastIconIndex = -1;
    let frameId = 0;
    let contentReadyTimer = 0;
    let removeTimer = 0;
    let iconCleanupTimer = 0;

    const updateIcon = (index) => {
      if (index === lastIconIndex) return;
      lastIconIndex = index;

      introIcon.querySelectorAll(".intro-ui-icon-glyph").forEach((icon) => {
        icon.classList.add("is-exiting");
      });

      const nextIcon = document.createElement("span");
      nextIcon.className = "intro-ui-icon-glyph";
      nextIcon.innerHTML = introLoaderIcons[index];
      introIcon.appendChild(nextIcon);

      window.clearTimeout(iconCleanupTimer);
      iconCleanupTimer = window.setTimeout(() => {
        introIcon.querySelectorAll(".intro-ui-icon-glyph.is-exiting").forEach((icon) => icon.remove());
      }, introIconTransitionMs);
    };

    const tick = (now) => {
      const elapsed = Math.min(now - start, duration);
      const progress = Math.min(elapsed / countDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 2.4);
      const value = Math.max(1, Math.round(1 + eased * 99));
      const iconIndex = Math.min(
        introLoaderIcons.length - 1,
        Math.floor(elapsed / introIconChangeIntervalMs),
      );

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
      contentReadyTimer = window.setTimeout(markIntroContentReady, duration + 500 - introContentReadyLeadMs);
      frameId = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(contentReadyTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(iconCleanupTimer);
    };
  }, []);
}
