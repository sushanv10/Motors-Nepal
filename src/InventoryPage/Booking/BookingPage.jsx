import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Config/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../Context/Auth';


export default function BookingPage() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const [auth]= useAuth();

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await axiosInstance.get(`bikes/${id}`);
        setBike(response.data);
      } catch (error) {
        console.error('Error fetching bike:', error);
      }
    };

    fetchBike();
  }, [id]);

  useEffect(() =>{
    if(!auth.user){
      navigate('/login');
    }
  })

  const handleBooking = async () => {
    try {
      await axiosInstance.post('bookings', {
        bikeId: id,
        startDate,
        endDate
      });
      toast.success('Booking successful!');
      setTimeout(() =>
        navigate('/'), 2000);
        
      // Optionally redirect to another page or clear form
      // Redirect to homepage or another page if needed
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
    }
  };

  if (!bike) {
    return <div className='flex justify-center items-center text-center'>Loading...</div>;
  }

  return (
    <>
   
     <ToastContainer />
    <div className="container mx-auto pt-[150px]">
      <h1 className="text-3xl font-bold mb-5">Rent {bike.name}</h1>
      <div className="border p-5 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Rental Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </div>
     
    </div>
     </>
  );
}
