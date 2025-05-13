import axios from "axios";

const api = axios.create({
  baseURL: "https://hopesalive-zh55.onrender.com",
  // your backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//    console.log('Token:', localStorage.getItem('token'));
export default api;
