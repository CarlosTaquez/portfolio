import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslation } from "../context/LanguageContext";

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center py-24"
      style={{ background: "var(--portfolio-bg)" }}
    >
      <div style={{ height: "1px", background: "var(--portfolio-divider)", marginBottom: "4rem" }} />

      <div className="px-8 md:px-16 lg:px-24">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            color: "var(--portfolio-accent)",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          {t.experience.sectionLabel}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: "var(--portfolio-text)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: "4rem",
          }}
        >
          {t.experience.title}
        </motion.h2>
      </div>

      <div className="px-8 md:px-16 lg:px-24 grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            border: "1px solid var(--portfolio-border)",
            borderRadius: "6px",
            padding: "2rem",
            background: "var(--portfolio-card)",
          }}
        >
          <h3
            style={{
              color: "var(--portfolio-text)",
              fontSize: "1.2rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            {t.experience.academic.title}
          </h3>
          <div className="flex flex-col gap-4">
            {t.experience.academic.items.map((item) => (
              <div key={item.title}>
                <p style={{ color: "var(--portfolio-text)", fontSize: "1rem", fontWeight: 600 }}>
                  {item.title}
                </p>
                <p style={{ color: "var(--portfolio-text-subtle)", fontSize: "0.9rem" }}>
                  {item.subtitle}
                </p>
                {item.detail && (
                  <p style={{ color: "var(--portfolio-text-faint)", fontSize: "0.85rem", marginTop: "0.35rem" }}>
                    {item.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            border: "1px solid var(--portfolio-border)",
            borderRadius: "6px",
            padding: "2rem",
            background: "var(--portfolio-card)",
          }}
        >
          <h3
            style={{
              color: "var(--portfolio-text)",
              fontSize: "1.2rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            {t.experience.professional.title}
          </h3>
          <p style={{ color: "var(--portfolio-text-subtle)", fontSize: "0.95rem", lineHeight: 1.7 }}>
            {t.experience.professional.summary}
          </p>
          <ul style={{ marginTop: "1.25rem", paddingLeft: "1.2rem", color: "var(--portfolio-text-subtle)" }}>
            {t.experience.professional.highlights.map((item) => (
              <li key={item} style={{ marginBottom: "0.5rem", lineHeight: 1.6 }}>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
