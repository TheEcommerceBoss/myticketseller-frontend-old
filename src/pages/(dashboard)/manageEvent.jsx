/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Pencil, Trash2, Eye, PlusCircle, FolderPen } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { Search, Menu, X, Moon, Sun } from "lucide-react";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import api from "../../api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { eventsApi } from "../../shared/services/api/eventsApi";
import { CircularProgress } from "@mui/material";

const ManageEvent = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true); // Track loading state

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				// const token = Cookies.get("auth_token");
				const data = await eventsApi.getMyEvents();
				console.log(data);
				// console.log("my data", data);
				// const response = await api.get("/get_user_events", {
				//   headers: {
				//     Authorization: `Bearer ${token}`,
				//   },
				// });

				setEvents(data);
			} catch (error) {
				console.error("Failed to fetch events:", error);
			} finally {
				setLoading(false); // Stop loading after fetch
			}
		};
		fetchEvents();
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsOpen(window.innerWidth >= 1024);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const deleteEvent = async (eventId) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await eventsApi.deleteEvent(eventId);
					setEvents(
						events.filter((event) => event.event_id !== eventId)
					);
					Swal.fire({
						icon: "success",
						title: "Deleted!",
						text: "The event has been deleted.",
					});
				} catch (error) {
					console.error("Failed to delete event:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to delete event.",
					});
				}
			}
		});
	};

	const toggleEventStatus = async (eventId, currentStatus) => {
		try {
			await api.post(`/toggle-status/${currentStatus === 0 ? 1 : 0}`, {
				event_id: eventId,
			});
			setEvents(
				events.map((event) =>
					event.event_id === eventId
						? { ...event, status: currentStatus === 0 ? 1 : 0 }
						: event
				)
			);
			Swal.fire({
				icon: "success",
				title: "Updated",
				text: `The event status has been changed to ${
					currentStatus === 0 ? "Live" : "Draft"
				}.`,
			});
		} catch (error) {
			console.error("Failed to toggle event status:", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Failed to update event status.",
			});
		}
	};

	const eventsWithIndex = events.map((event, index) => ({
		...event,
	}));

	const columns = [
		{ field: "title", headerName: "Event Title", width: 250 },
		{
			field: "is_listed",
			headerName: "Visibility",
			width: 100,
			renderCell: (params) => (
				<div>{params.value === 0 ? "Private" : "Public"}</div>
			),
		},

		{
			field: "status",
			headerName: "Status",
			width: 100,
			renderCell: (params) => (
				<div className="flex items-center gap-2">
					<span>{params.value === 0 ? "Draft" : "Live"}</span>
				</div>
			),
		},
		{ field: "category_id", headerName: "Category", width: 100 },
		{ field: "description", headerName: "Description", width: 300 },
		{
			field: "id",
			headerName: "Actions",
			width: 200,
			renderCell: (params) => (
				<div className="flex gap-3 mt-2">
					<Link
						to={`/dashboard/event/${params.value}`}
						title="Manage"
						className="p-2 text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200"
					>
						<FolderPen size={16} />
					</Link>
					<Link
						to={`/dashboard/event/create/${params.value}`}
						title="Edit"
						className="p-2 text-green-600 bg-green-100 rounded-lg hover:bg-green-200"
					>
						<Pencil size={16} />
					</Link>
					<button
						onClick={() => deleteEvent(params.value)}
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

	return (
		<div
			className={`flex min-h-screen ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			}`}
		>
			<SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
			<div className="flex-1 px-5 py-8 lg:px-8">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className={`rounded-lg p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "bg-[#121212]"
							}`}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
						<h1 className="hidden text-2xl font-bold lg:flex">
							Manage Events
						</h1>
					</div>
					<div className="flex items-center space-x-4">
						<div className="relative hidden md:flex">
							<Search className="absolute w-5 h-5 text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
							<input
								type="text"
								placeholder="Search"
								className={`pl-10 pr-4 py-2 rounded-full border ${
									theme === "dark"
										? "bg-[#222] border-[#444]"
										: "bg-transparent border-gray-400"
								} focus:outline-none focus:ring-2 focus:ring-blue-500`}
							/>
						</div>
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
							className={`rounded-full p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "bg-[#121212]"
							}`}
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
				<div className="container mx-auto lg:px-0">
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
								) : events.length === 0 ? (
									<div className="flex items-center justify-center h-96">
										<span>No events found</span>
									</div>
								) : (
									<DataGrid
										rows={eventsWithIndex}
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

export default ManageEvent;
