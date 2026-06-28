import { useEffect, useState } from "react";
import { scrollPageToTop } from "../../utils/pageScroll";

const SHOW_AFTER_Y = 120;

export default function ProjectBackToTop({ variant }) {
  const [isVisible, setIsVisible] = useState(() => window.scrollY > SHOW_AFTER_Y);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_Y);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    scrollPageToTop({ smooth: true });
  };

  return (
    <button
      aria-label="回到顶部"
      className={`project-back-to-top${variant ? ` project-back-to-top--${variant}` : ""}${isVisible ? " is-visible" : ""}`}
      onClick={handleClick}
      type="button"
    >
      <span>回顶部</span>
      <i className="ph-fill ph-arrow-fat-line-up" aria-hidden="true" />
    </button>
  );
}
