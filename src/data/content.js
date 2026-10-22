// Original fictional workspace records and editorial content for the portfolio demo.
export const projects = [
  {
    id: "launch",
    name: "Website launch",
    initial: "W",
    color: "purple",
    due: "2026-11-06",
    description: "A clearer home for our next big idea.",
  },
  {
    id: "brand",
    name: "Brand refresh",
    initial: "B",
    color: "mint",
    due: "2026-11-12",
    description: "Bring the new visual identity to life.",
  },
  {
    id: "content",
    name: "Content studio",
    initial: "C",
    color: "peach",
    due: "2026-11-18",
    description: "Useful stories, thoughtfully delivered.",
  },
];
export const initialTasks = [
  {
    id: "t1",
    title: "Explore homepage concepts",
    project: "launch",
    priority: "High",
    done: true,
  },
  {
    id: "t2",
    title: "Review landing page design",
    project: "launch",
    priority: "High",
    done: false,
  },
  {
    id: "t3",
    title: "Write the product story",
    project: "content",
    priority: "Medium",
    done: false,
  },
  {
    id: "t4",
    title: "Finalize the color palette",
    project: "brand",
    priority: "Medium",
    done: true,
  },
  {
    id: "t5",
    title: "Prepare launch checklist",
    project: "launch",
    priority: "Low",
    done: false,
  },
  {
    id: "t6",
    title: "Plan next week’s content",
    project: "content",
    priority: "Low",
    done: false,
  },
];
export const features = [
  {
    icon: "tasks",
    label: "A little less scattered.",
    title: "Everything on your list. In its place.",
    text: "Capture the next step, set a priority, and give every task a home. Spend less energy remembering and more energy doing.",
  },
  {
    icon: "projects",
    label: "See the bigger picture.",
    title: "Make room for your best work.",
    text: "Connect everyday tasks to meaningful projects. Clear progress and simple status updates keep the whole picture in view.",
  },
  {
    icon: "insights",
    label: "Progress you can feel.",
    title: "Find your rhythm. Keep your momentum.",
    text: "Turn a busy week into an understandable story with lightweight activity charts and completion insights.",
  },
  {
    icon: "sparkles",
    label: "A fresh perspective.",
    title: "Get a gentle nudge in the right direction.",
    text: "Explore predefined planning suggestions for prioritization, weekly planning, focus, and workflow organization. No live AI is involved.",
  },
];
export const plans = [
  {
    name: "Starter",
    monthly: 0,
    text: "A little structure for your big ideas.",
    items: [
      "Personal task workspace",
      "3 illustrative projects",
      "Basic productivity overview",
      "Predefined planning suggestions",
    ],
  },
  {
    name: "Pro",
    monthly: 15,
    text: "More clarity for your everyday flow.",
    items: [
      "Everything in Starter",
      "Unlimited project concept",
      "Advanced insights concept",
      "Priority planning scenarios",
    ],
  },
  {
    name: "Business",
    monthly: 29,
    text: "A shared vision for growing teams.",
    items: [
      "Everything in Pro",
      "Team workspace concept",
      "Workflow reporting concept",
      "Shared planning concept",
    ],
  },
];
export const suggestions = {
  Prioritization: {
    title: "Make space for what matters.",
    text: "Start with one high-priority task. Break it into a next action you can finish in a single focus session. Leave lower-priority work for later.",
  },
  "Weekly planning": {
    title: "Give the week a clear direction.",
    text: "Choose three outcomes for the week. Reserve time for the most demanding one first, and keep a little room for the unexpected.",
  },
  Focus: {
    title: "Protect a small pocket of focus.",
    text: "Try one distraction-free session with a specific goal. Silence notifications, close unused tabs, and take a short break when you finish.",
  },
  Organization: {
    title: "A lighter list starts here.",
    text: "Group related tasks under a project. Give each task a concrete verb and one clear finish line. Archive work that is no longer relevant.",
  },
};

// ========================================
// ORIGINAL RESOURCE LIBRARY
// ========================================
export const articles = [
  {
    slug: "a-calmer-week",
    category: "Planning",
    title: "A calmer week starts with a smaller plan.",
    excerpt:
      "A practical weekly ritual that makes room for meaningful work, and for life.",
    minutes: 4,
    art: "plan",
    sections: [
      [
        "Start with capacity, not ambition",
        "Before writing a list, look at the time you actually have. Meetings, maintenance, and personal commitments all count. A useful plan reflects those constraints instead of asking you to ignore them. Reserve some open time so one unexpected request does not unravel the entire week.",
      ],
      [
        "Choose three outcomes",
        "Write down three things that would make the week worthwhile. Describe outcomes rather than broad intentions: a reviewed homepage draft is more actionable than “work on the website.” Put the most demanding outcome into your calendar while your schedule still has room.",
      ],
      [
        "Define the next visible step",
        "Each outcome needs a first action small enough to begin without another planning session. Gather five reference pages, outline the first section, or send one question to a collaborator. Reduce the distance between deciding and starting.",
      ],
      [
        "Close the loop on Friday",
        "Spend ten minutes comparing your plan with what happened. Move unfinished work deliberately, remove work that no longer matters, and record one change for next week. The purpose is to learn about your capacity, not to judge your worth by a list.",
      ],
    ],
  },
  {
    slug: "tasks-that-move",
    category: "Productivity",
    title: "Write tasks that actually move work forward.",
    excerpt:
      "Trade vague reminders for small, clear actions you can confidently finish.",
    minutes: 3,
    art: "tasks",
    sections: [
      [
        "Use an action verb",
        "“Website” is a subject, not a task. “Review the mobile navigation” tells you what to do. Start with a verb that points to visible work: draft, review, compare, send, or test. When you return to the list tomorrow, you should not need to reconstruct your original intention.",
      ],
      [
        "Give the task a finish line",
        "A task becomes easier to complete when you can explain what done means. A draft might be done when it contains an introduction and three sections. A review might be done when you have written feedback on the primary flow. Match the finish line to the amount of time you have.",
      ],
      [
        "Separate work from waiting",
        "If you need someone else’s response, record the question and who needs to answer it. Do not let a blocked task quietly compete with work you can begin. Review waiting items regularly and follow up when appropriate.",
      ],
      [
        "Keep the list useful",
        "A task list is a working tool. Remove stale ideas, split oversized items, and revise unclear titles. A short list you trust is more useful than an exhaustive archive of every possibility.",
      ],
    ],
  },
  {
    slug: "project-progress",
    category: "Teamwork",
    title: "Project visibility without another status meeting.",
    excerpt:
      "Build a shared picture of progress with less noise and more context.",
    minutes: 4,
    art: "projects",
    sections: [
      [
        "Agree on a destination",
        "Before tracking progress, describe the result you are working toward. Make scope and the meaning of completion explicit. A shared destination helps people interpret task updates and ask better questions when priorities shift.",
      ],
      [
        "Show decisions alongside activity",
        "A long list of completed tasks does not explain why a project changed direction. Pair a concise update with the decision behind it, the current risk, and the next step. This gives collaborators context without requiring everyone to attend another meeting.",
      ],
      [
        "Treat percentages carefully",
        "Task completion can be a useful signal, but tasks do not all require equal effort. A project with one difficult unresolved dependency may be less predictable than a high percentage suggests. Use progress as a conversation starter rather than a guarantee.",
      ],
      [
        "Create a dependable cadence",
        "Choose a lightweight update rhythm that fits the project. Keep the format consistent so people know where to look. If an issue needs discussion, use a conversation; written updates support collaboration rather than replacing it.",
      ],
    ],
  },
  {
    slug: "protect-focus",
    category: "Productivity",
    title: "Build a focus ritual you can actually keep.",
    excerpt:
      "A small, repeatable routine for finding your way into demanding work.",
    minutes: 3,
    art: "focus",
    sections: [
      [
        "Make starting easier",
        "Choose one task and put the relevant materials within reach. Close unrelated tabs and write down the first action. A focus ritual works best when it removes decisions rather than adding a complicated routine before the work.",
      ],
      [
        "Choose a realistic window",
        "You do not need a perfect uninterrupted morning. Start with a block that suits your circumstances. Tell collaborators when you will be available again, and leave a way to reach you for genuinely urgent issues.",
      ],
      [
        "Capture distractions",
        "When an unrelated thought appears, write it on a separate list and return to the task. This gives the thought a place without turning it into an immediate obligation. Review the list after the session.",
      ],
      [
        "End with a breadcrumb",
        "Before stopping, write a sentence about where you are and what comes next. A clear restart point makes the next session easier. Adjust the ritual when your needs change; consistency does not require rigidity.",
      ],
    ],
  },
  {
    slug: "ai-with-intention",
    category: "AI & Work",
    title: "Use AI-style prompts with a human point of view.",
    excerpt:
      "Keep your judgment at the center of planning tools and suggestions.",
    minutes: 4,
    art: "ai",
    sections: [
      [
        "Begin with your own context",
        "A planning suggestion is only useful when it fits the work in front of you. State the goal, the constraints, and the decision you need to make. Avoid sharing sensitive information with tools that are not approved for that information.",
      ],
      [
        "Ask for alternatives",
        "Instead of asking for one perfect plan, consider several approaches. Compare their tradeoffs against your capacity and obligations. A suggestion can help you notice an option, but you remain responsible for choosing and checking it.",
      ],
      [
        "Check the limits",
        "Fluent wording is not evidence of accuracy. Verify factual claims with appropriate sources and involve qualified people when the decision requires expertise. FlowPilot AI uses predefined demo suggestions, not a live model, so its examples cannot adapt to your circumstances.",
      ],
      [
        "Keep what helps",
        "Use a suggestion as a draft you can edit. Remove irrelevant steps, question assumptions, and keep the parts that clarify your next action. The goal is better judgment and clearer work, not automatic agreement with a tool.",
      ],
    ],
  },
  {
    slug: "simple-workflows",
    category: "Teamwork",
    title: "The best workflow might be the simplest one.",
    excerpt:
      "Three understandable states can bring surprising clarity to a busy project.",
    minutes: 3,
    art: "workflow",
    sections: [
      [
        "Start with three states",
        "To do, in progress, and done are often enough for a small project. Add another state only when it communicates a decision people actually need to make. Complexity should earn its place.",
      ],
      [
        "Limit simultaneous work",
        "Starting everything can make it hard to finish anything. Discuss a sensible limit for active tasks and finish or unblock existing work before taking on more. The limit should reflect your team’s needs rather than an arbitrary target.",
      ],
      [
        "Make handoffs explicit",
        "Write down who needs to review the work and what they should check. A handoff is easier when the recipient can understand the context, find the materials, and identify the expected next action.",
      ],
      [
        "Review the friction",
        "When tasks repeatedly get stuck, ask what makes the transition difficult. A missing decision, unclear ownership, or oversized task often needs attention more than another tool. Change one thing at a time and observe whether it helps.",
      ],
    ],
  },
];
