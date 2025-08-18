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
	Star,
	Heart,
	Share2
} from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { eventsApi, categoriesApi } from "../../shared/services/api";

import { useTheme } from "../../context/ThemeContext";
import FeaturedEventCard from "../ui/FeaturedEventCard";
import { cn, formatEventDate } from "../../lib/utils";
import {
	fetchConversionRate,
	useLocationData,
} from "../../shared/hooks/useLocationData";
import { supportedCurrencies } from "../../shared/data";

interface FeaturedEvents2Props {
	variation?: number;
	sortcategory?: string | number | null;
}

interface Category {
	id: string | number;
	name: string;
	category: string;
	status?: number;
}

interface Ticket {
	id: number;
	name: string;
	price: number;
	currency: string;
	quantity: number;
	number_sold: number;
	status: string;
	type: string;
}

interface EventCard {
	id: string | number;
	title: string;
	image: string;
	description: string;
	is_public: boolean;
	tickets: Ticket[];
	days: Array<{
		event_day: string;
		open_door: string;
		event_address: string;
		event_type: string;
	}>;
}

const CACHE_KEYS = {
	EVENTS: 'featured_events_cache',
	CATEGORIES: 'categories_cache',
	EVENTS_TIMESTAMP: 'featured_events_timestamp',
	CATEGORIES_TIMESTAMP: 'categories_timestamp'
};

const CACHE_DURATION = 5 * 60 * 1000;

const getCachedData = (key: string, timestampKey: string) => {
	try {
		const timestamp = localStorage.getItem(timestampKey);
		const data = localStorage.getItem(key);

		if (!timestamp || !data) return null;

		const isExpired = Date.now() - parseInt(timestamp) > CACHE_DURATION;
		if (isExpired) {
			localStorage.removeItem(key);
			localStorage.removeItem(timestampKey);
			return null;
		}

		return JSON.parse(data);
	} catch (error) {
		console.error('Error reading from cache:', error);
		return null;
	}
};

const setCachedData = (key: string, timestampKey: string, data: any) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
		localStorage.setItem(timestampKey, Date.now().toString());
	} catch (error) {
		console.error('Error writing to cache:', error);
	}
};

const Pagination = ({ currentPage, totalPages, onPageChange }: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) => {
	const getVisiblePages = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	return (
		<div className="flex items-center justify-center space-x-2 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="flex items-center justify-center w-10 h-10 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				<ChevronLeft size={18} />
			</button>

			{getVisiblePages().map((page, index) => (
				<button
					key={index}
					onClick={() => typeof page === 'number' && onPageChange(page)}
					disabled={typeof page !== 'number'}
					className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors
						${currentPage === page
							? "bg-[#040171] text-white shadow-md"
							: typeof page === 'number'
								? "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
								: "bg-transparent text-gray-400 cursor-default"
						}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="flex items-center justify-center w-10 h-10 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				<ChevronRight size={18} />
			</button>
		</div>
	);
};

const EventCardImproved = ({ card, theme }: { card: EventCard; theme: string }) => {
	const [isLiked, setIsLiked] = useState(false);
	const { location, conversionRate } = useLocationData();
 
	const getCheapestPrice = () => {
		if (!card.tickets || card.tickets.length === 0) {
			return { price: 0, currency: 'NGN' };
		}

		const availableTickets = card.tickets.filter(ticket => ticket.status === 'available');
		if (availableTickets.length === 0) {
			return { price: 0, currency: 'NGN' };
		}

		const cheapest = availableTickets.reduce((min, ticket) =>
			ticket.price < min.price ? ticket : min
		);

		return { price: cheapest.price, currency: cheapest.currency };
	};

	const formatPrice = (price: number, originalCurrency: string) => {
		if (price === 0) return 'Free';

		// Convert price using conversion rate
		const convertedPrice = conversionRate ? price / conversionRate : price;

		// Use user's local currency or fallback to USD if not CAD

 
		const displayCurrency = location?.currencyCode || 'NGN';

		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: displayCurrency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

		return formatter.format(convertedPrice);
	};

	const { price, currency } = getCheapestPrice();

	return (
		<div className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[420px] flex flex-col ${theme === "dark" ? "bg-gray-800" : "bg-white"
			}`}>
			<div className="relative overflow-hidden h-48">
				<img
					src={card.image}
					alt={card.title}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
				<div className="absolute top-4 right-4 flex space-x-2">
					<button
						onClick={() => setIsLiked(!isLiked)}
						className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isLiked ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
							}`}
					>
						<Heart size={16} fill={isLiked ? "currentColor" : "none"} />
					</button>
					<button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors">
						<Share2 size={16} />
					</button>
				</div>
				{/* Currency Flag Display */}
				{location && (
					<div className="absolute top-4 left-4">
						<div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
							<img
								src={location.flag}
								alt="Currency Flag"
								className="w-4 h-4 object-cover rounded-full"
							/>
							<span className="text-white text-xs font-medium">
								{location.currencyCode === 'CAD' ? 'CAD' : 'USD'}
							</span>
						</div>
					</div>
				)}
				<div className="absolute bottom-4 left-4">
					<div className="flex items-center space-x-2 text-white text-sm">
						<div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
							<Calendar size={14} />
							<span>{card.days[0]?.event_day}</span>
						</div>
						<div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
							<Clock size={14} />
							<span>{card.days[0]?.open_door}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="p-6 flex-1 flex flex-col">
				<div className="flex items-start justify-between mb-3">
					<h3 className={`text-lg font-semibold line-clamp-2 flex-1 ${theme === "dark" ? "text-white" : "text-gray-900"
						}`}>
						{card.title}
					</h3>
					<div className="flex items-center space-x-1 text-yellow-500 ml-2">
						<Star size={16} fill="currentColor" />
						<span className="text-sm font-medium">4.8</span>
					</div>
				</div>

				<div className="flex items-center space-x-2 mb-4">
					<MapPin size={16} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
					<span className={`text-sm line-clamp-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
						}`}>
						{card.days[0]?.event_type === "virtual" ? "Virtual Event" : card.days[0]?.event_address}
					</span>
				</div>

				<p className={`text-sm mb-4 line-clamp-2 flex-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
					}`}>
					{card.description}
				</p>

				<div className="flex items-center justify-between mt-auto">
					<div className="flex flex-col">
						<span className="text-xs text-gray-500">Starting from</span>
						<div className="flex items-center space-x-2">
							{location && (
								<img
									src={location.flag}
									alt="Currency Flag"
									className="w-4 h-4 object-cover rounded-full"
								/>
							)}
							<span className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"
								}`}>
								{formatPrice(price, currency)}
							</span>
						</div>
					</div>
					<Link
						to={`/event/view/${card.id}`}
						className="px-6 py-2 bg-gradient-to-r from-[#040171] to-[#0601a0] text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
					>
						View Event
					</Link>
				</div>
			</div>
		</div>
	);
};

function FeaturedEvents2({ variation = 1, sortcategory = null }: FeaturedEvents2Props) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [cards, setCards] = useState<EventCard[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<any>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = variation === 2 ? 8 : 6;
	const navigate = useNavigate();
	const { theme } = useTheme();

	const formattedCategories = categories.map((category) => ({
		label: category.name,
		value: category.id,
	}));


	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/event/search/${searchQuery}`);
		}
	};

	const clearFilters = () => {
		setSearchQuery("");
		setSelectedDate(null);
		setSelectedCategory(null);
		setCurrentPage(1);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const cachedCategories = getCachedData(CACHE_KEYS.CATEGORIES, CACHE_KEYS.CATEGORIES_TIMESTAMP);
				if (cachedCategories) {
					setCategories(cachedCategories);
					return;
				}

				const categoriesData = await categoriesApi.getCategories();
				const fetchedCategories = categoriesData.categories || [];
				setCategories(fetchedCategories);

				setCachedData(CACHE_KEYS.CATEGORIES, CACHE_KEYS.CATEGORIES_TIMESTAMP, fetchedCategories);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				setLoading(true);

				const cachedEvents = getCachedData(CACHE_KEYS.EVENTS, CACHE_KEYS.EVENTS_TIMESTAMP);
				if (cachedEvents) {
					setCards(cachedEvents);
					setLoading(false);
					return;
				}

				const myEvents = await eventsApi.getEvents();
				const fetchedEvents = myEvents || [];
				setCards(fetchedEvents);

				setCachedData(CACHE_KEYS.EVENTS, CACHE_KEYS.EVENTS_TIMESTAMP, fetchedEvents);
			} catch (error) {
				console.error("Failed to fetch events:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchEvents();
	}, []);

	const filteredCards = cards.filter((card) => {
		if (!card.is_public) return false;



		if (selectedCategory && card.days.length > 0) {
			const eventCategory = categories.find(cat => cat.id === selectedCategory.value);
			if (eventCategory && !card.days.some(day => day.event_type === eventCategory.category)) {
				return false;
			}
		}

		if (selectedDate && card.days.length > 0) {
			const selectedDateStr = selectedDate.toISOString().split('T')[0];
			if (!card.days.some(day => day.event_day.startsWith(selectedDateStr))) {
				return false;
			}
		}

		return true;
	}).sort((a, b) => {
		const getLatestEventDate = (card: EventCard) => {
			if (card.days.length === 0) return new Date(0);
			const dates = card.days.map(day => new Date(day.event_day));
			return new Date(Math.max(...dates.map(date => date.getTime())));
		};

		const dateA = getLatestEventDate(a);
		const dateB = getLatestEventDate(b);

		return dateB.getTime() - dateA.getTime();
	});

	const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
	const startIndex = (currentPage - 1) * cardsPerPage;
	const currentCards = filteredCards.slice(startIndex, startIndex + cardsPerPage);

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			backgroundColor: "transparent",
			borderColor: "#d1d5db",
			padding: "4px 8px",
			borderRadius: "12px",
			minHeight: "44px",
			boxShadow: "none",
			"&:hover": {
				borderColor: "#040171",
			},
		}),
		dropdownIndicator: (provided: any) => ({
			...provided,
			color: "#6b7280",
		}),
		singleValue: (provided: any) => ({
			...provided,
			color: theme === "dark" ? "#fff" : "#000",
		}),
		option: (provided: any, state: any) => ({
			...provided,
			color: state.isSelected ? "#fff" : theme === "dark" ? "#fff" : "#000",
			backgroundColor: state.isSelected ? "#040171" : state.isFocused ? "#f3f4f6" : "transparent",
		}),
		indicatorSeparator: () => null,
	};

	return (
		<section className={`${variation !== 2 ? "py-16" : "pt-16 pb-24"
			} ${theme === "dark" ? "bg-[#121212]" : "bg-gray-50"}`}>
			{variation !== 2 && (
				<div className="relative z-10 flex flex-col -mt-[6.5rem] items-center justify-center h-full text-white px-4">
					<form
						onSubmit={handleSearch}
						className={`${theme === "dark" ? "bg-gray-800/95" : "bg-white/95"
							} rounded-2xl p-6 w-full max-w-7xl flex flex-col shadow-2xl backdrop-blur-md border border-white/20`}
					>
						<div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6">
							<div className="flex-1 min-w-0">
								<label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"
									}`}>Event Name</label>
								<input
									type="text"
									placeholder="Search events..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className={`w-full px-4 py-3.5 ${theme === "dark"
											? "bg-gray-700/50 text-white border-gray-600 placeholder-gray-400"
											: "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
										} border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#040171] focus:border-transparent transition-all duration-200`}
								/>
							</div>

							<div className="flex-1 min-w-0">
								<label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"
									}`}>Date</label>
								<div className="relative flex w-full">
									<DatePicker
										selected={selectedDate}
										onChange={(date) => setSelectedDate(date)}
										placeholderText="Select date"
										dateFormat="MMMM d, yyyy"
										minDate={new Date()}
										className={`w-full px-4 py-3.5 ${theme === "dark"
												? "bg-gray-700/50 text-white border-gray-600"
												: "bg-gray-50 text-gray-900 border-gray-300"
											} border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#040171] focus:border-transparent transition-all duration-200`}
									/>
								</div>
							</div>

							<div className="flex-1 min-w-0">
								<label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"
									}`}>Category</label>
								<Select
									options={formattedCategories}
									placeholder="All categories"
									isSearchable={false}
									value={selectedCategory}
									onChange={setSelectedCategory}
									styles={{
										control: (provided: any) => ({
											...provided,
											backgroundColor: theme === "dark" ? "rgba(55, 65, 81, 0.5)" : "rgb(249, 250, 251)",
											borderColor: theme === "dark" ? "#4b5563" : "#d1d5db",
											padding: "6px 8px",
											borderRadius: "12px",
											minHeight: "50px",
											boxShadow: "none",
											"&:hover": {
												borderColor: "#040171",
											},
										}),
										dropdownIndicator: (provided: any) => ({
											...provided,
											color: "#6b7280",
										}),
										singleValue: (provided: any) => ({
											...provided,
											color: theme === "dark" ? "#fff" : "#000",
										}),
										placeholder: (provided: any) => ({
											...provided,
											color: theme === "dark" ? "#9ca3af" : "#6b7280",
										}),
										menu: (provided: any) => ({
											...provided,
											backgroundColor: theme === "dark" ? "#374151" : "#fff",
											border: `1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"}`,
										}),
										option: (provided: any, state: any) => ({
											...provided,
											color: state.isSelected ? "#fff" : theme === "dark" ? "#fff" : "#000",
											backgroundColor: state.isSelected
												? "#040171"
												: state.isFocused
													? theme === "dark" ? "#4b5563" : "#f3f4f6"
													: "transparent",
										}),
									}}
								/>
							</div>

							<div className="flex flex-col sm:flex-row items-end gap-3">
								<button
									type="submit"
									className="px-6 py-3.5 bg-gradient-to-r from-[#040171] to-[#0601a0] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold flex items-center space-x-2 whitespace-nowrap"
								>
									<Search size={20} />
									<span>Search</span>
								</button>

								{(searchQuery || selectedDate || selectedCategory) && (
									<button
										type="button"
										onClick={clearFilters}
										className={`px-4 py-3.5 ${theme === "dark"
												? "bg-gray-600 hover:bg-gray-500 text-white"
												: "bg-gray-200 hover:bg-gray-300 text-gray-700"
											} rounded-xl transition-all duration-200 font-medium whitespace-nowrap`}
									>
										Clear
									</button>
								)}
							</div>
						</div>

						{filteredCards.length > 0 && (
							<div className={`mt-4 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"
								}`}>
								Showing {filteredCards.length} event{filteredCards.length !== 1 ? 's' : ''}
								{(searchQuery || selectedDate || selectedCategory) && ' matching your criteria'}
							</div>
						)}
					</form>
				</div>
			)}

			<div className={`${variation === 2 ? "" : "mt-24"
				} container mx-auto px-4`}>
				<div className={`${variation === 2 ? "text-start" : "text-center"
					} mb-12`}>
					{variation !== 2 && (
						<>
							<h2 className={cn(
								"relative text-3xl font-bold mb-6 text-center uppercase tracking-wide leading-normal md:text-4xl lg:text-5xl",
								theme === "dark" ? "text-white" : "text-[#040171]"
							)}>
								Featured Events <br className="md:hidden" /> Around You
								<div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 flex flex-col gap-1 items-center">
									<div className="bg-orange-500 h-1 w-20 rounded-full"></div>
									<div className="bg-orange-500 h-1 w-20 rounded-full"></div>
								</div>
							</h2>
							<p className={cn(
								"text-center mb-8 text-lg max-w-2xl mx-auto",
								theme === "dark" ? "text-gray-300" : "text-gray-600"
							)}>
								Discover amazing events happening near you. From concerts to conferences, find your next adventure!
							</p>
						</>
					)}

					{variation !== 2 && (
						<div className="mb-8">
							<div className="flex flex-wrap justify-center gap-2 sm:gap-4">
								<Link
									to="/event/find"
									className="px-4 sm:px-6 py-2 bg-[#040171] text-white rounded-full hover:bg-[#030150] transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
								>
									All Events
								</Link>
								{categories.slice(0, 6).map((category) => (
									<Link
										key={category.id}
										to={`/category/${category.id}`}
										className={`px-3 sm:px-6 py-2 rounded-full transition-colors font-medium text-sm sm:text-base whitespace-nowrap ${category.id === sortcategory
												? "bg-[#040171] text-white"
												: theme === "dark"
													? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
													: "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
											}`}
									>
										{category.name}
									</Link>
								))}
							</div>
						</div>
					)}
				</div>

				{loading ? (
					<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className={`animate-pulse rounded-2xl overflow-hidden h-[420px] ${theme === "dark" ? "bg-gray-800" : "bg-white"
									} shadow-lg`}
							>
								<div className={`h-48 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
									}`} />
								<div className="p-6 space-y-4">
									<div className={`h-4 rounded w-3/4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
										}`} />
									<div className={`h-3 rounded w-1/2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
										}`} />
									<div className={`h-3 rounded w-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
										}`} />
									<div className={`h-8 rounded w-24 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
										}`} />
								</div>
							</div>
						))}
					</div>
				) : currentCards.length === 0 ? (
					<div className="text-center py-16">
						<div className={`text-6xl mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"
							}`}>🎭</div>
						<h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
							}`}>No Events Found</h3>
						<p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
							Try adjusting your search criteria or check back later for new events.
						</p>
					</div>
				) : (
					<>
						<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							{currentCards.map((card, index) => (
								<EventCardImproved key={card.id || index} card={card} theme={theme} />
							))}
						</div>

						{totalPages > 1 && (
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
							/>
						)}
					</>
				)}
			</div>
		</section>
	);
}

export default FeaturedEvents2;
