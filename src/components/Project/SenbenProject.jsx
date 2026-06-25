import BackgroundVideo from "../shared/BackgroundVideo";

export default function SenbenProject({ project, onBack }) {
  return (
    <>
      <BackgroundVideo src="/assets/hero-background.mp4" sourceType="video/mp4" />
      <main className="senben-page">
        <a className="case-back-link" href="/?restoreProjectScroll=1" aria-label="返回首页项目案例" onClick={onBack}>
          <i className="ph-fill ph-caret-left" aria-hidden="true" />
          <span>返回</span>
        </a>

        <header className="senben-hero">
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </header>

        <section className="senben-section senben-before-after" aria-labelledby="senben-before-after-title">
          <div className="senben-section-copy">
            <p className="section-label">Before / After</p>
            <h2 id="senben-before-after-title">从普通卡片到计划书翻阅场景</h2>
            <p>{project.challenge}</p>
          </div>
          <div className="senben-comparison">
            {project.beforeAfter.map((item) => (
              <figure key={item.label}>
                <span>{item.label}</span>
                <img src={item.image} alt={item.alt} />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="senben-section senben-decision" aria-labelledby="senben-decision-title">
          <div className="senben-section-copy">
            <p className="section-label">Design Decision</p>
            <h2 id="senben-decision-title">把抽象套餐变成可感知的内容入口</h2>
            <p>{project.designDecision}</p>
          </div>
          <div className="senben-decision-grid">
            {project.decisionPoints.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="senben-section senben-preview" aria-labelledby="senben-preview-title">
          <div className="senben-section-copy">
            <p className="section-label">Interactive Preview</p>
            <h2 id="senben-preview-title">最终页面与 Figma 原型</h2>
            <p>{project.previewIntro}</p>
          </div>
          <div className="senben-preview-grid">
            <div className="senben-phone-gallery" aria-label="森本 App 最终页面展示">
              {project.gallery.map((item) => (
                <figure key={item.image}>
                  <img src={item.image} alt={item.alt} />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div className="senben-prototype">
              <div className="figma-prototype">
                <iframe title={project.figmaPrototype.title} src={project.figmaPrototype.embed} allowFullScreen />
              </div>
              <a className="figma-prototype-link" href={project.figmaPrototype.url} target="_blank" rel="noreferrer">
                打开 Figma 原型
              </a>
            </div>
          </div>
        </section>

        <section className="senben-section senben-result" aria-labelledby="senben-result-title">
          <p className="section-label">Result</p>
          <h2 id="senben-result-title">方案获得甲方认可</h2>
          <p>{project.resultDetail}</p>
        </section>
      </main>
    </>
  );
}
