 import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://your-api-domain.com",  
  headers: {
    "Content-Type": "application/json"
  }
});

// Add token to request headers if available
api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
