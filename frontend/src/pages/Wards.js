import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"; 
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
      const response = await fetch("http://localhost:5000/api/wards");
      const data = await response.json();

      if (response.ok) {
        setWards(data);
      } else {
        console.error("Failed to fetch wards");
      }
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const addWard = async () => {
    if (!name || !capacity) return alert("Please fill in all fields");

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/wards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          capacity: Number(capacity)
        })
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
      <div className="page-wrapper animate-fade-in">
        
        {/* Header */}
        <header className="page-header">
          <div className="title-area">
            <h1>
              <div className="title-icon-box">
                <Building2 size={24} />
              </div>
              Wards Management
            </h1>
            <p className="subtitle">Manage hospital wards and capacities</p>
          </div>
          <button 
            className={`primary-action-btn ${showAddForm ? "btn-danger" : ""}`} 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add New Ward</>}
          </button>
        </header>

        <div className="content-card">
          
          {/* Add Ward Form */}
          {showAddForm && (
            <div className="add-ward-panel">
              <div className="panel-header">
                <h3>Add New Ward</h3>
                <p>Enter the details for the new hospital unit.</p>
              </div>
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
                  {loading ? (
                    "Saving..."
                  ) : (
                    <><Save size={18} /> Save Ward</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search wards by name..." />
            </div>
          </div>

          {/* Table Area */}
          <div className="table-scroll-wrapper">
            <table className="modern-table">
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
                          <div className="avatar primary"><Building2 size={18} /></div>
                          <span className="ward-name">{ward.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="bed-info">
                          <BedDouble size={18} className="text-muted" />
                          <span className="bed-count">{ward.capacity} Beds</span>
                        </div>
                      </td>
                      <td>
                        <span className="status-dot active">Active</span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="text-btn">Edit</button>
                          <button className="icon-btn"><MoreVertical size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <div className="empty-state">
                        <Building2 size={48} className="empty-icon" />
                        <h3>No wards found</h3>
                        <p>Get started by adding your first hospital ward.</p>
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

export default Wards;