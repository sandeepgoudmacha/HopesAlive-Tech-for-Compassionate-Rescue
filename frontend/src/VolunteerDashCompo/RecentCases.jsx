import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const RecentCases = ({ cases }) => {
  const getStatusColor = (status) => {
    const colors = {
      'in progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Take only the first 3 cases
  const recentCases = cases?.slice(0, 2) || [];

  return (
    <div className="space-y-4">
      {recentCases.length > 0 ? (
        recentCases.map((case_) => (
          <Link
            key={case_.id}
            to={`/voldash/case/${case_.id}`}
            className="block bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">
                  {case_.animalInfo?.description || 'Unknown Animal'}
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-1" />
                    {case_.location?.address || 'Location unavailable'}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-1" />
                    {formatDate(case_.assignedAt)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                  {case_.status}
                </span>
                {case_.animalInfo?.aiSeverityAssessment?.score && (
                  <span className="text-xs text-gray-500">
                    Severity: {case_.animalInfo.aiSeverityAssessment.score}/10
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No cases assigned yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Check available cases to start helping animals in need
          </p>
        </div>
      )}
      {recentCases.length > 0 && (
        <Link
          to="/voldash/assigned"
          className="block text-center text-sm text-orange-500 hover:text-orange-600 font-medium mt-2"
        >
          View All Assigned Cases
        </Link>
      )}
    </div>
  );
};

export default RecentCases; 