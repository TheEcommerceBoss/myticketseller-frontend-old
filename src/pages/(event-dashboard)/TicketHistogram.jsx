import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/EventDashboardSidebar";
import { useTheme } from "../../context/ThemeContext";

const data = [
	{ name: "Total Tickets", value: 1000, color: "#4A90A4" },
	{ name: "Total Tickets Sold", value: 7, color: "#4A90A4" },
	{ name: "Online Tickets Sold", value: 250, color: "#22C55E" },
	{ name: "Tickets Available", value: 750, color: "#22C55E" },
	{ name: "Offline Tickets Sold", value: 0, color: "#4A90A4" },
];

const CustomLabel = (props) => {
	const { x, y, width, value } = props;
	return (
		<text
			x={x + width / 2}
			y={y - 10}
			fill="#374151"
			textAnchor="middle"
			fontSize="14"
			fontWeight="500"
			fontFamily="system-ui, -apple-system, sans-serif"
		>
			{value}
		</text>
	);
};

const TicketHistogram = () => {
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
							Graphical View
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
					<div className="w-full max-w-6xl p-8 mx-auto bg-white">
						<h1 className="mb-8 text-2xl font-semibold text-center text-gray-800">
							Ticket Status in Histogram View
						</h1>

						<div className="w-full h-[500px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={data}
									margin={{
										top: 40,
										right: 30,
										left: 60,
										bottom: 60,
									}}
								>
									<CartesianGrid
										strokeDasharray="1 1"
										stroke="#C1C1C1"
										horizontal={true}
										vertical={false}
									/>
									<XAxis
										dataKey="name"
										axisLine={{
											stroke: "#C1C1C1",
											strokeWidth: 1,
										}}
										tickLine={{
											stroke: "#E5E7EB",
											strokeWidth: 1,
										}}
										tick={{
											fontSize: 14,
											fill: "#374151",
											fontFamily:
												"system-ui, -apple-system, sans-serif",
										}}
										interval={0}
										angle={0}
										textAnchor="middle"
										height={60}
									/>
									<YAxis
										label={{
											value: "Total Tickets",
											angle: -90,
											position: "insideLeft",
											style: {
												textAnchor: "middle",
												fontSize: "14px",
												fill: "#374151",
												fontFamily:
													"system-ui, -apple-system, sans-serif",
												fontWeight: 500,
											},
										}}
										axisLine={{
											stroke: "#C1C1C1",
											strokeWidth: 1,
										}}
										tickLine={{
											stroke: "#E5E7EB",
											strokeWidth: 1,
										}}
										tick={{
											fontSize: 12,
											fill: "#6B7280",
											fontFamily:
												"system-ui, -apple-system, sans-serif",
										}}
										domain={[0, 250, 500, 750, 1000, 1250]}
									/>
									<Bar dataKey="value" radius={[0, 0, 0, 0]}>
										{data.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={entry.color}
											/>
										))}
										<LabelList content={CustomLabel} />
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicketHistogram;
