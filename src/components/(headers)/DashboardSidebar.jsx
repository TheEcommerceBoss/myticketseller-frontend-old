import React from 'react';
import { useTheme } from "../../context/ThemeContext";
import logo from '../../assets/(site_assets)/logo.png';
import logoDark from '../../assets/(site_assets)/logo-dark.png';
import { Link } from "react-router-dom";
import {
  Home,
  PlusCircle,
  ListChecks,
  Ticket,
  Megaphone,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SideBar = ({ isOpen, toggleSidebar }) => {  // 'toggleSidebar' will be passed by the parent
  const { theme } = useTheme();

  const NavItem = ({ icon, text, link, active }) => (
    <Link to={link}>
      <div
        className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors duration-200
          ${active
            ? theme === 'dark'
              ? 'bg-[#222]'
              : 'bg-[#040171] bg-opacity-10 text-[#040171] font-semibold'
            : theme === 'dark'
              ? 'text-white hover:bg-[#222]'
              : 'text-gray-600 hover:bg-gray-100'
          }
          ${!isOpen ? 'justify-center' : ''}`}
      >
        <div className={`${!isOpen ? 'w-8 h-8 flex items-center justify-center' : ''}`}>
          {icon}
        </div>
        {isOpen && <span className="transition-opacity ">{text}</span>}
      </div>
    </Link>
  );

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-200
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleSidebar}  // Use the toggle function passed as a prop
      />

      {/* Sidebar */}
      <div className={`fixed min-h-screen lg:sticky top-0 h-full z-30 transition-all duration-200
        ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}
        ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
        shadow-lg`}
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-between">
          <Link   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
 to={'/'}>
            <img
              src={theme === "light" ? logo : logoDark}
              className={`transition-all duration-200 ${isOpen ? 'w-[5rem]' : 'w-[5rem]'}`}
              alt="Logo"
            />
          </Link>
 
        </div>

        {/* Navigation */}
        <nav className="mt-5">
          <NavItem icon={<Home size={24} />} link="/dashboard" text="Dashboard" active />
          <NavItem icon={<PlusCircle size={24} />} link="/dashboard/event/create" text="Create New Event" />
          <NavItem icon={<ListChecks size={24} />} link="/dashboard/event/manage" text="Manage Events" />
          <NavItem icon={<Ticket size={24} />} link="/dashboard/ticket/management" text="Ticket Management" />
          <NavItem icon={<Megaphone size={24} />} link="/dashboard/event/promotion" text="Event Promotion Tools" />
          <NavItem icon={<Settings size={24} />} link="/dashboard/settings" text="Settings" />
          <NavItem icon={<HelpCircle size={24} />} link="/dashboard/support" text="Support" />
        </nav>
      </div>
    </>
  );
};

export default SideBar;
