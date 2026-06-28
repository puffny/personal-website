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
      const selectedWorkLayers = gsap.utils.toArray(".selected-work-parallax-layer");
      const selectedWorkParallaxSpeed = 0.5;
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

      selectedWorkLayers.forEach((layer) => {
        const card = layer.closest(".selected-work-card");
        const visual = layer.closest(".selected-work-visual");
        if (!card || !visual) return;

        gsap.fromTo(layer, {
          y: () =>
            -Math.max(0, layer.offsetHeight - visual.offsetHeight) *
            ((1 - selectedWorkParallaxSpeed) / 2),
        }, {
          y: () =>
            -Math.max(0, layer.offsetHeight - visual.offsetHeight) *
            ((1 + selectedWorkParallaxSpeed) / 2),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, document.body);

    return () => ctx.revert();
  }, []);
}
