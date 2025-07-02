// Utility function to get greeting based on current hour
export function getGreeting() {
	const today = new Date();
	const curHr = today.getHours();

	if (curHr < 12) {
		return "Good Morning";
	} else if (curHr < 18) {
		return "Good Afternoon";
	} else {
		return "Good Evening";
	}
}
