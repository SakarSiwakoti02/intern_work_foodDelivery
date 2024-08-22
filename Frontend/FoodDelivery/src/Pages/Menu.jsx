import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../Components/Footer/Footer'; // Assuming this is your themed Footer
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
// Importing necessary Heroicons
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon as CartIconHero, // Renamed to avoid conflict if you have another ShoppingCartIcon
  XMarkIcon as XIconHero, // Renamed
  StarIcon,
  PlusIcon,
  MinusIcon,
  HomeIcon, // For header nav
  InformationCircleIcon, // For header nav
  ListBulletIcon // For header nav
} from '@heroicons/react/24/solid'; // Using solid for prominent icons like cart, can mix with outline

// Daily Dish Logo Component (same as used in the themed Navbar.jsx)
const DailyDishLogoIcon = () => (
  <svg width="40" height="40" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="shadow-sm">
    <circle cx="26" cy="26" r="22" fill="#FFFBEB" />
    <circle cx="26" cy="26" r="20" fill="#FB923C" />
    <circle cx="26" cy="26" r="17" fill="#FFFBEB" />
    <path d="M26 30 Q26 22 22 20 C20 24 22 28 26 30 Z" fill="#4ADE80" />
    <path d="M26 30 Q26 22 30 20 C32 24 30 28 26 30 Z" fill="#34D399" />
    <circle cx="26" cy="31" r="2.5" fill="#FDBA74" />
  </svg>
);

const Menu = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState(['All']); // Initialize with 'All'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return 'Uncategorized';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/menu/get-Menu");
        
        const transformedData = response.data.menu.map(item => ({
          id: item.id,
          name: item.foodName,
          price: parseFloat(item.price),
          category: capitalizeFirstLetter(item.category),
          rating: item.rating || 4, // Use API rating or default to 4
          image: item.photo && item.photo.startsWith('http') 
            ? item.photo 
            : item.photo ? `http://localhost:3000/${item.photo.replace(/\\/g, '/')}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop', // Fallback image
          description: item.description || "Deliciousness awaits!" // Default description
        }));
        
        setFoodItems(transformedData);
        
        const apiCategories = ['All', ...new Set(transformedData.map(item => item.category))];
        setCategories(apiCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu data:", err);
        setError("Failed to load menu items. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId, removeAll = false) => {
    const existingItem = cartItems.find(item => item.id === itemId);
    if (!existingItem) return;

    if (removeAll || existingItem.quantity === 1) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };
  
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 }}};
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 14 }}};

  const renderRating = (rating) => Array(5).fill(0).map((_, i) => (
    <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-orange-100'}`} />
  ));

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop";
  };

  const createOrderName = () => cartItems.length === 0 ? "DailyDish Food Order" : cartItems.length === 1 ? `${cartItems[0].name} (x${cartItems[0].quantity})` : `${cartItems[0].name} & more delicious items`;

  const handleCheckOut = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
     if (cartItems.length === 0) {
        alert("Your cart is empty! Add some items before checking out.");
        return;
    }
    try {
      const initiatePayment = await axios.post("http://localhost:3000/payment/khalti", {
        'purchase_order_name': createOrderName(),
        "orderId": `DD-${Date.now()}-${Math.random().toString(36).substring(2,7)}`, // More unique order ID
        "amount": totalPrice // Backend expects amount in paisa, so multiply by 100
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      if (initiatePayment.data && initiatePayment.data.payment_url) {
        window.location.href = initiatePayment.data.payment_url;
      } else {
         alert("Could not initiate payment with Khalti. Please try again or contact support.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to initiate payment. Please try again.");
    }
  };

  // Header NavLink classes (similar to main Navbar)
  const headerNavLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out ${
      isActive
        ? 'text-orange-600 bg-orange-100'
        : 'text-stone-600 hover:text-orange-600 hover:bg-orange-50'
    }`;

  return (
    <div className="relative font-['Nunito',_sans-serif]">
      <div className={`min-h-screen bg-amber-50 text-stone-700 ${showCart ? 'overflow-hidden fixed inset-0' : ''}`}>
        {/* Custom Header for Menu Page */}
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="max-w-screen-xl mx-auto px-4 py-4 sm:py-5 flex justify-between items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center group">
              <DailyDishLogoIcon />
              <div className="ml-2 md:ml-3">
                <span className="text-xl md:text-2xl font-extrabold text-stone-800 leading-tight">Daily</span>
                <span className="text-xl md:text-2xl font-extrabold text-orange-500 leading-tight -mt-1">Dish</span>
              </div>
            </NavLink>
            
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <NavLink to="/" className={headerNavLinkClasses}><HomeIcon className="w-5 h-5 mr-1 inline-block"/>Home</NavLink>
              <NavLink to="/aboutus" className={headerNavLinkClasses}><InformationCircleIcon className="w-5 h-5 mr-1 inline-block"/>About Us</NavLink>
              <NavLink to='/menu' className={headerNavLinkClasses}><ListBulletIcon className="w-5 h-5 mr-1 inline-block"/>Menu</NavLink>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.div className="relative hidden sm:block" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto', minWidth: '200px', maxWidth: '300px' }} transition={{ duration: 0.4, delay: 0.1 }}>
                <input
                  type="text"
                  placeholder="Search delicious dishes..."
                  className="w-full py-2.5 px-4 pr-10 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition-colors text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-400 pointer-events-none" />
              </motion.div>
              
              <motion.button
                className="relative p-2 text-orange-500 hover:text-orange-600 hover:bg-orange-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCart(!showCart)}
                aria-label="Open Shopping Cart"
              >
                <CartIconHero className="h-7 w-7" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
           {/* Search Bar for Mobile (below header items) */}
            <div className="sm:hidden px-4 pb-3 border-t border-orange-100">
                 <motion.div className="relative mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
                    <input
                    type="text"
                    placeholder="Search delicious dishes..."
                    className="w-full py-2.5 px-4 pr-10 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition-colors text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MagnifyingGlassIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-400 pointer-events-none" />
                </motion.div>
            </div>
        </header>

        <main className="max-w-screen-xl mx-auto px-4 py-8">
          <motion.div 
            className="mb-8 overflow-x-auto whitespace-nowrap pb-3 -mx-4 px-4 hide-scrollbar" // For better touch scrolling
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-5 py-2.5 mr-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 ${
                  selectedCategory === category 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-stone-700 hover:bg-orange-100 border border-orange-200/80'
                }`}
                whileHover={{ y: -2, boxShadow: "0 3px 10px rgba(0,0,0,0.07)"}} 
                whileTap={{ scale: 0.98 }} 
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </motion.button>
            ))}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
          </motion.div>

          {loading && <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div></div>}
          {error && <div className="text-center py-20"><p className="text-red-600 text-xl mb-4">{error}</p><button className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold shadow-md" onClick={() => window.location.reload()}>Try Reloading</button></div>}

          {!loading && !error && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8" 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible"
            >
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col border border-orange-100/80 group" 
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-48 sm:h-52 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onError={handleImageError} />
                    <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-orange-600 font-semibold shadow-sm border border-orange-200/50">{item.category}</div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-bold text-lg text-stone-800 leading-tight group-hover:text-orange-600 transition-colors">{item.name}</h3>
                      <span className="font-extrabold text-lg text-orange-600 whitespace-nowrap">Rs.{item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex my-1.5">{renderRating(item.rating)}</div>
                    <p className="text-stone-600 text-xs mb-4 h-12 overflow-hidden leading-relaxed line-clamp-3">{item.description}</p>
                    <motion.button
                      className="mt-auto w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm shadow hover:shadow-md transition-all duration-200"
                      whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} onClick={() => addToCart(item)}
                    >
                      <span>ADD TO CART</span> <CartIconHero className="h-4 w-4 inline-block" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          {!loading && !error && filteredItems.length === 0 && <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p className="text-2xl text-stone-500">No delicious items found!</p><p className="text-stone-400 mt-2">Try adjusting your search or category.</p></motion.div>}
        </main>

        {/* Translucent Overlay when cart is open */}
        {showCart && <motion.div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCart(false)} />}
      </div>

      {/* Shopping Cart Sidebar */}
      <motion.div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto flex flex-col border-l border-orange-200/70"
        initial={{ x: '100%' }}
        animate={{ x: showCart ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Spring animation
      >
        <div className="p-5 border-b border-orange-200/80 sticky top-0 bg-white z-10"> {/* Sticky cart header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-800">Your Food Cart</h2>
            <button className="text-stone-500 hover:text-orange-600 p-1.5 rounded-full hover:bg-orange-100 transition-colors" onClick={() => setShowCart(false)} aria-label="Close Cart">
              <XIconHero className="h-6 w-6" />
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
            <CartIconHero className="h-24 w-24 text-orange-200 mb-6" />
            <p className="text-xl font-semibold text-stone-600">Your cart is empty.</p>
            <p className="text-sm text-stone-400 mt-2">Looks like you haven't added anything yet. <br/> Explore our menu to find something delicious!</p>
            <button 
                onClick={() => setShowCart(false)} 
                className="mt-6 bg-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm shadow-md"
            >
                Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow p-5 space-y-4 overflow-y-auto"> {/* Cart items area */}
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="flex items-center gap-4 border-b border-orange-100 pb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: 'spring', stiffness: 150 }}
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-sm border border-orange-100" onError={handleImageError} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-stone-700 text-sm leading-tight mb-0.5">{item.name}</h4>
                    <p className="text-orange-600 font-bold text-sm">Rs.{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="w-7 h-7 bg-orange-100 text-orange-700 rounded-md flex items-center justify-center hover:bg-orange-200 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-400" onClick={() => removeFromCart(item.id)} aria-label={`Decrease quantity of ${item.name}`}>
                        <MinusIcon className="h-4 w-4"/>
                      </button>
                      <span className="font-medium text-sm w-6 text-center text-stone-700">{item.quantity}</span>
                      <button className="w-7 h-7 bg-orange-100 text-orange-700 rounded-md flex items-center justify-center hover:bg-orange-200 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-400" onClick={() => addToCart(item)} aria-label={`Increase quantity of ${item.name}`}>
                        <PlusIcon className="h-4 w-4" />
                      </button>
                      <button className="ml-auto text-xs text-red-500 hover:underline focus:outline-none" onClick={() => removeFromCart(item.id, true)}>Remove</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-5 border-t border-orange-200/80 bg-amber-50/50 sticky bottom-0"> {/* Sticky cart footer */}
              <div className="flex justify-between mb-2 text-md">
                <span className="font-semibold text-stone-700">Subtotal:</span>
                <span className="font-bold text-stone-800">Rs.{totalPrice.toFixed(2)}</span>
              </div>
              {/* Add tax/delivery fee if needed */}
              <div className="flex justify-between mb-4 text-xl">
                <span className="font-bold text-stone-700">Total:</span>
                <span className="font-extrabold text-orange-600">Rs.{totalPrice.toFixed(2)}</span>
              </div>
              <motion.button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-lg font-semibold text-md shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} onClick={handleCheckOut}
              >
                PROCEED TO CHECKOUT
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Menu;