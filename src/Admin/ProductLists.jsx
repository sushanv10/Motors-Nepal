import React, { useEffect, useState } from "react";
import { getProduct } from '../api/productApi'
import { useParams } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]); 
   let {id} = useParams();// Initialize as an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

 useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct(id);
      setProducts(fetchedProduct);
    };

    fetchProduct();
  }, [id]);

  

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

 return (
    <> 
  <div>
    <h1 className="text-2xl text-center">Product List</h1>
    {products && products.length > 0 ? (
      <table className="mt-10">
        <thead>
          <tr>
            <th className="flex">Name</th>
            <th>Price</th>
            <th className="flex ml-[100px]">Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td className="flex ml-20 mt-5">
                <img src={product.productImage} alt={product.name} width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No products found</p>
    )}
  </div>
  </>
);
};

export default ProductList;
