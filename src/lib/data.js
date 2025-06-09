import eventImg1 from "../assets/(landing)/event_img1.jpg";
import eventImg2 from "../assets/(landing)/event_img2.jpg";
import eventImg3 from "../assets/(landing)/event_img3.jpg";
import eventImg4 from "../assets/(landing)/event_img4.jpg";
import eventImg5 from "../assets/(landing)/event_img5.jpg";
import eventImg6 from "../assets/(landing)/event_img6.jpg";

export const sidebarData = {
	salesSummary: [
		{
			text: "Orders Listing",
			link: "/dashboard/event/:id/orders",
			active: false,
		},
		{
			text: "Attendees",
			link: "/dashboard/event/:id/attendees",
			active: false,
		},
		{
			text: "Checkins",
			link: "/dashboard/event/:id/checkins",
			active: true,
		},
		{
			text: "Refunds",
			link: "/dashboard/event/:id/refunds",
			active: false,
		},
		{
			text: "Complimentary",
			link: "/dashboard/event/:id/complimentary",
			active: false,
		},
		{
			text: "Register",
			link: "/dashboard/event/:id/register",
			active: false,
		},
		{
			text: "Guest List",
			link: "/dashboard/event/:id/guest-list",
			active: false,
		},
		{
			text: "Bottle Service",
			link: "/dashboard/event/:id/bottle-service",
			active: false,
		},
		{
			text: "Request",
			link: "/dashboard/event/:id/request",
			active: false,
		},
	],
	scanning: [
		{
			text: "Setup Scan Online",
			link: "/dashboard/event/:id/setup-scan-online",
			active: false,
		},
		{
			text: "Manually Scanning",
			link: "/dashboard/event/:id/manually-scanning",
			active: false,
		},
		{
			text: "Download Hard Tickets",
			link: "/dashboard/event/:id/download-hard-tickets",
			active: false,
		},
		{
			text: "Scanning Report",
			link: "/dashboard/event/:id/scanning-report",
			active: false,
		},
	],
	graphicalView: [
		{
			text: "Histogram View",
			link: "/dashboard/event/:id/histogram-view",
			active: false,
		},
	],
	manualSales: [
		{
			text: "Add Manual Sales",
			link: "/dashboard/event/:id/add-manual-sales",
			active: false,
		},
	],
	paymentDetails: [
		{
			text: "Payout",
			link: "/dashboard/event/:id/payout",
			active: false,
		},
		{
			text: "Payment Account",
			link: "/dashboard/event/:id/payment-account",
			active: false,
		},
	],
	referral: [
		{
			text: "Add Referral",
			link: "/dashboard/event/:id/add-referral",
			active: false,
		},
		{
			text: "View Referral",
			link: "/dashboard/event/:id/view-referral",
			active: false,
		},
		{
			text: "View Order",
			link: "/dashboard/event/:id/view-order",
			active: false,
		},
		{
			text: "Referral Payout",
			link: "/dashboard/event/:id/referral-payout",
			active: false,
		},
		{
			text: "Referral Payout History",
			link: "/dashboard/event/:id/referral-payout-history",
			active: false,
		},
	],
	guestList: [
		{
			text: "View Guest List",
			link: "/dashboard/event/:id/guest-list",
			active: false,
		},
	],
	subscriberEmails: [
		{
			text: "View Subscriber",
			link: "/dashboard/event/:id/subscriber-emails",
			active: false,
		},
	],
	profile: [
		{
			text: "My Profile",
			link: "/dashboard/profile",
			active: false,
		},
		{
			text: "Change Password",
			link: "/dashboard/profile/change-password",
			active: false,
		},
		{
			text: "My Earnings",
			link: "/dashboard/my-earnings",
			active: false,
		},
		{
			text: "My Following",
			link: "/dashboard/my-following",
			active: false,
		},
		{
			text: "Organizer Profile",
			link: "/dashboard/organizer-profile",
			active: false,
		},
		{
			text: "Multi-User Access",
			link: "/dashboard/multi-user-access",
			active: false,
		},
		{
			text: "Facebook / Google Analytics Details",
			link: "/dashboard/analytics-details",
			active: false,
		},
	],
};

export const howItWorksSteps = [
	{
		id: 1,
		title: "Browse:",
		description: "Explore the latest events near you.",
	},
	{
		id: 2,
		title: "Choose:",
		description: "Select your event and ticket type.",
	},
	{
		id: 3,
		title: "Purchase:",
		description: "Easy checkout with secure payment options.",
	},
	{
		id: 4,
		title: "Enjoy:",
		description: "Show up and have the time of your life!",
	},
];

export const tabs = [
	{
		id: "all",
		label: "All",
	},
	{
		id: "concerts",
		label: "Concerts & Music Festivals",
	},
	{
		id: "networking",
		label: "Networking",
	},
	{
		id: "family-kids",
		label: "Family and Kids Events",
	},
	{
		id: "fuji-parties",
		label: "Fuji & Parties",
	},
	{
		id: "comedy-shows",
		label: "Comedy Shows",
	},
];

export const featuredEvents = [
	{
		image: eventImg1,
		title: "Nicki Minaj Live at Los Angeles",
		date: "Wed, Oct 31, 6:30 PM",
		location: "Los Angeles, USA",
		category: "Concerts",
	},
	{
		image: eventImg2,
		title: "Nicki Minaj Live at Los Angeles",
		date: "Mon, Oct 31, 6:30 PM",
		location: "Los Angeles, USA",
		category: "Birthday Parties",
	},
	{
		image: eventImg3,
		title: "Nicki Minaj Live at Los Angeles",
		date: "Mon, Oct 31, 6:30 PM",
		location: "Los Angeles, USA",
		category: "Conferences",
	},
	{
		image: eventImg4,
		title: "Nicki Minaj Live at Los Angeles",
		date: "Wed, Oct 31, 6:30 PM",
		location: "Los Angeles, USA",
		category: "Concerts",
	},
	{
		image: eventImg5,
		title: "Nicki Minaj Live at Los Angeles",
		date: "Mon, Oct 31, 6:30 PM",
		location: "Los Angeles, USA",
		category: "Festivals",
	},
	{
		image: eventImg6,
		title: "Nicki Minaj Live at Los Angeles",
		date: "Mon, Oct 31, 6:30 PM",
		location: "Los Angeles, USA",
		category: "Sports",
	},
];
