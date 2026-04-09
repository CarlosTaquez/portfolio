import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTranslation } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navItems = [
    { label: t.nav.about, id: "about" },
    { label: t.nav.projects, id: "projects" },
    { label: t.nav.testimonials, id: "testimonials" },
    { label: t.nav.experience, id: "experience" },
    { label: t.nav.skills, id: "skills" },
    { label: t.nav.contact, id: "contact" },
  ];
  const activeSection = useActiveSection(navItems.map((item) => item.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-24"
        style={{
          height: "72px",
          background: scrolled ? "var(--portfolio-nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--portfolio-nav-border)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={scrollToTop}
          style={{
            color: "var(--portfolio-text)",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          CA<span style={{ color: "var(--portfolio-accent)" }}>.</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                color:
                  activeSection === item.id
                    ? "var(--portfolio-text)"
                    : "var(--portfolio-text-faint)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                transition: "color 0.3s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Always-visible controls (mobile/tablet/desktop) */}
        <div className="ml-auto flex items-center gap-3">
          {/* Language toggle */}
          <div
            className="flex items-center"
            style={{
              border: "1px solid var(--portfolio-border)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  padding: "5px 8px",
                  background: lang === l ? "var(--portfolio-accent)" : "transparent",
                  color: lang === l ? "var(--portfolio-bg-alt)" : "var(--portfolio-text-faint)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center"
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid var(--portfolio-border)",
              borderRadius: "4px",
              background: "transparent",
              color: "var(--portfolio-text)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? (
              <Sun style={{ width: "14px", height: "14px" }} />
            ) : (
              <Moon style={{ width: "14px", height: "14px" }} />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "var(--portfolio-text)",
                  transition: "all 0.3s ease",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(4px, 4px)"
                        : i === 2
                        ? "rotate(-45deg) translate(4px, -4px)"
                        : "scale(0)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center xl:hidden"
          style={{
            background: "var(--portfolio-bg)",
            backdropFilter: "blur(20px)",
          }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => scrollTo(item.id)}
              style={{
                color:
                  activeSection === item.id
                    ? "var(--portfolio-text)"
                    : "var(--portfolio-text-faint)",
                fontSize: "2.5rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem 0",
                transition: "color 0.3s ease",
              }}
              whileHover={{ color: "var(--accent)", x: 10 }}
            >
              {item.label}
            </motion.button>
          ))}

          <div className="mt-8 flex items-center gap-3">
            <div
              className="flex items-center"
              style={{
                border: "1px solid var(--portfolio-border)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              {(["en", "es"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    padding: "6px 10px",
                    background: lang === l ? "var(--portfolio-accent)" : "transparent",
                    color: lang === l ? "var(--portfolio-bg-alt)" : "var(--portfolio-text-faint)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center"
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid var(--portfolio-border)",
                borderRadius: "4px",
                background: "transparent",
                color: "var(--portfolio-text)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? (
                <Sun style={{ width: "16px", height: "16px" }} />
              ) : (
                <Moon style={{ width: "16px", height: "16px" }} />
              )}
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
