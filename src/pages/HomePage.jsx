import { useEffect } from "react";
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
  useEffect(() => {
    document.body.className = shouldSkipIntroLoader() ? "home-page intro-complete" : "home-page intro-running";
    return () => {
      document.body.className = "";
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
      <BackgroundVideo src={siteData.person.backgroundVideo} />
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
