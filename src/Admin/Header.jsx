import React, { useState } from 'react';
import { FaSearch, FaBell, FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray- pl-2"></h1>
      <div className="flex items-center space-x-4">
        <div className="relative ">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400 dark:text-gray-500" />
        </div>
        <button onClick={toggleDarkMode}>
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </button>
        <button className="relative">
          <FaBell className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 bg-red-600 rounded-full"></span>
        </button>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
