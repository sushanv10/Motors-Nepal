import React, { useState, useEffect } from "react";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    const newQuantity = parseInt(quantity, 10);

    if (isNaN(newQuantity) || newQuantity < 1) {
      console.log(`Invalid quantity for product ${productId}: ${quantity}`);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((product) =>
        product._id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  // Function to handle product removal
  const handleRemoveProduct = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    console.log(`Removed product ${productId}`);
  };

  // Calculate total price for each product
  const calculateTotal = (product) => {
    return product.price * (product.quantity || 1);
  };

  // Calculate grand total for all products in cart
  const calculateGrandTotal = () => {
    return cart.reduce((total, product) => total + calculateTotal(product), 0);
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/product/braintree/token");

      setClientToken(data?.clientToken);
      console.log("Client Token:", data?.clientToken); // Added for debugging
    } catch (error) {
      console.log("Error fetching client token:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      console.log("Payment Nonce:", nonce); // Added for debugging
      const { data } = await axios.post("http://localhost:4000/api/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log("Error processing payment:", error);
      setLoading(false);
    }
  };

  return (
    <div className="pt-[100px]">
      <div className="bg-slate-100 h-[100px] w-[500px] rounded-[10px] ml-4">
        <h1 className="text-center text-[20px] pt-2 font-bold">
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <h4 className="text-center">
          {cart?.length
            ? `You Have ${cart.length} items in your cart. ${
                auth?.token ? "" : "Please Login to Checkout"
              }`
            : "Your Cart Is Empty"}
        </h4>
      </div>

      {cart.length > 0 && (
        <div className="flex flex-wrap ml-10 mt-5">
          <div className="w-full md:w-3/4">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="w-full bg-black text-white border-b">
                  <th className="text-left p-3">Image</th>
                  <th className="text-left p-3">Product Name</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Quantity</th>
                  <th className="text-left p-3">Total</th>
                  <th className="text-left p-3">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="p-3">
                      <img
                        src={product.image || product.productImage}
                        alt={product.name}
                        className="rounded h-[5rem] w-[5rem]"
                      />
                    </td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={product.quantity || 1}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(product._id, e.target.value)
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="p-3">${calculateTotal(product)}</td>
                    <td className="p-3">
                      <RiDeleteBin6Line
                        onClick={() => handleRemoveProduct(product._id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        size={24}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full md:w-1/4 p-5">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-bold mb-4">Checkout</h2>
              <p className="text-right font-bold pr-[95px]">
                Grand Total: ${calculateGrandTotal()}
              </p>
              <div className="mt-2">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="bg-red-500 text-white h-[50px] w-[150px] rounded-lg"
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
