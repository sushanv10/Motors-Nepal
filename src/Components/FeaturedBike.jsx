import React, { useEffect, useState } from 'react';
import FeatureBikeData from '../Card/FeatureBikeData';
import axios from 'axios';

const FeaturedBike = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bikes');
        setBikes(response.data.slice(0, 4)); // Show only the first 4 bikes
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  return (
    <div>
      <div className='flex text-4xl font-bold p-10 gap-2 ' data-aos="fade-right">
        <h1 className=''>Featured</h1>
        <h1 className=' text-red-500'>Motor</h1>
        <h1 className=''>Bikes</h1>
      </div>
      <div>
        <FeatureBikeData data={bikes} />
      </div>
    </div>
  );
};

export default FeaturedBike;
