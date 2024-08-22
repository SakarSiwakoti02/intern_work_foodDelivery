import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const FAQSection = () => {
  // State to track which FAQ item is open
  const [activeIndex, setActiveIndex] = useState(null);
  localStorage.removeItem("cartItems")

  // FAQ data organized by categories
  const faqData = [
    {
      category: "Ordering",
      items: [
        {
          question: "How do I place an order?",
          answer: "Browse our menu, select your items, add them to your cart, and proceed to checkout. You'll need to provide your delivery address and payment information to complete your order.",
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards, debit cards, digital wallets (Apple Pay, Google Pay), and cash on delivery in select areas.",
        },
        {
          question: "Can I schedule an order for later?",
          answer: "Yes, you can schedule orders up to 7 days in advance. Simply select \"Schedule for Later\" during checkout and choose your preferred date and time.",
        },
      ],
    },
    {
      category: "Delivery",
      items: [
        {
          question: "What are your delivery hours?",
          answer: "Our delivery hours are 10:00 AM to 10:00 PM, seven days a week.",
        },
        {
          question: "How much does delivery cost?",
          answer: "Delivery fees vary based on your distance from the restaurant, typically ranging from $2.99 to $6.99. Free delivery is available for orders over $25 in select areas.",
        },
        {
          question: "How long will my delivery take?",
          answer: "Estimated delivery times are shown before you place your order and typically range from 30-45 minutes, depending on your location and order volume.",
        },
      ],
    },
    {
      category: "Order Issues",
      items: [
        {
          question: "What if my order is late?",
          answer: "If your order is significantly delayed beyond the estimated delivery time, please contact our customer support. We may offer compensation depending on the circumstances.",
        },
        {
          question: "What if my order is incorrect or missing items?",
          answer: "Please report any issues within 24 hours of receiving your order. Take a photo if possible and contact our support team. We'll arrange for a refund or replacement.",
        },
        {
          question: "Can I track my order?",
          answer: "Yes, you'll receive a tracking link via email and SMS after your order is confirmed. This allows you to monitor your delivery in real-time.",
        },
      ],
    },
    {
      category: "Account & Special Requests",
      items: [
        {
          question: "How do I create an account?",
          answer: "You can register using your email address or phone number. Creating an account allows you to save delivery addresses, payment methods, and order history.",
        },
        {
          question: "Can I request special instructions for my order?",
          answer: "Yes, there's a \"Special Instructions\" field during checkout where you can note dietary restrictions, delivery preferences, or specific preparation requests.",
        },
        {
          question: "Do you accommodate dietary restrictions?",
          answer: "Many of our restaurant partners offer options for various dietary needs. You can filter menu items by dietary preferences like vegetarian, vegan, gluten-free, etc.",
        },
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  // Handle FAQ toggle
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <Navbar />
    <div className="bg-gradient-to-br from-orange-50 to-amber-100 min-h-screen p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-amber-600 mb-8 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 10 
          }}
        >
          QUICK EAT FAQ
        </motion.h1>
          
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {faqData.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              variants={categoryVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <motion.h2 
                className="text-xl md:text-2xl font-semibold bg-amber-500 text-white p-4"
                whileHover={{ backgroundColor: "#F59E0B" }} // Tailwind amber-500 hover effect
              >
                {category.category}
              </motion.h2>
              
              <div className="divide-y divide-amber-100">
                {category.items.map((item, itemIndex) => {
                  const index = `${categoryIndex}-${itemIndex}`;
                  return (
                    <motion.div 
                      key={itemIndex}
                      variants={itemVariants}
                      className="overflow-hidden"
                    >
                      <motion.button
                        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none hover:bg-amber-50"
                        onClick={() => toggleFAQ(index)}
                        whileHover={{ backgroundColor: "#FFFBEB" }} // Tailwind amber-50 hover effect
                      >
                        <span>{item.question}</span>
                        <motion.span
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-amber-600"
                        >
                          ▼
                        </motion.span>
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="bg-amber-50 px-4 py-3 text-gray-700"
                          >
                            {item.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center text-gray-600"
        >
          <p>Can't find what you're looking for? Contact our support team at support@fooddelivery.com</p>
        </motion.div>
      </motion.div>
    
    </div>
    <Footer />
    </>
  );
};

export default FAQSection;