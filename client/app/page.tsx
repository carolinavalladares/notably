"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  // redirect to login page in case the user is not logged in
  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
  }, []);

  return (
    <main className="">
      <div className="h-50 w-50 bg-background text-text-color">Hello</div>
    </main>
  );
}
