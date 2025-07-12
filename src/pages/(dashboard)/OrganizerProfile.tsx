import {
	Eye,
	Menu,
	Moon,
	Pencil,
	PlusCircle,
	Sun,
	Trash2,
	X,
} from "lucide-react";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import { organizerProfileApi } from "../../shared/services/api";

const OrganizerProfile = () => {
	const { theme, toggleTheme } = useTheme();
	const [isSidebarOpen, setIsSidebarOpen] = useState(
		window.innerWidth >= 1024
	);
	const [loading, setLoading] = useState(true); // Track loading state

	useEffect(() => {
		const handleResize = () => {
			setIsSidebarOpen(window.innerWidth >= 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(function () {
		async function fetchProfiles() {
			try {
				// console.log("Haaaa");
				const res =
					await organizerProfileApi.getUserOrganizerProfiles();
				console.log("my res", res);
			} catch (error) {
				console.error("Error fetching organizer profiles:", error);
			}
		}
		fetchProfiles();
	}, []);
	const columns = [
		{ field: "name", headerName: "Name", width: 250 },
		{
			field: "short_url",
			headerName: "Short URL",
			width: 300,
			renderCell: (params) => (
				<Link
					to={params.value}
					className="text-[#040171] hover:underline"
				>
					{params.value}
				</Link>
			),
		},
		{
			field: "id",
			headerName: "Actions",
			width: 200,
			renderCell: (params) => (
				<div className="flex gap-3 mt-2">
					<Link
						to={`/dashboard/event/create/${params.value}`}
						title="Edit"
						className="p-2 text-green-600 bg-green-100 rounded-lg hover:bg-green-200"
					>
						<Pencil size={16} />
					</Link>
					<button
						onClick={() => console.log(params.value)}
						title="Delete"
						className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
					>
						<Trash2 size={16} />
					</button>
					<Link
						to={`/event/view/${params.value}`}
						target="_blank"
						title="view"
						className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
					>
						<Eye size={16} />
					</Link>
				</div>
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
					name: "E-commerce Boss",
					short_url: "https://myticketseller.com/ecommerceboss",
					status: "Active",
				},
				{
					id: 2,
					name: "Indulgetix",
					short_url: "https://myticketseller.com/indulgetix",
					status: "Inactive",
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

				<div className="container mx-auto lg:px-0">
					<div className="mt-10">
						<Link
							to={"/dashboard/add-new-organizer"}
							className="py-3 px-6 bg-[#040171] text-white font-medium rounded-full"
						>
							Add New Organizer
						</Link>
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
		</div>
	);
};

export default OrganizerProfile;
