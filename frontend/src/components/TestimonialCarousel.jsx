import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, PawPrint } from 'lucide-react';

const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "HopesAlive helped me rescue an injured puppy I found on the street. Their quick response and professional care saved a life that day. I'm forever grateful for their dedication.",
      author: "Sarah M",
      role: "Volunteer since 2023",
      image: "https://randomuser.me/api/portraits/women/3.jpg" // Replace with actual image path or use null
    },
    {
      quote: "After finding a stray cat with a broken leg, I didn't know what to do. The HopesAlive team responded within minutes and guided me through the whole process. The cat is now healthy and adopted!",
      author: "James P",
      role: "Community Member",
      image: "https://randomuser.me/api/portraits/men/83.jpg"
    },
    {
      quote: "As a veterinarian, I've worked with many animal welfare organizations. HopesAlive stands out with their well-trained volunteers and organized rescue operations. They truly put animal welfare first.",
      author: "Dr. Emily Richardson",
      role: "Partner Veterinarian",
      image: "https://randomuser.me/api/portraits/women/81.jpg"
    },
    {
      quote: "My daughter and I witnessed a dog hit by a car. We called HopesAlive and they arrived faster than we expected. They not only saved the dog but also helped us process the emotional experience.",
      author: "Michael T",
      role: "Donor since 2022",
      image: "https://randomuser.me/api/portraits/men/43.jpg"
    },
    {
      quote: "I've been fostering animals through HopesAlive for over a year. Their support system for foster families is exceptional, and their dedication to finding perfect forever homes is unmatched.",
      author: "Priya K",
      role: "Foster Parent",
      image: "https://randomuser.me/api/portraits/women/74.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, currentIndex]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="relative mt-16 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 md:p-8 border border-orange-200 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -right-12 -bottom-12 opacity-10">
        <PawPrint size={120} className="text-orange-500" />
      </div>
      <div className="absolute -left-12 -top-10 opacity-10 rotate-45">
        <PawPrint size={100} className="text-orange-500" />
      </div>
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-orange-500" />
          <h3 className="text-xl font-bold text-gray-900">What People Say</h3>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => {
              prevTestimonial();
              setAutoplay(false);
            }}
            className="p-2 bg-white rounded-full border border-gray-200 text-gray-600 hover:text-orange-500 hover:border-orange-300 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => {
              nextTestimonial();
              setAutoplay(false);
            }}
            className="p-2 bg-white rounded-full border border-gray-200 text-gray-600 hover:text-orange-500 hover:border-orange-300 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden min-h-[180px] md:min-h-[160px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="grid md:grid-cols-5 gap-6 items-center absolute w-full"
          >
            <div className="md:col-span-1 flex justify-center md:justify-start">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-orange-200 flex items-center justify-center text-orange-500 text-xl font-bold shadow-md"
              >
                {testimonials[currentIndex].image ? (
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].author} 
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <span>"</span>
                )}
              </motion.div>
            </div>
            <div className="md:col-span-4">
              <p className="text-gray-700 italic text-base md:text-lg mb-4">
                "{testimonials[currentIndex].quote}"
              </p>
              <p className="text-sm font-medium text-gray-900">
                - {testimonials[currentIndex].author}, {testimonials[currentIndex].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              setAutoplay(false);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-orange-500" : "w-2 bg-orange-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;