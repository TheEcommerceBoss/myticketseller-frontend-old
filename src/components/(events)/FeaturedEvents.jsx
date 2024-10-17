import React from "react";
import { useTheme } from "../../context/ThemeContext";  // Adjust path as necessary
import { ArrowBigDownIcon, Search } from "lucide-react";
import Select from "react-select";
const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
];

function FeaturedEvents() {
    const { theme } = useTheme();
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            borderColor: "#d1d5db", // border-gray-300
            padding: "6px 12px",
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            padding: 0,
        }),
        indicatorSeparator: () => null,
    };

    const DropdownIndicator = () => (
        <div className="flex items-center pr-2">
            <ArrowBigDownIcon className="w-5 h-5 text-gray-500" />
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
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="relative z-10 flex flex-col -mt-[6.5rem] items-center justify-center h-full text-white px-4">

                <div className="bg-white rounded-[2rem] p-2 w-full max-w-6xl flex  flex-col md:flex-row items-center shadow-lg">
                    <input
                        type="text"
                        placeholder="Search by name or type"
                        className="flex-grow px-6 py-3 rounded-[2rem] focus:outline-none text-gray-500 placeholder-gray-400"
                    />
                    <div className="flex flex-col  md:flex-row w-full md:w-">
                        <div className="px-4 py-2 w-full flex justify-between md:flex-col md:border-l md:border-b-0 border-b border-gray-300">
                            <p className="text-blue-800 font-semibold mb-1">Date</p>
                            <select className="text-gray-500 focus:outline-none bg-transparent">
                                <option><ArrowBigDownIcon /></option>
                            </select>
                        </div>
                        <div className="px-4 py-2 w-full flex justify-between md:flex-col md:border-l md:border-b-0 border-b border-gray-300">
                            <p className="text-blue-800 font-semibold mb-1">Location</p>
                            <Select
                                options={options}
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                placeholder="Select an option"
                                isSearchable={false}
                            />
                        </div>
                        <div className="px-4 py-2 w-full flex justify-between md:flex-col md:border-l md:border-b-0 border-b border-gray-300">
                            <p className="text-blue-800 font-semibold mb-1">Event Type</p>
                            <select className="text-gray-500 focus:outline-none bg-transparent">
                                <option><ArrowDown /></option>
                            </select>
                        </div>
                    </div>
                    <button className="bg-blue-600 text-white p-4 rounded-full ml-2">
                        <Search size={24} />
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        Our Cards {theme}
                    </h2>
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
