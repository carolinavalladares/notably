"use client";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { formatMemberSince } from "@/utils/formatMemberSince";
import Post from "@/components/Post";
import formatHandle from "@/utils/formatHandle";

const page = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { language } = useTranslation();

  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
  }, [user]);

  return (
    <div className="py-4">
      {user && (
        <section className="bg-background-primary text-text-color p-4 flex flex-col items-center shadow-md">
          <div>
            <Avatar width="70px" image={user.image} />
            <div className="mb-2 mt-2">
              {/* username and handle */}
              <div className="flex flex-col justify-center items-center mb-2">
                <p className="font-medium w-fit  leading-none text-center mb-1">
                  {user.name}
                </p>
                <p className="text-xs w-fit  leading-none  text-center ">
                  {formatHandle(user.name)}
                </p>
              </div>

              <div className="text-xs font-light  text-center">
                <span className="leading-none">
                  {TRANSLATIONS[language].text.memberSince}:{" "}
                </span>
                <span className="leading-none font-medium">
                  {formatMemberSince(user.created_at, language)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center text-sm gap-4 mb-2">
              <div className="flex flex-col items-center">
                <span>{TRANSLATIONS[language].text.followers}</span>
                <span className="font-medium">{user.followers.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{TRANSLATIONS[language].text.following}</span>
                <span className="font-medium">{user.following.length}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mt-4">
        <h2 className="text-lg font-medium ml-2 mb-2">
          {TRANSLATIONS[language].text.myPosts}
        </h2>

        {user && user.posts && user.posts.length >= 1 ? (
          <div>
            {user?.posts?.map((post, i) => {
              return (
                <div key={i} className="mb-2">
                  <Post post={post} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 font-light text-sm">
            <p>{TRANSLATIONS[language].text.noPosts}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default page;
