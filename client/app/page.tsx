"use client";
import useAuth from "@/hooks/useAuth";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Badge from "@/components/Badge";
import Timeline from "@/components/Timeline";
import Post from "@/components/Post";
import { Plus } from "lucide-react";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";

export default function Home() {
  const { user } = useAuth();
  const { language } = useTranslation();
  const router = useRouter();

  // redirect to login page in case the user is not logged in
  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
  }, []);

  return (
    <main className="py-4 flex items-start gap-4">
      <Badge />

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
