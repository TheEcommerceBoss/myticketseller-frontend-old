import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const OrganizerProfile = () => {
	const { theme, toggleTheme } = useTheme();
	const [isSidebarOpen, setIsSidebarOpen] = useState(
		window.innerWidth >= 1024
	);

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
							Organizer Profile
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
			</div>
		</div>
	);
};

export default OrganizerProfile;
