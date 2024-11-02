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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/event/find" element={<FindEvent />} />
          <Route path="/event/view/:id" element={<ViewEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/event/create" element={<CreateEvent />} />
          <Route path="/dashboard/event/create/:id/payments" element={<PaymentSettings />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
