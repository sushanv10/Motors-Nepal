import React from 'react';
import { RiSearch2Line, RiShoppingCartLine, RiUserLine } from 'react-icons/ri';
import logoImage from '../assets/image/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import { useCart } from '../Context/Cart';
import { useState } from 'react';

const NavBar = () => {
  const [cart]=useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  const handleProfileClick = () => {
    if (auth.user) {
      navigate('/profile'); // Navigate to the profile page if the user is logged in
    } else {
      navigate('/login'); // Navigate to the login page if the user is not logged in
    }
  };
  // if (auth.user && auth.user.role === 'admin') {
  //   return ""; // Do not render the navbar if the user is an admin
  // }
   if (auth.user?.role === 'admin') {
    return null;
  }
  

  return (
  
    <nav className='bg-white h-[70px] w-full flex justify-between items-center fixed z-10' data-aos="fade-down">
      {/* Logo */}
      
      <img src={logoImage} alt="Logo" className="h-[120px] mt-[20px]" />
      
      {/* Navigation Links */}
      <div className=" ml-[100px]">
        <ul className='text-black flex gap-10 cursor-pointer pt-4'>
          <li id='navLinks'>
            <Link to='/'>HOME</Link>
          </li>
          <li id='navLinks'>
            <Link to='/about'>ABOUT</Link>
          </li>
          <li id='navLinks'>
            <Link to='/inventory'>INVENTORY</Link>
          </li>
          <li id='navLinks'>
            <Link to='/shop'>SHOP</Link>
          </li>
          <li id='navLinks'>
            <Link to='/contact'>CONTACT</Link>
          </li>
        </ul>
      </div>
      
      {/* Icons and Search Bar */}
      <div className='flex gap-4 mr-4 cursor-pointer items-center pt-4 text-black'>
        <div className='flex items-center border border-gray-300 rounded'>
          <input 
            type='search' 
            placeholder='Search' 
            className='pl-2 h-[30px] outline-none' 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button><RiSearch2Line className='text-xl mr-2' /></button>
        </div>
        
       <div className="relative">
        <Link to='/cart'>
          <RiShoppingCartLine className='text-2xl' />
          {cart?.length > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
            )}
        </Link>
       </div>
        <button onClick={handleProfileClick}>
          <RiUserLine className='text-xl'/>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
