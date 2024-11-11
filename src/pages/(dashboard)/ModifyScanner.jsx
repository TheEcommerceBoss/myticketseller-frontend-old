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
  ToggleLeftIcon,
  Trash2Icon,
  ToggleRightIcon,
} from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import SideBar from '../../components/(headers)/DashboardSidebar';
import user from "../../assets/(user)/user.png"
import eventImage from "../../assets/(landing)/event.png"
import { Link, useParams } from 'react-router-dom';
import DashboardHeader from '../../components/(events)/DashboardHeader';
import Greetings from '../../components/(snippets)/Greetings';
import { useAuth } from '../../context/AuthContext';
import Cookies from "js-cookie";
import api from "../../api";
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
const ModifyScanner = () => {
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
  // console.log(userData&&userData.user)

  // console.log(userData&& userData.user.balance)
  let { id } = useParams();
  const event_id = id;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [permissions, setPermissions] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0); // State to store total tickets

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await api.post("/listScanPermissions", { event_id: id }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setPermissions(response.data.permissions)
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };
    fetchEvents();
  }, []);



  const toggleevent = async (event_id, currentStatus, email) => {
    try {
      // Update the status based on the currentStatus
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';

      // Retrieve the token and handle if it’s not available
      const token = Cookies.get("auth_token");
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Authentication token is missing. Please log in again.',
        });
        return;
      }

      console.log(event_id);

      // Show a processing alert that doesn't close automatically
      Swal.fire({
        icon: 'info',
        title: 'Processing',
        text: 'Updating status, please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      // Send the request to update the status with authorization header
      await api.post(
        `/updateScanPermissionStatus`,
        {
          event_id,
          email: email,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the permissions state to reflect the change
      setPermissions(permissions.map(event =>
        event.email === email ? { ...event, status: newStatus } : event
      ));

      // Display success message and close the processing alert
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: `The event status has been changed to ${newStatus === 'active' ? 'Active' : 'Suspended'}.`,
      });
    } catch (error) {
      console.error("Failed to toggle event status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update event status.',
      });
    }
  };

  const deleteEventPermission = async (event_id, email) => {
    try {
      // Confirm deletion
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: "This action will delete the scan permission permanently.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (!confirmResult.isConfirmed) {
        return; // Exit if not confirmed
      }

      // Retrieve the token and handle if it’s not available
      const token = Cookies.get("auth_token");
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Authentication token is missing. Please log in again.',
        });
        return;
      }

      console.log(`Deleting permission for event_id: ${event_id} and email: ${email}`);

      // Show a processing alert that doesn't close automatically
      Swal.fire({
        icon: 'info',
        title: 'Processing',
        text: 'Deleting permission, please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      // Send the request to delete the permission with authorization header
      await api.post(
        `/deleteScanPermission`,
        {
          event_id,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the permission from the state
      setPermissions(permissions.filter(event => event.email !== email));
      console.log(permissions)
      // Display success message and close the processing alert
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'The scan permission has been successfully deleted.',
      });
    } catch (error) {
      console.error("Failed to delete scan permission:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete scan permission.',
      });
    }
  };


  const columns = [
    { field: 'id', headerName: '#', width: 50, sortable: false, hideSortIcons: true },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'added_time', headerName: 'Added Time', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <div className="flex  mt-2">
          <button
            onClick={() => toggleevent(event_id, params.value, params.row.email)}
            className={`p-2 ${params.value == 'active' ? 'bg-green-100 text-green-600 hover:bg-green-200 ' : 'bg-red-100 text-red-600 hover:bg-red-200 '} rounded-lg `}
          >
            {
              params.value == 'active' ? (
                <ToggleRightIcon size={16} />

              ) : (
                <ToggleLeftIcon size={16} />

              )
            }
          </button>
        </div>
      )
    },
    {
      field: 'user_id',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => deleteEventPermission(event_id, params.row.email)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            <Trash2Icon size={16} />
          </button>
        </div>
      )
    },
  ];


  const PermissionsWithIndex = permissions.map((event, index) => ({
    ...event,
    id: index + 1,
  }));

  const [isAddPermissionModalOpen, setIsAddPermissionModalOpen] = useState(false);
  const [newPermissionEmail, setNewPermissionEmail] = useState("");
  const [newEventId, setNewEventId] = useState("");

  const openAddPermissionModal = () => setIsAddPermissionModalOpen(true);
  const closeAddPermissionModal = () => setIsAddPermissionModalOpen(false);

  const handleAddPermission = async () => {
    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Authentication token is missing. Please log in again.',
        });
        return;
      }

      Swal.fire({
        icon: 'info',
        title: 'Processing',
        text: 'Adding permission, please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      // Send the request to add the permission
      await api.post(
        `/addtoScanPermission`,
        { email: newPermissionEmail, event_id: event_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPermissions([...permissions, { email: newPermissionEmail, event_id: newEventId, status: 'active' }]);

      Swal.fire({
        icon: 'success',
        title: 'Added',
        text: 'The scan permission has been successfully added.',
      });

      closeAddPermissionModal();
      setNewPermissionEmail("");
      setNewEventId("");
    } catch (error) {
      console.error("Failed to add scan permission:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
      });
    }
  };
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
              <h1 className="hidden lg:flex text-2xl font-bold">Scan Manager</h1>
              <span className={`hidden lg:flex ${theme != 'dark' ? 'text-[#040171]' : 'text-white'} `}><Greetings />, {userData && userData.user.fullname}</span>

            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
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


        {/* Events and Calendar Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Ongoing Events */}
          <div className={`flex-1 py-5 px-3 rounded-xl ${theme === 'dark' ? 'bg-[#121212] ' : 'bg-white'}`}>
            <div className="flex mb-3 justify-between">
              <h2 className="text-lg font-semibold mb-1 pt-1 px-3 pb-1">Scan Permission</h2>
              <button
                onClick={openAddPermissionModal}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Add Permission
              </button>
            </div>
            <div className="grid flex-row gap-3 ">
              <div style={{ height: '100%', width: '100%' }}>
                {loading ? (
                  <div className="flex justify-center items-center ">
                    <div className="border border-gray-100  rounded-md p-4 m-1 w-full mx-auto">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-700 h-[2rem] w-[2rem]"></div>
                        <div className="flex-1 space-y-6 py-1">
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
                ) : permissions.length === 0 ? (
                  <div className="flex justify-center items-center h-96">
                    <span>No Scan Permission found</span>
                  </div>
                ) : (
                  <DataGrid
                    rows={PermissionsWithIndex}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    sx={{
                      '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme === 'dark' ? 'black' : '#f5f5f5',
                      },
                      '& .MuiDataGrid-cell': {
                        color: theme === 'dark' ? 'white' : 'black',
                      },
                      '& .MuiDataGrid-footerContainer': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {isAddPermissionModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`p-6 bg-white rounded-lg w-1/3 ${theme === 'dark' ? 'bg-[#333]' : 'bg-white'}`}>
                <h2 className="text-lg font-semibold mb-4">Add Scan Permission</h2>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="border bg-transparent border-gray-300 p-2 rounded w-full mb-4"
                  value={newPermissionEmail}
                  onChange={(e) => setNewPermissionEmail(e.target.value)}
                />
              
                <div className="flex justify-end gap-4">
                  <button onClick={closeAddPermissionModal} className="text-gray-500">Cancel</button>
                  <button onClick={handleAddPermission} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div >
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

const Calendar = ({ theme, Stats }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  console.log(Stats);

  // Set the initial currentMonth to the actual current date
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Use the actual current date
  const [today, setToday] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    setToday(currentDate.getDate());
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.setMonth(prevMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.setMonth(prevMonth.getMonth() + 1)));
  };

  // Generate the dates for the current month
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
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
        if (eventYear === currentYear && eventMonth === currentMonthIndex && eventDateObj.getDate() === date) {
          return eventId;  // Return the eventId when found
        }
      }
    }
    return false;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <div className="flex space-x-2">
          <button onClick={handlePreviousMonth} className="p-1 hover:bg-gray-400 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-400 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {days && days.map((day) => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates && dates.map((date) => {
          const eventId = isEventDay(date); // Check if there's an event for this date
          return (
            <div
              key={date}
              className={`text-center py-2 text-sm rounded-full hover:bg-gray-500 cursor-pointer
                ${date === today ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                ${eventId ? 'bg-red-500 bg-opacity-50  text-white' : ''}
              `}
            >
              {eventId ? (
                <Link to={`/event/view/${eventId}`} className="text-white font-bold">
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


export default ModifyScanner;