import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollParallax() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      const hero = document.querySelector(".hero");
      const background = document.querySelector(".page-bg");
      const photo = document.querySelector(".hero-photo");
      if (!hero || !background) return;

      gsap.set(document.documentElement, {
        "--parallax-bg-scale": 1,
        "--parallax-photo-y": photo ? "0vh" : "0vh",
      });

      gsap.to(document.documentElement, {
        "--parallax-bg-scale": 1.28,
        "--parallax-photo-y": "-30vh",
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "90% top",
          scrub: 0.18,
        },
      });

      ScrollTrigger.refresh();
    }, document.body);

    return () => ctx.revert();
  }, []);
}
