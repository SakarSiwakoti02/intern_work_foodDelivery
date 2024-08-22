import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

// REPLACE THIS with a high-quality, appetizing food image or a lifestyle shot of food delivery
const heroBgImageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';
// Example for a different style: a food delivery person happily handing over a bag.
// const heroDeliveryImageUrl = 'https://images.unsplash.com/photo-1575011245320-7c42346a09b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';

const Hero = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24" // pt for navbar
      // style={{ background: 'linear-gradient(135deg, #FFFBF5 0%, #FFF5E1 50%, #FFEACC 100%)' }} // Soft warm gradient
    >
        {/* Background Image Option (full bleed) */}
        <div className="absolute inset-0 z-0">
            <img
                src={heroBgImageUrl}
                alt="Delicious food background"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div> {/* Overlay for text readability */}
        </div>


      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-1 items-center max-w-screen-lg mx-auto text-center px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white" // Text white for readability on image
            // If using gradient background instead of image, text color would be text-stone-800
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring", stiffness: 100 }}
          >
            <span className="block">Your Favorite Food,</span>
            <span className="block text-orange-400 drop-shadow-md">Delivered Fast & Fresh.</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200" // Text light gray for readability
            // If using gradient background, text color would be text-stone-600
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Discover top local restaurants, explore diverse menus, and get your meals delivered right to your doorstep. Quick, easy, and delicious!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="relative w-full sm:w-auto group">
              <select className="appearance-none bg-white/90 border-2 border-gray-300 text-stone-700 py-3.5 px-5 pr-12 rounded-lg w-full sm:max-w-xs focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-400/50 transition-all duration-300 shadow-sm hover:border-orange-400">
                <option className="text-stone-700">Choose a Restaurant</option>
                <option className="text-stone-700">The Gourmet Kitchen</option>
                <option className="text-stone-700">Pizza Planet</option>
                <option className="text-stone-700">Sushi Central</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-orange-500">
                <ChevronDownIcon className="h-5 w-5" />
              </div>
            </div>

            <motion.button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(249, 115, 22, 0.5)" }} // Orange glow
              whileTap={{ scale: 0.98 }}
            >
              ORDER NOW
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Optional: If you want a separate image on the side for desktop (instead of full background) */}
        {/* <motion.div
          className="hidden md:block md:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={heroDeliveryImageUrl} alt="Food delivery" className="rounded-2xl shadow-xl object-cover h-[70vh]" />
        </motion.div> */}
      </div>
    </div>
  );
};

export default Hero;