import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MenuItem = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    price: '',
    description: '',
    category: ''
  });

  // Remove cart items from localStorage
  useEffect(() => {
    localStorage.removeItem("cartItems");
  }, []);
  
  const [foodPhoto, setFoodPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: '' // 'success' or 'error'
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to show toast notification
  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type
    });

    // Automatically hide toast after 3 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create FormData object to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('foodName', formData.foodName);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      
      if (foodPhoto) {
        formDataToSend.append('photo', foodPhoto);
      }
      
      const response = await axios.post(
        "http://localhost:3000/menu/add-menu", 
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log("Response:", response.data);
      showToast("Menu item added successfully!", "success");
      
      // Reset form
      setFormData({
        foodName: '',
        price: '',
        description: '',
        category: ''
      });
      setFoodPhoto(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error submitting form:", err);
      showToast(err.response?.data?.message || "Failed to add menu item", "error");
    }
  };

  // Toast component 
  const Toast = () => {
    if (!toast.show) return null;
    
    const bgColor = toast.type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
    return (
      <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-md shadow-lg flex items-center z-50 animate-fade-in-out`}>
        <span>{toast.message}</span>
        <button 
          onClick={() => setToast(prev => ({ ...prev, show: false }))}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    );
  };
  
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Menu Item</h1>
      
      {/* Toast notification */}
      <Toast />
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="foodName" className="block text-gray-700 font-medium mb-2">
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={formData.foodName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Food Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Food Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Food Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="pizza">Pizza</option>
            <option value="rice">Rice</option>
            <option value="chicken">Chicken</option>
            <option value="breakfast">Breakfast</option>
            <option value="vegetarian">Vegetarian</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
            Food Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleImageChange}
            required
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Food preview"
                className="max-h-40 mx-auto border border-gray-300 rounded"
              />
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
};

export default MenuItem;