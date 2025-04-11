import Cookies from "js-cookie";
import {
	Menu,
	Moon,
	PlusCircle,
	Sun,
	X,
	Facebook,
	Twitter,
	Instagram,
	Youtube,
	ChevronsUpDown,
	Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

// Country data with flags, codes and dial codes
const countries = [
	{ code: "NG", flag: "🇳🇬", name: "Nigeria", dialCode: "+234" },
	{ code: "US", flag: "🇺🇸", name: "United States", dialCode: "+1" },
	{ code: "GB", flag: "🇬🇧", name: "United Kingdom", dialCode: "+44" },
	{ code: "CA", flag: "🇨🇦", name: "Canada", dialCode: "+1" },
	{ code: "AU", flag: "🇦🇺", name: "Australia", dialCode: "+61" },
	{ code: "DE", flag: "🇩🇪", name: "Germany", dialCode: "+49" },
	{ code: "FR", flag: "🇫🇷", name: "France", dialCode: "+33" },
	{ code: "IN", flag: "🇮🇳", name: "India", dialCode: "+91" },
	{ code: "JP", flag: "🇯🇵", name: "Japan", dialCode: "+81" },
	{ code: "BR", flag: "🇧🇷", name: "Brazil", dialCode: "+55" },
	{ code: "ZA", flag: "🇿🇦", name: "South Africa", dialCode: "+27" },
	{ code: "CN", flag: "🇨🇳", name: "China", dialCode: "+86" },
	{ code: "MX", flag: "🇲🇽", name: "Mexico", dialCode: "+52" },
	{ code: "IT", flag: "🇮🇹", name: "Italy", dialCode: "+39" },
	{ code: "ES", flag: "🇪🇸", name: "Spain", dialCode: "+34" },
];

const AffiliatesPage = () => {
	const { userData } = useAuth();
	const [loading, setLoading] = useState(false); // Track loading state
	const [selectedCountry, setSelectedCountry] = useState(countries[0]);
	const [phoneNumber, setPhoneNumber] = useState("912-413-6316");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleCountryChange = (country) => {
		setSelectedCountry(country);
		setIsDropdownOpen(false);
	};

	const handlePhoneChange = (e) => {
		setPhoneNumber(
			e.target.value.replace(selectedCountry.dialCode, "").trim()
		);
	};

	const [formData, setFormData] = useState({
		email: "",
		fullname: "",
		instagram: "",
		tiktok: "",
		twitter: "",
	});

	// Load user data into formData on component mount or when userData updates
	useEffect(() => {
		if (userData) {
			setFormData({
				email: userData.user.email || "",
				fullname: userData.user.fullname || "",
				instagram: userData.user.instagram || "",
				tiktok: userData.user.tiktok || "",
				twitter: userData.user.twitter || "",
			});
			setLoading(false);
		}
	}, [userData]);

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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleUpdateProfile = async () => {
		try {
			setLoading(true);
			const token = Cookies.get("auth_token");
			await api.post("/update_details", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			Swal.fire({
				icon: "success",
				title: "Profile Updated",
				text: "Your profile has been updated successfully.",
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Failed to update profile.",
			});
		} finally {
			setLoading(false);
		}
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
							Affiliates
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

				<div className="p-6 pt-8 pb-10 mx-auto bg-white max-w-7xl rounded-xl lg:pt-14 lg:px-8 lg:pb-20">
					<h1 className="mb-10 text-2xl font-bold text-center md:text-3xl">
						Affiliate Registration
					</h1>

					<form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 lg:gap-x-10 lg:gap-y-10">
						{/* First Name and Last Name */}
						<div className="space-y-2">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium md:text-base"
							>
								First Name
							</label>
							<input
								id="firstName"
								className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium md:text-base"
							>
								Last Name
							</label>
							<input
								id="lastName"
								className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Email and Phone */}
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium md:text-base"
							>
								Email Address
							</label>
							<input
								id="email"
								type="email"
								className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="phone"
								className="block text-sm font-medium md:text-base"
							>
								Phone Number
							</label>
							<div className="flex">
								<div className="relative">
									<button
										type="button"
										onClick={() =>
											setIsDropdownOpen(!isDropdownOpen)
										}
										className="flex items-center h-12 gap-1 px-3 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<span className="text-2xl">
											{selectedCountry.flag}
										</span>
										<ChevronsUpDown className="w-4 h-4 text-gray-500" />
									</button>

									{isDropdownOpen && (
										<div className="absolute z-10 mt-1 w-[220px] bg-white border border-gray-300 rounded-md shadow-lg">
											<div className="max-h-[300px] overflow-y-auto">
												{countries.map((country) => (
													<div
														key={country.code}
														onClick={() =>
															handleCountryChange(
																country
															)
														}
														className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
													>
														<span className="text-xl">
															{country.flag}
														</span>
														<span>
															{country.name}
														</span>
														<span className="ml-auto text-gray-500">
															{country.dialCode}
														</span>
														{selectedCountry.code ===
															country.code && (
															<Check className="w-4 h-4 ml-2" />
														)}
													</div>
												))}
											</div>
										</div>
									)}
								</div>
								<input
									id="phone"
									type="tel"
									value={`${selectedCountry.dialCode} ${phoneNumber}`}
									onChange={handlePhoneChange}
									className="w-full h-12 px-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>

						{/* Country and State */}
						<div className="space-y-2">
							<label
								htmlFor="country"
								className="block text-sm font-medium md:text-base"
							>
								Country
							</label>
							<input
								id="country"
								className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="state"
								className="block text-sm font-medium md:text-base"
							>
								State
							</label>
							<input
								id="state"
								className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* City and Zip */}
						<div className="space-y-2">
							<label
								htmlFor="city"
								className="block text-sm font-medium md:text-base"
							>
								City
							</label>
							<input
								id="city"
								className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="zipCode"
								className="block text-sm font-medium md:text-base"
							>
								Zip Code
							</label>
							<input
								id="zipCode"
								className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Social Media */}
						<div className="space-y-2">
							<label
								htmlFor="facebook"
								className="block text-sm font-medium md:text-base"
							>
								Facebook
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Facebook className="w-5 h-5" />
								</div>
								<input
									id="facebook"
									className="w-full h-12 px-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Facebook.com/"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="instagram"
								className="block text-sm font-medium md:text-base"
							>
								Instagram
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Instagram className="w-5 h-5" />
								</div>
								<input
									id="instagram"
									className="w-full h-12 px-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Instagram.com/"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="twitter"
								className="block text-sm font-medium md:text-base"
							>
								Twitter
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Twitter className="w-5 h-5" />
								</div>
								<input
									id="twitter"
									className="w-full h-12 px-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Twitter.com/"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="youtube"
								className="block text-sm font-medium md:text-base"
							>
								YouTube
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Youtube className="w-6 h-6" />
								</div>
								<input
									id="youtube"
									className="w-full h-12 px-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Youtube.com/"
								/>
							</div>
						</div>
					</form>
				</div>
				<div className="flex flex-col items-center mt-10 text-center lg:items-end">
					<button
						onClick={() => handleUpdateProfile()}
						disabled={loading}
						className={`w-[12rem] bg-[#040171] ${
							theme === "dark"
								? "border-[#DBDAFF20]"
								: "border-[#DBDAFF50]"
						} ${
							loading ? "bg-opacity-50 cursor-wait " : ""
						} border-4 text-white py-3 px-4 rounded-full transition duration-200 hover:bg-blue-800`}
					>
						{!loading ? "Submit" : "loading..."}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AffiliatesPage;
