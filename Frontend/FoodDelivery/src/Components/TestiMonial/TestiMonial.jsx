import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { motion, useInView } from 'framer-motion';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// REPLACE this with a collage of happy customers or diverse food images
const testimonialSideImageUrl = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1014&q=80';

const TestiMonial = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.15 });

  // Using your original testimonial data structure, just updated text for food theme
  const testimonials = [
    {
      id: 1,
      text: "Absolutely loved the pasta from The Gourmet Kitchen! It arrived hot and was incredibly delicious. Will order again!",
      author: "Sarah L.",
      role: "Food Blogger", // Role is optional, could be city or just author
      avatarSeed: "https://i.pravatar.cc/150?u=sarahl", // Replace with actual user images if possible
      rating: 5
    },
    {
      id: 2,
      text: "DailyDish is my go-to for quick lunches. The delivery is always on time, and the food quality is consistently great. Highly recommend!",
      author: "Mike P.",
      role: "Software Developer",
      avatarSeed: "https://i.pravatar.cc/150?u=mikep",
      rating: 5
    },
    {
      id: 3,
      text: "The variety of restaurants is amazing. I can always find something new to try. Customer service was also very helpful.",
      author: "Jessica C.",
      role: "Graphic Designer",
      avatarSeed: "https://i.pravatar.cc/150?u=jessicac",
      rating: 4
    },
    {
      id: 4,
      text: "Ordered for a family dinner and everyone was impressed. The portions were generous and every dish was packed with flavor.",
      author: "David K.",
      role: "Teacher",
      avatarSeed: "https://i.pravatar.cc/150?u=davidk",
      rating: 5
    },
    {
      id: 5,
      text: "Super easy to use app and website. Finding my favorite sushi place and ordering took less than 5 minutes!",
      author: "Emily R.",
      role: "Marketing Manager",
      avatarSeed: "https://i.pravatar.cc/150?u=emilyr",
      rating: 4
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarSolid key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="w-full py-16 md:py-24 px-4 bg-amber-50 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-800 mb-3">
            What Our <span className="text-orange-500">Food Lovers</span> Say
          </h2>
          <p className="text-stone-600 text-lg max-w-xl mx-auto">
            Hear from our satisfied customers about their delightful experiences with DailyDish.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            className="lg:col-span-5 relative h-[300px] sm:h-[400px] md:h-[450px] group hidden lg:block" // Hide on small screens, show on lg
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={isSectionInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <img
              src={testimonialSideImageUrl}
              alt="Happy customers enjoying food"
              className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={20} // Space between slides
              slidesPerView={1} // Show one slide at a time on smaller screens
              breakpoints={{
                // when window width is >= 640px
                640: {
                  slidesPerView: 1, // Still 1 on sm, but can adjust
                  spaceBetween: 20,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 1, // Adjust if you want 2 slides on md, but cards are wide
                  spaceBetween: 30,
                },
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-custom-testimonials-dd',
                bulletClass: 'swiper-pagination-bullet-dd', // Custom class for bullets
                bulletActiveClass: 'swiper-pagination-bullet-active-dd', // Custom class for active bullet
              }}
              navigation={{
                nextEl: '.swiper-button-next-dd',
                prevEl: '.swiper-button-prev-dd',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="h-full w-full py-4" // Padding for pagination visibility
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="group p-2"> {/* Added padding to slide for shadow visibility */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between min-h-[280px] sm:min-h-[260px]">
                    <div>
                      <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 text-orange-400 mb-3" />
                      <p className="text-sm sm:text-base text-stone-600 italic mb-4 leading-relaxed">"{testimonial.text}"</p>
                    </div>
                    <div className="mt-auto pt-3 border-t border-gray-200">
                      <div className="flex items-center">
                        <img src={testimonial.avatarSeed} alt={testimonial.author} className="w-11 h-11 rounded-full mr-3 border-2 border-orange-200 object-cover" />
                        <div>
                          <p className="font-semibold text-base text-stone-700">{testimonial.author}</p>
                          {testimonial.role && <p className="text-xs text-stone-500">{testimonial.role}</p>}
                        </div>
                      </div>
                      <div className="mt-2.5">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-dd absolute top-1/2 -translate-y-1/2 -left-3 z-10 p-2 bg-white/80 hover:bg-orange-100 text-orange-500 hover:text-orange-600 rounded-full shadow-md cursor-pointer transition-all hidden sm:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div className="swiper-button-next-dd absolute top-1/2 -translate-y-1/2 -right-3 z-10 p-2 bg-white/80 hover:bg-orange-100 text-orange-500 hover:text-orange-600 rounded-full shadow-md cursor-pointer transition-all hidden sm:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            {/* Custom Pagination container - Bullets will be styled via CSS if needed beyond Tailwind */}
            <div className="swiper-pagination-custom-testimonials-dd text-center mt-6 space-x-2"></div>
            <style jsx global>{`
                .swiper-pagination-bullet-dd {
                    width: 10px;
                    height: 10px;
                    background-color: #fdba74; /* orange-300 */
                    opacity: 0.7;
                    border-radius: 50%;
                    transition: background-color 0.3s, opacity 0.3s;
                    display: inline-block; /* Ensure bullets are inline */
                }
                .swiper-pagination-bullet-active-dd {
                    background-color: #f97316; /* orange-500 */
                    opacity: 1;
                }
            `}</style>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestiMonial;