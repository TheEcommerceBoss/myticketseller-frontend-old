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
import Greetings from '../../components/(snippets)/Greetings';
import { useAuth } from '../../context/AuthContext';

// Sample data for the line chart
const chartData = [
  { time: '12am', sold: 0.2, remaining: 0.8 },
  { time: '1am', sold: 0.3, remaining: 0.1 },
  { time: '2am', sold: 0.1, remaining: 0.4 },
  { time: '3am', sold: 0.5, remaining: 0.7 },
  { time: '4am', sold: 0.9, remaining: 0.0 },
  { time: '5am', sold: 0.7, remaining: 0.4 },
  { time: '6am', sold: 0.4, remaining: 0.2 },
  { time: '7am', sold: 0.9, remaining: 0.7 },
  { time: '8am', sold: 0.55, remaining: 0.05 },
];

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Today');
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

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

  const { userData } = useAuth();
  
  // console.log(userData.user.fullname)

  return (
    <div className={`flex min-h-screen  ${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'}`}>
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />


      <div className="flex-1 py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center  space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg outline-none p-3 ${theme === "light" ? "bg-gray-200  hover:bg-gray-100" : "bg-[#121212]"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="">
              <h1 className="hidden lg:flex text-2xl font-bold">Dashboard</h1>
              <span className={`hidden lg:flex ${theme != 'dark' ? 'text-[#040171]' : 'text-white'} `}><Greetings />, {userData && userData.user.fullname}</span>
              
            </div>
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

        {/* Stats Cards */}
        <div className=" grid lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Tickets Sold" value="149k" color={theme === 'dark' ? 'bg-[#121212]' : 'bg-white'} textColor={theme != 'dark' ? 'text-[#121212]' : 'text-white'} cardColor="bg-blue-300" iconColor="text-blue-700" />
          <StatCard title="Event Attendance Rate" value="90.5%" color={theme === 'dark' ? 'bg-[#121212]' : 'bg-white'} textColor={theme != 'dark' ? 'text-[#121212]' : 'text-white'} cardColor="bg-green-300" iconColor="text-green-700" />
          <StatCard title="Top Selling Events" value="10" color={theme === 'dark' ? 'bg-[#121212]' : 'bg-white'} textColor={theme != 'dark' ? 'text-[#121212]' : 'text-white'} cardColor="bg-orange-300" iconColor="text-orange-700" />
        </div>

        {/* Chart Section */}
        <div className={`p-6 rounded-xl shadow-sm mb-8 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Sold vs Remaining Tickets</h2>
            <div className="hidden lg:flex space-x-2">
              {['Today', 'Last 30 Days', 'Last 1 Year'].map((range) => (
                <button
                  key={range}
                  className={`px-4 py-2 rounded-xl text-sm ${selectedTimeRange === range
                    ? theme === 'dark' ? 'bg-[#fff] bg-opacity-10' : 'bg-white'
                    : theme === 'dark' ? 'hover:bg-[#fff] hover:bg-opacity-10' : 'hover:bg-white'
                    }`}
                  onClick={() => setSelectedTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-8 mb-4">
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-[#121212] mr-2" />
              <span className="text-sm text-gray-600">Sold Tickets</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-green-500 mr-2" />
              <span className="text-sm text-gray-600">Remaining Tickets</span>
            </div>
          </div>

          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sold" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="remaining" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Events and Calendar Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Ongoing Events */}
          <div className={`flex-1 py-5 px-3 rounded-xl ${theme === 'dark' ? 'bg-[#121212] ' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-4 pt-1 px-3 pb-1">Ongoing Events</h2>
            <div className="grid md:grid-cols-2 md:flex-row gap-3 ">
              {[1, 2].map((i) => (
                <div key={i} className={` p-4 rounded-xl ${theme === 'dark' ? 'bg-[#121212] shadow-[0_0px_4px_rgba(255,255,255,0.2)]' : 'bg-gray-100  '}`} >
                  <img src={eventImage} alt="Event" className="w-full h-48 object-cover rounded-xl mb-4" />
                  <div className="text-sm text-gray-500">Mon, Oct 31, 8:00 PM</div>
                  <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    to={'/event/view/' + i} >

                    <div className={`text-xl font-medium  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>Nicki Minaj Live at Los Angeles</div>
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">152 Members</div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className={`fw-96 p-6 mt-5 lg:mt-0 rounded-xl ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">October 2024</h2>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-400 rounded">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-1 hover:bg-gray-400 rounded">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <Calendar theme={theme} />
          </div>
        </div>
        <div className={`mt-5 flex-1 py-5 px-3 rounded-xl ${theme === 'dark' ? 'bg-[#121212] ' : 'bg-white'}`}>
          <h2 className="text-lg font-semibold mb-4 pt-1 px-3 pb-1">Upcoming Events</h2>
          <div className="grid md:grid-cols-3  lg:grid-cols-4  md:flex-row gap-3 ">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={` p-4 rounded-xl ${theme === 'dark' ? 'bg-[#121212] shadow-[0_0px_4px_rgba(255,255,255,0.2)]' : 'bg-gray-100  '}`} >
                <img src={eventImage} alt="Event" className="w-full h-48 object-cover rounded-xl mb-4" />
                <div className="text-sm text-gray-500">Mon, Oct 31, 8:00 PM</div>
                <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  to={'/event/view/' + i} >

                  <div className={`text-xl font-medium  mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#040171]'}`}>Nicki Minaj Live at Los Angeles</div>
                </Link>
                <div className="text-sm text-gray-500 mt-1">152 Members</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components

const StatCard = ({ title, value, color, textColor, cardColor, iconColor }) => (
  <div className={`flex justify-between items-center ${color} p-6 rounded-xl`}>
    <div className="">
      <div className={`text-2xl font-bold ${textColor} mt-2`}>{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
    <div className={`flex ${cardColor} bg-opacity-20 px-4 py-5 rounded-xl  rounded-b-[1.4rem]`}>
      <CalendarCogIcon className={`${iconColor} `} />
    </div>
  </div>
);

const Calendar = ({ theme }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => (
          <div
            key={date}
            className={`text-center py-2 text-sm rounded-full hover:bg-gray-100 cursor-pointer
              ${date === 23 ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
            `}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;