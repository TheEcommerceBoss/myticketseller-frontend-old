import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import user from "../../assets/(user)/user.png";
import Confetti from "react-confetti";
import eventImage from "../../assets/(landing)/event.png";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { eventsApi } from "../../shared/services/api/eventsApi";
import axios from "axios";

const CompletedCreation = () => {
  let { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    specific_type: true,
    event_title: "",
    event_description: "",
    event_image: "",
  });

  console.log(formData);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getEventById(id);

        console.log(response.data);

        // TODO: Update the formData state with the fetched event details
        if (response.data) {
          const { category, event_specific_type, title, description, image } =
            response.data;
        }
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      }
    };

    fetchEvents();
  }, [id]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex min-h-screen  ${
        theme === "dark" ? "bg-[#222]" : "bg-gray-100"
      }`}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 px-5 py-8 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg outline-none p-3 ${
                theme === "light"
                  ? "bg-gray-200  hover:bg-gray-100"
                  : "bg-[#121212]"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="hidden text-2xl font-bold lg:flex">Add New Event</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:flex">
              <Search className="absolute w-5 h-5 text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search"
                className={`pl-10 pr-4 py-2 rounded-[4rem] border ${
                  theme === "dark"
                    ? "bg-[#222]  border-[#444]"
                    : "bg-transparent  border-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button
              className={`rounded-full outline-none  p-3 ${
                theme === "light"
                  ? "bg-gray-200  hover:bg-gray-100"
                  : "hover:bg-[#111] bg-[#121212]"
              }`}
              aria-label="Toggle theme"
            >
              <Bell fill={theme === "light" ? "#040171" : "white"} size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className={`rounded-full outline-none p-3 ${
                theme === "light"
                  ? "bg-gray-200  hover:bg-gray-100"
                  : "hover:bg-[#111] bg-[#121212]"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <DashboardHeader />
          </div>
        </div>

        <div
          className={`${
            theme === "dark"
              ? "bg-[#121212] border border-[#121212]"
              : "border border-[#040171]"
          } rounded-lg p-6 my-6 shadow-sm`}
        >
          <div className="w-full p-6 mx-auto space-y-8">
            <div className="flex flex-col items-center justify-between gap-5 pb-6 border-b lg:flex-row lg:gap-0">
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-col items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                  <Check className="w-5 h-5 font-bold text-white" />
                </div>
                <div className="flex flex-col items-center justify-center ">
                  <h1
                    className={`text-xl  ${
                      theme != "dark" ? "text-[#040171]" : "text-white"
                    }`}
                  >
                    Event Has been Created successfully
                  </h1>
                </div>
              </div>

              <div className="flex items-end gap-5">
                <Link
                  to={"/dashboard/event/manage"}
                  className="px-5 py-2 text-sm bg-[#040171] text-white rounded-full hover:bg-[#040171] transition-colors"
                >
                  Take me to my Dashboard
                </Link>
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
