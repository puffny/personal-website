import { useEffect } from "react";

export function useScrollEffects(activeSectionIds = ["home", "summary"]) {
  useEffect(() => {
    const nav = document.querySelector(".site-nav");
    const hero = document.querySelector(".hero");
    const navItems = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
    const navIndicator = document.querySelector(".nav-indicator");
    const homeNavItem = document.querySelector(".nav-brand[href='#home']");
    const homeNavIcon = homeNavItem?.querySelector("i");
    const homeNavText = homeNavItem?.querySelector(".nav-text");
    const finalContactSection = document.querySelector(".final-contact-section");
    const pageBg = document.querySelector(".page-bg");
    const pageBgVideo = document.querySelector(".page-bg-video");
    const sections = activeSectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    let hasPlayedBackToTopHint = false;
    let wasScrolled = document.body.classList.contains("page-scrolled");
    const shouldRestoreProjectScroll = new URLSearchParams(window.location.search).get("restoreProjectScroll") === "1";
    let isRestoringProjectScroll = shouldRestoreProjectScroll;

    const getActualScrolledState = () => {
      return window.scrollY > window.innerHeight * 0.3;
    };

    const moveNavIndicator = () => {
      if (!nav || !navIndicator) return;
      const active = nav.querySelector("a.active");
      if (!active) return;

      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      navIndicator.style.transform = `translate3d(${activeRect.left - navRect.left}px, 0, 0)`;
      navIndicator.style.width = `${activeRect.width}px`;
    };

    const updateHomeNav = (activeId) => {
      if (!homeNavItem || !homeNavIcon || !homeNavText) return;
      const isHome = activeId === "home";
      homeNavIcon.className = isHome ? "ph-fill ph-house" : "ph-fill ph-arrow-fat-line-up";
      homeNavText.textContent = isHome ? "首页" : "回到首页";
      homeNavItem.setAttribute("aria-label", isHome ? "首页" : "回到首页");

      if (!isHome && !hasPlayedBackToTopHint) {
        hasPlayedBackToTopHint = true;
        homeNavItem.classList.remove("back-to-top-hint");
        void homeNavItem.offsetWidth;
        homeNavItem.classList.add("back-to-top-hint");
      }
    };

    const setActiveNav = (id) => {
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${id}`);
      });
      updateHomeNav(id);
      moveNavIndicator();
    };

    const updateHeroScrollState = () => {
      if (!hero) return;
      const actualScrolled = getActualScrolledState();
      const isScrolled = actualScrolled || isRestoringProjectScroll;
      const isPastHero = isScrolled;
      const finalContactTop = finalContactSection?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const isFinalContactVisible = finalContactTop <= window.innerHeight * 0.52;
      hero.classList.toggle("scrolled", isScrolled);
      document.body.classList.toggle("page-scrolled", isScrolled);
      document.body.classList.toggle("final-contact-visible", isFinalContactVisible);
      document.body.classList.toggle("nav-visible", isPastHero);

      if (pageBgVideo) {
        const returnedToHero = wasScrolled && !isScrolled;
        if (isScrolled && !pageBgVideo.paused) {
          pageBgVideo.pause();
        } else if (!isScrolled) {
          if (returnedToHero) {
            pageBg?.classList.remove("page-bg-start-static");
            pageBgVideo.currentTime = 0;
          }
          if (returnedToHero || pageBgVideo.paused) {
            pageBgVideo.play().catch(() => {});
          }
        }
      }
      wasScrolled = isScrolled;
      if (isRestoringProjectScroll && actualScrolled) {
        isRestoringProjectScroll = false;
      }
    };

    const updateActiveFromScroll = () => {
      if (!sections.length) return;
      const current = sections.reduce((active, section) => {
        const top = section.getBoundingClientRect().top;
        return top <= window.innerHeight * 0.48 ? section : active;
      }, sections[0]);

      if (current) setActiveNav(current.id);
    };

    const handleAnchorClick = (event) => {
      const link = event.currentTarget;
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchorLinks.forEach((link) => link.addEventListener("click", handleAnchorClick));

    updateHeroScrollState();
    updateActiveFromScroll();
    moveNavIndicator();
    window.addEventListener("scroll", updateHeroScrollState, { passive: true });
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", moveNavIndicator);

    return () => {
      anchorLinks.forEach((link) => link.removeEventListener("click", handleAnchorClick));
      window.removeEventListener("scroll", updateHeroScrollState);
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", moveNavIndicator);
    };
  }, [activeSectionIds]);
}
