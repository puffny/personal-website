import { useEffect } from "react";
import { siteData } from "../data/siteData";
import { useRevealInteractions } from "../hooks/useRevealInteractions";
import { useScrollEffects } from "../hooks/useScrollEffects";
import CaseProject from "../components/Project/CaseProject";
import ProjectDetail from "../components/Project/ProjectDetail";
import ProjectImageFeed from "../components/Project/ProjectImageFeed";
import SenbenProject from "../components/Project/SenbenProject";

export default function ProjectPage({ slug, navigate }) {
  const project = siteData.projects[slug];

  useEffect(() => {
    const isVisualCase = ["case", "senben", "feed"].includes(project?.type);
    document.body.className = isVisualCase ? "case-page" : "project-page";
    return () => {
      document.body.className = "";
    };
  }, [project]);

  useEffect(() => {
    const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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

  if (project.type === "case") {
    return <CaseProject project={project} onBack={handleCaseBack} />;
  }

  if (project.type === "senben") {
    return <SenbenProject project={project} onBack={handleCaseBack} />;
  }

  if (project.type === "feed") {
    return <ProjectImageFeed project={project} onBack={handleCaseBack} />;
  }

  return <ProjectDetail project={project} />;
}
