import { ILoginData } from "@/types/types";
import { api } from "./notablyAPIConfig";

export const login = async ({ email, password }: ILoginData) => {
  try {
    return (await api.post("/auth/login", { email, password })).data;
  } catch (error) {
    return console.error(error);
  }
};

export const getLoggedInUser = async () => {
  try {
    return (await api.get("/user")).data;
  } catch (error) {
    return console.error(error);
  }
};
