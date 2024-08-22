import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem'; // Or your correct path
import AllMenus from '../Components/AllMenus'; // Or your correct path
import axios from 'axios';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  TableCellsIcon,
  ArrowLeftOnRectangleIcon,
  CurrencyDollarIcon,
  QueueListIcon,
  CalendarDaysIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// Daily Dish Logo (SVG - its light parts will contrast well on dark)
const DailyDishLogoIcon = ({ size = "10" }) => (
  <svg
    width={size === "10" ? "40" : "36"}
    height={size === "10" ? "40" : "36"}
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shadow-sm"
  >
    <circle cx="26" cy="26" r="22" fill="#FFFBEB" />
    <circle cx="26" cy="26" r="20" fill="#FB923C" />
    <circle cx="26" cy="26" r="17" fill="#FFFBEB" />
    <path d="M26 30 Q26 22 22 20 C20 24 22 28 26 30 Z" fill="#4ADE80" />
    <path d="M26 30 Q26 22 30 20 C32 24 30 28 26 30 Z" fill="#34D399" />
    <circle cx="26" cy="31" r="2.5" fill="#FDBA74" />
  </svg>
);

// Updated Admin Header Logo for Dark Sidebar
const AdminHeaderLogo = () => (
  <div className="flex items-center space-x-2.5">
    <DailyDishLogoIcon size="9" />
    <div>
      <span className="block text-lg font-extrabold text-white leading-tight">DailyDish</span>
      <span className="block text-xs text-orange-200 leading-tight -mt-0.5">Admin Panel</span>
    </div>
  </div>
);


const Admin = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "Admin") {
      navigate("/login");
      return;
    }

    const fetchData = async() => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/payment/get-Order", {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data && response.data.status === "success" && response.data.data.orders) {
          setOrders(response.data.data.orders);
        } else {
          setError("Failed to fetch orders or invalid data format");
        }
      } catch (err) {
        setError("Error fetching orders: " + err.message);
        if (err.response && err.response.status === 401) {
            navigate("/login");
        }
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);
  
  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
  
  const menuNavItems = [
    { id: 'home', label: 'Dashboard', icon: HomeIcon },
    { id: 'orders', label: 'All Orders', icon: ClipboardDocumentListIcon },
    { id: 'addMenu', label: 'Add Menu Item', icon: PlusCircleIcon },
    { id: 'allMenus', label: 'Manage Menus', icon: TableCellsIcon },
  ];

  const renderContent = () => {
    switch(activeItem) {
      case 'addMenu':
        return <MenuItem />; 
      case 'orders':
        return <OrdersList orders={orders} loading={loading} error={error} />;
      case 'allMenus':
        return <AllMenus />;
      case 'home':
      default:
        return <Dashboard orders={orders} loading={loading} error={error} />;
    }
  }
  
  return (
    <div className="flex min-h-screen bg-slate-100 font-['Nunito',_sans-serif] text-stone-800">
      {/* Sidebar - Dark Theme */}
      <div className="w-64 bg-stone-800 text-gray-200 flex flex-col fixed h-full shadow-xl"> {/* Dark background */}
        <div className="p-5 border-b border-stone-700 mb-4"> {/* Darker border */}
          <AdminHeaderLogo />
        </div>
        
        <nav className="flex-grow px-3 space-y-1.5">
          {menuNavItems.map(item => (
            <div 
              key={item.id}
              className={`px-4 py-2.5 flex items-center space-x-3 rounded-md cursor-pointer transition-all duration-200 group ${
                activeItem === item.id 
                  ? 'bg-orange-500 text-white shadow-md' // Active item with orange accent
                  : 'text-gray-300 hover:bg-stone-700 hover:text-white'
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 ${activeItem === item.id ? 'text-white' : 'text-gray-400 group-hover:text-orange-300'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
        
        <div 
          className={`px-5 py-3.5 flex items-center space-x-3 cursor-pointer hover:bg-red-700/80 hover:text-white transition-colors duration-200 border-t border-stone-700 mt-auto group text-gray-300`}
          onClick={handleLogOut}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-400 group-hover:text-red-200"/>
          <span className="text-sm font-medium">Log Out</span>
        </div>
      </div>
      
      {/* Main Content (styles for Dashboard and OrdersList need to be appropriate for the main area) */}
      <main className="flex-1 p-6 md:p-8 ml-64">
        {renderContent()}
      </main>
    </div>
  );
};

// Dashboard component for the home view (content styling remains focused on clarity)
const Dashboard = ({ orders, loading, error }) => {
  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(order => order.orderDate.split('T')[0] === today).length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount),0).toFixed(2);
  const recentOrders = [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).slice(0, 5);

  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const StatCard = ({ title, value, icon: Icon, iconColorClass, borderColorClass }) => (
    <div className={`bg-white rounded-xl shadow-lg p-5 md:p-6 border-l-4 ${borderColorClass} dark:bg-stone-700 dark:border-${borderColorClass.split('-')[1]}-400`}> {/* Dark mode support */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-stone-800 mt-1 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-opacity-10 ${iconColorClass.replace('text-', 'bg-')}`}>
            <Icon className={`h-7 w-7 ${iconColorClass}`} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-gray-100">Admin Dashboard</h1>
            <p className="text-stone-500 mt-1 text-sm dark:text-gray-400">Welcome back, manage your restaurant efficiently!</p>
        </div>
        <span className="text-xs text-stone-500 mt-2 sm:mt-0 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200 dark:bg-stone-700 dark:text-gray-400 dark:border-stone-600">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      
      {loading && <div className="text-center py-10 text-stone-600 dark:text-gray-400"><p>Loading dashboard data...</p></div>}
      {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"><p>{error}</p></div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Today's Orders" value={todaysOrders} icon={CalendarDaysIcon} iconColorClass="text-sky-500" borderColorClass="border-sky-500" />
        <StatCard title="Total Orders" value={totalOrders} icon={ClipboardDocumentListIcon} iconColorClass="text-indigo-500" borderColorClass="border-indigo-500" />
        <StatCard title="Total Revenue" value={`Rs.${totalRevenue}`} icon={CurrencyDollarIcon} iconColorClass="text-emerald-500" borderColorClass="border-emerald-500" />
        <StatCard title="Menu Items" value={"42"} icon={SparklesIcon} iconColorClass="text-pink-500" borderColorClass="border-pink-500" />
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 dark:bg-stone-800">
        <h2 className="text-xl font-semibold text-stone-800 mb-5 px-2 sm:px-0 dark:text-gray-100">Recent Orders</h2>
        {loading ? <p className="text-stone-500 px-2 sm:px-0 dark:text-gray-400">Loading orders...</p> : 
         error ? <p className="text-red-600 px-2 sm:px-0 dark:text-red-400">Error loading orders.</p> : 
         orders.length === 0 ? <p className="text-stone-500 p-4 text-center dark:text-gray-400">No orders found yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-stone-500 dark:text-gray-400">
              <thead className="text-xs text-stone-600 uppercase bg-slate-100/80 dark:bg-stone-700 dark:text-gray-300 rounded-t-lg">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-3">Order ID</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Customer</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Items</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Total</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Time</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="bg-white border-b border-orange-100/80 hover:bg-slate-50/50 dark:bg-stone-800 dark:border-stone-700 dark:hover:bg-stone-700/70 transition-colors">
                    <td className="px-4 sm:px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white">#{order.id.substring(0, 8)}</td>
                    <td className="px-4 sm:px-6 py-4">{order.foodName}</td>
                    <td className="px-4 sm:px-6 py-4">{order.quantity}</td>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-stone-700 dark:text-gray-200">Rs.{parseFloat(order.totalAmount).toFixed(2)}</td>
                    <td className="px-4 sm:px-6 py-4">{formatTime(order.orderDate)}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full dark:bg-yellow-800/30 dark:text-yellow-200">
                        Preparing
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

// OrdersList component
const OrdersList = ({ orders, loading, error }) => {
    const thStyle = "px-4 sm:px-5 py-3 border-b-2 border-stone-200 bg-stone-100 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider dark:bg-stone-700 dark:text-gray-300 dark:border-stone-600";
    const tdStyle = "px-4 sm:px-5 py-4 border-b border-stone-200 bg-white text-sm text-stone-700 dark:bg-stone-800 dark:text-gray-300 dark:border-stone-700";

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 dark:bg-stone-800">
      <h1 className="text-xl sm:text-2xl font-bold text-stone-800 mb-6 dark:text-gray-100">All Customer Orders</h1>
      
      {loading ? <p className="text-stone-500 text-center py-5 dark:text-gray-400">Loading orders...</p> : 
       error ? <p className="text-red-600 bg-red-50 p-3 rounded-md text-center dark:bg-red-900/30 dark:text-red-300">{error}</p> : 
       orders.length === 0 ? <p className="text-stone-500 text-center py-5 dark:text-gray-400">No orders have been placed yet.</p> : (
        <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-700">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className={thStyle}>Order ID</th>
                <th className={thStyle}>Customer</th>
                <th className={thStyle}>Quantity</th>
                <th className={thStyle}>Total</th>
                <th className={thStyle}>Delivery Address</th>
                <th className={thStyle}>Order Date & Time</th>
                <th className={thStyle}>Status</th>
                <th className={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-stone-700/70 transition-colors">
                  <td className={tdStyle}><span className="font-medium text-stone-800 dark:text-white">#{order.id.substring(0, 8)}</span></td>
                  <td className={tdStyle}>{order.foodName}</td>
                  <td className={tdStyle}>{order.quantity}</td>
                  <td className={`${tdStyle} font-semibold text-green-600 dark:text-green-400`}>Rs.{parseFloat(order.totalAmount).toFixed(2)}</td>
                  <td className={`${tdStyle} max-w-xs truncate`}>{order.deliveryAddress}</td>
                  <td className={tdStyle}>
                    {new Date(order.orderDate).toLocaleDateString('en-US', { 
                      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className={tdStyle}>
                    <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight dark:text-yellow-200">
                        <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full dark:bg-yellow-700/50"></span>
                        <span className="relative text-xs">Preparing</span>
                    </span>
                  </td>
                  <td className={tdStyle}>
                    <button className="text-orange-600 hover:text-orange-500 mr-3 text-xs font-medium hover:underline dark:text-orange-400 dark:hover:text-orange-300">
                      View
                    </button>
                    {/* Add other actions like update status */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;