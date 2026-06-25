export default function IntroLoader() {
  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="intro-black-cover">
        <svg className="intro-cover-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="intro-ux-window-mask">
              <rect width="1000" height="1000" fill="white" />
              <g className="intro-ux-scale">
                <text
                  className="intro-mask-ux"
                  x="500"
                  y="548"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                >
                  UX
                </text>
              </g>
            </mask>
          </defs>
          <rect width="1000" height="1000" fill="black" mask="url(#intro-ux-window-mask)" />
        </svg>
      </div>
      <div className="intro-loader-panel">
        <div className="intro-loader-row">
          <div className="intro-ui-icon" id="intro-ui-icon" />
          <div className="intro-percent" id="intro-percent">
            1%
          </div>
        </div>
        <div className="intro-loader-line">
          <span className="intro-loader-line-fill" id="intro-loader-line" />
        </div>
      </div>
    </div>
  );
}
