import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useTheme } from "../../context/ThemeContext";

const EmailPreferences = () => {
	const [loading, setLoading] = useState(true);
	const { theme, toggleTheme } = useTheme();
	const [activeTab, setActiveTab] = useState("customer");
	const [isSidebarOpen, setIsSidebarOpen] = useState(
		window.innerWidth >= 1024
	);

	const [preferences, setPreferences] = useState(customerPreferences);

	const togglePreference = (id) => {
		setPreferences((prev) =>
			prev.map((pref) =>
				pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
			)
		);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsSidebarOpen(window.innerWidth >= 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			className={`flex min-h-screen ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			}`}
		>
			<SideBar
				isOpen={isSidebarOpen}
				toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<div className="flex-1 px-5 py-8 mx-auto lg:px-8 max-w-7xl">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							aria-label={
								isSidebarOpen ? "Close sidebar" : "Open sidebar"
							}
							className={`rounded-lg p-3 ${
								theme === "dark"
									? "bg-[#121212] hover:bg-[#111]"
									: "bg-gray-200 hover:bg-gray-100"
							}`}
						>
							{isSidebarOpen ? (
								<X size={24} />
							) : (
								<Menu size={24} />
							)}
						</button>
						<h1 className="hidden text-2xl font-bold lg:flex">
							Email Preferences
						</h1>
					</div>
					<div className="flex items-center space-x-4">
						<Link
							to="/dashboard/event/create"
							aria-label="Create new event"
							className={`rounded-full p-3 ${
								theme === "dark"
									? "bg-[#121212] hover:bg-[#111]"
									: "bg-gray-200 hover:bg-gray-100"
							}`}
						>
							<PlusCircle
								color={theme === "dark" ? "white" : "#040171"}
								size={20}
							/>
						</Link>
						<button
							onClick={toggleTheme}
							aria-label={
								theme === "dark"
									? "Switch to light theme"
									: "Switch to dark theme"
							}
							className={`rounded-full p-3 ${
								theme === "dark"
									? "bg-[#121212] hover:bg-[#111]"
									: "bg-gray-200 hover:bg-gray-100"
							}`}
						>
							{theme === "dark" ? (
								<Sun size={20} />
							) : (
								<Moon size={20} />
							)}
						</button>
						<DashboardHeader />
					</div>
				</div>

				<div className="mt-8 overflow-hidden">
					{/* Tab Navigation */}
					<div className="flex gap-2 mb-6">
						<button
							onClick={() => {
								setActiveTab("customer");
								setPreferences(customerPreferences);
							}}
							className={`px-6 py-3 rounded-full font-medium transition-colors ${
								activeTab === "customer"
									? "bg-[#0a0a80] text-white"
									: "bg-gray-200 text-gray-600 hover:bg-gray-300"
							}`}
						>
							Customer/ Ticket Buyer
						</button>
						<button
							onClick={() => {
								setActiveTab("promoter");
								setPreferences(promoterPreferences);
							}}
							className={`px-6 py-3 rounded-full font-medium transition-colors ${
								activeTab === "promoter"
									? "bg-[#0a0a80] text-white"
									: "bg-gray-200 text-gray-600 hover:bg-gray-300"
							}`}
						>
							Promoter/ Organizer
						</button>
					</div>
					<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
						<h2 className="text-xl font-medium">
							Manage your Email preference
						</h2>
					</div>
					<div className="p-4 bg-white md:p-8">
						{/* Subheading */}
						<h2 className="mb-8 text-lg font-medium text-[#040171]">
							Choose emails you would like to recieve from
							MyTicketseller
						</h2>

						{/* Email Preferences List */}
						<div className="space-y-6">
							{preferences.map((preference) => (
								<div
									key={preference.id}
									className="py-4 border-b border-[#D5D5D5]"
								>
									<div className="flex items-center justify-between max-w-[590px]">
										<div className="flex-1">
											<h3 className="mb-1 text-base font-medium text-gray-900 lg:text-lg">
												{preference.title}
											</h3>
											<p className="text-sm text-gray-600 lg:text-base">
												{preference.description}
											</p>
										</div>

										{/* Toggle Switch */}
										<button
											onClick={() =>
												togglePreference(preference.id)
											}
											className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
												preference.enabled
													? "bg-[#040171]"
													: "bg-gray-200"
											}`}
										>
											<span
												className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
													preference.enabled
														? "translate-x-6"
														: "translate-x-1"
												}`}
											/>
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex justify-end mt-8">
						<button
							type="submit"
							// disabled={isSubmitting}
							aria-label="Save new password"
							className={`px-8 py-3 rounded-full shadow-lg transition-colors ${
								theme === "dark"
									? "bg-[#0a0a80] text-white hover:bg-[#09096e] disabled:bg-[#0a0a80]/50"
									: "bg-[#0a0a80] text-white hover:bg-[#09096e] disabled:bg-[#0a0a80]/50"
							} disabled:opacity-50 disabled:cursor-not-allowed`}
						>
							{/* {isSubmitting ? "Saving..." : "Save"} */}
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailPreferences;

const customerPreferences = [
	{
		id: "event-updates",
		title: "Event updates",
		description: "Get All notification for Your Event updates",
		enabled: true,
	},
	{
		id: "purchase-notification",
		title: "Purchase notification email",
		description: "You will recieve all the emails for purchase",
		enabled: true,
	},
	{
		id: "promotional-email",
		title: "X Promotional email from MTS",
		description: "You will recieve all the emails for purchase",
		enabled: true,
	},
	{
		id: "event-review",
		title: "Event review notification email",
		description:
			"You will recieve all important updates from MyTicketseller",
		enabled: true,
	},
	{
		id: "organizer-email",
		title: "X Email from organizer",
		description: "You will recieve review email for events",
		enabled: true,
	},
	{
		id: "newsletter",
		title: "Newsletter Emails",
		description: "You will recieve email for newsletter",
		enabled: true,
	},
	{
		id: "followed-organizers",
		title: "X Followed organizers",
		description:
			"You will recieve email when your favorite organizers create new events",
		enabled: true,
	},
];

const promoterPreferences = [
	{
		id: "event-updates",
		title: "Event updates",
		description: "Get All notification for Your Event updates",
		enabled: true,
	},
	{
		id: "contact-emails",
		title: "X Contact emails",
		description:
			"You will get notified when customers contact you from Ticketgateway",
		enabled: true,
	},
	{
		id: "purchase-notification",
		title: "Purchase notification email",
		description:
			"You will recieve all the emails for purchase of your Event",
		enabled: true,
	},
	{
		id: "payment-notification",
		title: "Payment notification",
		description:
			"You will get reminder email to set up payment information on Ticketgateway",
		enabled: true,
	},
	{
		id: "attendee-notification",
		title: "X Attendee notification",
		description:
			"You will get email notification for Every attendee you will add",
		enabled: true,
	},
	{
		id: "complimentary-tickets",
		title: "Complimentary tickets",
		description:
			"You will get all emails of complimentory tickets when you send to customer",
		enabled: true,
	},
	{
		id: "promotional-email",
		title: "X Promotional email from TG",
		description:
			"You will recieve all important updates from Ticketgateway",
		enabled: true,
	},
	{
		id: "user-review-notification",
		title: "X User review notification email",
		description: "You will recieve all user review for your events",
		enabled: true,
	},
	{
		id: "notifications-stop",
		title: "Email notifications stop all events",
		description: "Stop all email notifications for your events",
		enabled: true,
	},
	{
		id: "user-follower-notification",
		title: "X User follower notification email",
		description: "You will get email notification for follower users",
		enabled: true,
	},
];
