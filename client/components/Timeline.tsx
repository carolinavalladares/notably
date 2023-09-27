"use client";
import TRANSLATIONS from "@/CONSTS/translations";
import useAuth from "@/hooks/useAuth";
import useTranslation from "@/hooks/useTranslation";
import { fetchTimeline } from "@/services/notablyAPI";
import { useEffect, useState } from "react";
import Post from "./Post";
import { IPost } from "@/types/types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

const Timeline = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [done, setDone] = useState(false);
  const { language } = useTranslation();
  const { user } = useAuth();

  const getTimeline = async (page?: number) => {
    if (!user) {
      return;
    }

    try {
      const data = await fetchTimeline(currentPage);

      const timeline = data && data.data.timeline;

      setPosts([...posts, ...timeline]);
      setCurrentPage((prev) => prev + 1);

      // if current page is empty, stop fetching
      if (timeline.length < 1) {
        return setDone(true);
      }
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
          <div className=" mt-4">
            <InfiniteScroll
              dataLength={posts.length}
              next={() => getTimeline()}
              hasMore={!done ? true : false}
              loader={<Loading height="70px" />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts &&
                posts.map((post, i) => {
                  return (
                    <div key={i} className="mb-2">
                      <Post post={post} />
                    </div>
                  );
                })}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
