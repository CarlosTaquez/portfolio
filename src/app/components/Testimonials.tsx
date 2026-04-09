import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = t.testimonials.items;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);
  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden"
      style={{ background: "var(--portfolio-bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(var(--portfolio-accent-rgb), 0.08) 0%, transparent 55%)",
        }}
      />

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
          {t.testimonials.sectionLabel}
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold leading-tight break-words text-[clamp(1.8rem,5vw,3.5rem)]"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
              marginBottom: "2rem",
            }}
          >
            {t.testimonials.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col items-start md:items-end gap-3"
            style={{ marginBottom: "2rem" }}
          >
            <button
              onClick={scrollToContact}
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--portfolio-accent)",
                border: "1px solid rgba(var(--portfolio-accent-rgb), 0.5)",
                padding: "0.6rem 1rem",
                borderRadius: "2px",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(var(--portfolio-accent-rgb), 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {t.testimonials.ctaLabel}
            </button>
            <span
              style={{
                color: "var(--portfolio-text-faint)",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t.testimonials.ctaNote}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative flex items-center justify-center px-6 md:px-16 lg:px-24">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-3xl"
          style={{
            border: "1px solid var(--portfolio-border)",
            borderRadius: "6px",
            padding: "2.5rem",
            background: "var(--portfolio-card)",
            boxShadow: "var(--portfolio-shadow)",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Quote style={{ color: "var(--portfolio-accent)", width: "32px", height: "32px" }} />
          <p
            style={{
              color: "var(--portfolio-text-muted)",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.8,
              marginTop: "1.5rem",
            }}
          >
            {items[current].text}
          </p>
          <div style={{ marginTop: "2rem" }}>
            <p
              style={{
                color: "var(--portfolio-text)",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              {items[current].name}
            </p>
            <p style={{ color: "var(--portfolio-text-subtle)", fontSize: "0.85rem" }}>
              {items[current].role}
            </p>
          </div>
        </motion.div>

        <button
          onClick={prev}
          className="absolute left-4 md:left-10 flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            border: "1px solid var(--portfolio-border)",
            borderRadius: "50%",
            background: "var(--portfolio-card-strong)",
            cursor: "pointer",
          }}
        >
          <ChevronLeft style={{ color: "var(--portfolio-text-subtle)", width: "18px", height: "18px" }} />
        </button>

        <button
          onClick={next}
          className="absolute right-4 md:right-10 flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            border: "1px solid var(--portfolio-border)",
            borderRadius: "50%",
            background: "var(--portfolio-card-strong)",
            cursor: "pointer",
          }}
        >
          <ChevronRight style={{ color: "var(--portfolio-text-subtle)", width: "18px", height: "18px" }} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "24px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "var(--portfolio-accent)" : "var(--portfolio-text-ghost)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
