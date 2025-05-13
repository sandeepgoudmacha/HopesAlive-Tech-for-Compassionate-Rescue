import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecentIncidents = ({ onStatusUpdate = () => {} }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://hopesalive-zh55.onrender.com/api/incidents', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Sort incidents by date and take only the 6 most recent ones
        const sortedIncidents = response.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ).slice(0, 6);

        // For each incident that has an assigned volunteer, fetch volunteer details
        const incidentsWithVolunteers = await Promise.all(sortedIncidents.map(async (incident) => {
          if (incident.volunteerActivity?.assignedVolunteer) {
            try {
              const volunteerResponse = await axios.get(
                `https://hopesalive-zh55.onrender.com/api/volunteer/${incident.volunteerActivity.assignedVolunteer}`,
                {
                  headers: { Authorization: `Bearer ${token}` }
                }
              );
              return {
                ...incident,
                volunteerActivity: {
                  ...incident.volunteerActivity,
                  volunteerDetails: volunteerResponse.data
                }
              };
            } catch (err) {
              console.error('Error fetching volunteer details:', err);
              return incident;
            }
          }
          return incident;
        }));

        setIncidents(incidentsWithVolunteers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to load incidents');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleStatusUpdate = async (incidentId, newStatus) => {
    try {
      setUpdatingStatus(incidentId);
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `https://hopesalive-zh55.onrender.com/api/ngo/incidents/${incidentId}/update`,
        {
          status: newStatus,
          status_update: `Status updated to ${newStatus} by NGO`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setIncidents(prevIncidents =>
          prevIncidents.map(incident =>
            incident._id === incidentId
              ? { ...incident, status: newStatus }
              : incident
          )
        );
        toast.success('Status updated successfully');
        if (typeof onStatusUpdate === 'function') {
          onStatusUpdate();
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleViewDetails = (incidentId) => {
    navigate(`/dashboard/incidents/${incidentId}`);
  };

  const handleViewAll = () => {
    navigate('/dashboard/incidents');
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Recent Incidents</h2>
          <p className="text-gray-600 text-sm mt-1">Showing the 6 most recent cases that need attention</p>
        </div>
        <button
          onClick={handleViewAll}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-sm"
        >
          View All Incidents
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incidents.map((incident) => (
          <motion.div
            key={incident._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-48">
              {/* Priority Banner */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                incident.animalInfo?.aiSeverityAssessment?.score >= 7 ? 'bg-red-500' :
                incident.animalInfo?.aiSeverityAssessment?.score >= 4 ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {incident.animalInfo?.photo ? (
                <img
                  src={`https://hopesalive-zh55.onrender.com/api/uploads/${incident.animalInfo.photo}`}
                  alt={incident.animalInfo?.type || 'Animal'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/not_found.png'; // Fallback image
                    e.target.classList.add('object-contain', 'p-2');
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <img src="/not_found.png" alt="Default" className="w-24 h-24 opacity-50" />
                </div>
              )}

              {/* Overlayed Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">
                    {incident.animalInfo?.type || 'Unknown Animal'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    incident.status === 'resolved' ? 'bg-green-500' :
                    incident.status === 'in progress' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {incident.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {new Date(incident.createdAt).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* Severity Score */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Severity Score:</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.round((incident.animalInfo?.aiSeverityAssessment?.score || 0) / 2)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-semibold ${
                  incident.animalInfo?.aiSeverityAssessment?.score >= 7 ? 'text-red-700 bg-red-50' :
                  incident.animalInfo?.aiSeverityAssessment?.score >= 4 ? 'text-yellow-700 bg-yellow-50' :
                  'text-green-700 bg-green-50'
                }`}>
                  {incident.animalInfo?.aiSeverityAssessment?.score || 0}/10
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {incident.animalInfo?.description || 'No description provided'}
              </p>

              {/* Location */}
              <div className="flex items-start gap-2 mb-4">
                <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span className="text-sm text-gray-600 line-clamp-2">{incident.location?.address}</span>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 -mx-4 px-4 py-3 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Reporter</p>
                    <p className="text-sm font-medium text-gray-900">{incident.reporterInfo?.name}</p>
                    <p className="text-xs text-gray-600">{incident.reporterInfo?.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Assigned To</p>
                    <p className="text-sm font-medium text-gray-900">
                      {incident.volunteerActivity?.volunteerDetails?.name || 'Not Assigned'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {incident.volunteerActivity?.status || 'Pending Assignment'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button 
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  onClick={() => handleViewDetails(incident._id)}
                >
                  View Details
                </button>
                <select
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors duration-200
                    ${incident.status === 'resolved' ? 'border-green-500 text-green-700 bg-green-50' : 
                      incident.status === 'in progress' ? 'border-yellow-500 text-yellow-700 bg-yellow-50' : 
                      'border-red-500 text-red-700 bg-red-50'}`}
                  value={incident.status}
                  onChange={(e) => handleStatusUpdate(incident._id, e.target.value)}
                  disabled={updatingStatus === incident._id}
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

RecentIncidents.propTypes = {
  onStatusUpdate: PropTypes.func
};

RecentIncidents.defaultProps = {
  onStatusUpdate: () => {}
};

export default RecentIncidents;