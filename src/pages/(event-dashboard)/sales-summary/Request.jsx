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

export default function Request() {
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
		{
			field: "requestId",
			headerName: "Request ID",
			flex: 1,
			minWidth: 140,
		},
		{
			field: "userEmail",
			headerName: "User Email",
			flex: 1,
			minWidth: 200,
		},
		{ field: "userName", headerName: "User Name", flex: 1, minWidth: 160 },
		{
			field: "committeeMember",
			headerName: "Committee Member/Owner",
			flex: 1,
			minWidth: 200,
		},
		{ field: "quantity", headerName: "Quantity", flex: 1, minWidth: 100 },
		{ field: "status", headerName: "Status", flex: 1, minWidth: 120 },
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			minWidth: 120,
			renderCell: (params) => (
				<Button variant="contained" size="small">
					View
				</Button>
			),
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
                    requestId: "REQ-1001",
                    userEmail: "john.doe@example.com",
                    userName: "John Doe",
                    committeeMember: "Alice Johnson",
                    quantity: 2,
                    status: "Pending",
                },
                {
                    id: 2,
                    requestId: "REQ-1002",
                    userEmail: "jane.smith@example.com",
                    userName: "Jane Smith",
                    committeeMember: "Bob Lee",
                    quantity: 1,
                    status: "Approved",
                },
                {
                    id: 3,
                    requestId: "REQ-1003",
                    userEmail: "alice.johnson@example.com",
                    userName: "Alice Johnson",
                    committeeMember: "Emily Clark",
                    quantity: 3,
                    status: "Rejected",
                },
                {
                    id: 4,
                    requestId: "REQ-1004",
                    userEmail: "bob.lee@example.com",
                    userName: "Bob Lee",
                    committeeMember: "John Doe",
                    quantity: 4,
                    status: "Pending",
                },
                {
                    id: 5,
                    requestId: "REQ-1005",
                    userEmail: "emily.clark@example.com",
                    userName: "Emily Clark",
                    committeeMember: "Jane Smith",
                    quantity: 2,
                    status: "Approved",
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
							Request
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
