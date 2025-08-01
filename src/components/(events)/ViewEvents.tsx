/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as necessary
import { Calendar, MapPin, Lock, LockOpen, ChevronDown } from "lucide-react";
import user from "../../assets/(user)/user.png";
import { Share2 } from "lucide-react";
import TicketModal from "./TicketModal";
import { useParams } from "react-router-dom";
import SimpleMap from "../props/Map";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

import { eventsApi } from "../../shared/services/api/eventsApi";
import { formatDate } from "../../lib/formatDate";
import { CircularProgress } from "@mui/material";

const Header = ({ theme, eventDetails, ticketDetails, id }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleShare = async () => {
		const pageUrl = window.location.href;
		const shareData = {
			title: "Check out This Event!!",
			text: `Check out This Event!!: ${pageUrl}`,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				alert("Sharing is not supported in your browser.");
			}
		} catch (error) {
			console.error("Error sharing:", error);
		}
	};

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between">
				<div className="flex flex-col items-center text-gray-600">
					<p
						className={`${
							theme === "dark" ? "text-gray-300" : "text-gray-600"
						}`}
					>
						{ticketDetails.days[0] &&
							formatDate(ticketDetails.days[0]?.event_day)}
					</p>
				</div>
				<div className="">
					{/* <button className="p-2 rounded-full hover:bg-gray-100">
                        <Heart className="w-4 h-4" />
                    </button> */}
					<button
						className="p-2 rounded-full hover:bg-gray-100"
						onClick={handleShare}
					>
						<Share2 className="w-4 h-4" />
					</button>
				</div>
			</div>
			<div className="flex flex-col items-start justify-between mt-4 md:flex-row">
				<h1
					className={`text-2xl md:text-3xl font-bold  ${
						theme === "dark" ? "text-white" : "text-[#040171]"
					}`}
				>
					{eventDetails.event_title}
				</h1>
				<div className="flex gap-2">
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-4 py-2 mt-2 text-white bg-orange-500 rounded-md md:mt-0"
					>
						Buy Tickets
					</button>
				</div>
			</div>
			{isModalOpen && (
				<TicketModal
					eventId={id}
					eventDetails={eventDetails}
					ticketDetails={ticketDetails}
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</div>
	);
};

// Host Info Component
const HostInfo = ({ theme, eventDetails }) => (
	<div
		className={`lg:w-1/2 rounded-lg p-6 shadow-sm mb-8 ${
			theme === "dark" ? "bg-[#121212]" : "bg-gray-100 "
		}`}
	>
		<div className="flex flex-col gap-4 md:flex-row md:items-center">
			<div className="flex items-center gap-4">
				<img
					src={user}
					alt="Host"
					className="object-cover object-center w-12 h-12 rounded-full"
				/>
				<div className="flex-grow">
					<div
						className={`text-xl font-medium  ${
							theme === "dark" ? "text-white" : "text-[#040171]"
						}`}
					>
						Hosted by: {eventDetails.user.full_name}
					</div>
					<div className="inline-block px-3 py-1 mt-1 text-sm text-white bg-orange-500 rounded-full">
						{eventDetails.total_events_by_this_user_with_status_1}{" "}
						{eventDetails.total_events_by_this_user_with_status_1 >
						1
							? "Events"
							: "Event"}{" "}
						Hosted
					</div>
				</div>
			</div>
			<div className="flex gap-4">
				{eventDetails.user.instagram && (
					<a
						href={eventDetails.user.instagram}
						target="_blank"
						className="hover:opacity-75"
					>
						<svg
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
						</svg>
					</a>
				)}
				{eventDetails.user.tiktok && (
					<a
						href={eventDetails.user.tiktok}
						target="_blank"
						className="hover:opacity-75"
					>
						<svg
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
					</a>
				)}
				{eventDetails.user.twitter && (
					<a
						href={eventDetails.user.twitter}
						target="_blank"
						className="hover:opacity-75"
					>
						<svg
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
						</svg>
					</a>
				)}
			</div>
		</div>
	</div>
);

// DateTime Component
const DateTime = ({ theme, eventDetails, ticketDetails, day, id }) => {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "long" });
		const year = date.getFullYear();

		// Add the correct suffix for the day
		const daySuffix = (day) => {
			if (day >= 11 && day <= 13) return `${day}th`;
			switch (day % 10) {
				case 1:
					return `${day}st`;
				case 2:
					return `${day}nd`;
				case 3:
					return `${day}rd`;
				default:
					return `${day}th`;
			}
		};

		return `${daySuffix(day)} ${month}, ${year}`;
	};

	const formatTime = (timeStr) => {
		const [hours, minutes] = timeStr.split(":");
		const date = new Date();
		date.setHours(+hours);
		date.setMinutes(+minutes);
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

	return (
		<div className="mb-8">
			<h2
				className={`text-xl font-bold  ${
					theme === "dark" ? "text-white" : "text-[#040171]"
				}`}
			>
				Date and Time
			</h2>
			<div
				className={`flex items-center gap-2 ${
					theme === "dark" ? "text-gray-300" : "text-[#040171]"
				}`}
			>
				<Calendar className="w-5 h-5" />
				<span className="uppercase">
					{day && formatDate(day.event_day)} ·{" "}
					{day && formatTime(day.open_door)} -{" "}
					{day && formatTime(day.close_door)}
				</span>
			</div>
		</div>
	);
};

// Location Component
const Location = ({ theme, ticketDetails, day, index }) => {
	const [showMap, setShowMap] = useState(index == 0);

	return (
		<div className="my-8">
			<h2
				className={`text-xl font-bold  ${
					theme === "dark" ? "text-white" : "text-[#040171]"
				}`}
			>
				Location
			</h2>
			<div
				className={`flex items-start gap-2 ${
					theme === "dark" ? "text-gray-300" : "text-[#040171]"
				}`}
			>
				<MapPin className="w-5 h-5 mt-1" />
				<div>
					<div className="font-medium">
						{" "}
						{day && day.event_type == "virtual"
							? "Virtual Event"
							: day.event_address}
					</div>
				</div>
			</div>

			{day.event_type != "virtual" ? (
				<>
					<button
						className="flex items-center gap-1 mt-2 font-medium text-blue-600"
						onClick={() => setShowMap(!showMap)}
					>
						{showMap ? "Hide Map" : "Show Map"}
						<ChevronDown
							className={`w-4 h-4 transform ${
								showMap ? "rotate-180" : ""
							}`}
						/>
					</button>

					{showMap && (
						<SimpleMap
							width={"100%"}
							height={"10rem"}
							name={day.event_address}
						/>
					)}
				</>
			) : (
				""
			)}
		</div>
	);
};

// FAQ Component
const FAQ = ({ theme }) => {
	const [openIndex, setOpenIndex] = useState(null);

	const questions = [
		{ id: 1, question: "What is the Age Requirement?" },
		{ id: 2, question: "What is the Age Requirement?" },
		{ id: 3, question: "What is the Age Requirement?" },
		{ id: 4, question: "What is the Age Requirement?" },
	];

	return (
		<div className="mb-8">
			<h2
				className={`text-xl font-bold  ${
					theme === "dark" ? "text-white" : "text-[#040171]"
				}`}
			>
				Frequently Asked Questions
			</h2>
			{questions.map((q, index) => (
				<div
					key={q.id}
					className={`border-b ${
						theme === "dark"
							? " border-gray-700"
							: " border-gray-200"
					}`}
				>
					<button
						className="flex items-center justify-between w-full py-4 text-left"
						onClick={() =>
							setOpenIndex(openIndex === index ? null : index)
						}
					>
						<span
							className={`${
								theme === "dark"
									? "text-white"
									: "text-[#040171]"
							}`}
						>
							{q.question}
						</span>
						<ChevronDown
							className={`w-5 h-5 text-gray-600 transform transition-transform ${
								openIndex === index ? "rotate-180" : ""
							}`}
						/>
					</button>
					{openIndex === index && (
						<div className="pb-4 text-gray-600">
							Answer to the question goes here...
						</div>
					)}
				</div>
			))}
		</div>
	);
};

const Tags = ({ theme }) => {
	const tags = [
		"United States",
		"New York",
		"Concert",
		"Shows",
		"Night Life in America",
		"hiphop",
		"Concert Night",
	];

	return (
		<div>
			<h2
				className={`text-xl font-bold mb-3  ${
					theme === "dark" ? "text-white" : "text-[#040171]"
				}`}
			>
				Tags
			</h2>

			<div className="flex flex-wrap gap-3">
				{tags.map((tag, index) => (
					<span
						key={index}
						className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-full"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
};

function ViewEventComponent({ variation }) {
	const { theme } = useTheme();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [locked, setIsLocked] = useState(false);
	const [pin, setPin] = useState("");
	const [Lockicon, setLock] = useState("lock");
	const [trialPassword, SetTrialPassword] = useState("");

	const { id } = useParams();
	const [fetchingdataloading, setfetchingdataLoading] = useState(true);

	const [eventDetails, setEventDetails] = useState({
		event_category: "",
		event_specific_type: true,
		event_title: "",
		event_description: "",
		event_image: "",
		event_id: "",
		days: [],
		tickets: [],
		user: [],
		total_events_by_this_user_with_status_1: 0,
	});

	const [ticketDetails, setTicketDetails] = useState({
		event_category: "",
		event_specific_type: true,
		event_title: "",
		event_description: "",
		event_image: "",
		event_id: "",
		days: [],
		tickets: [],
		referral_code: "",
	});

	useEffect(() => {
		const fetchSingleEventDetails = async () => {
			try {
				const event = await eventsApi.getEventById(id);
				console.log(event);

				if (event) {
					const { total_events_by_this_user_with_status_1 } = event;
					setEventDetails({
						event_category: event.category_id
							? event.category.name
							: "General",
						event_specific_type: event.is_listed,
						event_title: event.title,
						event_description: event.description,
						event_image: event.image,
						event_id: event.id,
						user: event.organizer,
						total_events_by_this_user_with_status_1,

						...event,
					});
					event.is_password_protected
						? (setIsLocked(true), setPin(event.event_password))
						: setIsLocked(false);

					setTicketDetails({
						days: event.days,
						tickets: event.tickets || [],
					});
				}
			} catch (error) {
				console.error("Failed to fetch event details:", error);
			} finally {
				setfetchingdataLoading(false);
			}
		};

		fetchSingleEventDetails();
	}, [id]);

	// const cards = [];

	const unlockevent = () => {
		if (pin == trialPassword) {
			setLock("unlocked");
			setTimeout(() => setIsLocked(false), 500);
			setTimeout(() => setLock("lock"), 500);
		} else {
			setLock("lock");
			Swal.fire("Error", "Wrong Event Password", "error");
		}
	};

	const getMimeType = (url) => {
		const extension = url.split(".").pop().toLowerCase();
		switch (extension) {
			case "png":
				return "image/png";
			case "jpg":
			case "jpeg":
				return "image/jpeg";
			case "ico":
				return "image/x-icon";
			case "svg":
				return "image/svg+xml";
			case "webp":
				return "image/webp";
			default:
				return "image/png"; // Fallback type
		}
	};
	return (
		<section
			className={`pt-16 pb-96 md:pb-72 xl:pb-80 ${
				theme === "dark" ? "bg-[#111]" : "bg-gray-100"
			}`}
		>
			{fetchingdataloading ? (
				<div className={`p-2 bg-transparent rounded-lg md:col-span-3`}>
					<div style={{ height: "100%", width: "100%" }}>
						<div className="flex items-center justify-center h-96">
							<CircularProgress size={50} />
						</div>
					</div>
				</div>
			) : (
				<Helmet>
					<title>{eventDetails.event_title}</title>
					<meta
						property="og:title"
						content={eventDetails.event_title}
					/>
					<meta
						property="og:image"
						content={eventDetails.event_image}
					/>
					<meta
						property="og:description"
						content={eventDetails.event_description}
					/>
					<meta property="og:type" content="website" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta
						name="twitter:title"
						content={eventDetails.event_title}
					/>
					<meta
						name="twitter:description"
						content={eventDetails.event_description}
					/>
					<meta
						name="twitter:image"
						content={eventDetails.event_image}
					/>
					{eventDetails.event_image && (
						<link
							rel="icon"
							href={`${eventDetails.event_image}`}
							type={getMimeType(eventDetails.event_image)}
						/>
					)}
				</Helmet>
			)}
			{locked ? (
				<>
					<div
						className={`flex flex-col justify-center items-center px-5`}
					>
						<div
							className={`${
								theme === "dark"
									? "bg-orange-500 text-gray-600"
									: "bg-orange-500 text-white"
							} max-w-lg flex flex-col items-center justify-center p-[3rem] py-[5rem] rounded-2xl`}
						>
							<div className="p-2 mb-[2rem] bg-white rounded-[50%]">
								{Lockicon == "lock" ? (
									<Lock
										size={50}
										className="text-orange-500 animate-bounce"
									/>
								) : (
									<LockOpen
										size={50}
										className="text-orange-500 animate-ping"
									/>
								)}
							</div>
							<h5 className="mb-5 text-2xl text-center text-white">
								This Event is Protected by a Password
							</h5>
							<h5 className="mb-5 text-sm text-center text-white">
								Enter the shared Password for this event or
								contact the event organizers via{" "}
								{eventDetails.user.email}
							</h5>
							<input
								type="text"
								value={trialPassword}
								onChange={(e) =>
									SetTrialPassword(e.target.value)
								}
								className={`w-full p-3 bg-white border placeholder:text-black border-gray-300 ${
									theme === "dark"
										? "text-black"
										: "text-black"
								} font-normal rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
								placeholder="Enter Event Password"
							/>
							<button
								onClick={unlockevent}
								className="px-4 py-2 mt-4 text-white bg-black rounded-lg"
							>
								{Lockicon == "lock" ? "Unlock" : "Unlocking..."}{" "}
							</button>
						</div>
					</div>
				</>
			) : (
				<div className="px-3 md:px-0">
					<div className="flex flex-col items-center p-1 md:p-5">
						{eventDetails.event_image && (
							<img
								src={eventDetails.event_image}
								className="w-full h-[30rem] object-cover  max-w-7xl mb-5 rounded-xl"
								alt=""
							/>
						)}
					</div>
					<div className="">
						<div
							className={` ${
								theme === "dark" ? "bg-[#000]" : "bg-white"
							} mb-5 px-5  rounded-xl max-w-7xl mx-auto p-6 `}
						>
							<Header
								theme={theme}
								eventDetails={eventDetails}
								ticketDetails={ticketDetails}
								id={id}
							/>
							<HostInfo
								theme={theme}
								eventDetails={eventDetails}
								ticketDetails={ticketDetails}
							/>

							<div className="mb-5">
								<h2
									className={`text-xl font-bold  ${
										theme === "dark"
											? "text-white"
											: "text-[#040171]"
									}`}
								>
									About Event
								</h2>
								<p
									className={`${
										theme === "dark"
											? "text-gray-300"
											: "text-gray-600"
									}`}
								>
									{eventDetails.event_description}
								</p>
							</div>
							<div className="mb-5">
								<h2
									className={`text-l font-bold  ${
										theme === "dark"
											? "text-white"
											: "text-[#040171]"
									}`}
								>
									Restrictions
								</h2>
								<p
									className={`${
										theme === "dark"
											? "text-gray-300"
											: "text-gray-600"
									}`}
								>
									{eventDetails.restrictions &&
										eventDetails.restrictions}
								</p>
							</div>

							<div className="mb-8">
								{eventDetails.special_guests &&
									eventDetails.special_guests.length > 0 && (
										<>
											<h2
												className={`text-l font-bold ${
													theme === "dark"
														? "text-white"
														: "text-[#040171]"
												}`}
											>
												Special Guests
											</h2>
											<p
												className={`mt-2 ${
													theme === "dark"
														? "text-gray-300"
														: "text-gray-600"
												}`}
											>
												{eventDetails.special_guests.filter(
													(guest) =>
														guest.trim() !== ""
												).length > 0 ? (
													eventDetails.special_guests
														.filter(
															(guest) =>
																guest.trim() !==
																""
														)
														.map(
															(
																guest,
																index,
																filteredGuests
															) => (
																<span
																	key={index}
																	className={`${
																		theme ===
																		"dark"
																			? "bg-gray-100 text-gray-600"
																			: "bg-orange-500 text-white"
																	} px-4 py-2 mr-2 rounded-full text-sm`}
																>
																	{guest.trim()}
																	{index <
																		filteredGuests.length -
																			1 &&
																		" "}
																</span>
															)
														)
												) : (
													<span className="text-gray-500">
														None
													</span>
												)}
											</p>
										</>
									)}
							</div>

							{ticketDetails.days.map((day, index) => (
								<div
									key={index}
									className={` ${
										theme === "dark"
											? "bg-black"
											: "bg-white"
									} mb-5 px-5  rounded-l border`}
								>
									<div
										className={`flex items-center pb-2 my-6`}
									>
										<span
											className={`text-l mx-4 font-bold  ${
												theme === "dark"
													? "text-white"
													: "text-[#040171]"
											}`}
										>
											Day {index + 1}
										</span>
										<div className="flex-1 border-t border-gray-300"></div>
									</div>

									<DateTime
										theme={theme}
										eventDetails={eventDetails}
										ticketDetails={ticketDetails}
										index={index}
										day={day}
									/>
									<Location
										theme={theme}
										eventDetails={eventDetails}
										ticketDetails={ticketDetails}
										index={index}
										day={day}
									/>
								</div>
							))}
							<div className="mb-8">
								<h2
									className={`text-xl font-bold  ${
										theme === "dark"
											? "text-white"
											: "text-[#040171]"
									}`}
								>
									Refund Policy
								</h2>
								<p
									className={`${
										theme === "dark"
											? "text-gray-300"
											: "text-gray-600"
									}`}
								>
									No Refund
								</p>
							</div>

							<div className="mb-8">
								{eventDetails.authorities_to_notify && (
									<>
										<h2
											className={`text-l font-bold  ${
												theme === "dark"
													? "text-white"
													: "text-[#040171]"
											}`}
										>
											Notified Authorities
										</h2>
										<p
											className={`${
												theme === "dark"
													? "text-gray-300"
													: "text-gray-600"
											}`}
										>
											{eventDetails.authorities_to_notify}
										</p>
									</>
								)}
							</div>

							{/* <div className={`flex flex-col items-center my-[3rem]`}>
                        <div className="flex flex-col items-start w-full px-2 my-5 text-start">
                            <h2 className={`text-xl font-bold text-start  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>More Events From this Organizer</h2>

                        </div>
                        <div className={`flex flex-col gap-8 px-2`}>
                            {cards.map((card, index) => (
                                <>
                                    {

                                        <div className="flex flex-col p-5 mb-4 overflow-hidden bg-white shadow-md rounded-xl lg:bg-transparent lg:p-0 lg:rounded-none lg:shadow-none lg:flex-row lg:gap-5">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className=" w-full h-[12rem] lg:w-1/4 rounded-xl object-cover"
                                            />
                                            <div className="rounded-xl lg:shadow-md  bg-white p-4 py-[2.5rem] flex flex-col justify-between w-full mt-2 lg:mt-0 lg:w-3/4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-col justify-between flex-grow w-1/3 gap-2 md:px-3 md:gap-4">
                                                        <div className="">
                                                            <div className="flex flex-col gap-3 py-1 mb-2 text-sm text-gray-500 rounded-full md:inline-flex md:flex-row md:gap-12 md:items-center md:text-xs md:border md:border-gray-300 md:px-2">
                                                                <div className="flex items-center gap-1 font-semibold">
                                                                    <Calendar color="#040171" className="w-4 h-4 mr-1 md:w-3 md:h-3" />
                                                                    <span>{card.date}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1 font-bold">
                                                                    <Calendar color="#040171" className="w-4 h-4 mr-1 md:w-3 md:h-3" />
                                                                    <span>{card.date}</span>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                            to={'/event/view/' + card.id} className="text-lg my-3 md:my-0 font-semibold text-[#040171]">
                                                            {card.title.length > 50 ? `${card.title.substring(0, 50)}...` : card.title}
                                                        </Link>

                                                        <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-gray-600">
                                                            <MapPin color="#040171" className="w-4 h-4 mr-1 md:w-3 md:h-3" />
                                                            <span>{card.location}</span>
                                                        </div>
                                                        <div className="flex h-full mt-4 md:hidden">

                                                            <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 text-lg text-white transition duration-300 bg-orange-500 rounded-full hover:bg-orange-600">
                                                                Buy Tickets
                                                            </button>
                                                        </div>
                                                    </div>


                                                    <div className="items-center hidden h-full pl-3 md:flex md:border-l">

                                                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-xs text-white transition duration-300 bg-orange-500 rounded-full hover:bg-orange-600">
                                                            Buy Tickets
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    }
                                </>
                            ))}
                        </div>
                    </div> */}
							<TicketModal
								isOpen={isModalOpen}
								onClose={() => setIsModalOpen(false)}
								eventId={id}
								eventDetails={eventDetails}
								ticketDetails={ticketDetails}
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default ViewEventComponent;
