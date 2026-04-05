"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  translations,
  type Language,
  type TranslationDictionary,
} from "../../lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

export function useLang() {
  return useTranslation();
}
