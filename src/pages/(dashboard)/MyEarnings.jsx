import DashboardHeader from "../../components/(events)/DashboardHeader";

import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
	Box,
	Button,
	Card,
	Chip,
	Grid,
	InputAdornment,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";

const MyEarnings = () => {
	const { theme, toggleTheme } = useTheme();
	const [tabValue, setTabValue] = useState(0);
	const [bottomTabValue, setBottomTabValue] = useState(0);
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

	const handleBottomTabChange = (event, newValue) => {
		setBottomTabValue(newValue);
	};

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
						<h1 className="hidden text-2xl font-bold text-[#0a0a80] lg:flex">
							My Earnings
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

				<div className="mt-8 overflow-hidden rounded-lg ">
					<div className="bg-[#0a0a80] text-white p-4">
						<h2 className="text-xl font-medium">My Earnings</h2>
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
							>
								<Tab label="Event Earn" />
								<Tab label="Referral Earn" />
								<Tab label="Affiliate Earn" />
							</Tabs>
						</Box>
						<div className="p-6 pt-3">
							{tabValue === 2 && (
								<TableContainer
									component={Paper}
									sx={{ mt: 2, boxShadow: "none" }}
								>
									<Table
										sx={{ minWidth: 650 }}
										aria-label="orders table"
									>
										<TableHead>
											<TableRow
												sx={{
													bgcolor: "#D9D9D973",
												}}
											>
												<TableCell>Barcode</TableCell>
												<TableCell>
													Checkin Time
												</TableCell>
												<TableCell>Order</TableCell>
												<TableCell>Label</TableCell>
												<TableCell>
													Name on Tix
												</TableCell>
												<TableCell>Operator</TableCell>
												<TableCell>Status</TableCell>
												<TableCell>Details</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
                                            {/* Empty state or would map through orders here */}
                                            
										</TableBody>
									</Table>
								</TableContainer>
							)}
						</div>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default MyEarnings;
