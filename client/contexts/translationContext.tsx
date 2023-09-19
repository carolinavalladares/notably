"use client";

import { createContext, useState } from "react";

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

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}
