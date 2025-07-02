import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAppContext } from "../../../context/AppContext";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const SalesChart = () => {
	const { activeTimeFilter, setActiveTimeFilter } = useAppContext();

	const timeFilters = ["Today", "Last 30 Days", "Last 1 Year"];

	const labels = [
		"12am",
		"1am",
		"2am",
		"3am",
		"4am",
		"5am",
		"6am",
		"7am",
		"8am",
		"9am",
	];

	// Sample data
	const data = {
		labels,
		datasets: [
			{
				label: "Sold Tickets",
				data: [0.2, 0.3, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
				borderColor: "#f97316",
				backgroundColor: "rgba(249, 115, 22, 0.1)",
				tension: 0.4,
			},
			{
				label: "Remaining Tickets",
				data: [0.8, 0.7, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0],
				borderColor: "#10b981",
				backgroundColor: "rgba(16, 185, 129, 0.1)",
				tension: 0.4,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				mode: "index",
				intersect: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: "#e5e7eb",
				},
				ticks: {
					callback: (value) => value.toFixed(1),
				},
			},
			x: {
				grid: {
					color: "#e5e7eb",
				},
			},
		},
	};

	return (
		<div className="p-6 bg-white rounded-xl shadow-card">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-lg font-semibold">
					Sold vs Remaining Tickets
				</h2>
				<div className="flex overflow-hidden border rounded-md border-neutral-200">
					{timeFilters.map((filter) => (
						<button
							key={filter}
							className={`time-filter-button ${
								activeTimeFilter === filter ? "active" : ""
							}`}
							onClick={() => setActiveTimeFilter(filter)}
						>
							{filter}
						</button>
					))}
				</div>
			</div>

			<div className="flex items-center gap-6 mb-4">
				<div className="flex items-center gap-2">
					<span className="w-4 h-1 rounded-full bg-accent-500"></span>
					<span className="text-sm text-neutral-600">
						Sold Tickets
					</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="w-4 h-1 rounded-full bg-secondary-500"></span>
					<span className="text-sm text-neutral-600">
						Remaining Tickets
					</span>
				</div>
			</div>

			<div className="h-64">
				<Line options={options} data={data} />
			</div>
		</div>
	);
};

export default SalesChart;
