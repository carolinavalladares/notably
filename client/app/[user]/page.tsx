"use client";
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { formatMemberSince } from "@/utils/formatMemberSince";
import Post from "@/components/Post";

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
            <div className="mb-2">
              <p className="text-sm font-medium my-1  text-center ">
                @{user.name}
              </p>
              <div className="text-xs font-light flex flex-col text-center">
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
                <span>Followers</span>
                <span className="font-medium">{user.followers.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Following</span>
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

        <div>
          {user?.posts?.map((post, i) => {
            return (
              <div key={i} className="mb-2">
                <Post post={post} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default page;
