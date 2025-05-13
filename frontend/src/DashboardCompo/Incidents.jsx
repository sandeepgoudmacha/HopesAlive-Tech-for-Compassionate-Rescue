import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Incidents = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.get('https://hopesalive-zh55.onrender.com/api/incidents', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);

      if (response.data) {
        setIncidents(response.data);
      } else {
        throw new Error('No data received from server');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error('Failed to load incidents');
    } finally {
      setLoading(false);
    }
  };

  

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/dashboard/incidents/${id}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">All Incidents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(8)].map((_, index) => (
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
  const filteredIncidents = incidents.filter(incident => 
    filter === 'all' ? true : incident.status === filter
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">All Incidents</h2>
          <p className="text-gray-600 text-sm mt-1">Manage and track all reported cases</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Incidents</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIncidents.map((incident) => (
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
                    e.target.src = '/not_found.png';
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

              {/* View Details Button */}
              <div className="mt-4">
                <button 
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  onClick={() => handleViewDetails(incident._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Incidents;