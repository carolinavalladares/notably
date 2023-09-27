"use client";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import React from "react";

interface IProps {
  isMobile: boolean;
}

const Footer = ({ isMobile }: IProps) => {
  const { language } = useTranslation();

  return (
    <footer className={`text-text-color py-2 ${isMobile && "pb-[68px]"}`}>
      <p className="text-[11px] font-light text-center">
        {TRANSLATIONS[language].labels.developedBy}{" "}
        <a
          target="_blank"
          href="https://github.com/carolinavalladares"
          className="text-accent font-medium hover:underline"
        >
          Carolina Valladares
        </a>
      </p>
    </footer>
  );
};

export default Footer;
