import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTranslation } from "../context/LanguageContext";
import { useActiveSection } from "../hooks/useActiveSection";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();
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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 lg:px-24"
        style={{
          height: "72px",
          background: scrolled ? "rgba(11,11,11,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={scrollToTop}
          style={{
            color: "#FFFFFF",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          CA<span style={{ color: "#E10600" }}>.</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                color: activeSection === item.id ? "#FFFFFF" : "#8A8A8A",
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

          {/* Language toggle */}
          <div
            className="flex items-center"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "3px",
              overflow: "hidden",
              marginLeft: "8px",
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
                  padding: "5px 10px",
                  background: lang === l ? "#E10600" : "transparent",
                  color: lang === l ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {/* Mobile language toggle */}
          <div
            className="flex items-center"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
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
                  background: lang === l ? "#E10600" : "transparent",
                  color: lang === l ? "#FFFFFF" : "rgba(255,255,255,0.3)",
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
            className="flex flex-col gap-1.5 p-2"
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
                  background: "#FFFFFF",
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
          className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
          style={{ background: "rgba(11,11,11,0.98)", backdropFilter: "blur(20px)" }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => scrollTo(item.id)}
              style={{
                color: activeSection === item.id ? "#FFFFFF" : "#8A8A8A",
                fontSize: "2.5rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem 0",
                transition: "color 0.3s ease",
              }}
              whileHover={{ color: "#E10600", x: 10 }}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </>
  );
}
