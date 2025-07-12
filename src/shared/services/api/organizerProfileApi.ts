import newApi from ".";

interface IOrganizerProfile {
	id: string;
	user_id: string;
	name: string;
	seo_title: string;
	description: string;
	banner_url: string;
	show_my_profile: boolean;
	button_size: "large" | "medium" | "small";
	show_my_website: boolean;
	show_number_of_events: boolean;
	short_url: string;
}
type ICreateOrganizerProfile = Omit<IOrganizerProfile, "id">;

export const organizerProfileApi = {
	async getOrganizerProfile(organizer_id: string) {
		const res = await newApi.get(`/organizer-profiles/${organizer_id}`);
		return res.data;
	},
	async createOrganizerProfile(data: ICreateOrganizerProfile) {
		const res = await newApi.post(`/organizer-profiles`, data);
		return res.data;
	},
	async getUserOrganizerProfiles() {
		const res = await newApi.get("/organizer-profiles");
		console.log("Damnnn", res.data);
		return res.data;
	},
};
