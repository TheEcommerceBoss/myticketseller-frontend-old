import { LogOut, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import user from "../../assets/(user)/user.png";

import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
function DashboardHeader() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

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
			<button
				onClick={toggleDropdown}
				className="focus:outline-none"
				aria-label="Open profile menu"
			>
				<img
					src={user}
					alt="Profile"
					className="w-10 h-10 rounded-full ring-2 ring-gray-200 hover:ring-gray-300"
				/>
			</button>

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
