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
    const pageBgVideo = document.querySelector(".page-bg-video");
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

    const countDuration = 1850;
    const revealDuration = 1750;
    const introPanelExitMs = 680;
    const introRevealDelayMs = 620;
    const videoFallbackWaitMs = 7000;
    const maxWaitingProgress = 0.98;
    const introIconChangeIntervalMs = 680;
    const introIconTransitionMs = 560;
    let start = performance.now();
    let lastIconIndex = -1;
    let frameId = 0;
    let contentReadyTimer = 0;
    let removeTimer = 0;
    let revealStartTimer = 0;
    let videoFallbackTimer = 0;
    let iconCleanupTimer = 0;
    let videoReady = !pageBgVideo || pageBgVideo.readyState >= 2;
    let isRevealing = false;

    const setProgress = (progress, maxPercent = 100) => {
      const clampedProgress = Math.max(0, Math.min(progress, 1));
      const eased = 1 - Math.pow(1 - clampedProgress, 2.4);
      const value = Math.min(maxPercent, Math.max(1, Math.round(1 + eased * 99)));
      introPercent.textContent = `${value}%`;
      introLoaderLine.style.transform = `scaleX(${clampedProgress})`;
    };

    const markVideoReady = () => {
      videoReady = true;
    };

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
      const elapsed = now - start;
      const minLoadComplete = elapsed >= countDuration;
      const rawProgress = Math.min(elapsed / countDuration, 1);
      const progress = videoReady && minLoadComplete ? 1 : Math.min(rawProgress, maxWaitingProgress);
      const iconIndex = Math.min(
        introLoaderIcons.length - 1,
        Math.floor(elapsed / introIconChangeIntervalMs),
      );

      setProgress(progress, videoReady && minLoadComplete ? 100 : 98);
      updateIcon(iconIndex);

      if (!videoReady || !minLoadComplete) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (isRevealing) return;
      isRevealing = true;
      setProgress(1);
      introLoader.classList.add("is-loading-complete");
      revealStartTimer = window.setTimeout(() => {
        introLoader.classList.add("is-revealing");
      }, introRevealDelayMs);
      contentReadyTimer = window.setTimeout(
        markIntroContentReady,
        introRevealDelayMs + Math.max(0, revealDuration - introContentReadyLeadMs),
      );
      removeTimer = window.setTimeout(() => {
        introLoader.classList.add("is-finished");
        completeIntroState();
        sessionStorage.setItem(introLoaderSessionKey, "1");
        if (introLoaderDebugHold) return;
        hideIntroLoader();
      }, introRevealDelayMs + revealDuration);
    };

    if (pageBgVideo && !videoReady) {
      pageBgVideo.addEventListener("loadeddata", markVideoReady, { once: true });
      pageBgVideo.addEventListener("canplay", markVideoReady, { once: true });
      pageBgVideo.addEventListener("error", markVideoReady, { once: true });
      videoFallbackTimer = window.setTimeout(markVideoReady, videoFallbackWaitMs);
    }

    frameId = requestAnimationFrame((now) => {
      start = now;
      frameId = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(contentReadyTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(revealStartTimer);
      window.clearTimeout(videoFallbackTimer);
      window.clearTimeout(iconCleanupTimer);
      if (pageBgVideo) {
        pageBgVideo.removeEventListener("loadeddata", markVideoReady);
        pageBgVideo.removeEventListener("canplay", markVideoReady);
        pageBgVideo.removeEventListener("error", markVideoReady);
      }
    };
  }, []);
}
