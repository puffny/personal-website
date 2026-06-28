import { useEffect, useRef } from "react";

export default function ProjectReadingProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const clampedProgress = Math.min(1, Math.max(0, progress));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clampedProgress})`;
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="project-reading-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  );
}
