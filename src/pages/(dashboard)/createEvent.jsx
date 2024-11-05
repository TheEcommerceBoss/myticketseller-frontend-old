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
import DashboardHeader from '../../components/(events)/DashboardHeader';


const CreateEvent = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Today');
  const { theme, toggleTheme } = useTheme();

    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);



  const [step, setStep] = useState(1);
  const [isPublic, setIsPublic] = useState(false);

  const steps = [
    { number: 1, title: 'General Information', active: true },
    { number: 2, title: 'Tickets and Location', active: false },
    { number: 3, title: 'Additional Information', active: false },
  ];


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
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
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

         <div className="flex pt-0 md:pt-5 justify-center flex-col md:flex-row mb-8 items-center">
          {steps.map((s, index) => (
            <>

              {index !== 0 && (

                <div
                  className={`h-[.8rem] md:h-1 w-[.15rem] md:w-[2rem] ${step >= s.number ? 'bg-[#040171]' : 'bg-gray-300'}`}
                />
              )}
              <div key={s.number} className="flex w-full px-[4rem] md:px-0 items-center">


                <div
                  className={`px-4  py-2 w-full rounded-full flex items-center justify-center text-l ${step >= s.number
                    ? 'bg-[#040171] text-white'
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
           <div className="mb-8 flex items-center flex-col justify-center text-center items-center">
            <div className="flex items-center mb-[2rem] mt-2">
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200  " : "border-[#040171]"} flex items-center justify-center text-l border  mr-2`}>
                1
              </div>
              <label className={`text-l font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                What is the Category of your Event?
              </label>
            </div>
            <select className="w-full p-3 border border-gray-300  text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select Event Category</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
            </select>
          </div>

          <div className="mb-8 mt-[2.5rem]  flex items-center flex-col justify-center text-center items-center ">
            <div className="flex items-center mb-[2rem] mt-2">
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200  " : "border-[#040171]"} flex items-center justify-center text-l border  mr-2`}>
                2
              </div>
              <label className={`text-l font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
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
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200  " : "border-[#040171]"} flex items-center justify-center text-l border  mr-2`}>
                3
              </div>
              <label className={`text-l font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
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
     
        <div className={`${theme === "dark" ? "bg-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>

          {/* Event Title */}
          <div className="mb-8 flex items-center flex-col justify-center text-center">
            <div className="flex items-center mb-4">
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200" : "border-[#040171]"} flex items-center justify-center text-l border mr-2`}>
                4
              </div>
              <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Event Title
              </label>
            </div>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Event Title"
            />
          </div>

           <div className="mb-8 flex items-center flex-col justify-center text-center">
            <div className="flex items-center mb-4">
              <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200" : "border-[#040171]"} flex items-center justify-center text-l border mr-2`}>
                5
              </div>
              <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                What is this Event about?
              </label>
            </div>
            <textarea
              rows="4"
              className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the Event"
            />
          </div>








        </div>

        <div className={`${theme === "dark" ? "bg-[#121212]" : "border border-[#040171]"}  flex flex-col items-center  rounded-lg p-6 my-6 shadow-sm`}>
          <div className="text-center mb-4">
            <div className="flex items-center mb-4">
              <div className={`w-5 h-5  rounded-full bg-transparent ${theme === "dark" ? "border-gray-200" : "border-[#040171]"} flex items-center justify-center text-l border mr-2`}>
                6
              </div>
              <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Event Picture
              </label>
            </div>
            <p className={`text-l font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>Upload main image</p>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`${theme === "dark" ? "bg-[#222]" : "bg-[#04017117]"} w-full lg:w-[50%] flex flex-col items-center justify-center border-2 border-dashed border-[#040171] rounded-lg p-6 py-[5rem] mt-3 mb-[2rem] cursor-pointer`}
          >
            <p className={`text-l font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#040171]'} mb-2`}>Drag & Drop</p>
            <label className={` text-white bg-[#040171] px-4 py-2 rounded-md cursor-pointer`}>
              Select File
              <input
                type="file"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>

          {file && (
            <div className="mt-4 text-center">
              <p className="text-l text-gray-700">Selected file: {file.name}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end text-center">
          <Link to={'/dashboard/event/create/1/payments/'} className={`w-[12rem] bg-[#040171] ${theme === 'dark' ? 'border-[#DBDAFF20]' : 'border-[#DBDAFF50]'} border-4 text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}>Next</Link>

        </div>
      </div>

    </div>
  );
};

export default CreateEvent;