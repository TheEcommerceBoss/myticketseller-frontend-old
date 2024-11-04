 import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://ticket-system-backend-bfd3.onrender.com",  
  headers: {
    "Content-Type": "application/json"
  }
});

 api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
