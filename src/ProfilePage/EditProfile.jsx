import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Config/axiosConfig';

const EditProfile = () => {
  const [auth] = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setProfile({
        name: auth.user.name || '',
        email: auth.user.email || '',
        bio: auth.user.bio || '' // Safely access bio
      });
    }
  }, [auth.user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put('profile');
      if (response.data.success) {
        // Update the auth context with the new profile data
        // setAuth({...auth, user: response.data.user});
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
