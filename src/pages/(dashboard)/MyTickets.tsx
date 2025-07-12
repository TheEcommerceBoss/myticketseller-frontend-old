import { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../../components/(headers)/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

const MyTicketsPage = () => {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    email: userData && userData.user.email,
    fullname: userData && userData.user.fullname,
    instagram: "", // Add Instagram field
    tiktok: "", // Add TikTok field
    twitter: "", // Add Twitter field
  });
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const token = Cookies.get("auth_token");
      await api.put("/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile.",
      });
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-[#222]" : "bg-gray-100"
      }`}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 py-8 px-5 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg outline-none p-3 ${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-100"
                  : "bg-[#121212]"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="hidden lg:flex text-2xl font-bold">Scanner</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`rounded-full outline-none p-3 ${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-100"
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
            theme === "dark" ? "bg-[#121212]" : "border border-[#040171]"
          } rounded-lg p-6 my-6 shadow-sm`}
        >
          <h5>My Tickets</h5>
        </div>
      </div>
    </div>
  );
};

export default MyTicketsPage;
