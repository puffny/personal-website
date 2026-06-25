import BackgroundVideo from "../shared/BackgroundVideo";

export default function ProjectImageFeed({ project, onBack }) {
  return (
    <>
      <BackgroundVideo src="/assets/hero-background.mp4" sourceType="video/mp4" />
      <main className="project-feed-page">
        <a className="case-back-link" href="/?restoreProjectScroll=1" aria-label="返回首页项目案例" onClick={onBack}>
          <i className="ph-fill ph-caret-left" aria-hidden="true" />
          <span>返回</span>
        </a>

        <section className="project-image-feed" aria-label={project.ariaLabel}>
          {project.feedImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${project.title} 案例页面 ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </section>
      </main>
    </>
  );
}
