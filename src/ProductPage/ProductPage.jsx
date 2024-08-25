import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../ButtonComponent/Button'
import { RiShoppingCartLine } from 'react-icons/ri'
import { getSingleProduct } from '../api/productApi'
import { toast, ToastContainer } from 'react-toastify'
import { useCart } from '../Context/Cart'


export default function ProductPage() {
  const [cart, setCart] = useCart()

    const [products, setProducts] = useState({});
    let {id} = useParams();

    useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getSingleProduct(id);
      setProducts(fetchedProduct);
    };

    fetchProduct();
  }, [id]);
      
    //   const getProduct = async () => {
    //     const response = await axios.get(`https://motoworldnepal.com/wp-json/wp/v2/product/${id}`);
    
  return (
    <>
    <ToastContainer/>
     {/* Header Section */}
    <div className='relative h-[400px] bg-cover bg-center' style={{ backgroundImage: 'url("https://ajpmotoschile.cl/wp-content/uploads/2023/04/breadcrumb.jpg")' }}>
      <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative flex flex-col pt-[200px] pl-5 text-center'>
          <h1 className='text-2xl font-bold text-white text-center'><Link to='/'>HOME </Link> / PRODUCT</h1>
          <h5 className='text-white'>PRODUCT</h5>
      </div>
  </div>

  <div className="flex justify-center">
    <h1 className='pt-[80px] text-2xl font-bold'>SHOP</h1>
  </div>

  <div className="flex justify-center mt-10 ml-10">
    <div className="border-[1px] border-gray-400 h-[420px] w-[400px]  ">
        <img src={products.image || products.productImage}
        className='mt-5'></img>
    </div>
    <div className="block ml-20">
        <h1 className='text-[30px] font-bold'>{products.name}</h1>
        <p className='text-green-500 font-bold pt-2'>In Stock</p>
        <ul className='list-disc mt-5 ml-5'>
            <li>{products.detail1}</li>
            <li>{products.detail2}</li>
            <li>{products.detail3}</li>
            <li>{products.detail4}</li>
            <li>{products.detail5}</li>
            <li>{products.detail6}</li>
        </ul>
        <p className='text-red-500 font-bold text-2xl pt-2 '>$ {products.price}</p>
        <div className="mt-5">
              <Button 
                className='mt-[-20px]' 
                text={'Add to Cart'} 
                icon={<RiShoppingCartLine className='ml-2'/>}  
                onClick={() => {
                  console.log('Button Clicked');
                  setCart([...cart, products]);
                  toast.success('Item Added to Cart');
                }} 
              />
        </div>
    </div>
    
  </div>
<div className="flex justify-start mt-[80px] ">
    <div role="tablist" className="tabs tabs-bordered"  >
    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Description" />
    <div role="tabpanel" className="tab-content p-10"><p>{products.description}</p></div>

  {/* <input
    type="radio"
    name="my_tabs_1"
    role="tab"
    className="tab"
    aria-label="Additonal Information"
    defaultChecked />
  <div role="tabpanel" className="tab-content p-10">Tab content 2</div> */}

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Reviews" />
  <div role="tabpanel" className="tab-content p-10"><p></p></div>
</div>


</div>
  
    
    </>
  
  )

}
