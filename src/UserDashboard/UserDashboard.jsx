import React from 'react';
import { useAuth } from '../Context/Auth';
import { FaUserCircle, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import Button from '../ButtonComponent/Button';
import { ToastContainer, toast } from 'react-toastify'; // Ensure you have this component
import { useNavigate } from 'react-router-dom';
// import { useCart } from '../Context/Cart';

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  // const [setCart]= useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem('auth'); 
    localStorage.removeItem('cart'); // Clear cart
    // setCart([]); // Ensure this matches how you store auth data
    toast.success('Logout successful');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 pt-[30vh]">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center">
              <FaUserCircle className="text-6xl text-gray-500 mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Hello, {auth.user ? auth.user.name : 'Guest'}!
                </h1>
                <p className="text-gray-600">Welcome back to your profile page.</p>
              </div>
            </div>
            <Button
              text="Edit Profile"
              icon={<FaEdit className="ml-2" />}
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => navigate('/edit-profile')} // Navigate to edit profile page
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-lg w-full max-w-md mb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Profile Information</h2>
              <p className="text-gray-600">Email: {auth.user ? auth.user.email : 'N/A'}</p>
              {/* Add more profile info here */}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
