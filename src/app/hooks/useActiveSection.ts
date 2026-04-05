import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

    let rafId = 0;

    const calculateActiveSection = () => {
      const sections = getSections();
      if (sections.length === 0) return;

      const viewportCenter = window.innerHeight * 0.45;

      let containingCenter: string | null = null;
      let nearestId = sections[0].id;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          containingCenter = section.id;
          break;
        }

        const distance = Math.abs(rect.top - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestId = section.id;
        }
      }

      setActiveSection(containingCenter ?? nearestId);
    };

    const requestCalculation = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(calculateActiveSection);
    };

    const observer = new IntersectionObserver(
      () => requestCalculation(),
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    const sections = getSections();

    for (const section of sections) {
      observer.observe(section);
    }

    window.addEventListener("scroll", requestCalculation, { passive: true });
    window.addEventListener("resize", requestCalculation);
    requestCalculation();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestCalculation);
      window.removeEventListener("resize", requestCalculation);
      for (const section of sections) {
        observer.unobserve(section);
      }
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
