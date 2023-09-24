"use client";
import useAuth from "@/hooks/useAuth";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import Timeline from "@/components/Timeline";
import { Plus } from "lucide-react";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import User from "@/components/User";
import { IUser } from "@/types/types";
import { getUsersSuggestions } from "@/services/notablyAPI";

export default function Home() {
  const { user } = useAuth();
  const { language } = useTranslation();
  const router = useRouter();
  const [users, setUsers] = useState<IUser[] | null>(null);

  // redirect to login page in case the user is not logged in
  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
  }, []);

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestions = async () => {
    const usersSuggestions = await getUsersSuggestions();
    if (!usersSuggestions) {
      return;
    }

    setUsers(usersSuggestions as IUser[]);
  };

  return (
    <main className="py-4 flex items-start gap-4">
      <div className="w-full max-w-[250px]">
        <Badge />

        {/* User suggestions */}
        <div className="bg-background-primary text-text-color mt-4 shadow-md p-4">
          <h2 className="mb-2 font-medium text-center">
            {TRANSLATIONS[language].text.whoToFollow}
          </h2>
          {users?.map((item, i) => {
            return <User user={item} key={i} />;
          })}
        </div>
      </div>

      <section className="flex-1">
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
