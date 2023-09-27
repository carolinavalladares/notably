import useAuth from "@/hooks/useAuth";
import useTranslation from "@/hooks/useTranslation";
import Avatar from "./Avatar";
import formatHandle from "@/utils/formatHandle";
import TRANSLATIONS from "@/CONSTS/translations";
import { toast } from "react-toastify";
import { LogOut, Users, X } from "lucide-react";
import { useState } from "react";
import UserSuggestions from "./UserSuggestions";

const MobileNav = () => {
  const { user, signOut } = useAuth();
  const { language } = useTranslation();
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e) {
      return toast.error(TRANSLATIONS[language].validation.logoutFailed);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background-primary text-text-color shadow-md shadow-shadow-color py-2 px-4 ">
      <div className="max-w-lg m-auto flex items-center justify-between">
        {/* user  */}
        {user && (
          <div className=" w-fit">
            <a
              title={TRANSLATIONS[language].labels.myProfile}
              className="flex items-center justify-center gap-2"
              href="/me"
            >
              <Avatar width="50px" image={user.image} />
              <div>
                <p className="capitalize text-sm font-medium">{user.name}</p>
                <p className="text-xs">{formatHandle(user.name)}</p>
              </div>
            </a>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setSuggestionsOpen((prev) => !prev)}
            title={TRANSLATIONS[language].text.whoToFollow}
          >
            <Users />
          </button>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            title={TRANSLATIONS[language].labels.logout}
            className="flex items-center justify-center gap-1 text-xs text-rose-500 m-auto font-medium"
          >
            <LogOut size={20} strokeWidth={2} />
          </button>
        </div>

        {suggestionsOpen && (
          <div className="fixed inset-0 bg-background-primary text-text-color p-4 ">
            <button
              onClick={() => setSuggestionsOpen((prev) => !prev)}
              className="absolute top-4 right-4"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
            <UserSuggestions />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
