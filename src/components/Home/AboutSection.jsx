import { siteData } from "../../data/siteData";
import { useEffect, useRef, useState } from "react";

function CountNumber({ value }) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState("0+");

  useEffect(() => {
    const target = parseInt(value, 10);
    const suffix = value.replace(String(target), "");
    if (!target || !ref.current) {
      setDisplayValue(value);
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setDisplayValue(value);
      return undefined;
    }

    let frameId = 0;
    const duration = 1100;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(`${Math.round(target * eased)}${suffix}`);

          if (progress < 1) {
            frameId = requestAnimationFrame(tick);
          }
        };

        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}

function RichParagraph({ parts }) {
  return (
    <p>
      {parts.map((part, index) =>
        part.highlight ? (
          <span className="marker-highlight" key={`${part.text}-${index}`}>
            {part.text}
          </span>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </p>
  );
}

export default function AboutSection() {
  const { about, career, heroStats } = siteData;
  const aboutStats = heroStats.slice(0, 2);

  return (
    <section className="content-shell" id="summary">
      <div className="content-main">
        <h2>About Me</h2>
        <div className="about-career">
          <div className="about-intro">
            <p className="section-kicker">{about.kicker}</p>
            {about.paragraphs.map((parts, index) => (
              <RichParagraph parts={parts} key={index} />
            ))}
            <div className="about-stats" aria-label="Professional highlights">
              {aboutStats.map((item) => (
                <div className="about-stat" key={item.value}>
                  <CountNumber value={item.value} />
                  {item.label ? <p>{item.label}</p> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="career-timeline" aria-label="Career timeline">
            {career.map((job) => (
              <article key={job.year}>
                <span>{job.year}</span>
                <div>
                  <h3>{job.company}</h3>
                  <p>{job.description}</p>
                  <div className="timeline-tags" aria-label="核心能力">
                    {job.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <ToolMarquee />
      </div>
    </section>
  );
}

export function ToolMarquee() {
  const groups = [siteData.tools, siteData.tools];

  return (
    <div className="tool-marquee" aria-label="常用设计与 AI 工具">
      <div className="tool-marquee-track">
        {groups.map((tools, groupIndex) => (
          <div className="tool-marquee-group" aria-hidden={groupIndex === 1 ? "true" : undefined} key={groupIndex}>
            {tools.map(([name, icon]) => (
              <span key={`${groupIndex}-${name}`}>
                <img src={icon} alt="" loading="lazy" />
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
