/* eslint-disable no-unused-vars */
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import user from "../../assets/(user)/user.png";
import { useTheme } from "../../context/ThemeContext";
import { usersApi } from "../../shared/services/api";

function DashboardHeader() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	const [userDetails, setUserDetails] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userDetailsResposnse = await usersApi.getMe();
				setUserDetails(userDetailsResposnse);
			} catch (error) {
				console.error("Error fetching user details:", error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="relative">
			<div
				onClick={toggleDropdown}
				className="flex items-center gap-3 focus:outline-none"
			>
				<img
					src={userDetails?.avatar_url ?? user}
					alt="Profile"
					className="object-cover w-10 h-10 border-2 border-white rounded-full"
				/>
				<div className="hidden md:block">
					<p
						className={`font-medium text-neutral-900 ${
							theme != "dark" ? "text-[#040171]" : "text-white"
						}`}
					>
						{userDetails?.full_name}
					</p>
					<p className="text-xs text-neutral-500">Admin</p>
				</div>
				<ChevronDown
					size={16}
					className="hidden md:block text-neutral-400"
				/>
			</div>

			{isDropdownOpen && (
				<div
					className={`absolute z-30 right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
						theme === "light" ? "bg-white" : "bg-[#121212]"
					} ring-1 ring-black ring-opacity-5`}
				>
					<Link
						to="/dashboard/settings"
						className={`flex items-center px-4 py-2 text-sm ${
							theme === "light"
								? "text-gray-700 hover:bg-gray-100"
								: "text-gray-200 hover:bg-[#222]"
						}`}
					>
						<Settings className="w-4 h-4 mr-3" />
						Settings
					</Link>
					<Link
						to="/logout"
						className={`flex items-center px-4 py-2 text-sm ${
							theme === "light"
								? "text-gray-700 hover:bg-gray-100"
								: "text-gray-200 hover:bg-[#222]"
						}`}
					>
						<LogOut className="w-4 h-4 mr-3" />
						Logout
					</Link>
				</div>
			)}
		</div>
	);
}

export default DashboardHeader;
