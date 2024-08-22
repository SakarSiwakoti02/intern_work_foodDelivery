import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  HomeIcon,
  InformationCircleIcon,
  ListBulletIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

// New SVG Logo Component - "Fresh Sprout on a Plate"
const DailyDishLogoIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shadow-sm"
  >
    {/* Plate Background - similar to your "Screenshot 2025-05-31 at 01.43.04.png" */}
    <circle cx="26" cy="26" r="22" fill="#FFFBEB" /> {/* A very light cream, like amber-50 */}
    <circle cx="26" cy="26" r="20" fill="#FB923C" /> {/* orange-400 */}
    <circle cx="26" cy="26" r="17" fill="#FFFBEB" /> {/* Inner plate area */}

    {/* Stylized Sprout/Leaves - representing fresh food */}
    <path
      d="M26 30 Q26 22 22 20 C20 24 22 28 26 30 Z"
      fill="#4ADE80" // A vibrant green, like green-400
    />
    <path
      d="M26 30 Q26 22 30 20 C32 24 30 28 26 30 Z"
      fill="#34D399" // A slightly darker green, like emerald-400
    />
    <circle cx="26" cy="31" r="2.5" fill="#FDBA74" /> {/* Small orange 'dot' at the base, like a seed or fruit */}
  </svg>
);


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        setIsLoggedIn(!!localStorage.getItem("token"));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const navLinkContent = (IconComponent, text) => (
    <span className="flex items-center space-x-1.5">
      <IconComponent className="h-5 w-5" />
      <span>{text}</span>
    </span>
  );

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 ${
      isActive
        ? 'text-orange-600 bg-orange-100'
        : 'text-stone-600 hover:text-orange-600 hover:bg-orange-50'
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-4 py-3 rounded-md text-base font-semibold transition-colors duration-300 ease-in-out ${
      isActive
        ? 'text-orange-600 bg-orange-100'
        : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const handleLoginNav = () => {
     setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out font-['Nunito',_sans-serif] ${isScrolled ? 'bg-amber-50/95 shadow-lg backdrop-blur-md' : 'bg-amber-50/80'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Updated Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center group">
              {/* New SVG Logo */}
              <DailyDishLogoIcon />
              <div className="ml-2.5 md:ml-3">
                <span className="block text-xl md:text-2xl font-extrabold text-stone-800 leading-tight">Daily</span>
                <span className="block text-xl md:text-2xl font-extrabold text-orange-500 leading-tight -mt-1">Dish</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink to="/" className={navLinkClasses}>{navLinkContent(HomeIcon, "Home")}</NavLink>
            <NavLink to="/AboutUs" className={navLinkClasses}>{navLinkContent(InformationCircleIcon, "About Us")}</NavLink>
            <NavLink to="/Menu" className={navLinkClasses}>{navLinkContent(ListBulletIcon, "Menu")}</NavLink>
            <NavLink to="/FAQ" className={navLinkClasses}>{navLinkContent(QuestionMarkCircleIcon, "FAQ")}</NavLink>
            <NavLink to="/Contact" className={navLinkClasses}>{navLinkContent(EnvelopeIcon, "Contact")}</NavLink>
          </div>

          {/* Right side buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out flex items-center"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 transform rotate-180" />
                Sign Out
              </button>
            ) : (
              <NavLink to="/login">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  Sign In
                </button>
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-600 hover:text-orange-600 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`md:hidden overflow-hidden ${isMenuOpen ? 'block' : 'hidden'} bg-amber-50 shadow-lg border-t border-orange-100`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>{navLinkContent(HomeIcon, "Home")}</NavLink>
          <NavLink to="/AboutUs" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>{navLinkContent(InformationCircleIcon, "About Us")}</NavLink>
          <NavLink to="/Menu" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>{navLinkContent(ListBulletIcon, "Menu")}</NavLink>
          <NavLink to="/FAQ" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>{navLinkContent(QuestionMarkCircleIcon, "FAQ")}</NavLink>
          <NavLink to="/Contact" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>{navLinkContent(EnvelopeIcon, "Contact")}</NavLink>
        </div>
        <div className="pt-4 pb-4 border-t border-orange-100">
          <div className="px-3 space-y-3">
            {isLoggedIn ? (
              <button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out flex items-center justify-center"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 transform rotate-180" />
                Sign Out
              </button>
            ) : (
              <NavLink to="/login" className="block w-full" onClick={handleLoginNav}>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out flex items-center justify-center">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  Sign In
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;