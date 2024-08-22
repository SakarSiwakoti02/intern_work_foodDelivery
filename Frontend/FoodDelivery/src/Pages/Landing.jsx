import React from "react";
// Corrected paths: Added '../' to go up from 'Pages' directory
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Hero/Hero";
import HowItWorks from "../Components/HowItWorks/HowItWorks";
import TestiMonial from "../Components/TestiMonial/TestiMonial";

const Landing = () => {
  // Original localStorage logic
  localStorage.removeItem("cartItems");

  return (
    <div className="bg-amber-50 text-stone-700 font-['Nunito',_sans-serif]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <TestiMonial />
      <Footer />
    </div>
  );
};

export default Landing;