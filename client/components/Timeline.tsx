"use client";
import TRANSLATIONS from "@/CONSTS/translations";
import useAuth from "@/hooks/useAuth";
import useTranslation from "@/hooks/useTranslation";
import { fetchTimeline } from "@/services/notablyAPI";
import { useEffect, useState } from "react";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const { language } = useTranslation();
  const { user } = useAuth();

  const getTimeline = async () => {
    try {
      const timeline = (await fetchTimeline()).data.timeline;

      console.log(timeline);

      setPosts(timeline);
    } catch (e) {
      return console.log("Error fetching timeline: ", e);
    }
  };

  useEffect(() => {
    getTimeline();
  }, [user]);

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
