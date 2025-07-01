import { DataGrid } from "@mui/x-data-grid";
import { Menu, Moon, PlusCircle, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import { useTheme } from "../../../context/ThemeContext";
import {
	Box,
	Button,
	CircularProgress,
	InputAdornment,
	Tab,
	Tabs,
	TextField,
} from "@mui/material";

export default function ManualScanning() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const { theme, toggleTheme } = useTheme();
	const [tabValue, setTabValue] = useState(0);
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

	// useEffect(
	// 	function () {
	// 		if (!id) return;
	// 		async function fetchComplimentaries() {
	// 			const res = await ticketsApi.fetchComplimentaryTickets();
	// 			setComplimentaryTickets(res.data);
	// 			setIsLoading(false);
	// 			console.log(res.data);
	// 		}
	// 		fetchComplimentaries();
	// 	},
	// 	[id]
	// );

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
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

	const columns = [
		{ field: "order", headerName: "Order", flex: 1, minWidth: 120 },
		{ field: "barcode", headerName: "Bar code", flex: 1, minWidth: 150 },
		{
			field: "ticket_buyer",
			headerName: "Ticket Buyer",
			flex: 1,
			minWidth: 150,
		},
		{ field: "email", headerName: "Email", flex: 1.2, minWidth: 180 },
		{
			field: "ticket_type",
			headerName: "Ticket Type",
			flex: 1,
			minWidth: 130,
		},
		{
			field: "action",
			headerName: "Action",
			flex: 0.7,
			minWidth: 100,
			renderCell: () => (
				<Button
					variant="contained"
					size="small"
					sx={{
						bgcolor: "#000080",
						textTransform: "none",
						"&:hover": {
							bgcolor: "#000066",
						},
					}}
				>
					Scan
				</Button>
			),
			sortable: false,
			filterable: false,
		},
	];

	const [rows, setRows] = useState([]);

	// Simulate fetching data
	useEffect(() => {
		setLoading(true);
		// Replace this with your actual API call
		setTimeout(() => {
			setRows([
				{
					id: 1,
					order: "ORD-1001",
					barcode: "ABC123456",
					ticket_buyer: "John Doe",
					email: "john.doe@example.com",
					ticket_type: "VIP",
				},
				{
					id: 2,
					order: "ORD-1002",
					barcode: "DEF654321",
					ticket_buyer: "Jane Smith",
					email: "jane.smith@example.com",
					ticket_type: "Regular",
				},
				{
					id: 3,
					order: "ORD-1003",
					barcode: "GHI789012",
					ticket_buyer: "Alice Johnson",
					email: "alice.johnson@example.com",
					ticket_type: "Student",
				},
				{
					id: 4,
					order: "ORD-1004",
					barcode: "JKL345678",
					ticket_buyer: "Bob Lee",
					email: "bob.lee@example.com",
					ticket_type: "VIP",
				},
				{
					id: 5,
					order: "ORD-1005",
					barcode: "MNO901234",
					ticket_buyer: "Emily Clark",
					email: "emily.clark@example.com",
					ticket_type: "Regular",
				},
			]);
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<div
			className={`flex min-h-screen ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			}`}
		>
			<SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

			<div className="flex-1 px-5 py-8 lg:px-8">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<button
							onClick={toggleSidebar}
							className={`rounded-lg outline-none p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "bg-[#121212]"
							}`}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>

						<h1 className="hidden text-2xl font-bold lg:flex">
							Manual Scanning
						</h1>
					</div>

					<div className="flex items-center space-x-4">
						<Link
							to={"/dashboard/event/create"}
							className={`rounded-full outline-none  p-3 ${
								theme === "light"
									? "bg-gray-200  hover:bg-gray-100"
									: "hover:bg-[#111] bg-[#121212]"
							}`}
							aria-label="Toggle theme"
						>
							<PlusCircle
								color={theme === "light" ? "#040171" : "white"}
								size={20}
							/>
						</Link>
						<button
							onClick={toggleTheme}
							className={`rounded-full outline-none p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "hover:bg-[#111] bg-[#121212]"
							}`}
							aria-label="Toggle theme"
						>
							{theme === "light" ? (
								<Moon size={20} />
							) : (
								<Sun size={20} />
							)}
						</button>

						<DashboardHeader />
					</div>
				</div>

				{/* Navigation Tabs */}
				<Box
					sx={{
						mt: 4,
						borderBottom: 1,
						borderColor: "divider",
						bgcolor: "white",
					}}
				>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						aria-label="order tabs"
					>
						<Tab label="Manually Scanning" />
						<Tab label="Complimentary Ticket Scanning" />
						<Tab label="Hard Tickets Scanning" />
					</Tabs>
				</Box>

				<div>
					<Box
						sx={{
							mt: 2,
						}}
						className="flex flex-col-reverse flex-wrap justify-between gap-4 md:flex-row md:items-center"
					>
						<Box sx={{ display: "flex", gap: 1 }}>
							<Button
								variant="outlined"
								size="small"
								sx={{
									color: "#666",
									borderColor: "#ccc",
									bgcolor: "#f0f0f0",
									textTransform: "none",
									"&:hover": {
										bgcolor: "#e0e0e0",
										borderColor: "#bbb",
									},
								}}
							>
								Excel
							</Button>
							<Button
								variant="outlined"
								size="small"
								sx={{
									color: "#666",
									borderColor: "#ccc",
									bgcolor: "#f0f0f0",
									textTransform: "none",
									"&:hover": {
										bgcolor: "#e0e0e0",
										borderColor: "#bbb",
									},
								}}
							>
								CSV
							</Button>
							<Button
								variant="outlined"
								size="small"
								sx={{
									color: "#666",
									borderColor: "#ccc",
									bgcolor: "#f0f0f0",
									textTransform: "none",
									"&:hover": {
										bgcolor: "#e0e0e0",
										borderColor: "#bbb",
									},
								}}
							>
								PDF
							</Button>
							<Button
								variant="outlined"
								size="small"
								sx={{
									color: "#666",
									borderColor: "#ccc",
									bgcolor: "#f0f0f0",
									textTransform: "none",
									"&:hover": {
										bgcolor: "#e0e0e0",
										borderColor: "#bbb",
									},
								}}
							>
								Copy
							</Button>
						</Box>
						<TextField
							placeholder="Search by email or name"
							size="small"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search size={20} />
									</InputAdornment>
								),
							}}
							sx={{ width: "250px" }}
						/>
					</Box>
				</div>

				<div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
					<div
						className={`md:col-span-3 p-2 ${
							theme === "light"
								? "bg-white"
								: "bg-[#121212] text-white"
						} shadow-lg rounded-lg`}
					>
						<div style={{ height: "100%", width: "100%" }}>
							{loading ? (
								<div className="flex items-center justify-center h-24">
									<CircularProgress size={40} />
								</div>
							) : rows.length === 0 ? (
								<div className="flex items-center justify-center h-96">
									<span>No events found</span>
								</div>
							) : (
								<DataGrid
									rows={rows}
									columns={columns}
									pageSize={25}
									rowsPerPageOptions={[5]}
									checkboxSelection={false}
									disableSelectionOnClick
									sx={{
										"& .MuiDataGrid-columnHeaders": {
											backgroundColor:
												theme === "dark"
													? "black"
													: "#f5f5f5",
										},
										"& .MuiDataGrid-cell": {
											color:
												theme === "dark"
													? "white"
													: "black",
										},
										"& .MuiDataGrid-footerContainer": {
											backgroundColor: "white",
										},
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
