import React, { useState } from 'react';
import { CategoryOutlined } from '@mui/icons-material';
import { RiArrowDropDownFill, RiDashboardFill, RiShirtLine, RiUser2Line, RiSettings2Line, RiBikeLine } from 'react-icons/ri';

const SideBar = ({ setActiveComponent }) => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBikeOpen, setIsBikeOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white h-[150rem] w-64 ">
      <div className="p-6">
        <h1 className="text-3xl font-semibold">Motor's Nepal</h1>
      </div>

      <div
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer"
        onClick={() => setActiveComponent('Dashboard')}
      >
        <RiDashboardFill className="inline-block mr-2" /> Dashboard
      </div>

      {/* Product Dropdown */}
      <div
        className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer"
        onClick={() => setIsProductOpen(!isProductOpen)}
      >
        <div className="flex justify-between items-center">
          <span><RiShirtLine className="inline-block mr-2" /> Products</span>
          <RiArrowDropDownFill className={`transform transition-transform ${isProductOpen ? 'rotate-180' : ''}`} />
        </div>
        {isProductOpen && (
          <div className="ml-6 mt-2">
            <div
              className="block py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => setActiveComponent('ProductList')}
            >
              List
            </div>
            <div
              className="block py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => setActiveComponent('CreateProduct')}
            >
              Create
            </div>
           
          </div>
        )}
      </div>

      {/* Category Dropdown */}
      <div
        className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer"
        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
      >
        <div className="flex justify-between items-center">
          <span><CategoryOutlined className="inline-block mr-2" /> Category</span>
          <RiArrowDropDownFill className={`transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
        </div>
        {isCategoryOpen && (
          <div className="ml-6 mt-2">
            <div
              className="block py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => setActiveComponent('CategoryList')}
            >
              List
            </div>
            <div
              className="block py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => setActiveComponent('CreateCategory')}
            >
              Create
            </div>
           
          </div>
        )}
      </div>

      <div
        className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer"
        onClick={() => setIsBikeOpen(!isBikeOpen)}
      >
        <div className="flex justify-between items-center">
          <span><RiBikeLine className="inline-block mr-2" /> Bike</span>
          <RiArrowDropDownFill className={`transform transition-transform ${isBikeOpen ? 'rotate-180' : ''}`} />
        </div>
        {isBikeOpen && (
          <div className="ml-6 mt-2">
            <div
              className="block py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => setActiveComponent('BikeLists')}
            >
              List
            </div>
            <div
              className="block py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => setActiveComponent('AddBike')}
            >
              Add
            </div>
             <div
              className="block py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => setActiveComponent('BikeDetail')}
            >
              Detail
            </div>
           
          </div>
        )}
      </div>


      <div
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer"
        onClick={() => setActiveComponent('Profile')}
      >
        <RiUser2Line className="inline-block mr-2" /> Profile
      </div>

      <div
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 cursor-pointer"
        onClick={() => setActiveComponent('Settings')}
      >
        <RiSettings2Line className="inline-block mr-2" /> Settings
      </div>
    </div>
  );
};

export default SideBar;
