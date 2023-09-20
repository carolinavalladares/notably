"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const useAuth = () => {
  const { user, signIn } = useContext(AuthContext);

  return { user, signIn };
};

export default useAuth;
