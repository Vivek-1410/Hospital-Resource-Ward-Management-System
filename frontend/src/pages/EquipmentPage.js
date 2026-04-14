import React, { useState } from "react";
import Layout from "../components/Layout";
import { 
  Search, 
  Filter, 
  MapPin, 
  Battery, 
  BatteryCharging,
  Wifi,
  Plus,
  Monitor,
  Activity,
  Box
} from "lucide-react";
import "../equipment.css";

function EquipmentPage() {
  const initialEquipment = [
    { id: "VENT-001", name: "Dräger Evita V500", type: "Ventilator", location: "ICU - Bed 02", status: "In Use", battery: 85, lastPing: "1 min ago", signal: "strong" },
    { id: "VENT-002", name: "Puritan Bennett 980", type: "Ventilator", location: "Storage Wing A", status: "Available", battery: 100, lastPing: "Just now", signal: "strong" },
    { id: "XRAY-015", name: "Mobilett Mira Max", type: "Portable X-Ray", location: "Emergency Room", status: "In Use", battery: 15, lastPing: "5 mins ago", signal: "medium" },
    { id: "DEFIB-004", name: "Zoll X Series", type: "Defibrillator", location: "General Ward", status: "Available", battery: 100, lastPing: "10 mins ago", signal: "strong" },
    { id: "WHEEL-102", name: "Standard Transport", type: "Wheelchair", location: "Lobby Entry", status: "Available", battery: null, lastPing: "2 mins ago", signal: "weak" },
    { id: "PUMP-088", name: "Alaris Infusion Pump", type: "IV Pump", location: "Pediatrics", status: "Maintenance", battery: 12, lastPing: "2 hours ago", signal: "none" },
  ];

  const [equipment, setEquipment] = useState(initialEquipment);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const totalItems = equipment.length;
  const availableItems = equipment.filter(e => e.status === "Available").length;
  const inUseItems = equipment.filter(e => e.status === "In Use").length;
  const maintenanceItems = equipment.filter(e => e.status === "Maintenance").length;

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || item.type === filterType;
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getDeviceIcon = (type) => {
    switch(type) {
      case "Ventilator": return <Activity size={24} />;
      case "Portable X-Ray": return <Monitor size={24} />;
      case "Wheelchair": return <Box size={24} />;
      default: return <Activity size={24} />;
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <div className="title-area">
          <div className="icon-wrapper">
            <Wifi size={24} className="title-icon text-blue pulsing-icon" />
          </div>
          <div>
            <h1>IoT Equipment Tracker</h1>
            <p className="subtitle">Real-time location and telemetry</p>
          </div>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> Register Asset
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h3>{totalItems}</h3><p>Total Assets</p>
        </div>
        <div className="stat-card border-green">
          <h3 className="text-green">{availableItems}</h3><p>Ready for Use</p>
        </div>
        <div className="stat-card border-blue">
          <h3 className="text-blue">{inUseItems}</h3><p>Currently In Use</p>
        </div>
        <div className="stat-card border-orange">
          <h3 className="text-orange">{maintenanceItems}</h3><p>In Maintenance</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search Asset ID or Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters-right">
          <div className="filter-group">
            <Filter size={16} className="text-muted" />
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Ventilator">Ventilator</option>
              <option value="Portable X-Ray">Portable X-Ray</option>
              <option value="Wheelchair">Wheelchair</option>
              <option value="IV Pump">IV Pump</option>
            </select>
          </div>
          <div className="filter-group">
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="equipment-grid">
        {filteredEquipment.map(item => (
          <div key={item.id} className="eq-card">
            
            <div className="eq-header">
              <span className="eq-id">{item.id}</span>
              <span className={`status-badge badge-${item.status.replace(' ', '-').toLowerCase()}`}>
                {item.status}
              </span>
            </div>

            <div className="eq-body">
              <div className="eq-icon">{getDeviceIcon(item.type)}</div>
              <div className="eq-details">
                <h4>{item.name}</h4>
                <p className="eq-type">{item.type}</p>
              </div>
            </div>

            <div className="eq-telemetry">
              <div className="location-tag">
                <MapPin size={16} className="text-red" />
                <span>{item.location}</span>
              </div>
              
              <div className="iot-stats">
                {item.battery !== null ? (
                  <div className={`battery-stat ${item.battery <= 20 ? 'text-red' : 'text-green'}`}>
                    {item.battery <= 20 ? <BatteryCharging size={16} /> : <Battery size={16} />}
                    <span>{item.battery}%</span>
                  </div>
                ) : (
                  <span className="text-muted text-sm">Passive RFID</span>
                )}
                
                <div className="ping-stat">
                  <span className={`signal-dot signal-${item.signal}`}></span>
                  <span>{item.lastPing}</span>
                </div>
              </div>
            </div>

            <div className="eq-actions">
              <button className="btn-secondary">Update</button>
              <button className="btn-ping">Locate</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default EquipmentPage;