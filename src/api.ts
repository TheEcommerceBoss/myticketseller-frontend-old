import axios from "axios";
import Cookies from "js-cookie";
import { IEvent, IUpdateEventDetailsPayload } from "./types";

const newApi = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // withCredentials: true,
  // withXSRFToken: true,
});

export default newApi;

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

export const authApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const res = await newApi.post("/auth/login", { email, password });
    Cookies.set("access_token", res.data.access_token, { expires: 1 });
    Cookies.set("refresh_token", res.data.refresh_token, { expires: 30 });
    return;
  },
  register: async ({
    full_name,
    email,
    password,
  }: {
    full_name: string;
    email: string;
    password: string;
  }) => {
    const res = newApi.post("/auth/register", { full_name, email, password });
  },
  refreshAccessToken: async () => {
    const refresh_token = Cookies.get("refresh_token");
    console.log("Refreshing", refresh_token);
    const res = await newApi.post(
      "/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );

    Cookies.set("access_token", res.data.access_token, { expires: 1 });
    return res.data;
  },
};

export const dashboardApi = {
  getStats: async function (yearly: boolean = false) {
    const res = await newApi.get(`/dashboard/stats?yearly=${yearly}`);
    return res.data;
  },
};

export const eventsApi = {
  createEvent: async (data: Partial<IEvent> | FormData) => {
    const res = await newApi.post("/events", data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  },
  getEvents: async function () {
    const res = await newApi.get(`/events`);
    return res.data;
  },
  getEventById: async (event_id: string) => {
    const res = await newApi.get(`/events/${event_id}`);
    return res.data;
  },
  updateEvent: async (event_id: string, data: Partial<IEvent>) => {
    const res = await newApi.put(`/events/${event_id}`, data);
    return res.data;
  },
  addEventSchedule: async (event_id: string, days: []) => {
    const res = await newApi.post(`events/${event_id}/days/bulk`, days);
    return res.data;
  },
  updateEventDetails: async (
    event_id: string,
    data: any | IUpdateEventDetailsPayload
  ) => {
    const res = await newApi.put(`/events/${event_id}/details`, data);
    return res.data;
  },
  getMyEvents: async () => {
    const res = await newApi.get("/events/my-events");
    return res.data;
  },
};

export const ticketsApi = {
  createBulkTickets: async (tickets_data: any[]) => {
    const res = await newApi.post("/tickets/bulk", tickets_data);
    return res.data;
  },
};

export const categoriesApi = {
  getCategories: async () => {
    const res = await newApi.get("/categories");
    return res.data;
  },
};
