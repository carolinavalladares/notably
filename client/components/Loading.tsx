"use client";

import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { Loader } from "lucide-react";
import React from "react";

interface IProps {
  height?: string;
}

const Loading = ({ height }: IProps) => {
  const { language } = useTranslation();

  return (
    <div
      style={{ height: height && height }}
      className={`${
        !height && "h-48"
      } w-full flex flex-col items-center justify-center text-text-color `}
    >
      <span className="h-fit w-fit block animate-spin mb-2">
        <Loader size={28} strokeWidth={1.5} />
      </span>
      <p className="text-sm font-medium">
        {TRANSLATIONS[language].text.loading}
      </p>
    </div>
  );
};

export default Loading;
