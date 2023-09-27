"use client";

import { createContext, useEffect, useState } from "react";

interface ITranslationContext {
  language: keyof ITranslations;
  changeLanguage: (language: keyof ITranslations) => void;
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
    if (window.localStorage.getItem("notably_language")) {
      setLanguage(
        window.localStorage.getItem("notably_language") as keyof ITranslations
      );
    } else if (window.navigator.language == "pt-BR") {
      setLanguage("portuguese");
    } else {
      setLanguage("english");
    }
  }, []);

  const changeLanguage = (language: keyof ITranslations) => {
    setLanguage(language);

    // save language in localstorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("notably_language", language);
    }
  };

  return (
    <TranslationContext.Provider value={{ language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}
