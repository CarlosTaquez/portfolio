"use client";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Testimonials } from "./components/Testimonials";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div
          style={{
            background: "var(--portfolio-bg)",
            overflowX: "hidden",
          }}
        >
          <style>{`
            html {
              scroll-behavior: smooth;
            }
            * {
              box-sizing: border-box;
            }
            ::-webkit-scrollbar {
              width: 4px;
            }
            ::-webkit-scrollbar-track {
              background: var(--portfolio-scrollbar-track);
            }
            ::-webkit-scrollbar-thumb {
              background: var(--portfolio-scrollbar-thumb);
              border-radius: 2px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: var(--accent-hover);
            }
            ::selection {
              background: var(--accent);
              color: var(--selection-text);
            }
          `}</style>

          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Testimonials />
          <Experience />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

