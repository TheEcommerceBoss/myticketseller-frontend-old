/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
	Home,
	PlusCircle,
	ListChecks,
	Ticket,
	Megaphone,
	Settings,
	HelpCircle,
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
import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";

import Swal from "sweetalert2";
import { categoriesApi, eventsApi } from "../../shared/services/api.ts";

const EditEvent = ({ manage }) => {
	let { id } = useParams();
	const [eventData, setEventData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [fetchingdataloading, setfetchingdataLoading] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const [formData, setFormData] = useState({
		category: "",
		specific_type: true,
		is_public: true,
		event_title: "",
		event_description: "",
		event_image: "",
		event_id: "",
	});

	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	const navigate = useNavigate();
	const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const event = await eventsApi.getEventById(id);
				console.log("Evnet Details:", event);
				if (event) {
					const payload = {
						category: event.category || "",
						specific_type: event.is_listed || true,
						is_public: event.is_public || true,
						event_title: event.title || "",
						event_description: event.description || "",
						event_image: event.image || "",
						event_id: event.id,
					};
					setFormData(payload);
				}
			} catch (error) {
				console.error("Failed to fetch event details:", error);
			}
		};

		// Call the function
		fetchEvents();
	}, [id]); // Add `id` as a dependency

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleTypeChange = (type) => {
		setFormData((prevState) => ({
			...prevState,
			is_public: type,
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		// Special case for category
		if (name === "category") {
			const selectedCategory = categories.find(
				(cat) => cat.id === parseInt(value)
			);
			setFormData((prev) => ({
				...prev,
				category: selectedCategory,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const CreateEventHandler = async () => {
		const {
			id, // use `event_id` if that's what you're storing it as
			category,
			specific_type,
			event_title,
			event_description,
			event_image,
			is_public,
		} = formData;

		if (!event_title || !event_description || !category || !event_image) {
			Swal.fire({
				icon: "error",
				title: "Incomplete Form",
				text: "Please fill in all required fields.",
			});
			return;
		}

		setLoading(true);

		try {
			const myForm = new FormData();
			myForm.append("title", event_title);
			myForm.append("description", event_description);
			myForm.append("is_public", is_public);
			myForm.append("image", event_image);
			myForm.append("category", category.id); // Send just the ID

			let data;

			if (id) {
				// UPDATE flow
				data = await eventsApi.updateEvent(id, myForm); // <- make sure this method exists
			} else {
				// CREATE flow
				data = await eventsApi.createEvent(myForm);
			}

			Swal.fire({
				icon: "success",
				title: id ? "Event Updated" : "Event Created",
				text: id
					? "Your event has been updated successfully."
					: "Your event has been created successfully.",
			});

			navigate(`/dashboard/event/create/${data.id || id}/payments/`);
		} catch (error) {
			if (error.response?.data?.message === "Event already exists") {
				navigate(
					`/dashboard/event/create/${error.response.data.event_id}/payments/`
				);
			}

			Swal.fire({
				icon: "error",
				title: "Error",
				text:
					error.response?.data?.message ||
					"Failed to create/update event.",
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData = await categoriesApi.getCategories();
				setCategories(categoriesData.categories);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		};
		fetchCategories();
	}, []);

	const [step, setStep] = useState(1);
	const [isPublic, setIsPublic] = useState(false);

	const steps = [
		{ number: 1, title: "General Information", active: true },
		{ number: 2, title: "Tickets and Location", active: false },
		{ number: 3, title: "Additional Information", active: false },
	];

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

	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null); // For image preview

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile) {
			setFile(droppedFile);
			convertToBase64(droppedFile);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};
	const handleFileInput = (e) => {
		const selectedFile = e.target.files[0];

		if (selectedFile) {
			// Check if the file size exceeds 5MB (5MB = 5 * 1024 * 1024 bytes)
			if (selectedFile.size > 5 * 1024 * 1024) {
				alert("File size exceeds 5MB. Please select a smaller file.");
				return; // Prevent further processing
			}

			setFile(selectedFile);
			convertToBase64(selectedFile);
		}
	};
	const convertToBase64 = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setFormData((prevState) => ({
				...prevState,
				event_image: reader.result,
			}));
			setPreview(reader.result); // Set preview for mini image display
		};
		reader.onerror = (error) => {
			console.error("Error converting file to Base64:", error);
		};
	};
	return (
		<div
			className={`flex min-h-screen  ${
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
									? "bg-gray-200  hover:bg-gray-100"
									: "bg-[#121212]"
							}`}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>

						<h1 className="hidden text-2xl font-bold lg:flex">
							{manage ? "Edit Event" : "Add New Event"}
						</h1>
					</div>

					<div className="flex items-center space-x-4">
						<div className="relative hidden md:flex">
							<Search className="absolute w-5 h-5 text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
							<input
								type="text"
								placeholder="Search"
								className={`pl-10 pr-4 py-2 rounded-[4rem] border ${
									theme === "dark"
										? "bg-[#222]  border-[#444]"
										: "bg-transparent  border-gray-400"
								} focus:outline-none focus:ring-2 focus:ring-blue-500`}
							/>
						</div>
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
									? "bg-gray-200  hover:bg-gray-100"
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

				<div className="flex flex-col items-center justify-center pt-0 mb-8 md:pt-5 md:flex-row">
					{steps.map((s, index) => (
						<div
							className="flex flex-col items-center justify-center md:flex-row"
							key={index}
						>
							{index !== 0 && (
								<div
									className={`h-[.8rem] md:h-1 w-[.15rem] md:w-[2rem] ${
										step >= s.number
											? "bg-[#040171]"
											: "bg-gray-300"
									}`}
								/>
							)}
							<div
								key={s.number}
								className="flex w-full px-[4rem] md:px-0 items-center"
							>
								<div
									className={`px-4  py-2 w-full rounded-full flex items-center justify-center text-l ${
										step >= s.number
											? "bg-[#040171] text-white"
											: "bg-gray-300 text-gray-600"
									}`}
								>
									{s.number}. {s.title}
								</div>
							</div>
						</div>
					))}
				</div>

				{fetchingdataloading ? (
					<div
						className={`md:col-span-3 p-2 ${
							theme === "light"
								? "bg-white"
								: "bg-[#121212] text-white"
						} shadow-lg rounded-lg`}
					>
						<div style={{ height: "100%", width: "100%" }}>
							<div className="flex items-center justify-center h-96">
								<span>Loading...</span>
							</div>
						</div>
					</div>
				) : (
					<>
						<div
							className={` ${
								theme === "dark"
									? "bg-[#121212]  "
									: " border border-[#040171]"
							} rounded-lg p-6 md:px-[3rem]  my-6 shadow-sm`}
						>
							<div className="flex flex-col items-center justify-center mb-8 text-center">
								<div className="flex items-center mb-[2rem] mt-2">
									<div
										className={`w-5 h-5 rounded-full bg-transparent ${
											theme === "dark"
												? "border-gray-200  "
												: "border-[#040171]"
										} flex items-center justify-center text-l border  mr-2`}
									>
										1
									</div>
									<label
										className={`text-l font-normal  mt-1 ${
											theme === "dark"
												? "text-white"
												: "text-[#000]"
										}`}
									>
										What is the Category of your Event?
									</label>
								</div>
								<select
									name="category"
									value={formData.category?.id || ""}
									onChange={handleChange}
									className={`w-full p-3 border border-gray-300 ${
										theme === "dark"
											? "text-white"
											: "text-[#000]"
									} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
								>
									<option value="" disabled>
										Select Event Category
									</option>
									{categories.map((category, index) => (
										<option key={index} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div
							className={` ${
								theme === "dark"
									? "bg-[#121212]  "
									: " border border-[#040171]"
							} rounded-lg p-6 md:px-[3rem]  my-6 shadow-sm`}
						>
							<div className="flex flex-col items-center justify-center mb-8 text-center">
								<div className="flex items-center mb-[2rem] mt-2">
									<div
										className={`w-5 h-5 rounded-full bg-transparent ${
											theme === "dark"
												? "border-gray-200  "
												: "border-[#040171]"
										} flex items-center justify-center text-l border  mr-2`}
									>
										2
									</div>
									<label
										className={`text-l font-normal  mt-1 ${
											theme === "dark"
												? "text-white"
												: "text-[#000]"
										}`}
									>
										Is this a Private or Public Event?
									</label>
								</div>
								<div
									className={`flex ${
										theme === "dark"
											? "bg-[#222]"
											: "border border-[#040171]"
									} rounded-[5rem] p-1`}
								>
									<button
										onClick={() => handleTypeChange(false)}
										className={`px-[10vw] lg:px-[5vw] py-[.3rem] rounded-l-[5rem] ${
											formData.is_public == false
												? "bg-[#040171] text-white"
												: theme == "dark"
												? "bg-[#222]"
												: ""
										}`}
									>
										Private
									</button>
									<button
										onClick={() => handleTypeChange(true)}
										className={`px-[10vw] lg:px-[5vw] py-[.3rem] rounded-r-[5rem] ${
											formData.is_public == true
												? "bg-[#040171] text-white"
												: theme == "dark"
												? "bg-[#222]"
												: ""
										}`}
									>
										Public
									</button>
								</div>
							</div>
						</div>

						<div
							className={`${
								theme === "dark"
									? "bg-[#121212]"
									: "border border-[#040171]"
							} rounded-lg p-6 my-6 shadow-sm`}
						>
							{/* Event Title */}
							<div className="flex flex-col items-center justify-center mb-8 text-center">
								<div className="flex items-center mb-4">
									<div
										className={`w-5 h-5 rounded-full bg-transparent ${
											theme === "dark"
												? "border-gray-200"
												: "border-[#040171]"
										} flex items-center justify-center text-l border mr-2`}
									>
										3
									</div>
									<label
										className={`text-l font-normal mt-1 ${
											theme === "dark"
												? "text-white"
												: "text-[#000]"
										}`}
									>
										Event Title
									</label>
								</div>
								<input
									type="text"
									name="event_title"
									value={formData.event_title}
									onChange={handleChange}
									className={`w-full p-3 border border-gray-300 ${
										theme === "dark"
											? "text-white"
											: "text-[#000]"
									} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
									placeholder="Enter Event Title"
								/>
							</div>

							<div className="flex flex-col items-center justify-center mb-8 text-center">
								<div className="flex items-center mb-4">
									<div
										className={`w-5 h-5 rounded-full bg-transparent ${
											theme === "dark"
												? "border-gray-200"
												: "border-[#040171]"
										} flex items-center justify-center text-l border mr-2`}
									>
										4
									</div>
									<label
										className={`text-l font-normal mt-1 ${
											theme === "dark"
												? "text-white"
												: "text-[#000]"
										}`}
									>
										What is this Event about?
									</label>
								</div>
								<textarea
									name="event_description"
									value={formData.event_description}
									onChange={handleChange}
									rows="4"
									className={`w-full p-3 border border-gray-300 ${
										theme === "dark"
											? "text-white"
											: "text-[#000]"
									} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
									placeholder="Describe the Event"
								/>
							</div>
						</div>

						<div
							className={`${
								theme === "dark"
									? "bg-[#121212]"
									: "border border-[#040171]"
							}  flex flex-col items-center  rounded-lg p-6 my-6 shadow-sm`}
						>
							<div className="mb-4 text-center">
								<div className="flex items-center mb-4">
									<div
										className={`w-5 h-5  rounded-full bg-transparent ${
											theme === "dark"
												? "border-gray-200"
												: "border-[#040171]"
										} flex items-center justify-center text-l border mr-2`}
									>
										5
									</div>
									<label
										className={`text-l font-normal mt-1 ${
											theme === "dark"
												? "text-white"
												: "text-[#000]"
										}`}
									>
										Event Picture
									</label>
								</div>
								<p
									className={`text-l font-normal  mt-1 ${
										theme === "dark"
											? "text-white"
											: "text-[#000]"
									}`}
								>
									Upload main image
								</p>
							</div>

							<div
								onDrop={handleDrop}
								onDragOver={handleDragOver}
								className={`${
									theme === "dark"
										? "bg-[#222]"
										: "bg-[#04017117]"
								} w-full lg:w-[50%] flex flex-col items-center justify-center border-2 border-dashed border-[#040171] rounded-lg p-6 py-[5rem] mt-3 mb-[2rem] cursor-pointer`}
							>
								<p
									className={`text-l font-normal mt-1 ${
										theme === "dark"
											? "text-white"
											: "text-[#040171]"
									} mb-2`}
								>
									Drag & Drop
								</p>
								<label className="text-white bg-[#040171] px-4 py-2 rounded-md cursor-pointer">
									Select File
									<input
										type="file"
										accept="image/*"
										onChange={handleFileInput}
										className="hidden"
									/>
								</label>
							</div>
							{file ? (
								<div className="my-4 text-center">
									{preview && (
										<img
											src={preview}
											alt="Preview"
											className="mt-2  w-full h-[10rem] object-contain rounded-lg "
										/>
									)}
								</div>
							) : (
								formData && (
									<div className="my-4 text-center">
										{formData.event_image && (
											<img
												src={formData.event_image}
												alt="Preview"
												className="mt-2  w-full h-[10rem] object-contain rounded-lg "
											/>
										)}
									</div>
								)
							)}
						</div>

						<div className="flex flex-col items-end text-center">
							<button
								onClick={() => CreateEventHandler()}
								disabled={loading}
								className={`w-[12rem] bg-[#040171] ${
									theme === "dark"
										? "border-[#DBDAFF20]"
										: "border-[#DBDAFF50]"
								} border-4 text-white py-3 px-4 rounded-full transition duration-200 ${
									loading
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-blue-800"
								}`}
							>
								{loading ? "Loading..." : "Next"}
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default EditEvent;
