import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as necessary

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
              ${currentPage === number
                            ? 'bg-[#040171] text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
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


function SearchEventComponent({ variation }) {
    const { search } = useParams();
    const [searchParam, UseSearchParam] = useState('');

    const navigate = useNavigate();
    const [categories, SetCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

    const formattedCategories = categories
        .filter(category => category.status === 1) // Only show active categories (status: 1)
        .map(category => ({
            label: category.category,  // Display the category name
            value: category.id         // Use the category id as the value
        }));

    const [cards, setcards] = useState([]); // State for the selected date
    useEffect(() => {
        UseSearchParam(search)

    }, [search]);
    const searchEvent = async () => {
        if (searchParam) {
            navigate('/event/search/' + searchParam);
            setLoading(true)
            try {
                const response = await api.post("/search_events",
                    {
                        query: searchParam, 
                    }, {
                    headers: {

                    },
                });
                setcards(response.data.events_list);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                if (error.status == 404) {
                    setcards([]);
                }
            } finally {
                setLoading(false)
            }
            // alert(searchQuery)
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        searchEvent()
    };

    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchEvents = async () => {
            console.log(search)
            try {
                const response = await api.post("/search_events",
                    {
                        query: search,
                    }, {
                    headers: {

                    },
                });
                setcards(response.data.events_list);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                if (error.status == 404) {
                    setcards([]);
                }
            } finally {
                setLoading(false)
            }
        };

        fetchEvents();

    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6; // Show 1 card per page

    // Calculate total pages
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    // Get the current page's cards
    const currentCards = cards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);


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
    const [searchLocation, setSearchLocation] = useState('');

    const handleLocationChange = (newLocation) => {
        setSearchLocation(newLocation);
    };
    return (
        <section className={`py-10 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-100'}`}>

            <div className={`${variation == 2 ? '' : 'mt-[6rem]'} container mx-auto px-4 `}>
                <div className={`${variation == 2 ? 'text-start' : 'text-center '} mb-8`}>

                    <div className={`${variation == 2 ? 'flex flex-col md:flex-row justify-between' : ''} `}>

                        <div className={`${variation == 2 ? 'flex justify-center w-full' : 'hidden'}`}>
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
                                        onChange={(e) => UseSearchParam(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] bg-transparent rounded-lg focus:outline-none"
                                    />

                                </form>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-5">
                                    <Search size={20} className="text-gray-600" />
                                </div>
                            </div>
                        </div>

                    </div>



                    <p className={`${variation == 2 ? 'hidden' : ''} text-sm px-5  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Check out what’s trending now and grab your tickets before they sell out!
                    </p>


                </div>
                {loading ? (
                    <div className="flex items-center justify-center ">
                        <div className="w-full p-4 m-1 mx-auto border border-gray-100 rounded-md">
                            <div className="flex space-x-4 animate-pulse">
                                <div className="rounded-full bg-slate-700 h-[2rem] w-[2rem]"></div>
                                <div className="flex-1 py-1 space-y-6">
                                    <div className="h-[1rem] bg-slate-700 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-[1rem] bg-slate-700 rounded col-span-2"></div>
                                            <div className="h-[1rem] bg-slate-700 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-[1rem] bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    currentCards.length == 0 ? <p className="text-center">No Event Found</p> :

                    <>
                        <div className={`${variation == 2 ? '' : 'flex flex-col items-center'}`}>
                            <div className={`${variation == 2 ? 'lg:px-[5rem]' : 'max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} w-full grid gap-8 px-2`}>
                                {currentCards && currentCards.map((card, index) => (
                                    <div key={index}>
                                        {
                                            variation !== 2 ? (
                                                <div className={`bg-white shadow-lg  rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                                                    <img
                                                        src={card.event_img}
                                                        alt={card.event_title}
                                                        className="w-full h-[8rem] md:h-[10rem] object-cover"
                                                    />
                                                    <div className={`flex flex-col justify-between p-6 py-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                                        <div className="flex items-center">
                                                            <span className="flex items-center w-2/5 gap-1 text-xs text-gray-500"><Calendar size={16} /> <span>{card.event_days[0]?.start_day}</span></span>
                                                            <span className="w-1/5 text-center text-orange-500">|</span>
                                                            <span className="flex items-center justify-end w-2/5 gap-1 text-xs text-gray-500"><MapPin size={16} /> <span>{card.event_days[0]?.event_type == 'virtual' ? 'Virtual' : card.event_days[0]?.event_address.split(", ").slice(-2).join(", ")}</span></span>
                                                        </div>
                                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to={'/event/view/' + card.event_id} className="my-2 text-xl font-semibold text-black">
                                                            {card.event_title.length > 50 ? `${card.event_title.substring(0, 50)}...` : card.event_title}
                                                        </Link>
                                                        <span className="text-sm text-gray-500">{card.event_description.length > 100 ? `${card.event_description.substring(0, 100)}...` : card.event_description}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col p-5 mb-4 overflow-hidden bg-white shadow-md lg:bg-transparent lg:p-0 rounded-xl lg:rounded-none lg:shadow-none lg:flex-row lg:gap-5">
                                                    <img
                                                        src={card.event_img}
                                                        alt={card.event_title}
                                                        className="w-full h-[12rem] lg:w-1/4 rounded-xl object-cover"
                                                    />
                                                    <div className="rounded-xl lg:shadow-md bg-white p-4 py-[2.5rem] flex flex-col justify-between w-full mt-2 lg:mt-0 lg:w-3/4">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex flex-col justify-between flex-grow w-1/3 gap-2 md:px-3 md:gap-4">
                                                                <div className="">
                                                                    <div className="flex flex-col gap-3 py-1 mb-2 text-sm text-gray-500 rounded-full md:inline-flex md:flex-row md:gap-12 md:items-center md:text-xs md:border md:border-gray-300 md:px-2">
                                                                        <div className="flex items-center gap-1 font-semibold">
                                                                            <Calendar color="#040171" className="w-4 h-4 mr-1 md:w-3 md:h-3" />
                                                                            <span>{card.event_days[0]?.event_day}</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1 font-bold">
                                                                            <Clock color="#040171" className="w-4 h-4 mr-1 md:w-3 md:h-3" />
                                                                            <span>{card.event_days[0]?.open_door}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to={'/event/view/' + card.event_id} className="text-lg my-3 md:my-0 font-semibold text-[#040171]">
                                                                    {card.event_title.length > 50 ? `${card.event_title.substring(0, 50)}...` : card.event_title}
                                                                </Link>

                                                                <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-gray-600">
                                                                    <MapPin color="#040171" className="w-4 h-4 mr-1 md:w-3 md:h-3" />
                                                                    <span>{card.event_days[0]?.event_type == 'virtual' ? 'Virtual' : card.event_days[0]?.event_address}</span>
                                                                </div>
                                                                <div className="flex h-full mt-4 md:hidden ">
                                                                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to={'/event/view/' + card.event_id} className="px-6 py-2 text-lg text-white transition duration-300 bg-orange-500 rounded-full hover:bg-orange-600">
                                                                        Buy Tickets
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                            <div className="items-center hidden h-full pl-3 md:flex md:border-l">
                                                                <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to={'/event/view/' + card.event_id} className="px-4 py-2 text-xs text-white transition duration-300 bg-orange-500 rounded-full hover:bg-orange-600">
                                                                    Buy Tickets
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="p-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default SearchEventComponent;
