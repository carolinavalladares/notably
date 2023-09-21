"user client";
import React from "react";
import Avatar from "./Avatar";
import { formatDate } from "@/utils/formatDate";
import useTranslation from "@/hooks/useTranslation";
import { Divide, Star } from "lucide-react";
import { IPost } from "@/types/types";

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const { language } = useTranslation();
  return (
    <div className="bg-background-primary text-text-color p-4">
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

          <p className="text-sm mt-2 ml-3">{post.content}</p>

          <div
            className={`mt-2 ml-4 border-t border-border-color pt-2 text-text-color`}
          >
            <button className="flex items-center gap-1 ">
              <Star size={16} strokeWidth={1.5} />
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
