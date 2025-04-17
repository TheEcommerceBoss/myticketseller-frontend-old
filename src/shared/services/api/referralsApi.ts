import newApi from ".";
interface CreateReferral {
  referral_name: string;
  referral_email: string;
  unique_identifier: string;
  commission_type: string;
  commission_amount: string;
  event_ids: string;
}

export const referralsApi = {
  createReferral: async function (data: CreateReferral) {
    const res = await newApi.post("/referrals", data);
    return res.data;
  },
  getReferrals: async function () {
    const res = await newApi.get(`/referrals`);
    return res.data;
  },
  getReferralById: async function (referral_id: string) {
    const res = await newApi.get(`/referrals/${referral_id}`);
    return res.data;
  },
  deleteReferral: async function (referral_id: string) {
    const res = await newApi.delete(`/referrals/${referral_id}`);
    return res.data;
  },
  // updateReferral: async function (referral_id: string, data: Partial<IEvent>) {
  //   const res = await newApi.put(`/referrals/${referral_id}`, data);
  //   return res.data;
  // },
};
