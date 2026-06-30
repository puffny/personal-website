import { siteData } from "../../data/siteData";

export default function SelectedWorksSection() {
  const { selectedWorks } = siteData;

  return (
    <section className="content-shell selected-works-section" id="works">
      <div className="content-main">
        <div className="selected-works-head">
          <p className="selected-works-eyebrow">
            <span aria-hidden="true" />
            {selectedWorks.eyebrow}
          </p>
          <h2>{selectedWorks.title}</h2>
        </div>
        <div className="selected-works-list">
          {selectedWorks.items.map((work) => {
            const title = work.displayTitle || work.title;
            const description = work.displayDescription || work.description;
            const tags = work.displayTags || work.tags;

            return (
              <article className="selected-work-card" key={work.slug}>
                <a
                  className="selected-work-visual-link"
                  href={`/project/${work.slug}`}
                  aria-label={`View ${title} project`}
                >
                  <span className="selected-work-visual">
                    <span className="selected-work-parallax-layer">
                      <img src={work.image} alt={work.imageAlt} width="1000" height="1000" loading="eager" />
                    </span>
                  </span>
                </a>
                <div className="selected-work-copy">
                  <div className="selected-work-main">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    {work.metrics && !work.result ? (
                      <div
                        className="selected-work-metrics"
                        aria-label={`${title} project metrics`}
                      >
                        {work.metrics.map((metric) => (
                          <div
                            className="selected-work-metric"
                            key={`${work.slug}-${metric.value || metric.label}`}
                          >
                            {metric.value ? (
                              <strong>{metric.value}</strong>
                            ) : null}
                            <span>{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {tags ? (
                      <div
                        className="selected-work-tags"
                        aria-label={`${title} project tags`}
                      >
                        {tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {work.result ? (
                    <p className="selected-work-result">{work.result}</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
