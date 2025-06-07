/* eslint-disable react/prop-types */
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import { z } from "zod";
import { usersApi } from "../../shared/services/api";

// Define Zod schema
const schema = z.object({
	email: z.string().email(),
	prefix: z.enum(["----", "Mr.", "Mrs.", "Ms.", "Dr."]),
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	phone_number: z.string().min(1, "Mobile number is required"),
	dob: z.string().min(1, "Date of birth is required"),
	avatar_url: z.string().optional(),
});

const EditProfile = ({ setEditProfile }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			prefix: "----",
			first_name: "",
			last_name: "",
			phone_number: "",
			dob: "",
		},
	});

	const [profileImage, setProfileImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [userDetails, setUserDetails] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userDetailsResponse = await usersApi.getMe();

				const user = userDetailsResponse;

				// Use reset to populate the form
				const formatUserData = (user) => ({
					email: user?.email ?? "",
					prefix: user?.prefix ?? "----",
					first_name: user?.first_name ?? "",
					last_name: user?.last_name ?? "",
					phone_number: user?.phone_number ?? "",
					dob: user?.dob ?? "",
					avatar_url: user?.avatar_url ?? "",
				});
				reset(formatUserData(user));
				setUserDetails(userDetailsResponse);
				// Set previewUrl to avatar_url if it exists
				if (user.avatar_url) {
					setPreviewUrl(user.avatar_url);
				}
			} catch (error) {
				console.error(
					"Fetch error:",
					error?.response?.data || error.message
				);
			}
		};

		fetchData();
	}, [reset]);

	const calculateProfileCompletion = () => {
		if (!userDetails) return 0;

		const fields = [
			userDetails.avatar_url,
			userDetails.email,
			userDetails.prefix,
			userDetails.first_name,
			userDetails.last_name,
			userDetails.phone_number,
			userDetails.dob,
		];

		const filledFields = fields.filter(
			(field) => field !== null && field !== ""
		).length;
		const totalFields = fields.length;
		return Math.round((filledFields / totalFields) * 100);
	};

	const profileCompletionPercentage = calculateProfileCompletion();

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append("email", data.email);
			formData.append("prefix", data.prefix);
			formData.append("first_name", data.first_name);
			formData.append("last_name", data.last_name);
			formData.append("phone_number", data.phone_number);
			formData.append("dob", data.dob);
			if (profileImage) {
				formData.append("avatar", profileImage); // Add the file
			}
			// eslint-disable-next-line no-unused-vars
			const response = await usersApi.updateUser(formData);
			Swal.fire({
				icon: "success",
				title: "Profile Updated",
				text: "Your profile has been updated successfully.",
			});

			setEditProfile(false);
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Failed to update profile.",
			});
		}
		console.log("Validated Form Data:", data);
	};

	return (
		<div className="mx-auto max-w-7xl">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="overflow-hidden border border-b-0 border-gray-200 rounded-lg shadow-sm"
			>
				{/* Profile Header */}
				<div className="bg-[#0a0a80] text-white p-4">
					<h2 className="text-xl font-medium">Profile Photo</h2>
				</div>

				{/* Profile Section */}
				<div className="p-8 bg-white">
					<div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
						<div className="relative flex flex-col items-center justify-center w-40 h-40 p-4 overflow-hidden text-center transition-colors border-2 border-gray-300 border-dashed rounded-full hover:bg-black/10">
							{previewUrl ? (
								<img
									src={previewUrl}
									alt="Profile Preview"
									className="object-cover w-full h-full rounded-full"
								/>
							) : (
								<p className="text-[#0a0a80] font-bold text-center">
									ADD A PROFILE IMAGE
								</p>
							)}
							<input
								type="file"
								accept="image/*"
								onChange={(e) => {
									const file = e.target.files[0];
									if (file) {
										setProfileImage(file);
										setPreviewUrl(
											URL.createObjectURL(file)
										);
									}
								}}
								className="absolute inset-0 opacity-0 cursor-pointer"
							/>
						</div>

						<div className="flex-1">
							<h1 className="text-2xl font-bold text-[#0a0a80] mb-4 text-center md:text-left uppercase">
								{userDetails?.full_name}
							</h1>

							<div className="mb-6">
								<div className="flex justify-between mb-1">
									<p className="font-medium">
										Profile Status
									</p>
								</div>
								<div className="relative w-full h-2 bg-gray-200 rounded-full">
									<div
										className="h-full bg-[#040171] rounded-full"
										style={{
											width: `${profileCompletionPercentage}%`,
										}}
									></div>
									<div
										className="bg-[#040171] text-white px-2 py-0.5 rounded text-sm absolute -top-9"
										style={{
											left: `${profileCompletionPercentage}%`,
											transform: "translateX(-50%)",
										}}
									>
										{profileCompletionPercentage}%
										<div className="absolute w-3 h-3 bg-[#040171] rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
									</div>
								</div>
							</div>

							<div className="flex justify-center md:justify-start">
								<button
									type="button"
									onClick={() => setEditProfile(false)}
									className="bg-[#0a0a80] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#09096e] transition-colors"
								>
									View Profile
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Info */}
				<div className="mt-8">
					<div className="bg-[#0a0a80] text-white p-4">
						<h2 className="text-xl font-medium">
							Contact Information
						</h2>
					</div>

					<div className="grid grid-cols-1 gap-6 p-8 bg-white md:grid-cols-2">
						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block mb-2 font-medium"
							>
								Email Address
							</label>
							<input
								type="email"
								{...register("email")}
								className="w-full p-3 border border-gray-300 rounded-md"
							/>
							{errors.email && (
								<p className="mt-1 text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Prefix */}
						<div>
							<label
								htmlFor="prefix"
								className="block mb-2 font-medium"
							>
								Prefix
							</label>
							<div className="relative">
								<select
									{...register("prefix")}
									className="w-full p-3 border border-gray-300 rounded-md appearance-none"
								>
									<option value="----">----</option>
									<option value="Mr.">Mr.</option>
									<option value="Mrs.">Mrs.</option>
									<option value="Ms.">Ms.</option>
									<option value="Dr.">Dr.</option>
								</select>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ChevronDown className="w-5 h-5 text-gray-400" />
								</div>
							</div>
							{errors.prefix && (
								<p className="mt-1 text-red-500">
									{errors.prefix.message}
								</p>
							)}
						</div>

						{/* First Name */}
						<div>
							<label
								htmlFor="first_name"
								className="block mb-2 font-medium"
							>
								First Name
							</label>
							<input
								type="text"
								{...register("first_name")}
								className="w-full p-3 border border-gray-300 rounded-md"
							/>
							{errors.first_name && (
								<p className="mt-1 text-red-500">
									{errors.first_name.message}
								</p>
							)}
						</div>

						{/* Last Name */}
						<div>
							<label
								htmlFor="last_name"
								className="block mb-2 font-medium"
							>
								Last Name
							</label>
							<input
								type="text"
								{...register("last_name")}
								className="w-full p-3 border border-gray-300 rounded-md"
							/>
							{errors.last_name && (
								<p className="mt-1 text-red-500">
									{errors.last_name.message}
								</p>
							)}
						</div>

						{/* Mobile Number */}
						<div>
							<label
								htmlFor="phone_number"
								className="block mb-2 font-medium"
							>
								Mobile Number
							</label>
							<Controller
								control={control}
								name="phone_number"
								render={({ field }) => (
									<PhoneInput
										{...field}
										international
										defaultCountry="NG"
										placeholder="Enter phone number"
										className={`px-4 py-3 rounded-md border border-gray-300 focus:border-primary-500 focus:ring-2 focus:outline-none transition-all ${
											errors.phone_number
												? "border-red-500 ring-red-300"
												: ""
										}`}
									/>
								)}
							/>
							{errors.phone_number && (
								<p className="mt-1 text-red-500">
									{errors.phone_number.message}
								</p>
							)}
						</div>

						{/* DOB */}
						<div>
							<label
								htmlFor="dob"
								className="block mb-2 font-medium"
							>
								DOB
							</label>
							<div className="relative">
								<input
									type="date"
									placeholder="dd/mm/yyyy"
									{...register("dob")}
									className="w-full p-3 border border-gray-300 rounded-md"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<Calendar className="w-5 h-5 text-gray-400" />
								</div>
							</div>
							{errors.dob && (
								<p className="mt-1 text-red-500">
									{errors.dob.message}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Save Button */}
				<div className="flex justify-end mt-8">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-[#0a0a80] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#09096e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProfile;
