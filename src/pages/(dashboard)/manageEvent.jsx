import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import SideBar from '../../components/(headers)/DashboardSidebar';
import { Search, Menu, Bell, X, Moon, Sun } from 'lucide-react';
import DashboardHeader from '../../components/(events)/DashboardHeader';
import Cookies from "js-cookie";
import api from "../../api";
import { Link } from 'react-router-dom';

const ManageEvent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(window.innerWidth >= 1024);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await api.get("/get_user_events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data.events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const deleteEvent = async (eventId) => {
    try {
      await api.post("/delete_event", { event_id: eventId });
      setEvents(events.filter(event => event.event_id !== eventId));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const toggleEventStatus = async (eventId, currentStatus) => {
    try {
      await api.post(`/toggle-status/${currentStatus === 0 ? 1 : 0}`, { event_id: eventId });
      setEvents(events.map(event => 
        event.event_id === eventId ? { ...event, status: currentStatus === 0 ? 1 : 0 } : event
      ));
    } catch (error) {
      console.error("Failed to toggle event status:", error);
    }
  };

  const eventsWithIndex = events.map((event, index) => ({
    ...event,
    id: index + 1,
  }));

  const columns = [
    { field: 'id', headerName: '#', width: 50, sortable: false, hideSortIcons: true },
    { field: 'event_title', headerName: 'Event Title', width: 250 },
    { field: 'event_category', headerName: 'Category', width: 150 },
    { field: 'event_description', headerName: 'Description', width: 300 },
    {
      field: 'event_specific_type',
      headerName: 'Visibility',
      width: 150,
      renderCell: (params) => (
        <div>
          {params.value === 0 ? 'Private' : 'Public'}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <div>
          {params.value === 0 ? 'Draft' : 'Live'}
        </div>
      ),
    },
    {
      field: 'event_id',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 mt-2">
          <Link to={`/dashboard/event/manage/${params.value}`} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
            <Pencil size={16} />
          </Link>
          <button
            onClick={() => deleteEvent(params.value)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => toggleEventStatus(params.value, params.row.status)}
            className="p-2 bg-[#040171] text-white rounded-lg hover:bg-blue-900"
          >
            <Eye size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'}`}>
      <SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="flex-1 py-8 px-5 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className={`rounded-lg p-3 ${theme === "light" ? "bg-gray-200 hover:bg-gray-100" : "bg-[#121212]"}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="hidden lg:flex text-2xl font-bold">Manage Events</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className={`pl-10 pr-4 py-2 rounded-full border ${theme === 'dark' ? 'bg-[#222] border-[#444]' : 'bg-transparent border-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button className={`rounded-full p-3 ${theme === "light" ? "bg-gray-200 hover:bg-gray-100" : "bg-[#121212]"}`}>
              <Bell fill={theme === "light" ? "#040171" : "white"} size={20} />
            </button>
            <button onClick={toggleTheme} className={`rounded-full p-3 ${theme === "light" ? "bg-gray-200 hover:bg-gray-100" : "bg-[#121212]"}`}>
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <DashboardHeader />
          </div>
        </div>
        <div className="container mx-auto lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className={`md:col-span-3 p-2 ${theme === "light" ? "bg-white" : "bg-[#121212] text-white"} shadow-lg rounded-lg`}>
              <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                  rows={eventsWithIndex}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEvent;
