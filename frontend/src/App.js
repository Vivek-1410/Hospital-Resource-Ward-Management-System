import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Wards from "./pages/Wards";
import Beds from "./pages/Beds";
import Admission from "./pages/Admission";
import Reports from "./pages/Reports";
import Home from "./pages/Home";

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
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;