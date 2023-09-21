"user client";
import React from "react";
import Avatar from "./Avatar";
import { formatDate } from "@/utils/formatDate";
import useTranslation from "@/hooks/useTranslation";
import { Star } from "lucide-react";

const Post = () => {
  const { language } = useTranslation();
  return (
    <div className="bg-background-primary text-text-color p-4">
      <div className="flex items-center justify-between gap-2">
        <a href="/">
          <div className="flex items-center gap-2">
            <Avatar width="50px" image="avatar_03" />
            <div>
              <p className="text-sm font-medium">@carol</p>
            </div>
          </div>
        </a>

        <p className="text-xs font-light ">
          {formatDate("2023-09-18T21:10:25", language)}
        </p>
      </div>

      <p className="text-sm mt-2 ml-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eius
        minima at eaque sed impedit provident maxime. Consectetur rerum dolor
        sapiente reprehenderit explicabo mollitia accusamus quam voluptates! Ab
        delectus nulla doloribus tempora, eaque consequuntur blanditiis earum ad
        magni reiciendis animi sint temporibus quia autem officiis, assumenda
        quidem laudantium, in nostrum?
      </p>

      <div
        className={`mt-2 ml-4 border-t border-border-color pt-2 text-text-color`}
      >
        <button className="flex items-center gap-1 ">
          <Star size={16} strokeWidth={1.5} />
          <span className="text-xs">0</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
