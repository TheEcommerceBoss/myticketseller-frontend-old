import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function AffiliateEarn() {
	const { theme } = useTheme();
	const [affiliateRows, setAffiliateRows] = useState([]);
	const [loading, setLoading] = useState(true);

	const affiliateColumns = [
		{
			field: "eventName",
			headerName: "Event Name",
			flex: 2,
			minWidth: 180,
		},
		{ field: "amount", headerName: "Amount", flex: 1, minWidth: 100 },
		{ field: "date", headerName: "Date", flex: 1.5, minWidth: 140 },
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

	// Simulate fetching data
	useEffect(() => {
		setLoading(true);
		// Replace this with your actual API call
		setTimeout(() => {
			setAffiliateRows([
				{
					id: 1,
					eventName: "VIP Concert",
					amount: 200,
					date: "2024-06-01 10:15 AM",
				},
				{
					id: 2,
					eventName: "Regular Show",
					amount: 50,
					date: "2024-06-02 02:30 PM",
				},
				{
					id: 3,
					eventName: "Early Bird Festival",
					amount: 90,
					date: "2024-06-03 09:45 AM",
				},
				{
					id: 4,
					eventName: "VIP Gala",
					amount: 200,
					date: "2024-06-04 11:00 AM",
				},
				{
					id: 5,
					eventName: "Regular Meetup",
					amount: 200,
					date: "2024-06-05 03:20 PM",
				},
			]);
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
			<div
				className={`md:col-span-3 p-2 ${
					theme === "light" ? "bg-white" : "bg-[#121212] text-white"
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
					) : affiliateRows.length === 0 ? (
						<div className="flex items-center justify-center h-96">
							<span>No affiliate earnings found</span>
						</div>
					) : (
						<DataGrid
							rows={affiliateRows}
							columns={affiliateColumns}
							pageSize={25}
							rowsPerPageOptions={[5]}
							checkboxSelection={false}
							disableSelectionOnClick
							sx={{
								"& .MuiDataGrid-columnHeaders": {
									backgroundColor:
										theme === "dark" ? "black" : "#f5f5f5",
								},
								"& .MuiDataGrid-cell": {
									color: theme === "dark" ? "white" : "black",
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
	);
}
