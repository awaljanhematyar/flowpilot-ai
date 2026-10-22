// Behavioral regression coverage for calculations, validation, persistence and full task CRUD.
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { articles, initialTasks, plans } from "../data/content";
import {
  filterArticles,
  priceFor,
  readStored,
  saveStored,
  SESSION_KEY,
  TASK_KEY,
  validTasks,
} from "../utils/storage";

describe("safe storage and pricing", () => {
  it("calculates yearly totals with exactly 20% savings", () => {
    for (const p of plans) {
      const v = priceFor(p.monthly, true);
      expect(v.annual).toBeCloseTo(p.monthly * 12 * 0.8);
      expect(v.monthly * 12).toBeCloseTo(v.annual);
    }
    expect(priceFor(15, true)).toEqual({ monthly: 12, annual: 144 });
    expect(priceFor(29, true)).toEqual({ monthly: 23.2, annual: 278.4 });
  });
  it("rejects corrupt JSON, duplicate IDs and invalid record fields", () => {
    localStorage.setItem(TASK_KEY, "{broken");
    expect(readStored(TASK_KEY, initialTasks, validTasks)).toEqual(
      initialTasks,
    );
    expect(validTasks([initialTasks[0], initialTasks[0]])).toBe(false);
    expect(validTasks([{ ...initialTasks[0], done: "true" }])).toBe(false);
    expect(validTasks([{ ...initialTasks[0], title: " " }])).toBe(false);
    expect(validTasks([{ ...initialTasks[0], project: "missing" }])).toBe(
      false,
    );
    expect(validTasks([])).toBe(true);
  });
  it("handles unavailable and full storage without throwing", () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });
    expect(saveStored(TASK_KEY, [])).toBe(false);
    spy.mockRestore();
  });
  it("has six unique reachable articles and combined search filters", () => {
    expect(articles).toHaveLength(6);
    expect(new Set(articles.map((a) => a.slug)).size).toBe(6);
    expect(filterArticles(articles, "  calmer  ", "Planning")).toHaveLength(1);
    expect(filterArticles(articles, "calmer", "Teamwork")).toHaveLength(0);
  });
});
function app(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}
describe("user journeys", () => {
  it("changes the billing display and annual total", async () => {
    const user = userEvent.setup({ delay: null });
    app("/pricing");
    await user.click(screen.getByRole("button", { name: /Yearly/ }));
    expect(
      screen.getByText("$144 USD billed yearly · save 20%"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("$278.4 USD billed yearly · save 20%"),
    ).toBeInTheDocument();
  });
  it("filters articles and recovers from empty results", async () => {
    const user = userEvent.setup({ delay: null });
    app("/resources");
    await user.type(screen.getByRole("searchbox"), "nothingmatches");
    expect(screen.getByText("No stories found.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });
  it("validates the contact form and reports simulated submission honestly", async () => {
    const user = userEvent.setup({ delay: null });
    app("/contact");
    await user.click(
      screen.getByRole("button", { name: /Try demo submission/ }),
    );
    expect(screen.getByText("Please add your name.")).toBeInTheDocument();
    await user.type(screen.getByLabelText(/Your name/), "Demo visitor");
    await user.type(screen.getByLabelText(/Email address/), "demo@example.com");
    await user.type(
      screen.getByLabelText(/What’s on your mind/),
      "This is a sample message.",
    );
    await user.click(
      screen.getByRole("button", { name: /Try demo submission/ }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "nothing was sent or saved",
    );
  });
  it("protects the demo route and enters without credentials", async () => {
    const user = userEvent.setup({ delay: null });
    app("/dashboard");
    expect(
      await screen.findByRole("button", { name: /Enter demo workspace/ }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /Enter demo workspace/ }),
    );
    expect(await screen.findByText(/Welcome, Jamie/)).toBeInTheDocument();
    expect(localStorage.getItem(SESSION_KEY)).toBe("true");
  });
  it("creates, edits, completes, persists and deletes a task, then logs out", async () => {
    localStorage.setItem(SESSION_KEY, "true");
    const user = userEvent.setup({ delay: null });
    app("/dashboard");
    await user.click(await screen.findByRole("button", { name: "New task" }));
    await user.type(
      screen.getByLabelText("Task title"),
      "Review final release",
    );
    await user.click(screen.getByRole("button", { name: "Create task" }));
    expect(
      screen.getByRole("button", { name: "Review final release" }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Edit Review final release" }),
    );
    await user.clear(screen.getByLabelText("Task title"));
    await user.type(
      screen.getByLabelText("Task title"),
      "Review verified release",
    );
    await user.click(screen.getByRole("button", { name: "Save changes" }));
    await user.click(
      screen.getByRole("checkbox", {
        name: "Mark Review verified release complete",
      }),
    );
    expect(
      JSON.parse(localStorage.getItem(TASK_KEY)).find(
        (t) => t.title === "Review verified release",
      ).done,
    ).toBe(true);
    await user.click(
      screen.getByRole("button", { name: "Delete Review verified release" }),
    );
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Delete task",
      }),
    );
    expect(
      screen.queryByRole("button", { name: "Review verified release" }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Leave demo" }));
    expect(
      screen.getByRole("button", { name: "Enter demo workspace" }),
    ).toBeInTheDocument();
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
  });
  it("renders unknown articles as a 404", () => {
    app("/resources/missing-story");
    expect(
      screen.getByRole("heading", { name: "Let’s find your way back." }),
    ).toBeInTheDocument();
  });
});
