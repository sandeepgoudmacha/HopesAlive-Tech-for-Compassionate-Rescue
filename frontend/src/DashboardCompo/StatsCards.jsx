import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const StatsCards = forwardRef((props, ref) => {
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    pending: 0,
    resolved: 0
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://hopesalive-zh55.onrender.com/api/ngo/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.stats) {
        setStats({
          total: response.data.stats.total || 0,
          critical: response.data.stats.critical || 0,
          pending: response.data.stats.pending || 0,
          resolved: response.data.stats.resolved || 0
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      toast.error('Failed to load statistics');
    }
  };

  useImperativeHandle(ref, () => ({
    refreshStats: fetchStats
  }));

  useEffect(() => {
    fetchStats();
  }, []);

  const cardConfig = {
    total: {
      title: 'Total Cases',
      icon: '🐾',
      description: 'All reported animal incidents',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100'
    },
    critical: {
      title: 'Critical Cases',
      icon: '🚨',
      description: 'Urgent attention needed',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
      hoverColor: 'hover:bg-red-100'
    },
    pending: {
      title: 'Pending Cases',
      icon: '🏥',
      description: 'Awaiting action',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      hoverColor: 'hover:bg-yellow-100'
    },
    resolved: {
      title: 'Rescued Animals',
      icon: '💚',
      description: 'Successfully helped',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverColor: 'hover:bg-green-100'
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {Object.entries(stats).map(([key, value]) => {
        const config = cardConfig[key];
        return (
          <motion.div
            key={key}
            className={`relative overflow-hidden rounded-xl border ${config.borderColor} ${config.bgColor} ${config.hoverColor} transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl" role="img" aria-label={config.title}>
                  {config.icon}
                </span>
                <span className={`text-3xl sm:text-4xl font-bold ${config.textColor}`}>
                  {value}
                </span>
              </div>
              
              <div>
                <h3 className={`text-base sm:text-lg font-semibold ${config.textColor}`}>
                  {config.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  {config.description}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mt-3 sm:mt-4">
                <div className={`h-1 w-full bg-gray-200 rounded-full overflow-hidden`}>
                  <div 
                    className={`h-full ${config.textColor.replace('text', 'bg')} transition-all duration-500`}
                    style={{ 
                      width: `${(value / (stats.total || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative pattern */}
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <span className="text-6xl sm:text-8xl">{config.icon}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;