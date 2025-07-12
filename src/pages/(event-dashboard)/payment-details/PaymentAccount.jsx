import { DataGrid } from "@mui/x-data-grid";
import { Menu, Moon, PlusCircle, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
	Box,
	Button,
	CircularProgress,
	InputAdornment,
	TextField,
} from "@mui/material";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import { useTheme } from "../../../context/ThemeContext";

export default function PaymentAccount() {
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
					<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
						<h2 className="text-xl font-medium">
							Payment Processing
						</h2>
					</div>
					<div className="p-4 space-y-6 bg-white md:p-8">
						<div className="w-full space-y-2 text-center">
							<h2 className="text-xl lg:text-2xl">
								&quot;Welcome to the world of No Charge Back
								Terms and conditions applied.&quot;
							</h2>
						</div>
						<div className="grid grid-cols-1 gap-6 max-w-[765px]">
							<p className="mb-4">
								Complete the following form to let us know how
								you would like to receive funds from your ticket
								sales.
							</p>
							<div className="">
								<label
									htmlFor="verificationCode"
									className="block mb-2 font-medium"
								>
									Verification with Duo or Google
									Authenticator
								</label>
								<input
									type="text"
									id="verificationCode"
									name="verificationCode"
									placeholder="Enter code"
									className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 max-w-[450px]"
								/>
							</div>
						</div>

						<div className="space-y-2 text-sm md:text-base">
							<div>First time Authentication Steps:</div>
							<ol>
								<li>
									1. Download Google authenticator or Duo on
									your smartphone.
								</li>
								<li>
									2. Scan the barcode from Google
									authenticator.
								</li>
								<li>3. Enter the code.</li>
								<li>4. Click to verify.</li>
								<li>
									5. If you have not received email{" "}
									<span className="underline">
										Click Here
									</span>{" "}
									 to resend email.
								</li>
							</ol>
						</div>

						<div className="flex mt-10">
							<button
								type="submit"
								// disabled={isSubmitting}
								className="bg-[#0a0a80] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#09096e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{/* {isSubmitting ? "Verifying..." : "Verify"} */}
								Verify
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
