import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"; // Ensure this path is correct
import { 
  Building2, 
  Search, 
  Plus, 
  BedDouble, 
  MoreVertical, 
  Save, 
  X 
} from "lucide-react";
import "../ward.css";

function Wards() {

  const [wards, setWards] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/wards", { // Adjust URL if needed
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setWards(data);
      }
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const addWard = async () => {
    if (!name || !capacity) return alert("Please fill in all fields");
    
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/wards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, capacity })
      });

      if (response.ok) {
        setName("");
        setCapacity("");
        setShowAddForm(false); 
        fetchWards(); 
      } else {
        alert("Failed to add ward");
      }
    } catch (error) {
      console.error("Error adding ward:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <div className="title-area">
          <Building2 size={24} className="title-icon" />
          <h1>Wards Management</h1>
          <p className="subtitle">Manage hospital wards and capacities</p>
        </div>
        <button 
          className={`btn-primary ${showAddForm ? "btn-danger" : ""}`} 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add New Ward</>}
        </button>
      </div>

      <div className="content-container">
        
        {showAddForm && (
          <div className="add-ward-form-card">
            <h3>Add New Ward</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Ward Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., ICU Block A" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Capacity (Beds)</label>
                <input 
                  type="number" 
                  placeholder="e.g., 20" 
                  value={capacity} 
                  onChange={(e) => setCapacity(e.target.value)} 
                />
              </div>
              <button className="btn-save" onClick={addWard} disabled={loading}>
                <Save size={18} /> {loading ? "Saving..." : "Save Ward"}
              </button>
            </div>
          </div>
        )}

        
        <div className="filter-bar">
          <div className="search-input">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search wards..." />
          </div>
        </div>

        
        <div className="table-wrapper">
          <table className="wards-table">
            <thead>
              <tr>
                <th>Ward Name</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wards.length > 0 ? (
                wards.map((ward) => (
                  <tr key={ward._id}>
                    <td>
                      <div className="ward-cell">
                        <div className="icon-wrapper">
                          <Building2 size={18} />
                        </div>
                        <span className="ward-name">{ward.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="bed-info">
                        <BedDouble size={18} />
                        <span>{ward.capacity} Beds</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge status-success">Active</span>
                    </td>
                    <td className="actions-cell">
                      <button className="action-btn">Edit</button>
                      <button className="icon-btn-more">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state">No wards found. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
}

export default Wards;