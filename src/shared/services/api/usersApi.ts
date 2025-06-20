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
  async updateUser(data: Partial<IUser>) {
    const res = await newApi.put("/users/me", data);
    return res.data;
  },
  async deleteUser() {
    const res = await newApi.delete("/users/me");
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
};
