import newApi from ".";

export const usersApi = {
  resolveAccount: async function (data: {
    account_number: string;
    bank_code: string;
  }) {
    const res = await newApi.post("/users/resolve-account", data);
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
};
