import { clearToken, getToken } from "../utils/token";
import { api } from "./api";

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = "auth/login";
    }
    return Promise.reject(error);
  }
);
