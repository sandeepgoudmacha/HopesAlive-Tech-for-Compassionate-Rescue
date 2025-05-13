import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="flex relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden fixed top-18 left-4 z-50 p-1 rounded-lg bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <TbLayoutSidebarRightExpandFilled className={`w-6 h-6 text-gray-700 transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className="p-4 sm:p-6 lg:p-8 transition-all duration-200">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
