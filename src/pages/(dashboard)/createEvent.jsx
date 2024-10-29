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
} from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import SideBar from '../../components/(headers)/DashboardSidebar';
import user from "../../assets/(user)/user.png"
import eventImage from "../../assets/(landing)/event.png"
import { Link } from 'react-router-dom';


const CreateEvent = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Today');
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);


  const [step, setStep] = useState(1);
  const [isPublic, setIsPublic] = useState(false);

  const steps = [
    { number: 1, title: 'General Information', active: true },
    { number: 2, title: 'Payment and Location', active: false },
    { number: 3, title: 'Additional Information', active: false },
  ];


  useEffect(() => {
    // Function to determine if screen is large or small
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // True for large screens (lg breakpoint at 1024px and above)
        setIsOpen(true);
      } else {
        // False for smaller screens
        setIsOpen(false);
      }
    };

    // Call once when the component mounts
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

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

            <img src={user} alt="Profile" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex pt-0 md:pt-5 justify-center flex-col md:flex-row mb-8 items-center">
          {steps.map((s, index) => (
            <>

              {index !== 0 && (

                <div
                  className={`h-[.8rem] md:h-1 w-[.15rem] md:w-[2rem] ${step >= s.number ? 'bg-blue-900' : 'bg-gray-300'}`}
                />
              )}
              <div key={s.number} className="flex w-full px-[4rem] md:px-0 items-center">


                <div
                  className={`px-4  py-2 w-full rounded-full flex items-center justify-center text-sm ${step >= s.number
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-300 text-gray-600'
                    }`}
                >
                  {s.number}. {s.title}
                </div>
              </div>
            </>
          ))}
        </div>


        <div className={` ${theme === "dark" ? "bg-[#121212]  " : " border border-[#040171]"} rounded-lg p-6 md:px-[3rem]  my-6 shadow-sm`}>
          {/* Category Selection */}
          <div className="mb-8 flex items-center flex-col justify-center text-center items-center">
            <div className="flex items-center mb-[2rem] mt-2">
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200  " : "border-[#040171]"} flex items-center justify-center text-sm border  mr-2`}>
                1
              </div>
              <label className={`text-sm font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                What is the Category of your Event?
              </label>
            </div>
            <select className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select Event Category</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
            </select>
          </div>

          <div className="mb-8 mt-[2.5rem]  flex items-center flex-col justify-center text-center items-center ">
            <div className="flex items-center mb-[2rem] mt-2">
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200  " : "border-[#040171]"} flex items-center justify-center text-sm border  mr-2`}>
                2
              </div>
              <label className={`text-sm font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Select Subcategory
              </label>
            </div>
            <select className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select Subcategory</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="design">Design</option>
            </select>
          </div>

        </div>
        <div className={` ${theme === "dark" ? "bg-[#121212]  " : " border border-[#040171]"} rounded-lg p-6 md:px-[3rem]  my-6 shadow-sm`}>

          <div className="mb-8 flex items-center flex-col justify-center text-center items-center ">
            <div className="flex items-center mb-[2rem] mt-2">
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200  " : "border-[#040171]"} flex items-center justify-center text-sm border  mr-2`}>
                3
              </div>
              <label className={`text-sm font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Is this a Private or Public Event?
              </label>
            </div>
            <div className={`flex ${theme === "dark" ? "bg-[#222]" : "border border-[#040171]"} rounded-[5rem] p-1`}>
              <button
                onClick={() => setIsPublic(false)}
                className={`px-[10vw] lg:px-[5vw] py-[.3rem] rounded-l-[5rem] ${!isPublic ? 'bg-[#040171] text-white' : theme === "dark" ? "bg-[#222]" : ""
                  }`}
              >
                Private
              </button>
              <button
                onClick={() => setIsPublic(true)}
                className={`px-[10vw] lg:px-[5vw] py-[.3rem] rounded-r-[5rem] ${isPublic ? 'bg-[#040171] text-white' : theme === "dark" ? "bg-[#222]" : ""
                  }`}
              >
                Public
              </button>
            </div>

          </div>
        </div>
        <div className={`${theme === "dark" ? "bg-[#121212]" : "border border-[#040171]"} rounded-lg p-6 md:px-[3rem] my-6 shadow-sm`}>
          {/* Month Selection */}
          <div className="mb-8 flex items-center flex-col justify-center text-center">
            <div className="flex items-center mb-[2rem] mt-2">
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200" : "border-[#040171]"} flex items-center justify-center text-sm border mr-2`}>
                4
              </div>
              <label className={`text-sm font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                When will this Event be?
              </label>
            </div>
            <select className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Month</option>
              {/* Add options as needed */}
            </select>
          </div>

          {/* Start Date Selection */}
          <div className="mb-8 flex items-start flex-col justify-center text-center">
            <div className="flex flex-col items-start mb-4">
              <label className={`text-sm font-normal ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Starts
              </label>
            </div>
            <input
              type="text"
              placeholder="Thu, Mar 22, 2024"
              className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* End Date Selection */}
          <div className="mb-8 flex items-start flex-col justify-center text-center">
            <div className="flex flex-col items-start mb-4">
              <label className={`text-sm font-normal ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                End By
              </label>
            </div>
            <input
              type="text"
              placeholder="Thu, Mar 22, 2024"
              className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time Selection */}
          <div className="flex items-center mb-[2rem] mt-2">
            <label className={`text-sm font-normal ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
              Time
            </label>
          </div>
        <div className="flex items-center justify-between mb-4">

            <div className="flex flex-col items-center w-1/2 pr-2">

              <input
                type="text"
                placeholder="11:00AM"
                className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <span className="px-2">—</span>
            <div className="flex flex-col items-center w-1/2 pl-2">
              <input
                type="text"
                placeholder="11:00AM"
                className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="text-right">
            <a href="#" className="text-blue-600 font-semibold">
              Customize
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CreateEvent;