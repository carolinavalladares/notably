import { ILoginData } from "@/types/types";
import { api } from "./notablyAPIConfig";
import { parseCookies } from "nookies";

// Log in
export const login = async ({ email, password }: ILoginData) => {
  try {
    return (await api.post("/auth/login", { email, password })).data;
  } catch (error) {
    return console.error(error);
  }
};

// Log out
export const logout = async () => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  try {
    return (
      await api.get("/auth/logout", {
        headers: { Authorization: `Bearer ${decodedToken}` },
      })
    ).data;
  } catch (error) {
    return console.error(error);
  }
};

// get user currently logged in
export const getLoggedInUser = async () => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  try {
    return (
      await api.get("/user", {
        headers: { Authorization: `Bearer ${decodedToken}` },
      })
    ).data;
  } catch (error) {
    return console.error(error);
  }
};
