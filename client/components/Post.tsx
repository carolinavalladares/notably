"user client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { formatDate } from "@/utils/formatDate";
import useTranslation from "@/hooks/useTranslation";
import { Star } from "lucide-react";
import { IPost } from "@/types/types";
import useAuth from "@/hooks/useAuth";
import { likePost, unlikePost } from "@/services/notablyAPI";
import TRANSLATIONS from "@/CONSTS/translations";
import Display from "./Display";

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const { language } = useTranslation();
  const { user, getMe } = useAuth();
  const [likesPost, setLikesPost] = useState(false);

  useEffect(() => {
    if (user) {
      const like = post.likes?.find((like) => {
        return like.id == user.id;
      });

      if (like) {
        setLikesPost(true);
      }
    }
  }, [user]);

  const handleLike = async () => {
    if (!user) {
      return;
    }
    try {
      if (likesPost) {
        await unlikePost(post.id);

        setLikesPost(false);
      } else {
        await likePost(post.id);

        setLikesPost(true);
      }

      // refresh user
      getMe();
    } catch (e) {
      return console.log(e);
    }
  };

  return (
    <div className="bg-background-primary text-text-color p-4 shadow-sm">
      {post ? (
        <div>
          <div className="flex items-center justify-between gap-2">
            <a href="/">
              <div className="flex items-center gap-2">
                <Avatar width="50px" image={post.author.image} />
                <div>
                  <p className="text-sm font-medium">@{post.author.name}</p>
                </div>
              </div>
            </a>

            <p className="text-xs font-light ">
              {formatDate(post?.created_at, language)}
            </p>
          </div>

          <p className="text-sm mt-2 ml-3">
            <Display content={post.content} />
          </p>

          <div
            className={`mt-2 ml-4 border-t border-border-color pt-2  ${
              likesPost ? "text-accent" : "text-text-color"
            }`}
          >
            <button
              title={
                likesPost
                  ? TRANSLATIONS[language].labels.unlike
                  : TRANSLATIONS[language].labels.like
              }
              onClick={handleLike}
              className={`flex items-center gap-1 `}
            >
              <Star
                size={16}
                strokeWidth={1.5}
                fill={likesPost ? "var(--accent)" : "transparent"}
              />
              <span className="text-xs">{post.likes?.length}</span>
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Post;
