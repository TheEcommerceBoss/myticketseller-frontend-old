import newApi from ".";
import { IUser } from "../../../types";

export interface IEmailPreferences {
	id: number;
	user_id: number;
	event_updates: boolean;
	purchase_notification: boolean;
	promotional_email: boolean;
	event_review_notification: boolean;
	email_from_organizer: boolean;
	newsletter_emails: boolean;
	followed_organizers: boolean;
	user: Partial<IUser>;
}

export const settingsApi = {
	getSettings: async () => {
		const response = await newApi.get("/settings");
		return response.data;
	},

	updateSettings: async (settings: any) => {
		const response = await newApi.put("/settings", settings);
		return response.data;
	},
	getEmailPreferences: async () => {
		const response = await newApi.get("/settings/email-preferences");
		return response.data;
	},
	updateEmailPreferences: async (preferences: Partial<IEmailPreferences>) => {
		const response = await newApi.put(
			"/settings/email-preferences",
			preferences
		);
		return response.data;
	},
};
