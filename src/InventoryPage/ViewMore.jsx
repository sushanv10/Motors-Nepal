import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../Config/axiosConfig';
import Button from '../ButtonComponent/Button';

export default function ViewMore() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await axiosInstance.get(`bikes/${id}`);
        console.log('API Response:', response.data); // Check the response structure
        setBike(response.data); // Update this based on your response structure
      } catch (error) {
        console.error('Error fetching bike:', error);
      }
    };

    fetchBike();
  }, [id]);

  if (!bike) {
    return <div className='flex justify-center items-center text-center'>Loading...</div>;
  }

  return (
    <>
      {/* Top Section with Background Image */}
      <div className='relative h-[400px] bg-cover bg-center' style={{ backgroundImage: 'url("https://ajpmotoschile.cl/wp-content/uploads/2023/04/breadcrumb.jpg")' }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative flex flex-col pt-[200px] pl-5 text-center'>
          <h1 className='text-2xl font-bold text-white text-center'><Link to='/'>HOME </Link> / BIKES</h1>
          <h5 className='text-white'>{bike.name}</h5>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto flex mt-10">
        {/* Left Column: Content Section */}
        <div className="w-2/3 pr-8">
          <div className="border-b border-gray-300 pb-5 mb-5">
            <h2 className="text-3xl font-bold">Overview</h2>
          </div>
              <p className="mt-4 text-gray-700">{bike.description}</p>
        </div>

        {/* Right Column: Sidebar */}
        <div className="w-1/3 pl-8">
          <div className="bg-[#222222] text-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Engine</h3>
            <p>Type: {bike.bikeType}</p>
            <p>Displacement: {bike.displacement} cc</p>
            <p>Fuel: {bike.fuel}</p>
            <p>Transmission: {bike.transmission}</p>
            <p>Max Power: {bike.maxPower} hp</p>
          </div>

          {/* Repeat for other sections like Suspension, Power Transmission */}
          <div className="bg-[#222222] text-white p-4 rounded shadow-md mt-4">
            <h3 className="text-lg font-semibold mb-4">Suspension/Brakes</h3>
            <p>Front Suspension: {bike.frontSuspension}</p>
            <p>Rear Suspension: {bike.rearSuspension}</p>
            <p>Brakes: {bike.brakes}</p>
          </div>

          <div className="bg-[#222222] text-white p-4 rounded shadow-md mt-4">
              <h3 className="text-lg font-semibold mb-4">Price</h3>
              <p className='text-red-500'>Total Price (per day) : NPR {bike.pricePerDay}</p>
              <div className="mt-4">
                <Link to={`/book/${bike._id}` } >
                <Button text="Rent Bike" />
                </Link>

              </div>
              
          </div>

          {/* Repeat for more sections */}
        </div>
      </div>
    </>
  );
}
