import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FooterComponent from '../Footer/FooterComponent';
import Data from '../Card/Data';
import Filter from './Filter/Filter';
import { getProduct } from '../api/productApi';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm state here
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();
  const [error, setError] = useState(null);
  const productsPerPage = 6;
  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    const searchFromUrl = params.get('search'); // Get search term from URL
    setSelectedCategory(categoryFromUrl || '');
    setSearchTerm(searchFromUrl || ''); // Set the search term
  }, [location.search]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const fetchedProducts = await getProduct();
  //     setProducts(fetchedProducts);
  //     setFilteredProducts(fetchedProducts);
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/product', {
          params: {
            category: selectedCategory,
            search: searchTerm, // Pass search term to API
          },
        });
        setProducts(response.data); 
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm]); 

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesSearchTerm = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchesCategory && matchesSearchTerm;
    });
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  

  const handleFilterChange = (filtered) => {
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Calculate the indices for slicing the products array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const recommendedData = [
  //   { id: 1, name: 'All Products' },
  //   { id: 2, name: 'Sale' },
  //   { id: 3, name: 'Helmets' },
  //   { id: 4, name: 'Gloves' },
  // ];

  return (
    <>
      {/* Header Section */}
      <div className='relative h-[400px] bg-cover bg-center' style={{ backgroundImage: 'url("https://ajpmotoschile.cl/wp-content/uploads/2023/04/breadcrumb.jpg")' }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative flex flex-col pt-[200px] pl-5 text-center'>
          <h1 className='text-2xl font-bold text-white text-center'><Link to='/'>HOME </Link> / SHOP</h1>
          <h5 className='text-white'>Shop</h5>
        </div>
      </div>

      {/* Main Section */}
      {/* <div className="flex pt-10 pl-10">
        <h1 className='font-bold text-2xl'>Recommended</h1>
      </div> */}
      {/* <div className="flex gap-2 ml-10 mt-4">
        {recommendedData.map((item) => (
          <div key={item.id} className="flex bg-slate-50 h-[40px] w-[140px] font-bold border-[1px] border-black hover:text-red-500">
            <button className='pl-4 pt-2'>{item.name}</button>
          </div>
        ))}
      </div> */}

      <div className="flex justify-end">
        <h2 className='font-bold text-2xl pr-[3rem]'>Filter Products</h2>
      </div>

      <div className='flex mt-2 ml-10'>
        <div>
          <Data data={currentProducts} />
        </div>

        <div className='flex ml-20 '>
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center mt-5'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border ${
              index + 1 === currentPage ? 'bg-red-500 text-white' : 'bg-white text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <FooterComponent />
    </>
  );
};

export default Shop;
