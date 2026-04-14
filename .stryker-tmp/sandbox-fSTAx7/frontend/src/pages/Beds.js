// @ts-nocheck
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  BedDouble,
  Plus,
  User,
  X
} from "lucide-react";
import "../bedsPage.css";

function BedsPage() {
  const [beds, setBeds] = useState([]);
  const [wards, setWards] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newBed, setNewBed] = useState({
    number: "",
    ward: ""
  });

  // FETCH DATA
  useEffect(() => {
    fetchBeds();
    fetchWards();
  }, []);

  const fetchBeds = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/beds");
      const data = await res.json();
      if (res.ok) setBeds(data);
    } catch (err) {
      console.error("Error fetching beds:", err);
    }
  };

  const fetchWards = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/wards");
      const data = await res.json();
      if (res.ok) setWards(data);
    } catch (err) {
      console.error("Error fetching wards:", err);
    }
  };

  // ADD BED
  const handleAddBed = async (e) => {
    e.preventDefault();

    if (!newBed.number || !newBed.ward) {
      return alert("Fill all fields");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/beds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bedNumber: newBed.number,
          ward: newBed.ward
        })
      });

      if (res.ok) {
        setShowAddForm(false);
        setNewBed({ number: "", ward: "" });
        fetchBeds();
      } else {
        alert("Failed to add bed");
      }
    } catch (err) {
      console.error("Error adding bed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page-wrapper animate-fade-in">
        
        {/* HEADER */}
        <header className="page-header">
          <div className="title-area">
            <h1>
              <div className="title-icon-box">
                <BedDouble size={24} />
              </div>
              Bed Management
            </h1>
            <p className="subtitle">Monitor and allocate hospital beds</p>
          </div>

          <button
            className={`primary-action-btn ${showAddForm ? "btn-danger" : ""}`}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? (
              <><X size={18} /> Cancel</>
            ) : (
              <><Plus size={18} /> Add New Bed</>
            )}
          </button>
        </header>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="icon-box blue"><BedDouble size={24} /></div>
            <div className="stat-info">
              <p>Total Beds</p>
              <h3>{beds.length}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-box green"><BedDouble size={24} /></div>
            <div className="stat-info">
              <p>Available</p>
              <h3>{beds.filter(b => !b.isOccupied).length}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-box red"><BedDouble size={24} /></div>
            <div className="stat-info">
              <p>Occupied</p>
              <h3>{beds.filter(b => b.isOccupied).length}</h3>
            </div>
          </div>
        </div>

        <div className="content-container">
          
          {/* ADD FORM */}
          {showAddForm && (
            <div className="add-bed-panel">
              <div className="panel-header">
                <h3>Add New Bed</h3>
                <p>Register a new bed to a specific ward.</p>
              </div>

              <form onSubmit={handleAddBed} className="form-row">
                <div className="form-group">
                  <label>Bed Number</label>
                  <input
                    type="text"
                    placeholder="e.g. ICU-01"
                    value={newBed.number}
                    onChange={e => setNewBed({ ...newBed, number: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Assign Ward</label>
                  <select
                    value={newBed.ward}
                    onChange={e => setNewBed({ ...newBed, ward: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select a Ward</option>
                    {wards.map(w => (
                      <option key={w._id} value={w._id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? "Saving..." : "Save Bed"}
                </button>
              </form>
            </div>
          )}

          {/* GRID */}
          <div className="beds-grid">
            {beds.length > 0 ? (
              beds.map(bed => (
                <div
                  key={bed._id}
                  className={`bed-card status-${bed.isOccupied ? "occupied" : "available"}`}
                >
                  <div className="bed-header">
                    <span className="bed-number">{bed.bedNumber}</span>
                    <span className={`status-badge badge-${bed.isOccupied ? "occupied" : "available"}`}>
                      {bed.isOccupied ? "Occupied" : "Available"}
                    </span>
                  </div>

                  <div className="bed-body">
                    <div className="bed-icon-large">
                      <BedDouble size={36} />
                    </div>
                    <div className="bed-details">
                      <p className="bed-ward-label">Ward</p>
                      <p className="bed-ward-name">{bed.ward?.name || "Unassigned"}</p>
                    </div>
                  </div>

                  {bed.assignedPatient ? (
                    <div className="patient-info occupied">
                      <User size={16} />
                      <div className="patient-text">
                        <span className="label">Patient</span>
                        <span className="name">{bed.assignedPatient.name}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="patient-info available">
                      <span>No patient assigned</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <BedDouble size={48} className="empty-icon" />
                <h3>No beds found</h3>
                <p>Add a new bed to get started.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default BedsPage;