import React, { useState, useEffect } from 'react';
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
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
const SideBar = ({ variation, showsearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavItem = ({ icon, text, link, active }) => (
    <Link to={link}>
      <div
        className={`flex items-center space-x-3 px-4 py-3  cursor-pointer ${active ? theme === 'dark' ? 'bg-[#222]' : 'bg-[#040171] bg-opacity-10 text-[#040171] font-semibold ' : theme === 'dark' ? 'text-white' : 'text-gray-600'
          }`}
      >
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  );

  return (
    <div className={`w-64 shadow-lg  ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>

      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Link to={'/'} >
            <img src={theme === "light" ? logo : logoDark} className="px-5 py-2 w-[6.5rem]" alt="" />
          </Link>
        </div>
      </div>

      <nav className="mt-5">
        <NavItem icon={<Home />} link="/dashboard" text="Dashboard" active />
        <NavItem icon={<PlusCircle />} link="/dashboard/event/create" text="Create New Event" />
        <NavItem icon={<ListChecks />} link="/dashboard/event/manage" text="Manage Events" />
        <NavItem icon={<Ticket />} link="/dashboard/ticket/management" text="Ticket Management" />
        <NavItem icon={<Megaphone />} link="/dashboard/event/promotion" text="Event Promotion Tools" />
        <NavItem icon={<Settings />} link="/dashboard/settings" text="Settings" />
        <NavItem icon={<HelpCircle />} link="/dashboard/support" text="Support" />
      </nav>
    </div>


  );
};

export default SideBar;