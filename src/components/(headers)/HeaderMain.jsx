import React, { useState, useEffect } from 'react';
import { useTheme } from "../../context/ThemeContext";  // Adjust path as necessary
import { Sun, Moon, Search, X, Menu } from "lucide-react";
import logo from '../../assets/(site_assets)/logo.png';  // Adjust path as necessary
import logoDark from '../../assets/(site_assets)/logo-dark.png';  // Adjust path as necessary
import { Link } from "react-router-dom";
const HeaderMain = ({ variation }) => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isMenuOpen]);

    return (
        <header className={` flex items-center justify-center ${variation === 1 ? 'absolute w-full' : ''}`}>
            <nav className={`flex items-center  ${variation === 1 ? 'lg:mt-[2rem] lg:w-[80%] lg:rounded-full ' : ''}  w-full  z-50 justify-between  p-3  ${theme === "light" ? "bg-white" : "bg-[#121212]"} shadow-lg`}>
                <div className="flex items-center">
                    <Link to={'/'} >
                        <img src={theme === "light" ? logo : logoDark} className="px-5 py-2 w-[6.5rem]" alt="" />
                    </Link>
                </div>
                <div className="hidden lg:flex space-x-6">
                    {variation === 1 ?
                        <> <a href="#" className="text-orange-500 text-lg font-medium">Home</a>

                            <a href="#" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>About Us</a>
                            <a href="#" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Services</a>
                            <a href="#" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Pricing</a>
                            <a href="#" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Blog</a>
                            <a href="#" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Contact</a>
                        </>
                        : ""}
                </div>

                <div className="flex items-center space-x-4 px-3">
                    {variation === 2 ?
                        (
                            <Link to={'/'} className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Home</Link>
                        ) : ''
                    }
                    <button
                        onClick={toggleTheme}
                        className={`rounded-full  p-3 ${theme === "light" ? "bg-gray-200  hover:bg-gray-100" : "hover:bg-orange-400 bg-orange-500"}`}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link to={'/event/find'} className="hidden lg:flex align-center items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full hover:bg-orange-600 transition duration-300">

                        {variation === 2 ?
                            (<>
                                <span className=''>Login</span>
                            </>) : (<>
                                <Search size={18} />  <span className=''>Find Events</span>
                            </>)}
                    </Link>

                    <div className="flex items-center lg:hidden">

                        <button
                            onClick={toggleMenu}
                            className="bg-orange-500 text-black pl-2 py-2 h-[3rem] lg:h-[4rem] pr-[2.5rem] lg:pr-[3.5rem] rounded-full relative flex items-center z-10"
                        >
                            <span className="mx-4 text-white text-sm lg:text-lg font-sora">
                                <Link to={'/event/find'} className="">
                                    <Search size={18} />
                                </Link>
                            </span>
                            <div className="bg-orange-500 mx-1 h-[3rem] lg:h-[4rem] w-[3rem] lg:w-[4rem] right-0  absolute rounded-full flex align-center items-center justify-center">
                                {isMenuOpen ? (
                                    <X className="lg:w-[1.6rem] text-white w-[1.4rem] lg:h-[1.6rem] h-[1.4rem]" />
                                ) : (
                                    <Menu className="lg:w-[1.6rem] text-white w-[1.4rem] lg:h-[1.6rem] h-[1.4rem]" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </nav>
            <div
                className={`fixed top-0 right-0 w-full h-0 bg-orange-600 rounded-full transition-all z-30 duration-300 ease-in-out flex flex-col items-center justify-center ${isMenuOpen ? 'h-screen rounded-none' : ''
                    }`}
                style={{
                    clipPath: isMenuOpen
                        ? 'circle(150% at 95% 3.5rem)'
                        : 'circle(0% at 95% 3.5rem)',
                }}
            >
                {isMenuOpen && (
                    <nav className="text-white text-2xl space-y-4">
                        <a href="#" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Home</a>
                        <a href="#" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">About Us</a>
                        <a href="#" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Services</a>
                        <a href="#" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Pricing</a>
                        <a href="#" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Blog</a>
                        <a href="#" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Contact</a>

                    </nav>
                )}
            </div>
        </header>
    );
};

export default HeaderMain;