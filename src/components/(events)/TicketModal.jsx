/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowLeft, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { default as api, default as newApi } from "../../shared/services/api";
import { useTheme } from "../../context/ThemeContext";
import { formatDate } from "../../lib/formatDate";
import StripeModal from "../../shared/components/StripeCheckout";
import FlutterwaveCheckout from "../../shared/components/FlutterwaveCheckout";
import {
	fetchConversionRate,
	useLocationData,
} from "../../shared/hooks/useLocationData";
import { supportedCurrencies } from "../../shared/data";
import flutterwaveLogo from "../../assets/(svg)/flutterwave.svg";
import stripeLogo from "../../assets/(svg)/stripe.svg";

const TicketModal = ({
	isOpen,
	onClose,
	eventTitle,
	eventDateTime,
	ticketDetails,
	eventDetails,
	eventId,
}) => {
	const [ticketCounts, setTicketCounts] = useState({});
	const { theme } = useTheme();
	const { location, conversionRate, setLocation, setConversionRate } =
		useLocationData();
	const [tickets, settickets] = useState([]);
	const [showFlutter, setShowFlutterwave] = useState(false);

	const getSupportedCurrenciesWithLocationFirst = () => {
		if (!location) return supportedCurrencies;

		const prioritized = {
			[location.currencyCode]: {
				name: location.currency,
				countryCode: location.countryCode,
			},
		};

		return {
			...prioritized,
			...Object.fromEntries(
				Object.entries(supportedCurrencies).filter(
					([key]) => key !== location.currencyCode
				)
			),
		};
	};

	const handleCountryChange = async (event) => {
		const selectedCurrency = event.target.value;

		if (!supportedCurrencies[selectedCurrency]) {
			setLocation({
				country: "United States",
				currency: "United States Dollar",
				currencyCode: "USD",
				countryCode: "US",
				flag: `https://flagcdn.com/w320/us.png`,
			});
			setConversionRate(await fetchConversionRate("USD")); // Fetch conversion rate for USD
		} else {
			const selectedCountry = supportedCurrencies[selectedCurrency];
			const flagUrl = `https://flagcdn.com/w320/${selectedCountry.countryCode.toLowerCase()}.png`;

			setLocation({
				country: selectedCountry.name,
				currency: selectedCountry.name,
				currencyCode: selectedCurrency,
				countryCode: selectedCountry.countryCode,
				flag: flagUrl,
			});
			setConversionRate(await fetchConversionRate(selectedCurrency)); // Fetch conversion rate for the selected currency
		}
	};

	useEffect(() => {
		// Initialize ticket counts with 0 for each ticket type
		const initialCounts = {};
		ticketDetails.tickets.forEach((ticket) => {
			initialCounts[ticket.id] = 0;
		});

		setTicketCounts(initialCounts);
	}, [ticketDetails]);

	const handleTicketChange = (ticketName, operation) => {
		setTicketCounts((prevCounts) => {
			const currentCount = prevCounts[ticketName] || 0;
			const newCount =
				operation === "add"
					? currentCount + 1
					: Math.max(currentCount - 1, 0); // Prevents negative counts
			return {
				...prevCounts,
				[ticketName]: newCount,
			};
		});
	};

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});
	const [showCheckout, setShowCheckout] = useState(false);
	const [showSummary, setShowSummary] = useState(false);
	const [showStripe, setShowStripe] = useState(false);
	const [checkoutDetails, setCheckoutDetails] = useState(null);

	useEffect(() => {
		const fetchEventDetails = () => {
			if (ticketDetails && ticketDetails.tickets) {
				settickets(ticketDetails.tickets);
			} else {
				console.error(eventTitle);
				console.error(
					"ticketDetails is not defined or does not contain tickets"
				);
			}
		};

		fetchEventDetails();
	}, [ticketDetails]);

	const [marketingConsent, setMarketingConsent] = useState({
		organizer: false,
		platform: false,
	});
	const [paymentMethod, setPaymentMethod] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);

	if (!isOpen) return null;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		calculateTotal();
	};
	const calculateTotal = () => {
		let subtotal = 0;
		let totalTickets = 0; // Initialize ticket counter

		tickets.forEach((ticket) => {
			const ticketCount = ticketCounts[ticket.id] || 0; // Default to 0 if not set
			subtotal += ticketCount * ticket.price; // Calculate subtotal
			totalTickets += ticketCount; // Count total number of tickets
		});

		// Calculate Paystack fee dynamically
		let transactionFee = 0;
		if (subtotal > 0) {
			transactionFee = subtotal * 0.015 + 100; // 1.5% + 100 NGN
			if (transactionFee > 2000) transactionFee = 2000; // Cap fee at 2000 NGN
		}

		return {
			subtotal: subtotal / conversionRate,
			transactionFee: transactionFee / conversionRate,
			total: (subtotal + transactionFee) / conversionRate,
			totalTickets, // Return total ticket count
		};
	};

	const handleContinue = (e) => {
		e.preventDefault();
		if (calculateTotal().totalTickets > 0) {
			setShowSummary(true);
			setShowCheckout(true);
		} else {
			alert("Atleast One Ticket is required");
		}
	};

	const handleCheckoutV2 = async () => {
		setIsLoading(true);
		if (paymentMethod === "card") setShowStripe(true);
		if (paymentMethod === "flutterwave") setShowFlutterwave(true);
		try {
			const data = {
				tickets: Object.entries(ticketCounts).map(
					([ticket_id, quantity]) => ({
						ticket_id: parseInt(ticket_id),
						quantity,
					})
				),
				total_amount: calculateTotal().total,
				attendee_info: {
					full_name: formData.name,
					email: formData.email,
					phone_number: formData.phone,
				},
				event_id: eventId,
				paymentMethod,
				marketingConsent,
				currencyCode: location.currencyCode,
				conversionRate: conversionRate,
			};
			setCheckoutDetails(data);
		} catch (error) {
			console.error(error);
			Swal.fire("Error", error.response?.data?.error || "Error", "error");
		} finally {
			setIsLoading(false);
		}
	};

	const handlePaymentVerification = async (reference) => {
		try {
			const response = await api.post(`/verify/${reference}`, {
				paymentMethod,
			});
			if (response.data.status === "success") {
				Swal.fire(
					"Success",
					"Payment verified successfully",
					"success"
				);
			} else {
				Swal.fire("Error", response.data.message, "error");
			}
		} catch (error) {
			Swal.fire("Error", "Payment verification failed", "error");
		}
	};

	const PaymentOptions = () => (
		<div className="grid gap-4 lg:grid-cols-2">
			<label className="relative p-4 text-black border rounded-lg cursor-pointer hover:bg-gray-500/10">
				<input
					type="radio"
					name="payment"
					value="card"
					checked={paymentMethod === "card"}
					onChange={(e) => setPaymentMethod(e.target.value)}
					className="absolute top-4 right-4"
				/>
				<div className="flex flex-col h-full gap-2">
					<div>
						<img src={stripeLogo} alt="Stripe" />
					</div>
					<span
						className={`font-medium mt-auto ${
							theme === "dark" ? "text-[#fff]" : "text-[#000]"
						} `}
					>
						Pay with Credit Card
					</span>
				</div>
			</label>
			<label className="relative p-4 text-black border rounded-lg cursor-pointer hover:bg-gray-500/10">
				<input
					type="radio"
					name="payment"
					value="flutterwave"
					checked={paymentMethod === "flutterwave"}
					onChange={(e) => setPaymentMethod(e.target.value)}
					className="absolute top-4 right-4"
				/>
				<div className="flex flex-col h-full gap-2">
					<div>
						<img src={flutterwaveLogo} alt="Flutterwave" />
					</div>
					<span
						className={`font-medium mt-auto  ${
							theme === "dark" ? "text-[#fff]" : "text-[#000]"
						} `}
					>
						Pay with Flutterwave
					</span>
				</div>
			</label>
		</div>
	);

	const OrderSummary = () => (
		<>
			<div className="bg-[#000080] h-full text-white rounded-lg p-6">
				<div className="flex flex-col items-end">
					<button
						onClick={onClose}
						className="p-2 bg-white bg-opacity-50 rounded-full"
					>
						<X className="w-6 h-6 font-bold text-white" />
					</button>
				</div>
				<h3 className="text-xl font-normal  lg:pt-[5rem] mb-4">
					Ticket Order Summary
				</h3>
				<div className="space-y-4">
					<div className="flex justify-between">
						<span>Ticket (x{calculateTotal().totalTickets})</span>
						<span>
							{" "}
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: location?.currencyCode || "USD",
							}).format(calculateTotal().subtotal)}
						</span>
					</div>
					<div className="flex justify-between">
						<span>Transaction Fee</span>
						<span>
							{" "}
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: location?.currencyCode || "USD",
							}).format(calculateTotal().transactionFee)}
						</span>
					</div>
					<div className="flex justify-between pt-4 font-normal border-t">
						<span>Total</span>
						<span>
							{" "}
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: location?.currencyCode || "USD",
							}).format(calculateTotal().total)}
						</span>
					</div>
				</div>
			</div>
		</>
	);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black bg-opacity-50 md:p-4">
			<div
				className={` rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto  ${
					theme === "dark" ? "bg-[#121212]" : "bg-[#fff]"
				}  `}
			>
				<div className={`${showFlutter ? "p-1" : "p-6"}`}>
					{showFlutter ? (
						<div className="w-full max-w-[500px] mx-auto">
							<div className="flex px-4 pt-4">
								<button
									onClick={onClose}
									className="p-2 ml-auto bg-black bg-opacity-25 rounded-full"
								>
									<X className="w-6 h-6 font-bold text-white" />
								</button>
							</div>
							<FlutterwaveCheckout
								ticketDetails={checkoutDetails}
								setShowFlutterWave={setShowFlutterwave}
							/>
						</div>
					) : showStripe ? (
						<div className="w-full max-w-[500px] mx-auto">
							<div className="flex px-4 pt-4">
								<button
									onClick={onClose}
									className="p-2 ml-auto bg-black bg-opacity-25 rounded-full"
								>
									<X className="w-6 h-6 font-bold text-white" />
								</button>
							</div>
							<StripeModal ticketDetails={checkoutDetails} />
						</div>
					) : (
						<div className="flex flex-col gap-6 md:flex-row">
							<div className="flex-1">
								{!isConfirmed && (
									<>
										<div className="flex justify-betweenitems-start">
											{showCheckout ? (
												<div className="flex items-center gap-4">
													<button
														onClick={() =>
															setShowCheckout(
																false
															)
														}
														className="p-2 bg-[#000080] bg-opacity-20 rounded-full"
													>
														<ArrowLeft className="w-6 h-6 text-white" />
													</button>
												</div>
											) : (
												<div>
													<h2 className="text-2xl font-bold text-[#040171]">
														{eventTitle}
													</h2>
													<p className="text-gray-600">
														{eventDateTime}
													</p>
												</div>
											)}
										</div>

										<div className="relative flex flex-col items-center justify-center w-full pb-6 mb-6 border-b">
											<h2
												className={`text-2xl font-bold  ${
													theme === "dark"
														? "text-[#fff]"
														: "text-[#040171]"
												} `}
											>
												Checkout
											</h2>
											<p className="text-gray-600">
												Login for Faster Experience
											</p>

											<button
												onClick={onClose}
												className="p-2 bg-black bg-opacity-50 absolute right-[.2rem] rounded-full"
											>
												<X className="w-6 h-6 font-bold text-white" />
											</button>
										</div>

										<div
											className={`${
												theme == "dark"
													? "bg-black"
													: "bg-white"
											} flex flex-row justify-between my-3 items-center p-4 gap-5`}
										>
											{location && (
												<img
													src={location.flag}
													alt="Country Flag"
													className="object-contain w-[2rem] h-[2rem]"
												/>
											)}

											<select
												onChange={handleCountryChange}
												className="bg-transparent border w-full border-[#ccc] px-2"
											>
												{Object.entries(
													getSupportedCurrenciesWithLocationFirst()
												).map(
													([
														code,
														{ name, countryCode },
													]) => (
														<option
															key={code}
															selected={
																location &&
																code ==
																	location.countryCode
															}
															value={code}
														>
															{name} ({code})
														</option>
													)
												)}
												{/* <option value="USD">Other - (Billed in USD)</option> */}
											</select>
										</div>
									</>
								)}
								{!showCheckout ? (
									<>
										{/* Ticket Selection */}
										<div className="mb-8">
											{tickets && tickets.length > 0 ? (
												<>
													<h3 className="mb-4 text-xl font-semibold">
														Select Ticket
													</h3>
													{tickets.map(
														(ticket, index) => (
															<div
																key={index}
																className="p-4 mb-4 text-black bg-white border rounded-lg shadow-sm"
															>
																<div className="flex items-center justify-between">
																	<div>
																		<p className="text-gray-600 textlg md:text-2xl">
																			{
																				ticket.name
																			}
																		</p>
																		<p className="text-base md:text-lg font-bold text-[#040171]">
																			{location &&
																				location.currencyCode}{" "}
																			{(
																				ticket.price /
																				conversionRate
																			).toLocaleString()}
																		</p>
																	</div>
																	<div className="flex items-center gap-4">
																		<button
																			onClick={() =>
																				handleTicketChange(
																					ticket.id,
																					"subtract"
																				)
																			}
																			className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
																		>
																			-
																		</button>
																		<span className="w-8 text-center">
																			{ticketCounts[
																				ticket
																					.id
																			] ||
																				0}
																		</span>
																		<button
																			onClick={() =>
																				handleTicketChange(
																					ticket.id,
																					"add"
																				)
																			}
																			className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#040171] text-white hover:bg-[#040171]"
																		>
																			+
																		</button>
																	</div>
																</div>
															</div>
														)
													)}
												</>
											) : (
												<>
													<h5 className="mb-4 font-semibold text-l">
														No Ticket Found
													</h5>
												</>
											)}
										</div>

										{/* Attendee Information Form */}
										<form onSubmit={handleContinue}>
											<h3 className="mb-4 text-xl font-semibold">
												Attendee Information
											</h3>

											<div className="space-y-4">
												<div>
													<label
														className={`block  ${
															theme === "dark"
																? "text-[#fff]"
																: "text-[#000]"
														}  mb-2 `}
													>
														Full Name
													</label>
													<input
														type="text"
														name="name"
														value={formData.name}
														onChange={
															handleInputChange
														}
														placeholder="Enter Full Name"
														className="w-full p-3 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
														required
													/>
												</div>

												<div>
													<label
														className={`block  ${
															theme === "dark"
																? "text-[#fff]"
																: "text-[#000]"
														}  mb-2 `}
													>
														Email Address
													</label>
													<input
														type="email"
														name="email"
														value={formData.email}
														onChange={
															handleInputChange
														}
														placeholder="Enter Email Address"
														className="w-full p-3 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
														required
													/>
												</div>

												<div>
													<label
														className={`block  ${
															theme === "dark"
																? "text-[#fff]"
																: "text-[#000]"
														}  mb-2 `}
													>
														Phone Number
													</label>
													<input
														type="tel"
														name="phone"
														value={formData.phone}
														onChange={
															handleInputChange
														}
														placeholder="Enter Phone Number"
														className="w-full p-3 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
														required
													/>
												</div>
											</div>

											<button
												type="submit"
												className="w-full py-3 mt-6 font-semibold text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
											>
												Continue
											</button>
										</form>
									</>
								) : isConfirmed ? (
									<div className="w-full p-6 mx-auto space-y-8">
										<div className="flex items-center justify-between pb-6 border-b">
											<div className="flex flex-row items-center gap-3">
												<div className="flex flex-col items-center justify-center w-8 h-8 bg-green-500 rounded-full">
													<Check className="w-5 h-5 font-bold text-white" />
												</div>
												<div className="flex flex-col items-center justify-center">
													<h1
														className={`text-xl ${
															theme == "dark"
																? "text-white"
																: "text-[#040171]"
														}`}
													>
														Thank you for your
														order!
													</h1>
												</div>
											</div>

											<div className="flex flex-wrap-reverse items-end justify-end gap-5">
												<Link
													to={"/dashboard/ticket/all"}
													className="hidden px-5 py-2 text-sm text-white transition-colors bg-orange-500 rounded-full md:flex hover:bg-orange-600"
												>
													Take me to my Tickets
												</Link>
												<button
													onClick={onClose}
													className="p-2 bg-black bg-opacity-50 rounded-full"
												>
													<X className="w-6 h-6 font-bold text-white" />
												</button>
											</div>
										</div>

										<div className="space-y-2">
											<p className="text-xs font-medium text-gray-600">
												YOU ARE GOING TO
											</p>

											<h2
												className={`text-2xl ${
													theme == "dark"
														? "text-white"
														: "text-[#040171]"
												}`}
											>
												{eventDetails.title}
											</h2>
										</div>

										<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
											<div>
												<h3
													className={`${
														theme == "dark"
															? "text-white"
															: "text-[#040171]"
													}`}
												>
													{
														calculateTotal()
															.totalTickets
													}{" "}
													TICKET(S) SENT TO
												</h3>
												<p className="text-gray-500">
													{formData.email}
												</p>
											</div>
											<div>
												<h3
													className={`${
														theme == "dark"
															? "text-white"
															: "text-[#040171]"
													}`}
												>
													DATE
												</h3>
												<p className="text-gray-500">
													{formatDate(
														ticketDetails.days[0]
															?.event_day
													)}
												</p>
											</div>
											<div>
												<h3
													className={`${
														theme == "dark"
															? "text-white"
															: "text-[#040171]"
													}`}
												>
													LOCATION
												</h3>
												<p className="text-gray-500">
													{
														ticketDetails.days[0]
															?.event_address
													}
												</p>
											</div>
										</div>
										<div className="flex flex-wrap-reverse items-end justify-end gap-5 md:hidden">
											<Link
												to={"/dashboard/ticket/all"}
												className="px-5 py-2 text-sm text-white transition-colors bg-orange-500 rounded-full hover:bg-orange-600"
											>
												Take me to my Tickets
											</Link>
										</div>
									</div>
								) : (
									<div className="space-y-6">
										<div className="space-y-4">
											<h3 className="text-xl font-semibold">
												Contact Information
											</h3>

											<div className="space-y-4">
												<div>
													<label
														className={`block  ${
															theme === "dark"
																? "text-[#fff]"
																: "text-[#000]"
														}  mb-2 `}
													>
														Full Name
													</label>
													<input
														type="text"
														name="name"
														disabled={true}
														value={formData.name}
														onChange={
															handleInputChange
														}
														placeholder="Enter Full Name"
														className="w-full p-3 border rounded-lg opacity-50 bg-gray-100/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
														required
													/>
												</div>

												<div>
													<label
														className={`block  ${
															theme === "dark"
																? "text-[#fff]"
																: "text-[#000]"
														}  mb-2 `}
													>
														Email Address
													</label>
													<input
														type="email"
														name="email"
														disabled={true}
														value={formData.email}
														onChange={
															handleInputChange
														}
														placeholder="Enter Email Address"
														className="w-full p-3 border rounded-lg opacity-50 bg-gray-100/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
														required
													/>
												</div>

												<div>
													<label
														className={`block  ${
															theme === "dark"
																? "text-[#fff]"
																: "text-[#000]"
														}  mb-2 `}
													>
														Phone Number
													</label>
													<input
														type="tel"
														name="phone"
														disabled={true}
														value={formData.phone}
														onChange={
															handleInputChange
														}
														placeholder="Enter Phone Number"
														className="w-full p-3 border rounded-lg opacity-50 bg-gray-100/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
														required
													/>
												</div>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="text-xl font-semibold">
												PAYMENT GATEWAYS
											</h3>
											<PaymentOptions />
										</div>

										<div className="space-y-4">
											{/* Marketing consent checkboxes remain the same */}
										</div>

										<p className="text-sm text-gray-400">
											By clicking Checkout, I agree to the{" "}
											<Link
												t={"/terms"}
												className={`underline underline-offset-4 ${
													theme == "dark"
														? "text-blue-50"
														: "text-blue-800"
												}`}
											>
												My TicketSeller Terms of Service
											</Link>
										</p>

										<button
											onClick={handleCheckoutV2}
											disabled={
												isLoading || !paymentMethod
											}
											className="w-full py-3 font-semibold text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600 disabled:bg-gray-300"
										>
											{isLoading
												? "Processing..."
												: "Checkout"}
										</button>
									</div>
								)}
							</div>

							{showSummary && !isConfirmed && (
								<div className="md:w-1/3">
									<OrderSummary />
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TicketModal;
