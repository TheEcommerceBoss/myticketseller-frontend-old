import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/(landing)/Landing';  
import FindEvent from './pages/(events)/FindEvent'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/event/find" element={<FindEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
