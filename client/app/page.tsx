"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    <main className="">
      <button onClick={signOut}>SignOut</button>
    </main>
  );
}
