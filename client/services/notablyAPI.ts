"use client";

import {
  IEditUserData,
  ILoginData,
  IPostData,
  IRegisterData,
} from "@/types/types";
import { api } from "./notablyAPIConfig";
import { parseCookies } from "nookies/dist";

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
    const data = await api.get("/user", {
      headers: { Authorization: `Bearer ${decodedToken}` },
    });

    return data.data;
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
  } catch (e) {
    return console.log(e);
  }
};

// create new post
export const createPost = async ({ content }: IPostData) => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  return await api.post(
    "/posts/create",
    { content },
    {
      headers: { Authorization: `Bearer ${decodedToken}` },
    }
  );
};

// Get Timeline
export const fetchTimeline = async (page?: number) => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  if (!token) {
    return;
  }

  const url = page ? `/timeline?page=${page}` : "/timeline";

  return await api.get(url, {
    headers: {
      Authorization: `Bearer ${decodedToken}`,
    },
  });
};

// getOnePost
export const getOnePost = async (id: number) => {
  if (!id) {
    return;
  }

  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  return (
    await api.get(
      `/posts/${id}`,

      {
        headers: { Authorization: `Bearer ${decodedToken}` },
      }
    )
  ).data;
};

// Get follow suggestions
export const getUsersSuggestions = async () => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  if (!token) {
    return;
  }

  try {
    return (
      await api.get("/suggestions", {
        headers: {
          Authorization: `Bearer ${decodedToken}`,
        },
      })
    ).data;
  } catch (e) {
    return console.log(e);
  }
};

// Get one user
export const getOneUser = async (id: number) => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  if (!token) {
    return;
  }

  try {
    return (
      await api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${decodedToken}`,
        },
      })
    ).data.user;
  } catch (e) {
    return console.log(e);
  }
};

// follow a user
export const followUser = async (id: number) => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  if (!token) {
    return;
  }

  try {
    return (
      await api.get(`/users/follow/${id}`, {
        headers: {
          Authorization: `Bearer ${decodedToken}`,
        },
      })
    ).data;
  } catch (e) {
    return console.log(e);
  }
};

// unfollow a user
export const unfollowUser = async (id: number) => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  if (!token) {
    return;
  }

  try {
    return (
      await api.get(`/users/unfollow/${id}`, {
        headers: {
          Authorization: `Bearer ${decodedToken}`,
        },
      })
    ).data;
  } catch (e) {
    return console.log(e);
  }
};

// edit user
export const editUser = async (id: number, data: IEditUserData) => {
  const { notably_token: token } = parseCookies();
  const decodedToken = decodeURI(token);

  if (!token) {
    return;
  }

  try {
    return (
      await api.patch(
        `/users/edit/${id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${decodedToken}`,
          },
        }
      )
    ).data;
  } catch (e) {
    return console.log(e);
  }
};
