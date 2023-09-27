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
import AllSeen from "./AllSeen";
import { RefreshCw } from "lucide-react";

const Timeline = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [done, setDone] = useState(false);
  const { language } = useTranslation();
  const { user, getMe } = useAuth();
  const [loading, setLoading] = useState(false);

  const getTimeline = async (page?: number) => {
    if (!user) {
      return;
    }

    // if it's the first fetch show loading screen, otherwise loading will be handled by infinit scrolling component
    if (currentPage == 1) {
      setLoading(true);
    }

    try {
      const data = await fetchTimeline(currentPage);

      const timeline = data && data.data.timeline;

      setPosts([...posts, ...timeline]);
      setCurrentPage((prev) => prev + 1);

      setLoading(false);

      // if current page is empty, stop fetching
      if (timeline.length < 1) {
        return setDone(true);
      }
    } catch (e) {
      setLoading(false);
      return console.log("Error fetching timeline: ", e);
    }
  };

  const handleRefresh = async () => {
    setCurrentPage(1);
    setDone(false);
    await setPosts([]);

    getMe();
  };

  useEffect(() => {
    // initial timeline fetch | refetches every time user changes
    getTimeline(1);
  }, [user]);

  return (
    <div className="text-text-color w-full mt-4 ">
      <button
        onClick={handleRefresh}
        title={TRANSLATIONS[language].text.refreshTimeline}
        className="text-xs w-fit text-accent mb-2 font-medium flex items-center justify-center gap-1"
      >
        <RefreshCw size={14} />
        {TRANSLATIONS[language].text.refreshTimeline}
      </button>
      <div>
        {loading ? (
          <Loading />
        ) : posts.length < 1 ? (
          <div className="flex items-center justify-center h-60 font-light text-sm">
            <p>{TRANSLATIONS[language].text.noPosts}</p>
          </div>
        ) : (
          <div>
            <InfiniteScroll
              dataLength={posts.length}
              next={() => getTimeline()}
              hasMore={!done ? true : false}
              loader={<Loading height="70px" />}
              endMessage={<AllSeen />}
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
