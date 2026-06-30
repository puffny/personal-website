const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  assert(fs.existsSync(path.join(root, file)), `Expected ${file} to exist`);
}

function includesAll(file, fragments) {
  const source = read(file);
  for (const fragment of fragments) {
    assert(source.includes(fragment), `Expected ${file} to include: ${fragment}`);
  }
}

[
  "package.json",
  "index.html",
  "src/App.jsx",
  "src/components/shared/CustomCursor.jsx",
  "src/components/shared/CustomCursor.css",
  "src/components/Project/ProjectBackToTop.jsx",
  "src/components/Project/CaseBackLink.jsx",
  "src/pages/HomePage.jsx",
  "src/components/Home/FinalContactSection.jsx",
  "src/hooks/useSmoothScroll.js",
  "src/utils/pageScroll.js",
  "src/hooks/useScrollParallax.js",
  "src/hooks/useRevealInteractions.js",
  "styles.css",
].forEach(exists);

const packageJson = JSON.parse(read("package.json"));
assert.strictEqual(packageJson.scripts.test, "node tests/static-demo.test.js");
assert(packageJson.dependencies.lenis, "Expected Lenis dependency for inertial smooth scrolling");
assert(packageJson.dependencies.gsap, "Expected GSAP dependency for scroll-linked parallax");

includesAll("src/hooks/useSmoothScroll.js", [
  "lenis.on(\"scroll\", updateScrollTriggers)",
  "ScrollTrigger.update()",
  "shouldUseNativeScroll",
  "window.matchMedia(\"(max-width: 760px)\").matches",
  "if (reduceMotion || shouldUseNativeScroll)",
  "gsap.ticker.add(raf)",
  "lenis.raf(time * 1000)",
  "gsap.ticker.lagSmoothing(0)",
  "ScrollTrigger.refresh()",
  "window.__liangPortfolioLenis = lenis",
  "delete window.__liangPortfolioLenis",
  "document.fonts?.ready",
  "window.addEventListener(\"resize\", refreshScrollTriggersAfterResize)",
  "window.setTimeout(refreshScrollTriggers, 150)",
  "cancelAnimationFrame(initialRefreshFrame)",
  "window.clearTimeout(resizeTimer)",
  "gsap.ticker.remove(raf)",
]);

assert(!read("styles.css").includes("scroll-behavior: smooth;"), "Lenis should not conflict with native smooth scrolling");

includesAll("src/pages/HomePage.jsx", [
  "useScrollParallax",
  "useScrollParallax();",
  "FinalContactSection",
  "<FinalContactSection />",
]);

assert(!read("src/pages/HomePage.jsx").includes("useEndingReveal"), "Ending reveal hook should be removed after rollback");
assert(!read("src/pages/HomePage.jsx").includes("main-layer"), "Home content should not be wrapped in ending reveal layers after rollback");
assert(!read("src/pages/HomePage.jsx").includes("void ToolMarquee"), "HomePage should not keep the old ToolMarquee preservation stub");
assert(!read("src/pages/HomePage.jsx").includes("{ ToolMarquee }"), "HomePage should not import ToolMarquee when AboutSection owns it");
assert(read("src/components/Home/AboutSection.jsx").includes("<ToolMarquee />"), "AboutSection should continue rendering ToolMarquee internally");

includesAll("src/App.jsx", [
  "CustomCursor",
  "./components/shared/CustomCursor",
  "./components/shared/CustomCursor.css",
  "progressive-bottom-blur",
  "progressive-bottom-blur-layer",
  "aria-hidden=\"true\"",
]);

includesAll("src/App.jsx", [
  "if (event.defaultPrevented) return;",
  "const shouldRestoreProjectScroll = nextUrl.searchParams.get(\"restoreProjectScroll\") === \"1\";",
  "scrollPageToTop",
  "if (!shouldRestoreProjectScroll && !nextUrl.hash) scrollPageToTop",
]);

assert(!read("src/App.jsx").includes("document.startViewTransition"), "Project navigation should use a simple fade instead of View Transition shared-element motion");
assert(!read("src/App.jsx").includes("flushSync"), "Simple project navigation should not need forced synchronous route transitions");

includesAll("src/pages/ProjectPage.jsx", [
  "CaseBackLink",
  "ProjectBackToTop",
  "{isVisualCase ? <CaseBackLink onBack={handleCaseBack} /> : null}",
  "<ProjectBackToTop variant={project.type === \"feed\" ? \"feed\" : undefined} />",
]);

includesAll("src/components/Project/CaseBackLink.jsx", [
  "case-back-link",
  "href=\"/?restoreProjectScroll=1\"",
  "ph-fill ph-caret-left",
]);

assert(!read("src/components/Project/SenbenProject.jsx").includes("case-back-link"), "Senben case back link should live at the page overlay level, not inside senben main content");
assert(!read("src/components/Project/CaseProject.jsx").includes("case-back-link"), "Visual case back link should live at the page overlay level, not inside case main content");
assert(!read("src/components/Project/ProjectImageFeed.jsx").includes("case-back-link"), "Feed case back link should live at the page overlay level, not inside feed main content");

includesAll("src/components/Project/ProjectBackToTop.jsx", [
  "SHOW_AFTER_Y = 120",
  "project-back-to-top",
  "ph-fill ph-arrow-fat-line-up",
  "scrollPageToTop({ smooth: true })",
]);

includesAll("src/utils/pageScroll.js", [
  "window.__liangPortfolioLenis",
  "lenis.reset?.()",
  "lenis.scrollTo(y, { immediate: true, force: true })",
  "scrollPageToTop",
  "window.scrollTo({ top: y, left: 0, behavior: \"auto\" })",
]);

includesAll("src/components/shared/CustomCursor.jsx", [
  "useEffect",
  "useRef",
  "window.matchMedia(\"(pointer: fine) and (hover: hover)\")",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "custom-cursor",
  "custom-cursor--pressed",
  "custom-cursor--native",
  ".selected-work-visual-link",
  ".final-contact-list p",
  "custom-cursor-ripple",
  "animationend",
  "addEventListener(\"pointermove\"",
  "addEventListener(\"pointerdown\"",
  "addEventListener(\"pointerup\"",
  "removeEventListener(\"pointermove\"",
  "removeEventListener(\"pointerdown\"",
  "removeEventListener(\"pointerup\"",
]);

includesAll("src/components/shared/CustomCursor.css", [
  "@media (pointer: fine) and (hover: hover)",
  "cursor: none;",
  ".custom-cursor",
  "position: fixed;",
  "width: 18px;",
  "height: 18px;",
  "background: #fff;",
  "box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);",
  ".custom-cursor--visible",
  "opacity: 0.9;",
  "pointer-events: none;",
  ".custom-cursor--pressed",
  "width: 9px;",
  "height: 9px;",
  ".selected-work-visual-link",
  ".final-contact-list p",
  "cursor: pointer;",
  ".custom-cursor--native",
  "background-color 180ms ease",
  ".custom-cursor-ripple",
  "width: 32px;",
  "height: 32px;",
  "border: 1px solid rgba(255, 255, 255, 0.78);",
  "box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.22), 0 4px 14px rgba(0, 0, 0, 0.24);",
  "animation: customCursorRipple 520ms",
  "@keyframes customCursorRipple",
  "scale(1.8)",
]);

assert(!read("src/components/shared/CustomCursor.css").includes("mix-blend-mode"), "Custom cursor should use stable color styling instead of blend-mode inversion");
assert(!read("src/components/shared/CustomCursor.css").includes("border: 1px solid rgba(0, 0, 0, 0.28);"), "Custom cursor dot should not use a visible outline");

includesAll("src/components/Home/SelectedWorksSection.jsx", [
  "className=\"selected-work-card\"",
  "className=\"selected-work-visual-link\"",
  "href={`/project/${work.slug}`}",
  "aria-label={`View ${title} project`}",
  "<div className=\"selected-work-copy\">",
]);

const selectedWorksBlock = read("src/data/siteData.js").match(/selectedWorks:\s*{[\s\S]*?\n  aiLab:/)?.[0] || "";
const selectedWorkSlugOrder = [...selectedWorksBlock.matchAll(/slug: "(tianmu|baozhang|senben)"/g)].map(
  ([, slug]) => slug,
);
assert.deepStrictEqual(
  selectedWorkSlugOrder,
  ["tianmu", "baozhang", "senben"],
  "Homepage selected work order should be tianmu -> baozhang -> senben",
);

assert(
  !read("src/components/Home/SelectedWorksSection.jsx").includes("<a className=\"selected-work-card\""),
  "Selected work cards should not be full-card links; only thumbnails should navigate",
);

includesAll("src/hooks/useProjectScrollMemory.js", [
  "document.querySelectorAll(\".selected-project, .selected-work-visual-link\")",
  "cancelRestoreProjectScroll();",
  "jumpToPageY(savedScrollY)",
  "window.location.pathname !== \"/\"",
  "cancelAnimationFrame(frameId)",
  "window.clearTimeout(timerId)",
]);

assert.strictEqual(
  (read("src/App.jsx").match(/progressive-bottom-blur-layer/g) || []).length,
  8,
  "Expected the progressive bottom blur to use eight blur layers",
);

includesAll("src/hooks/useScrollParallax.js", [
  "gsap",
  "ScrollTrigger",
  "prefers-reduced-motion: reduce",
  ".page-bg",
  ".hero-photo",
  "gsap.context",
  "ctx.revert",
  "scrub: 0.18",
  "selectedWorkParallaxSpeed = 0.5",
  "(1 - selectedWorkParallaxSpeed) / 2",
  "(1 + selectedWorkParallaxSpeed) / 2",
]);

includesAll("styles.css", [
  "scrollbar-width: none;",
  "::-webkit-scrollbar",
  "display: none;",
  "--parallax-bg-scale",
  "--parallax-photo-y",
  "var(--parallax-bg-scale)",
  "var(--parallax-photo-y)",
  ".content-shell.reveal-item",
  ".progressive-bottom-blur",
  "height: 40px;",
  "transition: opacity 0.75s ease;",
  "pointer-events: none;",
  ".progressive-bottom-blur-layer",
  ".progressive-bottom-blur-layer:nth-child(8)",
  "backdrop-filter: blur(3px) saturate(1.04)",
  "background: rgba(255, 255, 255, 0.001);",
  "mask-image: linear-gradient(to bottom, transparent 52%, #000 76%, #000 100%);",
]);

includesAll("styles.css", [
  ".project-back-to-top",
  ".project-back-to-top.is-visible",
  ".case-back-link",
  "z-index: 80;",
  "right: max(34px, calc((100vw - var(--max)) / 2));",
  "bottom: clamp(18px, 3vw, 34px);",
]);

includesAll("styles.css", [
  ".project-page main,",
  ".case-page main",
  "animation: projectPageFadeIn 1s cubic-bezier(0.22, 1, 0.36, 1) both;",
  "@keyframes projectPageFadeIn",
]);

const projectPageFadeInBlock = read("styles.css").match(/@keyframes projectPageFadeIn\s*{[\s\S]*?\n}/)?.[0] || "";
assert(projectPageFadeInBlock && !projectPageFadeInBlock.includes("transform:"), "Project page fade-in should not transform main because fixed buttons must stay viewport-fixed");

assert(!read("styles.css").includes("::view-transition"), "Project transition CSS should not use View Transition pseudo-elements");
assert(!read("styles.css").includes("view-transition-name"), "Project transition CSS should not use shared-element transition names");

assert(!read("styles.css").includes(".progressive-bottom-blur::after"), "Bottom blur should not add a darkening gradient overlay");
assert(!read("styles.css").includes("rgba(5, 5, 5, 0.48)"), "Bottom blur should not use a black gradient");
assert(!read("styles.css").includes("rgba(5, 5, 5, 0.06)"), "Bottom blur layers should not darken the page");

assert(!read("src/hooks/useScrollParallax.js").includes("--parallax-bg-y"), "Background parallax should scale without vertical travel");
assert(!read("src/hooks/useScrollParallax.js").includes("--parallax-copy-y"), "Hero title should keep its original scroll behavior");
assert(!read("styles.css").includes("var(--parallax-copy-scale)"), "Hero title should not shrink during scroll");
assert(!read("styles.css").includes("var(--parallax-copy-opacity)"), "Hero title should not fade during scroll");
assert(read("src/hooks/useScrollEffects.js").includes("window.innerHeight * 0.3"), "Background blur should use the previous hero scroll threshold");
assert(read("styles.css").includes("transform 0.8s ease"), "Background scale should keep the previous eased transition");
assert(!read("src/hooks/useScrollParallax.js").includes("gsap.utils.toArray(\".content-shell\")"), "Content sections should not keep scroll-chasing parallax");
assert(!read("styles.css").includes("--parallax-section-scale"), "Content sections should not scale during scroll");
assert(!read("styles.css").includes("var(--parallax-section-y)"), "Content sections should not drift during scroll");
assert(!read("styles.css").includes(".home-page.final-contact-visible .page-bg"), "Final page should keep the scrolled background blur and mask");
assert(!read("styles.css").includes(".final-contact-visible .progressive-bottom-blur"), "Final page should keep the bottom blur overlay");

includesAll("src/hooks/useRevealInteractions.js", [
  "reveal-heading",
  "reveal-copy",
  "reveal-stat",
  "reveal-step",
  "--reveal-drift-x",
  "--reveal-drift-y",
  ".selected-work-result",
  ".selected-work-copy > p, .selected-work-result",
  "sortRevealTargets",
  "getBoundingClientRect",
  "rectA.top",
  "rectA.left",
  "Math.min(index * 70, 420)",
  "observer?.disconnect();",
]);

includesAll("src/hooks/useIntroLoader.js", [
  "introContentReadyLeadMs = 1000",
  "const completeIntroState =",
  "const markIntroContentReady =",
  "document.body.classList.remove(\"intro-running\")",
  "document.body.classList.add(\"intro-complete\")",
  "document.body.classList.add(\"intro-content-ready\")",
  "revealDuration - introContentReadyLeadMs",
  "completeIntroState();",
  "if (!introLoader || !introPercent || !introIcon || !introLoaderLine)",
  "introIconChangeIntervalMs = 680",
  "introIconTransitionMs = 560",
  "introIcon.querySelectorAll(\".intro-ui-icon-glyph\")",
  "nextIcon.className = \"intro-ui-icon-glyph\"",
  "Math.floor(elapsed / introIconChangeIntervalMs)",
  "let contentReadyTimer = 0;",
  "window.clearTimeout(iconCleanupTimer);",
  "let removeTimer = 0;",
  "window.clearTimeout(contentReadyTimer);",
  "window.clearTimeout(removeTimer);",
]);

[
  /\.intro-ui-icon-glyph\s*{[\s\S]*?animation: introIconReveal 0\.68s cubic-bezier\(0\.22, 1, 0\.36, 1\) forwards;[\s\S]*?\n}/,
  /\.intro-ui-icon-glyph\.is-exiting\s*{[\s\S]*?animation: introIconExit 0\.56s cubic-bezier\(0\.22, 1, 0\.36, 1\) forwards;[\s\S]*?\n}/,
  /@keyframes introIconReveal\s*{[\s\S]*?filter: blur\(0\);[\s\S]*?\n}/,
  /@keyframes introIconExit\s*{[\s\S]*?filter: blur\(4px\);[\s\S]*?\n}/,
].forEach((pattern) => {
  const block = read("styles.css").match(pattern)?.[0] || "";
  assert(block, "Intro icon reveal/exit animation should be present");
});

assert(!read("src/hooks/useRevealInteractions.js").includes("index % 6"), "Reveal delay should not loop and make lower items animate before higher items");
assert(!read("src/hooks/useRevealInteractions.js").includes("driftDirection"), "Reveal should not alternate left/right entry direction");
assert(read("src/hooks/useRevealInteractions.js").includes("!element.closest(\"#ai-lab\")"), "AI Lab should not receive reveal transforms because it uses ScrollTrigger pin");
assert(read("src/hooks/useRevealInteractions.js").includes("!element.closest(\".final-contact-section\")"), "Final contact section should not receive global reveal transforms");
assert(read("src/hooks/useRevealInteractions.js").includes("element.matches(\"#core .content-main h2\")"), "Core title should remain in reveal transforms while core body stays excluded");
assert(!read("src/hooks/useRevealInteractions.js").includes("\".hero-top\""), "Hero top should be controlled by intro animation, not scroll reveal");
assert(!read("src/hooks/useRevealInteractions.js").includes("\".hero-copy\""), "Hero copy should be controlled by intro animation, not scroll reveal");
assert(!read("src/hooks/useRevealInteractions.js").includes("\".contact-grid\""), "Hero contact should be controlled by intro animation, not scroll reveal");
assert(!read("src/hooks/useRevealInteractions.js").includes("\".final-contact\""), "Final THANKS section should not use global scroll reveal");
includesAll("src/components/Home/HeroSection.jsx", [
  "heroCopyRevealDelayMs",
  "window.setTimeout(() => setIntroReady(true), heroCopyRevealDelayMs)",
  "intro-content-ready",
  "triggerOnScroll={false}",
]);
assert(!read("styles.css").includes("introUxViewportTest"), "Unused introUxViewportTest keyframes should be removed");

includesAll("src/components/shared/TextPressure.jsx", [
  "debouncedSetSize.cancel?.();",
  "return () => {",
  "window.removeEventListener(\"resize\", debouncedSetSize)",
]);

includesAll("src/hooks/useContactCopy.js", [
  ".final-contact-list p",
  "已复制",
  "navigator.clipboard.writeText",
  "role\", \"button",
  "keydown",
]);

includesAll("styles.css", [
  ".reveal-heading",
  ".reveal-heading.is-visible",
  ".reveal-copy",
  ".reveal-stat",
  ".reveal-step",
  "var(--reveal-drift-x)",
  "var(--reveal-drift-y)",
  "1.2s cubic-bezier(0.22, 1, 0.36, 1)",
  "#ai-lab.reveal-item",
  "transform: none;",
]);

const revealItemBlock = read("styles.css").match(/\.reveal-item\s*{[\s\S]*?\n}/)?.[0] || "";
const revealVisibleBlock = read("styles.css").match(/\.reveal-item\.is-visible\s*{[\s\S]*?\n}/)?.[0] || "";
assert(!revealItemBlock.includes("filter:"), "Global reveal should no longer animate blur in its initial state");
assert(!revealVisibleBlock.includes("filter:"), "Global reveal should no longer animate blur in its visible state");

includesAll("styles.css", [
  ".hero-copy",
  "top: clamp(210px, calc(50svh - 10px), 340px);",
  ".hero h1",
  "0 4px 12px rgba(0, 0, 0, 0.16)",
  ".hero-subtitle",
  "font-weight: 500;",
  "0 3px 10px rgba(0, 0, 0, 0.16)",
  ".hero-scope-note p",
  "text-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);",
]);

includesAll("src/hooks/useIntroLoader.js", [
  "document.querySelector(\".page-bg-video\")",
  "videoReady",
  "maxWaitingProgress = 0.98",
  "loadeddata",
  "canplay",
  "introPanelExitMs = 680",
  "introRevealDelayMs = 620",
  "introLoader.classList.add(\"is-loading-complete\")",
  "introLoader.classList.add(\"is-revealing\")",
]);

includesAll("styles.css", [
  ".intro-loader.is-loading-complete .intro-loader-panel",
  ".intro-loader.is-revealing .intro-black-cover",
  ".intro-loader.is-revealing .intro-ux-scale",
  ".intro-loader:not(.is-revealing) .intro-black-cover",
]);

assert(!read("src/hooks/useSmoothScroll.js").includes("pointer: coarse"), "Desktop Lenis should not be disabled just because a device exposes a coarse pointer");
assert(!read("src/hooks/useSmoothScroll.js").includes("hover: none"), "Desktop Lenis should not be disabled just because hover is unavailable");

assert(!read("src/hooks/useRevealInteractions.js").includes("--reveal-scale"), "Layered reveal should not scale content modules");
assert(!read("styles.css").includes("scale(var(--reveal-scale)"), "Reveal transform should not scale content modules");
assert(!read("styles.css").includes("var(--reveal-scale) *"), "Parallax/reveal composition should not scale content modules");

includesAll("src/components/Home/CoreSection.jsx", [
  "gsap",
  "ScrollTrigger",
  "gsap.context",
  "desktopQuery",
  "isStaticLayout",
  "trigger: section",
  "start: \"top 50%\"",
  "end: \"bottom 70%\"",
  "--core-progress",
  "core-progress-bar",
  "<div className=\"core-slide-track\">",
  "aria-hidden={!isStaticLayout && !isActive}",
]);

includesAll("styles.css", [
  "--core-progress",
  "min-height: 170vh;",
  ".core-pin-frame",
  "position: sticky;",
  "top: calc(16vh - 70px);",
  "min-height: min(420px, 60vh);",
  "grid-template-columns: minmax(0, 1fr) minmax(500px, 1fr);",
  "gap: clamp(0px, 0vw, 120px);",
  ".core-progress-bar",
  ".core-progress-bar span",
  ".core-slide-track::before",
  "grid-template-columns: 1fr;",
  "width: 100%;",
  "max-width: 100%;",
  ".selected-works-section",
  "padding-top: 152px;",
]);

includesAll("src/data/siteData.js", [
  "slug: \"senben\"",
  "image: \"/assets/figma-project-senben.webp\"",
]);

includesAll("src/data/siteData.js", [
  "email: \"305896796@qq.com\"",
  "phone: \"130 1766 2166\"",
  "location: \"ZhengZhou，China\"",
  "website: \"puffny.cn\"",
]);

assert(!read("src/components/Home/CoreSection.jsx").includes("item.labels.map"), "Core sticky story should return to the previous slide content");
assert(!read("src/components/Home/CoreSection.jsx").includes("--core-local-progress"), "Core slides should not use local scroll drift");
assert(!read("styles.css").includes(".core-sticky-stage::before"), "Core ambient layer should be removed");
assert(!read("styles.css").includes(".core-slide-labels"), "Core labels should be removed");
assert(!read("styles.css").includes("--core-copy-shift"), "Core copy should use the previous transition");
assert(!read("styles.css").includes("--core-visual-shift"), "Core visual should use the previous transition");

includesAll("src/data/siteData.js", ["Figma，Lovart"]);

includesAll("src/components/Home/AILabSection.jsx", [
  "useRef",
  "ScrollTrigger",
  "const isNarrow = window.matchMedia(\"(max-width: 760px)\").matches;",
  "let revealObserver;",
  "ai-lab-title-group",
  "ai-lab-copy-group",
  "ai-lab-image-group",
  "ai-lab-sticky-stage",
  "ai-lab-content",
  "ai-lab-intro-group",
  "ai-lab-stage",
  "ai-lab-timeline-track",
  "ai-lab-timeline-fill",
  "ai-lab-sequence-item",
  "ai-lab-sequence-layer",
  "gsap.timeline",
  "mobileReveal",
  "IntersectionObserver",
  "titleGroup",
  "copyGroup",
  "imageGroup",
  "start: \"top 70%\"",
  "end: \"+=1600\"",
  "invalidateOnRefresh: true",
  "scrub: 1",
  "ScrollTrigger.refresh()",
  "revealObserver?.disconnect();",
]);

assert(!read("src/hooks/useRevealInteractions.js").includes("\".ai-lab-visual\""), "AI Lab visual should be controlled by its own ScrollTrigger sequence");
assert(!read("src/components/Home/AILabSection.jsx").includes("sequenceLayers[index]"), "AI Lab pinned stage should not animate individual image layers in sequence");
assert(!read("src/components/Home/AILabSection.jsx").includes("imagePerformanceTargets"), "AI Lab pinned stage should not move the whole image group after it settles");
assert(!read("src/components/Home/AILabSection.jsx").includes("autoAlpha"), "AI Lab should use opacity without old autoAlpha timeline remnants");
assert(!read("src/components/Home/AILabSection.jsx").includes("filter:"), "AI Lab JS should not animate blur");
const aiLabStepBlock = read("styles.css").match(/\.ai-lab-step\s*{[\s\S]*?\n}/)?.[0] || "";
const aiLabLayerBlock = read("styles.css").match(/\.ai-lab-layer\s*{[\s\S]*?\n}/)?.[0] || "";
const mobileStylesBlock = read("styles.css").match(/@media \(max-width: 760px\)\s*{[\s\S]*?\n}\s*$/)?.[0] || "";
assert(!aiLabStepBlock.includes("filter:"), "AI Lab step CSS should no longer apply blur");
assert(!aiLabStepBlock.includes("will-change: opacity, transform, filter;"), "AI Lab step CSS should not reserve filter animation");
assert(!aiLabLayerBlock.includes("filter:"), "AI Lab image layer CSS should no longer apply blur");
assert(!aiLabLayerBlock.includes("will-change: opacity, transform, filter;"), "AI Lab image layer CSS should not reserve filter animation");
const aiLabStickyMobileBlock = mobileStylesBlock.match(/\.ai-lab-sticky-stage\s*{[\s\S]*?\n  }/)?.[0] || "";
assert(
  aiLabStickyMobileBlock.includes("position: relative;") &&
    aiLabStickyMobileBlock.includes("top: auto;") &&
    aiLabStickyMobileBlock.includes("height: auto;"),
  "AI Lab mobile should stay in normal document flow",
);
assert(!read("styles.css").includes(".ai-lab-layer {\n  position: absolute;\n  display: block;\n  width: var(--layer-width);\n  height: var(--layer-height);\n  left: var(--layer-left);\n  bottom: 8px;\n  object-fit: cover;"), "AI Lab image layers should use contain to avoid cropping");
const aiLabLayer2MobileBlock = mobileStylesBlock.match(/\.ai-lab-layer-2\s*{[\s\S]*?\n  }/)?.[0] || "";
const aiLabLayer3MobileBlock = mobileStylesBlock.match(/\.ai-lab-layer-3\s*{[\s\S]*?\n  }/)?.[0] || "";
assert(aiLabLayer2MobileBlock.includes("z-index: 2;"), "AI Lab mobile second image should sit below the third image");
assert(aiLabLayer3MobileBlock.includes("z-index: 3;"), "AI Lab mobile third image should cover the second image");

includesAll("styles.css", [
  ".ai-lab-section",
  "padding-top: 0;",
  "min-height: auto;",
  ".ai-lab-sticky-stage",
  "position: sticky;",
  "top: -5%;",
  "padding: clamp(112px, 14vh, 200px) 0 clamp(28px, 4vh, 52px);",
  ".ai-lab-content",
  "width: min(var(--max), calc(100% - 96px));",
  ".ai-lab-title-group",
  ".ai-lab-copy-group",
  "border-bottom: 1px solid var(--line);",
  ".ai-lab-image-group",
  ".ai-lab-stage",
  "margin-top: clamp(18px, 2.6vh, 32px);",
  ".ai-lab-timeline",
  ".ai-lab-timeline-track",
  ".ai-lab-timeline-fill",
  "grid-template-columns: repeat(5, minmax(0, 1fr));",
  ".ai-lab-step > div:first-of-type",
  ".ai-lab-tool",
  "margin-left: 0;",
  "bottom: 8px;",
  ".ai-lab-sequence-item",
  ".ai-lab-sequence-layer",
  "object-fit: contain;",
  "width: 80%;",
  "aspect-ratio: 602 / 545;",
]);

includesAll("src/components/Home/FinalContactSection.jsx", [
  "useEffect",
  "useRef",
  "gsap",
  "ScrollTrigger",
  "TextPressure",
  "final-contact-section",
  "final-contact-container",
  "final-thanks",
  "THANKS",
  "flex",
  "minFontSize={96}",
  "final-contact-list",
  "final-copyright",
  "contactItems.map",
  "contact.copyright",
  "finalThanks",
  "finalContactList",
  "gsap.timeline",
  "getRevealOffset",
  "--final-reveal-container-y",
  "--final-reveal-thanks-y",
  "--final-reveal-contact-y",
  "trigger: section",
  "start: \"top bottom\"",
  "footerRevealEnd",
  "bottom 105%",
  "bottom bottom",
]);

assert(!read("src/pages/HomePage.jsx").includes("final-transition"), "Final Contact should not use the local final transition wrapper after rollback");

includesAll("src/components/shared/TextPressure.jsx", [
  "fontVariationSettings",
  "mousemove",
  "touchmove",
  "Roboto Flex",
  "/vendor/fonts/roboto-flex/roboto-flex.css",
  "@import url('${fontUrl}')",
  "text-pressure-title",
  "data-char",
  "spansRef.current[index]",
]);

includesAll("index.html", [
  "/vendor/fonts/albert-sans/albert-sans.css",
  "/vendor/phosphor/phosphor-regular.css",
  "/vendor/phosphor/phosphor-fill.css",
]);

assert(!read("index.html").includes("fonts.googleapis.com"), "Index should load Albert Sans from local vendor assets");
assert(!read("index.html").includes("cdn.jsdelivr.net/npm/@phosphor-icons"), "Index should load Phosphor icons from local vendor assets");

includesAll("src/hooks/useScrollEffects.js", [
  "finalContactSection",
  "finalContactTop",
  "isFinalContactVisible",
  "final-contact-visible",
  "window.innerHeight * 0.52",
]);

includesAll("styles.css", [
  ".final-contact-section",
  "height: 60svh;",
  "width: 100%;",
  "overflow: hidden;",
  "border-top: 0;",
  ".final-contact-container",
  "height: 60svh;",
  "--final-reveal-container-y: -120;",
  "--final-reveal-thanks-y: 0;",
  "--final-reveal-contact-y: 0;",
  "will-change: transform;",
  ".final-contact",
  "height: 100%;",
  "align-content: start;",
  ".final-thanks",
  "width: min(800px, 88vw);",
  "aspect-ratio: 634 / 200;",
  ".text-pressure-title",
  "grid-template-rows: auto auto minmax(0, 1fr) auto;",
  ".final-contact-list",
  "align-self: start;",
  "will-change: transform;",
  "border-left: 4px solid var(--accent);",
  "width: fit-content;",
  "cursor: pointer;",
  ".final-contact-list p:hover",
  ".final-copyright",
  "grid-row: 4;",
  "font-size: 11px;",
  "align-self: end;",
]);

const mobileFinalContactSectionBlock = read("styles.css").match(/\.final-contact-section\s*{[\s\S]*?max-width: none;[\s\S]*?min-height: 0;[\s\S]*?\n  }/)?.[0] || "";
assert(
  mobileFinalContactSectionBlock.includes("width: 100%;") &&
    mobileFinalContactSectionBlock.includes("max-width: none;") &&
    mobileFinalContactSectionBlock.includes("margin: 0;") &&
    mobileFinalContactSectionBlock.includes("height: auto;") &&
    mobileFinalContactSectionBlock.includes("min-height: 0;") &&
    mobileFinalContactSectionBlock.includes("--final-reveal-container-y: -24;") &&
    mobileFinalContactSectionBlock.includes("isolation: isolate;"),
  "Final contact section should fill the viewport width on mobile while letting content define height",
);

assert(!read("styles.css").includes(".final-thanks .text-pressure-char:last-child"), "Final THANKS period should render as text, not a yellow square");
