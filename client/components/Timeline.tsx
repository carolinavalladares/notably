"use client";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { useState } from "react";

const Timeline = () => {
  const [posts, setPosts] = useState([]);

  const { language } = useTranslation();

  return (
    <div className="text-text-color w-full">
      <div>
        {posts.length < 1 ? (
          <div className="flex items-center justify-center h-60 font-light text-sm">
            <p>{TRANSLATIONS[language].text.noPosts}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
