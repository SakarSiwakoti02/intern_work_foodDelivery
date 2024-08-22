import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Search, Edit, Trash2, Filter, ChevronDown, X, Upload } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';


const AllMenus = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    foodName: '',
    price: '',
    description: '',
    category: '',
    photo: ''
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  // Position state for the edit form popup
  const [formPosition, setFormPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/menu/get-Menu");
      setMenuItems(response.data.menu || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch menu items. Please try again later.');
      console.error('Error fetching menu data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:3000/menu//delete-menu-by-id/${id}`);
        setMenuItems(menuItems.filter(item => item.id !== id));
        alert('Menu item deleted successfully');
      } catch (err) {
        console.error('Error deleting menu item:', err);
        alert('Failed to delete menu item');
      }
    }
  };

  const handleEdit = async (id, event) => {
    try {
      // Calculate position for the popup - placing it higher in the viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      setFormPosition({
        top: (viewportHeight / 8), // Position at 1/4 of viewport height
        left: (viewportWidth / 2) - 200  // Center horizontally, adjusting for form width
      });
      
      const response = await axios.get(`http://localhost:3000/menu/getMenuById/${id}`);
      const menuItem = response.data.menu;
      
      setEditingItem(menuItem);
      setFormData({
        foodName: menuItem.foodName,
        price: menuItem.price,
        description: menuItem.description,
        category: menuItem.category,
        photo: menuItem.photo
      });
      setPhotoPreview(menuItem.photo);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching menu item details:', err);
      alert('Failed to fetch menu item details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create form data to handle file upload
      const submitFormData = new FormData();
      
      // Append all text fields
      submitFormData.append('foodName', formData.foodName);
      submitFormData.append('price', formData.price);
      submitFormData.append('description', formData.description);
      submitFormData.append('category', formData.category);
      
      // If there's a new photo file, append it
      if (photoFile) {
        submitFormData.append('photo', photoFile);
      } else if (formData.photo) {
        // If using existing photo, pass the URL
        submitFormData.append('existingPhoto', formData.photo);
      }
      
      // Use the proper headers for FormData
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      
      await axios.post(`http://localhost:3000/menu/editMenuItem/${editingItem.id}`, submitFormData, config);
      setShowEditForm(false);
      setPhotoFile(null);
      fetchMenuItems(); // Refresh the list
      alert('Menu item updated successfully');
    } catch (err) {
      console.error('Error updating menu item:', err);
      alert('Failed to update menu item');
    }
  };

  

  const closeEditForm = () => {
    setShowEditForm(false);
    setEditingItem(null);
    setPhotoFile(null);
    // Clean up any created object URLs to prevent memory leaks
    if (photoPreview && !photoPreview.startsWith('http')) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoPreview('');
  };

  // Get unique categories
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.foodName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse flex space-x-4">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 p-4 rounded-lg text-red-800 text-center">
      {error}
    </div>
  );

  // Animation variants for the form popup
  const formVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 400
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      {/* Edit Form Popup - Note the different positioning and no backdrop */}
      <AnimatePresence>
        {showEditForm && (
          <motion.div 
            className="fixed z-50 shadow-xl rounded-lg"
            style={{ 
              top: formPosition.top, 
              left: formPosition.left,
              width: '400px'
            }}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Edit Menu Item</h2>
                <motion.button 
                  onClick={closeEditForm}
                  className="p-1 rounded-full hover:bg-gray-200 text-gray-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4">
                {/* Flexbox layout for Food Name and Price */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Food Name
                    </label>
                    <input
                      type="text"
                      name="foodName"
                      value={formData.foodName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="w-1/3 min-w-[100px]">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Photo upload field */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Photo
                  </label>
                  
                  {/* Photo preview with file input side by side */}
                  <div className="flex items-start gap-3">
                    {photoPreview && (
                      <div className="flex-shrink-0">
                        <img 
                          src={photoPreview} 
                          alt="Food preview" 
                          className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                    
                    {/* Custom file input */}
                    <div className="flex-grow mt-2">
                      <label className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload size={20} className="mr-2 text-gray-500" />
                        <span className="text-gray-500 text-sm truncate">
                          {photoFile ? photoFile.name : "Choose new photo"}
                        </span>
                        <input
                          type="file"
                          name="photo"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6 pt-3 border-t">
                  <motion.button
                    type="button"
                    onClick={closeEditForm}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Update Item
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Restaurant Menu</h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink to="/add-menu" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            Add New Item
          </NavLink>
        </motion.div>
      </div>
      
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search food by name..."
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex-none">
          <div className="relative inline-block w-full md:w-48">
            <motion.div 
              className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-pointer"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              whileHover={{ backgroundColor: "#f9fafb" }}
            >
              <span className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <span className="text-gray-700 capitalize">{activeCategory}</span>
              </span>
              <motion.div
                animate={{ rotate: showCategoryDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} className="text-gray-500" />
              </motion.div>
            </motion.div>
            
            <AnimatePresence>
              {showCategoryDropdown && (
                <motion.div 
                  className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {categories.map(category => (
                    <motion.div 
                      key={category} 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
                      onClick={() => {
                        setActiveCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                    >
                      {category}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* No results message */}
      {filteredMenuItems.length === 0 && (
        <motion.div 
          className="text-center py-10 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-500 text-lg">No menu items found matching your criteria</p>
        </motion.div>
      )}

      {/* Menu items table/list */}
      <motion.div 
        className="bg-white rounded-lg shadow overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Food Item
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added On
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMenuItems.map((item, index) => (
                <motion.tr 
                  key={item.id} 
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                        {item.photo && item.photo.startsWith('http') ? (
                          <img
                            src={item.photo}
                            alt={item.foodName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            <span className="text-xs text-gray-500">No img</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900">{item.foodName}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <motion.button
                        onClick={(e) => handleEdit(item.id, e)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Edit"
                        whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                        whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AllMenus;