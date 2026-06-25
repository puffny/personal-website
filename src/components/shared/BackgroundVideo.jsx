export default function BackgroundVideo({ src, sourceType }) {
  return (
    <div className="page-bg" aria-hidden="true">
      <video className="page-bg-video" src={sourceType ? undefined : src} autoPlay muted loop playsInline preload="auto">
        {sourceType ? <source src={src} type={sourceType} /> : null}
      </video>
    </div>
  );
}
