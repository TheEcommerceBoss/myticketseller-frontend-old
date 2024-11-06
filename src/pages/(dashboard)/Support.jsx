import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import SideBar from '../../components/(headers)/DashboardSidebar';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/(events)/DashboardHeader';
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import api from "../../api"; // Ensure you have an API utility to handle requests

const SupportPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    attachment: null, // For file attachment
  });
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      attachment: e.target.files[0], // Storing the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, attachment } = formData;

    if (!title || !description) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please provide both title and description.',
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('description', description);
    if (attachment) {
      formDataToSend.append('attachment', attachment);
    }

    try {
      const token = Cookies.get("auth_token");
      await api.post('/submit-support', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Support Request Submitted',
        text: 'Your support request has been submitted successfully!',
      });

      setFormData({
        title: '',
        description: '',
        attachment: null,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit support request. Please try again later.',
      });
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'}`}>
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

        <div className={`${theme === "dark" ? "bg-[#121212]" : "border border-[#040171]"} rounded-lg p-6 my-6 shadow-sm`}>
          <h2 className="text-xl font-medium mb-4">Submit Support Request</h2>

          {/* Title Input */}
          <div className="mb-4">
            <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter title"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your issue"
            />
          </div>

          {/* File Attachment */}
          <div className="mb-4">
            <label className={`text-l font-normal mt-1 ${theme === 'dark' ? 'text-white' : 'text-[#000]'}`}>Attachment (Optional)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 text-gray-400 font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-end text-center">
            <button
              onClick={handleSubmit}
              className={`w-[12rem] bg-[#040171] ${theme === 'dark' ? 'border-[#DBDAFF20]' : 'border-[#DBDAFF50]'} border-4 text-white py-3 px-4 rounded-full transition duration-200 hover:bg-blue-800`}
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
