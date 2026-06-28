import BackgroundVideo from "../shared/BackgroundVideo";

export default function ProjectImageFeed({ project }) {
  return (
    <>
      <BackgroundVideo src="/assets/hero-background.mp4" sourceType="video/mp4" />
      <main className="project-feed-page">
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
