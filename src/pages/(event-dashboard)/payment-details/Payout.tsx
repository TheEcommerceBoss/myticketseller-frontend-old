import { DataGrid } from "@mui/x-data-grid";
import { Menu, Moon, PlusCircle, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
	Box,
	Button,
	CircularProgress,
	InputAdornment,
	TextField,
} from "@mui/material";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import { useTheme } from "../../../context/ThemeContext";

export default function Payout() {
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

	const payoutColumns = [
		{ field: "cheq_date", headerName: "Cheq Date", width: 150 },
		{ field: "payout_name", headerName: "Payout Name", width: 180 },
		{ field: "cheq_name", headerName: "Cheq Name", width: 180 },
		{ field: "added_by", headerName: "Added By", width: 150 },
		{ field: "usd", headerName: "$USD", width: 120 },
		{ field: "ngn", headerName: "$NGN", width: 120 },
	];

	const expenseColumns = [
		{ field: "expense_type", headerName: "Expenses Type", width: 150 },
		{ field: "inv_num", headerName: "Inv Num", width: 120 },
		{ field: "added_by", headerName: "Added By", width: 150 },
		{ field: "usd", headerName: "$USD", width: 120 },
		{ field: "ngn", headerName: "$NGN", width: 120 },
		{ field: "date", headerName: "Date", width: 180 },
	];

	const balanceColumns = [
		{ field: "type", headerName: "Type", width: 150 },
		{ field: "usd", headerName: "$USD", width: 120 },
		{ field: "ngn", headerName: "$NGN", width: 120 },
	];

	const [payoutRows, setPayoutRows] = useState([]);
	const [expenseRows, setExpenseRows] = useState([]);
	const [balanceRows, setBalanceRows] = useState([]);

	// Simulate fetching data
	useEffect(() => {
		setLoading(true);
		// Replace this with your actual API call
		setTimeout(() => {
			setPayoutRows([
				{
					id: 1,
					ticket_type: "VIP",
					sales_end: "2024-06-01",
					price: 100,
					inventory: 50,
					quantity: 2,
					amount_paid: 200,
					date: "2024-06-01 10:15 AM",
				},
				{
					id: 2,
					ticket_type: "Regular",
					sales_end: "2024-06-02",
					price: 50,
					inventory: 100,
					quantity: 1,
					amount_paid: 50,
					date: "2024-06-02 02:30 PM",
				},
				{
					id: 3,
					ticket_type: "Early Bird",
					sales_end: "2024-06-03",
					price: 30,
					inventory: 20,
					quantity: 3,
					amount_paid: 90,
					date: "2024-06-03 09:45 AM",
				},
				{
					id: 4,
					ticket_type: "VIP",
					sales_end: "2024-06-04",
					price: 100,
					inventory: 45,
					quantity: 2,
					amount_paid: 200,
					date: "2024-06-04 11:00 AM",
				},
				{
					id: 5,
					ticket_type: "Regular",
					sales_end: "2024-06-05",
					price: 50,
					inventory: 98,
					quantity: 4,
					amount_paid: 200,
					date: "2024-06-05 03:20 PM",
				},
			]);
			setExpenseRows([
				{
					id: 1,
					expense_type: "Venue",
					inv_num: "INV-001",
					added_by: "John Doe",
					usd: 500,
					ngn: 380000,
					date: "2024-06-01 11:00 AM",
				},
				{
					id: 2,
					expense_type: "Catering",
					inv_num: "INV-002",
					added_by: "Jane Smith",
					usd: 300,
					ngn: 228000,
					date: "2024-06-02 01:30 PM",
				},
				{
					id: 3,
					expense_type: "Logistics",
					inv_num: "INV-003",
					added_by: "Mike Johnson",
					usd: 150,
					ngn: 114000,
					date: "2024-06-03 09:00 AM",
				},
				{
					id: 4,
					expense_type: "Marketing",
					inv_num: "INV-004",
					added_by: "Sarah Lee",
					usd: 200,
					ngn: 152000,
					date: "2024-06-04 03:45 PM",
				},
				{
					id: 5,
					expense_type: "Security",
					inv_num: "INV-005",
					added_by: "Chris Evans",
					usd: 100,
					ngn: 76000,
					date: "2024-06-05 10:15 AM",
				},
			]);
			setBalanceRows([
				{
					id: 1,
					type: "Total Sales",
					usd: 175.0,
					ngn: 0.0,
				},
				{
					id: 2,
					type: "Total Payout",
					usd: 175.0,
					ngn: 0.0,
				},
				{
					id: 3,
					type: "Total Expenses",
					usd: 175.0,
					ngn: 0.0,
				},
				{
					id: 4,
					type: "Total (Remaining)",
					usd: 175.0,
					ngn: 0.0,
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
							Payment Details
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

				<div className="space-y-12">
					{/* payout details */}
					<div>
						<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
							<h2 className="text-xl font-medium">
								Payout Details
							</h2>
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

						<div className="space-y-6">
							<div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
								<div
									className={`md:col-span-3 p-2 ${
										theme === "light"
											? "bg-white"
											: "bg-[#121212] text-white"
									} shadow-lg rounded-lg`}
								>
									<div
										style={{
											height: "100%",
											width: "100%",
										}}
									>
										{loading ? (
											<div className="flex items-center justify-center h-24">
												<CircularProgress size={40} />
											</div>
										) : payoutRows.length === 0 ? (
											<div className="flex items-center justify-center h-96">
												<span>No events found</span>
											</div>
										) : (
											<DataGrid
												rows={payoutRows}
												columns={payoutColumns}
												pageSize={25}
												rowsPerPageOptions={[5]}
												checkboxSelection={false}
												disableSelectionOnClick
												sx={{
													"& .MuiDataGrid-columnHeaders":
														{
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
													"& .MuiDataGrid-footerContainer":
														{
															backgroundColor:
																"white",
														},
												}}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* expenses details */}
					<div>
						<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
							<h2 className="text-xl font-medium">
								Expenses Details
							</h2>
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

						<div className="space-y-6">
							<div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
								<div
									className={`md:col-span-3 p-2 ${
										theme === "light"
											? "bg-white"
											: "bg-[#121212] text-white"
									} shadow-lg rounded-lg`}
								>
									<div
										style={{
											height: "100%",
											width: "100%",
										}}
									>
										{loading ? (
											<div className="flex items-center justify-center h-24">
												<CircularProgress size={40} />
											</div>
										) : expenseRows.length === 0 ? (
											<div className="flex items-center justify-center h-96">
												<span>No events found</span>
											</div>
										) : (
											<DataGrid
												rows={expenseRows}
												columns={expenseColumns}
												pageSize={25}
												rowsPerPageOptions={[5]}
												checkboxSelection={false}
												disableSelectionOnClick
												sx={{
													"& .MuiDataGrid-columnHeaders":
														{
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
													"& .MuiDataGrid-footerContainer":
														{
															backgroundColor:
																"white",
														},
												}}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* balanced owning */}

					<div>
						<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
							<h2 className="text-xl font-medium">
								Balanced Owning
							</h2>
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

						<div className="space-y-6">
							<div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
								<div
									className={`md:col-span-3 p-2 ${
										theme === "light"
											? "bg-white"
											: "bg-[#121212] text-white"
									} shadow-lg rounded-lg`}
								>
									<div
										style={{
											height: "100%",
											width: "100%",
										}}
									>
										{loading ? (
											<div className="flex items-center justify-center h-24">
												<CircularProgress size={40} />
											</div>
										) : balanceRows.length === 0 ? (
											<div className="flex items-center justify-center h-96">
												<span>No events found</span>
											</div>
										) : (
											<DataGrid
												rows={balanceRows}
												columns={balanceColumns}
												pageSize={25}
												rowsPerPageOptions={[5]}
												checkboxSelection={false}
												disableSelectionOnClick
												sx={{
													"& .MuiDataGrid-columnHeaders":
														{
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
													"& .MuiDataGrid-footerContainer":
														{
															backgroundColor:
																"white",
														},
												}}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
