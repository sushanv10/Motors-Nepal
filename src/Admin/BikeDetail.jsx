// import React, { useState } from "react";
// import axiosInstance from "../Config/axiosConfig";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddBikeDetails = () => {
//   const [bikeDetails, setBikeDetails] = useState({
//     name: "",
//     bikeType: "",
//     brand: "",
//     description: "",
//     registrationYear: "",
//     bikeCylinder: "",
//     bikeSpeed: "",
//     pricePerDay: "",
//     bikeImage: null,
//     engineType: "",
//     displacement: "",
//     fuelType: "",
//     transmission: "",
//     maxPower: "",
//     frontSuspension: "",
//     rearSuspension: "",
//     brakes: "",
//     overview: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBikeDetails({
//       ...bikeDetails,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setBikeDetails({
//       ...bikeDetails,
//       bikeImage: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const form = new FormData();
//       Object.keys(bikeDetails).forEach((key) => {
//         form.append(key, bikeDetails[key]);
//       });

//       const response = await axiosInstance.post("bikes", form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success(response.data.msg);

//       // Clear form after submission
//       setBikeDetails({
//         name: "",
//         bikeType: "",
//         brand: "",
//         description: "",
//         registrationYear: "",
//         bikeCylinder: "",
//         bikeSpeed: "",
//         pricePerDay: "",
//         bikeImage: null,
//         engineType: "",
//         displacement: "",
//         fuelType: "",
//         transmission: "",
//         maxPower: "",
//         frontSuspension: "",
//         rearSuspension: "",
//         brakes: "",
//         overview: "",
//       });
//     } catch (error) {
//       console.error("Error adding bike:", error);
//       toast.error("Failed to add bike");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="container mx-auto flex mt-10">
//         {/* Left Column: Content Section */}
//         <div className="w-2/3 pr-8">
//           <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-3xl font-bold mb-6">Add New Bike</h2>

//             <div className="mb-4">
//               <label className="block text-gray-700">Overview</label>
//               <textarea
//                 name="overview"
//                 value={bikeDetails.overview}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 rows="4"
//                 placeholder="Enter a brief overview of the bike"
//               ></textarea>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Bike Name"
//                 value={bikeDetails.name}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="bikeType"
//                 placeholder="Bike Type"
//                 value={bikeDetails.bikeType}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="brand"
//                 placeholder="Brand"
//                 value={bikeDetails.brand}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="registrationYear"
//                 placeholder="Registration Year"
//                 value={bikeDetails.registrationYear}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="bikeCylinder"
//                 placeholder="Bike Cylinder"
//                 value={bikeDetails.bikeCylinder}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="bikeSpeed"
//                 placeholder="Bike Speed"
//                 value={bikeDetails.bikeSpeed}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="pricePerDay"
//                 placeholder="Price Per Day"
//                 value={bikeDetails.pricePerDay}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//                 required
//               />
//               <input
//                 type="file"
//                 name="bikeImage"
//                 onChange={handleFileChange}
//                 className="border p-2 rounded"
//                 required
//               />
//             </div>

//             {/* Bike Specifications */}
//             <h3 className="text-xl font-bold mt-8 mb-4">Specifications</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="engineType"
//                 placeholder="Engine Type"
//                 value={bikeDetails.engineType}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="displacement"
//                 placeholder="Displacement"
//                 value={bikeDetails.displacement}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="fuelType"
//                 placeholder="Fuel Type"
//                 value={bikeDetails.fuel}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="transmission"
//                 placeholder="Transmission"
//                 value={bikeDetails.transmission}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="maxPower"
//                 placeholder="Max Power"
//                 value={bikeDetails.maxPower}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="frontSuspension"
//                 placeholder="Front Suspension"
//                 value={bikeDetails.frontSuspension}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="rearSuspension"
//                 placeholder="Rear Suspension"
//                 value={bikeDetails.rearSuspension}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="brakes"
//                 placeholder="Brakes"
//                 value={bikeDetails.brakes}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//             </div>

//             <button
//               type="submit"
//               className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add Bike
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddBikeDetails;
