"use client";

import Avatar from "./Avatar";
import useAuth from "@/hooks/useAuth";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { LogOut, UserCog } from "lucide-react";
import { toast } from "react-toastify";
import formatHandle from "@/utils/formatHandle";

const Badge = () => {
  const { user, signOut } = useAuth();
  const { language } = useTranslation();

  const handleLogout = () => {
    try {
      signOut();
    } catch (e) {
      return toast.error(TRANSLATIONS[language].validation.logoutFailed);
    }
  };

  return (
    <div className="bg-background-primary shadow-md w-full max-w-[250px] p-4 text-text-color relative">
      <div>
        {/* User info */}
        {user && (
          <div className="flex flex-col items-center justify-center">
            <a title={TRANSLATIONS[language].labels.myProfile} href={`/me`}>
              <Avatar width="60px" image={user.image as string} />

              <div className="mb-2 mt-1">
                <p className="text-sm font-medium   text-center capitalize leading-none ">
                  {user.name}
                </p>
                <p className="text-xs  text-center ">
                  {formatHandle(user.name)}
                </p>
              </div>
            </a>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              title={TRANSLATIONS[language].labels.logout}
              className="flex items-center justify-center gap-1 text-xs text-rose-500 m-auto font-medium"
            >
              {TRANSLATIONS[language].labels.logout}
              <LogOut size={14} strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Badge;
