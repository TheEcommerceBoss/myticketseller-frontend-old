import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as necessary
import { ChevronDown, Search, Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Heart, Upload } from "lucide-react";
import Select from "react-select";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles
import { Link } from "react-router-dom";
import eventImage from "../../assets/(landing)/event.png"
import event2Image from "../../assets/(landing)/event2.png"
import event3Image from "../../assets/(landing)/event3.png"
import event4Image from "../../assets/(landing)/event4.png"
import user from "../../assets/(user)/user.png"
import map from "../../assets/(utils)/map.png"
import { Share2 } from 'lucide-react';
import TicketModal from "./TicketModal";
import { useParams } from "react-router-dom";
// Header Component

const Header = ({ theme, id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (

        <div className="mb-8">
            <div className="flex justify-between items-center">
                <div className="text-gray-600 flex flex-col items-center">
                    <p>Friday, September 28</p>
                </div>
                <div className="">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Share2 className="w-4 h-4" />
                    </button> </div>
            </div>
            <div className="flex flex-col md:flex-row mt-4 justify-between items-start">
                <h1 className={`text-2xl md:text-3xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>
                    Nicki Minaj Concert Live at<br />Los Angeles
                </h1>
                <div className="flex gap-2">
                    <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-4 py-2 mt-2 md:mt-0 rounded-md">
                        Buy Tickets
                    </button>

                </div>
            </div>
            {isModalOpen && (
                <TicketModal
                    eventId={12}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

// Host Info Component
const HostInfo = ({ theme }) => (
    <div className={`lg:w-1/2 rounded-lg p-6 shadow-sm mb-8 ${theme === 'dark' ? 'bg-[#000]' : 'bg-white '}`}>
        <div className="flex items-center gap-4">
            <img
                src={user}
                alt="Host"
                className="w-12 h-12 object-cover object-center rounded-full"
            />
            <div className="flex-grow">
                <div className={`text-xl font-medium  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}  >Hosted by: Jane Doe</div>
                <div className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full inline-block mt-1">
                    3,000 Events Hosted
                </div>
            </div>
            <div className="flex gap-4">
                <a href="#" className="hover:opacity-75">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>
                <a href="#" className="hover:opacity-75">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>
                <a href="#" className="hover:opacity-75">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
);

// DateTime Component
const DateTime = ({ theme }) => (
    <div className="mb-8">
        <h2 className={`text-xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>Date and Time</h2>
        <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-600' : 'text-[#040171]'}`}>
            <Calendar className="w-5 h-5" />
            <span>October 4 · 10pm - October 5 · 4am EDT</span>
        </div>
    </div>
);

// Location Component
const Location = ({ theme }) => {
    const [showMap, setShowMap] = useState(true);

    return (
        <div className="mb-8">
            <h2 className={`text-xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>Location</h2>
            <div className={`flex items-start gap-2 ${theme === 'dark' ? 'text-gray-600' : 'text-[#040171]'}`}>
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                    <div className="font-medium">POLYGON BROOKLYN</div>
                    <div>299 Vandervoort Avenue Brooklyn, NY 11211</div>
                </div>
            </div>
            <button
                className="text-blue-600 font-medium flex items-center gap-1 mt-2"
                onClick={() => setShowMap(!showMap)}
            >
                {showMap ? 'Hide Map' : 'Show Map'}
                <ChevronDown className={`w-4 h-4 transform ${showMap ? 'rotate-180' : ''}`} />
            </button>
            {showMap && (
                <div className="mt-4 h-64 bg-gray-200 rounded-[2rem] overflow-hidden">
                    <img
                        src={map}
                        alt="Map"
                        className="w-full h-full object-cover"
                    />
                </div>
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
            <h2 className={`text-xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>
                Frequently Asked Questions
            </h2>
            {questions.map((q, index) => (
                <div key={q.id} className={`border-b ${theme === 'dark' ? ' border-gray-700' : ' border-gray-200'}`}>
                    <button
                        className="w-full py-4 text-left flex justify-between items-center"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <span className={`${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>{q.question}</span>
                        <ChevronDown
                            className={`w-5 h-5 text-gray-600 transform transition-transform ${openIndex === index ? 'rotate-180' : ''
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
        'United States',
        'New York',
        'Concert',
        'Shows',
        'Night Life in America',
        'hiphop',
        'Concert Night'
    ];

    return (
        <div >
            <h2 className={`text-xl font-bold mb-3  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>Tags</h2>

            <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

function ViewEventComponent({ variation }) {
    const { theme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {id} = useParams();
    console.log(id);
  


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
    ];


    return (
        <section className={`py-10 pb-16 ${theme === 'dark' ? 'bg-[#111]' : 'bg-gray-100'}`}>

            <div className="flex flex-col  items-center p-5">
                <img src={event2Image} className="w-full  lg:w-4/5 mb-5 rounded-[2rem]" alt="" />
            </div>
            <div className="max-w-7xl mx-auto p-6">
                <Header theme={theme} id={1} />
                <HostInfo theme={theme} />
                <DateTime theme={theme} />
                <Location theme={theme} />

                <div className="mb-8">
                    <h2 className={`text-xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>Refund Policy</h2>
                    <p className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-600'}`}>No Refund</p>
                </div>

                <div className="mb-8">
                    <h2 className={`text-xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>About Event</h2>
                    <p className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-600'}`}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

                <FAQ theme={theme} />

                <div>
                    <Tags theme={theme} />
                </div>
                <div className={`flex flex-col items-center my-[3rem]`}>
                    <div className="flex flex-col w-full px-2 my-5 items-start text-start">
                        <h2 className={`text-xl font-bold text-start  ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>More Events From this Organizer</h2>

                    </div>
                    <div className={`flex flex-col gap-8 px-2 `}>
                        {cards.map((card, index) => (
                            <>
                                {

                                    <div className="overflow-hidden bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl shadow-md   lg:rounded-none lg:shadow-none   flex flex-col lg:flex-row  lg:gap-5 mb-4">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className=" w-full h-[12rem] lg:w-1/4 rounded-xl object-cover"
                                        />
                                        <div className="rounded-xl lg:shadow-md  bg-white p-4 py-[2.5rem] flex flex-col justify-between w-full mt-2 lg:mt-0 lg:w-3/4">
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




                                                    <Link   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
 to={'/event/view/' + card.id} className="text-lg my-3 md:my-0 font-semibold text-[#040171]">
                                                        {card.title.length > 50 ? `${card.title.substring(0, 50)}...` : card.title}
                                                    </Link>

                                                    <div className="flex items-center font-semibold text-xs text-gray-600 mt-1 gap-1">
                                                        <MapPin color="#040171" className="w-4 h-4 md:w-3 md:h-3 mr-1" />
                                                        <span>{card.location}</span>
                                                    </div>
                                                    <div className="h-full  md:hidden mt-4 flex ">

                                                        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500  text-white text-lg px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                                                            Buy Tickets
                                                        </button>
                                                    </div>
                                                </div>


                                                <div className="h-full hidden md:flex md:border-l pl-3 items-center">

                                                    <button onClick={() => setIsModalOpen(true)} className="bg-orange-500  text-white text-xs px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
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
                </div>
                    <TicketModal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} eventId={id} eventTitle="Nicki Minaj Live at Los Angeles" eventDateTime="October 4 · 10pm - October 5 · 4am EDT" />
            </div>
        </section>
    );
}



export default ViewEventComponent;
