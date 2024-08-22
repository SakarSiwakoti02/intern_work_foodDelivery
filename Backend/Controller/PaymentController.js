const axios = require("axios");
const { orders } = require("../models");
// You may need to import your models like this:
// const { YourModel } = require("../models");

exports.initiatePayment = async (req, res) => {
  try {
    const { orderId, amount} = req.body;
    
    if (!orderId || !amount) {
      return res.status(400).json({
        message: "Please provide orderId and amount"
      });
    }
    
    const data = {
      return_url: "http://localhost:5173/success",
      purchase_order_id: orderId,
      amount: amount * 100,
      purchase_order_name: "Order food",
      website_url: "http://localhost:5173/"
    };
    
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      data,
      {
        headers: {
          "Authorization": "key 3fb3d001f89c4fd7965e13ed9f96c6eb"
        }
      }
    );
    

    console.log(response.data);
    // Return the response from Khalti to your client
    return res.status(200).json(response.data);
    
  } catch (error) {
    console.error("Payment initiation error:", error);
    
    // Return a formatted error response
    return res.status(error.response?.status || 500).json({
      message: "Failed to initiate payment",
      error: error.response?.data || error.message
    });
  }
};

exports.AddOrder = async (req, res) => {
  try {
    const {
      foodName,
      quantity,
      totalAmount,
      deliveryAddress
    } = req.body;

    if (!foodName || !totalAmount || !deliveryAddress) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: foodName, totalAmount, and deliveryAddress are required'
      });
    }

    const newOrder = await orders.create({
      foodName,
      quantity: quantity || 1, // Use the provided quantity or default to 1
      totalAmount,
      deliveryAddress,
      // Optional: associate with user if you have user authentication
      // userId: req.userId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: {
        order: newOrder
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create order',
      error: error.message
    });
  }
}


exports.getOrder = async (req, res) => {
  try {
    
    const getAllOrders = await orders.findAll();
    

    console.log(getAllOrders)
    // Return the orders in the response
    return res.status(200).json({ 
      status: 'success',
      data: {
        orders: getAllOrders
      }
    });



  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ 
      status: 'error',
      message: "Failed to fetch orders", 
      error: error.message 
    });
  }
}