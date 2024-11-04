import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, PlusCircle, ListChecks, Ticket, Megaphone, Settings, HelpCircle, Menu, ChevronLeft, ChevronRight, Search, Moon, Sun, CalendarCogIcon, BellDot, Bell, X } from 'lucide-react';
import { Pencil, Trash2, Share2 } from 'lucide-react';

import { useTheme } from "../../context/ThemeContext";
import SideBar from '../../components/(headers)/DashboardSidebar';
import user from "../../assets/(user)/user.png";
import eventImage from "../../assets/(landing)/event.png";
import { Link } from 'react-router-dom';
import DashboardHeader from '../../components/(events)/DashboardHeader';

const ManageEvent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [selectedTab, setSelectedTab] = useState('All');

  const events = [
    { id: 1, title: "K1 De Ultimate New Year Fest 4.0", category: "Musical Concert", date: "2024-05-17", location: "New York", status: "Active", published: true },
    { id: 2, title: "K1 De Ultimate New Year Fest 4.0", category: "Musical Concert", date: "2024-05-17", location: "New York", status: "Status", published: true },
  ];

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'}`}>
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 py-8 px-5 lg:px-8">
        {/* Header */}
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

        {/* Table */}
        <div className="border rounded-lg">
          <table className=" table-auto lg:table-auto">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-4 p-4">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Event Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {events.map((event, index) => (
                <tr key={index} className="bg-white">
                  <td className="w-4 p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[#040171]">{event.title}</td>
                  <td className="px-4 py-3 text-sm text-[#040171]">{event.category}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium">Published</span>
                      <span className="text-gray-500">{event.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">
                      {event.location}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEvent;
