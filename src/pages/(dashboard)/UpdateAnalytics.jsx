import { zodResolver } from "@hookform/resolvers/zod";
import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import * as z from "zod";
import Swal from "sweetalert2";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useTheme } from "../../context/ThemeContext";

// Zod schema for form validation
const formSchema = z.object({
	googleAnalytics: z.string().min(1, "Google Analytics ID is required"),
	facebookPixel: z.string().min(1, "Facebook Pixel ID is required"),
});
const UpdateAnalytics = () => {
	const [loading, setLoading] = useState(true);
	const { theme, toggleTheme } = useTheme();
	const [isSidebarOpen, setIsSidebarOpen] = useState(
		window.innerWidth >= 1024
	);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			googleAnalytics: "",
			facebookPixel: "",
		},
	});

	useEffect(() => {
		const handleResize = () => {
			setIsSidebarOpen(window.innerWidth >= 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const onSubmit = async (data) => {
		console.log(data);
		// setLoading(true);
		// try {
		// 	// Assuming analyticsApi.updateAnalytics accepts googleAnalytics and facebookPixel
		// 	await analyticsApi.updateAnalytics({
		// 		googleAnalytics: data.googleAnalytics,
		// 		facebookPixel: data.facebookPixel,
		// 	});
		// 	Swal.fire({
		// 		icon: "success",
		// 		title: "Analytics Updated",
		// 		text: "Your analytics details have been updated successfully.",
		// 	});
		// 	reset();
		// } catch (error) {
		// 	Swal.fire({
		// 		icon: "error",
		// 		title: "Error",
		// 		text:
		// 			error?.response?.data?.message ||
		// 			"Failed to update analytics.",
		// 	});
		// } finally {
		// 	setLoading(false);
		// }
	};

	return (
		<div
			className={`flex min-h-screen ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			}`}
		>
			<SideBar
				isOpen={isSidebarOpen}
				toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<div className="flex-1 px-5 py-8 mx-auto lg:px-8 max-w-7xl">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							aria-label={
								isSidebarOpen ? "Close sidebar" : "Open sidebar"
							}
							className={`rounded-lg p-3 ${
								theme === "dark"
									? "bg-[#121212] hover:bg-[#111]"
									: "bg-gray-200 hover:bg-gray-100"
							}`}
						>
							{isSidebarOpen ? (
								<X size={24} />
							) : (
								<Menu size={24} />
							)}
						</button>
						<h1 className="hidden text-2xl font-bold text-[#0a0a80] lg:flex">
							Facebook / Google Analytics Details
						</h1>
					</div>
					<div className="flex items-center space-x-4">
						<Link
							to="/dashboard/event/create"
							aria-label="Create new event"
							className={`rounded-full p-3 ${
								theme === "dark"
									? "bg-[#121212] hover:bg-[#111]"
									: "bg-gray-200 hover:bg-gray-100"
							}`}
						>
							<PlusCircle
								color={theme === "dark" ? "white" : "#040171"}
								size={20}
							/>
						</Link>
						<button
							onClick={toggleTheme}
							aria-label={
								theme === "dark"
									? "Switch to light theme"
									: "Switch to dark theme"
							}
							className={`rounded-full p-3 ${
								theme === "dark"
									? "bg-[#121212] hover:bg-[#111]"
									: "bg-gray-200 hover:bg-gray-100"
							}`}
						>
							{theme === "dark" ? (
								<Sun size={20} />
							) : (
								<Moon size={20} />
							)}
						</button>
						<DashboardHeader />
					</div>
				</div>

				<div className="mt-8 overflow-hidden rounded-lg ">
					<div className="bg-[#0a0a80] text-white p-4">
						<h2 className="text-xl font-medium">Change Password</h2>
					</div>
					<div className="">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid grid-cols-1 gap-6 p-4 bg-white md:p-8">
								<div>
									<label
										htmlFor="google"
										className="block mb-2 font-medium"
									>
										Google Analytics
									</label>
									<input
										id="google"
										type="text"
										{...register("googleAnalytics")}
										className={`w-full max-w-lg p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a80] ${
											theme === "dark"
												? "bg-[#333] text-white border-gray-600"
												: "bg-white border-gray-300"
										} ${
											errors.googleAnalytics
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.googleAnalytics && (
										<p className="mt-1 text-red-500">
											{errors.googleAnalytics.message}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="facebook"
										className="block mb-2 font-medium"
									>
										Facebook Pixel
									</label>
									<input
										id="facebook"
										type="password"
										{...register("facebookPixel")}
										className={`w-full max-w-lg p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a80] ${
											theme === "dark"
												? "bg-[#333] text-white border-gray-600"
												: "bg-white border-gray-300"
										} ${
											errors.facebookPixel
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.facebookPixel && (
										<p className="mt-1 text-red-500">
											{errors.facebookPixel.message}
										</p>
									)}
								</div>
							</div>
							<div className="flex justify-end mt-8">
								<button
									type="submit"
									disabled={isSubmitting}
									aria-label="Save new password"
									className={`px-8 py-3 rounded-full shadow-lg transition-colors ${
										theme === "dark"
											? "bg-[#0a0a80] text-white hover:bg-[#09096e] disabled:bg-[#0a0a80]/50"
											: "bg-[#0a0a80] text-white hover:bg-[#09096e] disabled:bg-[#0a0a80]/50"
									} disabled:opacity-50 disabled:cursor-not-allowed`}
								>
									{isSubmitting ? "Saving..." : "Save"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateAnalytics;
