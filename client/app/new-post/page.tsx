"use client";
import TRANSLATIONS from "@/CONSTS/translations";
import Editor from "@/components/Editor";
import useAuth from "@/hooks/useAuth";
import useTranslation from "@/hooks/useTranslation";
import { createPost } from "@/services/notablyAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CHARACTERLIMIT } from "@/CONSTS/editor";

const page = () => {
  const [content, setContent] = useState("");
  const { language } = useTranslation();
  const { user, getMe } = useAuth();
  const router = useRouter();

  const handleCreatePost = async (content: string) => {
    if (content == "") {
      return;
    }

    try {
      await createPost({ content });

      toast.success("Post created successfully");

      setContent("");

      await getMe();

      return router.push(`/${user?.id}`);
    } catch (e) {
      return toast.error("error creating new post...");
    }
  };

  return (
    <div className="text-text-color ">
      <h1 className="my-4 text-lg font-medium">
        {TRANSLATIONS[language].text.createPost}
      </h1>

      <div className="p-4 bg-background-primary text-text-color shadow-md">
        <Editor content={content} setContent={setContent} />

        <div className="flex justify-end">
          <button
            onClick={() => handleCreatePost(content)}
            title={TRANSLATIONS[language].labels.post}
            className="bg-accent text-white py-2 px-4"
          >
            {TRANSLATIONS[language].labels.post}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
