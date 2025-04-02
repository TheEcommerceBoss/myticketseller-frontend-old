import React, { useState, useEffect } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
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
  Plus,
  Trash2,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import user from "../../assets/(user)/user.png";
import eventImage from "../../assets/(landing)/event.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import MapAutocomplete from "../../components/(maps)/Autocomplete";
import axios from "axios";

import Cookies from "js-cookie"; // Ensure you have this import to access cookies
import { eventsApi, ticketsApi } from "../../api";

const PaymentSettings = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const token = Cookies.get("auth_token");
        const event = await eventsApi.getEventById(id);
        console.log("my event", event);
        // console.log(response.data.event_days);
        if (event.days && event.days.length > 0) {
          // Format event days with the specified structure
          const formattedEventDays = event.days.map((day, index) => ({
            index: index + 1,
            eventType: day.event_type,
            startDate: day.event_day,
            startTime: day.open_door,
            endTime: day.close_door,
            location: day.event_type == "onsite" ? day.event_address : "",
            virtualLink: day.event_type == "virtual" ? day.event_link : "",
            password: day.event_type == "virtual" ? day.event_password : "",
          }));

          setEventDays(formattedEventDays);
          setDayCount(event.days.length);

          // Format tickets
          // console.log(response.data.tickets)
          const formattedTickets = event.tickets.map((ticket) => ({
            event_id: ticket.event_id,
            id: ticket.id,
            name: ticket.name,
            type: ticket.type,
            fee: ticket.type == "free" ? 0 : ticket.price,
            currency: ticket.currency,
            quantity: ticket.quantity,
            isFeeDisabled: ticket.type == "free",
          }));

          setTickets(formattedTickets);
        }
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      }
    };

    // Call the function
    fetchEvents();
  }, [id]); // Add `id` as a dependency

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  const [location, setLocation] = useState("");

  const handleAddressSelect = (selectedAddress) => {
    setLocation(selectedAddress);
    // console.log(selectedAddress)
  };
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(2);
  const [isPublic, setIsPublic] = useState(false);
  const [eventType, setEventType] = useState("onsite");

  const steps = [
    { number: 1, title: "General Information", active: false },
    { number: 2, title: "Tickets and Location", active: true },
    { number: 3, title: "Additional Information", active: false },
  ];
  const [tickets, setTickets] = useState([]);
  const [eventDays, setEventDays] = useState([]);
  // console.log(eventDays)
  // console.log(tickets)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Call once when the component mounts
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
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
  const [pricingCount, setPricingCount] = useState(3);
  const [dayCount, setDayCount] = useState(0);

  const handlePricingCountChange = (increment) => {
    const newCount = pricingCount + increment;
    if (newCount >= 1 && newCount <= 10) {
      setPricingCount(newCount);
    }
  };

  const submitPayment = async () => {
    if (tickets.length < 1) {
      Swal.fire(
        "Error",
        "Please add at least one ticket before submitting.",
        "error"
      );
      return;
    }

    if (eventDays.length < 1) {
      Swal.fire(
        "Error",
        "Please add at least one event day before submitting.",
        "error"
      );
      return;
    }

    // Check each ticket for completeness
    for (const ticket of tickets) {
      if (!ticket.name) {
        Swal.fire(
          "Error",
          "Please complete the ticket name for ticket " + ticket.id + ".",
          "error"
        );
        return;
      }
      if (!ticket.quantity) {
        Swal.fire(
          "Error",
          `Please complete the quantity for ticket ${ticket.id}.`,
          "error"
        );
        return;
      }
    }

    for (const day of eventDays) {
      if (!day.startDate) {
        Swal.fire(
          "Error",
          "Please complete the start date for the event day " + day.index + ".",
          "error"
        );
        return;
      }
      if (!day.startTime) {
        Swal.fire(
          "Error",
          "Please complete the start time for the event day " + day.index + ".",
          "error"
        );
        return;
      }
      if (!day.endTime) {
        Swal.fire(
          "Error",
          "Please complete the end time for the event day " + day.index + ".",
          "error"
        );
        return;
      }

      // Check if the date is in the past
      const currentDate = new Date();
      const selectedDate = new Date(day.startDate);
      // if (selectedDate < currentDate) {
      //   Swal.fire('Error', 'The start date cannot be in the past for the event day ' + (day.index) + '.', 'error');
      //   return;
      // }

      // Check if start time is before end time
      const [startHours, startMinutes] = day.startTime.split(":").map(Number);
      const [endHours, endMinutes] = day.endTime.split(":").map(Number);
      const startTime = new Date(selectedDate);
      const endTime = new Date(selectedDate);
      startTime.setHours(startHours, startMinutes);
      endTime.setHours(endHours, endMinutes);

      if (startTime >= endTime) {
        Swal.fire(
          "Error",
          "The start time must be before the end time for the event day " +
            day.index +
            ".",
          "error"
        );
        return;
      }
    }

    // Construct the JSON body
    const jsonBody = {
      event_id: id,
      tickets: tickets.map((ticket) => ({
        event_id: id,
        name: ticket.name,
        ticket_id: ticket.id,
        type: ticket.type,
        price: ticket.type == "free" ? 0 : ticket.fee,
        currency: "NGN",
        quantity: ticket.quantity,
      })),

      event_days: eventDays.map((day) => ({
        event_id: id,
        event_type: day.eventType,
        number_of_days: eventDays.length,
        event_day: day.startDate,
        open_door: day.startTime,
        close_door: day.endTime,
        ...(day.eventType == "virtual"
          ? {
              event_link: day.virtualLink,
              event_password: day.password,
            }
          : {
              event_address: day.location,
            }),
      })),
    };

    // console.log(jsonBody)
    // console.log(`${import.meta.env.VITE_API_URL}/ticket_event_details`)
    setLoading(true);

    try {
      // console.log(jsonBody)
      const token = Cookies.get("auth_token"); // Ensure the token is fetched from cookies

      const [ticketsData, eventsData] = await Promise.all([
        ticketsApi.createBulkTickets(jsonBody.tickets),
        eventsApi.addEventSchedule(id, jsonBody.event_days),
      ]);

      Swal.fire(
        "Success",
        "Location details submitted successfully!",
        "success"
      );
      navigate("/dashboard/event/create/" + id + "/info");
    } catch (error) {
      console.error("Failed to submit details:", error);
      Swal.fire(
        "Error",
        "Failed to submit details. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false); // Set loading to false once request is completed
    }
  };

  const addTicket = (type) => {
    if (
      type == "guest_list" &&
      tickets.some((ticket) => ticket.type == "guest_list")
    ) {
      Swal.fire("Error", "You can only create one Guest List ticket!", "error");
      return;
    }

    const newTicket = {
      id: tickets.length + 1,
      type,
      name: "",
      quantity: "",
      price: "",
      fetched: 0,
      inputtype: type == "free" ? "number" : "number",
      fee: type == "free" ? 0 : "",
      timeSlots: [],
      isFeeDisabled: type == "free",
    };

    setTickets([...tickets, newTicket]);
  };

  const updateTicket = (id, key, value) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id == id ? { ...ticket, [key]: value } : ticket
    );
    setTickets(updatedTickets);
  };

  const removeTicket = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTickets(tickets.filter((ticket) => ticket.id !== id));
        Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
      }
    });
  };
  const handleDayCountChange = (increment) => {
    const newCount = dayCount + increment;

    if (newCount >= 1 && newCount <= 10) {
      setDayCount(newCount);

      if (increment > 0) {
        // Create new event days when adding
        const newEventDays = Array.from({ length: increment }, (_, index) => ({
          index: dayCount + index + 1,
          eventType: "onsite",
          startDate: "",
          startTime: "",
          endTime: "",
          location: "",
          virtualLink: "",
          password: "",
        }));

        setEventDays((prevEventDays) => [...prevEventDays, ...newEventDays]);
      } else if (increment < 0) {
        // Remove the last event day when decrementing
        setEventDays((prevEventDays) => {
          const updatedEventDays = [...prevEventDays];
          updatedEventDays.pop(); // Remove the last entry
          return updatedEventDays;
        });
      }
    }
  };

  return (
    <div
      className={`flex min-h-screen  ${
        theme == "dark" ? "bg-[#222]" : "bg-gray-100"
      }`}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 py-8 px-5 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center  space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg outline-none p-3 ${
                theme == "light"
                  ? "bg-gray-200  hover:bg-gray-100"
                  : "bg-[#121212]"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="hidden lg:flex text-2xl font-bold">Add New Event</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className={`pl-10 pr-4 py-2 rounded-[4rem] border ${
                  theme == "dark"
                    ? "bg-[#222]  border-[#444]"
                    : "bg-transparent  border-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <Link
              to={"/dashboard/event/create"}
              className={`rounded-full outline-none  p-3 ${
                theme == "light"
                  ? "bg-gray-200  hover:bg-gray-100"
                  : "hover:bg-[#111] bg-[#121212]"
              }`}
              aria-label="Toggle theme"
            >
              <PlusCircle
                color={theme == "light" ? "#040171" : "white"}
                size={20}
              />
            </Link>
            <button
              onClick={toggleTheme}
              className={`rounded-full outline-none p-3 ${
                theme == "light"
                  ? "bg-gray-200  hover:bg-gray-100"
                  : "hover:bg-[#111] bg-[#121212]"
              }`}
              aria-label="Toggle theme"
            >
              {theme == "light" ? <Moon size={20} /> : <Sun size={20} />}
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
                  className={`h-[.8rem] md:h-1 w-[.15rem] md:w-[2rem] ${
                    step >= s.number ? "bg-[#040171]" : "bg-gray-300"
                  }`}
                />
              )}
              <div
                key={s.number}
                className="flex w-full px-[4rem] md:px-0 items-center"
              >
                <div
                  className={`px-4  py-2 w-full rounded-full flex items-center justify-center text-l ${
                    step >= s.number
                      ? "bg-[#040171] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {s.number}. {s.title}
                </div>
              </div>
            </>
          ))}
        </div>
        <div
          className={`${
            theme == "dark"
              ? "bg-[#121212] border border-[#121212]"
              : "border border-[#040171]"
          } rounded-lg p-6 my-6 shadow-sm`}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
              <span>6</span>
            </div>
            <h2 className="text-l font-medium">Create your Tickets</h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap justify-between mb-6">
              {[
                { label: "Paid Ticket", name: "paid" },
                { label: "Free Ticket", name: "free" },
                { label: "Group Ticket", name: "group" },
                { label: "Request Ticket", name: "request" },
                { label: "Guest List", name: "guest_list" },
                { label: "Bottle List", name: "bottle_list" },
                { label: "Donation", name: "donation" },
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => addTicket(type.name)}
                  className="bg-gray-500 text-white py-1 px-4 w-[47%] lg:w-[10rem] mt-2 text-sm rounded hover:bg-gray-600 transition flex items-center"
                >
                  <span className="mr-1">+</span> {type.label}
                </button>
              ))}
            </div>
            {tickets.map((ticket, index) => {
              // console.log(ticket);
              return (
                <div
                  key={ticket.id}
                  className="mb-8 border border-gray-500 p-4 rounded"
                >
                  <h3 className="my-2">
                    {"Ticket " + (index + 1) + "( " + ticket.type + ")"}{" "}
                  </h3>

                  <div className="mb-4">
                    <input
                      className={`flex ${
                        theme == "dark"
                          ? "bg-transparent"
                          : "border border-[#A2A2A2]"
                      }  w-full p-3 border outline-none rounded-lg   text-l`}
                      id={"ticket_name" + ticket.id}
                      required="1"
                      placeholder="Ticket Name"
                      value={ticket.name}
                      onChange={(e) =>
                        updateTicket(ticket.id, "name", e.target.value)
                      }
                      type="text"
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      className={`flex ${
                        theme == "dark"
                          ? "bg-transparent"
                          : "border border-[#A2A2A2]"
                      }  w-full p-3 border outline-none rounded-lg   text-l`}
                      id={"ticket_quantity" + ticket.id}
                      required="1"
                      placeholder="Quantity"
                      value={ticket.quantity}
                      onChange={(e) =>
                        updateTicket(ticket.id, "quantity", e.target.value)
                      }
                      type="number"
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      className={`flex ${
                        theme == "dark"
                          ? "bg-transparent"
                          : "border border-[#A2A2A2]"
                      } rounded-[5rem] w-full p-3 border outline-none rounded-lg   text-l`}
                      id={"fee" + ticket.id}
                      required="1"
                      placeholder={
                        "Fee (" + "$" + ") - Set as 0 for a free ticket"
                      }
                      value={ticket.fee}
                      disabled={ticket.isFeeDisabled}
                      onChange={(e) =>
                        updateTicket(ticket.id, "fee", e.target.value)
                      }
                      type={ticket.inputtype}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex gap-5">
                      <button
                        onClick={() => addTimeSlot(ticket.id)}
                        className="bg-gray-500 hidden text-white py-1 px-4 mt-2 text-sm rounded hover:bg-gray-600 transition flex items-center"
                      >
                        <Plus size={17} className={"mr-2"} /> Add Time Slot
                      </button>
                      <button
                        onClick={() => removeTicket(ticket.id)}
                        className={`bg-red-500 text-white py-1 px-4 mt-2 text-sm rounded hover:bg-gray-600 transition flex items-center ${
                          ticket.fetched == 1 ? "hidden" : ""
                        }`}
                      >
                        <Trash2 size={17} className={"mr-2"} /> Delete Ticket
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`${
            theme == "dark"
              ? "bg-[#121212] border border-[#121212]"
              : "border border-[#040171]"
          } rounded-lg p-6 my-6 shadow-sm`}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full border border-[#040171] flex items-center justify-center text-l">
              <span>7</span>
            </div>
            <h2 className="text-l font-medium">
              Setup your Event Days & Locations
            </h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-center text-l">How many days?</p>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => handleDayCountChange(-1)}
                  className="w-[5rem] h-12 bg-[#040171] text-white rounded-l-full flex items-center justify-center text-l"
                >
                  -
                </button>
                <span
                  className={`w-[5rem] h-12   text-center text-l  flex items-center justify-center text-l   ${
                    theme == "dark" ? "bg-[#222]" : "border border-[#040171]"
                  } `}
                >
                  {dayCount}
                </span>
                <button
                  onClick={() => handleDayCountChange(1)}
                  className="w-[5rem] h-12 bg-[#040171] text-white rounded-r-full flex items-center justify-center text-l"
                >
                  +
                </button>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="space-y-4">
              {eventDays.map((eventDay, index) => (
                <div
                  key={index}
                  className={`${
                    theme == "dark"
                      ? "bg-[#121212] border border-[#ccc]"
                      : "border border-[#040171]"
                  } rounded-lg p-6 my-6 shadow-sm`}
                >
                  <div className="space-y-6">
                    <h4 className="font-bold">Event Day {eventDay.index}</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block mb-2 text-l">
                          Select Event Type
                        </label>
                        <select
                          value={eventDay.eventType}
                          onChange={(e) => {
                            const updatedEventDays = [...eventDays];
                            updatedEventDays[index].eventType = e.target.value;
                            setEventDays(updatedEventDays);
                          }}
                          className={`flex ${
                            theme == "dark"
                              ? "bg-transparent"
                              : "border border-[#A2A2A2]"
                          } rounded-[5rem] p-1 w-full p-2 border border-[#A2A2A2] rounded-lg py-4 text-l`}
                        >
                          <option value="onsite">On Site</option>
                          <option value="virtual">Virtual</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block mb-2 text-l">Start Day</label>
                        <input
                          type="date"
                          value={eventDay.startDate}
                          onChange={(e) => {
                            const updatedEventDays = [...eventDays];
                            updatedEventDays[index].startDate = e.target.value;
                            setEventDays(updatedEventDays);
                          }}
                          className={`flex ${
                            theme == "dark"
                              ? "bg-transparent"
                              : "border border-[#A2A2A2]"
                          } rounded-[5rem] w-full p-3 border outline-none rounded-lg text-l`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-l">
                          Door Open Time
                        </label>
                        <input
                          type="time"
                          value={eventDay.startTime}
                          onChange={(e) => {
                            const updatedEventDays = [...eventDays];
                            updatedEventDays[index].startTime = e.target.value;
                            setEventDays(updatedEventDays);
                          }}
                          className={`flex ${
                            theme == "dark"
                              ? "bg-transparent"
                              : "border border-[#A2A2A2]"
                          } rounded-[5rem] w-full p-3 border outline-none rounded-lg text-l`}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-l">End Time</label>
                        <input
                          type="time"
                          value={eventDay.endTime}
                          onChange={(e) => {
                            const updatedEventDays = [...eventDays];
                            updatedEventDays[index].endTime = e.target.value;
                            setEventDays(updatedEventDays);
                          }}
                          className={`flex ${
                            theme == "dark"
                              ? "bg-transparent"
                              : "border border-[#A2A2A2]"
                          } rounded-[5rem] w-full p-3 border outline-none rounded-lg text-l`}
                        />
                      </div>
                    </div>

                    {eventDay.eventType == "onsite" ? (
                      <div>
                        <label className="block mb-2 text-l">
                          Enter the address of the event here
                        </label>
                        <MapAutocomplete
                          value={eventDay.location}
                          onChange={(address) => {
                            const updatedEventDays = [...eventDays];
                            updatedEventDays[index].location = address;
                            setEventDays(updatedEventDays);
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="block mb-2 text-l">
                            Virtual Event Link
                          </label>
                          <input
                            type="url"
                            placeholder="https://example.com"
                            value={eventDay.virtualLink}
                            onChange={(e) => {
                              const updatedEventDays = [...eventDays];
                              updatedEventDays[index].virtualLink =
                                e.target.value;
                              setEventDays(updatedEventDays);
                            }}
                            className={`flex ${
                              theme == "dark"
                                ? "bg-transparent"
                                : "border border-[#A2A2A2]"
                            } rounded-[5rem] w-full p-3 border outline-none rounded-lg text-l`}
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-l">
                            Event Password
                          </label>
                          <input
                            type="password"
                            placeholder="Enter password"
                            value={eventDay.password}
                            onChange={(e) => {
                              const updatedEventDays = [...eventDays];
                              updatedEventDays[index].password = e.target.value;
                              setEventDays(updatedEventDays);
                            }}
                            className={`flex ${
                              theme == "dark"
                                ? "bg-transparent"
                                : "border border-[#A2A2A2]"
                            } rounded-[5rem] w-full p-3 border outline-none rounded-lg text-l`}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between text-center">
          <Link
            to={"/dashboard/event/create/" + id}
            className={`w-[12rem] bg-opacity-50 bg-[#040171] ${
              theme == "dark" ? "border-[#DBDAFF20]" : "border-[#DBDAFF50]"
            } border-4 text-white py-3 px-4 rounded-full hover:bg-blue-800 transition duration-200`}
          >
            Previous
          </Link>

          <div className="flex items-center gap-3 mt-2 lg:mt-0">
            <button
              onClick={() => submitPayment()}
              disabled={loading}
              className={`w-[12rem] bg-[#040171] ${
                theme == "dark" ? "border-[#DBDAFF20]" : "border-[#DBDAFF50]"
              } border-4 text-white py-3 px-4 rounded-full transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
              }`}
            >
              {loading ? "Loading..." : "Next"}
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default PaymentSettings;
