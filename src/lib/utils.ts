import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
	return twMerge(clsx(inputs));
}

export function formatEventDate(eventDay: any, openDoor: any) {
	const [year, month, day] = eventDay.split("-").map(Number);
	const [hour, minute] = openDoor.split(":").map(Number);

	const date = new Date(year, month - 1, day, hour, minute);

	return date
		.toLocaleString("en-US", {
			weekday: "short", // Thu
			month: "short", // May
			day: "numeric", // 1
			hour: "numeric", // 9
			minute: "2-digit", // 00
			hour12: true, // AM/PM
		})
		.replace(",", " •");
}
