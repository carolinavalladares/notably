"use client";

import { getLoggedInUser, login } from "@/services/notablyAPI";
import { ILoginData, IUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

interface IAuthContext {
  user: IUser | null;
  signIn: ({ email, password }: ILoginData) => {};
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

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
