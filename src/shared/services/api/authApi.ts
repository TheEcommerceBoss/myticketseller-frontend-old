import newApi from ".";
import Cookies from "js-cookie";
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
    const res = await newApi.post("/auth/register", {
      full_name,
      email,
      password,
    });

    return res.data;
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
