// Interactive local workspace, accessible task dialogs, and predefined planning scenarios.
import { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChartNoAxesCombined,
  Check,
  CheckCheck,
  ChevronRight,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Pencil,
  X,
  RotateCcw,
} from "lucide-react";
import { Brand, Button, Eyebrow, TrendChart } from "../components/UI";
import { projects, suggestions, initialTasks } from "../data/content";
import { useStoredTasks } from "../hooks/useStoredTasks";
import {
  readStored,
  saveStored,
  removeStored,
  SESSION_KEY,
} from "../utils/storage";
const hasSession = () => readStored(SESSION_KEY, false, (v) => v === true);

// ========================================
// PASSWORD-FREE DEMO ENTRY
// ========================================
export function DemoEntry({ signup = false }) {
  const navigate = useNavigate();
  function enter() {
    saveStored(SESSION_KEY, true);
    navigate("/dashboard", { state: { demo: true } });
  }
  return (
    <section className="entry-page">
      <div className="entry-story">
        <Eyebrow>A LITTLE SPACE FOR YOUR BIG IDEAS</Eyebrow>
        <h1>
          Your next chapter
          <br />
          starts with
          <br />
          <span>a clearer day.</span>
        </h1>
        <p>Bring your tasks, projects, and possibility together.</p>
        <div className="entry-art" aria-hidden="true">
          <span>
            <CheckCheck />A small win.
          </span>
          <span>
            <Layers />A bigger picture.
          </span>
          <span>
            <Sparkles />A fresh perspective.
          </span>
        </div>
        <small>Fictional product. Thoughtfully built.</small>
      </div>
      <div className="entry-form">
        <span className="icon-tile">
          <Sparkles />
        </span>
        <Eyebrow>
          {signup ? "MAKE YOURSELF AT HOME" : "WELCOME TO YOUR NEXT STEP"}
        </Eyebrow>
        <h2>{signup ? "Find your flow." : "A clearer workspace awaits."}</h2>
        <p>
          {signup
            ? "Explore a fresh perspective on getting things done."
            : "Step into the demo and pick up where you left off."}
        </p>
        <div className="entry-notice">
          <strong>A portfolio demo, open to explore.</strong>
          <p>
            No real account is created. No password, email, or payment
            information is needed. Access is simulated and is not secure
            authentication.
          </p>
        </div>
        <Button onClick={enter}>
          Enter demo workspace <ArrowRight size={17} />
        </Button>
        <p className="form-note">
          A demo-session flag and tasks may be saved in this browser. If storage
          is unavailable, the workspace still works for this visit.
        </p>
        <Link to={signup ? "/login" : "/signup"} className="text-link">
          {signup
            ? "Already explored? Try demo login"
            : "New here? Explore demo signup"}{" "}
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}

// Native modal dialogs provide focus containment, Escape dismissal, and focus return.
export function Modal({ title, children, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-inner">
        <div className="modal-heading">
          <h2 id="dialog-title">{title}</h2>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
function TaskEditor({ task, onSave, onClose }) {
  const [error, setError] = useState("");
  function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title").trim();
    if (!title) {
      setError("Give your task a clear title.");
      return;
    }
    onSave({
      id: task?.id || crypto.randomUUID(),
      title,
      project: form.get("project"),
      priority: form.get("priority"),
      done: task?.done || false,
    });
  }
  return (
    <Modal
      title={task ? "Edit your next step." : "Make room for a new task."}
      onClose={onClose}
    >
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            name="title"
            maxLength={120}
            defaultValue={task?.title}
            placeholder="What’s your next step?"
            required
            autoFocus
            aria-invalid={!!error}
            aria-describedby="task-hint"
          />
          <small id="task-hint">
            Maximum 120 characters. Avoid sensitive information.
          </small>
          {error && (
            <span className="field-error" role="alert">
              {error}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="task-project">Project</label>
          <select
            id="task-project"
            name="project"
            defaultValue={task?.project || "launch"}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            defaultValue={task?.priority || "Medium"}
          >
            {["High", "Medium", "Low"].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <Button secondary type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {task ? "Save changes" : "Create task"}
            <Check size={16} />
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ========================================
// DASHBOARD SHELL AND LOCAL TASK STATE
// ========================================
export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session] = useState(hasSession);
  const [params, setParams] = useSearchParams();
  const view = [
    "overview",
    "tasks",
    "projects",
    "insights",
    "assistant",
  ].includes(params.get("view"))
    ? params.get("view")
    : "overview";
  const { tasks, updateTasks, storageError } = useStoredTasks();
  const [mobile, setMobile] = useState(false);
  const [editor, setEditor] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [resetting, setResetting] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");
  const [scenario, setScenario] = useState("Prioritization");
  const [activity, setActivity] = useState([
    "Your demo workspace is ready.",
    "Sample projects and tasks added.",
    "A fresh perspective is waiting.",
  ]);
  const [status, setStatus] = useState("");
  const completed = tasks.filter((t) => t.done).length;
  const completion = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;
  function note(message) {
    setActivity((a) => [message, ...a].slice(0, 5));
    setStatus(message);
  }
  function go(next) {
    setParams({ view: next });
    setMobile(false);
  }
  function saveTask(task) {
    updateTasks(
      editor?.id
        ? tasks.map((t) => (t.id === task.id ? task : t))
        : [...tasks, task],
    );
    note(editor?.id ? "Task updated." : "A new task added.");
    setEditor(null);
  }
  function toggle(task) {
    updateTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
    );
    note(task.done ? "Task reopened." : "One more task completed.");
  }
  const visibleTasks = tasks.filter(
    (t) =>
      (filter === "All" ||
        (filter === "Completed"
          ? t.done
          : filter === "High priority"
            ? t.priority === "High" && !t.done
            : !t.done)) &&
      (projectFilter === "All" || t.project === projectFilter) &&
      t.title.toLowerCase().includes(query.toLowerCase().trim()),
  );
  // Storage can be blocked: an in-memory entry is accepted for this mounted route only.
  const fromEntry = location.state?.demo;
  if (!session && !fromEntry) return <Navigate to="/login" replace />;
  const nav = [
    [LayoutDashboard, "Overview", "overview"],
    [CheckCheck, "My tasks", "tasks"],
    [Layers, "Projects", "projects"],
    [ChartNoAxesCombined, "Insights", "insights"],
    [Sparkles, "AI assistant", "assistant"],
  ];
  function sidebar() {
    return (
      <>
        <Brand />
        <div className="workspace-chip">
          <span className="avatar">S</span>
          <div>
            Studio workspace<small>Personal demo</small>
          </div>
        </div>
        <span className="sidebar-label">YOUR WORKSPACE</span>
        <nav aria-label="Workspace navigation">
          {nav.map(([Icon, label, key]) => (
            <button
              key={key}
              className={view === key ? "active" : ""}
              aria-current={view === key ? "page" : undefined}
              onClick={() => go(key)}
            >
              <Icon size={19} />
              {label}
              {key === "tasks" && <small>{tasks.length}</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-demo">
            <Sparkles size={20} />
            <h3>A space to explore.</h3>
            <p>
              Fictional data. Real interactions.
              <br />
              No live AI or real account.
            </p>
            <Link to="/about#demo">
              About this demo <ArrowUpRight size={13} />
            </Link>
          </div>
          <button
            className="logout-button"
            onClick={() => {
              removeStored(SESSION_KEY);
              navigate("/login", { replace: true, state: null });
            }}
          >
            <LogOut size={18} />
            Leave demo
          </button>
          <div className="sidebar-profile">
            <span className="avatar">JD</span>
            <div>
              Jamie Davis<small>Demo persona</small>
            </div>
            <span className="mint-dot" />
          </div>
        </div>
      </>
    );
  }
  const title = nav.find((n) => n[2] === view)[1];
  return (
    <div className="dashboard-shell">
      <a href="#workspace-main" className="skip-link">
        Skip to workspace
      </a>
      <aside className="dashboard-sidebar">{sidebar()}</aside>
      {mobile && (
        <Modal title="Your workspace" onClose={() => setMobile(false)}>
          <div className="mobile-sidebar">{sidebar()}</div>
        </Modal>
      )}
      <div className="dashboard-area">
        <header className="dashboard-header">
          <div>
            <button
              className="icon-button dashboard-menu"
              aria-label="Open workspace navigation"
              onClick={() => setMobile(true)}
            >
              <Menu size={21} />
            </button>
            <span className="muted">Workspace</span>
            <ChevronRight size={14} />
            <span>{title}</span>
          </div>
          <div>
            <span className="demo-pill">
              <span className="mint-dot" />
              Demo session
            </span>
            <button
              className="icon-button notification-trigger"
              aria-label="View notifications"
              onClick={() => setNotifications(true)}
            >
              <Bell size={19} />
              <i />
            </button>
            <span className="avatar small">JD</span>
          </div>
        </header>
        <main id="workspace-main" className="dashboard-content" tabIndex={-1}>
          <div className="dashboard-welcome">
            <div>
              <Eyebrow>YOUR SPACE TO DO GREAT THINGS</Eyebrow>
              <h1>
                {view === "overview" ? (
                  <>
                    A little focus. A lot of possibility. <span>✦</span>
                  </>
                ) : view === "tasks" ? (
                  "One step at a time."
                ) : view === "projects" ? (
                  "Make room for the big picture."
                ) : view === "insights" ? (
                  "Your progress, in perspective."
                ) : (
                  "A fresh perspective awaits."
                )}
              </h1>
              <p>
                {view === "overview"
                  ? "Welcome, Jamie. Let’s make room for what matters today."
                  : "A thoughtfully simple workspace for your next chapter."}
              </p>
            </div>
            <Button
              onClick={() => setEditor({})}
              disabled={tasks.length >= 500}
            >
              <Plus size={17} />
              New task
            </Button>
          </div>
          <div className="dashboard-demo-note">
            Portfolio demo · tasks stay in this browser · no real authentication
            or live AI
          </div>
          {storageError && (
            <p className="error-message" role="alert">
              Browser storage is unavailable. Your changes work for this visit
              but may not survive a reload.
            </p>
          )}
          <span className="sr-only" role="status">
            {status}
          </span>
          {(view === "overview" || view === "insights") && (
            <div className="stat-grid">
              {[
                [
                  CheckCheck,
                  "Tasks completed",
                  completed,
                  `${tasks.length - completed} still to explore`,
                  "mint",
                ],
                [
                  Layers,
                  "Projects in motion",
                  projects.length,
                  "Room for your big ideas",
                  "purple",
                ],
                [
                  ChartNoAxesCombined,
                  "Completion rate",
                  `${completion}%`,
                  "Based on your local tasks",
                  "peach",
                ],
                [
                  Sparkles,
                  "Planning scenarios",
                  "4",
                  "Predefined, never live AI",
                  "purple",
                ],
              ].map(([Icon, label, value, note, color]) => (
                <article className="stat-card" key={label}>
                  <div>
                    <span>{label}</span>
                    <span className={`icon-tile ${color}`}>
                      <Icon size={19} />
                    </span>
                  </div>
                  <strong>{value}</strong>
                  <small>{note}</small>
                </article>
              ))}
            </div>
          )}
          {(view === "overview" || view === "insights") && (
            <div className="dashboard-middle">
              <section className="panel momentum">
                <div className="panel-heading">
                  <div>
                    <h2>Your momentum</h2>
                    <p>A little progress, every day.</p>
                  </div>
                  <span className="demo-pill">Sample week</span>
                </div>
                <TrendChart large />
                <div className="chart-footer">
                  <span className="purple-dot" />
                  Illustrative productivity data · not live tracking
                </div>
              </section>
              <section className="assistant-card">
                <span className="icon-tile">
                  <Sparkles size={22} />
                </span>
                <span className="assistant-label">
                  A LITTLE HELP FINDING YOUR FLOW
                </span>
                <h2>{suggestions[scenario].title}</h2>
                <p>{suggestions[scenario].text}</p>
                <button className="text-link" onClick={() => go("assistant")}>
                  Explore suggestions <ArrowUpRight size={16} />
                </button>
                <small>
                  Predefined demo suggestion — not generated by live AI.
                </small>
              </section>
            </div>
          )}
          {(view === "overview" || view === "tasks") && (
            <section className="panel task-panel">
              <div className="panel-heading">
                <div>
                  <h2>
                    {view === "overview" ? "Your next steps" : "Your tasks"}
                  </h2>
                  <p>A little structure for the things that matter.</p>
                </div>
                {view === "overview" && (
                  <button className="text-link" onClick={() => go("tasks")}>
                    View all tasks <ArrowRight size={15} />
                  </button>
                )}
              </div>
              <div className="task-controls">
                <div
                  className="task-tabs"
                  role="group"
                  aria-label="Task status"
                >
                  {["All", "To do", "Completed", "High priority"].map((f) => (
                    <button
                      key={f}
                      aria-pressed={filter === f}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <label className="search-field">
                  <Search size={15} />
                  <span className="sr-only">Search tasks</span>
                  <input
                    placeholder="Find a task…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <label className="project-filter">
                  <span className="sr-only">Filter by project</span>
                  <select
                    value={projectFilter}
                    onChange={(e) => setProjectFilter(e.target.value)}
                  >
                    <option value="All">All projects</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="task-list">
                {visibleTasks.length ? (
                  visibleTasks.map((task) => (
                    <article
                      className={`task-row ${task.done ? "is-done" : ""}`}
                      key={task.id}
                    >
                      <label className="task-check">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggle(task)}
                          aria-label={`Mark ${task.title} ${task.done ? "incomplete" : "complete"}`}
                        />
                        <span>
                          <Check size={12} />
                        </span>
                      </label>
                      <button
                        className="task-title"
                        onClick={() => setEditor(task)}
                      >
                        {task.title}
                      </button>
                      <span className="task-project">
                        <i
                          className={
                            projects.find((p) => p.id === task.project).color
                          }
                        />
                        {projects.find((p) => p.id === task.project).name}
                      </span>
                      <span
                        className={`priority priority-${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                      <div className="task-actions">
                        <button
                          className="icon-button"
                          aria-label={`Edit ${task.title}`}
                          onClick={() => setEditor(task)}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          className="icon-button"
                          aria-label={`Delete ${task.title}`}
                          onClick={() => setDeleting(task)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="empty-state">
                    <CheckCheck />
                    <h3>A little breathing room.</h3>
                    <p>
                      {tasks.length
                        ? "No tasks match these filters."
                        : "Your list is clear. Add your first next step."}
                    </p>
                    <Button
                      secondary
                      onClick={() => {
                        setQuery("");
                        setFilter("All");
                        setProjectFilter("All");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
              <div className="task-list-footer">
                <span>
                  {visibleTasks.length} of {tasks.length} tasks · {completed}{" "}
                  completed
                </span>
                <button
                  className="text-link"
                  onClick={() => setResetting(true)}
                >
                  <RotateCcw size={13} />
                  Demo data options
                </button>
              </div>
            </section>
          )}
          {(view === "overview" || view === "projects") && (
            <section className="projects-section">
              <div className="panel-heading">
                <div>
                  <h2>Ideas in motion</h2>
                  <p>The bigger picture, one project at a time.</p>
                </div>
              </div>
              <div className="project-grid">
                {projects.map((project) => {
                  const related = tasks.filter((t) => t.project === project.id);
                  const count = related.filter((t) => t.done).length;
                  const percent = related.length
                    ? Math.round((count / related.length) * 100)
                    : 0;
                  return (
                    <article className="project-card" key={project.id}>
                      <div>
                        <span className={`project-initial ${project.color}`}>
                          {project.initial}
                        </span>
                        <span
                          className={`project-status ${percent === 100 ? "complete" : ""}`}
                        >
                          {percent === 100 ? "Complete" : "In progress"}
                        </span>
                      </div>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="progress-label">
                        <span>
                          {count} / {related.length} tasks
                        </span>
                        <strong>{percent}%</strong>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: `${percent}%` }} />
                      </div>
                      <div className="project-bottom">
                        <span>
                          Due{" "}
                          {new Date(
                            `${project.due}T12:00:00`,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <button
                          aria-label={`View tasks for ${project.name}`}
                          onClick={() => {
                            setProjectFilter(project.id);
                            setFilter("All");
                            setQuery("");
                            go("tasks");
                          }}
                        >
                          <ArrowUpRight size={17} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
          {view === "assistant" && (
            <section className="assistant-workspace">
              <div
                className="scenario-tabs"
                role="group"
                aria-label="Planning scenario"
              >
                {Object.keys(suggestions).map((s) => (
                  <button
                    key={s}
                    aria-pressed={scenario === s}
                    onClick={() => setScenario(s)}
                  >
                    <Sparkles size={17} />
                    {s}
                  </button>
                ))}
              </div>
              <div className="assistant-card expanded" aria-live="polite">
                <span className="icon-tile">
                  <Sparkles size={30} />
                </span>
                <Eyebrow>AN IDEA TO MAKE YOUR OWN</Eyebrow>
                <h2>{suggestions[scenario].title}</h2>
                <p>{suggestions[scenario].text}</p>
                <small>
                  Predefined demo suggestion — not generated by live AI.
                </small>
              </div>
              <p className="form-note">
                These static examples do not analyze your tasks or send
                information to an AI service.
              </p>
            </section>
          )}
          {view === "overview" && (
            <section className="panel activity-panel">
              <div className="panel-heading">
                <div>
                  <h2>A little progress, recorded.</h2>
                  <p>Recent activity from this visit.</p>
                </div>
              </div>
              {activity.map((a, i) => (
                <div className="activity-row" key={`${a}-${i}`}>
                  <span className="activity-icon">
                    <Check size={14} />
                  </span>
                  <span>{a}</span>
                  <small>{i === 0 ? "Latest" : "This visit"}</small>
                </div>
              ))}
            </section>
          )}
          <footer className="dashboard-footer">
            <span>A little clarity. A lot of possibility.</span>
            <Link to="/">
              Back to the website <ArrowUpRight size={13} />
            </Link>
          </footer>
        </main>
      </div>
      {editor && (
        <TaskEditor
          task={editor.id ? editor : null}
          onSave={saveTask}
          onClose={() => setEditor(null)}
        />
      )}
      {deleting && (
        <Modal title="Let this task go?" onClose={() => setDeleting(null)}>
          <p>
            Delete “{deleting.title}”? This removes it from your local task
            list.
          </p>
          <div className="modal-actions">
            <Button secondary onClick={() => setDeleting(null)}>
              Keep task
            </Button>
            <Button
              className="danger"
              onClick={() => {
                updateTasks(tasks.filter((t) => t.id !== deleting.id));
                note("Task deleted.");
                setDeleting(null);
              }}
            >
              Delete task
            </Button>
          </div>
        </Modal>
      )}
      {resetting && (
        <Modal
          title="A fresh start, your way."
          onClose={() => setResetting(false)}
        >
          <p>
            These options only affect FlowPilot tasks in this browser. Your
            other browser data stays untouched.
          </p>
          <div className="data-actions">
            <Button
              secondary
              onClick={() => {
                updateTasks(initialTasks);
                note("Sample tasks restored.");
                setResetting(false);
              }}
            >
              Restore sample tasks
            </Button>
            <Button
              className="danger"
              onClick={() => {
                updateTasks([]);
                note("All local tasks cleared.");
                setResetting(false);
              }}
            >
              Clear all tasks
            </Button>
          </div>
        </Modal>
      )}
      {notifications && (
        <Modal title="A little update." onClose={() => setNotifications(false)}>
          <div className="notification-list">
            <p>
              <span className="mint-dot" />
              Your demo workspace is ready to explore.
            </p>
            <p>
              <span className="purple-dot" />
              Four predefined planning scenarios are available.
            </p>
            <p>
              <span className="purple-dot" />
              Task changes stay local to this browser.
            </p>
          </div>
          <small>
            Static demo notifications. No external services are connected.
          </small>
        </Modal>
      )}
    </div>
  );
}
