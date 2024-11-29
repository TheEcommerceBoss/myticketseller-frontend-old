import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import user from "../../assets/(user)/user.png";
import eventImage from "../../assets/(landing)/event.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(true); // Track loading state

  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    instagram: "",
    tiktok: "",
    twitter: "",
  });

  // Load user data into formData on component mount or when userData updates
  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData.user.email || "",
        fullname: userData.user.fullname || "",
        instagram: userData.user.instagram || "",
        tiktok: userData.user.tiktok || "",
        twitter: userData.user.twitter || "",
      });
      setLoading(false);
    }
  }, [userData]);

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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
      setLoading(true);
      const token = Cookies.get("auth_token");
      await api.post("/update_details", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-[#222]" : "bg-gray-100"
      }`}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 py-8 px-5 lg:px-8">
      
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className={`rounded-lg outline-none p-3 ${theme === "light" ? "bg-gray-200 hover:bg-gray-100" : "bg-[#121212]"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="hidden lg:flex text-2xl font-bold">Support</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link to={'/dashboard/event/create'}
              className={`rounded-full outline-none  p-3 ${theme === "light" ? "bg-gray-200  hover:bg-gray-100" : "hover:bg-[#111] bg-[#121212]"}`}
              aria-label="Toggle theme"
            >
              <PlusCircle color={theme === "light" ? "#040171" : "white"} size={20} />
            </Link>
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

        <div
          className={`${
            theme === "dark" ? "bg-[#121212]" : "border border-[#040171]"
          } rounded-lg p-6 my-6 shadow-sm`}
        >
          <div className="mb-8 flex  flex-col justify-center text-center">
            <div className="flex  mb-4">
              <label
                className={`text-l font-normal mt-1 ${
                  theme === "dark" ? "text-white" : "text-[#000]"
                }`}
              >
                Full Name
              </label>
            </div>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${
                theme === "dark" ? "text-white" : "text-[#000]"
              } font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Full Name"
            />
          </div>

          <div className="mb-8 flex  flex-col justify-center text-center">
            <div className="flex  mb-4">
              <label
                className={`text-l font-normal mt-1 ${
                  theme === "dark" ? "text-white" : "text-[#000]"
                }`}
              >
                Instagram
              </label>
            </div>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${
                theme === "dark" ? "text-white" : "text-[#000]"
              } font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Instagram Handle"
            />
          </div>

          <div className="mb-8 flex  flex-col justify-center text-center">
            <div className="flex  mb-4">
              <label
                className={`text-l font-normal mt-1 ${
                  theme === "dark" ? "text-white" : "text-[#000]"
                }`}
              >
                TikTok
              </label>
            </div>
            <input
              type="text"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${
                theme === "dark" ? "text-white" : "text-[#000]"
              } font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter TikTok Handle"
            />
          </div>

          <div className="mb-8 flex  flex-col justify-center text-center">
            <div className="flex  mb-4">
              <label
                className={`text-l font-normal mt-1 ${
                  theme === "dark" ? "text-white" : "text-[#000]"
                }`}
              >
                Twitter
              </label>
            </div>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 ${
                theme === "dark" ? "text-white" : "text-[#000]"
              } font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter Twitter Handle"
            />
          </div>
        </div>

        <div className="flex flex-col items-end text-center">
          <button
            onClick={() => handleUpdateProfile()}
            disabled={loading}
            className={`w-[12rem] 	 bg-[#040171] ${
              theme === "dark" ? "border-[#DBDAFF20]" : "border-[#DBDAFF50]"
            } ${
              loading ? "bg-opacity-50 cursor-wait " : ""
            } border-4 text-white py-3 px-4 rounded-full transition duration-200 hover:bg-blue-800`}
          >
            {!loading ? "Save Settings" : "loading..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
