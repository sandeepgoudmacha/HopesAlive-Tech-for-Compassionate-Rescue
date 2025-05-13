import express from 'express';
import protectedRoute from '../Middleware/protected.js';
import { requireVolunteerRole } from '../Middleware/roleMiddleware.js';
import {
    getIncidentDetails,
    updateVolunteerStatus,
    getVolunteerNotifications,
    getVolunteerIncidents,
    getVolunteerAssignedCases,
} from '../Controllers/volunteerController.js';
// import Incident from '../models/Incident.js';
import IncidentVolunteer from '../Models/IncidentVolunteer.js';
import User from '../Models/userModel.js';

const router = express.Router();

router.get('/incidents/:incident_id', protectedRoute, getIncidentDetails);
router.put('/incidents/:incident_id/volunteer/update',protectedRoute, updateVolunteerStatus);
router.get('/notifications', protectedRoute, getVolunteerNotifications);
router.get('/incidents', protectedRoute, requireVolunteerRole, getVolunteerIncidents);
router.get('/my-assignments', protectedRoute, async (req, res) => {
  try {
    const volunteerId = req.user._id;
    const assignedIncidents = await IncidentVolunteer.find({
      'volunteerActivity.assignedVolunteer': volunteerId
    });
    
    res.json({
      success: true,
      data: assignedIncidents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-cases', protectedRoute, getVolunteerAssignedCases);

router.get('/:id', protectedRoute, async (req, res) => {
  try {
    const volunteer = await User.findOne({ 
      _id: req.params.id,
      role: 'volunteer'
    }).select('name email phoneNumber');

    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;