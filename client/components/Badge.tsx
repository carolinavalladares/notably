"use client";
import { useEffect } from "react";
import Avatar from "./Avatar";
import useAuth from "@/hooks/useAuth";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { formatMemberSince } from "@/utils/formatMemberSince";

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
    <div className="bg-background-primary shadow-md w-full max-w-[250px] p-4 text-text-color ">
      {/* User info */}
      {user && (
        <div className="flex flex-col items-center justify-center">
          <a
            title={TRANSLATIONS[language].labels.myProfile}
            href={`/user/${user.id}`}
          >
            <Avatar width="60px" image={user.image as string} />

            <div className="mb-2">
              <p className="text-sm font-medium my-1  text-center ">
                @{user.name}
              </p>
              <div className="text-xs font-light flex flex-col text-center">
                <span className="leading-none">
                  {TRANSLATIONS[language].text.memberSince}:{" "}
                </span>
                <span className="leading-none font-medium">
                  {formatMemberSince(user.created_at, language)}
                </span>
              </div>
            </div>
          </a>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            title={TRANSLATIONS[language].labels.logout}
            className="flex items-center justify-center gap-1 text-sm text-rose-500 m-auto"
          >
            {TRANSLATIONS[language].labels.logout}
            <LogOut size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Badge;
