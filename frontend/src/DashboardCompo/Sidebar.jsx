import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HomeIcon className="w-6 h-6" />,
      path: '/dashboard',
      status: 'active'
    },
    {
      title: 'Incidents',
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      path: '/dashboard/incidents',
      status: 'active'
    },
    {
      title: 'Notifications',
      icon: <BellIcon className="w-6 h-6" />,
      path: '/dashboard/notifications',
      status: 'active'
    },
    {
      title: 'Analytics',
      icon: <ChartBarIcon className="w-6 h-6" />,
      path: '/dashboard/analytics',
      status: 'coming-soon'
    },
    {
      title: 'Settings',
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      path: '/dashboard/settings',
      status: 'under-development'
    }
  ];

  const isPathActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleItemClick = (item) => {
    if (item.status === 'active') {
      navigate(item.path);
      if (window.innerWidth < 1024) onClose();
    } else {
      toast.info(`${item.title} is ${item.status.replace('-', ' ')}`);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      <aside 
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative
          inset-y-0 left-0
          w-[280px] lg:w-64
          bg-white
          border-r border-gray-200
          shadow-lg lg:shadow-none
          transform
          transition-all
          duration-300
          ease-in-out
          z-40
          h-[100dvh]
          overflow-y-auto
          md:mt-0
          mt-16
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
        `}
        aria-label="Sidebar Navigation"
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-xl font-bold text-blue-500">NGO Dashboard</h2>
        </div>

        <nav className="mt-4" aria-label="Sidebar Navigation">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = isPathActive(item.path);
              
              return (
                <button
                  key={item.title}
                  onClick={() => handleItemClick(item)}
                  disabled={item.status !== 'active'}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    ${item.status !== 'active' 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'cursor-pointer'}
                    group
                    focus:outline-none focus:ring-2 
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-4">
                    <span className={`
                      ${isActive ? 'text-blue-600' : 'text-gray-500'}
                      group-hover:text-blue-600 transition-colors duration-200
                    `}>
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm">
                      {item.title}
                    </span>
                  </div>
                  
                  {item.status !== 'active' && (
                    <span className="ml-auto text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.status.replace('-', ' ')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;