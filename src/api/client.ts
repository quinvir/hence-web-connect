import axios from "axios";

const client = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  baseURL:
    process.env.NODE_ENV === "production" ? "" : "http://43.202.15.183:8000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
