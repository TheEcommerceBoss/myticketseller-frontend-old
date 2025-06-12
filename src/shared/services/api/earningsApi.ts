import newApi from ".";
interface CreateReferral {
	referral_name: string;
	referral_email: string;
	unique_identifier: string;
	commission_type: string;
	commission_amount: string;
	event_ids: string[];
}

export const earningsApi = {
	async getEarnings() {
		const res = await newApi.get("/earnings");
		return res.data;
	},
	async withdrawEarnings(data: { amount: number | string }) {
		const res = await newApi.post("/earnings/withdraw", data);
		return res.data;
	},
	async getReferralEarnings() {
		const res = await newApi.get("/earnings/referrals");
		return res.data;
	},
	async getEventEarnings() {
		const res = await newApi.get("earnings/events");
		return res.data;
	},
	async getAffiliateEarnings() {
		const res = await newApi.get("earnings/affiliates");
		return res.data;
	},
	async getSuccessfulPayouts() {
		const res = await newApi.get("earnings/payouts/successful");
		return res.data;
	},
	async getEarningPayouts() {
		const res = await newApi.get("earnings/payouts/<withdrawal_id>");
		return res.data;
	},
};
