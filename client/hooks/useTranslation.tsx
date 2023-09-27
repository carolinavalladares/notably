"use client";
import { useContext } from "react";

import { TranslationContext } from "@/contexts/translationContext";

export default function useTranslation() {
  const { language, changeLanguage } = useContext(TranslationContext);

  return { language, changeLanguage };
}
