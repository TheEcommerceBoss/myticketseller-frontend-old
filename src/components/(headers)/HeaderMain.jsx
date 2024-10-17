import React from "react";
import { useTheme } from "../../context/ThemeContext";  // Adjust path as necessary
import { Sun, Moon, Search } from "lucide-react";
import logo from '../../assets/(site_assets)/logo.png';  // Adjust path as necessary
import { Link } from "react-router-dom";
const HeaderMain = ({ variation }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={` flex items-center justify-center ${variation === 1 ? 'absolute w-full' : ''}`}>
            <nav className="flex items-center mt-[2rem] w-[90%] justify-between rounded-full p-3 bg-white shadow-lg">
                <div className="flex items-center">
                    <img src={logo} className="px-5 py-2 w-[6.5rem]" alt="" />
               
                </div>
                <div className="hidden md:flex space-x-6">
                        <a href="#" className="text-orange-500 text-lg font-medium">Home</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500 text-lg">About Us</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500 text-lg">Services</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500 text-lg">Pricing</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500 text-lg">Blog</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500 text-lg">Contact</a>
                    </div>
                <div className="flex items-center space-x-4 px-3">
                    <button
                        onClick={toggleTheme}
                        className={`rounded-full  p-3 ${theme === "light" ? "bg-gray-200  hover:bg-gray-100" : "hover:bg-orange-400 bg-orange-500"}`}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link to={'/event/find'} className="flex align-center items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full hover:bg-orange-600 transition duration-300">
                      <Search size={18} />  Find Events
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default HeaderMain;