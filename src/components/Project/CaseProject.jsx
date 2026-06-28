import BackgroundVideo from "../shared/BackgroundVideo";

export default function CaseProject({ project }) {
  return (
    <>
      <BackgroundVideo src="/assets/hero-background.mp4" sourceType="video/mp4" />
      <main className="case-stage">
        <div className="case-image-stack" aria-label={project.ariaLabel}>
          <img src={project.image} alt={project.title} />
        </div>
      </main>
    </>
  );
}
