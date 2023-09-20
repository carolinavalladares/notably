"use client";

import { IUser } from "@/types/types";
import { createContext, useState } from "react";

interface IAuthContext {
  user: IUser | null;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext({} as IAuthContext);

const AuthContextProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser | null>({
    name: "carol",
    email: "email@email.com",
    image: "avatar_10",
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
