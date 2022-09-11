import axios from "axios";

const baseURL = process.env.API_URL || "http://localhost:3000"

export const client = axios.create({
  baseURL: baseURL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});