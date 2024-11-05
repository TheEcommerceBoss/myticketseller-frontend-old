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


const EventsInfo = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Today');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);


  const [guestCount, setGuestCount] = useState(3);

  const [step, setStep] = useState(3);
  const [isPublic, setIsPublic] = useState(false);

  const steps = [
    { number: 1, title: 'General Information', active: false },
    { number: 2, title: 'Tickets and Location', active: false },
    { number: 3, title: 'Additional Information', active: true },
  ];

  const [expectedAttendees, setExpectedAttendees] = useState(100);
  const [specialGuests, setSpecialGuests] = useState(3);
  const [selectedAudience, setSelectedAudience] = useState(['None']);
  const [notifyAuthorities, setNotifyAuthorities] = useState(false);
  const [selectedAuthorities, setSelectedAuthorities] = useState([]);

  const handleAudienceSelection = (value) => {
    if (selectedAudience.includes(value)) {
      setSelectedAudience(selectedAudience.filter(item => item !== value));
    } else {
      setSelectedAudience([...selectedAudience, value]);
    }
  };

  const handleAuthoritySelection = (value) => {
    if (selectedAuthorities.includes(value)) {
      setSelectedAuthorities(selectedAuthorities.filter(item => item !== value));
    } else {
      setSelectedAuthorities([...selectedAuthorities, value]);
    }
  };

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

  const [isPaid, setIsPaid] = useState(false);
  const [pricingCount, setPricingCount] = useState(1000);

  const handlePricingCountChange = (increment) => {
    const newCount = pricingCount + increment;
    if (newCount >= 1 && newCount <= 100000) {
      setPricingCount(newCount);
    }
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

        {/* Progress Steps */}
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





        <div className={`${theme === "dark" ? "bg-[#121212] border border-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
              <span>10</span>
            </div>
            <h2 className="text-l font-medium">Any restrictions in regard of your audience?</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['None', 'Children Only', 'Women Only', 'No Children', '18+', 'Senior Citizens'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAudienceSelection(option)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${selectedAudience.includes(option)
                    ? 'border-[#040171] bg-[#040171] text-white'
                    : 'border-gray-300'
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full border ${selectedAudience.includes(option)
                    ? 'border-white'
                    : 'border-gray-300'
                    } flex items-center justify-center`}>
                    {selectedAudience.includes(option) && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  {option}
                </button>
              ))}
            </div>

          </div>


        </div>

        <div className={`${theme === "dark" ? "bg-[#121212] border border-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>

          <div className="space-y-6">

            <div className="mb-8 flex items-center flex-col justify-center text-center items-center ">
              <div className="flex items-center mb-[2rem] mt-2">
                <div className={`w-5 h-5 rounded-full bg-transparent ${theme === "dark" ? "border-gray-200  " : "border-[#040171]"} flex items-center justify-center text-l border  mr-2`}>
                  11
                </div>
                <label className={`text-l font-normal  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                  How many users do you expect to see?
                </label>
              </div>

              <div className="flex justify-center items-center">
                <button
                  onClick={() => handlePricingCountChange(-1000)}
                  className="w-[5rem] h-12 bg-[#040171] text-white rounded-l-full flex items-center justify-center text-l"
                >
                  -
                </button>
                <span className={`w-[5rem] h-12   text-center text-l  flex items-center justify-center text-l   ${theme === "dark" ? "bg-[#222]" : "border border-[#040171]"} `}>{pricingCount}</span>
                <button
                  onClick={() => handlePricingCountChange(1000)}
                  className="w-[5rem] h-12 bg-[#040171] text-white rounded-r-full flex items-center justify-center text-l"
                >
                  +
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="space-y-8 mb-5">
          {/* Special Guests Section */}
          <div className={`${theme === "dark" ? "bg-[#121212] border border-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
                <span>12</span>
              </div>
              <h2 className="text-l font-medium">How many special guest will be there?</h2>
            </div>


            <div className="flex justify-center items-center">
              <button
                onClick={() => setGuestCount(prev => Math.max(0, prev - 1))}
                className="w-[5rem] h-12 bg-[#040171] text-white rounded-l-full flex items-center justify-center text-l"
              >
                -
              </button>
              <span className={`w-[5rem] h-12   text-center text-l  flex items-center justify-center text-l   ${theme === "dark" ? "bg-[#222]" : "border border-[#040171]"} `}>{guestCount}</span>
              <button
                onClick={() => setGuestCount(prev => prev + 1)}
                className="w-[5rem] h-12 bg-[#040171] text-white rounded-r-full flex items-center justify-center text-l"
              >
                +
              </button>
            </div>

            {/* Guest Names */}
            <div className="space-y-4 mt-5">
              <p className="text-l text-center">What are the names of your special guest?</p>
              {[...Array(guestCount)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Guest name"
                />
              ))}
            </div>

            {/* Additional Information */}
            <div className="space-y-4 mt-5">
              <p className="text-l text-center">Any additional information?</p>
              <textarea
                className="w-full p-3 border border-gray-300 text-gray-900 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                placeholder="Enter additional information"
              />
            </div>
          </div>

          <div className={`${theme === "dark" ? "bg-[#121212] border border-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
                <span>13</span>
              </div>
              <h2 className="text-l font-medium">Any authorities needs to be notified?</h2>
            </div>

            <div className="flex justify-center mt-3">
              <div className={`flex ${theme === "dark" ? "bg-[#222] border border-[#222]" : "border border-[#040171]"} rounded-[5rem] p-1`}>
                <button
                  className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${!notifyAuthorities ? 'bg-[#040171] text-[#fff]  shadow ' : theme === "dark" ? "text-[#fff]" : "text-[#040171]"} `}
                  onClick={() => setNotifyAuthorities(false)}
                >
                  No
                </button>
                <button
                  className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${notifyAuthorities ? 'bg-[#040171] text-[#fff]  shadow ' : theme === "dark" ? "text-[#fff]" : "text-[#040171]"}`}
                  onClick={() => setNotifyAuthorities(true)}
                >
                  Yes
                </button>
              </div>
            </div>


            {notifyAuthorities && (
              <div className="flex flex-col items-start md:grid  md:grid-cols-3 mt-[3rem] text-center">
                {['Police', 'Fire Department', 'Traffic Control'].map((authority, index) => (
                  <label key={index} className="flex items-center  justify-center text-center gap-2">
                    <input type="radio" name="authority" className="w-4 h-4" />
                    <span className="text-l">{authority}</span>
                  </label>
                ))}
              </div>
            )}
          </div>


          <div className={`${theme === "dark" ? "bg-[#121212] border border-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
                <span>14</span>
              </div>
              <h2 className="text-l font-medium">Is the Event Password Protected?</h2>
            </div>

            <div className="flex justify-center mt-3">
              <div className={`flex ${theme === "dark" ? "bg-[#222] border border-[#222]" : "border border-[#040171]"} rounded-[5rem] p-1`}>
                <button
                  className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${!notifyAuthorities ? 'bg-[#040171] text-[#fff]  shadow ' : theme === "dark" ? "text-[#fff]" : "text-[#040171]"} `}
                  onClick={() => setNotifyAuthorities(false)}
                >
                  No
                </button>
                <button
                  className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${notifyAuthorities ? 'bg-[#040171] text-[#fff]  shadow ' : theme === "dark" ? "text-[#fff]" : "text-[#040171]"}`}
                  onClick={() => setNotifyAuthorities(true)}
                >
                  Yes
                </button>
              </div>
            </div>


            {notifyAuthorities && (
              <div className="flex flex-col items-start md:grid  md:grid-cols-3 mt-[3rem] text-center">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Event Password"
                />
              </div>
            )}
          </div>

          <div className={`${theme === "dark" ? "bg-[#121212] border border-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
                <span>14</span>
              </div>
              <h2 className="text-l font-medium">Should be Event be Listed?</h2>
            </div>

            <div className="flex justify-center mt-3">
              <div className={`flex ${theme === "dark" ? "bg-[#222] border border-[#222]" : "border border-[#040171]"} rounded-[5rem] p-1`}>
                <button
                  className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${!notifyAuthorities ? 'bg-[#040171] text-[#fff]  shadow ' : theme === "dark" ? "text-[#fff]" : "text-[#040171]"} `}
                  onClick={() => setNotifyAuthorities(false)}
                >
                  No
                </button>
                <button
                  className={`px-[2.5rem] py-[.7rem] rounded-full text-l ${notifyAuthorities ? 'bg-[#040171] text-[#fff]  shadow ' : theme === "dark" ? "text-[#fff]" : "text-[#040171]"}`}
                  onClick={() => setNotifyAuthorities(true)}
                >
                  Yes
                </button>
              </div>
            </div>


           
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between text-center">
          <Link to={'/dashboard/event/create/1/payments/'} className={`w-[12rem] bg-opacity-50 bg-[#040171] ${theme === 'dark' ? 'border-[#DBDAFF20]' : 'border-[#DBDAFF50]'} border-4 text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}>Previous</Link>

          <div className="flex items-center gap-3 mt-2 lg:mt-0">
            <p className='text-[#040171] hidden lg:flex cursor-pointer'>Save to template</p>
            <Link to={'/dashboard/event/create/1/info/'} className={`w-[12rem] bg-[#040171] ${theme === 'dark' ? 'border-[#DBDAFF20]' : 'border-[#DBDAFF50]'} border-4 text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}>Next</Link>

          </div>
          <p className='text-[#040171] mt-1 lg:hidden cursor-pointer'>Save to template</p>

        </div>
      </div>

    </div>
  );
};

export default EventsInfo;