/* eslint-disable react/prop-types */
import { Collapse, List, ListItem, ListItemText } from "@mui/material";
import {
	BookMarked,
	ChevronDown,
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
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../../assets/(site_assets)/logo-dark.png";
import logo from "../../assets/(site_assets)/logo.png";
import { useTheme } from "../../context/ThemeContext";
import { sidebarData } from "../../lib/data";

const SideBar = ({ isOpen, toggleSidebar }) => {
	const { theme } = useTheme();
	const location = useLocation();
	const [profileExpanded, setProfileExpanded] = useState(false);

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

	const DropdownNavItem = ({ icon, text, active, onClick }) => (
		<button className="block w-full" onClick={onClick}>
			<div
				className={`flex items-center space-x-3 pl-[.2rem] pr-4 py-1 cursor-pointer transition-colors duration-200 w-full
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
					className={`w-[.5rem] h-[2.8rem] mr-4 rounded-r-[5rem] bg-transparent`}
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
				{isOpen && (
					<div>
						<ChevronDown
							size={24}
							className={active && "rotate-180 text-[#040171]"}
						/>
					</div>
				)}
			</div>
		</button>
	);

	return (
		<>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-200 min-h-screen
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
				onClick={toggleSidebar}
			/>

			<div
				className={`fixed min-h-screen lg:sticky top-0 z-30 transition-all duration-200
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

				<nav className="h-auto mt-5">
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

					{/* <NavItem
						icon={<User size={24} />}
						link="/dashboard/profile"
						text="My Profile"
						active={location.pathname.startsWith(
							"/dashboard/profile"
						)}
					/> */}
					<DropdownNavItem
						icon={<User size={24} />}
						// link="/dashboard/profile"
						text="My Profile"
						// active={
						// 	location.pathname.startsWith(
						// 		"/dashboard/profile"
						// 	)
						// }
						active={profileExpanded}
						onClick={() => setProfileExpanded(!profileExpanded)}
					/>
					<Collapse in={profileExpanded} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{sidebarData.profile.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											pr: 2,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", 1)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse>
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
