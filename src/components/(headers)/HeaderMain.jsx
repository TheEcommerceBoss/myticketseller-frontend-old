import React from "react";
import { useTheme } from "../../context/ThemeContext";  // Adjust path as necessary
import { Sun, Moon } from "lucide-react";
import logo from '../../assets/(site_assets)/logo.png';  // Adjust path as necessary

const HeaderMain = ({ variation }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`p-8 ${variation === 1 ? 'absolute w-full' : ''}`}>
            <nav className="flex items-center justify-between rounded-full p-2 bg-white shadow-lg">
                <div className="flex items-center">
                    <img src={logo} className="h-8 w-auto mr-8" alt="MyTicketSeller" />
                    <div className="hidden md:flex space-x-6">
                        <a href="#" className="text-orange-500 font-medium">Home</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500">About Us</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500">Services</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500">Pricing</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500">Blog</a>
                        <a href="#" className="text-gray-700 hover:text-orange-500">Contact</a>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                        Find Events
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default HeaderMain;