import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHandsHelping, FaHeart, FaUsers, FaPaw, FaCalendarAlt } from 'react-icons/fa';

function VolunteerPage() {
  // Animation variants for consistent animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Card data to avoid repetition
  const benefitCards = [
    {
      icon: <FaHandsHelping className="w-12 h-12 text-orange-500 mb-4" />,
      title: "Make an Impact",
      description: "Help rescue and care for animals in need. Your actions can save lives and create lasting change.",
      delay: 0
    },
    {
      icon: <FaUsers className="w-12 h-12 text-orange-500 mb-4" />,
      title: "Join Our Community",
      description: "Connect with like-minded individuals who share your passion for animal welfare.",
      delay: 0.2
    },
    {
      icon: <FaHeart className="w-12 h-12 text-orange-500 mb-4" />,
      title: "Gain Experience",
      description: "Learn valuable skills in animal care, rescue operations, and community service.",
      delay: 0.4
    }
  ];
  
  // Testimonial data
  const testimonials = [
    {
      quote: "Volunteering with this organization has been the most rewarding experience of my life. The impact we make is immediate and tangible.",
      name: "Sarah J.",
      role: "Volunteer since 2023"
    },
    {
      quote: "I started as a weekend volunteer and found my true calling. Now I work in animal welfare full-time and couldn't be happier.",
      name: "Mike T.",
      role: "Rescue Coordinator"
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Become a <span className="text-orange-500">Volunteer</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Join our network of compassionate individuals making a real difference in the lives of street animals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold 
                        hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-200/50
                        flex items-center justify-center gap-2"
              >
                Register as Volunteer
                <FaHeart className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/opportunities">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white text-orange-500 border-2 border-orange-500 rounded-xl font-semibold 
                        hover:bg-orange-50 transition-colors
                        flex items-center justify-center gap-2"
              >
                View Opportunities
                <FaCalendarAlt className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Volunteer With Us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefitCards.map((card, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: card.delay }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow group"
              >
                {card.icon}
                <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors">{card.title}</h3>
                <p className="text-gray-600">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Volunteer Opportunities Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-20 bg-orange-100 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">How You Can Help</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <FaPaw className="w-6 h-6 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Animal Care</h3>
              </div>
              <p className="text-gray-600">Help with feeding, grooming, and socializing rescued animals. Perfect for animal lovers of all experience levels.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <FaHandsHelping className="w-6 h-6 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Rescue Operations</h3>
              </div>
              <p className="text-gray-600">Join our rescue teams responding to emergency situations and helping animals in distress.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <FaUsers className="w-6 h-6 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Community Outreach</h3>
              </div>
              <p className="text-gray-600">Educate communities about animal welfare and responsible pet ownership through workshops and events.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="w-6 h-6 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Event Support</h3>
              </div>
              <p className="text-gray-600">Help organize and run fundraising events, adoption drives, and awareness campaigns.</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Volunteer Stories
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-orange-500">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 bg-orange-500 text-white rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="mb-8">Every moment you volunteer helps an animal in need. Join our team today.</p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-orange-500 rounded-xl font-semibold 
                      hover:bg-gray-100 transition-colors shadow-lg
                      flex items-center justify-center gap-2 mx-auto"
            >
              Start Volunteering Now
              <FaPaw className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default VolunteerPage;