// Login.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar'; // Assuming this path is correct
import Footer from '../Components/Footer/Footer'; // Assuming this path is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icon for login/authentication
const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.628 5.873L12 16H8v-4l1.872-1.372A6 6 0 0117 9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7A7 7 0 118 7a7 7 0 017 0z" />
  </svg>
);


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Email address is required.");
    if (!/\S+@\S+\.\S+/.test(email.trim())) return toast.error("Please enter a valid email address.");
    if (!password.trim()) return toast.error("Password is required.");
    
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password
      });

      if (response.data.message === "Login successful") {
        toast.success("Login successful! Welcome back!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        
        setTimeout(() => {
            if(response.data.role === "Admin") {
              navigate("/admindash");
            } else { 
              navigate("/");
            }
            // Consider if a full reload is needed for Navbar, or use context/state management.
            // window.location.reload(); 
        }, 1500);

      } else {
        // This case might not be hit if backend sends error status codes for failed login
        toast.error(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please check your credentials or try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-teal-50 font-['Nunito',_sans-serif] text-gray-800">
      <Navbar />
      <ToastContainer position="top-center" autoClose={3500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      
      {/* Added pt-12 (padding-top) to push content down from navbar */}
      <main className="flex-grow flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-teal-200/70">
          
          {/* Header Section */}
          <div className="bg-gradient-to-br from-teal-500 to-green-500 p-6 sm:p-8 text-center">
            <div className="mb-5 flex justify-center items-center">
                <div className="h-16 w-16 bg-white/90 rounded-full flex items-center justify-center text-teal-600 shadow-lg ring-2 ring-white/50">
                   <KeyIcon />
                </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Welcome Back!</h1>
            <p className="text-teal-100 mt-2.5 text-sm sm:text-base">Sign in to continue your food journey.</p>
          </div>
          
          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 ease-in-out placeholder-gray-400"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <div className="text-sm">
                        <a href="/forgot-password" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 ease-in-out placeholder-gray-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2.5 block text-sm text-gray-700 font-medium">
                  Remember me
                </label>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-150 ease-in-out transform hover:scale-[1.01] hover:shadow-xl"
              >
                Sign In
              </button>
            </form>
            
            {/* Create Account Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                New to DailyDish?{' '}
                <NavLink to='/signup' className="font-semibold text-teal-600 hover:text-teal-700 hover:underline">
                  Create an Account
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
