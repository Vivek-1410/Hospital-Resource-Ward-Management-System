import React, { useState } from "react";
import Layout from "../components/Layout";
import { 
  BedDouble, 
  Plus, 
  Filter, 
  Trash2, 
  User, 
  CheckCircle, 
  AlertCircle,
  Activity,
  X
} from "lucide-react";
import "../bedsPage.css";

function BedsPage() {
  const initialBeds = [
    { id: 1, number: "ICU-01", ward: "ICU", status: "Occupied", patient: "John Doe", type: "Electric" },
    { id: 2, number: "ICU-02", ward: "ICU", status: "Available", patient: null, type: "Electric" },
    { id: 3, number: "GEN-101", ward: "General Ward", status: "Occupied", patient: "Sarah Smith", type: "Manual" },
    { id: 4, number: "GEN-102", ward: "General Ward", status: "Maintenance", patient: null, type: "Manual" },
    { id: 5, number: "PED-05", ward: "Pediatrics", status: "Available", patient: null, type: "Child Bed" },
  ];

  const [beds, setBeds] = useState(initialBeds);
  const [filterWard, setFilterWard] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newBed, setNewBed] = useState({ number: "", ward: "General Ward", type: "Manual" });

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === "Occupied").length;
  const availableBeds = beds.filter(b => b.status === "Available").length;

  const handleAddBed = (e) => {
    e.preventDefault();
    const bed = {
      id: beds.length + 1,
      ...newBed,
      status: "Available",
      patient: null
    };
    setBeds([...beds, bed]);
    setShowAddForm(false);
    setNewBed({ number: "", ward: "General Ward", type: "Manual" });
  };

  const dischargePatient = (id) => {
    if (window.confirm("Discharge patient and mark bed as Available?")) {
      setBeds(beds.map(bed => 
        bed.id === id ? { ...bed, status: "Available", patient: null } : bed
      ));
    }
  };

  const deleteBed = (id) => {
    if (window.confirm("Are you sure you want to remove this bed?")) {
      setBeds(beds.filter(bed => bed.id !== id));
    }
  };

  const filteredBeds = beds.filter(bed => {
    const wardMatch = filterWard === "All" || bed.ward === filterWard;
    const statusMatch = filterStatus === "All" || bed.status === filterStatus;
    return wardMatch && statusMatch;
  });

  return (
    <Layout>
      <div className="page-header">
        <div className="title-area">
          <BedDouble size={24} className="title-icon" />
          <h1>Bed Management</h1>
        </div>
        <button 
          className={`btn-primary ${showAddForm ? "btn-danger" : ""}`}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? <><X size={18}/> Cancel</> : <><Plus size={18}/> Add New Bed</>}
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon bg-blue"><BedDouble size={24} /></div>
          <div>
            <h3>{totalBeds}</h3>
            <p>Total Beds</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green"><CheckCircle size={24} /></div>
          <div>
            <h3>{availableBeds}</h3>
            <p>Available</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-red"><Activity size={24} /></div>
          <div>
            <h3>{occupiedBeds}</h3>
            <p>Occupied</p>
          </div>
        </div>
      </div>

      <div className="content-container">
        
        {showAddForm && (
          <div className="add-bed-form">
            <h3>Add New Bed</h3>
            <form onSubmit={handleAddBed} className="form-row">
              <input 
                type="text" 
                placeholder="Bed Number (e.g. ICU-03)" 
                value={newBed.number}
                onChange={e => setNewBed({...newBed, number: e.target.value})}
                required
              />
              <select 
                value={newBed.ward}
                onChange={e => setNewBed({...newBed, ward: e.target.value})}
              >
                <option>General Ward</option>
                <option>ICU</option>
                <option>Pediatrics</option>
                <option>Maternity</option>
              </select>
              <select 
                value={newBed.type}
                onChange={e => setNewBed({...newBed, type: e.target.value})}
              >
                <option>Manual</option>
                <option>Electric</option>
                <option>Semi-Electric</option>
              </select>
              <button type="submit" className="btn-save">Save Bed</button>
            </form>
          </div>
        )}

        
        <div className="filter-bar">
          <div className="filters-left">
            <div className="filter-group">
              <Filter size={16} />
              <select value={filterWard} onChange={e => setFilterWard(e.target.value)}>
                <option value="All">All Wards</option>
                <option value="ICU">ICU</option>
                <option value="General Ward">General Ward</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <div className="filter-group">
              <Activity size={16} />
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

       
        <div className="beds-grid">
          {filteredBeds.map(bed => (
            <div key={bed.id} className={`bed-card status-${bed.status.toLowerCase()}`}>
              <div className="bed-header">
                <span className="bed-number">{bed.number}</span>
                <span className={`status-badge badge-${bed.status.toLowerCase()}`}>
                  {bed.status}
                </span>
              </div>
              
              <div className="bed-body">
                <div className="bed-icon-large">
                  <BedDouble size={40} />
                </div>
                <div className="bed-details">
                  <p className="bed-ward">{bed.ward}</p>
                  <p className="bed-type">{bed.type} Bed</p>
                </div>
              </div>

              {bed.status === "Occupied" && (
                <div className="patient-info">
                  <User size={14} />
                  <span>{bed.patient}</span>
                </div>
              )}

              <div className="bed-actions">
                {bed.status === "Occupied" ? (
                  <button className="btn-action discharge" onClick={() => dischargePatient(bed.id)}>
                    Discharge
                  </button>
                ) : (
                   <span className="empty-spacer"></span>
                )}
                <button className="btn-icon-delete" onClick={() => deleteBed(bed.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBeds.length === 0 && (
          <div className="empty-state">No beds found matching your filters.</div>
        )}

      </div>
    </Layout>
  );
}

export default BedsPage;