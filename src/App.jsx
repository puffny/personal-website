import { useCallback, useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { scrollPageToTop } from "./utils/pageScroll";
import CustomCursor from "./components/shared/CustomCursor";
import "./components/shared/CustomCursor.css";

const routes = {
  "/": { page: "home" },
  "/project/tianmu": { page: "project", slug: "tianmu" },
  "/project/baozhang": { page: "project", slug: "baozhang" },
  "/project/senben": { page: "project", slug: "senben" },
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useSmoothScroll();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const navigate = useCallback((to) => {
    const nextUrl = new URL(to, window.location.origin);
    const shouldRestoreProjectScroll = nextUrl.searchParams.get("restoreProjectScroll") === "1";
    window.history.pushState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    setPath(window.location.pathname);
    if (!shouldRestoreProjectScroll && !nextUrl.hash) {
      scrollPageToTop();
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    const handleDocumentClick = (event) => {
      if (event.defaultPrevented) return;

      const link = event.target.closest("a[href]");
      if (!link) return;
      if (link.target || link.hasAttribute("download") || link.origin !== window.location.origin) return;
      const nextUrl = new URL(link.href);
      const nextRoute = routes[nextUrl.pathname];
      if (!nextRoute) return;
      const shouldRestoreProjectScroll = nextUrl.searchParams.get("restoreProjectScroll") === "1";

      event.preventDefault();
      if (nextUrl.pathname.startsWith("/project/")) {
        sessionStorage.setItem("liangPortfolioProjectScrollY", String(window.scrollY));
      }
      window.history.pushState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
      setPath(window.location.pathname);
      if (!shouldRestoreProjectScroll && !nextUrl.hash) scrollPageToTop();
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const route = routes[path] || routes["/"];
  const page =
    route.page === "project" ? (
      <ProjectPage slug={route.slug} navigate={navigate} />
    ) : (
      <HomePage />
    );

  return (
    <>
      <CustomCursor />
      {page}
      <div className="progressive-bottom-blur" aria-hidden="true">
        <span className="progressive-bottom-blur-layer" />
        <span className="progressive-bottom-blur-layer" />
        <span className="progressive-bottom-blur-layer" />
        <span className="progressive-bottom-blur-layer" />
        <span className="progressive-bottom-blur-layer" />
        <span className="progressive-bottom-blur-layer" />
        <span className="progressive-bottom-blur-layer" />
        <span className="progressive-bottom-blur-layer" />
      </div>
    </>
  );
}
