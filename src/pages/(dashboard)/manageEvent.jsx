import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Pencil, Trash2, Share2 } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import SideBar from '../../components/(headers)/DashboardSidebar';
import { Search, Menu, Bell, X, Moon, Sun } from 'lucide-react';
import DashboardHeader from '../../components/(events)/DashboardHeader';

const ManageEvent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const events = [
    { id: 1, title: "K1 De Ultimate New Year Fest 4.0", category: "Musical Concert", date: "2024-05-17", location: "New York", status: "Active" },
    { id: 2, title: "K1 De Ultimate New Year Fest 4.0", category: "Musical Concert", date: "2024-05-17", location: "New York", status: "Status" },
  ];

  const columns = [
    { field: 'title', headerName: 'Event Title', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: () => (
        <div className="flex gap-2">
          <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
            <Pencil size={16} />
          </button>
          <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
            <Trash2 size={16} />
          </button>
          <button className="p-2 bg-[#040171] text-white rounded-lg hover:bg-blue-900">
            <Share2 size={16} />
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
            <h1 className="hidden lg:flex text-2xl font-bold">Add New Event</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
        <div className="h-[400px] w-full border rounded-lg">
          <DataGrid
            rows={events}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell': {
                color: theme === 'dark' ? 'white' : '#040171',
              },
              backgroundColor: theme === 'dark' ? '#222' : 'white',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageEvent;
