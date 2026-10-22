// Validated, versioned demo persistence; storage failures never block the interface.

// ========================================
// VERSIONED DEMO STORAGE
// ========================================
export const TASK_KEY = "flowpilot.tasks.v1";
export const SESSION_KEY = "flowpilot.session.v1";
export function validTasks(value) {
  return (
    Array.isArray(value) &&
    value.length <= 500 &&
    new Set(value.map((t) => t?.id)).size === value.length &&
    value.every(
      (t) =>
        t &&
        typeof t.id === "string" &&
        t.id.length > 0 &&
        typeof t.title === "string" &&
        t.title.trim().length > 0 &&
        t.title.length <= 120 &&
        ["launch", "brand", "content"].includes(t.project) &&
        ["High", "Medium", "Low"].includes(t.priority) &&
        typeof t.done === "boolean",
    )
  );
}
export function readStored(key, fallback, validate) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const value = JSON.parse(raw);
    return validate(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
export function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
export function removeStored(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
// Annual plans apply an exact 20% discount; integer cents avoid rounding drift.
export function priceFor(monthly, yearly) {
  const monthlyCents = Math.round(monthly * 100);
  return {
    monthly: (yearly ? monthlyCents * 0.8 : monthlyCents) / 100,
    annual: Math.round(monthlyCents * 12 * 0.8) / 100,
  };
}
export function filterArticles(articles, query, category) {
  const term = query.trim().toLowerCase();
  return articles.filter(
    (a) =>
      (category === "All" || a.category === category) &&
      `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(term),
  );
}
