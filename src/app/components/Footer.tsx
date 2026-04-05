import { useTranslation } from "../context/LanguageContext";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      id="footer"
      className="relative flex items-center justify-center py-8 px-8 md:px-16 lg:px-24"
      style={{ background: "#0B0B0B" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.08)" }} />
      <span
        style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {t.footer.text}
      </span>
    </footer>
  );
}
