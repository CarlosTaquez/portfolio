import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowUpLeft } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

function scrollToTop() {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
}

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { lang, t } = useTranslation();

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
      style={{ background: "#0B0B0B" }}
    >
      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "4rem" }} />

      <div className="max-w-4xl w-full">
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
          <AnimatePresence mode="wait">
            <motion.span
              key={`label-${lang}`}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              style={{ display: "inline-block" }}
            >
              {t.about.sectionLabel}
            </motion.span>
          </AnimatePresence>
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
            marginBottom: "4rem",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`title-${lang}`}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.35 }}
              style={{ display: "block" }}
            >
              {t.about.titleTop}
              <br />
              {t.about.titleBottom}
            </motion.span>
          </AnimatePresence>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`bio-${lang}`}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                  lineHeight: 1.85,
                  fontWeight: 300,
                  maxWidth: "480px",
                }}
              >
                {t.about.bio}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`hobbies-${lang}`}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <p
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                  }}
                >
                  {t.about.hobbiesLabel}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                    lineHeight: 1.85,
                    fontWeight: 300,
                    maxWidth: "420px",
                  }}
                >
                  {t.about.hobbiesText}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute bottom-10 left-8 md:left-16 lg:left-24 flex items-center gap-2 group"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <ArrowUpLeft
          style={{
            color: "rgba(255,255,255,0.25)",
            transition: "color 0.3s ease",
            width: "20px",
            height: "20px",
          }}
          className="group-hover:!text-white"
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={`back-${lang}`}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
              display: "inline-block",
            }}
            className="group-hover:!text-white"
          >
            {t.about.backToTop}
          </motion.span>
        </AnimatePresence>
      </button>
    </section>
  );
}
