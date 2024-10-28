import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/(landing)/Landing';  
import FindEvent from './pages/(events)/FindEvent';
import { ThemeProvider } from './context/ThemeContext';
import ViewEvent from './pages/(events)/ViewEvent';
import NotFound from './pages/others/NotFound';
import Dashboard from './pages/(dashboard)/dashboard';
import LoginPage from './pages/(login)/login';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/event/find" element={<FindEvent />} />
          <Route path="/event/view/:id" element={<ViewEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
