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

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(225,6,0,0.05) 0%, transparent 55%)",
        }}
      />

      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "4rem" }} />

      <div className="px-8 md:px-16 lg:px-24">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            color: "#E10600",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          {t.testimonials.sectionLabel}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: "5rem",
          }}
        >
          {t.testimonials.title}
        </motion.h2>
      </div>

      <div className="relative flex items-center justify-center px-6 md:px-16 lg:px-24">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-3xl"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            padding: "2.5rem",
            background: "rgba(255,255,255,0.02)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Quote style={{ color: "#E10600", width: "32px", height: "32px" }} />
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
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
                color: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              {items[current].name}
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>
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
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.4)",
            cursor: "pointer",
          }}
        >
          <ChevronLeft style={{ color: "rgba(255,255,255,0.6)", width: "18px", height: "18px" }} />
        </button>

        <button
          onClick={next}
          className="absolute right-4 md:right-10 flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.4)",
            cursor: "pointer",
          }}
        >
          <ChevronRight style={{ color: "rgba(255,255,255,0.6)", width: "18px", height: "18px" }} />
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
              background: i === current ? "#E10600" : "rgba(255,255,255,0.2)",
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
