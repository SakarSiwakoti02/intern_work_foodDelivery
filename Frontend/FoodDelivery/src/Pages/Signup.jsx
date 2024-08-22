// Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar"; // Assuming this path is correct
import Footer from "../Components/Footer/Footer"; // Assuming this path is correct
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icon for new user registration
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic Validations
    if (!fullName.trim()) return toast.error("Full name is required");
    if (!/^[A-Za-z\s.'-]+$/.test(fullName.trim())) return toast.error("Full name contains invalid characters");
    if (!email.trim()) return toast.error("Email address is required");
    if (!/\S+@\S+\.\S+/.test(email.trim())) return toast.error("Please enter a valid email address");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword) return toast.error("Passwords do not match!");
    if (!phoneNumber.trim()) return toast.error("Phone number is required");
    if (!/^\+?[0-9\s-()]{7,20}$/.test(phoneNumber.trim())) return toast.error("Please enter a valid phone number");
    if (!location.trim()) return toast.error("Primary location is required");
    if (!agreeTerms) return toast.error("You must agree to the Terms & Privacy Policy");

    try {
      const response = await axios.post("http://localhost:3000/register", {
        full_name: fullName, email, password, phone_number: phoneNumber, location, role: "User",
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Signup successful! Welcome aboard! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.response?.data?.message || "Signup failed! Please check your details and try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-teal-50 font-['Nunito',_sans-serif] text-gray-800">
      <Navbar />
      <ToastContainer position="top-center" autoClose={3500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      
      {/* Added pt-12 (padding-top) to push content down from navbar */}
      <main className="flex-grow flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-xl border border-teal-200/70">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-teal-500 to-green-500 p-6 sm:p-8 text-center">
             <div className="mb-5 flex justify-center items-center">
                <div className="h-16 w-16 bg-white/90 rounded-full flex items-center justify-center text-teal-600 shadow-lg ring-2 ring-white/50">
                  <UserPlusIcon />
                </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Join DailyDish Today</h1>
            <p className="text-teal-100 mt-2.5 text-sm sm:text-base">Sign up to discover amazing local food!</p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input id="fullName" name="fullName" type="text" autoComplete="name" required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 ease-in-out placeholder-gray-400" 
                    placeholder="e.g., Alex Johnson" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input id="email" name="email" type="email" autoComplete="email" required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 ease-in-out placeholder-gray-400" 
                    placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input id="phoneNumber" name="phoneNumber" type="tel" autoComplete="tel" required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 ease-in-out placeholder-gray-400" 
                    placeholder="+1 234 567 8900" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                {/* Primary Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1.5">Delivery Address</label>
                  <input id="location" name="location" type="text" autoComplete="address-line1" required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 ease-in-out placeholder-gray-400" 
                    placeholder="123 Main St, Anytown" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                 {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <input id="password" name="password" type="password" autoComplete="new-password" required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 ease-in-out placeholder-gray-400" 
                    placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-150 ease-in-out placeholder-gray-400" 
                    placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>
             
              {/* Terms and Conditions */}
              <div className="flex items-start pt-3">
                <div className="flex items-center h-5">
                    <input id="terms-agree" name="terms-agree" type="checkbox" 
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer" 
                        checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="terms-agree" className="font-medium text-gray-700">
                    I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline font-semibold">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline font-semibold">Privacy Policy</a>.
                    </label>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" 
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-150 ease-in-out transform hover:scale-[1.01] hover:shadow-xl">
                Create My Account
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <NavLink to="/login" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline">
                  Sign In
                </NavLink>
              </p>
            </div>

            {/* Restaurant Owner Link */}
             <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                    Are you a restaurant owner?{' '}
                    <a href="/restaurant-signup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-cyan-600 hover:text-cyan-700 hover:underline">
                        Partner with us
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;