import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "../../data/siteData";

gsap.registerPlugin(ScrollTrigger);

function getSlideState(index, activeIndex) {
  if (index === activeIndex) return "active";
  return index < activeIndex ? "previous" : "next";
}

export default function CoreSection() {
  const { coreStrengths } = siteData;
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isStaticLayout, setIsStaticLayout] = useState(() =>
    window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const desktopQuery = window.matchMedia("(min-width: 761px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const itemCount = coreStrengths.items.length;
    let ctx;

    const updateFromProgress = (progress) => {
      const clampedProgress = Math.min(0.999, Math.max(0, progress));
      const thresholds = [0.4, 0.7, 1];
      let nextIndex = thresholds.findIndex((t) => clampedProgress < t);
      if (nextIndex === -1) nextIndex = itemCount - 1;

      section.style.setProperty("--core-progress", clampedProgress.toFixed(4));
      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    };

    const setupCoreScroll = () => {
      ctx?.revert();

      const shouldUseStaticLayout = !desktopQuery.matches || reduceMotionQuery.matches;
      setIsStaticLayout(shouldUseStaticLayout);

      if (shouldUseStaticLayout) {
        section.style.setProperty("--core-progress", "1");
        setActiveIndex(0);
        ctx = undefined;
        return;
      }

      section.style.setProperty("--core-progress", "0");
      setActiveIndex(0);

      ctx = gsap.context(() => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 70%",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateFromProgress(self.progress),
          onRefresh: (self) => updateFromProgress(self.progress),
        });

        updateFromProgress(trigger.progress);
      }, section);
    };

    setupCoreScroll();
    desktopQuery.addEventListener("change", setupCoreScroll);
    reduceMotionQuery.addEventListener("change", setupCoreScroll);

    return () => {
      desktopQuery.removeEventListener("change", setupCoreScroll);
      reduceMotionQuery.removeEventListener("change", setupCoreScroll);
      ctx?.revert();
    };
  }, [coreStrengths.items.length]);

  return (
    <section
      className={`content-shell core-section${isStaticLayout ? " core-static-layout" : ""}`}
      id="core"
      ref={sectionRef}
    >
      <div className="content-main core-scroll-stage">
        <div className="core-pin-frame">
          <div className="core-sticky-stage">
            <div className="core-section-head">
              <div>
                <p className="core-eyebrow">
                  <span aria-hidden="true" />
                  {coreStrengths.eyebrow}
                </p>
                <h2>{coreStrengths.title}</h2>
              </div>
            </div>

            <div className="core-slide-track">
              <div className="core-progress-bar" aria-hidden="true">
                <span />
              </div>
              {coreStrengths.items.map((item, index) => {
                const slideState = getSlideState(index, activeIndex);
                const isActive = slideState === "active";

                return (
                  <article
                    className={`core-slide core-slide-${slideState}${isActive ? " core-active-slide" : ""}`}
                    aria-hidden={!isStaticLayout && !isActive}
                    key={item.index}
                  >
                    <div className="core-slide-copy">
                      <p className="core-strength-index">{item.index}</p>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p className="core-slide-proof">{item.proof}</p>
                      </div>
                    </div>
                    <div className="core-slide-visual">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
