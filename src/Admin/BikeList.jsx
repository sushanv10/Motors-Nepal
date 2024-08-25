// src/Pages/BikeList.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Config/axiosConfig'; // Adjust path as necessary

const BikeList = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axiosInstance.get('bikes');
        setBikes(response.data);
      } catch (error) {
        console.error('Error fetching bike data:', error);
      }
    };
    fetchBikes();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg m-8">
      <h1 className="text-2xl font-bold mb-4">Bike List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Image</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike._id}>
              <td className="py-2 px-4 border-b">{bike.name}</td>
              <td className="py-2 px-4 border-b">{bike.bikeType}</td>
              <td className="py-2 px-4 border-b">{bike.brand}</td>
              <td className="py-2 px-4 border-b">
                <img src={bike.bikeImage} alt={bike.name} className="w-16 h-16 object-cover" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BikeList;
