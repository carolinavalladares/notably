"user client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { formatDate } from "@/utils/formatDate";
import useTranslation from "@/hooks/useTranslation";
import { Star } from "lucide-react";
import { IPost } from "@/types/types";
import useAuth from "@/hooks/useAuth";
import { getOnePost, likePost, unlikePost } from "@/services/notablyAPI";
import TRANSLATIONS from "@/CONSTS/translations";
import Display from "./Display";

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const { language } = useTranslation();
  const { user } = useAuth();
  const [likesPost, setLikesPost] = useState(false);
  const [likes, setLikes] = useState(0);

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

      // refetch post to set likes amount
      const data = await getOnePost(post.id);

      setLikes(data.post.likes.length);
    } catch (e) {
      return console.log(e);
    }
  };

  useEffect(() => {
    if (user && post) {
      const like = post.likes?.find((like) => {
        return like.id == user.id;
      });

      if (like) {
        setLikesPost(true);
      }

      if (post.likes) {
        setLikes(post.likes.length);
      }
    }
  }, [user]);

  return (
    <div className="bg-background-primary text-text-color p-4 shadow-md">
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

          {/* Post content */}
          <div className="flex flex-col ">
            <Display content={post.content} />
          </div>

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
              <span className="text-xs">{likes}</span>
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
