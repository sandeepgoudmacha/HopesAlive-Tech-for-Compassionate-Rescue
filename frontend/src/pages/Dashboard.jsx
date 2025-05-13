import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DashboardLayout from "../DashboardCompo/DashboardLayout";
import StatsCards from "../DashboardCompo/StatsCards";
import RecentIncidents from "../DashboardCompo/RecentIncidents";
import IncidentMap from "../DashboardCompo/IncidentMap";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [ngoProfile, setNgoProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNgoProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://hopesalive-zh55.onrender.com/api/ngo/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setNgoProfile(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch NGO profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNgoProfile();
  }, []);

  // Only show dashboard overview content on the index route
  const isDashboardIndex = location.pathname === "/dashboard";


  if (isDashboardIndex && loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-orange-200 animate-spin border-t-orange-500">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2L12,2c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h0c0.6,0,1-0.4,1-1V3C13,2.4,12.6,2,12,2z"/>
                  <path fill="currentColor" d="M12,18L12,18c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h0c0.6,0,1-0.4,1-1v-2C13,18.4,12.6,18,12,18z"/>
                  <path fill="currentColor" d="M21,11L21,11c0-0.6-0.4-1-1-1h-2c-0.6,0-1,0.4-1,1v0c0,0.6,0.4,1,1,1h2C20.6,12,21,11.6,21,11z"/>
                  <path fill="currentColor" d="M5,11L5,11c0-0.6-0.4-1-1-1H2c-0.6,0-1,0.4-1,1v0c0,0.6,0.4,1,1,1h2C4.6,12,5,11.6,5,11z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {isDashboardIndex ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div className="bg-gradient-to-r bg-orange-50 rounded-xl p-6 border border-orange-100">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {ngoProfile?.name || "Animal Hero"}! 👋
              </h1>
              <p className="text-gray-600">
                Your dedication to helping animals makes a real difference.
                Here&apos;s your latest overview.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <StatsCards />
          </div>

          {/* Recent Incidents Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <RecentIncidents />
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4">Incident Map</h2>
            <IncidentMap />
          </div>
        </motion.div>
      ) : (
        <Outlet />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
