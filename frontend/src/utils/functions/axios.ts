import axios from "axios";

export const client = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3000",
  withCredentials: true
});