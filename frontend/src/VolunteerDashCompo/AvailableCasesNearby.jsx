import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaExclamationCircle,
  FaClock,
  FaArrowRight 
} from 'react-icons/fa';

const AvailableCases = ({ cases }) => {
  const getSeverityColor = (score) => {
    if (score >= 7) return 'bg-red-100 text-red-800';
    if (score >= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-4">
      {cases && cases.length > 0 ? (
        <>
          {cases.map((case_) => (
            <div 
              key={case_.id}
              className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900">
                    {case_.animalInfo?.type || 'Unknown Animal'}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-1" />
                    {case_.location?.address || 'Location unavailable'}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getSeverityColor(case_.animalInfo?.aiSeverityAssessment?.score)
                }`}>
                  Severity: {case_.animalInfo?.aiSeverityAssessment?.score || 0}/10
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {case_.animalInfo?.description || 'No description available'}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <FaClock className="mr-1" />
                  {getTimeAgo(case_.createdAt)}
                </div>
                <Link
                  to={`/voldash/case/${case_.id}`}
                  className="flex items-center text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                  View Details
                  <FaArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
          <Link
            to="/voldash/available"
            className="block text-center text-sm text-orange-500 hover:text-orange-600 font-medium mt-4"
          >
            View All Available Cases
          </Link>
        </>
      ) : (
        <div className="text-center py-6">
          <FaExclamationCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Available Cases</h3>
          <p className="mt-1 text-sm text-gray-500">Check back later for new cases in your area.</p>
        </div>
      )}
    </div>
  );
};

export default AvailableCases; 