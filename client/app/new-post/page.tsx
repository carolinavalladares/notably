"use client";
import TRANSLATIONS from "@/CONSTS/translations";
import Button from "@/components/Button";
import Editor from "@/components/Editor";
import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import useTranslation from "@/hooks/useTranslation";
import { createPost } from "@/services/notablyAPI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useTranslation();
  const { getMe, user, userLoading } = useAuth();
  const router = useRouter();

  // restrict route
  useEffect(() => {
    if (userLoading) {
      return;
    }

    if (user == null) {
      return router.push("/login");
    }
  }, [user]);

  const handleCreatePost = async (content: string) => {
    if (content == "") {
      return;
    }

    setLoading(true);

    try {
      await createPost({ content });

      toast.success("Post created successfully");

      setContent("");

      await getMe();

      setLoading(false);

      return router.push(`/me`);
    } catch (e) {
      setLoading(false);
      return toast.error("error creating new post...");
    }
  };

  // display loading screen
  if (userLoading) {
    return <Loading />;
  }

  return (
    <div className="text-text-color ">
      <h1 className="my-4 text-lg font-medium">
        {TRANSLATIONS[language].text.createPost}
      </h1>

      <div className="p-4 bg-background-primary text-text-color shadow-md">
        <Editor content={content} setContent={setContent} />

        <div className="ml-auto my-0 w-20">
          <Button
            type="submit"
            label={TRANSLATIONS[language].labels.post}
            title={TRANSLATIONS[language].labels.post}
            onClick={() => handleCreatePost(content)}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
