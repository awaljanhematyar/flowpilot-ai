// Route composition keeps the interactive workspace in its own lazy-loaded bundle.

// ========================================
// APPLICATION ROUTE COMPOSITION
// ========================================
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MarketingLayout, RouteEffects } from "./components/Layouts";
import {
  Home,
  Features,
  HowItWorks,
  Pricing,
  Resources,
  Article,
  About,
  Contact,
  NotFound,
} from "./pages/Marketing";
const DemoEntry = lazy(() =>
  import("./pages/Dashboard").then((module) => ({ default: module.DemoEntry })),
);
const Dashboard = lazy(() => import("./pages/Dashboard"));
export default function App() {
  return (
    <>
      <RouteEffects />
      <Suspense
        fallback={
          <div className="loading-state" role="status">
            Finding your flow…
          </div>
        }
      >
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<Features />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="resources" element={<Resources />} />
            <Route path="blog" element={<Navigate to="/resources" replace />} />
            <Route path="resources/:slug" element={<Article />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<DemoEntry />} />
            <Route path="signup" element={<DemoEntry signup />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </>
  );
}
