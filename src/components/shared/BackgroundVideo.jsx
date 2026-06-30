const blurredBackgroundSrc = "/assets/hero-background-blur.webp";

export default function BackgroundVideo({ src, sourceType, staticOnly = false, startStatic = false }) {
  const className = [
    "page-bg",
    staticOnly ? "page-bg-static" : "",
    startStatic ? "page-bg-start-static" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={className}
      style={{ "--static-bg": `url("${blurredBackgroundSrc}")` }}
      aria-hidden="true"
    >
      {staticOnly ? null : (
        <video
          className="page-bg-video"
          src={sourceType ? undefined : src}
          autoPlay={!startStatic}
          muted
          loop
          playsInline
          preload="auto"
        >
          {sourceType ? <source src={src} type={sourceType} /> : null}
        </video>
      )}
    </div>
  );
}
