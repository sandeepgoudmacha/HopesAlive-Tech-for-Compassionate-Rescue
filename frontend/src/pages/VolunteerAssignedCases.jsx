import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaMapMarkerAlt, FaClock, FaExclamationCircle } from "react-icons/fa";
import VolunteerDashboardLayout from "../VolunteerDashCompo/VolunteerDashboardLayout";

const VolunteerAssignedCases = () => {
  const [assignedCases, setAssignedCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedCases = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://hopesalive-zh55.onrender.com/api/volunteer/my-cases",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setAssignedCases(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching assigned cases:", error);
        toast.error("Failed to load assigned cases");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedCases();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      "in progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Your Assigned Cases
        </h1>

        <div className="space-y-4">
          {assignedCases.length > 0 ? (
            assignedCases.map((case_) => (
              <div
                key={case_.id}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {case_.animalInfo?.description || "Unknown Animal"}
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-2" />
                        {case_.location?.address || "Location unavailable"}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        case_.status
                      )}`}
                    >
                      {case_.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <FaClock className="mr-2" />
                      Assigned: {formatDate(case_.assignedAt)}
                    </div>
                    {case_.animalInfo?.aiSeverityAssessment?.score && (
                      <span className="text-gray-600">
                        Severity: {case_.animalInfo.aiSeverityAssessment.score}
                        /10
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaExclamationCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No Assigned Cases
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't been assigned to any cases yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </VolunteerDashboardLayout>
  );
};

export default VolunteerAssignedCases;
