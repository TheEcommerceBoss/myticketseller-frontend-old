import React, { useState, useEffect } from "react";

import { PlusCircle, Menu, Search, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import Confetti from "react-confetti";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import Swal from "sweetalert2";
import { eventsApi } from "../../shared/services/api/eventsApi";

const EventsInfo = () => {
	let { id } = useParams();

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				// const token = Cookies.get("auth_token");
				const eventData = await eventsApi.getEventById(id);

				eventData.authorities_to_notify && setNotifyAuthorities(true);
				eventData.authorities_to_notify &&
					setSelectedAuthority(eventData.authorities_to_notify[0]);

				eventData.is_password_protected &&
					setIsPasswordProtected(eventData.is_password_protected);
				eventData.event_password &&
					setEventPassword(eventData.event_password);

				eventData.restrictions &&
					setSelectedAudience(eventData.restrictions);

				eventData.number_of_expected_users &&
					setusersCount(eventData.number_of_expected_users);
				eventData.is_listed && setIsEventListed(eventData.is_listed);
				const specialGuests = eventData.special_guests || [];

				// Split the comma-separated string into an array and update the state
				const authoritiesArray = specialGuests.map((item) =>
					item.trim()
				);

				// Update the selected authorities state
				setGuestCount(authoritiesArray.length);
				setGuestNames(authoritiesArray);

				// console.log(authoritiesArray); // To confirm the updated array
			} catch (error) {
				console.error("Failed to fetch event details:", error);
			}
		};

		// Call the function
		fetchEvents();
	}, [id]); // Add `id` as a dependency

	const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [showConfetti, setShowConfetti] = useState(false);

	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

	const [guestCount, setGuestCount] = useState(2);
	const [guestNames, setGuestNames] = useState(Array(guestCount).fill(""));

	const handleGuestNameChange = (index, name) => {
		const updatedGuestNames = [...guestNames];
		updatedGuestNames[index] = name;
		setGuestNames(updatedGuestNames);
	};

	const guestNamesString = guestNames.filter((name) => name).join(", ");

	const [step, setStep] = useState(3);
	const [isPublic, setIsPublic] = useState(false);

	const steps = [
		{ number: 1, title: "General Information", active: false },
		{ number: 2, title: "Tickets and Location", active: false },
		{ number: 3, title: "Additional Information", active: true },
	];
	const navigate = useNavigate();

	const [expectedAttendees, setExpectedAttendees] = useState(100);
	const [specialGuests, setSpecialGuests] = useState(3);
	const [selectedAudience, setSelectedAudience] = useState(["None"]);
	const [notifyAuthorities, setNotifyAuthorities] = useState(false);
	const [selectedAuthorities, setSelectedAuthorities] = useState([]);

	const [selectedAuthority, setSelectedAuthority] = useState("");
	const [isPasswordProtected, setIsPasswordProtected] = useState(false);
	const [eventPassword, setEventPassword] = useState("");
	const [isEventListed, setIsEventListed] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleAudienceSelection = (value) => {
		setSelectedAudience([value]);
	};

	const handleAuthoritySelection = (value) => {
		if (selectedAuthorities.includes(value)) {
			setSelectedAuthorities(
				selectedAuthorities.filter((item) => item !== value)
			);
		} else {
			setSelectedAuthorities([...selectedAuthorities, value]);
		}
	};

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

	const completeTicket = async () => {
		console.log(eventPassword, !!eventPassword);
		const jsonBody = {
			event_id: id,
			restrictions: selectedAudience, // e.g., "18+"
			number_of_expected_users: usersCount, // From your state tracking user count
			special_guests: guestNamesString.split(","), // Comma-separated guest names
			authorities_to_notify: [selectedAuthority], // Selected authority (e.g., "Police")
			event_password: eventPassword, // Password for event protection
			is_password_protected: !!eventPassword ? true : false,
			is_listed: isEventListed, // Choice based on event listing status
			is_public: isEventListed,
		};

		setLoading(true);
		console.log(jsonBody);
		try {
			// console.log(response.data);
			await eventsApi.updateEventDetails(id, jsonBody);
			Swal.fire("Success", "Event Completed successfully!", "success");
			navigate("/dashboard/event/create/" + id + "/completed");
		} catch (error) {
			console.error("Failed to submit details:", error);
			Swal.fire(
				"Error",
				"Failed to submit details. Please try again later.",
				"error"
			);
		} finally {
			setLoading(false); // Set loading to false once request is completed
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile) setFile(droppedFile);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleFileInput = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) setFile(selectedFile);
	};

	const [isPaid, setIsPaid] = useState(false);
	const [usersCount, setusersCount] = useState(1000);

	const handleusersCountChange = (increment) => {
		const newCount = usersCount + increment;
		if (newCount >= 1 && newCount <= 100000) {
			setusersCount(newCount);
		}
	};

	return (
		<div
			className={`flex min-h-screen  ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			}`}
		>
			<SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
			{showConfetti && <Confetti />}

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
							Add New Event
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

				{/* Progress Steps */}
				<div className="flex flex-col items-center justify-center pt-0 mb-8 md:pt-5 md:flex-row">
					{steps.map((s, index) => (
						<React.Fragment key={s.title}>
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
						</React.Fragment>
					))}
				</div>

				<div
					className={`${
						theme === "dark"
							? "bg-[#121212] border border-[#121212]"
							: "border border-[#040171]"
					} rounded-lg p-6 my-6 shadow-sm`}
				>
					<div className="flex items-center gap-2 mb-6">
						<div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
							<span>8</span>
						</div>
						<h2 className="font-medium text-l">
							Any restrictions in regard of your audience?
						</h2>
					</div>

					<div className="space-y-6">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							{[
								"None",
								"Children Only",
								"Women Only",
								"No Children",
								"18+",
								"Senior Citizens",
							].map((option) => (
								<button
									key={option}
									onClick={() =>
										handleAudienceSelection(option)
									}
									className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
										selectedAudience.includes(option)
											? "border-[#040171] bg-[#040171] text-white"
											: "border-gray-300"
									}`}
								>
									<div
										className={`w-4 h-4 rounded-full border ${
											selectedAudience.includes(option)
												? "border-white"
												: "border-gray-300"
										} flex items-center justify-center`}
									>
										{selectedAudience.includes(option) && (
											<div className="w-2 h-2 bg-white rounded-full" />
										)}
									</div>
									{option}
								</button>
							))}
						</div>
					</div>
				</div>

				<div
					className={`${
						theme === "dark"
							? "bg-[#121212] border border-[#121212]"
							: "border border-[#040171]"
					} rounded-lg p-6 my-6 shadow-sm`}
				>
					<div className="space-y-6">
						<div className="flex flex-col items-center justify-center mb-8 text-center ">
							<div className="flex items-center mb-[2rem] mt-2">
								<div
									className={`w-5 h-5 rounded-full bg-transparent ${
										theme === "dark"
											? "border-gray-200  "
											: "border-[#040171]"
									} flex items-center justify-center text-l border  mr-2`}
								>
									9
								</div>
								<label
									className={`text-l font-normal  mt-1 ${
										theme === "dark"
											? "text-white"
											: "text-[#000]"
									}`}
								>
									How many users do you expect to see?
								</label>
							</div>

							<div className="flex items-center justify-center">
								<button
									onClick={() =>
										handleusersCountChange(-1000)
									}
									className="w-[5rem] h-12 bg-[#040171] text-white rounded-l-full flex items-center justify-center text-l"
								>
									-
								</button>
								<span
									className={`w-[5rem] h-12   text-center text-l  flex items-center justify-center text-l   ${
										theme === "dark"
											? "bg-[#222]"
											: "border border-[#040171]"
									} `}
								>
									{usersCount}
								</span>
								<button
									onClick={() => handleusersCountChange(1000)}
									className="w-[5rem] h-12 bg-[#040171] text-white rounded-r-full flex items-center justify-center text-l"
								>
									+
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="mb-5 space-y-8">
					{/* Special Guests Section */}
					<div
						className={`${
							theme === "dark"
								? "bg-[#121212] border border-[#121212]"
								: "border border-[#040171]"
						} rounded-lg p-6 my-6 shadow-sm`}
					>
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
								<span>10</span>
							</div>
							<h2 className="font-medium text-l">
								How many special guest will be there?
							</h2>
						</div>

						<div className="flex items-center justify-center">
							<button
								onClick={() => {
									setGuestCount((prev) =>
										Math.max(0, prev - 1)
									);
									setGuestNames((prev) =>
										prev.slice(
											0,
											Math.max(0, guestCount - 1)
										)
									);
								}}
								className="w-[5rem] h-12 bg-[#040171] text-white rounded-l-full flex items-center justify-center text-l"
							>
								-
							</button>
							<span
								className={`w-[5rem] h-12 text-center text-l flex items-center justify-center ${
									theme === "dark"
										? "bg-[#222]"
										: "border border-[#040171]"
								}`}
							>
								{guestCount}
							</span>
							<button
								onClick={() => {
									setGuestCount((prev) => prev + 1);
									setGuestNames((prev) => [...prev, ""]);
								}}
								className="w-[5rem] h-12 bg-[#040171] text-white rounded-r-full flex items-center justify-center text-l"
							>
								+
							</button>
						</div>

						<div className="mt-5 space-y-4">
							<p className="text-center text-l">
								What are the names of your special guest?
							</p>
							{[...Array(guestCount)].map((_, index) => (
								<input
									key={index}
									type="text"
									value={guestNames[index] || ""}
									onChange={(e) =>
										handleGuestNameChange(
											index,
											e.target.value
										)
									}
									className={`w-full p-3 border border-gray-300 ${
										theme === "dark"
											? "text-white"
											: "text-[#000]"
									} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
									placeholder="Guest name"
								/>
							))}
						</div>

						{/* <div className="mt-4">
        <p className="text-center">Guest Names:</p>
        <p className="text-center text-gray-700">{guestNamesString}</p>
      </div> */}
					</div>

					<div
						className={`${
							theme === "dark"
								? "bg-[#121212] border border-[#121212]"
								: "border border-[#040171]"
						} rounded-lg p-6 my-6 shadow-sm`}
					>
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
								<span>11</span>
							</div>
							<h2 className="font-medium text-l">
								Any authorities needs to be notified?
							</h2>
						</div>

						<div className="flex justify-center mt-3">
							<div
								className={`flex ${
									theme === "dark"
										? "bg-[#222] border border-[#222]"
										: "border border-[#040171]"
								} rounded-[5rem] p-1`}
							>
								<button
									className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${
										!notifyAuthorities
											? "bg-[#040171] text-[#fff] shadow"
											: theme === "dark"
											? "text-[#fff]"
											: "text-[#040171]"
									}`}
									onClick={() => setNotifyAuthorities(false)}
								>
									No
								</button>
								<button
									className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${
										notifyAuthorities
											? "bg-[#040171] text-[#fff] shadow"
											: theme === "dark"
											? "text-[#fff]"
											: "text-[#040171]"
									}`}
									onClick={() => setNotifyAuthorities(true)}
								>
									Yes
								</button>
							</div>
						</div>

						{notifyAuthorities && (
							<div className="flex flex-col items-start md:grid md:grid-cols-3 mt-[3rem] text-center">
								{[
									"Police",
									"Fire Department",
									"Traffic Control",
								].map((authority, index) => (
									<label
										key={index}
										className="flex items-center gap-2"
									>
										<input
											type="radio"
											name="authority"
											className="w-4 h-4"
											checked={
												selectedAuthority === authority
											}
											onChange={() =>
												setSelectedAuthority(authority)
											}
										/>
										<span className="text-l">
											{authority}
										</span>
									</label>
								))}
							</div>
						)}
					</div>

					{/* Password Protection Section */}
					<div
						className={`${
							theme === "dark"
								? "bg-[#121212] border border-[#121212]"
								: "border border-[#040171]"
						} rounded-lg p-6 my-6 shadow-sm`}
					>
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
								<span>12</span>
							</div>
							<h2 className="font-medium text-l">
								Is the Event Password Protected?
							</h2>
						</div>

						<div className="flex justify-center mt-3">
							<div
								className={`flex ${
									theme === "dark"
										? "bg-[#222] border border-[#222]"
										: "border border-[#040171]"
								} rounded-[5rem] p-1`}
							>
								<button
									className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${
										!isPasswordProtected
											? "bg-[#040171] text-[#fff] shadow"
											: theme === "dark"
											? "text-[#fff]"
											: "text-[#040171]"
									}`}
									onClick={() =>
										setIsPasswordProtected(false)
									}
								>
									No
								</button>
								<button
									className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${
										isPasswordProtected
											? "bg-[#040171] text-[#fff] shadow"
											: theme === "dark"
											? "text-[#fff]"
											: "text-[#040171]"
									}`}
									onClick={() => setIsPasswordProtected(true)}
								>
									Yes
								</button>
							</div>
						</div>

						{isPasswordProtected && (
							<div className="mt-4">
								<input
									type="text"
									value={eventPassword}
									onChange={(e) =>
										setEventPassword(e.target.value)
									}
									className={`w-full p-3 border border-gray-300 ${
										theme === "dark"
											? "text-white"
											: "text-[#000]"
									} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
									placeholder="Enter Event Password"
								/>
							</div>
						)}
					</div>

					{/* Event Listing Section */}
					<div
						className={`${
							theme === "dark"
								? "bg-[#121212] border border-[#121212]"
								: "border border-[#040171]"
						} rounded-lg p-6 my-6 shadow-sm`}
					>
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
								<span>13</span>
							</div>
							<h2 className="font-medium text-l">
								Should the Event be Listed?
							</h2>
						</div>

						<div className="flex justify-center mt-3">
							<div
								className={`flex ${
									theme === "dark"
										? "bg-[#222] border border-[#222]"
										: "border border-[#040171]"
								} rounded-[5rem] p-1`}
							>
								<button
									className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${
										!isEventListed
											? "bg-[#040171] text-[#fff] shadow"
											: theme === "dark"
											? "text-[#fff]"
											: "text-[#040171]"
									}`}
									onClick={() => setIsEventListed(false)}
								>
									No
								</button>
								<button
									className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${
										isEventListed
											? "bg-[#040171] text-[#fff] shadow"
											: theme === "dark"
											? "text-[#fff]"
											: "text-[#040171]"
									}`}
									onClick={() => setIsEventListed(true)}
								>
									Yes
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center justify-between text-center lg:flex-row">
					<Link
						to={"/dashboard/event/create/" + id + "/payments/"}
						className={`w-[12rem] bg-opacity-50 bg-[#040171] ${
							theme === "dark"
								? "border-[#DBDAFF20]"
								: "border-[#DBDAFF50]"
						} border-4 text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}
					>
						Previous
					</Link>

					<div className="flex items-center gap-3 mt-2 lg:mt-0">
						{/* <p className='text-[#040171] hidden lg:flex cursor-pointer'>Save to template</p> */}
						<button
							onClick={() => completeTicket()}
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
							{loading ? "Loading..." : "Complete"}
						</button>
					</div>
					{/* <p className='text-[#040171] mt-1 lg:hidden cursor-pointer'>Save to template</p> */}
				</div>
			</div>
		</div>
	);
};

export default EventsInfo;
