"use client";
import TRANSLATIONS from "@/CONSTS/translations";
import Editor from "@/components/Editor";
import useTranslation from "@/hooks/useTranslation";
import React from "react";

const page = () => {
  const { language } = useTranslation();
  return (
    <div className="text-text-color ">
      <h1 className="my-4 text-lg font-medium">
        {TRANSLATIONS[language].text.createPost}
      </h1>

      <div className="p-4 bg-background-primary text-text-color shadow-sm">
        <Editor />

        <div className="flex justify-end">
          <button
            title={TRANSLATIONS[language].labels.post}
            className="bg-accent text-white py-2 px-4"
          >
            {TRANSLATIONS[language].labels.post}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
