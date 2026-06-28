import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "../../data/siteData";
import TextPressure from "../shared/TextPressure";

gsap.registerPlugin(ScrollTrigger);

function getRevealOffset(styles, propertyName, fallback) {
  const value = Number.parseFloat(styles.getPropertyValue(propertyName));
  return Number.isFinite(value) ? value : fallback;
}

export default function FinalContactSection() {
  const { contact } = siteData;
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const contactItems = [
    contact.email,
    contact.phone,
    contact.location,
    contact.website,
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const finalThanks = section?.querySelector(".final-thanks");
    const finalContactList = section?.querySelector(".final-contact-list");
    if (!section || !container || !finalThanks || !finalContactList) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set([container, finalThanks, finalContactList], { yPercent: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const sectionStyles = getComputedStyle(section);
      const containerRevealY = getRevealOffset(
        sectionStyles,
        "--final-reveal-container-y",
        -80,
      );
      const thanksRevealY = getRevealOffset(
        sectionStyles,
        "--final-reveal-thanks-y",
        -12,
      );
      const contactRevealY = getRevealOffset(
        sectionStyles,
        "--final-reveal-contact-y",
        -12,
      );
      const footerReveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      footerReveal
        .fromTo(
          container,
          { yPercent: containerRevealY },
          { yPercent: 0, ease: "none" },
          0,
        )
        .fromTo(
          finalThanks,
          { yPercent: thanksRevealY },
          { yPercent: 0, ease: "none" },
          0,
        )
        .fromTo(
          finalContactList,
          { yPercent: contactRevealY },
          { yPercent: 0, ease: "none" },
          0,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="content-shell final-contact-section"
      id="contact"
      ref={sectionRef}
    >
      <div className="final-contact-container" ref={containerRef}>
        <div className="content-main final-contact">
          <h2 className="final-thanks" aria-label="THANKS.">
            <TextPressure
              text="THANKS."
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor="#fff"
              minFontSize={96}
            />
          </h2>
          <address
            className="final-contact-list"
            aria-label="Contact information"
          >
            {contactItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </address>
          <p className="final-copyright">{contact.copyright}</p>
        </div>
      </div>
    </section>
  );
}
