import axios from "axios";

export const api = axios.create({
  baseURL: "relojoaria-backend-production.up.railway.app",
  timeout: 60000,
});

export const publicApi = axios.create({
  baseURL: "relojoaria-backend-production.up.railway.app",
  timeout: 60000,
});
