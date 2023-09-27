import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import React from "react";

const AllSeen = () => {
  const { language } = useTranslation();
  return (
    <p className=" text-center px-4 py-2 font-semibold text-sm  border border-accent rounded-sm bg-background-primary text-text-color">
      {TRANSLATIONS[language].text.allSeen}
    </p>
  );
};

export default AllSeen;
