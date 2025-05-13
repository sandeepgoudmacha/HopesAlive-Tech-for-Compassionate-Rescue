import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import StatsCards from './StatsCards';
import RecentIncidents from './RecentIncidents';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    pending: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://hopesalive-zh55.onrender.com/api/ngo/dashboard-overview', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <StatsCards stats={stats} />
      <RecentIncidents />
    </div>
  );
};

export default DashboardOverview;