"use client";

import TRANSLATIONS from "@/CONSTS/translations";
import Avatar from "@/components/Avatar";
import FollowBtn from "@/components/FollowBtn";
import Post from "@/components/Post";
import useAuth from "@/hooks/useAuth";
import useTranslation from "@/hooks/useTranslation";
import { getOneUser } from "@/services/notablyAPI";
import { IUser } from "@/types/types";
import formatHandle from "@/utils/formatHandle";
import { formatMemberSince } from "@/utils/formatMemberSince";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { user } = useAuth();
  const [userPage, setUserPage] = useState<IUser | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { language } = useTranslation();

  const getUser = async () => {
    const id = Number(path[1]);

    // if id is the same as authenticated user's id then redirect the user to auth user's page
    if (id == user?.id) {
      return router.push("/me");
    }

    const resp = await getOneUser(id);

    setUserPage(resp);
  };

  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }

    getUser();
  }, [user]);

  // determine if authenticated user follows this user
  useEffect(() => {
    const following = user?.following.find((item) => item.id == userPage?.id);
    if (following) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user, userPage]);

  return (
    <div className="py-4">
      {userPage && (
        <section className="bg-background-primary text-text-color p-4 flex flex-col items-center shadow-md">
          <div>
            {/* user image */}
            <Avatar width="70px" image={userPage.image} />
            <div className="mb-2 mt-2">
              {/* username and handle */}
              <div className="flex flex-col justify-center items-center mb-2">
                <p className="font-medium w-fit  leading-none text-center mb-1">
                  {userPage.name}
                </p>
                <p className="text-xs w-fit  leading-none  text-center ">
                  {formatHandle(userPage.name)}
                </p>
              </div>

              <div className="text-xs font-light  text-center">
                <span className="leading-none">
                  {TRANSLATIONS[language].text.memberSince}:{" "}
                </span>
                <span className="leading-none font-medium">
                  {formatMemberSince(userPage.created_at, language)}
                </span>
              </div>
            </div>
          </div>

          <div>
            {/* followers and following amounts */}
            <div className="flex items-center justify-center text-sm gap-4 mb-2">
              <div className="flex flex-col items-center">
                <span>{TRANSLATIONS[language].text.followers}</span>
                <span className="font-medium">{userPage.followers.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{TRANSLATIONS[language].text.following}</span>
                <span className="font-medium">{userPage.following.length}</span>
              </div>
            </div>

            {/* Follow btn */}
            <FollowBtn isFollowing={isFollowing} userToFollow={userPage} />
          </div>
        </section>
      )}

      {/* user's posts */}
      <section className="mt-4">
        <h2 className="text-lg font-medium ml-2 mb-2 capitalize">
          {TRANSLATIONS[language].text.posts}
        </h2>

        {userPage && userPage.posts && userPage.posts.length >= 1 ? (
          <div>
            {userPage?.posts?.map((post, i) => {
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
