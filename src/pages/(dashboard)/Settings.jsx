import React, { useState, useEffect } from 'react';
import {
  Home,
  PlusCircle,
  ListChecks,
  Ticket,
  Megaphone,
  HelpCircle,
  Settings,
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
import user from "../../assets/(user)/user.png";
import eventImage from "../../assets/(landing)/event.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../../components/(events)/DashboardHeader';
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import api from "../../api";
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    email: userData && userData.user.email,
    fullname: userData && userData.user.fullname,
    instagram: '',  // Add Instagram field
    tiktok: '',     // Add TikTok field
    twitter: '',    // Add Twitter field
  });
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const token = Cookies.get("auth_token");
      await api.put('/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update profile.',
      });
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'}`}>
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 py-8 px-5 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg outline-none p-3 ${theme === "light" ? "bg-gray-200 hover:bg-gray-100" : "bg-[#121212]"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="hidden lg:flex text-2xl font-bold">Settings</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`rounded-full outline-none p-3 ${theme === "light" ? "bg-gray-200 hover:bg-gray-100" : "hover:bg-[#111] bg-[#121212]"}`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <DashboardHeader />
          </div>
        </div>

        <div className={`${theme === "dark" ? "bg-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>
          <div className="mb-8 flex items-center flex-col justify-center text-center">
            <div className="flex items-center mb-4">
              <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Email
              </label>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${theme === 'dark' ? 'text-white' : 'text-[#000]'} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-8 flex items-center flex-col justify-center text-center">
            <div className="flex items-center mb-4">
              <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Full Name
              </label>
            </div>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${theme === 'dark' ? 'text-white' : 'text-[#000]'} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Full Name"
            />
          </div>

          <div className="mb-8 flex items-center flex-col justify-center text-center">
            <div className="flex items-center mb-4">
              <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Instagram
              </label>
            </div>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${theme === 'dark' ? 'text-white' : 'text-[#000]'} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Instagram Handle"
            />
          </div>

          <div className="mb-8 flex items-center flex-col justify-center text-center">
            <div className="flex items-center mb-4">
              <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                TikTok
              </label>
            </div>
            <input
              type="text"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${theme === 'dark' ? 'text-white' : 'text-[#000]'} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter TikTok Handle"
            />
          </div>

          <div className="mb-8 flex items-center flex-col justify-center text-center">
            <div className="flex items-center mb-4">
              <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>
                Twitter
              </label>
            </div>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${theme === 'dark' ? 'text-white' : 'text-[#000]'} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Twitter Handle"
            />
          </div>
        </div>

        <div className="flex flex-col items-end text-center">
          <button
            onClick={() => handleUpdateProfile()}
            className={`w-[12rem] bg-[#040171] ${theme === 'dark' ? 'border-[#DBDAFF20]' : 'border-[#DBDAFF50]'} border-4 text-white py-3 px-4 rounded-full transition duration-200 hover:bg-blue-800`}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
