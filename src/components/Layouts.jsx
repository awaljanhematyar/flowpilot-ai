// Distinct marketing shell with accessible disclosure navigation and a consistent footer.

// ========================================
// MARKETING SHELL AND ROUTE METADATA
// ========================================
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X, ArrowUpRight } from "lucide-react";
import { Brand, Button } from "./UI";
import { articles } from "../data/content";
const links = [
  ["/features", "Features"],
  ["/how-it-works", "How it works"],
  ["/pricing", "Pricing"],
  ["/resources", "Resources"],
];
export function MarketingLayout() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link to="/login" className="login-link">
              Log in
            </Link>
            <Button to="/signup">
              Get started <ArrowRight size={15} />
            </Button>
          </div>
          <button
            ref={trigger}
            className="icon-button mobile-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ...links,
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/login", "Demo login"],
              ["/signup", "Get started"],
            ].map(([to, label]) => (
              <Link key={to} to={to} onClick={() => setOpen(false)}>
                {label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand />
              <p>
                A little clarity. A lot of possibility.
                <br />
                Work smarter. Move faster.
              </p>
              <span className="demo-pill">An independent portfolio demo</span>
            </div>
            <div>
              <h3>Product</h3>
              {links.slice(0, 3).map(([to, label]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
              <Link to="/login">Explore the demo</Link>
            </div>
            <div>
              <h3>Explore</h3>
              <Link to="/resources">Resources</Link>
              <Link to="/about">Our story</Link>
              <Link to="/contact">Get in touch</Link>
            </div>
            <div className="footer-note">
              <h3>Made for a clearer day.</h3>
              <p>
                Fictional product. Real attention to detail.
                <br />
                No live AI, authentication, or billing.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} FlowPilot AI. Portfolio
              demonstration.
            </span>
            <Link to="/about#demo">
              Demo & privacy notes <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
// Route changes update metadata and reset reading position without stealing initial focus.
export function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash)
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    else window.scrollTo(0, 0);
    const article = articles.find(
      (item) => pathname === `/resources/${item.slug}`,
    );
    const name =
      pathname === "/"
        ? "Work Smarter. Move Faster."
        : pathname.split("/").filter(Boolean).join(" · ").replaceAll("-", " ");
    document.title = `${article?.title || name.charAt(0).toUpperCase() + name.slice(1)} | FlowPilot AI`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = new URL(pathname, window.location.origin).href;
    const socialTitle = document.querySelector('meta[property="og:title"]');
    const socialImage = document.querySelector('meta[property="og:image"]');
    if (socialTitle) socialTitle.content = document.title;
    if (socialImage)
      socialImage.content = new URL(
        "/social-cover.png",
        window.location.origin,
      ).href;
  }, [pathname, hash]);
  return null;
}
