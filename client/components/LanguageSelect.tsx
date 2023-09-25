"use client";
import React, { useState } from "react";
import { Languages } from "lucide-react";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";

const languages = ["english", "portuguese"];

const LanguageSelect = () => {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleLanguage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.currentTarget;

    const name = target.getAttribute("name") as keyof ITranslations;

    setLanguage(name);

    setOpen(false);
  };

  return (
    <>
      <div className="relative text-text-color">
        <button
          onClick={() => setOpen(!open)}
          title={TRANSLATIONS[language].labels.chooseLanguage}
        >
          <Languages
            size={16}
            strokeWidth={2}
            style={{ color: "var(--text-color)" }}
          />
        </button>

        {open && (
          <div className="w-64 z-50  bg-background-primary shadow-md shadow-shadow-color p-4 absolute right-[120px] translate-x-1/2 top-[calc(100%+10px)]">
            <p className="mb-2 font-medium text-sm">
              {TRANSLATIONS[language].labels.chooseLanguage}
            </p>
            <div className="flex flex-col">
              {languages.map((item, i) => {
                return (
                  <button
                    onClick={handleLanguage}
                    name={item}
                    className="border-b border-border-color last-of-type:border-none py-1"
                    key={i}
                  >
                    <p
                      className={`w-full text-start text-sm  ${
                        item == language ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {TRANSLATIONS[language].labels[item as keyof ILabels]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {open && (
        <div
          onClick={() => setOpen(!open)}
          className="bg-transparent absolute inset-0 z-30"
        ></div>
      )}
    </>
  );
};

export default LanguageSelect;
