import DashboardHeader from "../../components/(events)/DashboardHeader";

import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputAdornment,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
	Menu,
	Moon,
	Pencil,
	PlusCircle,
	Search,
	Sun,
	Trash2,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useTheme } from "../../context/ThemeContext";

const MultiUserAccess = () => {
	const { theme, toggleTheme } = useTheme();
	const [loading, setLoading] = useState(true);
	const [rows, setRows] = useState([]);
	const [isAddingEmail, setIsAddingEmail] = useState(false);
	const [showWebsite, setShowWebsite] = useState(false);
	const [showEventsHeld, setShowEventsHeld] = useState(false);
	const [eventDisplay, setEventDisplay] = useState("selected-events-only");
	const [userActions, setUserActions] = useState("all-actions");
	const [userReceives, setUserReceives] = useState("selected-emails-only");
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

	const columns = [
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			minWidth: 150,
		},
		{
			field: "email",
			headerName: "E-Mail",
			flex: 1,
			minWidth: 200,
		},
		{
			field: "accessCode",
			headerName: "Custom Access Code",
			flex: 1,
			minWidth: 180,
		},
		{
			field: "id",
			headerName: "Actions",
			flex: 1,
			minWidth: 200,
			renderCell: (params) => (
				<div className="flex gap-3 mt-2">
					<button
						title="Edit"
						className="p-2 text-green-600 bg-green-100 rounded-lg hover:bg-green-200"
					>
						<Pencil size={16} />
					</button>
					<button
						onClick={() => console.log(params.value)}
						title="Delete"
						className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
					>
						<Trash2 size={16} />
					</button>
				</div>
			),
		},
	];

	// Simulate fetching data
	useEffect(() => {
		setLoading(true);
		// Replace this with your actual API call
		setTimeout(() => {
			setRows([
				{
					id: 1,
					name: "Jane Doe",
					email: "jane.doe@example.com",
					accessCode: "ABC123",
				},
				{
					id: 2,
					name: "John Smith",
					email: "john.smith@example.com",
					accessCode: "XYZ789",
				},
				{
					id: 3,
					name: "Alice Johnson",
					email: "alice.johnson@example.com",
					accessCode: "LMN456",
				},
			]);
			setLoading(false);
		}, 1000);
	}, []);

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
							Multi-User Access
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
							Email with access to this account
						</h2>
					</div>
					<Box
						sx={{ width: "100%", bgcolor: "#f9f9f9" }}
						className="p-4 pt-3 md:p-6 md:pt-4"
					>
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

						<div>
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
											<div className="flex items-center justify-center h-40">
												<span>
													No event earnings found
												</span>
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
					</Box>
				</div>
				<div className="flex justify-end mt-8">
					<button
						onClick={() => setIsAddingEmail(!isAddingEmail)}
						className="py-3 px-6 bg-[#040171] text-white font-medium rounded-full"
					>
						{isAddingEmail ? "Cancel" : "Add Email"}
					</button>
				</div>

				{isAddingEmail && (
					<div className="mt-16">
						<form>
							<div>
								<div className="bg-[#040171] text-white p-4 rounded-t-lg">
									<h2 className="text-xl font-medium">
										Add new email address with access to
										this account
									</h2>
								</div>

								<div className="p-8 space-y-6 bg-white">
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
												htmlFor="name"
												className="block mb-2 font-medium"
											>
												Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
											/>
										</div>
										<div>
											<label
												htmlFor="accessCode"
												className="block mb-2 font-medium"
											>
												Access Code (Applies to
												customers only)
											</label>
											<input
												type="text"
												id="accessCode"
												name="accessCode"
												className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
											/>
										</div>
									</div>
									<div>
										<Box className="flex flex-col space-y-6">
											<FormControl component="fieldset">
												<FormLabel component="legend">
													Grant this user access to
												</FormLabel>
												<RadioGroup
													value={eventDisplay}
													onChange={(e) =>
														setEventDisplay(
															e.target.value
														)
													}
												>
													<FormControlLabel
														value="selected-events-only"
														control={<Radio />}
														label="Selected Events Only"
													/>
												</RadioGroup>
												<Box className="flex flex-wrap gap-x-6 gap-y-0">
													{/* this is going to be loop based on the actual events */}
													<FormControlLabel
														control={
															<Checkbox
																checked={
																	showWebsite
																}
																onChange={(e) =>
																	setShowWebsite(
																		e.target
																			.checked
																	)
																}
															/>
														}
														label="End of The Year Party"
													/>
													<FormControlLabel
														control={
															<Checkbox
																checked={
																	showEventsHeld
																}
																onChange={(e) =>
																	setShowEventsHeld(
																		e.target
																			.checked
																	)
																}
															/>
														}
														label="EOY Party"
													/>
												</Box>
											</FormControl>

											<FormControl component="fieldset">
												<FormLabel component="legend">
													Actions this user can
													perform:
												</FormLabel>
												<RadioGroup
													value={userActions}
													onChange={(e) =>
														setUserActions(
															e.target.checked
														)
													}
													className="flex !flex-row flex-wrap"
												>
													<FormControlLabel
														value="all-actions"
														control={<Radio />}
														label="All Actions"
													/>
													<FormControlLabel
														value="selected-actions"
														control={<Radio />}
														label="Selected actions only"
													/>
													<FormControlLabel
														value="manual-sales-only"
														control={<Radio />}
														label="Allow Manual sales only"
													/>
												</RadioGroup>
											</FormControl>

											<FormControl component="fieldset">
												<FormLabel component="legend">
													This user should receive a
													copy of:
												</FormLabel>
												<RadioGroup
													value={userReceives}
													onChange={(e) =>
														setUserReceives(
															e.target.value
														)
													}
													className="flex !flex-row flex-wrap"
												>
													<FormControlLabel
														value="selected-emails-only"
														control={<Radio />}
														label="Selected E-Mails Only"
													/>
													<FormControlLabel
														value="no-emails"
														control={<Radio />}
														label="No E-mails"
													/>
												</RadioGroup>
												<Box className="flex flex-wrap mt-4 gap-x-6 gap-y-0 md:mt-0">
													{/* this is going to be loop based on the actual events */}
													<FormControlLabel
														control={
															<Checkbox
																checked={
																	showWebsite
																}
																onChange={(e) =>
																	setShowWebsite(
																		e.target
																			.checked
																	)
																}
															/>
														}
														label="Order Confirmations"
													/>
													<FormControlLabel
														control={
															<Checkbox
																checked={
																	showEventsHeld
																}
																onChange={(e) =>
																	setShowEventsHeld(
																		e.target
																			.checked
																	)
																}
															/>
														}
														label="Contact the Organizer"
													/>
													<FormControlLabel
														control={
															<Checkbox
																checked={
																	showEventsHeld
																}
																onChange={(e) =>
																	setShowEventsHeld(
																		e.target
																			.checked
																	)
																}
															/>
														}
														label="Event Confirmations"
													/>
												</Box>
											</FormControl>
										</Box>
									</div>
								</div>

								<div className="flex justify-end mt-8">
									<button
										type="submit"
										// disabled={isSubmitting}
										className="bg-[#040171] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#09096e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{/* {isSubmitting ? "Saving..." : "Save"} */}
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default MultiUserAccess;
