"use client";

import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { getUsersSuggestions } from "@/services/notablyAPI";
import { IUser } from "@/types/types";

import React, { useEffect, useState } from "react";
import User from "./User";
import { Loader } from "lucide-react";

const UserSuggestions = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { language } = useTranslation();

  const getSuggestions = async () => {
    setLoading(true);
    const usersSuggestions = await getUsersSuggestions();
    if (!usersSuggestions) {
      return;
    }

    setLoading(false);
    setUsers(usersSuggestions as IUser[]);
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div>
      <h2 className="mb-2 font-medium text-center">
        {TRANSLATIONS[language].text.whoToFollow}
      </h2>

      {loading ? (
        <div className="h-36 w-full flex items-center justify-center">
          <span className="h-fit w-fit block animate-spin">
            <Loader />
          </span>
        </div>
      ) : (
        <div>
          {users && users.length > 0 ? (
            users.map((item, i) => {
              return <User user={item} key={i} />;
            })
          ) : (
            <div className="text-sm font-light text-center h-32 flex items-center justify-center">
              <span>{TRANSLATIONS[language].text.noSuggestions}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSuggestions;
