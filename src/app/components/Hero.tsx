import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { useTranslation } from "../context/LanguageContext";

export function Hero() {
  const profileImageSrc = "/carlos.png?v=3";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(true);
  const { t } = useTranslation();

  const navItems = [
    { label: t.hero.interactive.about, id: "about" },
    { label: t.hero.interactive.projects, id: "projects" },
    { label: t.hero.interactive.testimonials, id: "testimonials" },
    { label: t.hero.interactive.experience, id: "experience" },
    { label: t.hero.interactive.skills, id: "skills" },
    { label: t.hero.interactive.contact, id: "contact" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % navItems.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovering, navItems.length]);

  const handleHover = (index: number) => {
    setIsHovering(true);
    setActiveIndex(index);
    setVisible(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen px-8 md:px-16 lg:px-24 pt-24 pb-10"
      style={{ background: "#0B0B0B" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(225,6,0,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 min-h-[calc(100vh-8.5rem)] w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="w-full md:flex-1 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              {t.hero.badge}
            </p>

            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(2.6rem, 5.8vw, 5.9rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              <span className="block">{t.hero.hello}</span>
              <span className="block" style={{ color: "rgba(255,255,255,0.9)" }}>
                {t.hero.iam}
              </span>
              <span className="block">{t.hero.firstName}</span>
              <span className="block">{t.hero.lastName}</span>
              <span
                className="block"
                style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}
              >
                {t.hero.role}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              originX: 0,
              height: "1px",
              background: "rgba(255,255,255,0.1)",
              marginTop: "3rem",
              marginBottom: "2.5rem",
              maxWidth: "600px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 md:gap-8 items-center"
            onMouseLeave={handleLeave}
          >
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => handleHover(index)}
                style={{
                  fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem 0",
                  position: "relative",
                  transition: "color 0.3s ease",
                  color:
                    activeIndex === index ? "#E10600" : "rgba(255,255,255,0.4)",
                }}
              >
                {activeIndex === index && (
                  <motion.span
                    layoutId="activeIndicator"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "#E10600",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}

            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "0.55rem 1rem",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E10600";
                (e.currentTarget as HTMLAnchorElement).style.color = "#E10600";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
              }}
            >
              {t.hero.cvLabel}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="w-full md:flex-1 flex justify-center items-center md:justify-center md:-translate-x-14 md:-translate-y-8 md:scale-[1.12]"
        >
          <div
            className="relative w-[min(86vw,420px)] sm:w-[min(70vw,460px)] md:w-[clamp(380px,34vw,520px)]"
            style={{
              opacity: 0.75,
              filter: "brightness(0.95) contrast(1.05)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)",
            }}
          >
            <Image
              key={profileImageSrc}
              src={profileImageSrc}
              alt="Carlos Andres profile photo"
              width={420}
              height={560}
              priority
              className="w-full h-auto object-cover blur-[0.4px]"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 right-8 md:right-16 lg:right-24 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
          }}
        />
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            marginTop: "0.5rem",
          }}
        >
          {t.hero.scroll}
        </span>
      </motion.div>

      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden"
        style={{
          fontSize: "clamp(8rem, 20vw, 22rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.02)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        CA
      </div>
    </section>
  );
}
