import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { earningsApi } from "../../shared/services/api";
import Swal from "sweetalert2";

export default function ReferralEarn() {
	const { theme } = useTheme();
	const [loading, setLoading] = useState(true);
	const [referralRows, setReferralRows] = useState([]);
	const [withdrawRows, setWithdrawRows] = useState([]);
	const [referralEarnings, setReferralEarnings] = useState([]);
	const [withdrawEarnings, setWithdrawEarnings] = useState([]);

	const referralColumns = [
		{ field: "amount", headerName: "Amount", flex: 1, minWidth: 100 },
		{ field: "paid", headerName: "Paid", flex: 1, minWidth: 80 },
		{ field: "due", headerName: "Due", flex: 1, minWidth: 80 },
		{
			field: "actions",
			headerName: "Quick Links",
			flex: 1,
			minWidth: 120,
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
			sortable: false,
			filterable: false,
		},
	];

	const withdrawColumns = [
		{ field: "userId", headerName: "User Id", flex: 1, minWidth: 120 },
		{
			field: "withdrawalNo",
			headerName: "Withdrawal No",
			flex: 1,
			minWidth: 150,
		},
		{ field: "date", headerName: "Date", flex: 1, minWidth: 150 },
		{ field: "amount", headerName: "Amount", flex: 1, minWidth: 120 },
		{ field: "status", headerName: "Status", flex: 1, minWidth: 120 },
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const referralEarningsResponse =
					await earningsApi.getReferralEarnings();
				setReferralEarnings(referralEarningsResponse);
				const withdrawEarningsResponse =
					await earningsApi.withdrawEarnings();
				setWithdrawEarnings(withdrawEarningsResponse);
				console.log(referralEarningsResponse, withdrawColumns);
			} catch (error) {
				Swal.fire(error.message, "", "error");
				console.error("Failed to fetch data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Simulate fetching data
	// useEffect(() => {
	// 	setLoading(true);
	// 	// Replace this with your actual API call
	// 	setTimeout(() => {
	// 		setReferralRows([
	// 			{
	// 				id: 1,
	// 				eventName: "VIP Concert",
	// 				amount: 200,
	// 				paid: 200,
	// 				due: 0,
	// 				date: "2024-06-01 10:15 AM",
	// 				status: "Paid",
	// 				actions: "",
	// 			},
	// 			{
	// 				id: 2,
	// 				eventName: "Regular Show",
	// 				amount: 50,
	// 				paid: 50,
	// 				due: 0,
	// 				date: "2024-06-02 02:30 PM",
	// 				status: "Paid",
	// 				actions: "",
	// 			},
	// 			{
	// 				id: 3,
	// 				eventName: "Early Bird Festival",
	// 				amount: 90,
	// 				paid: 90,
	// 				due: 0,
	// 				date: "2024-06-03 09:45 AM",
	// 				status: "Paid",
	// 				actions: "",
	// 			},
	// 			{
	// 				id: 4,
	// 				eventName: "VIP Gala",
	// 				amount: 200,
	// 				paid: 150,
	// 				due: 50,
	// 				date: "2024-06-04 11:00 AM",
	// 				status: "Partial",
	// 				actions: "",
	// 			},
	// 			{
	// 				id: 5,
	// 				eventName: "Regular Meetup",
	// 				amount: 200,
	// 				paid: 0,
	// 				due: 200,
	// 				date: "2024-06-05 03:20 PM",
	// 				status: "Due",
	// 				actions: "",
	// 			},
	// 		]);

	// 		setWithdrawRows([
	// 			{
	// 				id: 1,
	// 				userId: "USR001",
	// 				withdrawalNo: "WD-1001",
	// 				date: "2024-06-01 11:00 AM",
	// 				amount: 150,
	// 				status: "Completed",
	// 			},
	// 			{
	// 				id: 2,
	// 				userId: "USR002",
	// 				withdrawalNo: "WD-1002",
	// 				date: "2024-06-03 02:30 PM",
	// 				amount: 200,
	// 				status: "Pending",
	// 			},
	// 			{
	// 				id: 3,
	// 				userId: "USR003",
	// 				withdrawalNo: "WD-1003",
	// 				date: "2024-06-05 09:45 AM",
	// 				amount: 90,
	// 				status: "Rejected",
	// 			},
	// 		]);

	// 		setLoading(false);
	// 	}, 1000);
	// }, []);

	return (
		<>
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
						) : referralRows.length === 0 ? (
							<div className="flex items-center justify-center h-40">
								<span>No referral earnings found</span>
							</div>
						) : (
							<DataGrid
								rows={referralEarnings}
								columns={referralColumns}
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

			<Box className="pt-4">
				<h4 className="text-[#040171] text-lg md:text-xl font-normal mt-8 md:mt-10">
					WITHDRAWAL DETAILS
				</h4>

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
							) : withdrawRows.length === 0 ? (
								<div className="flex items-center justify-center h-40">
									<span>No withdrawal details found</span>
								</div>
							) : (
								<DataGrid
									rows={withdrawEarnings}
									columns={withdrawColumns}
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
			</Box>
		</>
	);
}
