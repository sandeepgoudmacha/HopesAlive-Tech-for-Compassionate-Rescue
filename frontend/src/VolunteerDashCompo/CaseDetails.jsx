import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaExclamationCircle,
  FaArrowLeft 
} from 'react-icons/fa';

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      if (!id || id === 'undefined') {
        setError('Invalid case ID');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          navigate('/login');
          return;
        }

        const response = await axios.get(`https://hopesalive-zh55.onrender.com/api/volunteer/incidents/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          console.log('Case details received:', response.data);
          setCaseDetails(response.data);
        }
      } catch (err) {
        console.error('Error fetching case details:', err);
        const errorMessage = err.response?.data?.message || 'Failed to load case details';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id, navigate]);

  const handleAssignCase = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://hopesalive-zh55.onrender.com/api/volunteer/incidents/${id}/volunteer/update`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message === "Status updated successfully") {
        toast.success('Successfully assigned to case!');
        navigate('/voldash');
      }
    } catch (err) {
      console.error('Error assigning case:', err);
      toast.error(err.response?.data?.message || 'Failed to assign case');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !caseDetails) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-3xl mx-auto text-center">
          <FaExclamationCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Case</h3>
          <p className="mt-1 text-gray-500">{error || 'Case not found'}</p>
          <button
            onClick={() => navigate('/voldash')}
            className="mt-4 inline-flex items-center text-orange-500 hover:text-orange-600"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-20">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/voldash')}
          className="mb-6 inline-flex items-center text-orange-500 hover:text-orange-600"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {caseDetails.animal_info?.description || 'Unknown Animal'}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                caseDetails.animal_info?.severity?.score >= 7 
                  ? 'bg-red-100 text-red-800'
                  : caseDetails.animal_info?.severity?.score >= 4
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                Severity: {caseDetails.animal_info?.severity?.score || 0}/10
              </span>
            </div>

            <div className="space-y-6">
              {caseDetails.animal_info?.photo && (
                <img
                  src={`https://hopesalive-zh55.onrender.com/api/uploads/${caseDetails.animal_info.photo}`}
                  alt="Case"
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}

              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" />
                <span>{caseDetails.incident_location?.address || 'Location unavailable'}</span>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">
                  {caseDetails.description || 'No description available'}
                </p>
              </div>

              <button
                onClick={handleAssignCase}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Assign Case to Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails; 