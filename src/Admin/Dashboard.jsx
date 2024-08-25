import React from 'react';
 // Import the Header component

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow rounded w-[500px]">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-4xl font-bold">13,647</p>
            <p className="text-green-500 mt-2">▲ 2.3% Last Week</p>
          </div>
          <div className="bg-white p-4 shadow rounded w-[500px]">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-4xl font-bold">9,526</p>
            <p className="text-green-500 mt-2">▲ 8.1% Last Month</p>
          </div>
          <div className="bg-white p-4 shadow rounded w-[500px]">
            <h2 className="text-lg font-semibold">Deals</h2>
            <p className="text-4xl font-bold">976</p>
            <p className="text-red-500 mt-2">▼ 0.3% Last Month</p>
          </div>
          <div className="bg-white p-4 shadow rounded w-[500px]">
            <h2 className="text-lg font-semibold">MotorBikes Rented</h2>
            <p className="text-4xl font-bold">$123.6k</p>
            <p className="text-red-500 mt-2">▼ 10.6% Last Month</p>
          </div>
        </div>
      
    </>
  );
};

export default Dashboard;
