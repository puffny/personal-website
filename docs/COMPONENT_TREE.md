# 个人作品集网站组件结构

Version 1.0

## 1. 页面结构

```text
portfolio-website
└─ src
   ├─ App.jsx
   ├─ main.jsx
   ├─ routes
   │  ├─ Home.jsx
   │  └─ ProjectDetail.jsx
   ├─ components
   │  ├─ layout
   │  │  ├─ Header.jsx
   │  │  ├─ Footer.jsx
   │  │  └─ PageSection.jsx
   │  ├─ home
   │  │  ├─ Hero.jsx
   │  │  ├─ About.jsx
   │  │  ├─ CareerTimeline.jsx
   │  │  ├─ CoreStrengths.jsx
   │  │  ├─ StrengthCard.jsx
   │  │  ├─ DesignThinking.jsx
   │  │  ├─ ThinkingCard.jsx
   │  │  ├─ AiLab.jsx
   │  │  ├─ AiToolCard.jsx
   │  │  └─ Contact.jsx
   │  ├─ project
   │  │  ├─ ProjectHero.jsx
   │  │  ├─ ProjectOverview.jsx
   │  │  ├─ ProjectRole.jsx
   │  │  ├─ ProjectProcess.jsx
   │  │  ├─ ProjectResult.jsx
   │  │  └─ ProjectValue.jsx
   │  └─ common
   │     ├─ Button.jsx
   │     ├─ Tag.jsx
   │     ├─ SectionTitle.jsx
   │     ├─ ImageBlock.jsx
   │     └─ MotionReveal.jsx
   ├─ data
   │  ├─ profile.js
   │  ├─ strengths.js
   │  ├─ projects.js
   │  └─ thinking.js
   ├─ styles
   │  ├─ globals.css
   │  ├─ tokens.css
   │  └─ motion.css
   └─ assets
      ├─ images
      └─ icons
```

## 2. 路由结构

```text
/
├─ Hero
├─ About & Career
├─ Core Strengths
├─ Design Thinking
├─ AI Lab
└─ Contact

/project/tianmu
/project/baozhang
/project/senben
```

## 3. 首页组件说明

### `Hero.jsx`

首屏品牌展示组件。

内容包括：

- 主标题：UI Designer x Product Thinker
- 副标题：12 Years of Experience in Enterprise Products, User Experience & Design Systems
- 简介文案
- 下载作品集 CTA
- 联系我 CTA
- 动态背景与品牌 Logo

### `About.jsx`

个人背景介绍组件。

内容包括：

- 12 年 UI/UX 设计经验
- 企业数字化产品与互联网平台建设经验
- 政务、金融、电商、企业服务等领域经验
- 当前关注方向

### `CareerTimeline.jsx`

职业经历时间线组件。

内容包括：

- 空极科技：高级 UI 设计师，企业数字化平台设计
- 妮素科技：UI 设计师，移动端产品设计
- 五洲国际：视觉设计师，品牌与营销设计
- 咏创科技：UI 设计师，企业系统与后台设计

### `CoreStrengths.jsx`

核心能力模块容器。

包含 3 个 `StrengthCard.jsx`：

- 复杂系统设计
- 用户体验优化
- 视觉与交互表达

### `StrengthCard.jsx`

核心能力卡片组件。

内容包括：

- 能力标题
- 副标题
- 正文说明
- 关键词
- 配图
- 项目详情页跳转

### `DesignThinking.jsx`

设计思考模块。

内容包括：

- 设计师的价值
- 关于 AI
- 未来方向

### `AiLab.jsx`

AI 探索模块。

包含 4 个 `AiToolCard.jsx`：

- 个人网站：GPT + Codex + Netlify
- Cursor：辅助代码修改与迭代
- Lovart：AI 视觉探索
- 工作流：设计 -> 开发 -> 部署

### `Contact.jsx`

联系模块。

内容包括：

- 头像
- 姓名
- 职位
- 简介
- 邮箱
- 手机号
- 微信二维码
- 结束语

## 4. 项目详情页组件说明

### `ProjectDetail.jsx`

项目详情页路由组件，根据项目 ID 渲染对应案例。

支持项目：

- `tianmu`：天目数智
- `baozhang`：浙里报账
- `senben`：森本新闻

### `ProjectHero.jsx`

项目详情页首屏。

内容包括：

- 项目名称
- 案例定位
- 项目主图
- 项目关键词

### `ProjectOverview.jsx`

项目背景模块。

用于说明业务场景、问题和设计挑战。

### `ProjectRole.jsx`

个人职责模块。

用于展示在项目中的具体负责内容。

### `ProjectProcess.jsx`

设计过程模块。

用于展示从问题梳理、方案设计到协同落地的过程。

### `ProjectResult.jsx`

标准化成果模块。

用于展示效率提升、流程优化、复用率提升等结果数据。

### `ProjectValue.jsx`

项目价值模块。

用于总结项目对业务、体验和团队协作的价值。

## 5. 数据拆分建议

### `profile.js`

维护个人基础信息：

- 姓名
- 职位
- 简介
- 联系方式
- 当前关注方向
- 职业经历

### `strengths.js`

维护首页核心能力卡片：

- 复杂系统设计
- 用户体验优化
- 视觉与交互表达

### `projects.js`

维护项目详情页内容：

- 天目数智
- 浙里报账
- 森本新闻

### `thinking.js`

维护设计思考内容：

- 设计师的价值
- 关于 AI
- 未来方向

