import axios from "axios";
import { parseCookies } from "nookies";

const { notably_token: token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token ? token : ""}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
