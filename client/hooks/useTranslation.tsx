"use client";
import { useContext } from "react";

import { TranslationContext } from "@/contexts/TranslationContext";

export default function useTranslation() {
  const { language, setLanguage } = useContext(TranslationContext);

  return { language, setLanguage };
}
