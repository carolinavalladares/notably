import TRANSLATIONS from "@/CONSTS/translations";
import useAuth from "@/hooks/useAuth";
import useTranslation from "@/hooks/useTranslation";
import { followUser, unfollowUser } from "@/services/notablyAPI";
import { IUser } from "@/types/types";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";

interface IProps {
  isFollowing: boolean;
  userToFollow: IUser;
}

const FollowBtn = ({ isFollowing, userToFollow }: IProps) => {
  const { language } = useTranslation();
  const { user, getMe } = useAuth();
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState<string>("");

  useEffect(() => {
    if (isFollowing) {
      setBtnText(TRANSLATIONS[language].labels.unfollow);
    } else {
      setBtnText(TRANSLATIONS[language].labels.follow);
    }
  }, [isFollowing, language]);

  const handleFollow = async () => {
    if (!userToFollow || !user) {
      return;
    }

    setLoading(true);

    if (!isFollowing) {
      await followUser(userToFollow.id);
    } else {
      await unfollowUser(userToFollow.id);
    }

    setLoading(false);

    // refetch authenticated user
    getMe();
  };

  return (
    <button
      className={`w-full flex items-center border justify-center rounded-sm h-9 text-sm font-medium  ${
        isFollowing
          ? "bg-accent border-accent text-white hover:bg-transparent hover:text-accent "
          : "bg-transparent border-accent text-accent"
      } `}
      // handle follow
      onClick={handleFollow}
    >
      {!loading ? (
        <span>{btnText}</span>
      ) : (
        <span className="h-fit w-fit animate-spin">
          <Loader size={20} strokeWidth={1.75} />
        </span>
      )}
    </button>
  );
};

export default FollowBtn;
