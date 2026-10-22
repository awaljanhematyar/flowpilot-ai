// Static, non-interactive product illustration made from the same design language as the app.

// ========================================
// STATIC WORKSPACE PREVIEW
// ========================================
import {
  CheckCheck,
  Layers,
  ChartNoAxesCombined,
  Sparkles,
  ArrowUpRight,
  LayoutDashboard,
  Search,
  Bell,
  Check,
  ChevronDown,
  Plus,
} from "lucide-react";
import { TrendChart } from "./UI";
export default function DashboardPreview() {
  return (
    <div className="preview-wrap">
      <div className="preview-window">
        <div className="window-bar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>flowpilot / your workspace</span>
          <span className="window-live">● Interactive demo</span>
        </div>
        <div className="preview-body">
          <aside className="preview-sidebar" aria-hidden="true">
            <div className="mini-brand">
              <span>ϟ</span>flowpilot <small>AI</small>
            </div>
            <div className="workspace-chip">
              <span className="avatar small">S</span>Studio workspace
              <ChevronDown size={12} />
            </div>
            <span className="sidebar-label">WORKSPACE</span>
            {[
              [LayoutDashboard, "Overview"],
              [CheckCheck, "My tasks"],
              [Layers, "Projects"],
              [ChartNoAxesCombined, "Insights"],
              [Sparkles, "AI assistant"],
            ].map(([Icon, label], i) => (
              <div
                className={`preview-nav ${i === 0 ? "selected" : ""}`}
                key={label}
              >
                <Icon size={15} />
                {label}
                {label === "My tasks" && <small>6</small>}
              </div>
            ))}
            <div className="preview-sidebar-bottom">
              <span className="avatar small">JD</span>
              <div>
                Jamie Davis<small>Demo workspace</small>
              </div>
            </div>
          </aside>
          <div className="preview-main">
            <div className="preview-toolbar">
              <span>
                Workspace <span className="muted">/ Overview</span>
              </span>
              <div>
                <Search size={14} />
                <Bell size={14} />
                <span className="avatar small">JD</span>
              </div>
            </div>
            <div className="preview-content">
              <div className="preview-greeting">
                <div>
                  <p>YOUR SPACE TO DO GREAT THINGS</p>
                  <h3>
                    A little focus. A lot of possibility. <span>✦</span>
                  </h3>
                  <small>Let’s make room for what matters today.</small>
                </div>
                <span className="mini-button">
                  <Plus size={12} /> New task
                </span>
              </div>
              <div className="preview-stats">
                {[
                  ["Tasks completed", "12", "↑ 4 this week", CheckCheck],
                  ["Projects in motion", "3", "Moving forward", Layers],
                  [
                    "Focus score",
                    "86%",
                    "↑ Finding your rhythm",
                    ChartNoAxesCombined,
                  ],
                ].map(([label, value, note, Icon]) => (
                  <div key={label}>
                    <span>
                      {label}
                      <Icon size={15} />
                    </span>
                    <strong>{value}</strong>
                    <small>{note}</small>
                  </div>
                ))}
              </div>
              <div className="preview-middle">
                <div className="preview-chart">
                  <div className="card-title">
                    Your momentum{" "}
                    <span>
                      This week <ChevronDown size={10} />
                    </span>
                  </div>
                  <p>A little progress, every day.</p>
                  <TrendChart />
                </div>
                <div className="preview-ai">
                  <span className="icon-tile">
                    <Sparkles size={18} />
                  </span>
                  <h4>A clearer next step.</h4>
                  <p>
                    Start with one high-priority task. A small win can set the
                    tone for your day.
                  </p>
                  <span className="text-link">
                    Explore suggestions <ArrowUpRight size={12} />
                  </span>
                  <small>Predefined demo suggestion</small>
                </div>
              </div>
              <div className="preview-tasks">
                <div className="card-title">
                  Today’s priorities <span>View all tasks →</span>
                </div>
                {[
                  "Review landing page design",
                  "Write the product story",
                  "Finalize the color palette",
                ].map((t, i) => (
                  <div className="preview-task" key={t}>
                    <span
                      className={`fake-checkbox ${i === 2 ? "checked" : ""}`}
                    >
                      {i === 2 && <Check size={10} />}
                    </span>
                    <span>{t}</span>
                    <span
                      className={`priority priority-${i === 0 ? "high" : "medium"}`}
                    >
                      {i === 0 ? "High" : "Medium"}
                    </span>
                    <span className="preview-task-project">
                      {i === 1 ? "Content studio" : "Website launch"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="preview-caption">
        <span className="mint-dot" />A thoughtfully connected workspace
        <span>Illustrative demo data</span>
      </div>
    </div>
  );
}
