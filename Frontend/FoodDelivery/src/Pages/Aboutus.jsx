import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar'; // Assuming this is the themed Navbar
import Footer from '../Components/Footer/Footer'; // Assuming this is the themed Footer
import TestiMonial from '../Components/TestiMonial/TestiMonial'; // Assuming this is the themed TestiMonial
import { NavLink } from 'react-router-dom';

// Main About Us Page Component
const Aboutus = () => {
localStorage.removeItem("cartItems"); // Kept as per your original code

return (
<div className="bg-amber-50 text-stone-700 font-['Nunito',_sans-serif]">
<Navbar />
<HeroAbout />
<AboutSection />
<ChefSection />
<SpecialOffer />
<MenuPreviewSection />
<TestiMonial />
<Footer />
</div>
);
};

// Hero Component for About Us Page
const HeroAbout = () => {
return (
<div
id="home-about"
className="relative h-[70vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-center"
style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')" }}
>
<div className="absolute inset-0 bg-black/50"></div>
<div className="container mx-auto px-4 relative z-10">
<div className="max-w-3xl mx-auto">
<motion.h1
className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: "easeOut" }}
>
Our Culinary Journey: <span className="text-yellow-300">From Passion to Plate</span>
</motion.h1>
<motion.p
className="text-lg md:text-xl text-gray-200 mb-10"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
>
At DailyDish, every meal tells a story of fresh ingredients, dedicated chefs, and a love for food.
</motion.p>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
>
<a href="#about-story" className="bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg hover:shadow-xl">
Learn Our Story
</a>
</motion.div>
</div>
</div>
</div>
);
};

// About Section Component
const AboutSection = () => {
return (
<section id="about-story" className="py-16 md:py-24 bg-white">
<div className="container mx-auto px-4">
<div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
<motion.div
className="md:w-1/2 mb-10 md:mb-0"
initial={{ opacity: 0, x: -50 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.7, ease: "easeOut" }}
viewport={{ once: true, amount: 0.25 }}
>
{/* Updated image for restaurant ambience */}
<img src="https://www.escoffier.edu/wp-content/uploads/2021/07/Interior-of-a-dimly-lit-modern-restaurant-768.jpeg" alt="DailyDish restaurant ambiance" className="rounded-xl shadow-2xl object-cover w-full h-[28rem] sm:h-[32rem] md:h-[36rem]" />
</motion.div>

<motion.div
className="md:w-1/2 md:pl-4 lg:pl-8"
initial={{ opacity: 0, x: 50 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.7, ease: "easeOut" }}
viewport={{ once: true, amount: 0.25 }}
>
<p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-2">Our Philosophy</p>
<h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 mb-5">
Crafting Joy, <span className="text-orange-500">One Dish at a Time</span>
</h2>
<div className="w-24 h-1.5 bg-orange-500 mb-6 rounded-full"></div>
<p className="text-stone-600 mb-5 text-lg leading-relaxed">
Welcome to DailyDish! We're more than just a place to eat; we're a community passionate about bringing you delightful meals made from the freshest, locally-sourced ingredients.
</p>
<p className="text-stone-600 mb-5 text-lg leading-relaxed">
Our core belief is in the power of real food – prepared with authentic passion and served with genuine care. Each dish is a reflection of our dedication to quality, vibrant flavors, and your ultimate satisfaction.
</p>
<p className="text-stone-600 mb-8 text-lg leading-relaxed">
Join us as we continue our tradition of creating memorable food experiences that bring people together and brighten your day.
</p>
<a href="#chefs" className="bg-green-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 text-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
Meet Our Artisans
</a>
</motion.div>
</div>
</div>
</section>
);
};

// Chef Section Component
const ChefSection = () => {
const chefs = [
{
name: "Elena Rodriguez",
position: "Executive Chef & Co-founder",
image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
bio: "Chef Elena combines traditional techniques with global flavors, creating innovative and soulful dishes daily."
},
{
name: "Marcus \"Lim\"",
position: "Head of Pastry & Bakery",
// Updated image for Marcus "Lim"
image: "https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208316.jpg",
bio: "Marcus crafts our delightful desserts and artisanal breads, bringing a sweet touch of perfection to every meal."
},
{
name: "Aisha Khan",
position: "Sous Chef & Grill Master",
// Updated image for Aisha Khan
image: "https://media.istockphoto.com/id/1299940945/photo/woman-chef-holding-spatula-cooking-equipment.jpg?s=612x612&w=0&k=20&c=BmOEpgaHKlMtJ19Q8pb2e1stMkN-oS4AF6PtuZ2T954=",
bio: "Aisha's expertise on the grill and her dedication to fresh ingredients ensure every savory dish is a masterpiece."
}
];

return (
<section id="chefs" className="py-16 md:py-24 bg-amber-100">
<div className="container mx-auto px-4">
<motion.div
className="text-center mb-12 md:mb-16"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true, amount: 0.2 }}
>
<h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 mb-4">The Heart of Our Kitchen</h2>
<div className="w-28 h-1.5 bg-orange-500 mx-auto mb-6 rounded-full"></div>
<p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
Meet the culinary talents who pour their passion and skill into every DailyDish creation, ensuring an unforgettable taste experience.
</p>
</motion.div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
{chefs.map((chef, index) => (
<motion.div
key={index}
className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-300 group"
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
viewport={{ once: true, amount: 0.1 }}
whileHover={{ y: -10, transition: { duration: 0.25, ease: "easeOut" } }}
>
<div className="h-80 sm:h-96 w-full overflow-hidden">
<img src={chef.image} alt={chef.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
</div>
<div className="p-6 text-center">
<h3 className="text-2xl font-bold text-stone-800 mb-1.5">{chef.name}</h3>
<p className="text-green-600 font-semibold mb-3 text-md">{chef.position}</p>
<p className="text-stone-600 text-sm leading-relaxed h-20 overflow-hidden">{chef.bio}</p>
</div>
</motion.div>
))}
</div>
</div>
</section>
);
};

// Special Offer Component
const SpecialOffer = () => {
return (
<section className="py-16 md:py-24 bg-green-600 text-white">
<div className="container mx-auto px-4">
<div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-green-700/50 p-8 md:p-12 rounded-2xl shadow-xl backdrop-blur-sm">
<motion.div
className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left"
initial={{ opacity: 0, x: -50 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.7, ease: "easeOut" }}
viewport={{ once: true, amount: 0.2 }}
>
<p className="text-sm font-semibold text-yellow-300 uppercase tracking-wider mb-1">Exclusive Offer</p>
<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">Taste the Savings!</h2>
<div className="w-20 h-1.5 bg-yellow-300 mb-5 md:mx-0 mx-auto rounded-full"></div>
<p className="text-xl text-gray-100 mb-3">FRESHLY PREPARED FOR YOU</p>
<p className="text-2xl md:text-3xl font-bold text-yellow-300 mb-8">Get a Free Appetizer!*</p>
<motion.button
className="bg-orange-500 text-white px-8 py-3.5 rounded-lg font-bold text-lg flex items-center space-x-2.5 shadow-lg hover:bg-orange-600 transition-colors duration-300 mx-auto md:mx-0 group"
whileHover={{ scale: 1.05, y: -3 }}
whileTap={{ scale: 0.95 }}
>
<span>CLAIM YOUR OFFER</span>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
</svg>
</motion.button>
<p className="text-xs text-gray-200 mt-3 text-center md:text-left">*With any main course purchase. Today only!</p>
</motion.div>

<motion.div
className="md:w-1/2 relative group"
initial={{ opacity: 0, x: 50 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.7, ease: "easeOut" }}
viewport={{ once: true, amount: 0.2 }}
>
<img src="https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Special Appetizer Offer" className="rounded-xl shadow-2xl" />
<motion.div
className="absolute -top-4 -right-4 md:-top-5 md:-right-5 bg-orange-500 text-white font-bold text-xl md:text-2xl p-4 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg border-4 border-yellow-300 leading-tight text-center"
animate={{ rotate: [0, -6, 6, -6, 0], scale: [1, 1.08, 1, 1.08, 1] }}
transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
>
FREE <span className="text-sm block -mt-1">Appetizer</span>
</motion.div>
</motion.div>
</div>
</div>
</section>
);
};

// Menu Section Preview Component
const MenuPreviewSection = () => {
const [activeCategory, setActiveCategory] = useState('all');

const categories = [
{ id: 'all', name: 'Chef\'s Picks' },
{ id: 'main', name: 'Hearty Mains' },
{ id: 'starters', name: 'Tasty Starters' },
];

const menuItems = [
{ id: 1, name: 'Signature Salmon', category: 'main', price: 18.50, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
{ id: 2, name: 'Artisan Bruschetta', category: 'starters', price: 9.75, image: 'https://images.squarespace-cdn.com/content/v1/65347d877eaa193cf2e2f7f1/d6791af0-1e77-4baf-b500-8c5590128df0/Chabaso-49.jpg' }, // Updated image for Artisan Bruschetta
{ id: 3, name: 'Lemon Herb Chicken', category: 'main', price: 16.25, image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
];

const itemsToDisplay = 3;
const filteredItems = activeCategory === 'all'
? menuItems.slice(0, itemsToDisplay)
: menuItems.filter(item => item.category === activeCategory).slice(0, itemsToDisplay);

return (
<section id="menu-preview" className="py-16 md:py-24 bg-orange-50">
<div className="container mx-auto px-4">
<motion.div
className="text-center mb-12 md:mb-16"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true, amount: 0.2 }}
>
<h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 mb-4">Explore Our Flavors</h2>
<div className="w-28 h-1.5 bg-orange-500 mx-auto mb-6 rounded-full"></div>
<p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
A curated selection from our menu, showcasing fresh ingredients and culinary craftsmanship.
</p>
</motion.div>

<div className="flex justify-center mb-10 md:mb-12">
<div className="flex flex-wrap gap-3 md:gap-4 justify-center">
{categories.map((cat) => (
<motion.button
key={cat.id}
className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm ${
activeCategory === cat.id ? 'bg-orange-500 text-white ring-2 ring-offset-1 ring-orange-500' : 'bg-white text-stone-700 hover:bg-orange-100 border border-orange-300/80'
}`}
onClick={() => setActiveCategory(cat.id)}
whileHover={{ y: -2, boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}
whileTap={{ scale: 0.98 }}
>
{cat.name}
</motion.button>
))}
</div>
</div>

<motion.div
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
initial="hidden"
whileInView="visible"
variants={{ visible: { transition: { staggerChildren: 0.1 } }}}
viewport={{ once: true, amount: 0.1 }}
>
{filteredItems.map((item) => (
<motion.div
key={item.id}
className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200/70 flex flex-col group"
variants={{
hidden: { opacity: 0, y: 30, scale: 0.9 },
visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94]} }
}}
whileHover={{ y: -8, transition: {duration: 0.25, ease: "easeOut"} }}
>
<div className="h-56 sm:h-60 overflow-hidden relative">
<img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
<div className="absolute top-3 right-3 bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
{item.category.charAt(0).toUpperCase() + item.category.slice(1)}
</div>
</div>
<div className="p-5 flex flex-col flex-grow">
<div className="flex justify-between items-center mb-2">
<h3 className="text-xl font-bold text-stone-800 leading-tight">{item.name}</h3>
<span className="text-lg font-bold text-green-600 whitespace-nowrap">${item.price.toFixed(2)}</span>
</div>
<p className="text-stone-500 text-xs mb-4 capitalize">Chef's recommendation!</p>
<button className="mt-auto w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
View Details
</button>
</div>
</motion.div>
))}
</motion.div>

<div className="text-center mt-12 md:mt-16">
<NavLink to="/menu">
<motion.button
className="bg-green-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
whileHover={{ scale: 1.05, y: -3 }}
whileTap={{ scale: 0.95 }}
>
Explore Full Menu
</motion.button>
</NavLink>
</div>
</div>
</section>
);
};

export default Aboutus;