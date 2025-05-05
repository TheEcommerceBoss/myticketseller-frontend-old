import newApi from ".";

export const ticketsApi = {
	createBulkTickets: async (tickets_data: any[]) => {
		const res = await newApi.post("/tickets/bulk", tickets_data);
		return res.data;
	},
	async sendComplimentaryTicket(data: {
		ticket_id: string;
		event_id: string;
		recipient_email: string;
		recipient_name: string;
	}) {
		const res = await newApi.post("/tickets/complimentary", data);
		return res.data;
	},
	async fetchComplimentaryTickets() {
		const res = await newApi.get("/tickets/complimentary");
		return res.data;
	},
	async fetchEventComplimentaryTickets(id: string) {
		const res = await newApi.get(`/tickets/events/${id}/complimentary`);
		return res.data;
	},
};
