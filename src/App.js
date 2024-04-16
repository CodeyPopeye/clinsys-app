import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PatientRegistrationPage from './pages/PatientRegistrationPage';
import PatientListPage from './pages/PatientSearchPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<PatientRegistrationPage />} />
        <Route path="/patients" element={<PatientListPage />} />
      </Routes>
    </Router>
  );
}


export default App;
