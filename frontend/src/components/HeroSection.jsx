import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Shield, Users, PawPrint } from 'lucide-react';

function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-orange-50 to-white font-sans overflow-hidden">
      {/* Organic Background Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="paw-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M30,50 Q40,35 50,50 Q60,65 50,80 Q40,95 30,80 Q20,65 30,50 Z" fill="#f97316" fillOpacity="0.1" />
            <circle cx="42" cy="42" r="6" fill="#f97316" fillOpacity="0.1" />
            <circle cx="58" cy="42" r="6" fill="#f97316" fillOpacity="0.1" />
            <circle cx="42" cy="58" r="6" fill="#f97316" fillOpacity="0.1" />
            <circle cx="58" cy="58" r="6" fill="#f97316" fillOpacity="0.1" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#paw-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 pt-6 pb-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left relative z-10 max-w-lg mx-auto lg:mx-0"
          >
            {/* Emergency Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6 text-sm font-medium shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              24/7 Emergency Response
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Every Paw Matters, <br className="hidden sm:block" />
              <span className="text-orange-600">Every Rescue Counts</span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8 font-normal max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join HopesAlive in our mission to protect and nurture street animals in need. Your swift action today could mean a lifetime for them tomorrow.
            </motion.p>

            <motion.div 
              className="flex flex-col xs:flex-row gap-3 justify-center lg:justify-start mb-8 md:mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/report-incident" className="w-full xs:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 
                           transition-all font-semibold shadow-lg hover:shadow-orange-200/50 
                           flex items-center justify-center gap-2 group"
                >
                  <PawPrint size={20} />
                  <span>Report Animal</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/contact" className="w-full xs:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-white text-orange-500 border-2 border-orange-500 
                           rounded-xl hover:bg-orange-50 transition-all font-semibold 
                           flex items-center justify-center gap-2 group"
                >
                  <Heart size={20} />
                  <span>Volunteer</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-y-3 gap-x-6 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-100 rounded-full">
                  <PawPrint size={16} className="text-orange-500" />
                </div>
                <span>1000+ Animals Rescued</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-100 rounded-full">
                  <Shield size={16} className="text-orange-500" />
                </div>
                <span>24/7 Emergency Team</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-100 rounded-full">
                  <Users size={16} className="text-orange-500" />
                </div>
                <span>Trusted by 50+ NGOs</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0 max-w-md mx-auto lg:max-w-none"
          >
            {/* Mobile Image - Only visible on small screens */}
            <motion.div
              className="block lg:hidden overflow-hidden rounded-2xl shadow-xl relative aspect-[4/3]"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="./rescue.jpg" 
                alt="Animal rescue team in action" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Heart size={18} className="text-orange-400 fill-orange-400" />
                  <span className="font-medium">Your help makes a difference</span>
                </div>
              </div>
            </motion.div>
            
            {/* Desktop Image Grid - Only visible on large screens */}
            <div className="hidden lg:grid grid-cols-2 gap-4 relative">
              {/* Decorative Background Blobs */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-200 rounded-full filter blur-3xl opacity-30" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-200 rounded-full filter blur-3xl opacity-30" />
              
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-2xl shadow-xl h-48 relative"
                >
                  <img 
                    src="./rescue.jpg" 
                    alt="Veterinarian treating a street dog" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-2xl shadow-xl h-64 relative"
                >
                  <img 
                    src="./rescue2.png" 
                    alt="Animal rescue team in action" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </div>
              <div className="space-y-4 mt-12">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-2xl shadow-xl h-64 relative"
                >
                  <img 
                    src="./rescue3.jpg" 
                    alt="Volunteers feeding street animals" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-2xl shadow-xl h-48 relative"
                >
                  <img 
                    src="./rescue4.jpg" 
                    alt="Successfully rescued and happy animal" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-white shadow-xl rounded-xl px-4 py-2 flex items-center gap-2 z-10"
              >
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Heart size={20} className="text-orange-500" />
                </div>
                <span className="font-medium text-gray-800">Make a difference today</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Quick Action Floating Button - Mobile Only */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 lg:hidden"
      >
        <Link to="/report-incident">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg"
          >
            <PawPrint size={24} />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default HeroSection;