import { Menu, Moon, Plus, PlusCircle, Sun, Trash2, X } from "lucide-react";

import {
	Box,
	Button,
	Card,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useTheme } from "../../context/ThemeContext";
import { ICreateOrganizerProfile, organizerProfileApi } from "../../shared/services/api";

const AddNewOrganizer = () => {
	const { theme, toggleTheme } = useTheme();
	const [isSidebarOpen, setIsSidebarOpen] = useState(
		window.innerWidth >= 1024
	);

	// Form state
	const [organizerName, setOrganizerName] = useState("");
	const [seoTitle, setSeoTitle] = useState("");
	const [description, setDescription] = useState("");
	const [profileImage, setProfileImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState("");

	// Banner images state
	const [bannerImages, setBannerImages] = useState([
		{ file: null, startDate: "", endDate: "" },
	]);

	// Optional settings state
	const [showWebsite, setShowWebsite] = useState(false);
	const [showEventsHeld, setShowEventsHeld] = useState(false);
	const [eventDisplay, setEventDisplay] = useState("organizers-only");
	const [organizerUrlName, setOrganizerUrlName] = useState("");

	// Promote profile state
	const [selectedButtonSize, setSelectedButtonSize] = useState<
		"large" | "medium" | "small"
	>("large");
	const [promotionCode, setPromotionCode] = useState("");

	// Social networks state (first section)
	const [facebookLink, setFacebookLink] = useState(false);
	const [twitterLink, setTwitterLink] = useState(false);
	const [instagramLink, setInstagramLink] = useState(false);

	// Social networks state (second section)
	const [facebookLink2, setFacebookLink2] = useState(true);
	const [twitterLink2, setTwitterLink2] = useState(false);
	const [instagramLink2, setInstagramLink2] = useState(false);
	const [facebookUsername, setFacebookUsername] = useState("");

	// Submission state
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSidebarOpen(window.innerWidth >= 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Handle banner image operations
	const addBannerImage = () => {
		setBannerImages([
			...bannerImages,
			{ file: null, startDate: "", endDate: "" },
		]);
	};

	const removeBannerImage = (index: number) => {
		setBannerImages(bannerImages.filter((_, i) => i !== index));
	};

	const updateBannerImage = (index: number, field: string, value: any) => {
		const updatedImages = bannerImages.map((img, i) =>
			i === index ? { ...img, [field]: value } : img
		);
		setBannerImages(updatedImages);
	};

	// Submit function
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Package all form values into a payload
		const payload: ICreateOrganizerProfile = {
			banner_url: "",
			button_size: selectedButtonSize,
			description: description,
			name: organizerName,
			short_url: organizerName,
			show_my_profile: eventDisplay === "organizers-only",
			show_number_of_events: showEventsHeld,
			show_my_website: showWebsite,
			seo_title: seoTitle,
		};
		
		
		// Log the packaged payload
		console.log("Form Submission Payload:", payload);

		
		

		try {
			// Simulate API call
			const res = await organizerProfileApi.createOrganizerProfile(payload);
			

			// Here you would typically send the payload to your API
			// const response = await fetch('/api/organizers', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(payload)
			// });

			console.log("Form submitted successfully!");
			console.log(res)

			// Reset form or redirect user
			// resetForm();
		} catch (error) {
			console.error("Form submission error:", error);
		} finally {
			setIsSubmitting(false);
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
							Add New Organizer
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

				<div className="container mx-auto lg:px-0">
					<form onSubmit={handleSubmit}>
						{/* About the organizer */}
						<div>
							<div className="bg-[#040171] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									About the organizer
								</h2>
							</div>

							<div className="p-8 space-y-6 bg-white">
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
									<div>
										<label
											htmlFor="organizerName"
											className="block mb-2 font-medium"
										>
											Organizer Name
										</label>
										<input
											type="text"
											id="organizerName"
											name="organizerName"
											value={organizerName}
											onChange={(e) =>
												setOrganizerName(e.target.value)
											}
											className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
										/>
									</div>
									<div>
										<label
											htmlFor="seoTitle"
											className="block mb-2 font-medium"
										>
											SEO Title
										</label>
										<input
											type="text"
											id="seoTitle"
											name="seoTitle"
											value={seoTitle}
											onChange={(e) =>
												setSeoTitle(e.target.value)
											}
											className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="description"
										className="block mb-2 font-medium"
									>
										Description
									</label>
									<textarea
										id="description"
										name="description"
										rows={4}
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
										className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
									></textarea>
								</div>
								{/* Upload Profile Image */}
								<div>
									<label
										htmlFor="profileImage"
										className="block mb-2 font-medium"
									>
										Upload Profile Image
									</label>
									<div className="relative flex flex-col items-center justify-center w-40 h-40 p-4 overflow-hidden text-center transition-colors border-2 border-gray-300 border-dashed rounded-full hover:bg-black/10">
										{previewUrl ? (
											<img
												src={previewUrl}
												alt="Profile Preview"
												className="object-cover w-full h-full rounded-full"
											/>
										) : (
											<p className="text-[#040171] font-bold text-center">
												ADD A PROFILE IMAGE
											</p>
										)}
										<input
											type="file"
											accept="image/*"
											onChange={(e) => {
												const files = e.target.files;
												const file = files && files[0];
												if (file) {
													setProfileImage(file);
													setPreviewUrl(
														URL.createObjectURL(
															file
														)
													);
												}
											}}
											className="absolute inset-0 opacity-0 cursor-pointer"
										/>
									</div>
									<button
										type="button"
										className="bg-[#040171] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#09096e] transition-colors mt-10"
									>
										Add Gallery Images
									</button>
								</div>
							</div>
						</div>

						{/* Add Banner Images */}
						<div className="mt-6">
							<div className="bg-[#040171] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									Add Banner Images
								</h2>
							</div>
							<div className="p-8 bg-white">
								<p>
									Image size should be 1300x360 and less than
									512 kb.
								</p>

								<Box className="pt-4 space-y-4">
									{bannerImages.map((banner, index) => (
										<div
											key={index}
											className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center"
										>
											<Button
												variant="outlined"
												className="text-gray-500 w-fit"
												component="label"
											>
												Choose File
												<input
													type="file"
													hidden
													accept="image/*"
													onChange={(e) => {
														const file =
															e.target.files?.[0];
														if (file) {
															updateBannerImage(
																index,
																"file",
																file
															);
														}
													}}
												/>
											</Button>
											<input
												type="date"
												placeholder="Start Date"
												value={banner.startDate}
												onChange={(e) =>
													updateBannerImage(
														index,
														"startDate",
														e.target.value
													)
												}
												className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 lg:flex-1"
											/>
											<input
												type="date"
												placeholder="End Date"
												value={banner.endDate}
												onChange={(e) =>
													updateBannerImage(
														index,
														"endDate",
														e.target.value
													)
												}
												className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 lg:flex-1"
											/>
											<div className="flex gap-4">
												<button
													type="button"
													onClick={addBannerImage}
													className="block p-2 text-green-600 bg-green-100 rounded-lg hover:bg-green-200 h-fit"
												>
													<Plus size={16} />
												</button>
												{bannerImages.length > 1 && (
													<button
														type="button"
														onClick={() =>
															removeBannerImage(
																index
															)
														}
														title="Delete"
														className="block p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 h-fit"
													>
														<Trash2 size={16} />
													</button>
												)}
											</div>
										</div>
									))}
								</Box>
							</div>
						</div>

						{/* Optional Settings */}
						<div className="mt-6">
							<div className="bg-[#040171] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									Optional Settings
								</h2>
							</div>
							<div className="p-8 bg-white">
								<div>
									<Box className="space-y-6">
										<Box className="flex flex-wrap gap-6">
											<FormControlLabel
												control={
													<Checkbox
														checked={showWebsite}
														onChange={(e) =>
															setShowWebsite(
																e.target.checked
															)
														}
													/>
												}
												label="Show my website"
											/>
											<FormControlLabel
												control={
													<Checkbox
														checked={showEventsHeld}
														onChange={(e) =>
															setShowEventsHeld(
																e.target.checked
															)
														}
													/>
												}
												label="Show number of events held"
											/>
										</Box>

										<FormControl component="fieldset">
											<FormLabel component="legend">
												Event Information
											</FormLabel>
											<RadioGroup
												value={eventDisplay}
												onChange={(e) =>
													setEventDisplay(
														e.target.value
													)
												}
											>
												<FormControlLabel
													value="organizers-only"
													control={<Radio />}
													label="Display Only Events by Organizers"
												/>
												<FormControlLabel
													value="all-events"
													control={<Radio />}
													label="Display all of my Events"
												/>
											</RadioGroup>
										</FormControl>

										<input
											type="text"
											placeholder="Organizer URL Name"
											value={organizerUrlName}
											onChange={(e) =>
												setOrganizerUrlName(
													e.target.value
												)
											}
											className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 lg:flex-1"
										/>
									</Box>
								</div>
							</div>
						</div>

						{/* Promote Your Profile */}
						<div className="mt-6">
							<div className="bg-[#040171] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									Promote Your Profile
								</h2>
							</div>

							<Card>
								<div className="p-8">
									<Box className="space-y-6">
										<FormControl component="fieldset">
											<FormLabel component="legend">
												Button Size
											</FormLabel>
											<RadioGroup
												value={selectedButtonSize}
												onChange={(e) =>
													setSelectedButtonSize(
														e.target.value as "large" | "medium" | "small"
													)
												}
											>
												<FormControlLabel
													value="large"
													control={<Radio />}
													label="Large (64px)"
												/>
												<FormControlLabel
													value="medium"
													control={<Radio />}
													label="Medium (34px)"
												/>
												<FormControlLabel
													value="small"
													control={<Radio />}
													label="Small (24px)"
												/>
											</RadioGroup>
										</FormControl>

										<Box>
											<Typography
												variant="body2"
												className="mb-2 font-medium"
											>
												Code
											</Typography>
											<TextField
												multiline
												rows={3}
												fullWidth
												variant="outlined"
												value={promotionCode}
												onChange={(e) =>
													setPromotionCode(
														e.target.value
													)
												}
												sx={{
													fontFamily: "monospace",
													fontSize: "0.75rem",
												}}
											/>
											<Typography
												variant="caption"
												className="block mt-1 text-gray-500"
											>
												Copy and paste this code for use
												on your websites code to website
											</Typography>
										</Box>
									</Box>
								</div>
							</Card>
						</div>

						{/* Add Social Networks */}
						<div className="mt-6">
							<div className="bg-[#040171] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									Add Social Networks
								</h2>
							</div>
							<div className="p-6 bg-white">
								<Box className="flex flex-wrap gap-6">
									<FormControlLabel
										control={
											<Checkbox
												checked={facebookLink}
												onChange={(e) =>
													setFacebookLink(
														e.target.checked
													)
												}
											/>
										}
										label="Add my Facebook page link"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={twitterLink}
												onChange={(e) =>
													setTwitterLink(
														e.target.checked
													)
												}
											/>
										}
										label="Add Twitter to my page"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={instagramLink}
												onChange={(e) =>
													setInstagramLink(
														e.target.checked
													)
												}
											/>
										}
										label="Add Instagram to my page"
									/>
								</Box>
							</div>
						</div>

						{/* Add Social Networks (Second Section) */}
						<div className="mt-6">
							<div className="bg-[#040171] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									Add Social Networks
								</h2>
							</div>

							<div className="p-8 bg-white">
								<Box className="space-y-4">
									<Box className="flex flex-wrap gap-6">
										<FormControlLabel
											control={
												<Checkbox
													checked={facebookLink2}
													onChange={(e) =>
														setFacebookLink2(
															e.target.checked
														)
													}
												/>
											}
											label="Add my Facebook page link"
										/>
										<FormControlLabel
											control={
												<Checkbox
													checked={twitterLink2}
													onChange={(e) =>
														setTwitterLink2(
															e.target.checked
														)
													}
												/>
											}
											label="Add Twitter to my page"
										/>
										<FormControlLabel
											control={
												<Checkbox
													checked={instagramLink2}
													onChange={(e) =>
														setInstagramLink2(
															e.target.checked
														)
													}
												/>
											}
											label="Add Instagram to my page"
										/>
									</Box>

									<Box>
										<Typography
											variant="body2"
											className="mb-2"
										>
											https://facebook.com/
										</Typography>
										<TextField
											placeholder="Username"
											variant="outlined"
											fullWidth
											size="small"
											value={facebookUsername}
											onChange={(e) =>
												setFacebookUsername(
													e.target.value
												)
											}
										/>
									</Box>
								</Box>
							</div>
						</div>

						<div className="flex justify-center mt-8">
							<button
								type="submit"
								disabled={isSubmitting}
								className="bg-[#040171] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#09096e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Saving..." : "Save"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddNewOrganizer;
