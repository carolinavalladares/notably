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
  const [language, setLanguage] = useState<keyof ITranslations>("portuguese");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("notably_language")) {
        setLanguage(
          window.localStorage.getItem("notably_language") as keyof ITranslations
        );
      } else if (window.navigator.language == "pt-BR" || "pt-PT") {
        setLanguage("portuguese");
      } else {
        setLanguage("english");
      }
    }
  }, []);

  // when language changes set localStorage to current language
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("notably_language", language);
    }
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}
