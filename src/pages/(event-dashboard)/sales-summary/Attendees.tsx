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
	TextField,
} from "@mui/material";

export default function Attendees() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const { theme, toggleTheme } = useTheme();
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
		{ field: "namer", headerName: "Name", flex: 1, minWidth: 150 },
		{ field: "quantity", headerName: "Quantity", flex: 0.7, minWidth: 100 },
		{ field: "refund", headerName: "Refund", flex: 0.7, minWidth: 100 },
		{
			field: "payment_type",
			headerName: "Payment Type",
			flex: 1,
			minWidth: 130,
		},
		{ field: "notes", headerName: "Notes", flex: 1.2, minWidth: 180 },
		{ field: "total", headerName: "Total", flex: 0.7, minWidth: 100 },
		{
			field: "refund_amount",
			headerName: "Refund Amount",
			flex: 0.8,
			minWidth: 120,
		},
		{ field: "date", headerName: "Date", flex: 1, minWidth: 160 },
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
					namer: "John Doe",
					quantity: 2,
					refund: "No",
					payment_type: "Credit Card",
					notes: "Checked in",
					total: "$120",
					refund_amount: "$0",
					date: "2024-06-01 10:15 AM",
				},
				{
					id: 2,
					order: "ORD-1002",
					namer: "Jane Smith",
					quantity: 1,
					refund: "Yes",
					payment_type: "PayPal",
					notes: "Refunded due to event change",
					total: "$60",
					refund_amount: "$60",
					date: "2024-06-02 02:30 PM",
				},
				{
					id: 3,
					order: "ORD-1003",
					namer: "Alice Johnson",
					quantity: 3,
					refund: "No",
					payment_type: "Debit Card",
					notes: "",
					total: "$180",
					refund_amount: "$0",
					date: "2024-06-03 09:45 AM",
				},
				{
					id: 4,
					order: "ORD-1004",
					namer: "Bob Lee",
					quantity: 2,
					refund: "No",
					payment_type: "Cash",
					notes: "VIP guest",
					total: "$200",
					refund_amount: "$0",
					date: "2024-06-04 11:00 AM",
				},
				{
					id: 5,
					order: "ORD-1005",
					namer: "Emily Clark",
					quantity: 4,
					refund: "Partial",
					payment_type: "Credit Card",
					notes: "Partial refund issued",
					total: "$320",
					refund_amount: "$80",
					date: "2024-06-05 03:20 PM",
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
							Attendees
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

				<div>
					<Box
						sx={{
							mt: 2,
						}}
						className="flex flex-col-reverse flex-wrap justify-between gap-4 md:flex-row md:items-center "
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
