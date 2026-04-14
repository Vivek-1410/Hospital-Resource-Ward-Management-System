// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  Users,
  User,
  BedDouble,
  Building2,
  Activity,
  History,
  CheckCircle2
} from "lucide-react";
import "../patients.css";

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/patients", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) setPatients(data);

    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const dischargePatient = async (id) => {
    if (!window.confirm("Discharge this patient?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/patients/discharge/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.ok) {
        fetchPatients();
      } else {
        alert("Failed to discharge");
      }

    } catch (err) {
      console.error(err);
    }
  };

  // NEW: Navigate to patient journey page
  const handleViewJourney = (id) => {
    navigate(`/journey/${id}`); 
  };

  return (
    <Layout>
      <div className="page-wrapper animate-fade-in">
        
        {/* HEADER */}
        <header className="page-header">
          <div className="title-area">
            <h1>
              <div className="title-icon-box">
                <Users size={24} />
              </div>
              Patients Directory
            </h1>
            <p className="subtitle">Manage admitted patients and track their journey</p>
          </div>
        </header>

        {/* TABLE CONTAINER */}
        <div className="table-card">
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Ward</th>
                  <th>Bed</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {patients.length > 0 ? (
                  patients.map(p => (
                    <tr key={p._id} className="table-row">
                      
                      {/* NAME */}
                      <td>
                        <div className="patient-name-cell">
                          <div className="avatar-circle">
                            <User size={16} />
                          </div>
                          <span className="patient-name-text">{p.name}</span>
                        </div>
                      </td>

                      {/* AGE */}
                      <td>
                        <span className="text-muted">{p.age} yrs</span>
                      </td>

                      {/* WARD */}
                      <td>
                        <div className="icon-text-cell">
                          <Building2 size={16} className="text-muted" />
                          <span className="font-medium">{p.assignedBed?.ward?.name || "Unassigned"}</span>
                        </div>
                      </td>

                      {/* BED */}
                      <td>
                        <div className="icon-text-cell">
                          <BedDouble size={16} className="text-muted" />
                          <span className="font-medium">{p.assignedBed?.bedNumber || "Unassigned"}</span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td>
                        <span className={`status-badge ${p.status === "Admitted" ? "badge-active" : "badge-discharge"}`}>
                          {p.status === "Admitted" ? <Activity size={14} /> : <CheckCircle2 size={14} />}
                          {p.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="action-buttons text-right">
                          <button
                            className="btn-action btn-journey"
                            onClick={() => handleViewJourney(p._id)}
                            title="View Patient Journey"
                          >
                            <History size={16} />
                            <span>Journey</span>
                          </button>

                          {p.status === "Admitted" && (
                            <button
                              className="btn-action btn-discharge"
                              onClick={() => dischargePatient(p._id)}
                              title="Discharge Patient"
                            >
                              Discharge
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        <Users size={48} className="empty-icon" />
                        <h3>No patients found</h3>
                        <p>There are currently no patients in the registry.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default PatientsPage;