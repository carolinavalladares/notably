"use client";

import TRANSLATIONS from "@/CONSTS/translations";
import Avatar from "@/components/Avatar";
import Post from "@/components/Post";
import useTranslation from "@/hooks/useTranslation";
import { getOneUser } from "@/services/notablyAPI";
import { IUser } from "@/types/types";
import { formatMemberSince } from "@/utils/formatMemberSince";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const path = usePathname();
  const { language } = useTranslation();

  const getUser = async () => {
    const id = Number(path[1]);

    const resp = await getOneUser(id);

    setUser(resp);
  };

  useEffect(() => {
    getUser();
  }, []);

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
        <h2 className="text-lg font-medium ml-2 mb-2 capitalize">
          {TRANSLATIONS[language].text.posts}
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
