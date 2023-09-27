"use client";
import useAuth from "@/hooks/useAuth";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import Badge from "@/components/Badge";
import Timeline from "@/components/Timeline";
import { Divide, Plus } from "lucide-react";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import User from "@/components/User";
import { IUser } from "@/types/types";
import { getUsersSuggestions } from "@/services/notablyAPI";
import Loading from "@/components/Loading";
import UserSuggestions from "@/components/UserSuggestions";
import { useMediaQuery } from "react-responsive";
import { maxScreenWidth } from "@/CONSTS/mediaQuery";

export default function Home() {
  const { user, userLoading } = useAuth();
  const { language } = useTranslation();
  const router = useRouter();
  const isMobile = useMediaQuery({ query: `(max-width: ${maxScreenWidth})` });

  // redirect to login page in case the user is not logged in
  useEffect(() => {
    if (userLoading) {
      return;
    }

    if (user == null) {
      return router.push("/login");
    }
  }, [userLoading]);

  // display loading screen
  if (userLoading) {
    return <Loading />;
  }

  return (
    <main className="py-4 flex items-start gap-4">
      {!isMobile && (
        <div className="w-full max-w-[250px]">
          <Badge />

          {/* User suggestions */}
          <div className="bg-background-primary text-text-color mt-4 shadow-md p-4">
            <UserSuggestions />
          </div>
        </div>
      )}

      <section className="flex-1 text-text-color">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Timeline</h2>

          {/* Create new post button */}
          <a
            href="/new-post"
            title={TRANSLATIONS[language].text.createPost}
            className="bg-accent text-white font-medium px-4 py-2 rounded-sm text-sm"
          >
            <Plus size={20} strokeWidth={2.75} />
          </a>
        </div>

        <Timeline />
      </section>
    </main>
  );
}
