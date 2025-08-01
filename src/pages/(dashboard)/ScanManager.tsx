import { useState, useEffect } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  PlusCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
  Moon,
  Sun,
  CalendarCogIcon,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import Greetings from "../../components/(snippets)/Greetings";
import { useAuth } from "../../context/AuthContext";
import { dashboardApi } from "../../shared/services/api/index";
import { eventsApi } from "../../shared/services/api/eventsApi";

const ScanManager = () => {
  // const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
  const { theme, toggleTheme } = useTheme();
  const [chartData, setChartData] = useState([]);
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

  const { userData } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [Stats, setStats] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0); // State to store total tickets

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await eventsApi.getMyEvents();
        setEvents(events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };
    fetchEvents();
  }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats();

        console.log(response.data);
        setStats(response.data.event_days);

        // Month names for formatting
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        // Formatter function
        const formatMonthYear = (month, year) =>
          `${monthNames[month - 1]} '${year.toString().slice(-2)}`;

        // Transform original data for events
        const transformedEventData =
          response.data.event_creation_rate &&
          response.data.event_creation_rate.map((entry) => ({
            month: entry.month,
            year: entry.year,
            total_events: entry.total_events,
          }));

        // Transform original data for successful transactions
        const transformedSuccessfulTransactions =
          response.data &&
          response.data.successful_transactions.map((entry) => ({
            month: entry.month,
            year: entry.year,
            total_scans: entry.total_scans,
            total_tickets: entry.total_tickets,
          }));

        // Get the latest month and year from transformedEventData
        const latestEntry =
          transformedEventData[transformedEventData.length - 1];
        const latestDate = new Date(latestEntry.year, latestEntry.month - 1); // Month is zero-indexed

        // Generate the last five months and one future month
        const requiredMonths = [];
        for (let i = -5; i <= 1; i++) {
          const date = new Date(
            latestDate.getFullYear(),
            latestDate.getMonth() + i
          );
          requiredMonths.push({
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            total_events: 0,
            total_scans: 0, // Default successful transactions value
            total_tickets: 0, // Default successful transactions value
            label: formatMonthYear(date.getMonth() + 1, date.getFullYear()), // Add formatted label
          });
        }

        // Update requiredMonths with actual data from both transformed data arrays
        const paddedData =
          requiredMonths &&
          requiredMonths.map((required) => {
            const eventData = transformedEventData.find(
              (entry) =>
                entry.month === required.month && entry.year === required.year
            );
            const successfulTransactionData =
              transformedSuccessfulTransactions.find(
                (entry) =>
                  entry.month === required.month && entry.year === required.year
              );

            // Update total_events, total_scans, and total_tickets
            return {
              ...required,
              total_events: eventData
                ? eventData.total_events
                : required.total_events,
              total_scans: successfulTransactionData
                ? successfulTransactionData.total_scans
                : required.total_scans,
              total_tickets: successfulTransactionData
                ? successfulTransactionData.total_tickets
                : required.total_tickets,
            };
          });

        // Update chartData state
        setChartData(paddedData);

        // Calculate the total tickets (sum of total_tickets for all months)
        const totalTickets = paddedData.reduce(
          (acc, entry) => acc + entry.total_tickets,
          0
        );
        setTotalTickets(totalTickets); // Update the total tickets state

        console.table(paddedData);
      } catch (error) {
        console.error("Failed to fetch Stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
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

            <div className="">
              <h1 className="hidden text-2xl font-bold lg:flex">
                Scan Manager
              </h1>
              <span
                className={`hidden lg:flex ${
                  theme != "dark" ? "text-[#040171]" : "text-white"
                } `}
              >
                <Greetings />, {userData && userData.user.fullname}
              </span>
            </div>
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
            <Link
              to={"/dashboard/event/create"}
              className={`rounded-full outline-none  p-3 ${
                theme === "light"
                  ? "bg-gray-200  hover:bg-gray-100"
                  : "hover:bg-[#111] bg-[#121212]"
              }`}
              aria-label="Toggle theme"
            >
              <PlusCircle
                color={theme === "light" ? "#040171" : "white"}
                size={20}
              />
            </Link>
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

        {/* Events and Calendar Section */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Ongoing Events */}
          <div
            className={`flex-1 py-5 px-3 rounded-xl ${
              theme === "dark" ? "bg-[#121212] " : "bg-white"
            }`}
          >
            <h2 className="px-3 pt-1 pb-1 mb-4 text-lg font-semibold">
              Select Events
            </h2>
            <div className="grid gap-3 lg:grid-cols-4 md:flex-row ">
              {loading ? (
                <div className="flex items-center justify-center ">
                  <div className="w-full p-4 m-1 mx-auto border border-gray-100 rounded-md">
                    <div className="flex space-x-4 animate-pulse">
                      <div className="rounded-full bg-slate-700 h-[2rem] w-[2rem]"></div>
                      <div className="flex-1 py-1 space-y-6">
                        <div className="h-[1rem] bg-slate-700 rounded"></div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-[1rem] bg-slate-700 rounded col-span-2"></div>
                            <div className="h-[1rem] bg-slate-700 rounded col-span-1"></div>
                          </div>
                          <div className="h-[1rem] bg-slate-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : events.length === 0 ? (
                <div className="flex items-center justify-center h-96">
                  <span>No events found</span>
                </div>
              ) : (
                events.map((event, index) => (
                  <div
                    key={index}
                    className={` p-4 rounded-xl ${
                      theme === "dark"
                        ? "bg-[#121212] shadow-[0_0px_4px_rgba(255,255,255,0.2)]"
                        : "bg-gray-100  "
                    }`}
                  >
                    <img
                      src={event.event_img}
                      alt="Event"
                      className="object-cover w-full h-24 mb-4 rounded-xl"
                    />
                    <Link
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      to={"/dashboard/event/scan/" + event.event_id}
                    >
                      <div
                        className={`text-xl font-medium text-center  mt-1 ${
                          theme === "dark" ? "text-white" : "text-[#040171]"
                        }`}
                      >
                        {event.event_title}
                      </div>
                    </Link>

                    <div className="flex">
                      <Link
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        to={"/dashboard/event/scan/" + event.event_id}
                        type="submit"
                        className="w-full py-3 mt-3 font-semibold text-center text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
                      >
                        Manage Scanner
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
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
    <div
      className={`flex ${cardColor} bg-opacity-20 px-4 py-5 rounded-xl  rounded-b-[1.4rem]`}
    >
      <CalendarCogIcon className={`${iconColor} `} />
    </div>
  </div>
);

const Calendar = ({ theme, Stats }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  console.log(Stats);

  // Set the initial currentMonth to the actual current date
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Use the actual current date
  const [today, setToday] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    setToday(currentDate.getDate());
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth(
      (prevMonth) => new Date(prevMonth.setMonth(prevMonth.getMonth() - 1))
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prevMonth) => new Date(prevMonth.setMonth(prevMonth.getMonth() + 1))
    );
  };

  // Generate the dates for the current month
  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const numDaysInMonth = endOfMonth.getDate();

  const dates = Array.from({ length: numDaysInMonth }, (_, i) => i + 1);

  // Function to check if a date has an event in the same month and year
  const isEventDay = (date) => {
    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth() + 1; // Months are 0-indexed in JavaScript

    for (const [eventId, eventDates] of Object.entries(Stats)) {
      for (const eventDate of eventDates) {
        const eventDateObj = new Date(eventDate);
        const eventYear = eventDateObj.getFullYear();
        const eventMonth = eventDateObj.getMonth() + 1; // Months are 0-indexed

        // If the year and month match and the day is the same
        if (
          eventYear === currentYear &&
          eventMonth === currentMonthIndex &&
          eventDateObj.getDate() === date
        ) {
          return eventId; // Return the eventId when found
        }
      }
    }
    return false;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousMonth}
            className="p-1 rounded hover:bg-gray-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded hover:bg-gray-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {days &&
          days.map((day) => (
            <div key={day} className="text-sm text-center text-gray-500">
              {day}
            </div>
          ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates &&
          dates.map((date) => {
            const eventId = isEventDay(date); // Check if there's an event for this date
            return (
              <div
                key={date}
                className={`text-center py-2 text-sm rounded-full hover:bg-gray-500 cursor-pointer
                ${
                  date === today
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : ""
                }
                ${eventId ? "bg-red-500 bg-opacity-50  text-white" : ""}
              `}
              >
                {eventId ? (
                  <Link
                    to={`/event/view/${eventId}`}
                    className="font-bold text-white"
                  >
                    {date}
                  </Link>
                ) : (
                  date
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ScanManager;
