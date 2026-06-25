import { useEffect } from "react";

const projectScrollKey = "liangPortfolioProjectScrollY";

function restoreProjectScroll(savedScrollY) {
  const restore = () => window.scrollTo({ top: savedScrollY, left: 0, behavior: "auto" });
  requestAnimationFrame(() => {
    restore();
    requestAnimationFrame(() => {
      restore();
      window.history.replaceState(null, "", window.location.pathname);
    });
  });
  window.setTimeout(restore, 120);
}

export function useProjectScrollMemory() {
  useEffect(() => {
    const projectLinks = Array.from(document.querySelectorAll(".selected-project, .selected-work-visual-link"));
    const rememberScroll = () => {
      sessionStorage.setItem(projectScrollKey, String(window.scrollY));
    };

    projectLinks.forEach((projectLink) => {
      projectLink.addEventListener("click", rememberScroll);
    });

    const params = new URLSearchParams(window.location.search);
    if (params.get("restoreProjectScroll") === "1") {
      const savedScrollY = Number(sessionStorage.getItem(projectScrollKey));
      if (Number.isFinite(savedScrollY)) {
        restoreProjectScroll(savedScrollY);
      }
    }

    return () => {
      projectLinks.forEach((projectLink) => {
        projectLink.removeEventListener("click", rememberScroll);
      });
    };
  }, []);
}

export function rememberProjectScroll() {
  sessionStorage.setItem(projectScrollKey, String(window.scrollY));
}
