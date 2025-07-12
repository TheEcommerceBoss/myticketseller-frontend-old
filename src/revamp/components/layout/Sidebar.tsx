import {
	LayoutDashboard,
	CalendarPlus,
	CalendarClock,
	Ticket,
	Megaphone,
	User,
	HelpCircle,
	Menu,
} from "lucide-react";
import { useAppContext } from "../../../context/AppContext";

const Sidebar = () => {
	const { isMenuOpen, toggleMenu } = useAppContext();

	const navItems = [
		{
			label: "Dashboard",
			icon: <LayoutDashboard size={20} />,
			isActive: true,
			path: "/",
		},
		{
			label: "Create New Event",
			icon: <CalendarPlus size={20} />,
			isActive: false,
			path: "/create-event",
		},
		{
			label: "Manage Events",
			icon: <CalendarClock size={20} />,
			isActive: false,
			path: "/manage-events",
		},
		{
			label: "Ticket Management",
			icon: <Ticket size={20} />,
			isActive: false,
			path: "/tickets",
		},
		{
			label: "Event Promotion Tools",
			icon: <Megaphone size={20} />,
			isActive: false,
			path: "/promotion",
		},
		{
			label: "My Profile",
			icon: <User size={20} />,
			isActive: false,
			path: "/profile",
		},
		{
			label: "Support",
			icon: <HelpCircle size={20} />,
			isActive: false,
			path: "/support",
		},
	];

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-200 ${
					isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={toggleMenu}
			/>

			<div
				className={`fixed top-0 bottom-0 lg:sticky lg:top-0 w-64 bg-white border-r border-neutral-200 flex flex-col z-30 transition-transform duration-300 lg:translate-x-0 ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-neutral-200">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8">
							<svg
								viewBox="0 0 36 36"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18 3.5L3 12.5L18 21.5L33 12.5L18 3.5Z"
									fill="#3B82F6"
								/>
								<path
									d="M3 12.5V21.5L18 30.5L33 21.5V12.5"
									stroke="#3B82F6"
									strokeWidth="2"
								/>
								<path
									d="M18 21.5V30.5"
									stroke="#3B82F6"
									strokeWidth="2"
								/>
								<path
									d="M12 9L24 15"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</div>
						<span className="text-lg font-semibold">
							MyEventBooking
						</span>
					</div>
					<button className="lg:hidden" onClick={toggleMenu}>
						<Menu size={20} />
					</button>
				</div>

				<nav className="flex-1 px-3 py-6 space-y-1">
					{navItems.map((item, index) => (
						<a
							key={index}
							href={item.path}
							className={`flex items-center gap-3 px-4 py-3 transition-colors rounded-lg text-neutral-600 hover:bg-primary-50 hover:text-primary-600 ${
								item.isActive ? "active" : ""
							}`}
						>
							{item.icon}
							<span>{item.label}</span>
						</a>
					))}
				</nav>
			</div>
		</>
	);
};

export default Sidebar;
