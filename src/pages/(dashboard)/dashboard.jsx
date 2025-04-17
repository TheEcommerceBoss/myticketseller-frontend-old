/* eslint-disable no-unused-vars */
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
  PlusCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
  Moon,
  Sun,
  CalendarCogIcon,
  X,
  Eye,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import Greetings from "../../components/(snippets)/Greetings";
import { useAuth } from "../../context/AuthContext";

import { eventsApi, dashboardApi } from "../../shared/services/api.ts";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
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
  // console.log(userData&&userData.user)

  // console.log(userData&& userData.user.balance)

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [Stats, setStats] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0); // State to store total tickets
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = Cookies.get("auth_token");

        // Trigger both API requests concurrently
        const [events, statsResponse] = await Promise.all([
          eventsApi.getMyEvents(),
          dashboardApi.getStats(),
        ]);

        // api.post("/get-dashboard-stats", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }),
        // console.log(eventsResponse);
        // Process events data
        setEvents(events);

        // Process stats data
        const statsData = statsResponse;
        setStats(statsData.event_days);

        // console.log(statsData, events);

        // Process your chart data logic
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

        const formatMonthYear = (month, year) =>
          `${monthNames[month - 1]} '${year.toString().slice(-2)}`;

        const transformedEventData = statsData.event_creation_rate.map(
          (entry) => ({
            month: entry.month,
            year: entry.year,
            total_events: entry.total_events,
          })
        );

        const transformedSuccessfulTransactions =
          statsData.successful_transactions.map((entry) => ({
            month: entry.month,
            year: entry.year,
            total_scans: entry.total_scans,
            total_tickets: entry.total_tickets,
          }));

        const latestEntry =
          transformedEventData.length > 0
            ? transformedEventData[transformedEventData.length - 1]
            : {};
        const latestDate = new Date(latestEntry.year, latestEntry.month - 1);

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
            total_scans: 0,
            total_tickets: 0,
            label: formatMonthYear(date.getMonth() + 1, date.getFullYear()),
          });
        }

        const paddedData = requiredMonths.map((required) => {
          const eventData = transformedEventData.find(
            (entry) =>
              entry.month === required.month && entry.year === required.year
          );
          const successfulTransactionData =
            transformedSuccessfulTransactions.find(
              (entry) =>
                entry.month === required.month && entry.year === required.year
            );

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

        setChartData(paddedData);

        const totalTickets = paddedData.reduce(
          (acc, entry) => acc + entry.total_tickets,
          0
        );
        setTotalTickets(totalTickets);

        // console.table(paddedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
              <h1 className="hidden text-2xl font-bold lg:flex">Dashboard</h1>
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

        {/* Stats Cards */}
        <div className="grid gap-6 mb-8 lg:grid-cols-3">
          <StatCard
            title="Balance"
            value={
              "₦" +
              (userData
                ? new Intl.NumberFormat("en-US").format(userData.user.balance)
                : "0.00")
            }
            color={theme === "dark" ? "bg-[#121212]" : "bg-white"}
            textColor={theme != "dark" ? "text-[#121212]" : "text-white"}
            cardColor="bg-green-300"
            iconColor="text-green-700"
          />
          <StatCard
            title="Tickets Sold"
            value={totalTickets}
            color={theme === "dark" ? "bg-[#121212]" : "bg-white"}
            textColor={theme != "dark" ? "text-[#121212]" : "text-white"}
            cardColor="bg-blue-300"
            iconColor="text-blue-700"
          />
          <StatCard
            title="Events Created"
            value={events.length}
            color={theme === "dark" ? "bg-[#121212]" : "bg-white"}
            textColor={theme != "dark" ? "text-[#121212]" : "text-white"}
            cardColor="bg-orange-300"
            iconColor="text-orange-700"
          />
        </div>

        {/* Chart Section */}
        <div
          className={`p-6 rounded-xl shadow-sm mb-8 ${
            theme === "dark" ? "bg-[#121212]" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Account Stats</h2>
            <div className="hidden space-x-2 lg:flex">
              <button
                className={`px-4 py-2 rounded-xl text-sm ${
                  theme === "dark" ? "bg-[#fff] bg-opacity-10" : "bg-white"
                }`}
              >
                Export Data
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4 space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-[#f97316] mr-2" />
              <span className="text-sm text-gray-600">Created Events</span>
            </div>

            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-green-500 mr-2" />
              <span className="text-sm text-gray-600">Sold Tickets</span>
            </div>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            {loading ? (
              <div className="flex items-center justify-center">
                <CircularProgress size={40} />
              </div>
            ) : (
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  {" "}
                  {/* Use paddedData with labels */}
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" /> {/* Set X-axis to use the label */}
                  <YAxis />
                  <Tooltip
                    content={({ payload }) => {
                      // Check if there's data to display
                      if (payload && payload.length > 0) {
                        const { total_events, total_scans, total_tickets } =
                          payload[0].payload; // Accessing payload of the first line

                        return (
                          <div className="custom-tooltip">
                            <p>
                              <strong>Created Events:</strong> {total_events}
                            </p>
                            <p>
                              <strong>Sold Tickets:</strong> {total_tickets}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total_tickets"
                    stroke="#4caf50"
                    strokeWidth={2}
                  />{" "}
                  {/* Line for successful transactions */}
                  <Line
                    type="monotone"
                    dataKey="total_events"
                    stroke="#f97316"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
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
              Recent Events
            </h2>
            <div
              className={`${
                loading ? "md:grid-cols-1" : "md:grid-cols-2"
              } grid md:flex-row gap-3 `}
            >
              {loading ? (
                <div className="flex items-center justify-center h-24">
                  <CircularProgress size={40} />
                </div>
              ) : events.length === 0 ? (
                <div className="flex items-center justify-center h-96">
                  <span>No events found</span>
                </div>
              ) : (
                events.slice(0, 5).map((event, index) => (
                  <div
                    key={index}
                    className={` p-4 rounded-xl ${
                      theme === "dark"
                        ? "bg-[#121212] shadow-[0_0px_4px_rgba(255,255,255,0.2)]"
                        : "bg-gray-100  "
                    }`}
                  >
                    {event.image && (
                      <img
                        src={event.image || ""}
                        alt="Event"
                        className="object-cover w-full h-48 mb-4 rounded-xl"
                      />
                    )}
                    <div className="text-sm text-gray-500">
                      {event.created_at}
                    </div>
                    <Link
                      onClick={() =>
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        })
                      }
                      to={"/event/view/" + event.id}
                    >
                      <div
                        className={`text-xl font-medium  mt-1 ${
                          theme === "dark" ? "text-white" : "text-[#040171]"
                        }`}
                      >
                        {event.title}
                      </div>
                    </Link>
                    {/* {console.log(event)} */}

                    <div className="mt-1 text-sm text-gray-500">
                      {event.category?.name || "General"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            className={`fw-96 p-6 mt-5 lg:mt-0 rounded-xl ${
              theme === "dark" ? "bg-[#121212]" : "bg-white"
            }`}
          >
            <Calendar Stats={Stats} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components

const StatCard = ({ title, value, color, textColor, cardColor, iconColor }) => {
  const [Balance_hidden, setBalance_hidden] = useState(true);
  // console.log(Balance_hidden);

  return (
    <div
      className={`flex justify-between items-center p-6 rounded-xl ${color}`}
    >
      <div className="">
        <div className={`mt-2 text-2xl font-bold ${textColor}`}>
          {title == "Balance" ? (Balance_hidden ? "****" : value) : value}
        </div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
      <div
        className={`flex ${
          title != "Balance" && cardColor
        } bg-opacity-20 px-4 py-5 rounded-xl  rounded-b-[1.4rem]`}
      >
        {title == "Balance" ? (
          <button className="cursor-pointer">
            <Eye
              className="cursor-pointer"
              onClick={() => setBalance_hidden(Balance_hidden ? false : true)}
            />
          </button>
        ) : (
          <CalendarCogIcon className={`${iconColor}`} />
        )}
      </div>
    </div>
  );
};

const Calendar = ({ theme, Stats }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // console.log(Stats);

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

export default Dashboard;
