import { motion } from "motion/react";
import Image from "next/image";
import { useTranslation } from "../context/LanguageContext";

export function Hero() {
  const profileImageSrc = "/carlos.png?v=3";
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen px-8 md:px-16 lg:px-24 pt-24 pb-10"
      style={{ background: "var(--portfolio-bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 18%, rgba(var(--portfolio-accent-rgb), 0.025) 0%, transparent 55%)",
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
                color: "var(--portfolio-text-faint)",
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
                color: "var(--portfolio-text)",
                fontSize: "clamp(2.6rem, 5.8vw, 5.9rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              <span className="block">{t.hero.hello}</span>
              <span className="block" style={{ color: "var(--portfolio-text-muted)" }}>
                {t.hero.iam}
              </span>
              <span className="block">{t.hero.firstName}</span>
              <span className="block">{t.hero.lastName}</span>
              <span
                className="block"
                style={{ color: "var(--portfolio-text-subtle)", fontWeight: 300 }}
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
              background: "var(--portfolio-divider)",
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
          >
            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--portfolio-text)",
                border: "1px solid var(--portfolio-border-strong)",
                padding: "0.55rem 1rem",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--portfolio-accent)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--portfolio-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--portfolio-border-strong)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--portfolio-text)";
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
              filter: "contrast(1.1) brightness(0.98)",
              maskImage:
                "linear-gradient(to right, var(--mask-transparent) 0%, var(--mask-opaque) 18%, var(--mask-opaque) 82%, var(--mask-transparent) 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, var(--mask-transparent) 0%, var(--mask-opaque) 18%, var(--mask-opaque) 82%, var(--mask-transparent) 100%)",
            }}
          >
            <Image
              key={profileImageSrc}
              src={profileImageSrc}
              alt="Carlos Andres profile photo"
              width={420}
              height={560}
              priority
              className="w-full h-auto object-cover grayscale contrast-110 brightness-95"
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
            background: "linear-gradient(to bottom, var(--portfolio-text-subtle), transparent)",
          }}
        />
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "var(--portfolio-text-faint)",
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
          color: "color-mix(in srgb, var(--portfolio-text) 4%, transparent)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        CA
      </div>
    </section>
  );
}
