import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
// Using Heroicons that can be interpreted as food-related
import { BuildingStorefrontIcon, ListBulletIcon, RocketLaunchIcon as DeliveryIcon } from '@heroicons/react/24/outline';
// For more thematic icons, you might use custom SVGs or a library like FontAwesome with food icons.

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const steps = [
    {
      id: 1,
      // icon: <CustomRestaurantIcon />, // Example for a very specific icon
      icon: <BuildingStorefrontIcon className="h-12 w-12 md:h-14 md:w-14 text-orange-500 mb-5 group-hover:text-orange-600 transition-colors" />,
      title: "Choose Your Restaurant",
      description: "Browse our curated selection of top-rated local restaurants. Find your favorite cuisine or discover something new!",
      number: "01"
    },
    {
      id: 2,
      icon: <ListBulletIcon className="h-12 w-12 md:h-14 md:w-14 text-green-500 mb-5 group-hover:text-green-600 transition-colors" />,
      title: "Select Your Dishes",
      description: "Explore detailed menus with photos and descriptions. Add your desired items to the cart with just a few clicks.",
      number: "02"
    },
    {
      id: 3,
      icon: <DeliveryIcon className="h-12 w-12 md:h-14 md:w-14 text-red-500 mb-5 group-hover:text-red-600 transition-colors" />,
      title: "Fast Delivery To You",
      description: "Relax while we prepare your order. Track its progress in real-time and get it delivered fresh and hot to your door.",
      number: "03"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Slightly faster stagger
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="py-16 md:py-24 px-4 text-center bg-white" ref={ref}> {/* Changed background to white for contrast */}
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-stone-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Get Your Meal in <span className="text-orange-500">3 Easy Steps</span>
      </motion.h2>

      <motion.p
        className="text-stone-600 max-w-2xl mx-auto mb-12 md:mb-16 text-lg"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        Ordering your favorite food has never been simpler. Follow these steps for a delightful meal experience.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-screen-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className="group bg-amber-50 p-6 sm:p-8 rounded-xl shadow-lg border border-orange-100 hover:shadow-orange-200/70 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-md mb-6 group-hover:bg-orange-50 transition-colors">
                    {step.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed px-2">
                  {step.description}
                </p>
                 <div className="mt-5 text-6xl font-extrabold text-orange-200/80 select-none -mb-3 group-hover:text-orange-300/90 transition-colors">
                    {step.number}
                </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;