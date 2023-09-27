"use client";

import {
  getLoggedInUser,
  login,
  logout,
  register,
} from "@/services/notablyAPI";
import { ILoginData, IRegisterData, IUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies/dist";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface IAuthContext {
  user: IUser | null | undefined;
  signIn: ({ email, password }: ILoginData) => void;
  signOut: () => void;
  signUp: ({ email, password, name, image }: IRegisterData) => void;
  getMe: () => void;
  userLoading: boolean;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext({} as IAuthContext);

const AuthContextProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser | null | undefined>(undefined);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user != undefined) {
      setUserLoading(false);
    }
  }, [user]);

  // get logged in user
  useEffect(() => {
    const { notably_token: token } = parseCookies();

    if (!token) {
      setUser(null);
      setUserLoading(false);
    }

    if (token) {
      getMe();
    }
  }, []);

  const getMe = async () => {
    const data = await getLoggedInUser();

    if (!data) {
      setUser(null);

      return router.push("/login");
    }

    setUser(data.data);

    return router.push(pathname);
  };

  const signIn = async ({ email, password }: ILoginData) => {
    const data = await login({ email, password });

    if (!data) {
      setUser(null);
      return;
    }

    // save token in cookies
    setCookie(undefined, "notably_token", data.token);

    // save user in state
    setUser(data.user);

    // redirect user
    return router.push("/");
  };

  const signOut = async () => {
    await logout();

    setUser(null);

    destroyCookie(undefined, "notably_token");

    return router.push("/login");
  };

  const signUp = async ({ name, email, password, image }: IRegisterData) => {
    await register({ name, email, password, image });

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, signUp, getMe, userLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
