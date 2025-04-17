import React, { useState, useEffect } from "react";
import {
	Home,
	PlusCircle,
	ListChecks,
	Ticket,
	Megaphone,
	HelpCircle,
	Settings,
	Menu,
	ChevronLeft,
	ChevronRight,
	Search,
	Moon,
	Sun,
	CalendarCogIcon,
	BellDot,
	Bell,
	X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import user from "../../assets/(user)/user.png";
import eventImage from "../../assets/(landing)/event.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { scanApi } from "../../shared/services/api/scanApi";
const ScannerPage = () => {
	const { userData } = useAuth();
	const [formData, setFormData] = useState({
		email: userData && userData.user.email,
		fullname: userData && userData.user.fullname,
		instagram: "",
		tiktok: "",
		twitter: "",
	});
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

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

	const [result, setResult] = useState("No result");
	const [resultData, setresultData] = useState([]);

	// Handle QR scan result
	const handleScan = async (data) => {
		if (data && data[0]) {
			const scannedValue = data[0].rawValue;
			setResult("verifying...");

			console.log("Scanned result:", scannedValue);

			try {
				setresultData([]);

				const response = await scanApi.scanTicket(scannedValue);
				console.log(response);
				setResult("QR Valid");
				setresultData(response.data);
				console.log(response.data.data);
			} catch (error) {
				console.error("API error:", error);
				console.log(error.response.data.message);
				setResult(error.response.data.message);
			}
		} else {
			console.log("Failed to parse QR code");
		}
	};

	// Handle scan errors
	const handleError = (err) => {
		console.error(err);
		alert("Error: " + err);
	};

	const CenteredHr = ({ text, style = "", type = 1 }) => {
		return (
			<div className={`flex items-center my-6 pb-2 ${style}`}>
				{type == 1 ? (
					<div className="flex-1 border-t border-gray-300"></div>
				) : (
					""
				)}
				{text && (
					<span className="mx-4 text-sm font-bold text-white">
						{text}
					</span>
				)}
				<div className="flex-1 border-t border-gray-300"></div>
			</div>
		);
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
							Scanner
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

				<div
					className={`${
						theme === "dark"
							? "bg-[#121212]"
							: "border border-[#040171]"
					} rounded-lg p-6 my-6 shadow-sm`}
				>
					<h5 className="text-center mt-[1rem] mb-[2rem]">
						Ticket Scanner
					</h5>
					<div className="flex flex-col items-center justify-center ">
						<div className="bg-white shadow-lg rounded-lg w-full lg:w-[40rem] p-6 mb-6">
							<Scanner
								onScan={handleScan}
								onError={handleError}
								allowMultiple={true}
								scanDelay={5000}
							/>
							{resultData && resultData.status ? (
								resultData.status != "success" ? (
									<div className="w-full h-auto p-4 mt-5 text-white bg-red-500 rounded-lg">
										<div className="mb-4">
											<h2 className="mt-2 text-2xl font-bold text-center">
												Invalid Ticket
											</h2>
										</div>
									</div>
								) : (
									<div className="w-full h-auto p-4 mt-5 text-white bg-black rounded-lg">
										{/* Main Event Info */}
										<div className="mb-4">
											<h2 className="mt-2 text-2xl font-bold text-center">
												{resultData.event_title ||
													"Untitled Event"}
											</h2>
										</div>

										<div className="mb-4">
											<CenteredHr text="Scan Info" />
											<p>
												Scan Times:{" "}
												{resultData.scan_times}
											</p>
											<p>
												Last Scanned:{" "}
												{resultData.last_scanned}
											</p>
										</div>

										<div className="mb-4">
											<CenteredHr text="User Info" />
											<p>Name: {resultData.fullname}</p>
											<p>
												Email: {resultData.buyer_email}
											</p>
											<p>
												Phone Number:{" "}
												{resultData.phone_number}
											</p>
										</div>

										<div className="mb-4">
											<CenteredHr text="Ticket Info" />
											<p>
												Ticket Name:{" "}
												{resultData.ticket_name}
											</p>
											<p>
												Ticket Type:{" "}
												{resultData.ticket_type}
											</p>
										</div>

										<div className="mb-4">
											<CenteredHr text="Payment Info" />
											<p>Price: NGN {resultData.price}</p>
											<p>
												Purchase Date:{" "}
												{resultData.purchase_date}
											</p>
											<p>
												Payment Status:{" "}
												{resultData.status}
											</p>
										</div>
									</div>
								)
							) : result ? (
								<div className="w-full h-auto p-4 mt-5 text-white bg-red-800 rounded-lg">
									<div className="mb-4">
										<h2 className="mt-2 font-bold text-center text-l">
											{result}
										</h2>
									</div>
								</div>
							) : (
								""
							)}

							{/* {console.log(result)} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScannerPage;
