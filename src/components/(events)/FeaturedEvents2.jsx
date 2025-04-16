/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
	Calendar,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Clock,
	MapPin,
	Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { categoriesApi, eventsApi } from "../../shared/services/api.ts";
import { useTheme } from "../../context/ThemeContext.jsx"; // Adjust path as necessary
import FeaturedEventCard from "../ui/FeaturedEventCard.jsx";
import { cn, formatEventDate } from "../../lib/utils.js";

const options = [
	{ value: "location1", label: "Location 1" },
	{ value: "location2", label: "Location 2" },
	{ value: "location3", label: "Location 3" },
];

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="flex items-center justify-center space-x-2">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
			>
				<ChevronLeft size={20} />
			</button>

			{pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => onPageChange(number)}
					className={`w-10 h-10 flex items-center justify-center rounded-full
              ${
					currentPage === number
						? "bg-[#040171] text-white"
						: "bg-gray-200 text-gray-600 hover:bg-gray-300"
				}`}
				>
					{number}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
			>
				<ChevronRight size={20} />
			</button>
		</div>
	);
};

function FeaturedEvents2({ variation, sortcategory }) {
	const [categories, setCategories] = useState([]);
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	const navigate = useNavigate();
	// sortcategory ? alert(sortcategory) : alert('none')
	const [searchParam, UseSearchParam] = useState("");

	const formattedCategories = categories
		// .filter((category) => category.status === 1) // Only show active categories (status: 1)
		.map((category) => ({
			label: category.name, // Display the category name
			value: category.id, // Use the category id as the value
		}));

	const [cards, setcards] = useState([]); // State for the selected date
	const [searchQuery, setSearchQuery] = useState("");
	const handleSearch = (e) => {
		e.preventDefault();
		// Handle search logic here
		console.log("Searching:", searchParam, "in", location);
		navigate("/event/search/" + searchParam);
	};

	const searchEvent = () => {
		if (searchParam) {
			navigate("/event/search/" + searchParam);
			// alert(searchQuery)
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

	const [loading, setLoading] = useState(true); // Track loading state

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const myEvents = await eventsApi.getEvents();
				console.log(myEvents);
				// const response = await api.post(
				//   sortcategory ? "/category_events" : "/events",
				//   {
				//     category: sortcategory,
				//   }
				// );
				setcards(myEvents);
				// console.log(response.data.events_list[0].info[0].event_list_choice)
				// console.log(response.data.events_list);
			} catch (error) {
				console.error("Failed to fetch user:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 6; // Show 1 card per page

	// Calculate total pages
	const totalPages = Math.ceil(cards.length / cardsPerPage);

	// Filter the cards based on event_list_choice
	const filteredCards = cards.filter((card) => card.is_public);

	// Get the current page's cards
	const startIndex = (currentPage - 1) * cardsPerPage;
	const endIndex = startIndex + cardsPerPage;
	const currentCards = filteredCards?.slice(startIndex, endIndex) || [];

	console.log(currentCards);

	const { theme } = useTheme();
	const [selectedDate, setSelectedDate] = useState(null); // State for the selected date

	const customSearchStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "transparent",
			borderColor: "#d1d5db",
			padding: "3px 12px",
			width: "200px", // Set fixed width for all Select components
			minWidth: "200px", // Ensure a minimum width
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			padding: 0,
			color: "#000",
		}),
		singleValue: (provided) => ({
			...provided,
			color: "#000",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap", // Prevent wrapping
			maxWidth: "100%", // Ensures the ellipsis shows correctly
		}),
		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#000",
			backgroundColor: state.isSelected ? "#000" : "#fff",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap", // Prevent wrapping
		}),
		indicatorSeparator: () => null,
	};

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "transparent",
			borderColor: "#d1d5db",
			padding: "6px 12px",
			width: "200px", // Set fixed width for all Select components
			minWidth: "200px", // Ensure a minimum width
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			padding: 0,
			color: "#000",
		}),
		singleValue: (provided) => ({
			...provided,
			color: "#000",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap", // Prevent wrapping
			maxWidth: "100%", // Ensures the ellipsis shows correctly
		}),
		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#000",
			backgroundColor: state.isSelected ? "#000" : "#fff",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap", // Prevent wrapping
		}),
		indicatorSeparator: () => null,
	};

	const DropdownIndicator = () => (
		<div className="flex items-center pr-2">
			<ChevronDown className="w-5 h-5 text-gray-500" />
		</div>
	);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchLocation, setSearchLocation] = useState("");

	const handleLocationChange = (newLocation) => {
		setSearchLocation(newLocation);
	};

	const handlePageChange = (pageNumber) => {
		if (pageNumber < 1 || pageNumber > totalPages) return;
		setCurrentPage(pageNumber);
	};

	return (
		<section
			className={`${variation !== 2 ? "py-16" : "pt-16 pb-96 md:pb-72"} ${
				theme === "dark" ? "bg-[#121212]" : "bg-gray-100"
			}`}
		>
			<div
				className={`${
					variation == 2 ? "hidden" : "flex"
				} relative z-10  flex-col -mt-[6.5rem] items-center justify-center h-full text-white px-4`}
			>
				<form
					onSubmit={handleSearch}
					className={`${
						theme === "dark" ? "bg-gray-100" : "bg-white"
					} rounded-[2rem] p-2 w-full max-w-6xl flex flex-col md:flex-row items-center shadow-lg`}
				>
					{" "}
					<p className="flex-grow px-6 py-3 rounded-[2rem] focus:outline-none text-gray-500 placeholder-gray-400">
						Search by name or type
					</p>
					<div className="flex flex-col w-full gap-1 md:flex-row">
						<div className="flex items-center justify-between w-full px-4 py-2 border-b border-gray-300 md:items-start md:flex-col md:border-l md:border-b-0">
							<p className="mb-1 font-semibold text-blue-800">
								Event Name
							</p>
							<input
								type="text"
								placeholder="Enter event name"
								value={searchQuery}
								onSubmit={searchEvent}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="px-4 py-2 flex w-[400px] bg-transparent text-black outline-none  border border-[#d1d5db] rounded-sm"
								style={{ width: "100%" }}
							/>{" "}
						</div>
						<div className="flex items-center justify-between w-full px-4 py-2 border-b border-gray-300 md:flex-col md:items-start md:border-l md:border-b-0">
							<p className="mb-1 font-semibold text-blue-800">
								Date
							</p>
							<div className="relative">
								<DatePicker
									selected={selectedDate}
									onChange={(date) => setSelectedDate(date)}
									placeholderText="Select Date"
									dateFormat="MMMM d, yyyy"
									className={`border p-2 rounded w-[200px] pl-[1.3rem] bg-transparent text-black border-[#d1d5db] custom-datepicker`}
								/>
								<Calendar className="absolute w-5 h-5 text-gray-500 right-2 top-2" />
							</div>
						</div>

						<div className="flex items-center justify-between w-full px-4 py-2 border-b border-gray-300 md:items-start md:flex-col md:border-l md:border-b-0">
							<p className="mb-1 font-semibold text-blue-800">
								Event Type
							</p>
							<Select
								options={formattedCategories}
								styles={customStyles}
								components={{ DropdownIndicator }}
								placeholder="Select Event Type"
								isSearchable={false}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end w-full mt-2 md:w-auto md:mr-3 md:mt-0">
						<button
							type="submit"
							onClick={searchEvent}
							onSubmit={searchEvent}
							className="p-4 ml-2 text-white bg-blue-600 rounded-full"
						>
							<Search size={24} />
						</button>
					</div>
				</form>
			</div>
			<div
				className={`${
					variation == 2 ? "" : "mt-[6rem]"
				} container mx-auto px-4 `}
			>
				<div
					className={`${
						variation == 2 ? "text-start" : "text-center "
					} mb-8`}
				>
					<div
						className={`${
							variation == 2
								? "flex flex-col md:flex-row justify-between"
								: ""
						} `}
					>
						{/* <h2
							className={`${
								variation == 2
									? "hidden text-lg  md:text-2xl  "
									: " text-xl  md:text-3xl  "
							}  pb-1 mb-3 relative inline-block font-bold uppercase ${
								theme === "dark"
									? "text-white"
									: "text-[#040171]"
							}`}
						>
							{variation == 2
								? "Browse Events"
								: "Featured Events Around You"}

							<span
								className={` absolute bottom-0 ${
									variation == 2 ? " left-0 " : " right-0 "
								} w-[5rem] h-[.1rem] bg-orange-500 `}
							></span>
							<span
								className={` absolute bottom-1 ${
									variation == 2 ? " left-0 " : " right-0 "
								} w-[5rem] h-[.1rem] bg-orange-500 `}
							></span>
						</h2> */}

						<h2
							className={cn(
								"relative text-2xl font-semibold mb-10 text-center uppercase tracking-wide text-secondary leading-normal md:text-3xl md:w-fit md:mx-auto md:mb-12 lg:text-[2rem] xl:mb-14",
								variation === 2 && "hidden"
							)}
						>
							Featured Events <br className="md:hidden" /> Around
							You
							<div className="absolute left-0 right-0 -bottom-[20px] flex flex-col gap-[2px] items-center md:items-end ">
								<div className="bg-primary h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
								<div className="bg-primary h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
							</div>
						</h2>

						<div
							className={`${
								variation == 2
									? "flex justify-center w-full"
									: "hidden"
							}`}
						>
							<div className="relative flex items-center justify-center w-full max-w-7xl">
								<form
									onSubmit={handleSearch}
									className="w-full px-2"
								>
									<input
										type="text"
										placeholder="Search..."
										value={searchParam}
										onSubmit={searchEvent}
										onChange={(e) =>
											UseSearchParam(e.target.value)
										}
										className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] bg-transparent rounded-lg focus:outline-none"
									/>
								</form>
								<div className="absolute inset-y-0 left-0 flex items-center pl-5">
									<Search
										size={20}
										className="text-gray-600"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* <p
						className={`${
							variation == 2 ? "hidden" : ""
						} text-sm px-5  ${
							theme === "dark" ? "text-gray-300" : "text-gray-700"
						}`}
					>
						Check out what’s trending now and grab your tickets
						before they sell out!
					</p> */}

					<p
						className={cn(
							"text-center mb-[44px] text-lg max-w-[454px] mx-auto md:max-w-none md:mb-[54px] lg:text-xl xl:text-2xl xl:mb-[64px]",
							variation === 2 && "hidden"
						)}
					>
						Check out what&apos;s trending now and grab your tickets
						before they sell out!
					</p>

					<div className="items-center justify-center hidden my-8 space-x-10 lg:flex">
						<a
							href="/event/find"
							className="bg-[#040171] rounded-lg text-white h-[2rem] items-center flex justify-center w-[3rem] text-sm font-medium"
						>
							All
						</a>
						{categories.map((eventType, index) => (
							<a
								key={eventType.id}
								href={`/category/${eventType.id}`}
								className={`${
									eventType.id == sortcategory
										? "bg-[#040171] rounded-lg text-white h-[2rem] items-center flex justify-center px-2 text-sm font-medium"
										: `text-sm hover:text-[#040171]  ${
												theme === "light"
													? "text-gray-700"
													: "text-white`"
										  }`
								}`}
							>
								{eventType.category}
							</a>
						))}
					</div>
				</div>
				{loading ? (
					<div className="grid w-full grid-cols-1 gap-8 px-2 max-w-7xl md:grid-cols-2 lg:grid-cols-3">
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className="w-full max-w-md p-4 mx-auto bg-white border border-gray-100 shadow-sm rounded-xl animate-pulse"
							>
								<div className="h-40 mb-4 rounded-lg bg-slate-200" />
								<div className="w-3/4 h-4 mb-2 rounded bg-slate-300" />
								<div className="w-1/3 h-3 mb-4 rounded bg-slate-300" />
								<div className="mb-4 space-y-2">
									<div className="w-full h-3 rounded bg-slate-200" />
									<div className="w-5/6 h-3 rounded bg-slate-200" />
								</div>
								<div className="w-24 h-8 rounded bg-slate-300" />
							</div>
						))}
					</div>
				) : currentCards.length == 0 ? (
					<p className="text-center">No Event Found</p>
				) : (
					<>
						<div
							className={`${
								variation == 2
									? ""
									: "flex flex-col items-center"
							}`}
						>
							<div
								className={`${
									variation == 2
										? "lg:px-[5rem]"
										: "max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
								} w-full grid gap-8 px-2`}
							>
								{currentCards &&
									currentCards.map((card, index) =>
										card ? (
											<div key={index}>
												{variation !== 2 ? (
													<FeaturedEventCard
														id={card.id}
														title={card.title}
														image={card.image}
														date={formatEventDate(
															card.days[0]
																.event_day,
															card.days[0]
																.open_door
														)}
														description={
															card.description
														}
														location={
															card.days[0]
																.event_address
														}
														category={"rides"}
													/>
												) : (
													<div
														className={`${
															theme === "dark"
																? "bg-[#000]"
																: "bg-white"
														} overflow-hidden lg:bg-transparent p-5 lg:p-0 rounded-xl shadow-md lg:rounded-none lg:shadow-none flex flex-col lg:flex-row lg:gap-5 mb-4`}
													>
														<img
															src={card.image}
															alt={card.title}
															className="w-full h-[12rem] lg:w-1/4 rounded-xl object-cover"
														/>
														<div
															className={`${
																theme === "dark"
																	? "bg-[#000]"
																	: "bg-white"
															} rounded-xl lg:shadow-md   p-4 py-[2.5rem] flex flex-col justify-between w-full mt-2 lg:mt-0 lg:w-3/4`}
														>
															<div className="flex items-start justify-between">
																<div className="flex flex-col justify-between flex-grow w-1/3 gap-2 md:px-3 md:gap-4">
																	<div className="">
																		<div className="flex flex-col gap-3 py-1 mb-2 text-sm text-gray-500 rounded-full md:inline-flex md:flex-row md:gap-12 md:items-center md:text-xs md:border md:border-gray-300 md:px-2">
																			<div className="flex items-center gap-1 font-semibold">
																				<Calendar
																					color={`${
																						theme ===
																						"dark"
																							? "#fff"
																							: "#040171"
																					} `}
																					className="w-4 h-4 mr-1 md:w-3 md:h-3"
																				/>
																				<span>
																					{
																						card
																							.days[0]
																							?.event_day
																					}
																				</span>
																			</div>
																			<div className="flex items-center gap-1 font-bold">
																				<Clock
																					color={`${
																						theme ===
																						"dark"
																							? "#fff"
																							: "#040171"
																					} `}
																					className="w-4 h-4 mr-1 md:w-3 md:h-3"
																				/>
																				<span>
																					{
																						card
																							.days[0]
																							?.open_door
																					}
																				</span>
																			</div>
																		</div>
																	</div>

																	<Link
																		onClick={() =>
																			window.scrollTo(
																				{
																					top: 0,
																					behavior:
																						"smooth",
																				}
																			)
																		}
																		to={
																			"/event/view/" +
																			card.id
																		}
																		className={`text-lg my-3 md:my-0 font-semibold ${
																			theme ===
																			"dark"
																				? "text-[#fff]"
																				: "text-[#040171]"
																		} `}
																	>
																		{card
																			.title
																			.length >
																		50
																			? `${card.title.substring(
																					0,
																					50
																			  )}...`
																			: card.title}
																	</Link>

																	<div className="flex items-center gap-1 mt-1 text-xs font-semibold text-gray-600">
																		<MapPin
																			color={`${
																				theme ===
																				"dark"
																					? "#fff"
																					: "#040171"
																			} `}
																			className="w-4 h-4 mr-1 md:w-3 md:h-3"
																		/>
																		<span>
																			{card
																				.days[0]
																				?.event_type ==
																			"virtual"
																				? "Virtual"
																				: card
																						.days[0]
																						?.event_address}
																		</span>
																	</div>
																	<div className="flex h-full mt-4 md:hidden ">
																		<Link
																			onClick={() =>
																				window.scrollTo(
																					{
																						top: 0,
																						behavior:
																							"smooth",
																					}
																				)
																			}
																			to={
																				"/event/view/" +
																				card.id
																			}
																			className="px-6 py-2 text-lg text-white transition duration-300 bg-orange-500 rounded-full hover:bg-orange-600"
																		>
																			Buy
																			Tickets
																		</Link>
																	</div>
																</div>

																<div className="items-center hidden h-full pl-3 md:flex md:border-l">
																	<Link
																		onClick={() =>
																			window.scrollTo(
																				{
																					top: 0,
																					behavior:
																						"smooth",
																				}
																			)
																		}
																		to={
																			"/event/view/" +
																			card.id
																		}
																		className="px-4 py-2 text-xs text-white transition duration-300 bg-orange-500 rounded-full hover:bg-orange-600"
																	>
																		Buy
																		Tickets
																	</Link>
																</div>
															</div>
														</div>
													</div>
												)}
											</div>
										) : (
											null()
										)
									)}
							</div>
						</div>

						{/* Pagination */}
						<div className="p-4 mt-14">
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</div>
					</>
				)}
			</div>
		</section>
	);
}

export default FeaturedEvents2;

// <div
// 	className={`bg-white shadow-lg  rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
// 		theme === "dark"
// 			? "bg-gray-900"
// 			: "bg-white"
// 	}`}
// >
// 	<img
// 		src={card.image}
// 		alt={card.title}
// 		className="w-full h-[8rem] md:h-[10rem] object-cover"
// 	/>
// 	<div
// 		className={`flex flex-col justify-between p-6 py-4 ${
// 			theme === "dark"
// 				? "text-gray-200"
// 				: "text-gray-700"
// 		}`}
// 	>
// 		<div className="flex items-center">
// 			<span className="flex items-center w-2/5 gap-1 text-xs text-gray-500">
// 				<Calendar
// 					size={16}
// 				/>{" "}
// 				<span>
// 					{
// 						card
// 							?.days[0]
// 							?.event_day
// 					}
// 				</span>
// 			</span>
// 			<span className="w-1/5 text-center text-orange-500">
// 				|
// 			</span>
// 			<span className="flex items-center justify-end w-2/5 gap-1 text-xs text-gray-500">
// 				<MapPin
// 					size={16}
// 				/>{" "}
// 				<span>
// 					{card
// 						.days[0]
// 						?.event_type ==
// 					"virtual"
// 						? "Virtual"
// 						: card.days[0]?.event_address
// 								.split(
// 									", "
// 								)
// 								.slice(
// 									-2
// 								)
// 								.join(
// 									", "
// 								)}
// 				</span>
// 			</span>
// 		</div>
// 		<Link
// 			onClick={() =>
// 				window.scrollTo(
// 					{
// 						top: 0,
// 						behavior:
// 							"smooth",
// 					}
// 				)
// 			}
// 			to={
// 				"/event/view/" +
// 				card.id
// 			}
// 			className="my-2 text-xl font-semibold text-black"
// 		>
// 			{card.title.length >
// 			50
// 				? `${card.title.substring(
// 						0,
// 						50
// 				  )}...`
// 				: card.title}
// 		</Link>
// 		<span className="text-sm text-gray-500">
// 			{card.description
// 				.length > 100
// 				? `${card.description.substring(
// 						0,
// 						100
// 				  )}...`
// 				: card.description}
// 		</span>
// 	</div>
// </div>
