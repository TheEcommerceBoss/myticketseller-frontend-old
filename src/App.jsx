import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/(landing)/Landing';
import FindEvent from './pages/(events)/FindEvent';
import { ThemeProvider } from './context/ThemeContext';
import ViewEvent from './pages/(events)/ViewEvent';
import NotFound from './pages/others/NotFound';
import Dashboard from './pages/(dashboard)/dashboard';
import LoginPage from './pages/(auth)/Login';
import SignupPage from './pages/(auth)/register';
import CreateEvent from './pages/(dashboard)/createEvent';
import PaymentSettings from './pages/(dashboard)/paymentSettings';
import EventsInfo from './pages/(dashboard)/Info';
import ManageEvent from './pages/(dashboard)/manageEvent';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutPage from './pages/(auth)/logout';
import CompletedCreation from './pages/(dashboard)/CompletedCreation';
import EditEvent from './pages/(dashboard)/editEvent';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event/find" element={<FindEvent />} />
            <Route path="/event/view/:id" element={<ViewEvent />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/event/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/dashboard/event/manage" element={<ProtectedRoute><ManageEvent /></ProtectedRoute>} />
            <Route path="/dashboard/event/create/:id" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/dashboard/event/manage/:id" element={<ProtectedRoute><EditEvent manage={true} /></ProtectedRoute>} />
            <Route path="/dashboard/event/create/:id/payments" element={<ProtectedRoute><PaymentSettings /></ProtectedRoute>} />
            <Route path="/dashboard/event/create/:id/info" element={<ProtectedRoute><EventsInfo /></ProtectedRoute>} />
            <Route path="/dashboard/event/create/:id/completed" element={<ProtectedRoute><CompletedCreation /></ProtectedRoute>} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
