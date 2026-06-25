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
  "src/pages/HomePage.jsx",
  "src/components/Home/FinalContactSection.jsx",
  "src/hooks/useSmoothScroll.js",
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
  "gsap.ticker.add(raf)",
  "lenis.raf(time * 1000)",
  "gsap.ticker.lagSmoothing(0)",
  "ScrollTrigger.refresh()",
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

assert(
  !read("src/components/Home/SelectedWorksSection.jsx").includes("<a className=\"selected-work-card\""),
  "Selected work cards should not be full-card links; only thumbnails should navigate",
);

includesAll("src/hooks/useProjectScrollMemory.js", [
  "document.querySelectorAll(\".selected-project, .selected-work-visual-link\")",
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
  "backdrop-filter: blur(24px)",
  "background: rgba(255, 255, 255, 0.001);",
  "mask-image: linear-gradient(to bottom, transparent 52%, #000 76%, #000 100%);",
]);

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
  "const completeIntroState =",
  "document.body.classList.remove(\"intro-running\")",
  "document.body.classList.add(\"intro-complete\")",
  "completeIntroState();",
  "if (!introLoader || !introPercent || !introIcon || !introLoaderLine)",
  "let removeTimer = 0;",
  "window.clearTimeout(removeTimer);",
]);

[
  /\.home-page\.intro-running \.hero-top,[\s\S]*?\.home-page\.intro-running \.contact-grid\s*{[\s\S]*?\n}/,
  /\.home-page\.intro-complete \.hero-top,[\s\S]*?\.home-page\.intro-complete \.contact-grid\s*{[\s\S]*?\n}/,
  /@keyframes introContentRise\s*{[\s\S]*?\n}/,
  /@keyframes introContactRise\s*{[\s\S]*?\n}/,
].forEach((pattern) => {
  const block = read("styles.css").match(pattern)?.[0] || "";
  assert(block && !block.includes("filter:"), "Intro entrance animation should no longer use blur filters");
});

assert(!read("src/hooks/useRevealInteractions.js").includes("index % 6"), "Reveal delay should not loop and make lower items animate before higher items");
assert(!read("src/hooks/useRevealInteractions.js").includes("driftDirection"), "Reveal should not alternate left/right entry direction");
assert(read("src/hooks/useRevealInteractions.js").includes("!element.closest(\"#ai-lab\")"), "AI Lab should not receive reveal transforms because it uses ScrollTrigger pin");
assert(!read("src/hooks/useRevealInteractions.js").includes("\".hero-top\""), "Hero top should be controlled by intro animation, not scroll reveal");
assert(!read("src/hooks/useRevealInteractions.js").includes("\".hero-copy\""), "Hero copy should be controlled by intro animation, not scroll reveal");
assert(!read("src/hooks/useRevealInteractions.js").includes("\".contact-grid\""), "Hero contact should be controlled by intro animation, not scroll reveal");
assert(!read("styles.css").includes("introUxViewportTest"), "Unused introUxViewportTest keyframes should be removed");

includesAll("src/components/shared/TextPressure.jsx", [
  "debouncedSetSize.cancel?.();",
  "return () => {",
  "window.removeEventListener(\"resize\", debouncedSetSize)",
]);

includesAll("styles.css", [
  ".reveal-heading",
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
  "top: clamp(210px, calc(50svh - 10px), 400px);",
]);

assert(!read("src/hooks/useRevealInteractions.js").includes("--reveal-scale"), "Layered reveal should not scale content modules");
assert(!read("styles.css").includes("scale(var(--reveal-scale)"), "Reveal transform should not scale content modules");
assert(!read("styles.css").includes("var(--reveal-scale) *"), "Parallax/reveal composition should not scale content modules");

includesAll("src/components/Home/CoreSection.jsx", [
  "gsap",
  "ScrollTrigger",
  "gsap.context",
  "trigger: section",
  "start: \"top 70%\"",
  "end: \"bottom 30%\"",
  "--core-progress",
  "core-progress-bar",
  "<div className=\"core-slide-track\">",
]);

includesAll("styles.css", [
  "--core-progress",
  "min-height: 170vh;",
  ".core-pin-frame",
  "position: sticky;",
  "top: calc(18vh - 20px);",
  "margin-bottom: 48px;",
  "min-height: min(420px, 40vh);",
  ".core-progress-bar",
  ".core-progress-bar span",
  ".selected-works-section",
  "padding-top: 152px;",
  "margin-top: 120px;",
]);

includesAll("src/data/siteData.js", [
  "slug: \"senben\"",
  "image: \"/assets/figma-project-senben.png\"",
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
  "ai-lab-scroll-wrap",
  "ai-lab-pinned-screen",
  "ai-lab-title-group",
  "ai-lab-copy-group",
  "ai-lab-pin-group",
  "ai-lab-image-group",
  "ai-lab-stage",
  "ai-lab-timeline-track",
  "ai-lab-timeline-fill",
  "ai-lab-sequence-item",
  "ai-lab-sequence-layer",
  "gsap.timeline",
  "preludeTimeline",
  "mainTimeline",
  "start: \"top bottom\"",
  "end: \"top top\"",
  "titlePreludeStart",
  "copyPreludeStart",
  "imagePinnedStart",
  "titlePreludeEnd",
  "contentPreludeEnd",
  "imagePinnedEnd",
  "duration: 0.38",
  "titleEnter+=0.24",
  "duration: 0.44",
  "stagger: 0.07",
  "start: \"top top\"",
  "end: \"+=2000\"",
  "imageEnter+=0.08",
  "imageEnter+=0.12",
  ".to(timelineLine, { [lineScaleProperty]: 1, duration: 0.55, ease: \"none\" }, \"imageEnter+=0.1\")",
  "titleGroup",
  "copyGroup",
  "imageGroup",
  "addLabel(\"titleEnter\"",
  "pin: pinnedScreen",
  "anticipatePin: 0",
  "invalidateOnRefresh: true",
  "scrub: true",
]);

assert(!read("src/hooks/useRevealInteractions.js").includes("\".ai-lab-visual\""), "AI Lab visual should be controlled by its own ScrollTrigger sequence");
assert(!read("src/components/Home/AILabSection.jsx").includes("copyEnter"), "AI Lab main pinned timeline should not restart copy group entrance after prelude");
assert(!read("src/components/Home/AILabSection.jsx").includes(".to(copyGroup, { y: 0"), "AI Lab pin start should not magnet-pull copy group into place");
assert(!read("src/components/Home/AILabSection.jsx").includes(".to(imageGroup, { ...contentPinnedEnd, duration: 0.5, ease: revealEase }, \"titleEnter+=0.5\")"), "AI Lab image group should not enter during prelude");
assert(!read("src/components/Home/AILabSection.jsx").includes(".to(sequenceItems, { autoAlpha: 1, y: 0, filter: \"blur(0px)\", duration: 0.5, stagger: 0.07, ease: revealEase }, \"titleEnter+=0.5\")"), "AI Lab sequence items should not enter during prelude");
assert(!read("src/components/Home/AILabSection.jsx").includes(".to(sequenceLayers, { ...imagePinnedEnd, duration: 0.5, stagger: 0.07, ease: revealEase }, \"titleEnter+=0.5\")"), "AI Lab sequence layers should not enter during prelude");
assert(!read("src/components/Home/AILabSection.jsx").includes(".to(timelineLine, { [lineScaleProperty]: 1, duration: 0.5, ease: \"none\" }, \"titleEnter+=0.5\")"), "AI Lab timeline line should not grow during prelude");
assert(!read("src/components/Home/AILabSection.jsx").includes("sequenceLayers[index]"), "AI Lab pinned stage should not animate individual image layers in sequence");
assert(!read("src/components/Home/AILabSection.jsx").includes("imagePerformanceTargets"), "AI Lab pinned stage should not move the whole image group after it settles");
assert(!read("src/components/Home/AILabSection.jsx").includes("imagePinnedStart = { autoAlpha: 0, y: 140, scale: 0.96, filter:"), "AI Lab image group should no longer start with blur");
assert(!read("src/components/Home/AILabSection.jsx").includes("imagePinnedEnd = { autoAlpha: 1, y: 0, scale: 1, filter:"), "AI Lab image layers should no longer animate blur to the final state");
assert(!read("src/components/Home/AILabSection.jsx").includes("gsap.set(sequenceItems, { autoAlpha: 0, y: 32, filter:"), "AI Lab sequence items should no longer start with blur");
assert(!read("src/components/Home/AILabSection.jsx").includes("filter: \"blur(8px)\",\n        transformOrigin: \"center bottom\""), "AI Lab sequence layers should no longer start with blur");
assert(!read("src/components/Home/AILabSection.jsx").includes(".to(sequenceItems, { autoAlpha: 1, y: 0, filter:"), "AI Lab sequence items should no longer animate blur in the pinned timeline");
const aiLabStepBlock = read("styles.css").match(/\.ai-lab-step\s*{[\s\S]*?\n}/)?.[0] || "";
const aiLabLayerBlock = read("styles.css").match(/\.ai-lab-layer\s*{[\s\S]*?\n}/)?.[0] || "";
assert(!aiLabStepBlock.includes("filter:"), "AI Lab step CSS should no longer apply blur");
assert(!aiLabStepBlock.includes("will-change: opacity, transform, filter;"), "AI Lab step CSS should not reserve filter animation");
assert(!aiLabLayerBlock.includes("filter:"), "AI Lab image layer CSS should no longer apply blur");
assert(!aiLabLayerBlock.includes("will-change: opacity, transform, filter;"), "AI Lab image layer CSS should not reserve filter animation");
assert(!read("styles.css").includes(".ai-lab-pinned-screen {\n    min-height: auto;\n    padding: 0;"), "AI Lab mobile pinned screen should preserve top breathing room");
assert(!read("styles.css").includes(".ai-lab-layer {\n  position: absolute;\n  display: block;\n  width: var(--layer-width);\n  height: var(--layer-height);\n  left: var(--layer-left);\n  bottom: 8px;\n  object-fit: cover;"), "AI Lab image layers should use contain to avoid cropping");

includesAll("styles.css", [
  ".ai-lab-section",
  "padding-top: 0;",
  "min-height: auto;",
  ".ai-lab-scroll-wrap",
  ".ai-lab-pinned-screen",
  "padding: clamp(112px, 14vh, 200px) 0 clamp(28px, 4vh, 52px);",
  ".ai-lab-title-group",
  ".ai-lab-copy-group",
  "border-bottom: 1px solid var(--line);",
  ".ai-lab-pin-group",
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
  "padding: clamp(88px, 12vh, 120px) 0 0;",
]);

includesAll("src/components/Home/FinalContactSection.jsx", [
  "TextPressure",
  "final-contact-section",
  "final-thanks",
  "THANKS",
  "flex",
  "minFontSize={96}",
  "final-contact-list",
  "contactItems.map",
]);

assert(!read("src/pages/HomePage.jsx").includes("final-transition"), "Final Contact should not use the local final transition wrapper after rollback");
assert(!read("src/components/Home/FinalContactSection.jsx").includes("yPercent"), "Final Contact should not use the local slide-in ScrollTrigger after rollback");

includesAll("src/components/shared/TextPressure.jsx", [
  "fontVariationSettings",
  "mousemove",
  "touchmove",
  "CompressaPRO-GX.woff2",
  "text-pressure-title",
  "text-pressure-char",
]);

includesAll("src/hooks/useScrollEffects.js", [
  "finalContactSection",
  "finalContactTop",
  "isFinalContactVisible",
  "final-contact-visible",
  "window.innerHeight * 0.52",
]);

includesAll("styles.css", [
  ".final-contact-section",
  "min-height: 100svh;",
  "border-top: 0;",
  ".final-contact",
  ".final-thanks",
  "grid-row: 2;",
  "width: min(800px, 88vw);",
  "aspect-ratio: 634 / 200;",
  "margin-right: -0.025em;",
  "grid-template-rows: 45svh 25svh 30svh;",
  ".final-contact-list",
  "grid-row: 3;",
  "border-left: 4px solid var(--accent);",
]);

assert(!read("styles.css").includes(".final-thanks .text-pressure-char:last-child"), "Final THANKS period should render as text, not a yellow square");
