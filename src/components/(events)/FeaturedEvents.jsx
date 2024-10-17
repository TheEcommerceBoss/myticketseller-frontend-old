import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as necessary
import { ChevronDown, Search, Calendar } from "lucide-react";
import Select from "react-select";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles

const options = [
    { value: "location1", label: "Location 1" },
    { value: "location2", label: "Location 2" },
    { value: "location3", label: "Location 3" },
];

const eventTypeOptions = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
    { value: "type3", label: "Type 3" },
];

function FeaturedEvents() {
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
            title: "Card Title 1",
            description: "This is a description for card 1.",
            image: "https://via.placeholder.com/300",
        },
        {
            title: "Card Title 2",
            description: "This is a description for card 2.",
            image: "https://via.placeholder.com/300",
        },
        {
            title: "Card Title 3",
            description: "This is a description for card 3.",
            image: "https://via.placeholder.com/300",
        },
    ];

    return (
        <section className={`py-16 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-100'}`}>
            <div className="relative z-10 flex flex-col -mt-[6.5rem] items-center justify-center h-full text-white px-4">
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
            <div className="container mx-auto px-4 mt-[4rem]">
                <div className="text-center mb-8">
                    <h2 className={`text-xl md:text-3xl relative pb-[3rem] font-bold uppercase ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>
                        Featured Events Around You
                        <span className="absolute inset-x-0 inset-y-10 lg:inset-y-9 left-[60%] md:left-[35%]  bottom-0  flex flex-col gap-1 items-center">
                            <span className="block h-[0.15rem] w-[5rem] bg-orange-500"></span>
                            <span className="block h-[0.15rem] w-[5rem] bg-orange-500"></span>
                        </span>
                    </h2>

                    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Check out what’s trending now and grab your tickets before they sell out!
                    </p>

                    <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Here's a collection of some amazing cards.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className={`p-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedEvents;
