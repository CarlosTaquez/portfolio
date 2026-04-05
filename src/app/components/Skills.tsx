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
    color: "#E34F26",
  },
  {
    abbr: "C",
    color: "#1572B6",
  },
  {
    abbr: "JS",
    color: "#F7DF1E",
  },
  {
    abbr: "TS",
    color: "#3178C6",
  },
  {
    abbr: "N",
    color: "#FFFFFF",
  },
];

const backendSkills = [
  {
    abbr: "J",
    color: "#ED8B00",
  },
  {
    abbr: "SB",
    color: "#6DB33F",
  },
  {
    abbr: "Py",
    color: "#3776AB",
  },
  {
    abbr: "M",
    color: "#47A248",
  },
  {
    abbr: "SQL",
    color: "#CC2927",
  },
];

interface SkillCardProps {
  skill: { name: string; abbr: string; color: string; description: string };
  index: number;
  isInView: boolean;
}

function SkillCard({ skill, index, isInView }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
      className="group relative flex flex-col items-center justify-center gap-3 cursor-default"
      style={{
        padding: "2rem 1rem",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "4px",
        transition: "all 0.4s ease",
        background: "rgba(255,255,255,0.01)",
      }}
      whileHover={{
        borderColor: "rgba(225,6,0,0.4)",
        backgroundColor: "rgba(225,6,0,0.04)",
        scale: 1.05,
        y: -4,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "8px",
          background: `${skill.color}14`,
          border: `1px solid ${skill.color}30`,
          transition: "all 0.4s ease",
          fontWeight: 800,
          fontSize: skill.abbr.length > 2 ? "0.65rem" : "0.95rem",
          color: skill.color,
          letterSpacing: skill.abbr.length > 2 ? "0.05em" : "0",
        }}
      >
        {skill.abbr}
      </div>

      <span
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: "0.8rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        {skill.name}
      </span>

      <span
        style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {skill.description}
      </span>

      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          borderRadius: "4px",
          boxShadow: "inset 0 0 30px rgba(225,6,0,0.05)",
          transition: "opacity 0.4s ease",
        }}
      />
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
      style={{ background: "#0B0B0B" }}
    >
      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "4rem" }} />

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
        {t.skills.sectionLabel}
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
        {t.skills.title}
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              color: "rgba(255,255,255,0.3)",
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
              color: "rgba(255,255,255,0.3)",
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
            color: "rgba(255,255,255,0.25)",
            transition: "color 0.3s ease",
            width: "20px",
            height: "20px",
          }}
          className="group-hover:!text-white"
        />
        <span
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}
          className="group-hover:!text-white"
        >
          {t.skills.backToTop}
        </span>
      </button>
    </section>
  );
}
