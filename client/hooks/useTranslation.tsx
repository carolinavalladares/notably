"use client";
import { useContext } from "react";

import { TranslationContext } from "@/contexts/translationContext";

export default function useTranslation() {
  const { language, setLanguage } = useContext(TranslationContext);

  return { language, setLanguage };
}
