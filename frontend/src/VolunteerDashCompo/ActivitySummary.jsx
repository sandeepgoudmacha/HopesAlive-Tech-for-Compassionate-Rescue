import React from 'react';
import { 
  FaPaw, 
  FaSpinner, 
  FaCheckCircle, 
  FaBolt 
} from 'react-icons/fa';

const ActivitySummary = ({ stats }) => {
  const cards = [
    {
      title: 'Total Cases',
      value: stats?.totalCases || 0,
      icon: FaPaw,
      description: 'All cases assigned to you',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      iconColor: 'text-orange-500'
    },
    {
      title: 'Active Cases',
      value: stats?.activeCases || 0,
      icon: FaSpinner,
      description: 'Cases in progress',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Completed',
      value: stats?.completedCases || 0,
      icon: FaCheckCircle,
      description: 'Successfully rescued',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconColor: 'text-green-500'
    },
    {
      title: 'Response Rate',
      value: `${stats?.responseRate || 0}%`,
      icon: FaBolt,
      description: 'Average response time',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div 
            key={card.title} 
            className={`${card.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm">{card.title}</p>
                <h3 className={`text-2xl font-bold mt-2 ${card.textColor}`}>
                  {card.value}
                </h3>
                <p className="text-gray-500 text-xs mt-1">{card.description}</p>
              </div>
              <div className={`${card.iconColor} p-3 rounded-full bg-white/50`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivitySummary;