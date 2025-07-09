import axios from "axios";
import Cookies from "js-cookie";
import { authApi } from "./authApi";
export * from "./eventsApi";
export * from "./referralsApi";
export * from "./usersApi";
export * from "./paymentsApi";
export * from "./authApi";
export * from "./scanApi";
export * from "./ticketsApi";
export * from "./earningsApi";
export * from "./organizerProfileApi";
export * from "./manualSalesApi";

const newApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

newApi.interceptors.request.use((request) => {
  const token = Cookies.get("access_token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

newApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config.__isRetry
    ) {
      error.config._retryCount = error.config._retryCount || 0;
      const maxRetries = 1; // Limit to 1 retry

      if (error.config._retryCount >= maxRetries) {
        // Max retries reached, redirect to login
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }
      if (!error.config._isRetrying) {
        error.config._isRetrying = true; // Mark as retrying
        error.config._retryCount += 1;
        try {
          const accessToken = await authApi.refreshAccessToken();
          error.config.headers["Authorization"] = `Bearer ${accessToken}`;
          return axios(error.config); // Retry original request
        } catch (refreshError) {
          // Logout or redirect to login
          console.error("Token refresh failed, logging out");
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const dashboardApi = {
  getStats: async function (yearly: boolean = false) {
    const res = await newApi.get(`/dashboard/stats?yearly=${yearly}`);
    return res.data;
  },
};

export const categoriesApi = {
  getCategories: async () => {
    const res = await newApi.get("/categories");
    return res.data;
  },
};

export default newApi;
