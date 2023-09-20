"use client";
import React from "react";
import Avatar from "./Avatar";
import useAuth from "@/hooks/useAuth";
import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

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
      {user && (
        <div className="flex flex-col items-center justify-center">
          <a
            title={TRANSLATIONS[language].labels.myProfile}
            href={`/user/${user.id}`}
          >
            <Avatar image={user.image as string} />

            <div>
              <p className="text-sm font-medium mt-1 mb-2 text-center">
                @{user.name}
              </p>
            </div>
          </a>

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
