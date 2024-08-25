import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../Context/Auth';
import { useCart } from '../Context/Cart';

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart(); // Correctly destructure cart and setCart

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!userData.email) errors.email = "Email is required";
    if (!userData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:4000/api/auth/login", {

          email: userData.email,
          password: userData.password,
        });

        const { token, userDetails } = response.data;
        setAuth({ user: userDetails, token });

        localStorage.setItem("token", response.data.token);
        

        
        // Clear previous cart data
        localStorage.removeItem('cart');
        setCart([]); // Reset cart state to empty
        
        toast.success("Login successful");
        setTimeout(() => {
          if (userDetails && userDetails.role === 'admin') {
            navigate("/profile"); // Adjust the path to your admin dashboard
          } else {
            navigate("/");
          }
        }, 1000);
      } catch (error) {
        console.error(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
              value={userData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
              value={userData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:text-red-500 hover:bg-white border-black transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Don't have an account? <Link to='/register' className="text-red-500 hover:underline">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
