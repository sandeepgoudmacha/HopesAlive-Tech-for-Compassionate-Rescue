// import VolunteerDashboardLayout from '../../components/volunteer/VolunteerDashboardLayout';
// import IncidentList from '../../components/volunteer/IncidentList';
// import ActivitySummary from '../../components/volunteer/ActivitySummary';
// import NotificationsList from '../../components/volunteer/NotificationsList';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import VolunteerDashboardLayout from "../VolunteerDashCompo/VolunteerDashboardLayout";
import ActivitySummary from "../VolunteerDashCompo/ActivitySummary";
import RecentCases from "../VolunteerDashCompo/RecentCases";
import AvailableCasesNearby from "../VolunteerDashCompo/AvailableCasesNearby";
import {
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHandHoldingHeart,
} from "react-icons/fa";

const VolunteerDashboard = () => {
  const [stats, setStats] = useState({
    totalCases: 0,
    activeCases: 0,
    completedCases: 0,
    responseRate: 0,
  });
  const [recentCases, setRecentCases] = useState([]);
  const [availableCases, setAvailableCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch recent cases (assigned to volunteer)
        const recentResponse = await axios.get(
          "https://hopesalive-zh55.onrender.com/api/volunteer/my-cases",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (recentResponse.data.success) {
          setRecentCases(recentResponse.data.data);
        }

        // Fetch available cases
        const availableResponse = await axios.get(
          "https://hopesalive-zh55.onrender.com/api/volunteer/incidents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (availableResponse.data.success) {
          setAvailableCases(availableResponse.data.data);
        }

        // Calculate stats
        const activeCount = recentResponse.data.data.filter(
          (c) => c.status === "in progress" || c.status === "pending"
        ).length;

        const completedCount = recentResponse.data.data.filter(
          (c) => c.status === "resolved" || c.status === "completed"
        ).length;

        // Calculate response rate based on completed cases
        const responseRate =
          recentResponse.data.data.length > 0
            ? Math.round((completedCount / recentResponse.data.data.length) * 100)
            : 0;

        setStats({
          totalCases: recentResponse.data.data.length,
          activeCases: activeCount,
          completedCases: completedCount,
          responseRate: responseRate,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <VolunteerDashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500" />
        </div>
      </VolunteerDashboardLayout>
    );
  }

  return (
    <VolunteerDashboardLayout>
      <div className="space-y-6 mt-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome Back, Volunteer!</h1>
          <p className="text-orange-100">
            Thank you for making a difference in animal lives.
          </p>
        </div>

        {/* Stats Summary */}
        <ActivitySummary stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Cases */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FaClock className="mr-2 text-orange-500" />
              Your Recent Cases
            </h2>
            <RecentCases cases={recentCases} />
          </div>

          {/* Available Cases */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FaHandHoldingHeart className="mr-2 text-orange-500" />
              Available Cases Nearby
            </h2>
            <AvailableCasesNearby cases={availableCases} />
          </div>
        </div>
      </div>
    </VolunteerDashboardLayout>
  );
};

export default VolunteerDashboard;
