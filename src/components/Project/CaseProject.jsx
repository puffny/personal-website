import BackgroundVideo from "../shared/BackgroundVideo";

export default function CaseProject({ project, onBack }) {
  return (
    <>
      <BackgroundVideo src="/assets/hero-background.mp4" sourceType="video/mp4" />
      <main className="case-stage">
        <a className="case-back-link" href="/?restoreProjectScroll=1" aria-label="返回首页项目案例" onClick={onBack}>
          <i className="ph-fill ph-caret-left" aria-hidden="true" />
          <span>返回</span>
        </a>

        <div className="case-image-stack" aria-label={project.ariaLabel}>
          <img src={project.image} alt={project.title} />
        </div>
      </main>
    </>
  );
}
