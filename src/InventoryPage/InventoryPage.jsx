import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FeatureBikeData from '../Card/FeatureBikeData';
import FooterComponent from '../Footer/FooterComponent';

const InventoryPage = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    bikeType: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bikes');
        setBikes(response.data);
        setFilteredBikes(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch bikes');
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...bikes];
    if (filters.brand) filtered = filtered.filter(bike => bike.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    if (filters.bikeType) filtered = filtered.filter(bike => bike.bikeType.toLowerCase().includes(filters.bikeType.toLowerCase()));
    if (filters.minPrice) filtered = filtered.filter(bike => bike.pricePerDay >= filters.minPrice);
    if (filters.maxPrice) filtered = filtered.filter(bike => bike.pricePerDay <= filters.maxPrice);
    setFilteredBikes(filtered);
  }, [filters, bikes]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <>
      <div className='relative h-[400px] bg-cover bg-center' style={{ backgroundImage: 'url("https://ajpmotoschile.cl/wp-content/uploads/2023/04/breadcrumb.jpg")' }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative flex flex-col pt-32 pl-5 text-center'>
          <h1 className='text-3xl font-bold text-white mb-2'>
            <Link to='/' className='hover:text-gray-300'>HOME</Link> / INVENTORY
          </h1>
          <h5 className='text-lg text-white'>Explore Our Range of Bikes</h5>
        </div>
      </div>

      <div className='p-10'>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Filter Bikes</h2>
          <form className='flex flex-col sm:flex-row gap-4 mb-8'>
            <input
              type='text'
              name='brand'
              placeholder='Brand'
              value={filters.brand}
              onChange={handleFilterChange}
              className='p-2 border rounded'
            />
            <input
              type='text'
              name='bikeType'
              placeholder='Bike Type'
              value={filters.bikeType}
              onChange={handleFilterChange}
              className='p-2 border rounded'
            />
            <input
              type='number'
              name='minPrice'
              placeholder='Min Price'
              value={filters.minPrice}
              onChange={handleFilterChange}
              className='p-2 border rounded'
            />
            <input
              type='number'
              name='maxPrice'
              placeholder='Max Price'
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className='p-2 border rounded'
            />
          </form>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-80'>
            <div className='loader'></div>
          </div>
        ) : error ? (
          <div className='flex justify-center items-center h-80'>
            <p className='text-red-600 text-xl'>{error}</p>
          </div>
        ) : (
          <>
            <div className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>Available Bikes</h2>
              <div className='flex flex-wrap gap-8'>
                {filteredBikes.length > 0 ? (
                  <FeatureBikeData data={filteredBikes} />
                ) : (
                  <p>No bikes match the selected filters.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <FooterComponent />
    </>
  );
};

export default InventoryPage;
