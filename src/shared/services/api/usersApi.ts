import newApi from ".";
import { IUser } from "../../../types";

export const usersApi = {
  resolveAccount: async function (data: {
    account_number: string;
    bank_code: string;
  }) {
    const res = await newApi.post("/users/resolve-account", data);
    return res.data;
  },
  async getMe() {
    const res = await newApi.get("/users/me");
    return res.data;
  },
  async updateUser(data: FormData) {
    const res = await newApi.put("/users/me", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  async followUser(user_id: string) {
    const res = await newApi.post("/users/follow", { user_id });
    return res.data;
  },
  async unFollowUser(user_id: string) {
    const res = await newApi.post("/users/unfollow", { user_id });
    return res.data;
  },
  async getUserEventEarnings() {
    const res = await newApi.get("/users/event-earnings");
    return res.data;
  },
  async getUserFollowers() {
    const res = await newApi.get("/users/followers");
    return res.data;
  },
  async getUserFollowing() {
    const res = await newApi.get("/users/following");
    return res.data;
  },
  async getUserEarnings() {
    const res = await newApi.get("/users/earnings");
    return res.data;
  },
  async getUserAffiliateEarnings() {
    const res = await newApi.get("/users/affiliate-earnings");
    return res.data;
  },
  async getUserReferralEarnings() {
    const res = await newApi.get("/users/referral-earnings");
    return res.data;
  },
  async deleteUser({ reason }: { reason: string }) {
    const res = await newApi.delete("/users/me", {
      data: { reason },
    });
    return res.data;
  },
  updateAccountDetails: async function (data: {
    account_number: string;
    bank_code: string;
    bank_name: string;
    account_name: string;
  }) {
    const res = await newApi.put("/users/account-details", data);
    return res.data;
  },
  requestWithdrawal: async function (data: { amount: number }) {
    const res = await newApi.post("/users/withdraw", data);
    return res.data;
  },
  getWithdrawals: async function () {
    const res = await newApi.get("/users/withdrawals");
    return res.data;
  },
  getEarnings: async function () {
    const res = await newApi.get("/users/earnings");
    return res.data;
  },
  async getTotalOrders() {
    const res = await newApi.get("/users/total-orders");
    return res.data;
  },
};
