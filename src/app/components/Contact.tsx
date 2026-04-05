import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowUpLeft, Mail, Github, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

function scrollToTop() {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
}

const socials = [
  {
    name: "Gmail",
    icon: Mail,
    href: "mailto:carlostaquez232@gmail.com",
    newTab: false,
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/CarlosTaquez",
    newTab: true,
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/carlos_andres.t",
    newTab: true,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/carlos-andres-taquez",
    newTab: true,
  },
];

const fadeVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { lang, t } = useTranslation();

  return (
    <section
      id="contact"
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
            {t.contact.sectionLabel}
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
          marginBottom: "2rem",
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
            style={{ display: "inline-block" }}
          >
            {t.contact.title}
          </motion.span>
        </AnimatePresence>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ marginBottom: "6rem" }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${lang}`}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }}
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              fontWeight: 300,
              maxWidth: "400px",
            }}
          >
            {t.contact.subtitle}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <div className="flex flex-wrap gap-5 md:gap-6">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target={social.newTab ? "_blank" : undefined}
              rel={social.newTab ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group"
              style={{ textDecoration: "none" }}
              whileHover={{ y: -6, scale: 1.05 }}
              title={social.name}
            >
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease",
                  background: "rgba(255,255,255,0.02)",
                }}
                className="group-hover:!border-[#E10600] group-hover:!bg-[rgba(225,6,0,0.08)] group-hover:shadow-[0_0_24px_rgba(225,6,0,0.18)]"
              >
                <Icon
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "rgba(255,255,255,0.5)",
                    transition: "color 0.3s ease",
                  }}
                  className="group-hover:!text-[#E10600]"
                />
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-10 right-8 md:right-16 lg:right-24"
      >
        <span
          style={{
            color: "rgba(255,255,255,0.15)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {t.contact.footer}
        </span>
      </motion.div>

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
            {t.contact.backToTop}
          </motion.span>
        </AnimatePresence>
      </button>
    </section>
  );
}
