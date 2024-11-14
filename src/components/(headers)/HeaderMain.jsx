import React, { useState, useEffect } from 'react';
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Search, X, Menu } from "lucide-react";
import logo from '../../assets/(site_assets)/logo.png';
import logoDark from '../../assets/(site_assets)/logo-dark.png';
import { Link, useNavigate } from "react-router-dom";
import { MapPin } from 'lucide-react';
const HeaderMain = ({ variation, showsearch, hidemenu, nobg }) => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Searching:', searchQuery, 'in', location);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isMenuOpen]);

    const searchEvent = () => {
        if (searchQuery) {
            navigate('/event/search/' + searchQuery);
            // alert(searchQuery)
        }
    }

    return (
        <header className={` flex items-center justify-center ${variation === 1 ? 'absolute w-full' : ''}`}>
            <nav className={`flex items-center  ${variation === 1 ? 'lg:mt-[2rem] lg:w-[80%] lg:rounded-full ' : ''}  w-full  z-50 justify-between  p-3  ${nobg ? "bg-transparent" : theme === "light" ? "bg-white" : "bg-[#121212]"}  ${!hidemenu && 'shadow-lg'}`}>
                <div className="flex items-center">
                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        to={'/'} >
                        <img src={theme === "light" ? logo : logoDark} className="px-5 py-2 w-[6.5rem]" alt="" />
                    </Link>
                </div>
                {!hidemenu && (
                    <>
                        <div className="hidden lg:flex space-x-6">
                            {variation === 1 || variation === 4 ?
                                <> <Link to="#" className="text-orange-500 text-lg font-medium">Home</Link>

                                    <Link to="/event/find" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Events</Link>
                                    <Link to="/about" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>About Us</Link>
                                    <Link to="/contact" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Contact Us</Link>
                                    <Link to="/pricing" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Pricing</Link>
                                    <Link to="/login" className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Login</Link>
                                </>
                                :
                                showsearch ?
                                    <>
                                        <div className="hidden lg:flex max-w-4xl mx-auto px-4">
                                            <form
                                                onSubmit={handleSearch}
                                                className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden"
                                            >
                                                <div className="flex items-center flex-1 divide-x divide-gray-200">
                                                    {/* Search Input */}
                                                    <div className="flex items-center flex-1 px-4 py-1">
                                                        <Search className="w-5 h-5 text-gray-600 mr-3" />
                                                        <input
                                                            type="search"
                                                            placeholder="Search events"
                                                            value={searchQuery}
                                                            onSubmit={searchEvent}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="w-full outline-none text-gray-700 placeholder-gray-500 text-lg"
                                                        />
                                                    </div>

                                                    {/* Location Input */}
                                                    <div className="flex items-center px-4 py-1">
                                                        <MapPin className="w-5 h-5 text-gray-600 mr-3" />
                                                        <input
                                                            type="text"
                                                            placeholder="Location"
                                                            value={location}
                                                            onSubmit={searchEvent}
                                                            onChange={(e) => setLocation(e.target.value)}
                                                            className="w-40 outline-none text-gray-700 placeholder-gray-500 text-lg"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    onClick={searchEvent}
                                                    onSubmit={searchEvent}

                                                    className="p-4 bg-orange-500 hover:bg-orange-600 transition-colors"
                                                >
                                                    <Search className="w-6 h-6 text-white" />
                                                </button>
                                            </form>
                                        </div>

                                    </> : ""

                            }
                        </div>

                        <div className="flex items-center space-x-4 px-3">
                            {variation === 2 ?
                                (
                                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        to={'/'} className={`text-gray-700 hover:text-orange-500 text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Home</Link>
                                ) : ''
                            }
                            <button
                                onClick={toggleTheme}
                                className={`rounded-full  p-3 ${theme === "light" ? "bg-gray-200  hover:bg-gray-100" : "hover:bg-orange-400 bg-orange-500"}`}
                                aria-label="Toggle theme"
                            >
                                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                            <Link to={variation == 1 ? '/event/find' : '/login'} className="hidden lg:flex align-center items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full hover:bg-orange-600 transition duration-300">

                                {variation === 2 ?
                                    (<>
                                        <span className=''>Login</span>
                                    </>) : (<>
                                        <Search size={18} />  <span className='hidden lg:flex'>Find Events</span>
                                    </>)}
                            </Link>

                            <div className="flex items-center lg:hidden">

                                <button
                                    onClick={toggleMenu}
                                    className="bg-orange-500 text-black pl-2 py-2 h-[3rem] lg:h-[4rem] pr-[2.5rem] lg:pr-[3.5rem] rounded-full relative flex items-center z-10"
                                >
                                    <span className="mx-4 text-white text-sm lg:text-lg font-sora">
                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                            to={'/event/find'} className="">
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
                    </>
                )}
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
                        <Link to="#" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Home</Link>
                        <Link to="/event/find" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Events</Link>
                        <Link to="/about" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">About Us</Link>
                        <Link to="/contact" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Contact Us</Link>
                        <Link to="/pricing" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Pricing</Link>
                        <Link to="/login" onClick={toggleMenu} className="block hover:text-orange-300 font-gluten transition-colors">Login</Link>

                    </nav>
                )}
            </div>
        </header>
    );
};

export default HeaderMain;