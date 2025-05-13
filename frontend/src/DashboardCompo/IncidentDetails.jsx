import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const IncidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchIncidentDetails();
  }, [id]);

  const fetchIncidentDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://hopesalive-zh55.onrender.com/api/incidents/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // If there's an assigned volunteer, fetch their details
      if (response.data.volunteerActivity?.assignedVolunteer) {
        const volunteerResponse = await axios.get(
          `https://hopesalive-zh55.onrender.com/api/volunteer/${response.data.volunteerActivity.assignedVolunteer}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        response.data.volunteerActivity.volunteerDetails =
          volunteerResponse.data;
      }

      setIncident(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to fetch incident details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `https://hopesalive-zh55.onrender.com/api/ngo/incidents/${id}/update`,
        {
          status: newStatus,
          status_update: `Status updated to ${newStatus} by NGO`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setIncident((prev) => ({
          ...prev,
          status: newStatus,
        }));
        toast.success("Status updated successfully");
        fetchIncidentDetails(); // Refresh to get latest case updates
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!incident) {
    return <div className="text-center">Incident not found</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <span>← Back to Incidents</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
        {/* Left Column - Image and Map */}
        <div className="space-y-6">
          {/* Image Section with Improved Visibility */}
          <div className="bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-w-16 aspect-h-12 ">
              <img
                src={`https://hopesalive-zh55.onrender.com/api/uploads/${incident.animalInfo?.photo}`}
                alt="Animal"
                className="object-contain w-full h-full"
                onError={(e) => {
                  e.target.src = "/placeholder-animal.png";
                }}
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    incident.animalInfo?.aiSeverityAssessment?.category === 'HIGH' 
                      ? 'bg-red-100 text-red-800' 
                      : incident.animalInfo?.aiSeverityAssessment?.category === 'MODERATE'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  Severity: {incident.animalInfo?.aiSeverityAssessment?.score}/10
                </span>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Location Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{incident.location?.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Coordinates</p>
                <p className="font-medium">
                  {incident.location?.coordinates ? (
                    <>
                      Lat: {incident.location.coordinates[1].toFixed(4)}, 
                      Long: {incident.location.coordinates[0].toFixed(4)}
                    </>
                  ) : 'No coordinates available'}
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          {incident?.location?.coordinates && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Location Map</h2>
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                <MapContainer
                  center={[incident.location.coordinates[1], incident.location.coordinates[0]]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker 
                    position={[incident.location.coordinates[1], incident.location.coordinates[0]]}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{incident.description}</h3>
                        <p className="text-sm mt-1">{incident.location.address}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {incident.location.coordinates[1].toFixed(4)}, {incident.location.coordinates[0].toFixed(4)}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}

          {/* Assessment Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">AI Assessment Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium">{incident.animalInfo?.aiSeverityAssessment?.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assessment Details</p>
                <p className="font-medium">{incident.animalInfo?.aiSeverityAssessment?.assessmentDetails}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Status and Actions */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {incident.description}
              </h1>
              <p className="text-gray-600 mt-2">
                {incident.animalInfo?.description}
              </p>
            </div>
            <select
              value={incident?.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updatingStatus}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                incident?.status === "resolved"
                  ? "bg-green-500"
                  : incident?.status === "in progress"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              } text-white`}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700">Created</h3>
              <p>{new Date(incident.createdAt).toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700">Last Updated</h3>
              <p>{new Date(incident.updatedAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Reporter Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Reporter Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{incident.reporterInfo?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">
                  {incident.reporterInfo?.contactNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{incident.reporterInfo?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Preferred Contact</p>
                <p className="font-medium">
                  {incident.reporterInfo?.preferredContactMethod}
                </p>
              </div>
            </div>
          </div>

          {/* Volunteer Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Volunteer Assignment</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium">{incident.volunteerActivity?.status || 'Not Assigned'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assigned At</p>
                  <p className="font-medium">
                    {incident.volunteerActivity?.assignedAt 
                      ? formatDate(incident.volunteerActivity.assignedAt)
                      : 'N/A'}
                  </p>
                </div>
              </div>
              {incident.volunteerActivity?.volunteerDetails && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Volunteer Name</p>
                    <p className="font-medium">{incident.volunteerActivity.volunteerDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium">{incident.volunteerActivity.volunteerDetails.phoneNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Case Updates Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Case Updates</h2>
            <div className="space-y-4">
              {incident.caseUpdates?.map((update, index) => (
                <div
                  key={index}
                  className="relative pl-4 border-l-2 border-blue-200"
                >
                  <div className="absolute -left-1.5 top-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm text-gray-500">{formatDate(update.timestamp)}</p>
                  <p className="font-medium">{update.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
