"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const useAuth = () => {
  const { user, signIn, signOut } = useContext(AuthContext);

  return { user, signIn, signOut };
};

export default useAuth;
