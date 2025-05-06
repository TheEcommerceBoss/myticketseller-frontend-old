import React, { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import {
	ArrowDown,
	Banknote,
	CirclePlus,
	Menu,
	MinusCircle,
	Moon,
	PlusCircle,
	Sun,
	X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import logo from "../../assets/(site_assets)/logo-dark.png";
import WithdrawalModal from "./WithdrawalModal";
import AccountSetupModal from "./AccountSetupModal";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import api from "../../api";
import { usersApi } from "../../shared/services/api";

const WalletDashboard = () => {
	const [activeTab, setActiveTab] = useState("expenses");
	const [activeTimeframe, setActiveTimeframe] = useState("all");
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
	const [showAccountSetupModal, setShowAccountSetupModal] = useState(false);
	const { userData } = useAuth();
	const [userDetails, setUserDetails] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [withdrawals, setWithdrawals] = useState([]);
	const [earnings, setEarnings] = useState([]);
	const [withdrawalschart, setWithdrawalschart] = useState([]);
	const [earningschart, setEarningschart] = useState([]);
	const token = Cookies.get("auth_token");
	const [chartData, setChartData] = useState([]);
	const [earningsPage, setEarningsPage] = useState(1);
	const [withdrawalsPage, setWithdrawalsPage] = useState(1);
	const itemsPerPage = 5; // Adjust number of items per page

	const [requeststatement, setrequeststatement] = useState(true);

	// Function to paginate data
	const paginate = (data, page) => {
		const startIndex = (page - 1) * itemsPerPage;
		return data.slice(startIndex, startIndex + itemsPerPage);
	};

	// Earnings Paginated Data
	const paginatedEarnings = paginate(earnings, earningsPage);
	const totalEarningsPages = Math.ceil(earnings.length / itemsPerPage);

	// Withdrawals Paginated Data
	const paginatedWithdrawals = paginate(withdrawals, withdrawalsPage);
	const totalWithdrawalsPages = Math.ceil(withdrawals.length / itemsPerPage);

	console.log(chartData);
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Trigger both API requests concurrently
				const userDetailsResposnse = await usersApi.getMe();
				setUserDetails(userDetailsResposnse);

				const [statsResponse, eventsResponse] = await Promise.all([
					usersApi.getWithdrawals(),
					usersApi.getEarnings(),
				]);
				console.log("responses:", statsResponse, eventsResponse);
				if (eventsResponse && eventsResponse.data) {
					if (eventsResponse.code === 200) {
						setEarnings(eventsResponse.data);
						const earnings = eventsResponse.data;

						// Reduce earnings to accumulate monthly totals
						const monthlyData = earnings.reduce((acc, earning) => {
							const date = new Date(earning.request_time);
							const month = date
								.toLocaleString("default", { month: "short" })
								.toUpperCase();
							const amount = Number(earning.initial_amount);
							acc[month] = (acc[month] || 0) + amount;
							return acc;
						}, {});

						// Include all months in order
						const monthOrder = [
							"JAN",
							"FEB",
							"MAR",
							"APR",
							"MAY",
							"JUN",
							"JUL",
							"AUG",
							"SEP",
							"OCT",
							"NOV",
							"DEC",
						];
						const sortedEarningsData = monthOrder.map((month) => ({
							name: month,
							value: monthlyData[month] || 0, // Default to 0 if no data for the month
						}));

						setEarningschart(sortedEarningsData);
					} else {
						setError(
							eventsResponse.message ||
								"Failed to fetch earnings records"
						);
					}
				}

				if (statsResponse && statsResponse.data) {
					if (statsResponse.code === 200) {
						setWithdrawals(statsResponse.data);
						const withdrawals = statsResponse.data;

						// Filter withdrawals to only include those with status "success"
						const successfulWithdrawals = withdrawals.filter(
							(withdrawal) =>
								withdrawal.status.toLowerCase() === "success"
						);

						// Reduce successful withdrawals to accumulate monthly totals
						const monthlyData = successfulWithdrawals.reduce(
							(acc, withdrawal) => {
								const date = new Date(withdrawal.request_time);
								const month = date
									.toLocaleString("default", {
										month: "short",
									})
									.toUpperCase();
								const amount = Number(withdrawal.amount);
								acc[month] = (acc[month] || 0) + amount;
								return acc;
							},
							{}
						);

						// Include all months in order
						const monthOrder = [
							"JAN",
							"FEB",
							"MAR",
							"APR",
							"MAY",
							"JUN",
							"JUL",
							"AUG",
							"SEP",
							"OCT",
							"NOV",
							"DEC",
						];
						const sortedWithdrawalsData = monthOrder.map(
							(month) => ({
								name: month,
								value: monthlyData[month] || 0, // Default to 0 if no data for the month
							})
						);

						setWithdrawalschart(sortedWithdrawalsData);
					} else {
						setError(
							statsResponse.message ||
								"Failed to fetch withdrawal records"
						);
					}
				}
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				console.log("done");
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (earningschart.length && withdrawalschart.length) {
			const combinedData = earningschart.map((earning, index) => ({
				name: earning.name,
				earnings: earning.value,
				withdrawals: withdrawalschart[index]?.value || 0,
			}));
			setChartData(combinedData);
		}
	}, [earningschart, withdrawalschart]);

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

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const StatementRequest = () => {
		alert("requesting statement");
	};

	return (
		<div
			className={`flex flex-col md:flex-row min-h-screen ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			}`}
		>
			<SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

			<div className="flex-1 w-full px-4 py-4 md:py-8 md:px-5 lg:px-8">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className={`rounded-lg outline-none p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "bg-[#121212]"
							}`}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>

						<h1 className="hidden text-2xl font-bold lg:flex">
							Wallet
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
							<CirclePlus
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
				<div className="mx-auto max-w-7xl">
					<div className="grid grid-cols-1 gap-4 mb-3 md:grid-cols-3">
						{/* Card Section - Full Width on Mobile, Responsive on Desktop */}
						<div className="flex flex-col gap-4 md:px-4">
							<div className="bg-[#040171] text-white rounded-2xl w-full h-[13rem] p-6 relative overflow-hidden">
								<div className="absolute top-4 right-4">
									<svg
										className="w-8 h-8"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div className="flex flex-col justify-between">
									<div className="absolute z-10 right-3">
										<img
											src={logo}
											alt="Visa"
											className="w-12 md:w-12"
										/>
									</div>
								</div>
								<div className="flex flex-col justify-between h-full">
									<div className="text-sm ">
										{userData && userData.user.account_name
											? userData.user.account_name
											: "Add Account to continue"}
									</div>

									<div className="mb-2 text-2xl tracking-wider">
										₦
										{userDetails?.balance?.toFixed(2) ??
											"0.00"}
									</div>
									<div className="z-10 flex flex-col">
										<div className="text-sm ">
											{userData &&
											userData.user.account_number
												? userData.user.account_number
												: " "}
										</div>
										<div className="text-sm ">
											{userData && userData.user.bank_name
												? userData.user.bank_name
												: " "}
										</div>
									</div>
								</div>
								<div className="absolute bottom-0 right-0 bg-[#ff6600] w-24 h-full -skew-x-12 transform origin-bottom-right"></div>
								<div className="absolute text-xs font-medium text-white bottom-2 right-4 md:text-sm"></div>
							</div>

							<div className="relative w-full p-4 overflow-hidden text-white bg-black rounded-2xl md:p-6">
								<div className="flex flex-col justify-between h-full">
									<div className="flex flex-col justify-center gap-2 my-2 md:my-4">
										<button
											onClick={() =>
												setShowAccountSetupModal(true)
											}
											className="px-4 py-2 text-sm text-black transition-colors bg-white rounded-full md:px-6 md:py-2 hover:bg-gray-100 md:text-base"
										>
											Setup Account
										</button>
										<button
											onClick={() =>
												setShowWithdrawalModal(true)
											}
											className="bg-[#040171] text-white px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-[#030171] transition-colors text-sm md:text-base"
										>
											Request Withdrawal
										</button>
										{/* <button
                      onClick={StatementRequest}
                      disabled={!requeststatement}
                      className="pb-0 mb-0 text-xs text-white transition-colors bg-transparent rounded-full"
                    >
                      {requeststatement ? 'Request Account Statement' : 'loading...' }
                    </button> */}
									</div>
								</div>
							</div>
						</div>

						<div
							className={`${
								theme === "light" ? "bg-white" : "bg-[#121212]"
							} md:col-span-2 rounded-3xl p-4 md:p-8 mb-4 md:mb-8 shadow-sm`}
						>
							<div className="h-48 md:h-80">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={chartData}>
										<CartesianGrid
											strokeDasharray="3 3"
											vertical={false}
										/>
										<XAxis
											dataKey="name"
											axisLine={false}
											tickLine={false}
										/>
										<YAxis
											axisLine={false}
											tickLine={false}
										/>
										<Tooltip
											content={({ active, payload }) => {
												if (
													active &&
													payload &&
													payload.length
												) {
													return (
														<div className="p-2 text-white bg-black rounded">
															<p className="font-bold">
																Withdrawal - ₦
																{payload[0].value.toLocaleString()}
															</p>
															<p className="font-bold">
																Earning - ₦
																{payload[1].value.toLocaleString()}
															</p>
														</div>
													);
												}
												return null;
											}}
										/>
										{/* Line for Withdrawals */}
										<Line
											type="monotone"
											dataKey="withdrawals"
											stroke="#8884d8"
											strokeWidth={2}
											dot={false}
											activeDot={{ r: 8 }}
										/>
										{/* Line for Earnings */}
										<Line
											type="monotone"
											dataKey="earnings"
											stroke="#82ca9d"
											strokeWidth={2}
											dot={false}
											activeDot={{ r: 8 }}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-2 md:gap-8">
						{/* Earnings Section */}
						<div
							className={`${
								theme === "light" ? "bg-white" : "bg-[#121212]"
							} rounded-3xl p-4 md:p-8 shadow-sm`}
						>
							<div className="flex flex-col items-center justify-between mb-4 md:flex-row md:mb-6">
								<h2
									className={`${
										theme === "light"
											? "text-gray-800"
											: "text-white"
									} text-xl md:text-2xl font-bold mb-2 md:mb-0`}
								>
									Ticket Sales
								</h2>
							</div>
							<div className="space-y-4 md:space-y-6">
								{paginatedEarnings.length > 0
									? paginatedEarnings.map((transaction) => (
											<div
												key={transaction.id}
												className="space-y-4 md:space-y-6"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center space-x-2 md:space-x-4">
														<div className="bg-[#030171] rounded-full p-2">
															<MinusCircle className="w-6 h-6 text-white" />
														</div>
														<div>
															<div className="text-sm font-medium text-red-500 md:text-base">
																- ₦
																{transaction?.initial_amount !=
																	null &&
																transaction?.amount !=
																	null
																	? (
																			transaction.initial_amount -
																			transaction.amount
																	  ).toFixed(
																			2
																	  )
																	: "0.00"}{" "}
																(Charge + Tax)
															</div>
															<div className="text-xs text-gray-500 md:text-sm">
																{
																	transaction.request_time
																}
															</div>
														</div>
													</div>
													<div className="text-sm font-medium md:text-base">
														{transaction.status}
													</div>
												</div>
												<div className="flex items-center justify-between">
													<div className="flex items-center space-x-2 md:space-x-4">
														<div className="bg-[#030171] rounded-full p-2">
															<ArrowDown className="w-6 h-6 text-white" />
														</div>
														<div>
															<div className="text-sm font-medium text-green-500 md:text-base">
																₦
																{transaction?.initial_amount !=
																null
																	? transaction.initial_amount.toFixed(
																			2
																	  )
																	: "0.00"}
															</div>
															<div className="text-xs text-gray-500 md:text-sm">
																{
																	transaction.request_time
																}
															</div>
														</div>
													</div>
													<div className="text-sm font-medium md:text-base">
														{transaction.status}
													</div>
												</div>
											</div>
									  ))
									: "No Transaction Found!!"}
							</div>

							{/* Pagination Controls for Earnings */}
							{totalEarningsPages > 1 && (
								<div className="flex items-center justify-center mt-6 space-x-4">
									<button
										disabled={earningsPage === 1}
										onClick={() =>
											setEarningsPage(earningsPage - 1)
										}
										className={`py-2 px-4 rounded-lg border ${
											earningsPage === 1
												? "bg-black/50 text-white cursor-not-allowed"
												: "bg-black text-white hover:bg-black/90"
										}`}
									>
										Previous
									</button>
									<span className="text-sm text-gray-500">
										Page {earningsPage} of{" "}
										{totalEarningsPages}
									</span>
									<button
										disabled={
											earningsPage === totalEarningsPages
										}
										onClick={() =>
											setEarningsPage(earningsPage + 1)
										}
										className={`py-2 px-4 rounded-lg border ${
											earningsPage === totalEarningsPages
												? "bg-black/50 text-white cursor-not-allowed"
												: "bg-black text-white hover:bg-black/90"
										}`}
									>
										Next
									</button>
								</div>
							)}
						</div>

						{/* Withdrawals Section */}
						<div
							className={`${
								theme === "light" ? "bg-white" : "bg-[#121212]"
							} rounded-3xl p-4 md:p-8 shadow-sm`}
						>
							<div className="flex flex-col items-center justify-between mb-4 md:flex-row md:mb-6">
								<h2
									className={`${
										theme === "light"
											? "text-gray-800"
											: "text-white"
									} text-xl md:text-2xl font-bold mb-2 md:mb-0`}
								>
									Withdrawals
								</h2>
							</div>
							<div className="space-y-4 md:space-y-6">
								{paginatedWithdrawals.length > 0
									? paginatedWithdrawals.map(
											(transaction) => (
												<div
													key={transaction.id}
													className="flex items-center justify-between"
												>
													<div className="flex items-center space-x-2 md:space-x-4">
														<div className="bg-[#030171] rounded-full p-2">
															<ArrowDown className="w-6 h-6 text-white" />
														</div>
														<div>
															<div className="text-sm font-medium md:text-base">
																₦{" "}
																{userData
																	? new Intl.NumberFormat(
																			"en-US"
																	  ).format(
																			transaction.amount
																	  )
																	: "0.00"}
															</div>
															<div className="text-xs text-gray-500 md:text-sm">
																{
																	transaction.request_time
																}
															</div>
														</div>
													</div>
													<div className="text-sm font-medium md:text-base">
														{transaction.status}
													</div>
												</div>
											)
									  )
									: "No Transaction Found!!"}
							</div>

							{/* Pagination Controls for Withdrawals */}
							{totalWithdrawalsPages > 1 && (
								<div className="flex items-center justify-center mt-6 space-x-4">
									<button
										disabled={withdrawalsPage === 1}
										onClick={() =>
											setWithdrawalsPage(
												withdrawalsPage - 1
											)
										}
										className={`py-2 px-4 rounded-lg border ${
											withdrawalsPage === 1
												? "bg-black/50 text-white cursor-not-allowed"
												: "bg-black text-white hover:bg-black/90"
										}`}
									>
										Previous
									</button>
									<span className="text-sm text-gray-500">
										Page {withdrawalsPage} of{" "}
										{totalWithdrawalsPages}
									</span>
									<button
										disabled={
											withdrawalsPage ===
											totalWithdrawalsPages
										}
										onClick={() =>
											setWithdrawalsPage(
												withdrawalsPage + 1
											)
										}
										className={`py-2 px-4 rounded-lg border ${
											withdrawalsPage ===
											totalWithdrawalsPages
												? "bg-black/50 text-white cursor-not-allowed"
												: "bg-black text-white hover:bg-black/90"
										}`}
									>
										Next
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<WithdrawalModal
				isOpen={showWithdrawalModal}
				onClose={() => setShowWithdrawalModal(false)}
			/>
			<AccountSetupModal
				isOpen={showAccountSetupModal}
				onClose={() => setShowAccountSetupModal(false)}
			/>
		</div>
	);
};

export default WalletDashboard;
