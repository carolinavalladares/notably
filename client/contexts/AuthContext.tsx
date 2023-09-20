"use client";

import { getLoggedInUser, login, logout } from "@/services/notablyAPI";
import { ILoginData, IUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

interface IAuthContext {
  user: IUser | null;
  signIn: ({ email, password }: ILoginData) => void;
  signOut: () => void;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext({} as IAuthContext);

const AuthContextProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { notably_token: token } = parseCookies();

    if (token) {
      getMe();
    }
  }, []);

  const getMe = async () => {
    const data = await getLoggedInUser();

    console.log(data);

    if (!data) {
      return router.push("/");
    }

    setUser(data.data);

    return router.push("/");
  };

  const signIn = async ({ email, password }: ILoginData) => {
    try {
      const data = await login({ email, password });

      console.log(data);

      // save token in cookies
      setCookie(undefined, "notably_token", data.token);

      // save user in state
      setUser(data.user);

      // redirect user
      return router.push("/");
    } catch (e) {
      return console.log("login failed");
    }
  };

  const signOut = async () => {
    await logout();

    setUser(null);

    destroyCookie(undefined, "notably_token");

    return router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
