import { useState, useRef } from "react";
import type { CSSProperties } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { ArrowUpLeft, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

type Project = {
  id: number;
  image: string;
  github: string;
  demo?: string;
  year: string;
  tags: string[];
  imageFit?: CSSProperties["objectFit"];
};

const projects: Project[] = [
  {
    id: 1,
    image: "/watch.png",
    github: "https://github.com/CarlosTaquez/Watch.git",
    year: "2025",
    tags: ["Python", "GIS", "Data Viz"],
  },
  {
    id: 2,
    image: "/eros.png",
    imageFit: "contain",
    github: "https://github.com/CarlosTaquez/ErosPlayer.git",
    year: "2025",
    tags: ["Python", "Audio", "GUI"],
  },
  {
    id: 3,
    image: "/mentes.png",
    github: "https://github.com/CarlosTaquez/PROYECTO-FINAL-CALIDAD-DE-SOFTWARE.git",
    demo: "https://proyecto-final-calidad-de-software.vercel.app/",
    year: "2025",
    tags: ["TypeScript", "EdTech", "3D"],
  },
  {
    id: 4,
    image: "/page.png",
    github: "https://github.com/CarlosTaquez/MercadoLibre-ladingPage.git",
    demo: "https://mercado-libre-lading-page.vercel.app/",
    year: "2026",
    tags: ["HTML", "CSS", "UI/UX"],
  },
];

function scrollToTop() {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
}

export function Projects() {
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useTranslation();

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % projects.length);
  };

  const getIndex = (offset: number) =>
    (current + offset + projects.length) % projects.length;

  const visibleProjects = [
    { project: projects[getIndex(-1)], position: -1 },
    { project: projects[getIndex(0)], position: 0 },
    { project: projects[getIndex(1)], position: 1 },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
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
          {t.projects.sectionLabel}
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
          {t.projects.title}
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div className="relative flex items-center justify-center w-full" style={{ height: "420px" }}>
          {visibleProjects.map(({ project, position }) => {
            const isCenter = position === 0;
            const isHovered = hoveredIndex === position && isCenter;
            const translatedProject = t.projects.items[project.id - 1];
            const imageFit: CSSProperties["objectFit"] = project.imageFit ?? "cover";
            const imageBackground =
              imageFit === "contain" ? "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))" : "transparent";

            return (
              <motion.div
                key={`${project.id}-${position}`}
                className="absolute"
                initial={false}
                animate={{
                  x: `${position * (position === 0 ? 0 : 56)}%`,
                  scale: isCenter ? 1 : 0.62,
                  opacity: isCenter ? 1 : 0.35,
                  zIndex: isCenter ? 10 : 5,
                  rotateY: position * -8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                style={{ width: isCenter ? "min(520px, 85vw)" : "min(380px, 65vw)" }}
                onMouseEnter={() => isCenter && setHoveredIndex(position)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: "4px",
                    aspectRatio: "16/10",
                    cursor: isCenter ? "pointer" : "default",
                    background: imageBackground,
                  }}
                  onClick={() => {
                    if (isCenter) {
                      const target = project.demo ?? project.github;
                      window.open(target, "_blank");
                      } else if (position < 0) {
                        prev();
                      } else {
                        next();
                    }
                  }}
                >
                  <Image
                    src={project.image}
                    alt={translatedProject.name}
                    fill
                    sizes="(max-width: 768px) 85vw, 520px"
                    style={{
                      objectFit: imageFit,
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.6s ease",
                      filter: isCenter ? "none" : "grayscale(60%)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isHovered
                        ? "rgba(0,0,0,0.75)"
                        : isCenter
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(0,0,0,0.5)",
                      transition: "background 0.4s ease",
                    }}
                  />

                  {isCenter && (
                    <div
                      className="absolute bottom-0 left-0 right-0 p-5"
                      style={{
                        transform: isHovered ? "translateY(-20px)" : "translateY(0)",
                        transition: "transform 0.4s ease",
                      }}
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <p
                            style={{
                              color: "rgba(255,255,255,0.5)",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              marginBottom: "0.3rem",
                            }}
                          >
                            {project.year}
                          </p>
                          <h3
                            style={{
                              color: "#FFFFFF",
                              fontSize: "1.3rem",
                              fontWeight: 700,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {translatedProject.name}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                color: "rgba(255,255,255,0.5)",
                                fontSize: "0.6rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                border: "1px solid rgba(255,255,255,0.15)",
                                padding: "2px 8px",
                                borderRadius: "2px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {isCenter && (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.4s ease",
                        pointerEvents: isHovered ? "auto" : "none",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {project.demo && (
                          <button
                            type="button"
                            className="flex items-center gap-2"
                            style={{
                              color: "#E10600",
                              fontSize: "0.7rem",
                              letterSpacing: "0.25em",
                              textTransform: "uppercase",
                              fontWeight: 600,
                              border: "1px solid rgba(225,6,0,0.6)",
                              padding: "6px 10px",
                              borderRadius: "2px",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              window.open(project.demo, "_blank");
                            }}
                          >
                            <ExternalLink style={{ width: "16px", height: "16px" }} />
                            {t.projects.demoLabel}
                          </button>
                        )}
                        <button
                          type="button"
                          className="flex items-center gap-2"
                          style={{
                            color: "rgba(255,255,255,0.75)",
                            fontSize: "0.7rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            border: "1px solid rgba(255,255,255,0.25)",
                            padding: "6px 10px",
                            borderRadius: "2px",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={(event) => {
                            event.stopPropagation();
                            window.open(project.github, "_blank");
                          }}
                        >
                          <Github style={{ width: "16px", height: "16px" }} />
                          {t.projects.repoLabel}
                        </button>
                      </div>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.8rem",
                          textAlign: "center",
                          maxWidth: "200px",
                        }}
                      >
                        {translatedProject.description}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={prev}
          className="absolute left-4 md:left-12 z-20 flex items-center justify-center group"
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
            background: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E10600";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(225,6,0,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.background = "none";
          }}
        >
          <ChevronLeft style={{ color: "rgba(255,255,255,0.6)", width: "20px", height: "20px" }} />
        </button>

        <button
          onClick={next}
          className="absolute right-4 md:right-12 z-20 flex items-center justify-center"
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
            background: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E10600";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(225,6,0,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.background = "none";
          }}
        >
          <ChevronRight style={{ color: "rgba(255,255,255,0.6)", width: "20px", height: "20px" }} />
        </button>
      </motion.div>

      <div className="flex justify-center gap-2 mt-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
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

      <div className="flex justify-center mt-4">
        <span
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
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
          {t.projects.backToTop}
        </span>
      </button>
    </section>
  );
}


