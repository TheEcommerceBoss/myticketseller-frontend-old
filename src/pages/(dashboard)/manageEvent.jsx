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

  const ModifyEvent = () => {
    alert(1);
  };

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
    { id: 2, title: "Summer Music Festival", category: "Musical Concert", date: "2024-06-20", location: "Los Angeles", status: "Active" },
    { id: 3, title: "Tech Conference 2024", category: "Conference", date: "2024-08-15", location: "San Francisco", status: "Upcoming" },
    { id: 4, title: "Art Exhibition", category: "Exhibition", date: "2024-09-10", location: "Chicago", status: "Inactive" },
    { id: 5, title: "Food Festival", category: "Food", date: "2024-10-05", location: "Miami", status: "Upcoming" },
   ];

  const eventsWithIndex = events.map((event, index) => ({
    ...event,
    index: index + 1, // Change to start index from 1
  }));

  const columns = [
    { field: 'index', headerName: '#', width: 50, sortable: false, hideSortIcons: true },
    { field: 'title', headerName: 'Event Title', width: 250 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: () => (
        <div className="flex gap-2 mt-2">
          <button onClick={ModifyEvent} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
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
            <h1 className="hidden lg:flex text-2xl font-bold">Manage Events</h1>
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
