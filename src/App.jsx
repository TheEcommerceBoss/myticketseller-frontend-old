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
import Settings from './pages/(dashboard)/Settings';
import SupportPage from './pages/(dashboard)/Support';
import ScannerPage from './pages/(dashboard)/Scanner';
import MyTicketsPage from './pages/(dashboard)/MyTickets';
import { GoogleMapsProvider } from './components/GoogleMapsContext';
import ValidatePayment from './pages/(payments)/validatePayment';
import ScanManager from './pages/(dashboard)/ScanManager';
import ModifyScanner from './pages/(dashboard)/ModifyScanner';
import UnProtectedRoute from './components/UnProtectedRoute';
import AboutUs from './pages/(landing)/About';
import ContactPage from './pages/(landing)/Contact';
import PricingPage from './pages/(landing)/Pricing';
import SearchEvent from './pages/(events)/SearchEvent';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event/find" element={<FindEvent />} />
            <Route path="/event/search/:search" element={<SearchEvent />} />
            <Route path="/event/view/:id" element={<GoogleMapsProvider><ViewEvent /></GoogleMapsProvider>} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/event/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/dashboard/event/manage" element={<ProtectedRoute><ManageEvent /></ProtectedRoute>} />
            <Route path="/dashboard/event/create/:id" element={<ProtectedRoute><CreateEvent manage={true} /></ProtectedRoute>} />
            <Route path="/dashboard/event/manage/:id" element={<ProtectedRoute><CreateEvent manage={true} /></ProtectedRoute>} />
            <Route path="/dashboard/event/create/:id/payments" element={<ProtectedRoute><PaymentSettings /></ProtectedRoute>} />
            <Route path="/dashboard/event/create/:id/info" element={<ProtectedRoute><EventsInfo /></ProtectedRoute>} />
            <Route path="/dashboard/event/create/:id/completed" element={<ProtectedRoute><CompletedCreation /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
            <Route path="/dashboard/ticket/scanner" element={<ProtectedRoute><ScannerPage /></ProtectedRoute>} />
            <Route path="/dashboard/ticket/all" element={<ProtectedRoute><MyTicketsPage /></ProtectedRoute>} />
            <Route path="/dashboard/event/scan" element={<ProtectedRoute><ScanManager /></ProtectedRoute>} />
            <Route path="/dashboard/event/scan/:id" element={<ProtectedRoute><ModifyScanner /></ProtectedRoute>} />
            {/* <Route path="/dashboard/event/poster" element={<ProtectedRoute><BannerPage /></ProtectedRoute>} /> */}
            {/* <Route path="/dashboard/event/poster/:id" element={<ProtectedRoute><CreateBannerPage /></ProtectedRoute>} /> */}
            <Route path="/validatePayment/" element={<ValidatePayment />} />


            <Route path="/login" element={<UnProtectedRoute><LoginPage /></UnProtectedRoute>} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path='/terms' element={<AboutUs />} />
            <Route path="/register" element={<UnProtectedRoute><SignupPage /></UnProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
