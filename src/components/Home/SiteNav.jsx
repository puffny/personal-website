export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="主导航">
      <span className="nav-indicator" aria-hidden="true" />
      <a className="nav-brand active" href="#home" aria-label="首页">
        <span className="nav-icon">
          <i className="ph-fill ph-house" />
        </span>
        <span className="nav-text">首页</span>
      </a>
      <div className="nav-links">
        <a href="#summary" aria-label="职业经历">
          <span className="nav-icon">
            <i className="ph-fill ph-briefcase" />
          </span>
          <span className="nav-text">职业经历</span>
        </a>
        <a href="#core" aria-label="核心能力">
          <span className="nav-icon">
            <i className="ph-fill ph-sparkle" />
          </span>
          <span className="nav-text">核心能力</span>
        </a>
        <a href="#works" aria-label="项目案例">
          <span className="nav-icon">
            <i className="ph-fill ph-squares-four" />
          </span>
          <span className="nav-text">项目案例</span>
        </a>
        <a href="#ai-lab" aria-label="AI工作流">
          <span className="nav-icon">
            <i className="ph-fill ph-cpu" />
          </span>
          <span className="nav-text">AI工作流</span>
        </a>
      </div>
    </nav>
  );
}
