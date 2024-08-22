import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import About from '../assets/About.png'

const Contact = () => {
  localStorage.removeItem("cartItems")
  return (
    <div className="bg-gray-50">
      <Navbar />
      
      {/* Banner with "Contact Us" text overlay */}
      <div className="relative">
        <img src={About} alt="About Banner" className="w-full h-64 md:h-80 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">Contact Us</h1>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-8 items-center rounded-3xl overflow-hidden bg-white shadow-lg">
          {/* Left side with food image */}
          <div className="w-full md:w-1/2 h-full">
            <div className="rounded-full overflow-hidden md:rounded-l-3xl">
            <img 
                src="https://www.madewithlau.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F2r0kdewr%2Fproduction%2Fd8da2bdbd08051c0861f496886fe411be357d8a9-1000x668.jpg&w=3840&q=75" 
                alt="Delicious roasted chicken with herbs and citrus" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right side with contact form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Get In Touch</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-500"
                  >
                    <option value="" disabled selected>Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="reservation">Reservation</option>
                    <option value="catering">Catering</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>
              
              <div>
                <textarea 
                  placeholder="Write your message here..." 
                  rows="5" 
                  className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  Collaboratively formulate principle capital. Progressively evolve user
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-300 flex items-center justify-center"
              >
                SUBMIT NOW
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Contact