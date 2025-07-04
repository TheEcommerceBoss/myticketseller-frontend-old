import { DataGrid } from "@mui/x-data-grid";
import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/EventDashboardSidebar";
import { useTheme } from "../../context/ThemeContext";

export default function AddManualSales() {
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
		{ field: "ticket_type", headerName: "Ticket Type", width: 150 },
		{ field: "sales_end", headerName: "Sales End", width: 150 },
		{ field: "price", headerName: "Price", width: 120 },
		{ field: "inventory", headerName: "Inventory/Available", width: 180 },
		{ field: "quantity", headerName: "Quantity", width: 120 },
		{ field: "amount_paid", headerName: "Amount Paid", width: 150 },
		{ field: "date", headerName: "Date", width: 180 },
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
							Add Manual Sales
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

				<div className="space-y-6">
					<div>
						<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
							<h2 className="text-xl font-medium">
								Offline Sales
							</h2>
						</div>

						<div className="p-4 pt-3 space-y-6 bg-[#f9f9f9] md:p-6 md:pt-2">
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

					{/* form */}
					<form className="space-y-6">
						<div>
							<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									Buyer’s information
								</h2>
							</div>

							<div className="p-4 space-y-6 bg-white md:p-8">
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
									<div>
										<label
											htmlFor="firstName"
											className="block mb-2 font-medium"
										>
											First Name
										</label>
										<input
											type="text"
											id="firstName"
											name="firstName"
											className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
										/>
									</div>
									<div>
										<label
											htmlFor="lastName"
											className="block mb-2 font-medium"
										>
											Last Name
										</label>
										<input
											type="text"
											id="lastName"
											name="lastName"
											className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
										/>
									</div>
									<div>
										<label
											htmlFor="email"
											className="block mb-2 font-medium"
										>
											Email
										</label>
										<input
											type="email"
											id="email"
											name="email"
											className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
										/>
									</div>
									<div>
										<label
											htmlFor="seoTitle"
											className="block mb-2 font-medium"
										>
											Phone Number
										</label>
										<input
											type="text"
											id="seoTitle"
											name="seoTitle"
											className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
										/>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									Payment Information
								</h2>
							</div>
							<div className="p-4 space-y-6 bg-white md:p-8">
								<div className="grid grid-cols-1 gap-6 max-w-[765px]">
									<div className="">
										<label
											htmlFor="firstName"
											className="block mb-2 font-medium"
										>
											Payment Type
										</label>
										<select
											name="category"
											value={""}
											// onChange={handleChange}
											className={`w-full p-3 border border-gray-300 ${
												theme === "dark"
													? "text-white"
													: "text-[#000]"
											} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
										>
											<option value="" disabled>
												Select payment type
											</option>
											{[
												"Pay with Cheque",
												"Card",
												"Cash",
											].map((category, index) => (
												<option
													key={index}
													value={category.id}
												>
													{category.name}
												</option>
											))}
										</select>
									</div>
									<div>
										<label
											htmlFor="notes"
											className="block mb-2 font-medium"
										>
											Notes
										</label>
										<textarea
											type="text"
											id="notes"
											name="notes"
											className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2"
											rows={4}
										/>
									</div>
								</div>

								<div className="space-y-2 text-sm md:text-base">
									<div>Important Information:</div>
									<p className="max-w-4xl">
										Please always check the ticket quantity
										while adding attendees ticket
										information. The information may not be
										added for the following reasons:
									</p>
									<ol>
										<li>
											{"1) Event is not active / ended"}
										</li>
										<li>
											{
												"2) Ticket quantity is not available / when sale is ended"
											}
										</li>
									</ol>
								</div>
							</div>
						</div>

						<div className="flex justify-end mt-8">
							<button
								type="submit"
								// disabled={isSubmitting}
								className="bg-[#0a0a80] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#09096e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{/* {isSubmitting ? "Saving..." : "Save"} */}
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
