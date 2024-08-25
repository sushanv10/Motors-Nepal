import React from 'react';
import Button from '../ButtonComponent/Button';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/Cart';
import { toast, ToastContainer } from 'react-toastify';

const Data = ({data}) => {
  const [cart, setCart]= useCart()
   // The empty dependency array ensures useEffect runs only once

  return (
    <>
    <ToastContainer/>
    <div className='mt-5 rounded-[10px] flex flex-wrap justify-evenly gap-5'>
      {data.map((products,index) => (
        <div key={products._id} className='bg-white text-black rounded-[10px] h-[30rem] w-[18rem] p-2 shadow-lg shadow-gray-500' 
          data-aos="fade-up" id='shop-items' >
            <Link to={`/product/${products._id}` } >
            <div className="flex items-center justify-center mt-2">
              <img
                src={products.image || products.productImage}
                alt={products.name}
                className="rounded-[10px] h-[10rem] "
                />
            </div>
              </Link>
        
          <div className="text-center p-2">
            <p className='text-gray-600'>{products.productType}</p>
            <h2 className='p-2 font-bold text-[18px]'>{products.name}</h2>
            {/* <h3 className='text-gray-400 text-sm'>{ products.productType ? products.productType : products.brand}</h3> */}
            {/* <h1 className='p-2 font-bold text-[18px]'>{products.productType? products.productType : products.name}</h1> */}
            <p className='text-red-600'>${ products.price}</p>
           
          </div>
          <div className="flex justify-center">
            <div className="">
              <Button 
                className='mt-[-20px]' 
                text={'Add to Cart'} 
                icon={<RiShoppingCartLine className='ml-2'/>}  
                onClick={() => {
                    console.log('Button Clicked');
                    setCart([...cart, products]);
                    localStorage.setItem('cart', JSON.stringify([...cart, products]))
                    toast.success('Item Added to Cart');
                }} 
              />
              
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Data;
