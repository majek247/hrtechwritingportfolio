import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Seo } from "./components/Seo";
import Home from "./pages/Home";
import AIEmployeeLifecycle2026 from "./pages/articles/AIEmployeeLifecycle2026";
import AveniBestAINoteTakingTools from "./pages/articles/AveniBestAINoteTakingTools";
import AdfinStubbsCaseStudy from "./pages/articles/AdfinStubbsCaseStudy";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <Nav />
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Seo
                title="GrowUp | Fintech & Financial Services Writing Portfolio"
                description="See fintech content built for pipeline growth, from buyer guides and comparison pieces to research-led articles and customer stories."
                path="/"
                type="website"
              />
              <Home />
            </>
          }
        />

        <Route
          path="/articles/ai-employee-lifecycle"
          element={
            <>
              <Seo
               title="HR Tech Article Writing Sample | AI Across the Employee Lifecycle"
               description="A story-led HR tech writing sample from GrowUp, following one fictional employee through hiring, onboarding, performance, retention and exit to show where AI helps, where it needs a human, and who owns the decision."
                path="/articles/ai-employee-lifecycle"
              />
              <AIEmployeeLifecycle2026 />
            </>
          }
        />

  

        <Route
          path="/articles/best-ai-note-taking-tools"
          element={
            <>
              <Seo
                 title="Fintech Comparison Article Sample: AI Note-Taking Tools | GrowUp"
                description="A fintech writing sample by GrowUp: a comparison of five AI note-taking tools for UK financial advisers, written as an example of content for Aveni."
                path="/articles/best-ai-note-taking-tools"
              />
              <AveniBestAINoteTakingTools />
            </>
          }
        />

        <Route
          path="/articles/adfin-stubbs-parkin-case-study"
          element={
            <>
              <Seo
                title="Fintech Case Study Copywriting Sample | GrowUp"
                description="A fintech copywriting portfolio sample showing how GrowUp rewrote and redesigned Adfin’s Stubbs Parkin case study for clearer, more persuasive storytelling."
                path="/articles/adfin-stubbs-parkin-case-study"
                image="/images/stubbs-parkin-og.png"
              />
              <AdfinStubbsCaseStudy />
            </>
          }
        />

        <Route
          path="*"
          element={
            <>
              <Seo
                title="Page not found | GrowUp"
                description="This page doesn't exist. Return to the GrowUp fintech writing portfolio."
                path="/"
                type="website"
              />
              <Home />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}