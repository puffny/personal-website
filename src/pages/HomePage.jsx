import { useEffect, useLayoutEffect } from "react";
import { siteData } from "../data/siteData";
import { useContactCopy } from "../hooks/useContactCopy";
import { shouldSkipIntroLoader, useIntroLoader } from "../hooks/useIntroLoader";
import { useProjectScrollMemory } from "../hooks/useProjectScrollMemory";
import { useRevealInteractions } from "../hooks/useRevealInteractions";
import { useScrollParallax } from "../hooks/useScrollParallax";
import { useScrollEffects } from "../hooks/useScrollEffects";
import AILabSection from "../components/Home/AILabSection";
import AboutSection from "../components/Home/AboutSection";
import CoreSection from "../components/Home/CoreSection";
import FinalContactSection from "../components/Home/FinalContactSection";
import HeroSection from "../components/Home/HeroSection";
import IntroLoader from "../components/Home/IntroLoader";
import ScrollCue from "../components/Home/ScrollCue";
import SelectedWorksSection from "../components/Home/SelectedWorksSection";
import SiteNav from "../components/Home/SiteNav";
import BackgroundVideo from "../components/shared/BackgroundVideo";

export default function HomePage() {
  const shouldRestoreProjectScroll = new URLSearchParams(window.location.search).get("restoreProjectScroll") === "1";

  useLayoutEffect(() => {
    const introClassName = shouldSkipIntroLoader() ? "intro-complete" : "intro-running";
    document.body.classList.remove("project-page", "case-page", "intro-running", "intro-complete");
    document.body.classList.add("home-page", introClassName);
    if (shouldRestoreProjectScroll) {
      document.body.classList.add("page-scrolled", "nav-visible");
    }
    return () => {
      document.body.classList.remove("home-page", "intro-running", "intro-complete", "intro-content-ready", "page-scrolled", "nav-visible", "final-contact-visible");
    };
  }, []);

  useIntroLoader();
  useScrollParallax();
  useRevealInteractions();
  useScrollEffects(["home", "summary", "core", "works", "ai-lab"]);
  useProjectScrollMemory();
  useContactCopy();

  return (
    <>
      <BackgroundVideo src={siteData.person.backgroundVideo} startStatic={shouldRestoreProjectScroll} />
      <IntroLoader />
      <SiteNav />
      <ScrollCue />
      <main id="home">
        <HeroSection />
        <AboutSection />
        <CoreSection />
        <SelectedWorksSection />
        <AILabSection />
        <FinalContactSection />
      </main>
    </>
  );
}
