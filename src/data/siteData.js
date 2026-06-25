export const introLoaderIcons = [
  '<svg viewBox="0 0 32 32" fill="none"><rect x="6" y="7" width="20" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M6 12h20M12 7v18" stroke="currentColor" stroke-width="1.8"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><rect x="7" y="9" width="18" height="14" rx="7" stroke="currentColor" stroke-width="1.8"/><circle cx="13" cy="16" r="3" fill="currentColor"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><path d="M8 10h16M8 16h10M8 22h13" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="24" cy="16" r="2.4" fill="currentColor"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><rect x="8" y="8" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="17" y="8" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="8" y="17" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M19 21h6M22 18v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><path d="M8 11l8-4 8 4-8 4-8-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 16l8 4 8-4M8 21l8 4 8-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><path d="M9 23l4.2-1 9.4-9.4a3 3 0 0 0-4.2-4.2L9 17.8V23Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 10l5 5" stroke="currentColor" stroke-width="1.8"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><path d="M9 9h14v14H9z" stroke="currentColor" stroke-width="1.8"/><path d="M13 13h8M13 17h5M13 21h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><path d="M8 22c5-10 9-10 16 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 13h14M13 9v8M19 9v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><rect x="7" y="8" width="18" height="17" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M11 13h12M11 17h7M11 21h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 32 32" fill="none"><path d="M8 16h16M16 8v16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="16" r="8" stroke="currentColor" stroke-width="1.8"/></svg>',
];

export const siteData = {
  person: {
    name: "梁慧锋",
    title: "Senior UI/UX Designer",
    subtitle: "专注复杂业务体验、多端产品设计与设计系统落地",
    resumeHref: "../梁慧锋-UI设计个人简历.pdf",
    logoSrc: "/assets/person-logo.svg",
    heroPhotoSrc: "/assets/hero-photo.png",
    backgroundVideo:
      "https://puff.oss-cn-hangzhou.aliyuncs.com/portfolio-demo/assets/kling_20260604_%E4%BD%9C%E5%93%81_%E5%9B%BE%E7%89%871_%E4%B8%BB%E4%BD%931__%E6%8A%8A_5182_0.mp4",
  },
  heroStats: [
    { value: "10+", label: "Years Experience" },
    { value: "30+", label: "Projects" },
    { value: "B-end / App / Web / Design System" },
  ],
  about: {
    kicker: "从视觉设计到产品体验",
    paragraphs: [
      [
        { text: "10+ 年设计经验", highlight: true },
        { text: "，经历过从APP、电商平台、品牌运营视觉到 B 端产品的" },
        { text: "完整设计链路", highlight: true },
        { text: "，并正在积极拥抱" },
        { text: "AI 工具提升效率", highlight: true },
        {
          text: "。我的工作不只停留在界面表现，也会深入业务目标、用户路径和开发落地，帮助产品形成清晰、稳定、可执行的体验方案。",
        },
      ],
      [
        {
          text: "过去的项目经历让我逐步从视觉执行走向产品体验与设计管理：能够独立完成从需求理解、竞品分析、交互梳理、视觉设计到设计规范沉淀的完整流程，也能与产品、技术和客户协同推进方案落地。",
        },
      ],
    ],
  },
  coreStrengths: {
    eyebrow: "Core Strengths",
    title: "核心能力",
    items: [
      {
        index: "01",
        title: "复杂业务体验设计",
        description:
          "从业务目标、用户路径和使用场景出发，梳理信息结构、操作流程与关键任务路径，让复杂系统变得更清晰、更高效。",
        proof: "# 浙里报账 / 天目数智平台",
        image: "/assets/figma-core-01.png",
        imageAlt: "复杂业务体验设计能力图示",
        labels: ["商业目标", "体验路径", "用户需求"],
      },
      {
        index: "02",
        title: "多端产品与设计系统",
        description:
          "覆盖 App、Web、后台、小程序、大屏等多端场景，通过视觉规范、组件库与设计资产沉淀，提升体验一致性与团队交付效率。",
        proof: "# APP、WEB、大屏 / 组件库 / 设计规范",
        image: "/assets/figma-core-02.png",
        imageAlt: "多端产品与设计系统能力图示",
        labels: ["大屏", "Website", "小程序", "APP"],
      },
      {
        index: "03",
        title: "视觉表达与交互创意",
        description:
          "在保证产品可用性的基础上，通过视觉叙事、场景化表达和动效设计，提升产品感知、方案说服力与用户记忆点。",
        proof: "# 森本新闻交互 / 运营视觉 / AI 视觉辅助 / 个人网站动效",
        image: "/assets/figma-core-03.png",
        imageAlt: "视觉表达与交互创意能力图示",
        labels: ["视觉 Visual", "交互 Interaction", "创意 Creativity"],
      },
    ],
  },
  career: [
    {
      year: "2015",
      company: "杭州空极科技有限公司",
      description: "从产品原型、界面视觉到前端交付，建立完整的 UI 设计工作方法。",
      tags: ["APP设计", "客户提案", "Keynote演示", "AE动效", "视觉表达"],
    },
    {
      year: "2019",
      company: "浙江妮素网络科技股份有限公司",
      description: "负责社交电商移动端与运营视觉，沉淀活动、Banner 与 H5 设计规范。",
      tags: ["竞品分析", "产品迭代", "品牌升级", "设计规范", "团队赋能"],
    },
    {
      year: "2022",
      company: "五洲工程顾问集团有限公司",
      description: "主导后台管理系统从 0 到 1 的体验与视觉搭建，推动设计系统落地。",
      tags: ["0-1建设平台", "竞品分析", "需求梳理", "设计系统", "多版本迭代", "团队管理", "企业品牌视觉"],
    },
    {
      year: "2024",
      company: "杭州咏创科技集团有限公司",
      description: "负责重点项目 UI 与视觉管理，协同产品和技术提升交付质量。",
      tags: ["复杂项目攻坚", "多平台用户体验", "团队管理", "协同交付"],
    },
  ],
  tools: [
    ["Photoshop", "https://svgl.app/library/photoshop.svg"],
    ["Lightroom", "https://svgl.app/library/lightroom.svg"],
    ["Illustrator", "https://svgl.app/library/illustrator.svg"],
    ["After Effects", "https://svgl.app/library/after-effects.svg"],
    ["Figma", "https://svgl.app/library/figma.svg"],
    ["Sketch", "https://svgl.app/library/sketch.svg"],
    ["Blender", "https://svgl.app/library/blender.svg"],
    ["GPT", "https://svgl.app/library/openai.svg"],
    ["Codex", "https://svgl.app/library/codex_dark.svg"],
    ["Claude", "https://svgl.app/library/claude-ai-icon.svg"],
    ["Cursor", "https://svgl.app/library/cursor_dark.svg"],
    ["Lovart", "https://svgl.app/library/lovable.svg"],
    ["Netlify", "https://svgl.app/library/netlify.svg"],
  ],
  selectedWorks: {
    eyebrow: "Selected Works",
    title: "项目案例",
    items: [
      {
        slug: "tianmu",
        displayTitle: "天目数智 WEB 平台",
        displayDescription: "从0-1搭建 B 端平台视觉体系，提升设计一致性与开发协作效率。",
        displayTags: ["B 端平台", "设计系统", "多端协同"],
        result: "沉淀规范、减少走查成本、支撑后续临海等项目复用。",
        title: "天目数智WEB平台",
        description:
          "面向复杂业务管理场景，重构工作台、详情页、表格筛选与数据可视化体验，提升平台操作效率与多端设计一致性。",
        displayTitle: "\u5929\u76ee\u6570\u667a WEB \u5e73\u53f0",
        displayDescription:
          "\u4ece0-1\u642d\u5efa B \u7aef\u5e73\u53f0\u89c6\u89c9\u4f53\u7cfb\uff0c\u63d0\u5347\u8bbe\u8ba1\u4e00\u81f4\u6027\u4e0e\u5f00\u53d1\u534f\u4f5c\u6548\u7387\u3002",
        displayTags: ["B \u7aef\u5e73\u53f0", "\u8bbe\u8ba1\u7cfb\u7edf", "\u591a\u7aef\u534f\u540c"],
        result:
          "\u6c89\u6dc0\u89c4\u8303\u3001\u51cf\u5c11\u8d70\u67e5\u6210\u672c\u3001\u652f\u6491\u540e\u7eed\u4e34\u6d77\u7b49\u9879\u76ee\u590d\u7528\u3002",
        image: "/assets/figma-project-tianmu.png",
        imageAlt: "天目数智WEB平台项目展示",
        metrics: [
          { value: "10%", label: "工单咨询降低" },
          { label: "设计规范沉淀" },
        ],
      },
      {
        slug: "senben",
        displayTitle: "森本新闻 App",
        displayDescription: "用场景化交互重新设计计划书模块，让甲方快速理解内容价值。",
        displayTags: ["交互创意", "移动端视觉", "场景化表达"],
        result: "方案获得甲方认可，并作为核心交互展示进入项目详情。",
        title: "森本新闻",
        description:
          "围绕新闻资讯与计划书浏览场景，通过真实桌面隐喻与动态翻阅交互，将原本平面的内容模块转化为更具沉浸感的体验入口。",
        displayTitle: "\u68ee\u672c\u65b0\u95fb App",
        displayDescription:
          "\u7528\u573a\u666f\u5316\u4ea4\u4e92\u91cd\u65b0\u8bbe\u8ba1\u8ba1\u5212\u4e66\u6a21\u5757\uff0c\u8ba9\u7532\u65b9\u5feb\u901f\u7406\u89e3\u5185\u5bb9\u4ef7\u503c\u3002",
        displayTags: ["\u4ea4\u4e92\u521b\u610f", "\u79fb\u52a8\u7aef\u89c6\u89c9", "\u573a\u666f\u5316\u8868\u8fbe"],
        result:
          "\u65b9\u6848\u83b7\u5f97\u7532\u65b9\u8ba4\u53ef\uff0c\u5e76\u4f5c\u4e3a\u6838\u5fc3\u4ea4\u4e92\u5c55\u793a\u8fdb\u5165\u9879\u76ee\u8be6\u60c5\u3002",
        image: "/assets/figma-project-senben.png",
        imageAlt: "森本新闻项目展示",
        tags: ["#场景化内容入口", "#动态翻阅交互", "#提升方案说服力"],
      },
      {
        slug: "baozhang",
        displayTitle: "浙里报账体验升级",
        displayDescription: "重构报销流程与信息层级，让用户更快完成核心任务。",
        displayTags: ["移动端体验", "流程优化", "信息架构"],
        result: "报销时长缩短 40%，咨询工单下降 18%，满意度提升 46%。",
        title: "浙里报账",
        description:
          "围绕政府报账场景，重构首页信息架构、智能报销流程与行程管理体验，降低用户操作成本，提升关键功能转化。",
        displayTitle: "\u6d59\u91cc\u62a5\u8d26\u4f53\u9a8c\u5347\u7ea7",
        displayDescription:
          "\u91cd\u6784\u62a5\u9500\u6d41\u7a0b\u4e0e\u4fe1\u606f\u5c42\u7ea7\uff0c\u8ba9\u7528\u6237\u66f4\u5feb\u5b8c\u6210\u6838\u5fc3\u4efb\u52a1\u3002",
        displayTags: ["\u79fb\u52a8\u7aef\u4f53\u9a8c", "\u6d41\u7a0b\u4f18\u5316", "\u4fe1\u606f\u67b6\u6784"],
        result: "\u62a5\u9500\u65f6\u957f\u7f29\u77ed 40% \u4e28 \u54a8\u8be2\u5de5\u5355\u4e0b\u964d 18% \u4e28 \u6ee1\u610f\u5ea6\u63d0\u5347 46%",
        image: "/assets/figma-project-baozhang.png",
        imageAlt: "浙里报账项目展示",
        metrics: [
          { value: "40%", label: "报销时长缩短" },
          { value: "18%", label: "咨询工单量下降" },
          { value: "46%", label: "用户满意度提升" },
        ],
      },
    ],
  },
  aiLab: {
    eyebrow: "AI Lab",
    title: "AI融入工作流",
    intro: {
      lead: "\u8FD9\u4E2A\u7F51\u7AD9\u4E5F\u662F\u6211\u7684\u4E00\u6B21 AI \u534F\u4F5C\u5B9E\u9A8C\u3002",
      paragraphs: [
        "\u6211\u5C06\u81EA\u5DF1\u7684\u4F5C\u54C1\u96C6\u5185\u5BB9\u3001\u804C\u4E1A\u7ECF\u5386\u548C\u8BBE\u8BA1\u5224\u65AD\u6574\u7406\u4E3A\u7ED3\u6784\u5316\u8D44\u6599\uFF0C\u518D\u901A\u8FC7 AI \u5B8C\u6210\u8D44\u6599\u7814\u7A76\u3001\u89C6\u89C9\u65B9\u5411\u63A2\u7D22\u3001\u52A8\u6548\u53C2\u8003\u62C6\u89E3\u3001\u524D\u7AEF\u5B9E\u73B0\u6C9F\u901A\u548C\u7F51\u7AD9\u5FEB\u901F\u9A8C\u8BC1\u4E2D\uFF1B",
        "AI \u4E0D\u662F\u66FF\u4EE3\u8BBE\u8BA1\uFF0C\u800C\u662F\u6269\u5927\u8BBE\u8BA1\u5E08\u7684\u63A2\u7D22\u534A\u5F84\u3002",
      ],
      emphasis:
        "\u771F\u6B63\u91CD\u8981\u7684\u4E0D\u662F\u751F\u6210\u66F4\u591A\u65B9\u6848\uFF0C\u800C\u662F\u5224\u65AD\u4EC0\u4E48\u503C\u5F97\u4FDD\u7559\u3001\u4EC0\u4E48\u5E94\u8BE5\u5220\u9664\uFF0C\u4EE5\u53CA\u9879\u76EE\u7684\u8BBE\u8BA1\u76EE\u6807\u3001\u4E1A\u52A1\u573A\u666F\u548C\u7528\u6237\u4F53\u9A8C\u3002",
    },
    steps: [
      {
        title: "内容重构",
        subtitle: "Content Structure",
        tool: "Chat GPT",
        icon: "ph-fill ph-chat-circle-text",
        iconSrc: "/assets/ai-tool-openai.svg",
      },
      {
          title: "视觉方向",
          subtitle: "Visual Direction",
          tool: "Figma，Lovart",
          icon: "ph-fill ph-palette",
          iconSrc: "/assets/ai-tool-figma.svg",
        },
      {
        title: "原型与动效",
        subtitle: "Prototype & Motion",
        tool: "React Bits",
        icon: "ph-fill ph-atom",
      },
      {
        title: "代码实现",
        subtitle: "Code Build",
        tool: "CodeX",
        icon: "ph-fill ph-code",
        iconSrc: "/assets/ai-tool-codex.svg",
      },
      {
        title: "部署上线",
        subtitle: "Deploy & Iterate",
        tool: "Netlify",
        icon: "ph-fill ph-upload-simple",
        iconSrc: "/assets/ai-tool-netlify.svg",
      },
    ],
    layers: [
      { src: "/assets/ailab_1.png", alt: "Figma设计稿与内容整理界面", className: "ai-lab-layer-1" },
      { src: "/assets/ailab_2.png", alt: "ChatGPT文件整理工作区", className: "ai-lab-layer-2" },
      { src: "/assets/ailab_3.png", alt: "AI协作对话与方案记录", className: "ai-lab-layer-3" },
      { src: "/assets/ailab_4.png", alt: "生成式影像实验界面", className: "ai-lab-layer-4" },
      { src: "/assets/ailab_5.png", alt: "Codex代码实现界面", className: "ai-lab-layer-5" },
    ],
    imageAlt: "AI融入作品集工作流展示",
  },
  projects: {
    tianmu: {
      slug: "tianmu",
      type: "feed",
      ariaLabel: "天目数智 PDF 案例图片流",
      feedImages: [
        "/assets/tianmu-feed/tianmu-04.png",
        "/assets/tianmu-feed/tianmu-05.png",
        "/assets/tianmu-feed/tianmu-06.png",
        "/assets/tianmu-feed/tianmu-07.png",
        "/assets/tianmu-feed/tianmu-08.png",
        "/assets/tianmu-feed/tianmu-09.png",
        "/assets/tianmu-feed/tianmu-10.png",
        "/assets/tianmu-feed/tianmu-11.png",
        "/assets/tianmu-feed/tianmu-12.png",
        "/assets/tianmu-feed/tianmu-13.png",
        "/assets/tianmu-feed/tianmu-14.png",
        "/assets/tianmu-feed/tianmu-15.png",
        "/assets/tianmu-feed/tianmu-16.png",
        "/assets/tianmu-feed/tianmu-17.png",
        "/assets/tianmu-feed/tianmu-18.png",
        "/assets/tianmu-feed/tianmu-19.png",
        "/assets/tianmu-feed/tianmu-20.png",
      ],
      title: "天目数智平台管理系统",
      eyebrow: "后台管理系统",
      image: "/assets/天目数智后台截图示意.png",
      imageAlt: "天目数智平台管理系统项目预览",
      intro:
        "负责天目数智平台从 0 到 1 的用户体验设计与视觉构建，从竞品分析、客户需求梳理、原型体验、交互设计到视觉规范沉淀，持续推进后台系统的产品体验和设计质量提升。",
      outcome:
        "在职期间完成 5 个版本迭代、200+ 新增组件，并协同开发团队梳理设计系统完成落地，为后台系统快速搭建奠定基础。项目推进过程中整理还原度问题，调整模块 15 个、修改问题 649 个，保障最终落地效果。",
      figmaPrototype: {
        title: "森本新闻 app 交互原型",
        embed:
          "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FHhtyRPF1IbZquvDLsMAlRb%2F%25E6%25A3%25AE%25E6%259C%25AC%25E6%2596%25B0%25E9%2597%25BBapp%3Fnode-id%3D212-4395%26p%3Df%26viewport%3D346%252C348%252C0.08%26t%3DBYx4C4atFrWIecJZ-1%26scaling%3Dscale-down%26content-scaling=fixed%26starting-point-node-id%3D212%253A4395%26show-proto-sidebar=1%26page-id%3D0%253A1",
        url:
          "https://www.figma.com/proto/HhtyRPF1IbZquvDLsMAlRb/%E6%A3%AE%E6%9C%AC%E6%96%B0%E9%97%BBapp?node-id=212-4395&p=f&viewport=346%2C348%2C0.08&t=BYx4C4atFrWIecJZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=212%3A4395&show-proto-sidebar=1&page-id=0%3A1",
      },
    },
    baozhang: {
      slug: "baozhang",
      type: "feed",
      title: "浙里报账：移动端报销流程体验升级",
      eyebrow: "移动端 UX 主案例",
      ariaLabel: "浙里报账 PDF 案例图片流",
      feedImages: [
        "/assets/baozhang-feed/baozhang-21.png",
        "/assets/baozhang-feed/baozhang-22.png",
        "/assets/baozhang-feed/baozhang-23.png",
        "/assets/baozhang-feed/baozhang-24.png",
        "/assets/baozhang-feed/baozhang-25.png",
        "/assets/baozhang-feed/baozhang-26.png",
        "/assets/baozhang-feed/baozhang-27.png",
        "/assets/baozhang-feed/baozhang-28.png",
        "/assets/baozhang-feed/baozhang-29.png",
        "/assets/baozhang-feed/baozhang-30.png",
        "/assets/baozhang-feed/baozhang-31.png",
        "/assets/baozhang-feed/baozhang-32.png",
        "/assets/baozhang-feed/baozhang-33.png",
        "/assets/baozhang-feed/baozhang-34.png",
        "/assets/baozhang-feed/baozhang-35.png",
      ],
      summary:
        "围绕政府报账场景，我独立主导移动端核心体验改版，重构首页信息架构、智能报销流程、单据筛选、电子发票详情和行程管理等关键路径。",
      image: "/assets/figma-project-baozhang.png",
      imageAlt: "浙里报账移动端体验升级项目展示",
      context:
        "移动报销涉及行程、发票、单据、审批状态和补充材料等多个环节。用户不是单纯填写一张表，而是在移动端完成从发起、选择、核对、提交到追踪状态的一整条任务链。",
      role:
        "我主导完成浙里报账移动端核心体验改版，负责从问题梳理、信息架构、核心流程、页面交互到视觉落地的完整设计工作。",
      designGoal:
        "改版目标不是简单美化界面，而是降低用户在移动端完成报销任务的操作负担：让入口更清楚、流程更短、状态更明确、单据信息更容易判断。",
      metrics: [
        { value: "40%", label: "报销时长缩短" },
        { value: "18%", label: "咨询工单下降" },
        { value: "46%", label: "用户满意度提升" },
      ],
      problems: [
        { title: "路径偏长", description: "报销动作被拆散在多个页面中，用户需要来回确认材料、费用和审批状态。" },
        { title: "信息分散", description: "行程、发票、单据和状态之间缺少清晰关联，用户判断成本较高。" },
        { title: "反馈不清", description: "提交、补充、审批等关键节点的反馈不够明确，容易产生重复咨询。" },
      ],
      flow: [
        { title: "首页聚焦任务", description: "把高频入口、待处理事项和状态提醒前置，让用户一进入就知道下一步要做什么。" },
        { title: "智能报销串联流程", description: "围绕报销发起到提交的核心路径重组页面顺序，减少不必要跳转。" },
        { title: "单据与发票清晰对应", description: "强化筛选、列表、详情和状态标签，让用户更快定位需要处理的材料。" },
        { title: "行程管理支撑判断", description: "把行程信息与报销信息建立更明确的上下文，降低核对和补充成本。" },
      ],
      modules: [
        { title: "首页信息架构", description: "重排入口优先级，将核心任务、待办状态和常用功能集中呈现。" },
        { title: "智能报销流程", description: "优化报销创建、材料选择、费用核对和提交反馈，减少用户在流程中的迷失感。" },
        { title: "表单筛选与列表", description: "通过更清楚的筛选条件、状态标签和列表层级，提升查找效率。" },
        { title: "电子发票详情", description: "突出发票关键信息、可用状态和关联单据，帮助用户快速判断能否报销。" },
        { title: "行程管理", description: "围绕出行记录、费用关联和报销状态建立更完整的移动端任务视角。" },
      ],
      resultDetail:
        "改版后，项目在版本层面实现报销时长缩短 40%、咨询工单下降 18%、用户满意度提升 46%。这组结果来自流程、信息架构和视觉交互的综合优化，也体现了我在复杂移动端任务流中独立推进体验升级的能力。",
    },
    senben: {
      slug: "senben",
      type: "senben",
      title: "森本 App：计划书模块的场景化交互设计",
      eyebrow: "移动端交互提案",
      summary:
        "森本 App 是一个新闻资讯类移动端项目。甲方重点关注底部导航中的计划模块，希望它比普通内容列表更有吸引力，也更容易在提案中被快速理解。",
      challenge:
        "旧方案能够展示计划内容，但整体仍接近普通卡片列表，用户很难在第一眼感受到“正在浏览不同计划书”的场景。新方案把抽象套餐转化成桌面上的计划书翻阅体验，让内容选择变成更直观的操作。",
      designDecision:
        "我没有继续强化卡片样式，而是把计划内容想象成摊在桌面上的几份计划书：咖啡桌面提供生活化场景，卡片旋转形成翻阅感，底部内容随点击切换，让甲方可以直接看到最终交互会如何帮助用户理解不同方案。",
      previewIntro:
        "静态页面展示最终视觉结构，Figma 原型用于预览计划书翻阅与内容切换。页面内可直接操作，加载异常时也可以通过按钮打开原型。",
      resultDetail:
        "该方向通过动效原型让甲方快速理解模块价值，方案获得认可，并作为森本 App 的核心交互展示进入项目详情。",
      beforeAfter: [
        {
          label: "Before",
          image: "/assets/senben-plan-before.png",
          alt: "森本 App 计划模块旧方案 UI",
          caption: "旧方案以卡片和列表承载内容，信息明确，但场景感和记忆点较弱。",
        },
        {
          label: "After",
          image: "/assets/senben-plan-after.png",
          alt: "森本 App 计划模块新方案 UI",
          caption: "新方案将计划内容转化为桌面计划书翻阅场景，强化浏览和选择的感知。",
        },
      ],
      decisionPoints: [
        { title: "桌面场景", description: "用咖啡和桌面隐喻降低理解成本，让计划内容不再只是列表。" },
        { title: "计划书物件", description: "把不同套餐变成可识别的计划书卡片，强化差异感。" },
        { title: "点击切换", description: "通过旋转和内容联动，让选择行为获得明确反馈。" },
      ],
      gallery: [
        { image: "/assets/senben-home-news.png", alt: "森本 App 首页新闻页面", caption: "首页新闻" },
        { image: "/assets/senben-plan.png", alt: "森本 App 计划模块页面", caption: "计划模块" },
        { image: "/assets/senben-message.png", alt: "森本 App 消息页面", caption: "消息页面" },
      ],
      figmaPrototype: {
        title: "森本新闻 App 交互原型",
        embed:
          "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FHhtyRPF1IbZquvDLsMAlRb%2F%25E6%25A3%25AE%25E6%259C%25AC%25E6%2596%25B0%25E9%2597%25BBapp%3Fnode-id%3D212-4395%26viewport%3D-1090%252C840%252C0.47%26t%3DRCRR1Xo7ln8Zc2cT-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D212%253A4395%26page-id%3D0%253A1",
        url:
          "https://www.figma.com/proto/HhtyRPF1IbZquvDLsMAlRb/%E6%A3%AE%E6%9C%AC%E6%96%B0%E9%97%BBapp?node-id=212-4395&viewport=-1090%2C840%2C0.47&t=RCRR1Xo7ln8Zc2cT-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=212%3A4395&page-id=0%3A1",
      },
    },
  },
  moreProjects: [
    ["浙里报账2.0改版", "ToG 报账系统体验与视觉升级"],
    ["素店", "社交电商移动端与运营视觉改版"],
    ["柏品", "奢侈品电商竞标与视觉方案"],
    ["电商运营活动", "运营 Banner 与 H5 活动页面设计"],
  ],
  contact: {
    email: "305896796@qq.com",
    phone: "130 1766 2166",
    location: "ZhengZhou，China",
    website: "puffny.cn",
    copyright: "© 2026 梁慧锋 UI Design Portfolio",
  },
};
