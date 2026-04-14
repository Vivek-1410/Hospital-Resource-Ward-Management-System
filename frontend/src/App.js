import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Wards from "./pages/Wards";
import Beds from "./pages/Beds";
import Admission from "./pages/Admission";
import Reports from "./pages/Reports";
import Equipment from "./pages/EquipmentPage";
import Patient from "./pages/Patient";
import Journey from "./pages/PatientJourney";
import Home from "./pages/Home";
import PatientJourney from "./pages/PatientJourney"; // Adjust path as needed
import EquipmentPage from "./pages/EquipmentPage"; // Adjust the path if needed
import ReportsPage from "./pages/Reports";

// Inside your <Routes> block:
<Route path="/journey/:id" element={<PatientJourney />} />

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wards" element={<Wards />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/patients" element={<Patient />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/journey/:id" element={<PatientJourney />} />
      </Routes>
    </Router>
  );
}

export default App;