// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  Clock,
  UserPlus,
  ArrowRightLeft,
  CheckCircle,
  Stethoscope,
  FileText,
  User,
  ArrowLeft
} from "lucide-react";
import "../timeline.css";

function PatientJourney() {
  const { id } = useParams(); // Extracts the dynamic ID from the URL
  const navigate = useNavigate();
  
  const [patient, setPatient] = useState(null);
  const [auditEvents, setAuditEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPatient();
      fetchTimeline();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/patients", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      const found = data.find(p => p._id === id);
      setPatient(found);
    } catch (err) {
      console.error("Patient fetch error:", err);
    }
  };

  const fetchTimeline = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/audit/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAuditEvents(data);
    } catch (err) {
      console.error("Timeline fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getEventConfig = (type) => {
    switch (type) {
      case "ADMISSION":
        return { icon: <UserPlus size={18} />, color: "bg-blue" };
      case "BED_ASSIGNED":
        return { icon: <CheckCircle size={18} />, color: "bg-slate" };
      case "TRANSFER":
        return { icon: <ArrowRightLeft size={18} />, color: "bg-orange" };
      case "STATUS_UPDATE":
        return { icon: <Stethoscope size={18} />, color: "bg-purple" };
      case "DISCHARGE":
        return { icon: <CheckCircle size={18} />, color: "bg-green" };
      default:
        return { icon: <FileText size={18} />, color: "bg-slate" };
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-state">Loading patient journey...</div>
      </Layout>
    );
  }

  if (!patient) {
    return (
      <Layout>
        <div className="empty-state">Patient not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-wrapper animate-fade-in">
        
        {/* HEADER */}
        <header className="page-header">
          <div className="title-area">
            <button className="back-btn" onClick={() => navigate('/patients')}>
              <ArrowLeft size={20} />
            </button>
            <h1>
              <div className="title-icon-box">
                <Clock size={24} />
              </div>
              Patient Journey
            </h1>
          </div>
        </header>

        {/* PATIENT SUMMARY CARD */}
        <div className="patient-summary-card">
          <div className="summary-left">
            <div className="avatar-circle-large">
              <User size={32} />
            </div>
            <div className="patient-details">
              <h2>{patient.name} <span className="patient-id">ID: {patient._id.slice(-6).toUpperCase()}</span></h2>
              <div className="patient-meta">
                <span><strong>Age:</strong> {patient.age} yrs</span>
                <span className="meta-divider">•</span>
                <span><strong>Ward:</strong> {patient.assignedBed?.ward?.name || "Unassigned"}</span>
                <span className="meta-divider">•</span>
                <span><strong>Bed:</strong> {patient.assignedBed?.bedNumber || "Unassigned"}</span>
              </div>
            </div>
          </div>
          
          <div className="summary-right">
            <div className="status-label">Current Status</div>
            <span className={`status-badge ${patient.status === "Admitted" ? "badge-active" : "badge-discharge"}`}>
              {patient.status}
            </span>
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <div className="timeline-container">
          <h3 className="timeline-title">Audit Trail</h3>

          {auditEvents.length === 0 ? (
            <div className="empty-state">No events recorded yet.</div>
          ) : (
            <div className="timeline-wrapper">
              {auditEvents.map((evt, index) => {
                const config = getEventConfig(evt.type);
                const isLast = index === auditEvents.length - 1;

                return (
                  <div key={evt._id} className="timeline-item">
                    
                    {/* MARKER (Dot & Line) */}
                    <div className="timeline-marker">
                      <div className={`timeline-dot ${config.color}`}>
                        {config.icon}
                      </div>
                      {!isLast && <div className="timeline-line"></div>}
                    </div>

                    {/* EVENT CONTENT */}
                    <div className="timeline-content">
                      <div className="event-card">
                        <div className="event-header">
                          <span className={`event-type text-${config.color.replace('bg-', '')}`}>
                            {evt.type.replace("_", " ")}
                          </span>
                          <span className="event-time">
                            <Clock size={14} /> 
                            {new Date(evt.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <p className="event-desc">{evt.description}</p>

                        <div className="event-footer">
                          <div className="event-meta-item">
                            <span className="meta-label">Location:</span> {evt.location || "System"}
                          </div>
                          <div className="event-meta-item">
                            <span className="meta-label">Auth By:</span> {evt.staff || "System Admin"}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PatientJourney;