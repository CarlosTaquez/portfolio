import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpLeft } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

function scrollToTop() {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
}

const frontendSkills = [
  {
    abbr: "H",
    color: "var(--skill-html)",
  },
  {
    abbr: "C",
    color: "var(--skill-css)",
  },
  {
    abbr: "JS",
    color: "var(--skill-js)",
  },
  {
    abbr: "TS",
    color: "var(--skill-ts)",
  },
  {
    abbr: "N",
    color: "var(--skill-next)",
  },
];

const backendSkills = [
  {
    abbr: "J",
    color: "var(--skill-java)",
  },
  {
    abbr: "SB",
    color: "var(--skill-spring)",
  },
  {
    abbr: "Py",
    color: "var(--skill-python)",
  },
  {
    abbr: "M",
    color: "var(--skill-mongo)",
  },
  {
    abbr: "SQL",
    color: "var(--skill-sql)",
  },
];

interface SkillCardProps {
  skill: { name: string; abbr: string; color: string; description: string };
  index: number;
  isInView: boolean;
}

function SkillCard({ skill, index, isInView }: SkillCardProps) {
  const isWideLabel = skill.abbr.length > 2;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
      className="group relative flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-8 text-gray-900 dark:text-white shadow-sm"
      whileHover={{
        borderColor: "rgba(var(--portfolio-accent-rgb), 0.4)",
        backgroundColor: "rgba(var(--portfolio-accent-rgb), 0.04)",
        scale: 1.05,
        y: -4,
      }}
      style={{ "--skill-color": skill.color } as React.CSSProperties}
    >
      <div
        className={`flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 font-extrabold shadow-sm text-[var(--skill-color)] ${
          isWideLabel ? "text-[0.65rem] tracking-[0.05em]" : "text-[0.95rem]"
        }`}
      >
        {skill.abbr}
      </div>

      <span
        className="text-sm font-medium tracking-wide text-gray-800 dark:text-white/80"
      >
        {skill.name}
      </span>

      <span
        className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500 dark:text-white/40"
      >
        {skill.description}
      </span>

      <div className="absolute inset-0 pointer-events-none rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_30px_rgba(var(--accent-rgb),0.05)]" />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useTranslation();

  const translatedFrontend = frontendSkills.map((skill, index) => ({
    ...skill,
    name: t.skills.frontendItems[index].name,
    description: t.skills.frontendItems[index].description,
  }));

  const translatedBackend = backendSkills.map((skill, index) => ({
    ...skill,
    name: t.skills.backendItems[index].name,
    description: t.skills.backendItems[index].description,
  }));

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
      style={{ background: "var(--portfolio-bg)" }}
    >
      <div style={{ height: "1px", background: "var(--portfolio-divider)", marginBottom: "4rem" }} />

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
        {t.skills.sectionLabel}
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
          marginBottom: "5rem",
        }}
      >
        {t.skills.title}
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              color: "var(--portfolio-text-faint)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            {t.skills.frontend}
          </motion.p>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {translatedFrontend.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              color: "var(--portfolio-text-faint)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            {t.skills.backend}
          </motion.p>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {translatedBackend.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index + 5}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute bottom-10 left-8 md:left-16 lg:left-24 flex items-center gap-2 group"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <ArrowUpLeft
          style={{
            color: "var(--portfolio-text-ghost)",
            transition: "color 0.3s ease",
            width: "20px",
            height: "20px",
          }}
          className="portfolio-hover-text"
        />
        <span
          style={{
            color: "var(--portfolio-text-ghost)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}
          className="portfolio-hover-text"
        >
          {t.skills.backToTop}
        </span>
      </button>
    </section>
  );
}
