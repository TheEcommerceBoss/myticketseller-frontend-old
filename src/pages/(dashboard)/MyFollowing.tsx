import { Menu, Moon, PlusCircle, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useTheme } from "../../context/ThemeContext";

const MyFollowing = () => {
	const [loading, setLoading] = useState(true);
	const { theme, toggleTheme } = useTheme();
	const [activeTab, setActiveTab] = useState("following");
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
							{activeTab === "following"
								? "My Following"
								: "My Followers"}
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
								setActiveTab("following");
							}}
							className={`px-6 py-3 rounded-full font-medium transition-colors ${
								activeTab === "following"
									? "bg-[#040171] text-white"
									: "bg-gray-200 text-gray-600 hover:bg-gray-300"
							}`}
						>
							My Following
						</button>
						<button
							onClick={() => {
								setActiveTab("followers");
							}}
							className={`px-6 py-3 rounded-full font-medium transition-colors ${
								activeTab === "followers"
									? "bg-[#040171] text-white"
									: "bg-gray-200 text-gray-600 hover:bg-gray-300"
							}`}
						>
							My Followers
						</button>
					</div>
					<div className="bg-[#040171] text-white p-4 rounded-t-lg">
						<h2 className="text-xl font-medium">
							{activeTab === "following"
								? "My Following"
								: "My Followers"}
						</h2>
					</div>
					<div className="p-4 bg-white md:p-8">
						{activeTab === "following" ? (
							<div className="text-center">
								<h2 className="mb-8 text-lg font-medium lg:text-xl">
									You are currently not following any
									organizer.
								</h2>

								<p className="flex flex-wrap items-center justify-center gap-2">
									<Link
										to={"/event/find"}
										className="text-[#040171] flex items-center gap-2 hover:underline"
									>
										<Search size={16} />
										Search events
									</Link>{" "}
									<div>
										and follow your favorite organiser to
										get the latest updates about their
										upcoming events.
									</div>
								</p>
							</div>
						) : (
							<div className="text-center">
								<h2 className="mb-8 text-lg font-medium lg:text-xl">
									Your followers list is empty
								</h2>

								<p className="flex flex-wrap items-center justify-center">
									<Link
										to={"/event/find"}
										className="text-[#040171] flex items-center gap-2 hover:underline"
									>
										<Search size={16} />
										Search events
									</Link>
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyFollowing;
