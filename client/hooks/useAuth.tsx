"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const useAuth = () => {
  const { user, signIn, signOut, signUp, getMe } = useContext(AuthContext);

  return { user, signIn, signOut, signUp, getMe };
};

export default useAuth;
