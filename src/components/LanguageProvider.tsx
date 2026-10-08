"use client";

import { createContext, useContext, ReactNode } from "react";
import { translations, Language, Translations } from "@/lib/translations";

// Site somente em inglês (briefing). O provider é mantido para que os
// componentes continuem lendo os textos de translations.ts via useLanguage().
interface LanguageContextType {
  lang: Language;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ lang: "en", t: translations.en }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
