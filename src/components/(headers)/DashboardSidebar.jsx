import {
	BookMarked,
	ChevronLeft,
	ChevronRight,
	HelpCircle,
	Home,
	LucideScanFace,
	ScanQrCodeIcon,
	Settings,
	SquarePen,
	TextSearch,
	User,
	Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../../assets/(site_assets)/logo-dark.png";
import logo from "../../assets/(site_assets)/logo.png";
import { useTheme } from "../../context/ThemeContext";

const SideBar = ({ isOpen, toggleSidebar }) => {
	const { theme } = useTheme();
	const location = useLocation();

	const NavItem = ({ icon, text, link, active }) => (
		<Link to={link}>
			<div
				className={`flex items-center space-x-3 pl-[.2rem] pr-4 py-1 cursor-pointer transition-colors duration-200
          ${
				active
					? theme === "dark"
						? "bg-[#222]"
						: "bg-opacity-10 text-[#040171] font-semibold"
					: theme === "dark"
					? "text-white hover:bg-[#222]"
					: "text-gray-600 hover:bg-gray-100"
			}
          ${!isOpen ? "justify-center" : ""}`}
			>
				<div
					className={`w-[.5rem] h-[2.8rem] mr-4 rounded-r-[5rem] ${
						active ? "bg-[#040171]" : "bg-transparent"
					}`}
				></div>
				<div
					className={`${
						!isOpen
							? "w-8 h-8 flex items-center justify-center"
							: ""
					}`}
				>
					{icon}
				</div>
				{isOpen && <span className="transition-opacity">{text}</span>}
			</div>
		</Link>
	);

	return (
		<>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-200 overflow-y-scroll h-screen
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
				onClick={toggleSidebar}
			/>

			<div
				className={`fixed h-screen lg:sticky top-0 z-30 transition-all duration-200
        ${theme === "dark" ? "bg-[#121212]" : "bg-white"}
        ${
			isOpen
				? "w-64 translate-x-0"
				: "w-20 -translate-x-full lg:translate-x-0"
		}
        shadow-lg`}
			>
				<div className="flex items-center justify-between p-4">
					<Link
						onClick={() =>
							window.scrollTo({ top: 0, behavior: "smooth" })
						}
						to={"/"}
					>
						<img
							src={theme === "light" ? logo : logoDark}
							className={`transition-all duration-200 ${
								isOpen ? "w-[5rem]" : "w-[5rem]"
							}`}
							alt="Logo"
						/>
					</Link>
					{isOpen && (
						<button
							onClick={toggleSidebar}
							className={`hidden lg:flex rounded-lg outline-none p-2 transition-colors ${
								theme === "light" ? "bg-gray-100" : "bg-[#222]"
							}`}
						>
							{isOpen ? (
								<ChevronLeft size={20} />
							) : (
								<ChevronRight size={20} />
							)}
						</button>
					)}
				</div>

				<nav className="h-full mt-5 overflow-y-scroll">
					<NavItem
						icon={<Home size={24} />}
						link="/dashboard"
						text="Dashboard"
						active={location.pathname === "/dashboard"}
					/>
					<NavItem
						icon={<SquarePen size={24} />}
						link="/dashboard/event/create"
						text="Create New Event"
						active={location.pathname.startsWith(
							"/dashboard/event/create"
						)}
					/>
					<NavItem
						icon={<TextSearch size={24} />}
						link="/dashboard/event/manage"
						text="Manage Events"
						active={location.pathname === "/dashboard/event/manage"}
					/>
					<NavItem
						icon={<ScanQrCodeIcon size={24} />}
						link="/dashboard/ticket/scanner"
						text="Ticket Scanner"
						active={
							location.pathname === "/dashboard/ticket/scanner"
						}
					/>
					<NavItem
						icon={<LucideScanFace size={24} />}
						link="/dashboard/event/scan"
						text="Scan Manager"
						active={location.pathname.startsWith(
							"/dashboard/event/scan"
						)}
					/>

					<NavItem
						icon={<Wallet size={24} />}
						link="/dashboard/wallet"
						text="Wallet"
						active={location.pathname.startsWith(
							"/dashboard/wallet"
						)}
					/>

					<NavItem
						icon={<BookMarked size={24} />}
						link="/dashboard/affiliates"
						text="Affiliates"
						active={location.pathname.startsWith(
							"/dashboard/affiliates"
						)}
					/>

					<NavItem
						icon={<User size={24} />}
						link="/dashboard/profile"
						text="My Profile"
						active={location.pathname.startsWith(
							"/dashboard/profile"
						)}
					/>

					<NavItem
						icon={<Settings size={24} />}
						link="/dashboard/settings"
						text="Settings"
						active={location.pathname === "/dashboard/settings"}
					/>
					<NavItem
						icon={<HelpCircle size={24} />}
						link="/dashboard/support"
						text="Support"
						active={location.pathname === "/dashboard/support"}
					/>
				</nav>
			</div>
		</>
	);
};

export default SideBar;
