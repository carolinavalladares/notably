"use client";
import useAuth from "@/hooks/useAuth";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Badge from "@/components/Badge";
import Timeline from "@/components/Timeline";
import Post from "@/components/Post";

export default function Home() {
  const { user, signOut } = useAuth();
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

      <div>
        <Timeline />

        <Post />
      </div>
    </main>
  );
}
