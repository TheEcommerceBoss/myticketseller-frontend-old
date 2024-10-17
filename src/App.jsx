import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/(landing)/Landing';  
import FindEvent from './pages/(events)/FindEvent';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/event/find" element={<FindEvent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
