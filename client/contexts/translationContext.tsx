"use client";

import { createContext, useEffect, useState } from "react";

interface ITranslationContext {
  language: keyof ITranslations;
  setLanguage: React.Dispatch<keyof ITranslations>;
}

export const TranslationContext = createContext({
  language: "portuguese",
} as ITranslationContext);

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export default function TranslationContextProvider({ children }: IProps) {
  const [language, setLanguage] = useState<keyof ITranslations>(
    localStorage.getItem("notably_language")
      ? (localStorage.getItem("notably_language") as keyof ITranslations)
      : // browser language
      navigator.language == "pt-BR" || "pt-PT"
      ? "portuguese"
      : "english"
  );

  // when language changes set localStorage to current language
  useEffect(() => {
    localStorage.setItem("notably_language", language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}
