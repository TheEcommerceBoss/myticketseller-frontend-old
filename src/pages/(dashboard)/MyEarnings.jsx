import DashboardHeader from "../../components/(events)/DashboardHeader";

import {
	Box,
	CircularProgress,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
} from "@mui/material";
import { Menu, Moon, Pencil, PlusCircle, Sun, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useTheme } from "../../context/ThemeContext";
import { DataGrid } from "@mui/x-data-grid";
import EventEarn from "../../components/my-earnings/EventEarn";
import ReferralEarn from "../../components/my-earnings/ReferralEarn";
import AffiliateEarn from "../../components/my-earnings/AffiliateEarn";

const MyEarnings = () => {
	const { theme, toggleTheme } = useTheme();
	const [tabValue, setTabValue] = useState(0);
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

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<div
			className={`flex min-h-screen ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			} flex-col lg:flex-row`}
		>
			<SideBar
				isOpen={isSidebarOpen}
				toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<div className="flex-1 w-full px-4 py-6 mx-auto lg:px-8 max-w-7xl">
				<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							aria-label={
								isSidebarOpen ? "Close sidebar" : "Open sidebar"
							}
							className={`rounded-lg p-2 ${
								theme === "dark"
									? "bg-[#121212] hover:bg-[#111]"
									: "bg-gray-200 hover:bg-gray-100"
							} lg:hidden`}
						>
							{isSidebarOpen ? (
								<X size={24} />
							) : (
								<Menu size={24} />
							)}
						</button>
						<h1 className="text-xl font-bold md:text-2xl">
							My Earnings
						</h1>
					</div>
					<div className="flex items-center space-x-3">
						<Link
							to="/dashboard/event/create"
							aria-label="Create new event"
							className={`rounded-full p-2 ${
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
							className={`rounded-full p-2 ${
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

				<div className="mt-6 overflow-hidden rounded-lg">
					<div className="bg-[#040171] text-white p-4">
						<h2 className="text-lg font-medium md:text-xl">
							My Earnings
						</h2>
					</div>
					<Box sx={{ width: "100%", bgcolor: "#f9f9f9" }}>
						{/* Top Navigation Tabs */}
						<Box
							sx={{
								borderBottom: 1,
								borderColor: "divider",
								bgcolor: "white",
							}}
						>
							<Tabs
								value={tabValue}
								onChange={handleTabChange}
								aria-label="dashboard tabs"
								variant="scrollable"
								scrollButtons="auto"
								allowScrollButtonsMobile
							>
								<Tab label="Event Earn" />
								<Tab label="Referral Earn" />
								<Tab label="Affiliate Earn" />
							</Tabs>
						</Box>
						<div className="p-4 pt-3 md:p-6 md:pt-0">
							{tabValue === 0 && <EventEarn />}
							{tabValue === 1 && <ReferralEarn />}
							{tabValue === 2 && <AffiliateEarn />}
						</div>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default MyEarnings;
