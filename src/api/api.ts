import axios from "axios";

export const api = axios.create({
  baseURL: "https://relojoaria-backend.onrender.com",
  timeout: 60000,
});

export const publicApi = axios.create({
  baseURL: "https://relojoaria-backend.onrender.com",
  timeout: 60000,
});
