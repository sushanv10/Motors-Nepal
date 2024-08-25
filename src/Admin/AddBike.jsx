import React, { useState, useEffect } from "react";
import axiosInstance from "../Config/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const AddBike = () => {
  const [formData, setFormData] = useState({
    name: "",
    bikeType: "",
    brand: "",
    description: "",
    registrationYear: "",
    bikeCylinder: "",
    bikeSpeed: "",
    pricePerDay: "",
    bikeImage: null,
  });

  const [bikes, setBikes] = useState([]);
  const [editingBike, setEditingBike] = useState(null);

  const fetchBikes = async () => {
    try {
      const response = await axiosInstance.get("bikes");
      setBikes(response.data);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      bikeImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      if (editingBike) {
        // Update bike
        const response = await axiosInstance.patch(`bikes/update/${editingBike._id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success(response.data.msg);
        setEditingBike(null);
      } else {
        // Add new bike
        const response = await axiosInstance.post('bikes', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success(response.data.msg);
      }

      // Clear the form and fetch updated bikes
      setFormData({
        name: "",
        bikeType: "",
        brand: "",
        description: "",
        registrationYear: "",
        bikeCylinder: "",
        bikeSpeed: "",
        pricePerDay: "",
        bikeImage: null,
      });
      fetchBikes();
    } catch (error) {
      console.error('Error adding/updating bike:', error);
      toast.error(error.response?.data?.msg || 'An error occurred');
    }
  };

  const handleEdit = (bike) => {
    setEditingBike(bike);
    setFormData({
      name: bike.name,
      bikeType: bike.bikeType,
      brand: bike.brand,
      description: bike.description,
      registrationYear: bike.registrationYear,
      bikeCylinder: bike.bikeCylinder,
      bikeSpeed: bike.bikeSpeed,
      pricePerDay: bike.pricePerDay,
      bikeImage: null, // Handle displaying the existing image if needed
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`bikes/delete/${id}`);
      toast.success(response.data.msg);
      fetchBikes();
    } catch (error) {
      console.error('Error deleting Bike:', error);
      toast.error('Failed to delete Bike');
    }
  };

  return (
    <>
      <div className="text-2xl text-center mb-6">
        <h1>{editingBike ? "Edit Bike" : "Add Bike"}</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-lg m-8"
      >
        <ToastContainer />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Bike Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="text"
            name="bikeType"
            placeholder="Bike Type"
            value={formData.bikeType}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="number"
            name="registrationYear"
            placeholder="Registration Year"
            value={formData.registrationYear}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="number"
            name="bikeCylinder"
            placeholder="Bike Cylinder"
            value={formData.bikeCylinder}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="number"
            name="bikeSpeed"
            placeholder="Bike Speed"
            value={formData.bikeSpeed}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="number"
            name="pricePerDay"
            placeholder="Price Per Day"
            value={formData.pricePerDay}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="file"
            name="bikeImage"
            onChange={handleFileChange}
            className="border p-2"
            required={!editingBike}  // Only required if not editing
          />
          
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 col-span-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingBike ? "Update Bike" : "Add Bike"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl text-center mb-4">Bike List</h2>
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Brand</th>
              <th className="py-2 px-4 border">Registration Year</th>
              <th className="py-2 px-4 border">Cylinder</th>
              <th className="py-2 px-4 border">Speed</th>
              <th className="py-2 px-4 border">Price Per Day</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike) => (
              <tr key={bike._id}>
                <td className="py-2 px-4 border">{bike.name}</td>
                <td className="py-2 px-4 border">{bike.bikeType}</td>
                <td className="py-2 px-4 border">{bike.brand}</td>
                <td className="py-2 px-4 border">{bike.registrationYear}</td>
                <td className="py-2 px-4 border">{bike.bikeCylinder}</td>
                <td className="py-2 px-4 border">{bike.bikeSpeed}</td>
                <td className="py-2 px-4 border">${bike.pricePerDay}</td>
                <td className="py-2 px-4 border">
                  <img
                    src={bike.bikeImage}
                    alt={bike.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(bike)}
                    className="text-blue-500 mx-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(bike._id)}
                    className="text-red-500 mx-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddBike;