import { useEffect } from "react";
import { siteData } from "../data/siteData";
import { useRevealInteractions } from "../hooks/useRevealInteractions";
import { useScrollEffects } from "../hooks/useScrollEffects";
import { scrollPageToTop } from "../utils/pageScroll";
import CaseBackLink from "../components/Project/CaseBackLink";
import CaseProject from "../components/Project/CaseProject";
import ProjectDetail from "../components/Project/ProjectDetail";
import ProjectBackToTop from "../components/Project/ProjectBackToTop";
import ProjectImageFeed from "../components/Project/ProjectImageFeed";
import ProjectReadingProgress from "../components/Project/ProjectReadingProgress";
import SenbenProject from "../components/Project/SenbenProject";

export default function ProjectPage({ slug, navigate }) {
  const project = siteData.projects[slug];
  const isVisualCase = ["case", "senben", "feed"].includes(project?.type);

  useEffect(() => {
    document.body.className = isVisualCase ? "case-page" : "project-page";
    return () => {
      document.body.className = "";
    };
  }, [project]);

  useEffect(() => {
    const scrollTop = () => scrollPageToTop();
    scrollTop();
    const frameId = requestAnimationFrame(scrollTop);
    const timerId = window.setTimeout(scrollTop, 80);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timerId);
    };
  }, [slug]);

  useRevealInteractions();
  useScrollEffects([]);

  if (!project) {
    return (
      <main className="project-layout">
        <article>
          <h1>项目未找到</h1>
          <p>请返回首页重新选择项目。</p>
          <a className="back-link" href="/">
            返回首页
          </a>
        </article>
      </main>
    );
  }

  const handleCaseBack = (event) => {
    event.preventDefault();
    navigate("/?restoreProjectScroll=1");
  };

  let content;
  if (project.type === "case") {
    content = <CaseProject project={project} onBack={handleCaseBack} />;
  } else if (project.type === "senben") {
    content = <SenbenProject project={project} onBack={handleCaseBack} />;
  } else if (project.type === "feed") {
    content = <ProjectImageFeed project={project} onBack={handleCaseBack} />;
  } else {
    content = <ProjectDetail project={project} />;
  }

  return (
    <>
      <ProjectReadingProgress />
      {isVisualCase ? <CaseBackLink onBack={handleCaseBack} /> : null}
      {content}
      <ProjectBackToTop variant={project.type === "feed" ? "feed" : undefined} />
    </>
  );
}
