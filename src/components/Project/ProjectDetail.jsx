import { siteData } from "../../data/siteData";

export default function ProjectDetail({ project }) {
  return (
    <main>
      <header className="project-hero">
        <a className="back-link" href="/">
          返回首页
        </a>
        <img src={project.image} alt={project.imageAlt} />
        <div>
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.title}</h1>
        </div>
      </header>

      <section className="project-layout">
        <article>
          <h2>项目介绍</h2>
          <p>{project.intro}</p>

          <h2>项目成果</h2>
          <p>{project.outcome}</p>

          <h2>交互原型</h2>
          <p>以下为 Figma 中制作的交互原型，可直接在页面内进行预览与操作。</p>
          <div className="figma-prototype">
            <iframe title={project.figmaPrototype.title} src={project.figmaPrototype.embed} allowFullScreen />
          </div>
          <a className="figma-prototype-link" href={project.figmaPrototype.url} target="_blank" rel="noreferrer">
            打开 Figma 原型
          </a>
        </article>
      </section>

      <section className="content-shell project-more">
        <div className="section-label">More</div>
        <div className="content-main">
          <h2>其他项目</h2>
          <div className="project-list">
            {siteData.moreProjects.map(([title, description]) => (
              <a href="/project/tianmu" key={title}>
                <strong>{title}</strong>
                <span>{description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell links-section">
        <div className="section-label">Links</div>
        <div className="content-main">
          <h2>联系方式</h2>
          <footer>
            <a href={`mailto:${siteData.contact.email}`}>{siteData.contact.email}</a>
            <a href={`tel:+86${siteData.contact.phone.replace(/\s/g, "")}`}>{siteData.contact.phone}</a>
            <p>{siteData.contact.copyright}</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
