import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
    Home,
    PlusCircle,
    ListChecks,
    Ticket,
    Megaphone,
    Settings,
    HelpCircle,
    Menu,
    ChevronLeft,
    ChevronRight,
    Search,
    Moon,
    Sun,
    CalendarCogIcon,
    BellDot,
    Bell,
    X,
    Check,
} from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import SideBar from '../../components/(headers)/DashboardSidebar';
import user from "../../assets/(user)/user.png"
import Confetti from 'react-confetti';
import eventImage from "../../assets/(landing)/event.png"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/(events)/DashboardHeader';


const CompletedCreation = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('Today');
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [showConfetti, setShowConfetti] = useState(true);
    


    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);


    const navigate = useNavigate();



    setTimeout(() => {
        setShowConfetti(false);
    }, 3 * 60 * 1000);


    useEffect(() => {


        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };




    return (
        <div className={`flex min-h-screen  ${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'}`}>
            <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />


            <div className="flex-1 py-8 px-5 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center  space-x-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`rounded-lg outline-none p-3 ${theme === "light" ? "bg-gray-200  hover:bg-gray-100" : "bg-[#121212]"}`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <h1 className="hidden lg:flex text-2xl font-bold">Add New Event</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search"
                                className={`pl-10 pr-4 py-2 rounded-[4rem] border ${theme === 'dark' ? 'bg-[#222]  border-[#444]' : 'bg-transparent  border-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                        <button
                            className={`rounded-full outline-none  p-3 ${theme === "light" ? "bg-gray-200  hover:bg-gray-100" : "hover:bg-[#111] bg-[#121212]"}`}
                            aria-label="Toggle theme"
                        >
                            <Bell fill={theme === "light" ? "#040171" : "white"} size={20} />
                        </button>
                        <button
                            onClick={toggleTheme}
                            className={`rounded-full outline-none p-3 ${theme === "light" ? "bg-gray-200  hover:bg-gray-100" : "hover:bg-[#111] bg-[#121212]"}`}
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <DashboardHeader />
                    </div>
                </div>


                <div className={`${theme === "dark" ? "bg-[#121212] border border-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>

                    <div className="w-full mx-auto p-6 space-y-8">
                        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between border-b pb-6 items-center">
                            <div className="flex  flex-row items-center gap-3">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex flex-col items-center justify-center">
                                    <Check className="w-5 font-bold h-5 text-white" />
                                </div>
                                <div className="flex flex-col items-center justify-center ">
                                    <h1 className="text-xl text-[#040171]">Event Has been Created successfully</h1>
                                </div>
                            </div>

                            <div className="flex gap-5 items-end">
                                <button className="px-5 py-2 text-sm bg-[#040171] text-white rounded-full hover:bg-[#040171] transition-colors">
                                    Take me to my Dashboard
                                </button>

                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-gray-600 text-xs font-medium">Event Name</p>
                            <h2 className="text-2xl font-bold text-[#040171]">Nicki Minaj Live at Los Angeles</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-bold mb-2">5 Ticket Types</h3>
                                <p className="text-gray-600">5 TIcket Types</p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">DATE</h3>
                                <p className="text-gray-600">October 4 · 10pm - October 5 · 4am EDT</p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">LOCATION</h3>
                                <p className="text-gray-600">Los Angeles, USA</p>
                            </div>
                        </div>


                    </div>

                </div>

            </div>

            {showConfetti && <Confetti numberOfPieces={100} />}
        </div>
    );
};

export default CompletedCreation;