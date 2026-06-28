export default function CaseBackLink({ onBack }) {
  return (
    <a
      className="case-back-link"
      href="/?restoreProjectScroll=1"
      aria-label="返回首页项目案例"
      onClick={onBack}
    >
      <i className="ph-fill ph-caret-left" aria-hidden="true" />
      <span>返回</span>
    </a>
  );
}
