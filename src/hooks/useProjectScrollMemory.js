import { useLayoutEffect } from "react";
import { jumpToPageY } from "../utils/pageScroll";

const projectScrollKey = "liangPortfolioProjectScrollY";

function restoreProjectScroll(savedScrollY) {
  let isActive = true;
  let frameId = 0;
  let secondFrameId = 0;
  let timerId = 0;
  const restore = () => {
    if (!isActive || window.location.pathname !== "/") return;
    jumpToPageY(savedScrollY);
    window.dispatchEvent(new Event("scroll"));
  };

  restore();

  frameId = requestAnimationFrame(() => {
    restore();
    secondFrameId = requestAnimationFrame(() => {
      restore();
      if (isActive && window.location.pathname === "/") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    });
  });
  timerId = window.setTimeout(restore, 120);

  return () => {
    isActive = false;
    cancelAnimationFrame(frameId);
    cancelAnimationFrame(secondFrameId);
    window.clearTimeout(timerId);
  };
}

export function useProjectScrollMemory() {
  useLayoutEffect(() => {
    const projectLinks = Array.from(document.querySelectorAll(".selected-project, .selected-work-visual-link"));
    const rememberScroll = () => {
      sessionStorage.setItem(projectScrollKey, String(window.scrollY));
    };

    projectLinks.forEach((projectLink) => {
      projectLink.addEventListener("click", rememberScroll);
    });

    const params = new URLSearchParams(window.location.search);
    let cancelRestoreProjectScroll = () => {};
    if (params.get("restoreProjectScroll") === "1") {
      const savedScrollY = Number(sessionStorage.getItem(projectScrollKey));
      if (Number.isFinite(savedScrollY)) {
        cancelRestoreProjectScroll = restoreProjectScroll(savedScrollY);
      }
    }

    return () => {
      cancelRestoreProjectScroll();
      projectLinks.forEach((projectLink) => {
        projectLink.removeEventListener("click", rememberScroll);
      });
    };
  }, []);
}

export function rememberProjectScroll() {
  sessionStorage.setItem(projectScrollKey, String(window.scrollY));
}
