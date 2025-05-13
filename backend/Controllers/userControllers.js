import User from "../Models/userModel.js";
import Incident from "../Models/incidentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from '../utils/generateToken.js';

// Register Controller
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      city,
      phoneNumber,
      address,
      volunteerDetails,
      ngoDetails,
    } = req.body;

    // Validate all required fields
    if (!name || !email || !password || !city || !phoneNumber || !address) {
      return res.status(400).json({
        message: "Missing required fields",
        received: {
          name: name ? "exists" : "missing",
          email: email ? "exists" : "missing",
          password: password ? "exists" : "missing",
          city: city ? "exists" : "missing",
          phoneNumber: phoneNumber ? "exists" : "missing",
          address: address ? "exists" : "missing",
        },
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create base user data
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      city,
      phoneNumber,
      address,
    };

    // Add role-specific details if they exist
    if (role === "volunteer") {
      userData.status = "pending_documents";
      userData.volunteerDetails = volunteerDetails;
      
      const newUser = await User.create(userData);
      const token = generateToken(newUser._id);
      
      return res.status(201).json({
        _id: newUser._id,
        token,
        requiresDocuments: true,
        message: "Please complete document signing",
      });
    } else if (role === "ngo") {
      userData.status = "pending_documents";
      userData.ngoDetails = ngoDetails;
      
      const newUser = await User.create(userData);
      const token = generateToken(newUser._id);
      
      return res.status(201).json({
        _id: newUser._id,
        token,
        requiresDocuments: true,
        message: "Please complete NGO document signing"
      });
    }

    const user = await User.create(userData);

    // Generate JWT token
    const token = generateToken(user._id);
    console.log("Token:", token); // Debug log
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      requiresDocuments: role === "volunteer",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "15d",
    });

    // Return user data and token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout Controller
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile Controller
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare response based on user role
    const userResponse = {
      name: user.name,
      contact_info: {
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
      role: user.role,
    };

    // Add role-specific details if they exist
    if (user.role === "volunteer" && user.volunteerDetails) {
      userResponse.volunteerDetails = user.volunteerDetails;
    } else if (user.role === "NGO" && user.ngoDetails) {
      userResponse.ngoDetails = user.ngoDetails;
    }

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserIncidents = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const incidents = await Incident.find({ user: userId });
    
    // Return empty array instead of 404 when no incidents found
    return res.status(200).json({ 
      data: incidents,
      message: incidents.length === 0 ? "No incidents found for this user" : "Incidents retrieved successfully"
    });
    
  } catch (error) {
    console.error("Error fetching incidents:", error);
    res.status(500).json({ message: "Error fetching incidents" });
  }
};
