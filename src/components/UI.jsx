// Shared brand, button, heading, illustration and chart primitives.
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCheck,
  Layers,
  ChartNoAxesCombined,
  Check,
  Zap,
} from "lucide-react";
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="FlowPilot AI home">
      <span className="brand-symbol">
        <Zap size={22} fill="currentColor" />
      </span>
      flowpilot<span className="brand-ai">AI</span>
    </Link>
  );
}
export function Button({
  to,
  children,
  secondary = false,
  className = "",
  ...props
}) {
  const classes = `button ${secondary ? "button-secondary" : ""} ${className}`;
  return to ? (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  ) : (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
export function Eyebrow({ children }) {
  return (
    <span className="eyebrow">
      <span />
      {children}
    </span>
  );
}
export function Heading({ eyebrow, title, text, center = false }) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export const icons = {
  tasks: CheckCheck,
  projects: Layers,
  insights: ChartNoAxesCombined,
  sparkles: Sparkles,
};
export function FeatureCards({ compact = false }) {
  const descriptions = [
    [
      "tasks",
      "Less busywork. More doing.",
      "Keep your next steps clear with simple, flexible task management.",
    ],
    [
      "projects",
      "Big ideas, beautifully organized.",
      "Bring tasks and projects together in one calm workspace.",
    ],
    [
      "insights",
      "Your progress, in perspective.",
      "See what’s moving forward and where to focus next.",
    ],
  ];
  return (
    <div className={`feature-grid ${compact ? "compact" : ""}`}>
      {descriptions.map(([icon, title, text]) => {
        const Icon = icons[icon];
        return (
          <article className="feature-card" key={title}>
            <span className={`icon-tile ${icon}`}>
              <Icon size={23} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <Link to="/features" className="text-link">
              Explore feature <ArrowUpRight size={16} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
export function CTA() {
  return (
    <section className="container">
      <div className="final-cta">
        <span className="spark-orbit">
          <Sparkles size={30} />
        </span>
        <Eyebrow>YOUR NEXT CHAPTER, LESS CHAOTIC</Eyebrow>
        <h2>
          Good work starts
          <br />
          with a clearer mind.
        </h2>
        <p>Find your focus. Make a little space. Move forward.</p>
        <Button to="/signup">
          Find your flow <ArrowRight size={17} />
        </Button>
        <small>Free portfolio demo. No password or credit card.</small>
      </div>
    </section>
  );
}
export function TrendChart({ large = false }) {
  return (
    <div className={`trend-chart ${large ? "large" : ""}`}>
      <div className="chart-labels">
        <span>100%</span>
        <span>50%</span>
        <span>0%</span>
      </div>
      <div className="chart-drawing">
        <svg
          viewBox="0 0 500 160"
          role="img"
          aria-label="Fictional weekly productivity: Monday 35%, Tuesday 48%, Wednesday 40%, Thursday 68%, Friday 62%, Saturday 82%, Sunday 90%"
        >
          <defs>
            <linearGradient
              id={large ? "area-large" : "area"}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop stopColor="#635BFF" stopOpacity=".18" />
              <stop offset="1" stopColor="#635BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 20H500M0 80H500M0 140H500"
            stroke="#eaecf0"
            strokeDasharray="4 4"
          />
          <path
            d="M0 115C35 115 40 70 82 80S125 115 165 98S210 40 248 52S294 80 330 60S375 30 415 35S465 20 500 10V160H0Z"
            fill={`url(#${large ? "area-large" : "area"})`}
          />
          <path
            d="M0 115C35 115 40 70 82 80S125 115 165 98S210 40 248 52S294 80 330 60S375 30 415 35S465 20 500 10"
            fill="none"
            stroke="#635BFF"
            strokeWidth="3"
          />
        </svg>
        <div className="weekdays">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
export function ArticleArt({ variant = "plan" }) {
  return (
    <div className={`article-art art-${variant}`} aria-hidden="true">
      <div className="art-orbit" />
      <div className="art-paper">
        <span className="art-line" />
        <span className="art-line short" />
        <div className="art-check">
          <Check size={16} />
          <i />
        </div>
        <div className="art-check">
          <Check size={16} />
          <i />
        </div>
        <div className="art-check">
          <Check size={16} />
          <i />
        </div>
      </div>
      <span className="art-sticker">
        <Sparkles size={24} />
      </span>
    </div>
  );
}
