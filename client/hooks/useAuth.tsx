"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const useAuth = () => {
  const { user, signIn, signOut, signUp, getMe, userLoading } =
    useContext(AuthContext);

  return { user, signIn, signOut, signUp, getMe, userLoading };
};

export default useAuth;
