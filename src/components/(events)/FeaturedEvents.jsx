import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as necessary
import { ChevronDown, Search, Calendar, MapPin, Clock } from "lucide-react";
import Select from "react-select";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles
import { Link } from "react-router-dom";
import eventImage from "../../assets/(landing)/event.png"
import event2Image from "../../assets/(landing)/event2.png"
import event3Image from "../../assets/(landing)/event3.png"
import event4Image from "../../assets/(landing)/event4.png"
const options = [
    { value: "location1", label: "Location 1" },
    { value: "location2", label: "Location 2" },
    { value: "location3", label: "Location 3" },
];

const eventTypeOptions = [
    { id: 1, value: "conference", label: "Conference", slug: "conference", image: "path/to/conference-image.jpg" },
    { id: 2, value: "party", label: "Party", slug: "party", image: "path/to/party-image.jpg" },
    { id: 3, value: "workshop", label: "Workshop", slug: "workshop", image: "path/to/workshop-image.jpg" },
    { id: 4, value: "seminar", label: "Seminar", slug: "seminar", image: "path/to/seminar-image.jpg" },
    { id: 5, value: "webinar", label: "Webinar", slug: "webinar", image: "path/to/webinar-image.jpg" },
    { id: 6, value: "networking", label: "Networking Event", slug: "networking-event", image: "path/to/networking-image.jpg" },
    { id: 7, value: "festival", label: "Festival", slug: "festival", image: "path/to/festival-image.jpg" },
    { id: 8, value: "concert", label: "Concert", slug: "concert", image: "path/to/concert-image.jpg" },
];


function FeaturedEvents({ variation }) {
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

    const cards = [
        {
            id: 1,
            title: "Nicki Minaj Live at Los Angeles",
            date: "24 Jan 2024",
            location: "Lagos, Nigeria",
            description: "This is a description for event 1, It will show some info about this event.",
            image: eventImage,
        },
        {
            id: 2,
            title: "        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum pariatur repellat quaerat eius, ratione accusamus at officia voluptatibus, numquam error eligendi est iusto ab, saepe dignissimos quam dolore. Voluptas amet corporis, ut rem suscipit cumque dolore commodi nemo nesciunt adipisci architecto aliquid maiores, quam non optio, fuga consequatur quo laboriosam?",
            date: "24 Jan 2024",
            location: "Texas, USA",
            description: "This is a description for event 2, It will show some info about this event.",
            image: event2Image,
        },

        {
            id: 3,
            title: "Nicki Minaj Live at Los Angeles",
            date: "24 Jan 2024",
            location: "Virtual",
            description: "This is a description for event 3, It will show some info about this event.",
            image: event3Image,
        },
        {
            id: 4,
            title: "Nicki Minaj Live at Los Angeles",
            date: "24 Jan 2024",
            location: "Lagos, Nigeria",
            description: "This is a description for event 1, It will show some info about this event.",
            image: event4Image,
        },
        {
            id: 5,
            title: "        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum pariatur repellat quaerat eius, ratione accusamus at officia voluptatibus, numquam error eligendi est iusto ab, saepe dignissimos quam dolore. Voluptas amet corporis, ut rem suscipit cumque dolore commodi nemo nesciunt adipisci architecto aliquid maiores, quam non optio, fuga consequatur quo laboriosam?",
            date: "24 Jan 2024",
            location: "Texas, USA",
            description: "This is a description for event 2, It will show some info about this event.",
            image: eventImage,
        },

        {
            id: 6,
            title: "Nicki Minaj Live at Los Angeles",
            date: "24 Jan 2024",
            location: "Virtual",
            description: "This is a description for event 3, It will show some info about this event.",
            image: event3Image,
        },
    ];

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
                            <Select
                                options={options}
                                styles={customSearchStyles}
                                components={{ DropdownIndicator }}
                                placeholder="Select Location"
                                isSearchable={true}
                            />
                        </div>
                        <div className="px-4 py-2 w-full flex justify-between items-center md:items-start md:flex-col md:border-l md:border-b-0 border-b border-gray-300">
                            <p className="text-blue-800 font-semibold mb-1">Event Type</p>
                            <Select
                                options={eventTypeOptions}
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
                <div className="text-center mb-8">

                    <h2 className={`text-xl md:text-3xl  font-bold pb-1 mb-3 relative inline-block font-bold uppercase ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>
                        {variation == 2 ? 'Browse Events' : 'Featured Events Around You'}

                        <span className="absolute bottom-0 right-0 w-[5rem] h-[.1rem] bg-orange-500 "></span>
                        <span className="absolute bottom-1 right-0 w-[5rem] h-[.1rem] bg-orange-500 "></span>
                    </h2>


                    <p className={`text-sm px-5  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Check out what’s trending now and grab your tickets before they sell out!
                    </p>
                    <div className="flex lg:hidden flex-col items-center mt-5">
                        <Select
                            options={eventTypeOptions}
                            styles={customSearchStyles}
                            components={{ DropdownIndicator }}
                            placeholder="All"
                            isSearchable={false}
                        />
                    </div>
                    <div className="hidden lg:flex justify-center space-x-10 items-center my-8">
                        <a href="javascript:void(0)" className="bg-[#040171] rounded-lg text-white h-[2rem] items-center flex justify-center w-[3rem] text-sm font-medium">All</a>
                        {eventTypeOptions.map((eventType, index) => (
                            <a
                                key={eventType.id}
                                href={`/${eventType.slug}`}
                                className={`text-sm hover:text-[#040171] ${theme === "light" ? "text-gray-700" : "text-white"}`}
                            >
                                {eventType.label}
                            </a>
                        ))}
                    </div>

                </div>
                <div className={`${variation == 2 ? '' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} grid  gap-8 px-2 `}>
                    {cards.map((card, index) => (
                        <>
                            {
                                variation != 2 ? (
                                    <>

                                        <div
                                            key={index}
                                            className={`bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
                                        >
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full h-[8rem] md:h-[10rem] object-cover"
                                            />
                                            <div className={`flex flex-col justify-between p-6 py-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                                <div className="flex  items-center">
                                                    <span className="text-gray-500 flex w-2/5 items-center gap-1 text-xs"><Calendar size={16} /> <span>{card.date}</span></span>
                                                    <span className="text-orange-500 text-center w-1/5">|</span>
                                                    <span className="text-gray-500 flex w-2/5  items-center justify-end  gap-1 text-xs"><MapPin size={16} /> <span>{card.location}</span></span>

                                                </div>
                                                <Link to={'/event/view/' + card.id} className="text-xl my-2 text-black font-semibold ">
                                                    {card.title.length > 50 ? `${card.title.substring(0, 50)}...` : card.title}
                                                </Link>

                                                <span className="text-gray-500 text-sm">{card.description.length > 100 ? `${card.description.substring(0, 100)}...` : card.description}</span>

                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="overflow-hidden bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl shadow-md   lg:rounded-none lg:shadow-none   flex flex-col lg:flex-row  lg:gap-5 mb-4">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className=" w-full h-[10rem] lg:w-1/4 rounded-xl object-cover"
                                        />
                                        <div className="rounded-xl lg:shadow-md  bg-white p-4 flex flex-col justify-between w-full mt-2 lg:mt-0 lg:w-3/4">
                                            <div className="flex justify-between items-start">
                                                <div className="w-1/3 flex-grow md:px-3 flex flex-col justify-between gap-2 md:gap-4">
                                                    <div className="">
                                                        <div className="flex gap-3 flex-col md:inline-flex md:flex-row md:gap-12 md:items-center text-sm md:text-xs text-gray-500 mb-2 md:border md:border-gray-300 rounded-full md:px-2 py-1">
                                                            <div className="flex font-semibold items-center gap-1">
                                                                <Calendar color="#040171" className="w-4 h-4 md:w-3 md:h-3 mr-1" />
                                                                <span>{card.date}</span>
                                                            </div>
                                                            <div className="flex font-bold items-center gap-1">
                                                                <Calendar color="#040171" className="w-4 h-4 md:w-3 md:h-3 mr-1" />
                                                                <span>{card.date}</span>
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <h3 className="text-lg my-3 md:my-0 font-semibold text-[#040171]">
                                                        {card.title.length > 50 ? `${card.title.substring(0, 50)}...` : card.title}
                                                    </h3>

                                                    <div className="flex items-center font-semibold text-xs text-gray-400 mt-1 gap-1">
                                                        <MapPin color="#040171" className="w-4 h-4 md:w-3 md:h-3 mr-1" />
                                                        <span>{card.location}</span>
                                                    </div>
                                                    <div className="h-full  md:hidden mt-4 flex ">

                                                        <button className="bg-orange-500  text-white text-lg px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                                                            Buy Tickets
                                                        </button>
                                                    </div>
                                                </div>


                                                <div className="h-full hidden md:flex md:border-l pl-3 items-center">

                                                    <button className="bg-orange-500  text-white text-xs px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                                                        Buy Tickets
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    ))}
                </div>
                <div className="flex items-center flex-col my-[3rem]">
                    <Link to={'/event/find'} className="flex align-center items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full hover:bg-orange-600 transition duration-300">
                        <Search size={18} />  <span className=''>Find More Events</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default FeaturedEvents;
