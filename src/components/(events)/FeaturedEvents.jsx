import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as necessary
import { ChevronDown, Search, Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Select from "react-select";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles
import { Link } from "react-router-dom";
import eventImage from "../../assets/(landing)/event.png"
import event2Image from "../../assets/(landing)/event2.png"
import event3Image from "../../assets/(landing)/event3.png"
import event4Image from "../../assets/(landing)/event4.png"
import TicketModal from "./TicketModal";
import api from "../../api";
import MapAutocomplete from "../(maps)/Autocomplete";
import LocationSearch from "../(maps)/LocationSearch";

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
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
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
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};


function FeaturedEvents({ variation }) {

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
        const fetchCategories = async () => {
            try {
                const response = await api.get("/get_categories", {
                    headers: {

                    },
                });
                SetCategories(response.data.categories);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchCategories();

    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/events", {
                    headers: {

                    },
                });
                setcards(response.data.events_list);
                console.log(response.data.events_list);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchEvents();

    }, []);

    const { theme } = useTheme();
    const [selectedDate, setSelectedDate] = useState(null); // State for the selected date
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 3;
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
        <section className={`py-16 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-100'}`}>
            <div className={`${variation == 2 ? 'hidden' : 'flex'} relative z-10  flex-col -mt-[6.5rem] items-center justify-center h-full text-white px-4`}>
                <div className={`${theme === 'dark' ? 'bg-gray-100' : 'bg-white'} rounded-[2rem] p-2 w-full max-w-6xl flex flex-col md:flex-row items-center shadow-lg`}>
                    <p className="flex-grow px-6 py-3 rounded-[2rem] focus:outline-none text-gray-500 placeholder-gray-400">
                        Search by name or type
                    </p>
                    <div className="flex flex-col md:flex-row w-full gap-1">
                        <div className="px-4 py-2 w-full flex justify-between md:flex-col items-center md:items-start md:border-l md:border-b-0 border-b border-gray-300">
                            <p className="text-blue-800 font-semibold mb-1">Date</p>
                            <div className="relative">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholderText="Select Date"
                                    dateFormat="MMMM d, yyyy"
                                    className={`border p-2 rounded w-[200px] pl-[1.3rem] bg-transparent text-black border-[#d1d5db] custom-datepicker`}
                                />
                                <Calendar className="absolute right-2 top-2 w-5 h-5 text-gray-500" />
                            </div>
                        </div>
                        <div className="px-4 py-2 w-full flex justify-between items-center md:items-start md:flex-col md:border-l md:border-b-0 border-b border-gray-300">
                            <p className="text-blue-800 font-semibold mb-1">Location</p>
                            {/* <LocationSearch value={searchLocation} onChange={handleLocationChange} /> */}
                        </div>
                        <div className="px-4 py-2 w-full flex justify-between items-center md:items-start md:flex-col md:border-l md:border-b-0 border-b border-gray-300">
                            <p className="text-blue-800 font-semibold mb-1">Event Type</p>
                            <Select
                                options={formattedCategories}
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                placeholder="Select Event Type"
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-auto md:mr-3 flex justify-end items-center mt-2  md:mt-0">
                        <button className="bg-blue-600 text-white p-4 rounded-full ml-2">
                            <Search size={24} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${variation == 2 ? '' : 'mt-[6rem]'} container mx-auto px-4 `}>
                <div className={`${variation == 2 ? 'text-start' : 'text-center '} mb-8`}>

                    <div className={`${variation == 2 ? 'flex flex-col md:flex-row justify-between' : ''} `}>
                        <h2 className={`${variation == 2 ? ' text-lg  md:text-2xl  ' : ' text-xl  md:text-3xl  '}font-bold pb-1 mb-3 relative inline-block font-bold uppercase ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>
                            {variation == 2 ? 'Browse Events' : 'Featured Events Around You'}

                            <span className={` absolute bottom-0 ${variation == 2 ? ' left-0 ' : ' right-0 '} w-[5rem] h-[.1rem] bg-orange-500 `}></span>
                            <span className={` absolute bottom-1 ${variation == 2 ? ' left-0 ' : ' right-0 '} w-[5rem] h-[.1rem] bg-orange-500 `}></span>
                        </h2>

                        <div className={`${variation == 2 ? 'relative max-w-[200px] md:max-w-auto mx-auto  hidden lg:flex items-center' : 'hidden'} `}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] bg-transparent rounded-lg focus:outline-none"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search size={20} className="text-gray-600" />
                            </div>
                        </div>
                    </div>



                    <p className={`${variation == 2 ? 'hidden' : ''} text-sm px-5  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Check out what’s trending now and grab your tickets before they sell out!
                    </p>
                    <div className="flex  lg:hidden flex-row justify-around items-center gap-2 mt-5">
                        <div className={`${variation == 2 ? 'relative w-1/2 mx-auto  flex items-center' : 'hidden'} `}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] bg-transparent rounded-lg focus:outline-none"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search size={20} className="text-gray-600" />
                            </div>
                        </div>
                        <Select
                            options={formattedCategories}
                            styles={customSearchStyles}
                            components={{ DropdownIndicator }}
                            placeholder="All"
                            isSearchable={false}
                        />

                    </div>
                    <div className="hidden lg:flex justify-center space-x-10 items-center my-8">
                        <a href="javascript:void(0)" className="bg-[#040171] rounded-lg text-white h-[2rem] items-center flex justify-center w-[3rem] text-sm font-medium">All</a>
                        {categories.map((eventType, index) => (
                            <a
                                key={eventType.id}
                                href={`/category/${eventType.id}`}
                                className={`text-sm hover:text-[#040171] ${theme === "light" ? "text-gray-700" : "text-white"}`}
                            >
                                {eventType.category}
                            </a>
                        ))}
                    </div>

                </div>
                <div className={`${variation == 2 ? '' : 'flex flex-col items-center'}`}>
                    <div className={`${variation == 2 ? 'lg:px-[5rem]' : 'max-w-7xl  grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} grid  gap-8 px-2 `}>
                        {cards && cards.map((card, index) => (
                            <>
                                {
                                    variation != 2 ? (
                                        <>

                                            <div
                                                key={index}
                                                className={`bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
                                            >
                                                <img
                                                    src={card.event_img}
                                                    alt={card.event_title}
                                                    className="w-full h-[8rem] md:h-[10rem] object-cover"
                                                />
                                                <div className={`flex flex-col justify-between p-6 py-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                                    <div className="flex  items-center">
                                                        <span className="text-gray-500 flex w-2/5 items-center gap-1 text-xs"><Calendar size={16} /> <span>{card.event_days[0].start_day}</span></span>
                                                        <span className="text-orange-500 text-center w-1/5">|</span>
                                                        <span className="text-gray-500 flex w-2/5  items-center justify-end  gap-1 text-xs"><MapPin size={16} /> <span>{card.event_days[0].event_address.split(", ").slice(-2).join(", ")}</span></span>

                                                    </div>
                                                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                        to={'/event/view/' + card.event_id} className="text-xl my-2 text-black font-semibold ">
                                                        {card.event_title.length > 50 ? `${card.event_title.substring(0, 50)}...` : card.event_title}
                                                    </Link>

                                                    <span className="text-gray-500 text-sm">{card.event_description.length > 100 ? `${card.event_description.substring(0, 100)}...` : card.event_description}</span>

                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="overflow-hidden bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl shadow-md   lg:rounded-none lg:shadow-none   flex flex-col lg:flex-row  lg:gap-5 mb-4">
                                            <img
                                                src={card.event_img}
                                                alt={card.event_title}
                                                className=" w-full h-[12rem] lg:w-1/4 rounded-xl object-cover"
                                            />
                                            <div className="rounded-xl lg:shadow-md  bg-white p-4 py-[2.5rem] flex flex-col justify-between w-full mt-2 lg:mt-0 lg:w-3/4">
                                                <div className="flex justify-between items-start">
                                                    <div className="w-1/3 flex-grow md:px-3 flex flex-col justify-between gap-2 md:gap-4">
                                                        <div className="">
                                                            <div className="flex gap-3 flex-col md:inline-flex md:flex-row md:gap-12 md:items-center text-sm md:text-xs text-gray-500 mb-2 md:border md:border-gray-300 rounded-full md:px-2 py-1">
                                                                <div className="flex font-semibold items-center gap-1">
                                                                    <Calendar color="#040171" className="w-4 h-4 md:w-3 md:h-3 mr-1" />
                                                                    <span>{card.event_days[0].start_day}</span>
                                                                </div>
                                                                <div className="flex font-bold items-center gap-1">
                                                                    <Clock color="#040171" className="w-4 h-4 md:w-3 md:h-3 mr-1" />
                                                                    <span>{card.event_days[0].open_door_time}</span>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                            to={'/event/view/' + card.event_id} className="text-lg my-3 md:my-0 font-semibold text-[#040171]">
                                                            {card.event_title.length > 50 ? `${card.event_title.substring(0, 50)}...` : card.event_title}
                                                        </Link>

                                                        <div className="flex items-center font-semibold text-xs text-gray-600 mt-1 gap-1">
                                                            <MapPin color="#040171" className="w-4 h-4 md:w-3 md:h-3 mr-1" />
                                                            <span>{card.event_days[0].event_address}</span>
                                                        </div>
                                                        <div className="h-full  md:hidden mt-4 flex ">

                                                            <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                                to={'/event/view/' + card.event_id} className="bg-orange-500  text-white text-lg px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                                                                Buy Tickets
                                                            </Link>
                                                        </div>
                                                    </div>


                                                    <div className="h-full hidden md:flex md:border-l pl-3 items-center">

                                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                            to={'/event/view/' + card.event_id} className="bg-orange-500  text-white text-xs px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                                                            Buy Tickets
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }
                            </>
                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </section>
    );
}

export default FeaturedEvents;
