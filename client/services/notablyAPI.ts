"use client";

import { ILoginData, IRegisterData } from "@/types/types";
import { api } from "./notablyAPIConfig";
import { parseCookies } from "nookies";

// Log in
export const login = async ({ email, password }: ILoginData) => {
  return (await api.post("/auth/login", { email, password })).data;
};

// Register new user
export const register = async ({
  name,
  email,
  password,
  image,
}: IRegisterData) => {
  return (await api.post("/auth/register", { name, email, password, image }))
    .data;
};

// Routes that need authorization

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

// Log out
export const logout = async () => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  return (
    await api.get("/auth/logout", {
      headers: { Authorization: `Bearer ${decodedToken}` },
    })
  ).data;
};

// like post
export const likePost = async (postId: number) => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  try {
    const data = await api.get(`/posts/like/${postId}`, {
      headers: { Authorization: `Bearer ${decodedToken}` },
    });

    console.log(data);
  } catch (e) {
    return console.log(e);
  }
};
// unlike post
export const unlikePost = async (postId: number) => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  try {
    const data = await api.get(`/posts/unlike/${postId}`, {
      headers: { Authorization: `Bearer ${decodedToken}` },
    });

    console.log(data);
  } catch (e) {
    return console.log(e);
  }
};
