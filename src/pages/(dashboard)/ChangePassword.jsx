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
import { usersApi } from "../../shared/services/api"; // Adjust path as needed

// Zod schema for form validation
const formSchema = z
	.object({
		oldPassword: z
			.string()
			.min(6, "Old password must be at least 6 characters"),
		newPassword: z
			.string()
			.min(6, "New password must be at least 6 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number"
			),
		confirmPassword: z.string().min(6, "Please confirm your new password"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const ChangePassword = () => {
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
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
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
		try {
			// Assuming usersApi.updatePassword accepts oldPassword and newPassword
			await usersApi.updatePassword({
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
			});
			Swal.fire({
				icon: "success",
				title: "Password Updated",
				text: "Your password has been updated successfully.",
			});
			reset();
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text:
					error?.response?.data?.message ||
					"Failed to update password.",
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
						<h1 className="hidden text-2xl font-bold lg:flex">
							Change Password
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

				<div className="mt-8 overflow-hidden rounded-lg">
					<div className="bg-[#0a0a80] text-white p-4">
						<h2 className="text-xl font-medium">Change Password</h2>
					</div>
					<div className="">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid grid-cols-1 gap-6 p-4 bg-white md:p-8">
								<div>
									<label
										htmlFor="oldPassword"
										className="block mb-2 font-medium"
									>
										Old Password
									</label>
									<input
										id="oldPassword"
										type="password"
										{...register("oldPassword")}
										className={`w-full max-w-lg p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a80] ${
											theme === "dark"
												? "bg-[#333] text-white border-gray-600"
												: "bg-white border-gray-300"
										} ${
											errors.oldPassword
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.oldPassword && (
										<p className="mt-1 text-red-500">
											{errors.oldPassword.message}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="newPassword"
										className="block mb-2 font-medium"
									>
										New Password
									</label>
									<input
										id="newPassword"
										type="password"
										{...register("newPassword")}
										className={`w-full max-w-lg p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a80] ${
											theme === "dark"
												? "bg-[#333] text-white border-gray-600"
												: "bg-white border-gray-300"
										} ${
											errors.newPassword
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.newPassword && (
										<p className="mt-1 text-red-500">
											{errors.newPassword.message}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="confirmPassword"
										className="block mb-2 font-medium"
									>
										Confirm Password
									</label>
									<input
										id="confirmPassword"
										type="password"
										{...register("confirmPassword")}
										className={`w-full max-w-lg p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a80] ${
											theme === "dark"
												? "bg-[#333] text-white border-gray-600"
												: "bg-white border-gray-300"
										} ${
											errors.confirmPassword
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.confirmPassword && (
										<p className="mt-1 text-red-500">
											{errors.confirmPassword.message}
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

export default ChangePassword;
