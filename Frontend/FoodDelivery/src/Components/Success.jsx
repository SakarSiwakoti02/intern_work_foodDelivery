import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const [orderStatus, setOrderStatus] = useState('processing');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const submitOrder = async () => {
      try {
        // Get token and extract location
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const deliveryAddress = decodedToken.location;
        
        // Get cart items
        const cartItemsString = localStorage.getItem("cartItems");
        if (!cartItemsString) {
          console.error("No cart items found");
          return;
        }
        
        const cartItems = JSON.parse(cartItemsString);
        
        // Calculate total amount and prepare order details
        let totalAmount = 0;
        let allFoodNames = [];
        let totalQuantity = 0;
        
        cartItems.forEach(item => {
          totalAmount += item.price * item.quantity;
          allFoodNames.push(item.name);
          totalQuantity += item.quantity;
        });
        
        // Prepare data for API
        const orderData = {
          foodName: allFoodNames.join(", "),
          quantity: totalQuantity,
          totalAmount: totalAmount,
          deliveryAddress: deliveryAddress,
        
        };
        
        // Send order to backend
        const response = await axios.post(
          "http://localhost:3000/payment/Add-Order", 
          orderData,
         
        );
        
        // Handle successful response
        if (response.data.status === 'success') {
          setOrderStatus('completed');
          setOrderId(response.data.data.order.id || Math.floor(100000 + Math.random() * 900000));
          // Clear cart after successful order
          localStorage.removeItem("cartItems");
        }
      } catch (error) {
        console.error("Error submitting order:", error);
        setOrderStatus('failed');
      }
    };

    submitOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your payment has been processed and your order is confirmed.</p>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">#{orderId || Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <NavLink to="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300">
                Go Back
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Success;