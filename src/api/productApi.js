import axios from "axios";

export const getProduct = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/product', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductsByCategory = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/product', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/product/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};


export const updateProduct = async (id) => {
  try {
    const response = await axios.put(`http://localhost:4000/api/product/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};