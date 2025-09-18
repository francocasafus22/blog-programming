import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Si hay un token en localStorage, lo pone en authorization en el header de la request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
