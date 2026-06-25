import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { siteData } from "../../data/siteData";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("reveal-standard", "0.22, 1, 0.36, 1");

const revealEase = "reveal-standard";

export default function AILabSection() {
  const { aiLab } = siteData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const titleEnterStart = { opacity: 0, y: 80 };
    const copyEnterStart = { opacity: 0, y: 60 };
    const imageEnterStart = { opacity: 0, y: 60, scale: 0.96 };
    const contentEnterEnd = { opacity: 1, y: 0, scale: 1 };
    const titleGroup = section.querySelector(".ai-lab-title-group");
    const copyGroup = section.querySelector(".ai-lab-copy-group");
    const imageGroup = section.querySelector(".ai-lab-image-group");
    const timelineLine = section.querySelector(".ai-lab-timeline-track");
    const sequenceItems = gsap.utils.toArray(".ai-lab-sequence-item", section);
    const sequenceLayers = gsap.utils.toArray(
      ".ai-lab-sequence-layer",
      section,
    );
    const isNarrow = window.matchMedia("(max-width: 760px)").matches;
    const lineScaleProperty = isNarrow ? "scaleY" : "scaleX";

    if (reduceMotion) {
      gsap.set(
        [
          titleGroup,
          copyGroup,
          imageGroup,
          ...sequenceItems,
          ...sequenceLayers,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      );
      gsap.set(timelineLine, { scaleX: 1, scaleY: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(timelineLine, {
        scaleX: isNarrow ? 1 : 0,
        scaleY: isNarrow ? 0 : 1,
        transformOrigin: isNarrow ? "center top" : "left center",
      });
      gsap.set(titleGroup, {
        ...titleEnterStart,
        y: isNarrow ? 56 : titleEnterStart.y,
      });
      gsap.set(copyGroup, {
        ...copyEnterStart,
        y: isNarrow ? 72 : copyEnterStart.y,
      });
      gsap.set(imageGroup, {
        ...imageEnterStart,
        y: isNarrow ? 72 : imageEnterStart.y,
        transformOrigin: "center bottom",
      });
      gsap.set(sequenceItems, { opacity: 0, y: 60 });
      gsap.set(sequenceLayers, {
        opacity: 0,
        y: 60,
        scale: 0.96,
        transformOrigin: "center bottom",
      });

      const aiLabTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "+=1200",
          // markers: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      aiLabTimeline
        .to(titleGroup, { y: 0, opacity: 1, duration: 1, ease: revealEase }, 0)
        .to(copyGroup, { y: 0, opacity: 1, duration: 1, ease: revealEase }, 0.6)
        .to(
          imageGroup,
          { ...contentEnterEnd, duration: 2, ease: revealEase },
          2,
        )
        .to(
          sequenceItems,
          { y: 0, opacity: 1, duration: 2, stagger: 0.2, ease: revealEase },
          2,
        )
        .to(
          timelineLine,
          { [lineScaleProperty]: 1, duration: 2, ease: "none" },
          2,
        )
        .to(
          sequenceLayers,
          { ...contentEnterEnd, duration: 2, stagger: 0.2, ease: revealEase },
          2,
        );

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="content-shell ai-lab-section"
      id="ai-lab"
      ref={sectionRef}
    >
      <div className="ai-lab-sticky-stage">
        <div className="content-main ai-lab-content">
          <div className="ai-lab-intro-group">
            <div className="ai-lab-head ai-lab-title-group">
              <p className="ai-lab-eyebrow">
                <span aria-hidden="true" />
                {aiLab.eyebrow}
              </p>
              <h2>{aiLab.title}</h2>
            </div>
            <div className="ai-lab-copy ai-lab-copy-group">
              <p className="ai-lab-lead">{aiLab.intro.lead}</p>
              {aiLab.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="ai-lab-emphasis">{aiLab.intro.emphasis}</p>
            </div>
          </div>
          <div className="ai-lab-stage ai-lab-image-group">
            <div className="ai-lab-timeline" aria-hidden="true">
              <span className="ai-lab-timeline-track" />
              <span className="ai-lab-timeline-fill" />
            </div>
            <div className="ai-lab-step-list" aria-label="AI协作工作流">
              {aiLab.steps.map((step) => (
                <article
                  className="ai-lab-step ai-lab-sequence-item"
                  key={step.title}
                >
                  <svg
                    className="ai-lab-step-marker"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect x="4.5" width="1" height="10" fill="#FFB800" />
                    <rect
                      x="10"
                      y="4.5"
                      width="1"
                      height="10"
                      transform="rotate(90 10 4.5)"
                      fill="#FFB800"
                    />
                  </svg>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.subtitle}</p>
                  </div>
                  <div className="ai-lab-tool">
                    {step.iconSrc ? (
                      <img
                        className="ai-lab-tool-icon"
                        src={step.iconSrc}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                      />
                    ) : (
                      <i className={step.icon} aria-hidden="true" />
                    )}
                    <span>{step.tool}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="ai-lab-visual" aria-label={aiLab.imageAlt}>
              {aiLab.layers.map((layer) => (
                <img
                  className={`ai-lab-layer ai-lab-sequence-layer ${layer.className}`}
                  src={layer.src}
                  alt={layer.alt}
                  key={layer.src}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
