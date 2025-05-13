import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaClipboardList, 
  FaHandHoldingHeart, 
  FaBell, 
  FaChartLine,
  FaSignOutAlt,
} from 'react-icons/fa';
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

const VolunteerDashboardLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigation = [
    {
      path: '/voldash',
      name: 'Dashboard',
      icon: FaHome,
      description: 'Overview',
      status: 'active'
    },
    {
      path: '/voldash/my-cases',
      name: 'My Cases',
      icon: FaClipboardList,
      description: 'Assigned to you',
      status: 'active'
    },
    {
      path: '/voldash/available',
      name: 'Available Cases',
      icon: FaHandHoldingHeart,
      description: 'Help needed',
      status: 'active'
    },
    {
      path: '/voldash/activity',
      name: 'My Activity',
      icon: FaChartLine,
      description: 'Your rescue history',
      status: 'coming-soon'
    },
    {
      path: '/voldash/notifications',
      name: 'Notifications',
      icon: FaBell,
      description: 'Updates & alerts',
      status: 'coming-soon'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const NavigationContent = () => (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Volunteer Portal</h2>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isComingSoon = item.status === 'coming-soon';
          const Icon = item.icon;
          const Component = isComingSoon ? 'div' : Link;
          
          return (
            <Component
              key={item.name}
              to={!isComingSoon ? item.path : undefined}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-colors
                ${location.pathname === item.path 
                  ? 'bg-orange-50 text-orange-600' 
                  : isComingSoon 
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }
              `}
            >
              <Icon className="w-5 h-5 mr-3" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs">
                  {isComingSoon ? (
                    <span className="text-gray-400">Coming Soon</span>
                  ) : (
                    item.description
                  )}
                </div>
              </div>
            </Component>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
        >
          <FaSignOutAlt className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex relative">
        {/* Desktop Sidebar */}
        <div className={`fixed lg:static lg:block w-64 h-screen bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-30
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="flex flex-col h-full">
            <NavigationContent />
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden fixed top-16 left-4 z-50 p-1 rounded-lg bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <TbLayoutSidebarRightExpandFilled 
              className={`w-6 h-6 text-gray-700 transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <main className="p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboardLayout;