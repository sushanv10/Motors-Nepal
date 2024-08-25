import React, { useEffect, useState } from "react";
import axiosInstance from "../Config/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    category: "",
    productType:"",
    description: "",
    detail1: "",
    detail2: "",
    detail3: "",
    detail4: "",
    detail5: "",
    detail6:"",
    name: "",
    price: "",
    // brand: "",
    productImage: "",
    countInStock: "",
  });

  const [category, setCategory] = useState([]);

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
      productImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("productType", formData.productType)
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("detail1", formData.detail1); 
    data.append("detail2", formData.detail2);
    data.append("detail3", formData.detail3);
    data.append("detail4", formData.detail4);
    data.append("detail5", formData.detail5);
    data.append("detail6", formData.detail6);
    data.append("productImage", formData.productImage);
    data.append("countInStock", formData.countInStock);

    console.log("Data:", data);
    console.log("FormData:", formData);

    try {
      const response = await axiosInstance.post("product/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.msg);
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("category/all");
        const categories = response.data.categories;
        setCategory(categories);

        // Set default category to the first one if available
        if (categories.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            category: categories[0]._id,
          }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
    <div className="text-2xl text-center">
      <h1>Add Product</h1>
    </div>
    <form
      onSubmit={handleSubmit}
      className="  p-8 bg-white rounded-lg shadow-lg m-8" //max-w-xl
    >
      <ToastContainer />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category:
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {category.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Title:
        </label>
        <input
          type="text"
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

       <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
       
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price:
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

       <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Detail 1:
        </label>
        <input
          type="text"
          name="detail1"
          value={formData.detail1}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Detail 2:
        </label>
        <input
          type="text"
          name="detail2"
          value={formData.detail2}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Detail 3:
        </label>
        <input
          type="text"
          name="detail3"
          value={formData.detail3}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Detail 4:
        </label>
        <input
          type="text"
          name="detail4"
          value={formData.detail4}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Detail 5:
        </label>
        <input
          type="text"
          name="detail5"
          value={formData.detail5}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Detail 6:
        </label>
        <input
          type="text"
          name="detail6"
          value={formData.detail6}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>


     
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Image:
        </label>
        <input
          type="file"
          name="productImage"
          onChange={handleFileChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Count in Stock:
        </label>
        <input
          type="number"
          name="countInStock"
          value={formData.countInStock}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </div>
    </form>
      </>
  );
};


export default AddProduct;
