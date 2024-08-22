import React from 'react';
import { NavLink } from 'react-router-dom'; // It's good practice to use NavLink for internal links if using React Router

// Using placeholder icons for social media. You can use react-icons or your preferred SVG library.
// For consistency with the "Daily Dish" theme, I'll use text for social links if specific icons aren't critical,
// or you can integrate react-icons like in the previous DailyDish footer example.
// For this update, I will keep your existing SVG structure for social icons and restyle them.

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Re-using the "Daily Dish" link style for consistency
  const footerLinkStyle = "text-stone-500 hover:text-orange-600 transition-colors duration-200 text-sm";
  const footerHeadingStyle = "text-md font-bold text-stone-700 mb-4 tracking-wide"; // Adjusted mb for consistency

  return (
    // Applying "The Daily Dish" theme: light background, warm text colors
    <footer className="bg-orange-50 border-t border-orange-200/70 pt-12 md:pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto"> {/* Changed from max-w-7xl to max-w-screen-xl for consistency if desired, or keep 7xl */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"> {/* Increased gap slightly */}

          {/* Column 1: Logo and Description Section (Daily Dish Branding) */}
          <div className="col-span-1 md:col-span-1"> {/* Ensured it doesn't take more than 1/3 on larger screens by default */}
            <div className="flex items-center mb-5">
              {/* Daily Dish Logo */}
              <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-2 shadow-sm">D</div>
              <span className="font-extrabold text-2xl">
                <span className="text-stone-800">Daily</span>
                <span className="text-orange-500">Dish</span>
              </span>
            </div>

            {/* Kept your original heading structure, styled for the theme */}
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4 leading-tight">
              The Best<br />
              Restaurants<br />
              In Your Home
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              Craving something tasty? Get fresh, restaurant-quality meals delivered fast and hassle-free. Enjoy a variety of cuisines from the comfort of your home!
            </p>
          </div>

          {/* Column 2: Menu Section */}
          <div className="col-span-1">
            <h3 className={footerHeadingStyle}>MENU</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className={`flex items-center ${footerLinkStyle}`}>
                  Home
                  <svg className="w-4 h-4 ml-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>
              <li>
                <NavLink to="/AboutUs" className={`flex items-center ${footerLinkStyle}`}>
                  About Us
                  <svg className="w-4 h-4 ml-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>
              <li>
                {/* Assuming "/Menu" is your restaurants/menu page from Navbar */}
                <NavLink to="/Menu" className={`flex items-center ${footerLinkStyle}`}>
                  Restaurants
                  <svg className="w-4 h-4 ml-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>
              <li>
                <NavLink to="/Contact" className={`flex items-center ${footerLinkStyle}`}>
                  Contacts
                  <svg className="w-4 h-4 ml-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts Section */}
          <div className="col-span-1">
            <h3 className={footerHeadingStyle}>CONTACTS</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start text-stone-600">
                <svg className="w-5 h-5 mt-0.5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Biratnagar, Morang, Nepal</span> {/* Kept original address */}
              </div>

              <div className="border-t border-orange-200/70 pt-4"></div> {/* Themed border */}

              <div className="flex items-center">
                <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@dailydish.app" className={footerLinkStyle}>info@dailydish.app</a> {/* Example email */}
              </div>

              <div className="flex items-center">
                <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+977982710292" className={footerLinkStyle}>+977-982710292</a> {/* Kept original number */}
              </div>

              {/* Social Media Icons - Restyled */}
              <div className="flex space-x-3 pt-3">
                <a href="#" aria-label="Facebook" className="w-9 h-9 border border-orange-200 rounded-full flex items-center justify-center text-stone-500 hover:border-orange-500 hover:text-orange-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 border border-orange-200 rounded-full flex items-center justify-center text-stone-500 hover:border-orange-500 hover:text-orange-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="w-9 h-9 border border-orange-200 rounded-full flex items-center justify-center text-stone-500 hover:border-orange-500 hover:text-orange-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright and Legal Links */}
        <div className="border-t border-orange-200/70 mt-10 md:mt-12 pt-6 text-center"> {/* Themed border */}
          <p className="text-sm text-stone-500">
            Copyright &copy; {currentYear} DailyDish Foods Inc. All rights reserved. {/* Updated company name */}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 mt-3">
            <NavLink to="/privacy" className={footerLinkStyle}>Privacy Policy</NavLink>
            <NavLink to="/terms" className={footerLinkStyle}>Terms & Conditions</NavLink> {/* Changed from Terms & Services */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;