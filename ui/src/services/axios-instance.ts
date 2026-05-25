import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_TRAIN_STATION_API_URL ?? "http://localhost:5074";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
} as const;
