"use client";
import TRANSLATIONS from "@/CONSTS/translations";
import useAuth from "@/hooks/useAuth";
import useTranslation from "@/hooks/useTranslation";
import { fetchTimeline } from "@/services/notablyAPI";
import { useEffect, useState } from "react";
import Post from "./Post";
import { IPost } from "@/types/types";

const Timeline = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useTranslation();
  const { user } = useAuth();

  const getTimeline = async (page?: number) => {
    if (!user) {
      return;
    }

    try {
      const data = await fetchTimeline(page && page);

      const timeline = data && data.data.timeline;

      console.log(timeline);

      setPosts(timeline);
    } catch (e) {
      return console.log("Error fetching timeline: ", e);
    }
  };

  useEffect(() => {
    getTimeline(1);
  }, [user]);

  return (
    <div className="text-text-color w-full">
      <div>
        {posts.length < 1 ? (
          <div className="flex items-center justify-center h-60 font-light text-sm">
            <p>{TRANSLATIONS[language].text.noPosts}</p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {posts &&
              posts.map((post, i) => {
                return <Post post={post} key={i} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
