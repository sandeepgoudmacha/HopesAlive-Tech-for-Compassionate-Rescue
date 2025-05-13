import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Users,
  HeartPulse,
  ArrowRight,
  PawPrint,
  Clock,
  Building,
} from "lucide-react";
import TestimonialCarousel from "./TestimonialCarousel";

function Features() {
  const features = [
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Quick Reporting",
      description:
        "Simple incident reporting system with real-time updates and location tracking to help animals in need faster.",
      color: "from-orange-500/20 to-orange-500/5",
      accentColor: "bg-orange-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      link: "/report-incident",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Volunteer Network",
      description:
        "Join our community of 1000+ dedicated volunteers working together to rescue and care for animals.",
      color: "from-blue-500/20 to-blue-500/5",
      accentColor: "bg-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      link: "/volunteer",
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Professional Care",
      description:
        "Partnered with leading veterinary clinics and animal welfare organizations for the best medical care.",
      color: "from-emerald-500/20 to-emerald-500/5",
      accentColor: "bg-emerald-500",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      link: "/partners",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#f8f9fa_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      {/* Paw print background elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <PawPrint size={70} className="text-orange-300" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <PawPrint size={70} className="text-orange-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-20"
        >
          <motion.span
            className="inline-block text-orange-600 font-semibold mb-2 px-4 py-1 bg-orange-100 rounded-full text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Our Impact
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            How We Make a Difference
          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            From instant reporting to professional care, we ensure every animal
            gets the help they need, when they need it most.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="relative group h-full"
            >
              <Link to={feature.link} className="block h-full">
                <div
                  className={`h-full bg-gradient-to-br ${feature.color} border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300`}
                >
                  {/* Accent line */}
                  <div
                    className={`h-1 w-12 ${feature.accentColor} rounded-full mb-6`}
                  ></div>

                  {/* Icon */}
                  <div
                    className={`${feature.iconBg} ${feature.iconColor} p-3 rounded-xl inline-flex mb-5 shadow-sm`}
                  >
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-6 text-sm md:text-base">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors mt-auto">
                    Learn more
                    <ArrowRight
                      size={16}
                      className="ml-1 transform group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-20 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1000+",
                label: "Animals Rescued",
                icon: <PawPrint size={24} className="text-orange-500" />,
              },
              {
                number: "24/7",
                label: "Emergency Support",
                icon: <Clock size={24} className="text-blue-500" />,
              },
              {
                number: "50+",
                label: "Partner NGOs",
                icon: <Building size={24} className="text-emerald-500" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index + 0.6 }}
              >
                <div className="flex justify-center mb-3">
                  <motion.div
                    className="p-2 rounded-full bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-1"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index + 0.8, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <Link to="/impact">
              <motion.button
                className="inline-flex items-center px-5 py-2 text-sm font-medium text-orange-600 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See our full impact
                <ArrowRight size={16} className="ml-1" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r"
        >
          <div className="">
            <TestimonialCarousel />
            {/* <p className="text-gray-700 italic text-base md:text-lg mb-4">
                "HopesAlive helped me rescue an injured puppy I found on the street. Their quick response and professional care saved a life that day. I'm forever grateful for their dedication."
              </p>
              <p className="text-sm font-medium text-gray-900">- Sarah M, Volunteer since 2023</p> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
