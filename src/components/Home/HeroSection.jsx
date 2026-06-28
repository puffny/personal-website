import { useEffect, useState } from "react";
import { siteData } from "../../data/siteData";
import SplitText from "../shared/SplitText";

const heroCopyRevealDelayMs = 120;

export default function HeroSection() {
  const { person, heroStats } = siteData;
  const heroScope = heroStats[2];
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    let revealTimer = 0;
    const revealHeroCopy = () => {
      window.clearTimeout(revealTimer);
      revealTimer = window.setTimeout(() => setIntroReady(true), heroCopyRevealDelayMs);
    };

    if (document.body.classList.contains("intro-content-ready")) {
      revealHeroCopy();
      return () => window.clearTimeout(revealTimer);
    }

    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("intro-content-ready")) {
        revealHeroCopy();
        observer.disconnect();
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => {
      observer.disconnect();
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <section className="hero">
      <img className="hero-photo" src={person.heroPhotoSrc} alt="" />
      <div className="hero-shade" />
      <div className="hero-top">
        <a className="site-logo" href="#home" aria-label="Puffny 主页">
          <span className="site-logo-pulse" aria-hidden="true" />
          <img src={person.logoSrc} alt="Puffny" />
        </a>
        <a className="pill-button" href={person.resumeHref} download="梁慧锋-UI设计个人简历.pdf">
          下载PDF简历
        </a>
      </div>
      <div className="hero-copy">
        {introReady ? (
          <>
            <SplitText
              tag="p"
              text={person.title}
              className="eyebrow hero-split-kicker"
              delay={70}
              duration={0.78}
              splitType="words"
              from={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              threshold={0.05}
              rootMargin="0px"
              textAlign="left"
              triggerOnScroll={false}
            />
            <h1 aria-label="LIANG HUIFENG">
              <SplitText
                tag="span"
                text="LIANG"
                className="hero-name-line"
                delay={60}
                duration={0.84}
                splitType="chars"
                from={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                threshold={0.05}
                rootMargin="0px"
                textAlign="left"
                ariaHidden
                triggerOnScroll={false}
              />
              <SplitText
                tag="span"
                text="HUIFENG"
                className="hero-name-line"
                delay={60}
                duration={0.84}
                splitType="chars"
                from={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                threshold={0.05}
                rootMargin="0px"
                textAlign="left"
                ariaHidden
                triggerOnScroll={false}
              />
            </h1>
            <SplitText
              tag="p"
              text={person.subtitle}
              className="hero-subtitle"
              delay={70}
              duration={0.78}
              splitType="words"
              from={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              threshold={0.05}
              rootMargin="0px"
              textAlign="left"
              triggerOnScroll={false}
            />
          </>
        ) : null}
      </div>
      {heroScope ? (
        <div className="contact-grid hero-scope-note" id="hero-contact" aria-label="Professional scope">
          <p>{heroScope.value}</p>
        </div>
      ) : null}
    </section>
  );
}
