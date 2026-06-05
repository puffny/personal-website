const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function includesAll(source, fragments) {
  for (const fragment of fragments) {
    assert(
      source.includes(fragment),
      `Expected file to include: ${fragment}`
    );
  }
}

const index = read("index.html");
const project = read(path.join("projects", "pixel-pathway", "index.html"));
const styles = read("styles.css");
const script = read("script.js");

includesAll(index, [
  "home-page",
  "page-bg",
  "page-bg-video",
  "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2",
  "ph ph-house",
  "ph ph-user",
  "ph ph-briefcase",
  "ph ph-sparkle",
  "ph ph-paper-plane-tilt",
  "ph ph-envelope-simple",
  "ph ph-phone",
  "ph ph-globe",
  "ph ph-map-pin",
  "autoplay",
  "muted",
  "loop",
  "playsinline",
  "https://puff.oss-cn-hangzhou.aliyuncs.com/portfolio-demo/assets/kling_20260604_%E4%BD%9C%E5%93%81_%E5%9B%BE%E7%89%871_%E4%B8%BB%E4%BD%931__%E6%8A%8A_5182_0.mp4",
  "nav-indicator",
  "LIANG",
  "HUIFENG",
  "UI DESIGNER",
  "305896796@qq.com",
  "130 1766 2166",
  "puffny.cn",
  "ZhengZhou，HeNan",
  "12年工作经验",
  "杭州咏创科技集团有限公司",
  "五洲工程顾问集团有限公司",
  "浙江妮素网络科技股份有限公司",
  "杭州空极科技有限公司",
  "天目数智平台管理系统",
  "浙里报账2.0改版",
  "素店",
  "柏品",
  "黄河科技学院",
  "艺术设计",
  "id=\"summary\"",
  "id=\"experience\"",
  "id=\"skills\"",
  "id=\"links\"",
  "下载PDF简历",
  "主页",
  "个人介绍",
  "工作经验",
  "专业技能",
  "项目展示",
  "projects/pixel-pathway/",
]);

assert(
  !index.includes("section-label"),
  "Expected homepage section numbers to be removed"
);

assert(
  !index.includes("floating-template"),
  "Expected floating template button to be removed from homepage"
);

includesAll(project, [
  "返回首页",
  "天目数智平台管理系统",
  "项目介绍",
  "项目成果",
  "其他项目",
]);

includesAll(styles, [
  "--accent",
  ".page-bg",
  ".page-bg video",
  "object-fit: cover",
  ".home-page.page-scrolled .page-bg",
  "filter: blur(48px)",
  ".page-bg::after",
  "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.58) 100%)",
  "rgba(0, 0, 0, 0.6)",
  ".hero",
  ".work-card",
  ".content-main h2",
  "grid-template-columns: minmax(0, 1fr)",
  "width: min(calc(100% - 72px), var(--max))",
  "color: var(--accent)",
  "statusPulse",
  "animation: statusPulse",
  ".hero.scrolled",
  "blur(",
  "bottom: 26px",
  ".site-nav a.active",
  ".nav-icon",
  "display: inline-flex",
  ".nav-icon i",
  ".contact-icon",
  ".showcase-card",
  ".showcase-marquee",
  ".showcase-track",
  "aspect-ratio: 16 / 9",
  "animation: showcaseDrift 46s linear infinite",
  "transform: translate3d(calc(-50% - 9px), 0, 0)",
  ".nav-indicator",
  ".reveal-item",
  ".is-visible",
  ".magnetic-hover",
  ".project-list a.edge-glow-card",
  ".project-list a::before",
  ".project-list a::after",
  "--edge-proximity",
  "--cursor-angle",
  "conic-gradient(from var(--cursor-angle)",
  "rgb(255 255 255 / 64%)",
  "--glass-bg",
  "backdrop-filter: blur(22px) saturate(1.15)",
  ".info-columns > div",
  ".contact-grid a:hover",
  ".showcase-card:hover",
  "@media (prefers-reduced-motion: reduce)",
  "height: clamp(128px, 12.5vw, 190px)",
  "bottom: clamp(136px, 17vh, 190px)",
  "min-height: calc(2em * 0.98)",
  "padding-top: 38vh",
  "font-size: 18px",
  "font-weight: 400",
  "line-height: 2.2",
  "@media (max-width: 760px)",
]);

assert(
  !styles.includes(".hero::before"),
  "Expected hero to rely on the fixed page background, not a duplicate hero background"
);

assert(
  !styles.includes("grid-template-columns: 160px minmax(0, 1fr)") && !styles.includes(".section-label"),
  "Expected content sections to use a single left-aligned column without number labels"
);

assert(
  !styles.includes("background-image"),
  "Expected homepage background to use the video element, not a CSS background image"
);

const siteNavBlock = styles.match(/\.site-nav\s*{([\s\S]*?)\n}/);
assert(siteNavBlock, "Expected .site-nav styles to exist");
assert(
  siteNavBlock[1].includes("border: 0;"),
  "Expected main navigation shell to have no border"
);
assert(
  siteNavBlock[1].includes("max-width: 720px;"),
  "Expected main navigation shell to cap at 720px"
);
assert(
  siteNavBlock[1].includes("min-width: 312px;"),
  "Expected main navigation shell to keep a 312px mobile minimum"
);

includesAll(script, [
  "document.querySelectorAll",
  "hero.classList.toggle(\"scrolled\"",
  "window.innerHeight * 0.3",
  "setActiveNav",
  "updateHomeNav",
  "ph ph-arrow-up",
  "回到首页",
  "back-to-top-hint",
  "moveNavIndicator",
  "initRevealInteractions",
  "IntersectionObserver",
  "revealTargets",
  "Math.min(index % 5, 4) * 50",
  "initMagneticHover",
  ".showcase-card",
  "initProjectEdgeGlow",
  "edgeGlowCards",
  "--edge-proximity",
  "--cursor-angle",
  "prefers-reduced-motion",
]);

assert(
  !index.includes("darkveil-canvas"),
  "Expected DarkVeil canvas to be removed when using the portrait background"
);
assert(
  !script.includes("initDarkVeil"),
  "Expected DarkVeil script to be removed when using the portrait background"
);

assert(
  !index.includes("data-typewriter") && !styles.includes("typeCursorBlink") && !script.includes("initTypewriter"),
  "Expected typewriter effect to be removed from the homepage"
);

includesAll(styles, [
  "transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
]);

console.log("Static demo structure looks good.");
