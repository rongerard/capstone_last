import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage'; // Adjust path if needed
import ResetPasswordPage from './LoginPage/ResetPassword';
import ResetSuccessPage from './LoginPage/ResetSuccess';
import SignupPage from './SignupPage/SignupPage'; // Adjust path if needed
import VerificationPage from './SignupPage/VerificationPage';
import AccountSuccessPage from './SignupPage/AccountSuccessPage';

// Patient components
import SidebarPatient from './PatientPage/components/Sidebar';
import HomePatient from './PatientPage/components/Home';
import DoctorsPatient from './PatientPage/components/Doctors';
import AppointmentPatient from './PatientPage/components/Appointment';
import MessagePatient from './PatientPage/components/Message';

// Secretary components
import SidebarSecre from './SecretaryPage/components/sidebarSecre';
import DashboardSecre from './SecretaryPage/components/dashboard';
import DoctorSecre from './SecretaryPage/components/doctors';
import PatientSecre from './SecretaryPage/components/patient';
import AppointmentSecre from './SecretaryPage/components/appointments';
import QueueSecre from './SecretaryPage/components/queue';
import MessageSecre from './SecretaryPage/components/messages';
import ReportSecre from './SecretaryPage/components/report';

import ProfileSecre from './SecretaryPage/components/profile';

// Layout components for Patient and Secretary
function PatientLayout({ children }) {
  return (
    <div>
      <SidebarPatient />
      <div className="patient-content">
        {children}
      </div>
    </div>
  );
}

function SecretaryLayout({ children }) {
  return (
    <div>
      <SidebarSecre />
      <div className="secre-content">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route index element={<LoginPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/resetSuccess" element={<ResetSuccessPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/accountSuccess" element={<AccountSuccessPage />} />

        {/* Patient routes with SidebarPatient layout */}
        <Route
          path="/patient/*"
          element={
            <PatientLayout>
              <Routes>
                <Route path="home" element={<HomePatient />} />
                <Route path="doctors" element={<DoctorsPatient />} />
                <Route path="appointment" element={<AppointmentPatient />} />
                <Route path="message" element={<MessagePatient />} />
              </Routes>
            </PatientLayout>
          }
        />

        {/* Secretary routes with SidebarSecre layout */}
        <Route
          path="/secretary/*"
          element={
            <SecretaryLayout>
              <Routes>
                <Route path="dashboard" element={<DashboardSecre />} />
                <Route path="doctors" element={<DoctorSecre />} />
                <Route path="patients" element={<PatientSecre />} />
                <Route path="appointments" element={<AppointmentSecre />} />
                <Route path="queue" element={<QueueSecre />} />
                <Route path="messages" element={<MessageSecre />} />
                <Route path="report" element={<ReportSecre />} />
                <Route path="profile" element={<ProfileSecre />} />
              </Routes>
            </SecretaryLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
