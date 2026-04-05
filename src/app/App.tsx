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

export default function App() {
  return (
    <LanguageProvider>
      <div
        style={{
          background: "#0B0B0B",
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
            background: #0B0B0B;
          }
          ::-webkit-scrollbar-thumb {
            background: #E10600;
            border-radius: 2px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #ff1a00;
          }
          ::selection {
            background: #E10600;
            color: #FFFFFF;
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
  );
}

