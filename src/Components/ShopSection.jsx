import React, { useState, useEffect } from 'react';
import Data from '../Card/Data';
import { getProduct } from '../api/productApi';

const ShopSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProduct();
      setProducts(fetchedProducts.slice(0, 4)); // Show only the first 4 products
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className='flex flex-col justify-center items-center mt-[100px]'>
        <div className='bg-red-500 h-[40px] w-[120px] ml-[20px] items-center flex' data-aos="fade-right">
          <h3 className='text-white pl-2'>SHOP ONLINE</h3>
        </div>
        <h1 className='font-bold text-[35px] pt-4 pl-[20px]' data-aos="fade-left">FEATURED PRODUCTS</h1>
      </div>
      <div>
        <Data data={products} />
      </div>
    </>
  );
};

export default ShopSection;
