const nav = document.querySelector(".site-nav");
const hero = document.querySelector(".hero");
const navItems = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const navIndicator = document.querySelector(".nav-indicator");
const homeNavItem = document.querySelector(".nav-brand[href='#home']");
const homeNavIcon = homeNavItem?.querySelector("i");
const homeNavText = homeNavItem?.querySelector(".nav-text");
let hasPlayedBackToTopHint = false;

function initRevealInteractions() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = [
    ".hero-top",
    ".hero-copy",
    ".contact-grid",
    ".content-shell",
    ".content-main h2",
    ".large-copy p",
    ".work-card",
    ".project-list a",
    ".strength-card",
    ".thinking-card",
    ".ai-flow",
    ".ai-tool-grid article",
    ".final-contact",
    ".skill-group span",
    ".tool-grid span",
    ".info-columns > div",
    ".showcase-card",
  ]
    .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
    .filter((element, index, elements) => elements.indexOf(element) === index);

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-item");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 50}ms`);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px 8% 0px" }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

function initMagneticHover() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const magneticItems = Array.from(document.querySelectorAll(".pill-button, .project-list a, .strength-card, .showcase-card"));
  magneticItems.forEach((item) => {
    item.classList.add("magnetic-hover");

    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.1;
      item.style.setProperty("--magnetic-x", `${x}px`);
      item.style.setProperty("--magnetic-y", `${y}px`);
      item.style.transform = `translate3d(var(--magnetic-x), var(--magnetic-y), 0)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.removeProperty("--magnetic-x");
      item.style.removeProperty("--magnetic-y");
      item.style.transform = "";
    });
  });
}

function initProjectEdgeGlow() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const edgeGlowCards = Array.from(document.querySelectorAll(".project-list a, .strength-card"));

  edgeGlowCards.forEach((card) => {
    card.classList.add("edge-glow-card");
    card.style.setProperty("--edge-proximity", "0");
    card.style.setProperty("--cursor-angle", "45deg");
  });

  if (reduceMotion) return;

  edgeGlowCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceToEdge = Math.min(x, y, rect.width - x, rect.height - y);
      const edgeProximity = Math.max(0, Math.min(100, 100 - (distanceToEdge / 34) * 100));
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;

      card.style.setProperty("--edge-proximity", edgeProximity.toFixed(2));
      card.style.setProperty("--cursor-angle", `${angle.toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--edge-proximity", "0");
    });
  });
}

initRevealInteractions();
initMagneticHover();
initProjectEdgeGlow();
initContactCopy();

function initContactCopy() {
  const contactItems = Array.from(document.querySelectorAll(".contact-grid a, .contact-grid p"));
  if (!contactItems.length) return;

  const toast = document.createElement("div");
  toast.className = "copy-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = "已复制到剪贴板";
  document.body.appendChild(toast);

  let toastTimer;

  const showToast = () => {
    window.clearTimeout(toastTimer);
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1600);
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      showToast();
    } catch {
      fallbackCopy(text);
      showToast();
    }
  };

  contactItems.forEach((item) => {
    if (item.tagName === "P") {
      item.tabIndex = 0;
      item.setAttribute("role", "button");
    }

    const handleCopy = (event) => {
      event.preventDefault();
      copyText(item.textContent.trim().replace(/\s+/g, " "));
    };

    item.addEventListener("click", handleCopy);
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      handleCopy(event);
    });
  });
}

if (hero) {
  const updateHeroScrollState = () => {
    const isScrolled = window.scrollY > window.innerHeight * 0.3;
    const isPastHero = window.scrollY > window.innerHeight * 0.3;
    hero.classList.toggle("scrolled", isScrolled);
    document.body.classList.toggle("page-scrolled", isScrolled);
    document.body.classList.toggle("nav-visible", isPastHero);
  };

  updateHeroScrollState();
  window.addEventListener("scroll", updateHeroScrollState, { passive: true });
}

const setActiveNav = (id) => {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === `#${id}`);
  });
  updateHomeNav(id);
  moveNavIndicator();
};

function updateHomeNav(activeId) {
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
}

if (navItems.length) {
  const sections = ["home", "summary", "strengths", "skills", "ai-lab", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const updateActiveFromScroll = () => {
    const current = sections.reduce((active, section) => {
      const top = section.getBoundingClientRect().top;
      return top <= window.innerHeight * 0.48 ? section : active;
    }, sections[0]);

    if (current) setActiveNav(current.id);
  };

  updateActiveFromScroll();
  window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
}

function moveNavIndicator() {
  if (!nav || !navIndicator) return;
  const active = nav.querySelector("a.active");
  if (!active) return;

  const navRect = nav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  navIndicator.style.transform = `translate3d(${activeRect.left - navRect.left}px, 0, 0)`;
  navIndicator.style.width = `${activeRect.width}px`;
}

moveNavIndicator();
window.addEventListener("resize", moveNavIndicator);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
