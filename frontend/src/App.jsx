import HomePage from "./pages/HomePage";
import RegisterForm from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/Login";
import ReportIncident from "./pages/ReportIncident";
import Dashboard from "./pages/Dashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaintenancePage from "./DashboardCompo/MaintenancePage";
import UserDashboard from "./UserDashBoard/UserDashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import VolunteerPage from "./pages/VolunteerPage";
import DashboardOverview from "./DashboardCompo/DashboardOverview";
import Incidents from "./DashboardCompo/Incidents";
import Notifications from "./DashboardCompo/Notifications";
import IncidentDetails from "./DashboardCompo/IncidentDetails";
import NotFound from "./components/NotFound";
import CaseDetails from './VolunteerDashCompo/CaseDetails';
import VolunteerAssignedCases from "./pages/VolunteerAssignedCases";
import AvailableCases from "./pages/AvailableCases";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/report-incident" element={<ReportIncident />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardOverview />} />
            <Route path="incidents" element={<Incidents />} />
            <Route path="notifications" element={<Notifications />} />
            <Route
              path="analytics"
              element={<MaintenancePage title="Analytics" />}
            />
            <Route
              path="settings"
              element={<MaintenancePage title="Settings" />}
            />
          </Route>
          <Route path="/Voldash" element={<VolunteerDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route
            path="/dashboard/incidents/:id"
            element={<IncidentDetails />}
          />
          <Route path="/voldash/case/:id" element={<CaseDetails />} />
          <Route path="/voldash/my-cases" element={<VolunteerAssignedCases />} />
          <Route path="/voldash/available" element={<AvailableCases />} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
