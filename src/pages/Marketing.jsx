// Marketing pages, original educational resources and honest demo forms.
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Check,
  Sparkles,
  Search,
  ChevronDown,
  CheckCheck,
  Layers,
  ChartNoAxesCombined,
  Compass,
  ShieldCheck,
  Coffee,
} from "lucide-react";
import {
  Button,
  Eyebrow,
  Heading,
  FeatureCards,
  CTA,
  ArticleArt,
  icons,
} from "../components/UI";
import DashboardPreview from "../components/DashboardPreview";
import { articles, features, plans } from "../data/content";
import { filterArticles, priceFor } from "../utils/storage";

// ========================================
// HOMEPAGE AND PRODUCT STORY
// ========================================
export function Home() {
  return (
    <>
      <section className="hero container">
        <Link to="/about#demo" className="announcement">
          <span className="announcement-new">MEET YOUR NEW FLOW</span>A little
          clarity changes everything.
          <ArrowUpRight size={14} />
        </Link>
        <h1>
          Less busywork.
          <br />
          More{" "}
          <span className="hero-emphasis">
            possibility.
            <svg viewBox="0 0 430 20" aria-hidden="true">
              <path
                d="M3 14Q200-2 425 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <p>
          Your ideas deserve room to grow. Bring your tasks, projects,
          <br className="desktop-break" /> and next big thing together in one
          beautifully calm workspace.
        </p>
        <div className="hero-actions">
          <Button to="/signup">
            Find your flow <ArrowRight size={17} />
          </Button>
          <Button to="/login" secondary>
            <span className="play-circle">
              <Play size={12} fill="currentColor" />
            </span>
            Explore the demo
          </Button>
        </div>
        <div className="hero-perks">
          <span>
            <Check size={14} /> No credit card
          </span>
          <span>
            <Check size={14} /> No password
          </span>
          <span>
            <Check size={14} /> Just possibilities
          </span>
        </div>
        <div className="hero-decoration decor-left" aria-hidden="true">
          ✳
        </div>
        <div className="hero-decoration decor-right" aria-hidden="true">
          ✧
        </div>
      </section>
      <section
        className="container product-stage"
        aria-label="Workspace preview"
      >
        <DashboardPreview />
      </section>
      <section className="for-teams container">
        <span>BUILT FOR THE WAY YOU THINK</span>
        <div>
          <span>
            <Compass />
            Independent thinkers
          </span>
          <span>
            <Layers />
            Small but mighty teams
          </span>
          <span>
            <Coffee />
            Big-idea freelancers
          </span>
          <span>
            <Sparkles />
            What’s next
          </span>
        </div>
        <p>
          A fictional product, built as a real interactive portfolio experience.
        </p>
      </section>
      <section className="section container">
        <Heading
          eyebrow="A CLEARER KIND OF PRODUCTIVITY"
          title={
            <>
              Less juggling.
              <br />
              More getting somewhere.
            </>
          }
          text="Your best work doesn’t need more tabs. It needs a little breathing room."
        />
        <FeatureCards />
      </section>
      <section className="workflow-section">
        <div className="container workflow-grid">
          <div>
            <Heading
              eyebrow="FROM SCATTERED TO STARTED"
              title={
                <>
                  Big plans.
                  <br />
                  Small, simple steps.
                </>
              }
              text="A workspace that meets you where you are, then helps you move forward."
            />
            <Button to="/how-it-works" secondary>
              See how it works <ArrowUpRight size={16} />
            </Button>
          </div>
          <Steps />
        </div>
      </section>
      <section className="section container">
        <div className="split-heading">
          <Heading
            eyebrow="SPACE TO GROW"
            title="Your pace. Your plan."
            text="Simple, illustrative pricing for wherever work takes you."
          />
          <Link to="/pricing" className="text-link">
            Compare all plans <ArrowRight size={16} />
          </Link>
        </div>
        <PricingCards compact />
      </section>
      <section className="section container faq-section">
        <Heading
          eyebrow="A LITTLE MORE CLARITY"
          title="Good questions. Straight answers."
          center
        />
        <FAQ />
      </section>
      <CTA />
    </>
  );
}
export function Steps() {
  return (
    <div className="steps">
      {[
        [
          "01",
          "Make yourself at home.",
          "Enter the demo workspace. No password, no setup, no getting in your way.",
        ],
        [
          "02",
          "Give your ideas a little structure.",
          "Create a task, choose a project, and decide what deserves your attention.",
        ],
        [
          "03",
          "Find your rhythm.",
          "Watch your progress and explore predefined suggestions for a clearer next step.",
        ],
      ].map(([n, title, text]) => (
        <div className="step" key={n}>
          <span>{n}</span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function FAQ() {
  return (
    <div className="faq">
      {[
        [
          "Is FlowPilot AI a real AI product?",
          "FlowPilot AI is a fictional portfolio demonstration. Suggestions are predefined examples, not generated by a live AI model.",
        ],
        [
          "Can I actually try the dashboard?",
          "Yes. Enter the demo to create, edit, complete, filter, and delete tasks. Your tasks stay in this browser using LocalStorage when available.",
        ],
        [
          "Do I need a password or credit card?",
          "No. There is no real authentication, subscription, or payment processing. Please do not enter sensitive information.",
        ],
        [
          "What happens to my demo data?",
          "Task data and a demo-session flag are stored only in this browser. Contact form data is never transmitted or saved. You can clear task data from the dashboard, and logging out removes the session flag.",
        ],
        [
          "Can my team collaborate in the demo?",
          "The demo is a single-browser experience. Team workspaces and paid-plan benefits are illustrative concepts; there is no real synchronization or collaboration service.",
        ],
      ].map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <ChevronDown size={18} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function Features() {
  return (
    <>
      <PageHero
        eyebrow="LESS FRICTION. MORE FLOW."
        title={
          <>
            Thoughtful tools.
            <br />
            Room for great work.
          </>
        }
        text="Bring the moving pieces together, without adding more noise."
      />
      <div className="container feature-details">
        {features.map((f, i) => {
          const Icon = icons[f.icon];
          return (
            <section
              className={`feature-detail ${i % 2 ? "reverse" : ""}`}
              key={f.title}
            >
              <div>
                <span className="icon-tile">
                  <Icon />
                </span>
                <Eyebrow>{f.label}</Eyebrow>
                <h2>{f.title}</h2>
                <p>{f.text}</p>
                <Button to="/login" secondary>
                  Try it in the demo <ArrowUpRight size={16} />
                </Button>
              </div>
              <div
                className={`feature-illustration illustration-${i}`}
                aria-label={`${f.label} product illustration`}
              >
                {i === 0 ? (
                  <div className="illustrated-list">
                    <h3>One step at a time.</h3>
                    {[
                      "Sketch the next big idea",
                      "Make a little room to focus",
                      "Celebrate the small wins",
                    ].map((t, n) => (
                      <div key={t}>
                        <span
                          className={`fake-checkbox ${n !== 1 ? "checked" : ""}`}
                        >
                          <Check size={12} />
                        </span>
                        {t}
                      </div>
                    ))}
                    <span className="demo-pill">Task management demo</span>
                  </div>
                ) : i === 1 ? (
                  <div className="illustrated-list">
                    <span className="icon-tile mint">
                      <Layers />
                    </span>
                    <h3>Website launch</h3>
                    <p>Small steps. Shared direction.</p>
                    <div className="progress-track">
                      <span style={{ width: "68%" }} />
                    </div>
                    <small>68% · illustrative progress</small>
                  </div>
                ) : i === 2 ? (
                  <div className="bar-art">
                    <span>YOUR WEEK, IN PERSPECTIVE</span>
                    <div>
                      {[35, 60, 42, 78, 65, 90, 80].map((v, n) => (
                        <i key={n} style={{ height: `${v}%` }} />
                      ))}
                    </div>
                    <small>Fictional productivity data</small>
                  </div>
                ) : (
                  <div className="illustrated-list">
                    <Sparkles size={32} />
                    <h3>Start small. Build momentum.</h3>
                    <p>
                      Choose one important task and give it your full attention.
                    </p>
                    <small>
                      Predefined demo suggestion — not generated by live AI.
                    </small>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <section className="section container">
        <FeatureCards />
      </section>
      <CTA />
    </>
  );
}
export function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="A SMALL SHIFT. A CLEARER DAY."
        title={
          <>
            From “where do I start?”
            <br />
            to “look what I did.”
          </>
        }
        text="A simple path from scattered ideas to meaningful progress."
      />
      <section className="container workflow-grid section">
        <Steps />
        <div className="how-note">
          <Sparkles size={36} />
          <h2>
            Less setup.
            <br />
            More starting.
          </h2>
          <p>
            The demo is yours to explore. Add a task, make a change, and come
            back to find it right where you left it.
          </p>
          <Button to="/login">
            Open the workspace <ArrowRight size={17} />
          </Button>
          <small>Local browser persistence. No real account required.</small>
        </div>
      </section>
      <section className="container product-stage">
        <DashboardPreview />
      </section>
      <CTA />
    </>
  );
}
export function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

// ========================================
// ILLUSTRATIVE PRICING CALCULATIONS
// ========================================
export function PricingCards({ compact = false, yearly = false }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan) => {
        const price = priceFor(plan.monthly, yearly);
        return (
          <article
            key={plan.name}
            className={`pricing-card ${plan.name === "Pro" ? "featured" : ""}`}
          >
            {plan.name === "Pro" && (
              <span className="popular">A LITTLE MORE POSSIBILITY</span>
            )}
            <span className="plan-name">{plan.name}</span>
            <p>{plan.text}</p>
            <div className="price">
              ${price.monthly}
              <span>/ person / month</span>
            </div>
            <small>
              {plan.monthly === 0
                ? "Free demo concept"
                : yearly
                  ? `$${price.annual} USD billed yearly · save 20%`
                  : "USD · billed monthly, illustratively"}
            </small>
            <Button to="/signup" secondary={plan.name !== "Pro"}>
              Explore {plan.name} <ArrowUpRight size={15} />
            </Button>
            {!compact && (
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <span className="plan-disclosure">
              Illustrative plan · no purchase
            </span>
          </article>
        );
      })}
    </div>
  );
}
export function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="GOOD WORK. A PLAN THAT FITS."
        title={
          <>
            A little structure.
            <br />A world of possibility.
          </>
        }
        text="Simple pricing concepts for individuals, small teams, and what comes next."
      />
      <section className="container pricing-page">
        <div
          className="billing-toggle"
          role="group"
          aria-label="Billing period"
        >
          <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Monthly
          </button>
          <button aria-pressed={yearly} onClick={() => setYearly(true)}>
            Yearly <span>Save 20%</span>
          </button>
        </div>
        <PricingCards yearly={yearly} />
        <p className="pricing-disclaimer">
          <ShieldCheck size={16} />
          All plans are illustrative. No subscription, payment, or real paid
          features are offered.
        </p>
      </section>
      <section className="section container">
        <Heading
          eyebrow="CLEAR FROM THE START"
          title="No surprises. Just a demonstration."
          center
        />
        <FAQ />
      </section>
      <CTA />
    </>
  );
}

// ========================================
// SEARCHABLE ORIGINAL RESOURCE LIBRARY
// ========================================
export function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <Link to={`/resources/${article.slug}`} tabIndex={-1} aria-hidden="true">
        <ArticleArt variant={article.art} />
      </Link>
      <div>
        <span className="article-meta">
          {article.category}
          <i /> {article.minutes} min read
        </span>
        <h2>
          <Link to={`/resources/${article.slug}`}>
            {article.title}
            <ArrowUpRight size={19} />
          </Link>
        </h2>
        <p>{article.excerpt}</p>
        <span className="article-author">
          <span className="avatar small">F</span>FlowPilot editorial{" "}
          <span>· Sample article</span>
        </span>
      </div>
    </article>
  );
}
export function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = filterArticles(articles, query, category);
  return (
    <>
      <PageHero
        eyebrow="THE CLEARER WORK JOURNAL"
        title={
          <>
            A fresh perspective.
            <br />
            For your everyday work.
          </>
        }
        text="Small ideas for more intentional planning, calmer workflows, and better days."
      />
      <section className="container resources-page">
        <div className="resource-controls">
          <div
            className="category-filters"
            role="group"
            aria-label="Article category"
          >
            {["All", "Productivity", "Planning", "Teamwork", "AI & Work"].map(
              (c) => (
                <button
                  key={c}
                  aria-pressed={c === category}
                  onClick={() => setCategory(c)}
                >
                  {c === "All" ? "All articles" : c}
                </button>
              ),
            )}
          </div>
          <label className="search-field">
            <Search size={18} />
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              placeholder="Find a little inspiration…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="sr-only" role="status">
          {filtered.length} articles found
        </p>
        {filtered.length ? (
          <div className="article-grid">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search />
            <h2>No stories found.</h2>
            <p>Try another phrase or explore all categories.</p>
            <Button
              secondary
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
      <CTA />
    </>
  );
}
export function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <>
      <article className="reading-page container">
        <Link to="/resources" className="text-link">
          ← Back to the journal
        </Link>
        <span className="article-meta">
          {article.category} · {article.minutes} min read · Original sample
          article
        </span>
        <h1>{article.title}</h1>
        <p className="reading-intro">{article.excerpt}</p>
        <span className="article-author">
          <span className="avatar">F</span>FlowPilot editorial · Portfolio
          demonstration
        </span>
        <ArticleArt variant={article.art} />
        <div className="reading-body">
          {article.sections.map(([heading, text]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
          <aside className="reading-note">
            A small next step: choose one idea from this article and try it in
            your next working session.
          </aside>
        </div>
      </article>
      <section className="section container">
        <Heading
          eyebrow="KEEP EXPLORING"
          title="A little more food for thought."
        />
        <div className="article-grid related">
          {articles
            .filter((a) => a.slug !== slug)
            .slice(0, 3)
            .map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
        </div>
      </section>
    </>
  );
}
export function About() {
  return (
    <>
      <PageHero
        eyebrow="A LITTLE CLARITY GOES A LONG WAY"
        title={
          <>
            Work is full of possibility.
            <br />
            Let’s make room for it.
          </>
        }
        text="FlowPilot AI explores a simple idea: productivity tools should bring clarity, not more complexity."
      />
      <section className="container about-grid section">
        <div className="about-art">
          <span>Less noise.</span>
          <span>More intention.</span>
          <span>
            Better flow.
            <Sparkles />
          </span>
        </div>
        <div>
          <Eyebrow>THE IDEA BEHIND THE INTERFACE</Eyebrow>
          <h2>
            Thoughtful by design.
            <br />
            Human at heart.
          </h2>
          <p>
            This fictional product was created by Awal Jan Hematyar as a
            portfolio demonstration of modern frontend engineering and product
            design.
          </p>
          <p>
            From the first click to the last checked task, every detail is an
            opportunity to make software feel a little more understandable.
          </p>
          <p>
            Built with React 19, Vite, JavaScript, and Tailwind CSS, the
            experience pairs an editorial marketing site with a working local
            productivity dashboard.
          </p>
          <Button to="/login" secondary>
            Take a look around <ArrowUpRight size={16} />
          </Button>
        </div>
      </section>
      <section className="container section" id="demo">
        <Heading
          eyebrow="TRANSPARENCY, BUILT IN"
          title="A demo with clear boundaries."
        />
        <div className="feature-grid">
          {[
            [
              ShieldCheck,
              "Your browser. Your demo.",
              "Tasks and a session flag live in LocalStorage. This is not secure authentication. Avoid sensitive data; clear your local tasks from the dashboard when finished.",
            ],
            [
              Sparkles,
              "Ideas, not live AI.",
              "Planning suggestions are predefined examples. There are no external AI calls, real-time AI processing, or AI-generated responses.",
            ],
            [
              CheckCheck,
              "Explore without a transaction.",
              "Pricing, team features, and accounts are illustrative. Contact forms do not transmit or store data. There is no billing, payment service, or backend.",
            ],
          ].map(([Icon, title, text]) => (
            <article className="feature-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Contact() {
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = {};
    if (!data.get("name").trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email").trim()))
      next.email = "Please enter a valid email address.";
    if (data.get("message").trim().length < 10)
      next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (!Object.keys(next).length) {
      setSent(true);
      e.currentTarget.reset();
    } else e.currentTarget.elements[Object.keys(next)[0]]?.focus();
  }
  return (
    <>
      <PageHero
        eyebrow="LET’S MAKE A LITTLE CONNECTION"
        title={
          <>
            Good things start
            <br />
            with a conversation.
          </>
        }
        text="Try the contact experience. This demo won’t send an email or save your details."
      />
      <section className="container contact-grid">
        <div>
          <span className="icon-tile">
            <Coffee />
          </span>
          <h2>
            A question?
            <br />A big idea? A hello?
          </h2>
          <p>
            We’ve made space for it. Explore this sample form and see the
            validation in action.
          </p>
          <div className="contact-note">
            <ShieldCheck />
            <p>
              This is a fictional contact form. Please use sample information
              and keep sensitive details out of your message.
            </p>
          </div>
          <Link to="/resources" className="text-link">
            Find inspiration in our journal <ArrowUpRight size={16} />
          </Link>
        </div>
        <form className="form-card" onSubmit={submit} noValidate>
          <h2>Say hello.</h2>
          {sent && (
            <div role="status" className="success-message">
              Demo complete. Your message was validated; nothing was sent or
              saved.
            </div>
          )}
          {[
            ["name", "Your name", "text", "Alex Morgan", 80],
            ["email", "Email address", "email", "alex@example.com", 160],
            [
              "message",
              "What’s on your mind?",
              "textarea",
              "A little about your idea…",
              1000,
            ],
          ].map(([name, label, type, placeholder, max]) => (
            <div className="field" key={name}>
              <label htmlFor={name}>
                {label} <span>(required)</span>
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  maxLength={max}
                  minLength={10}
                  required
                  aria-invalid={!!errors[name]}
                  aria-describedby={`${name}-hint ${errors[name] ? `${name}-error` : ""}`}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  maxLength={max}
                  required
                  aria-invalid={!!errors[name]}
                  aria-describedby={`${name}-hint ${errors[name] ? `${name}-error` : ""}`}
                />
              )}
              <small id={`${name}-hint`}>
                {type === "textarea" ? "10–1,000 characters. " : ""}Maximum{" "}
                {max} characters.
              </small>
              {errors[name] && (
                <span className="field-error" id={`${name}-error`}>
                  {errors[name]}
                </span>
              )}
            </div>
          ))}
          <Button type="submit">
            Try demo submission <ArrowRight size={16} />
          </Button>
          <p className="form-note">
            No email is sent. No personal data is saved.
          </p>
        </form>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>A LITTLE OFF THE BEATEN PATH</Eyebrow>
      <span className="error-number">
        404<span>✦</span>
      </span>
      <h1>Let’s find your way back.</h1>
      <p>This page doesn’t exist. There’s still plenty to explore.</p>
      <Button to="/">
        Back to a clearer place <ArrowRight size={16} />
      </Button>
    </section>
  );
}
