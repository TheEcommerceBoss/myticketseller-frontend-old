import {
	Facebook,
	Instagram,
	Menu,
	Moon,
	PlusCircle,
	Sun,
	Twitter,
	X,
	Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useTheme } from "../../context/ThemeContext";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/DashboardSidebar";

// Zod schema for form validation
const formSchema = z.object({
	firstName: z
		.string()
		.min(2, "First name must be at least 2 characters")
		.max(50),
	lastName: z
		.string()
		.min(2, "Last name must be at least 2 characters")
		.max(50),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(5, "Phone number is required"),
	country: z.string().min(2, "Country is required"),
	state: z.string().min(2, "State is required"),
	city: z.string().min(2, "City is required"),
	zipCode: z.string().min(3, "Zip code is required"),
	facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
	instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
	twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
	youtube: z.string().url("Invalid URL").optional().or(z.literal("")),
});

const AffiliatesPage = () => {
	const [loading, setLoading] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			country: "",
			state: "",
			city: "",
			zipCode: "",
			facebook: "",
			instagram: "",
			twitter: "",
			youtube: "",
		},
	});

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
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			// Simulate async action
			await new Promise((resolve) => setTimeout(resolve, 800));
			console.log("Payload:", data);
			Swal.fire({
				icon: "success",
				title: "Success",
				text: "Form submitted successfully!",
			});
			// Reset form
			setValue("firstName", "");
			setValue("lastName", "");
			setValue("email", "");
			setValue("phone", "");
			setValue("country", "");
			setValue("state", "");
			setValue("city", "");
			setValue("zipCode", "");
			setValue("facebook", "");
			setValue("instagram", "");
			setValue("twitter", "");
			setValue("youtube", "");
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Something went wrong!",
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
							className={`rounded-full outline-none p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "hover:bg-[#111] bg-[#121212]"
							}`}
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
					className={`p-6 pt-8 pb-10 mx-auto max-w-7xl rounded-xl lg:pt-14 lg:px-8 lg:pb-20 ${
						theme === "dark" ? "bg-[#121212]" : "bg-white"
					}`}
				>
					<h1 className="mb-10 text-2xl font-bold text-center md:text-3xl">
						Affiliate Registration
					</h1>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 lg:gap-x-10 lg:gap-y-10"
					>
						{/* First Name */}
						<div className="space-y-2">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium md:text-base"
							>
								First Name
							</label>
							<input
								{...register("firstName")}
								className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									theme === "dark"
										? "bg-[#222] text-white border-gray-600"
										: "bg-white text-gray-800 border-gray-300"
								} ${errors.firstName ? "border-red-500" : ""}`}
							/>
							{errors.firstName && (
								<p className="text-sm text-red-500">
									{errors.firstName.message}
								</p>
							)}
						</div>

						{/* Last Name */}
						<div className="space-y-2">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium md:text-base"
							>
								Last Name
							</label>
							<input
								{...register("lastName")}
								className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									theme === "dark"
										? "bg-[#222] text-white border-gray-600"
										: "bg-white text-gray-800 border-gray-300"
								} ${errors.lastName ? "border-red-500" : ""}`}
							/>
							{errors.lastName && (
								<p className="text-sm text-red-500">
									{errors.lastName.message}
								</p>
							)}
						</div>

						{/* Email */}
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium md:text-base"
							>
								Email Address
							</label>
							<input
								{...register("email")}
								type="email"
								className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									theme === "dark"
										? "bg-[#222] text-white border-gray-600"
										: "bg-white text-gray-800 border-gray-300"
								} ${errors.email ? "border-red-500" : ""}`}
							/>
							{errors.email && (
								<p className="text-sm text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Phone */}
						<div className="space-y-2">
							<label
								htmlFor="phone"
								className="block text-sm font-medium md:text-base"
							>
								Phone Number
							</label>
							<PhoneInput
								international
								defaultCountry="NG"
								value={watch("phone")}
								onChange={(value) => setValue("phone", value)}
								placeholder="Enter phone number"
								className={`h-12 [&>.PhoneInputCountry]:px-3 rounded-md [&>input]:bg-transparent [&>input]:h-full [&>input]:px-3 [&>input]:rounded-r-md border [&>input]:border-l ${
									theme === "dark"
										? "bg-[#222] text-white border-gray-600 [&>input]:border-gray-600"
										: "bg-white text-gray-800 border-gray-300"
								} ${
									errors.phone
										? "border-red-500 [&>input]:border-red-500"
										: ""
								}`}
							/>
							{errors.phone && (
								<p className="text-sm text-red-500">
									{errors.phone.message}
								</p>
							)}
						</div>

						{/* Country */}
						<div className="space-y-2">
							<label
								htmlFor="country"
								className="block text-sm font-medium md:text-base"
							>
								Country
							</label>
							<input
								{...register("country")}
								className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									theme === "dark"
										? "bg-[#222] text-white border-gray-600"
										: "bg-white text-gray-800 border-gray-300"
								} ${errors.country ? "border-red-500" : ""}`}
							/>
							{errors.country && (
								<p className="text-sm text-red-500">
									{errors.country.message}
								</p>
							)}
						</div>

						{/* State */}
						<div className="space-y-2">
							<label
								htmlFor="state"
								className="block text-sm font-medium md:text-base"
							>
								State
							</label>
							<input
								{...register("state")}
								className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									theme === "dark"
										? "bg-[#222] text-white border-gray-600"
										: "bg-white text-gray-800 border-gray-300"
								} ${errors.state ? "border-red-500" : ""}`}
							/>
							{errors.state && (
								<p className="text-sm text-red-500">
									{errors.state.message}
								</p>
							)}
						</div>

						{/* City */}
						<div className="space-y-2">
							<label
								htmlFor="city"
								className="block text-sm font-medium md:text-base"
							>
								City
							</label>
							<input
								{...register("city")}
								className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									theme === "dark"
										? "bg-[#222] text-white border-gray-600"
										: "bg-white text-gray-800 border-gray-300"
								} ${errors.city ? "border-red-500" : ""}`}
							/>
							{errors.city && (
								<p className="text-sm text-red-500">
									{errors.city.message}
								</p>
							)}
						</div>

						{/* Zip Code */}
						<div className="space-y-2">
							<label
								htmlFor="zipCode"
								className="block text-sm font-medium md:text-base"
							>
								Zip Code
							</label>
							<input
								{...register("zipCode")}
								className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									theme === "dark"
										? "bg-[#222] text-white border-gray-600"
										: "bg-white text-gray-800 border-gray-300"
								} ${errors.zipCode ? "border-red-500" : ""}`}
							/>
							{errors.zipCode && (
								<p className="text-sm text-red-500">
									{errors.zipCode.message}
								</p>
							)}
						</div>

						{/* Facebook */}
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
									{...register("facebook")}
									className={`w-full h-12 px-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
										theme === "dark"
											? "bg-[#222] text-white border-gray-600"
											: "bg-white text-gray-800 border-gray-300"
									} ${
										errors.facebook ? "border-red-500" : ""
									}`}
									placeholder="facebook.com/"
								/>
							</div>
							{errors.facebook && (
								<p className="text-sm text-red-500">
									{errors.facebook.message}
								</p>
							)}
						</div>

						{/* Instagram */}
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
									{...register("instagram")}
									className={`w-full h-12 px-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
										theme === "dark"
											? "bg-[#222] text-white border-gray-600"
											: "bg-white text-gray-800 border-gray-300"
									} ${
										errors.instagram ? "border-red-500" : ""
									}`}
									placeholder="instagram.com/"
								/>
							</div>
							{errors.instagram && (
								<p className="text-sm text-red-500">
									{errors.instagram.message}
								</p>
							)}
						</div>

						{/* Twitter */}
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
									{...register("twitter")}
									className={`w-full h-12 px-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
										theme === "dark"
											? "bg-[#222] text-white border-gray-600"
											: "bg-white text-gray-800 border-gray-300"
									} ${
										errors.twitter ? "border-red-500" : ""
									}`}
									placeholder="twitter.com/"
								/>
							</div>
							{errors.twitter && (
								<p className="text-sm text-red-500">
									{errors.twitter.message}
								</p>
							)}
						</div>

						{/* YouTube */}
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
									{...register("youtube")}
									className={`w-full h-12 px-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
										theme === "dark"
											? "bg-[#222] text-white border-gray-600"
											: "bg-white text-gray-800 border-gray-300"
									} ${
										errors.youtube ? "border-red-500" : ""
									}`}
									placeholder="youtube.com/"
								/>
							</div>
							{errors.youtube && (
								<p className="text-sm text-red-500">
									{errors.youtube.message}
								</p>
							)}
						</div>

						<div className="flex flex-col items-center mt-10 text-center md:col-span-2 lg:items-end">
							<button
								type="submit"
								disabled={loading}
								className={`w-[12rem] bg-[#040171] ${
									theme === "dark"
										? "border-[#DBDAFF20]"
										: "border-[#DBDAFF50]"
								} ${
									loading ? "bg-opacity-50 cursor-wait" : ""
								} border-4 text-white py-3 px-4 rounded-full transition duration-200 hover:bg-blue-800`}
							>
								{loading ? "Loading..." : "Submit"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AffiliatesPage;
