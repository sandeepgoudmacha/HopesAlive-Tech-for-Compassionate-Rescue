import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaClock,
  FaExclamationCircle,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";
import VolunteerDashboardLayout from "../VolunteerDashCompo/VolunteerDashboardLayout";

const AvailableCases = () => {
  const [availableCases, setAvailableCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'high', 'moderate', 'low'

  useEffect(() => {
    const fetchAvailableCases = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://hopesalive-zh55.onrender.com/api/volunteer/incidents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setAvailableCases(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching available cases:", error);
        toast.error("Failed to load available cases");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCases();
  }, []);

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} days ago`;
    }
  };

  const getSeverityColor = (score) => {
    if (score >= 7) return "text-red-700 bg-red-50";
    if (score >= 4) return "text-yellow-700 bg-yellow-50";
    return "text-green-700 bg-green-50";
  };

  const filteredCases = availableCases.filter((case_) => {
    const matchesSearch =
      case_.animalInfo?.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      case_.location?.address?.toLowerCase().includes(searchTerm.toLowerCase());

    const severity = case_.animalInfo?.aiSeverityAssessment?.score || 0;
    const matchesFilter =
      filter === "all" ||
      (filter === "high" && severity >= 7) ||
      (filter === "moderate" && severity >= 4 && severity < 7) ||
      (filter === "low" && severity < 4);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <VolunteerDashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent" />
        </div>
      </VolunteerDashboardLayout>
    );
  }

  return (
    <VolunteerDashboardLayout>
      <div className="p-6 mt-20">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Available Cases Nearby
          </h1>
          <p className="text-gray-600">Help animals in need in your area</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by description or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Severities</option>
            <option value="high">High Priority</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.length > 0 ? (
            filteredCases.map((case_) => (
              <div
                key={case_.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {case_.animalInfo?.photo && (
                  <img
                    src={`https://hopesalive-zh55.onrender.com/api/uploads/${case_.animalInfo.photo}`}
                    alt="Case"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900">
                      {case_.animalInfo?.description || "Unknown Animal"}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold ${getSeverityColor(
                        case_.animalInfo?.aiSeverityAssessment?.score
                      )}`}
                    >
                      {case_.animalInfo?.aiSeverityAssessment?.score || 0}/10
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="mr-2" />
                      {case_.location?.address || "Location unavailable"}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-2" />
                      {getTimeAgo(case_.createdAt)}
                    </div>
                  </div>

                  <Link
                    to={`/voldash/case/${case_.id}`}
                    className="flex items-center justify-center w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View Details
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <FaExclamationCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No Available Cases
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Check back later for new cases in your area"}
              </p>
            </div>
          )}
        </div>
      </div>
    </VolunteerDashboardLayout>
  );
};

export default AvailableCases;
