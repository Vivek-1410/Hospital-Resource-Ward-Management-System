import React, { useState } from "react";
import Layout from "../components/Layout";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  Activity, 
  AlertCircle 
} from "lucide-react";
import "../reports.css";

function ReportsPage() {
  const [dateRange, setDateRange] = useState("Last 7 Days");


  const occupancyData = [
    { name: "General", occupied: 32, capacity: 40 },
    { name: "ICU", occupied: 18, capacity: 20 },
    { name: "Pediatrics", occupied: 25, capacity: 30 },
    { name: "Maternity", occupied: 15, capacity: 25 },
  ];

  const trendData = [
    { day: "Mon", admissions: 4, discharges: 2 },
    { day: "Tue", admissions: 3, discharges: 5 },
    { day: "Wed", admissions: 6, discharges: 3 },
    { day: "Thu", admissions: 2, discharges: 4 },
    { day: "Fri", admissions: 8, discharges: 6 },
    { day: "Sat", admissions: 5, discharges: 2 },
    { day: "Sun", admissions: 3, discharges: 1 },
  ];

  const statusData = [
    { name: "Recovering", value: 45, color: "#10b981" }, // Green
    { name: "Critical", value: 10, color: "#ef4444" },   // Red
    { name: "Stable", value: 30, color: "#3b82f6" },     // Blue
    { name: "Observation", value: 15, color: "#f59e0b" } // Amber
  ];

  const activities = [
    { id: 1, text: "Patient John Doe admitted to ICU-01", time: "2 hours ago", type: "admission" },
    { id: 2, text: "Dr. Smith discharged Sarah Lee", time: "4 hours ago", type: "discharge" },
    { id: 3, text: "Bed G-102 marked for maintenance", time: "5 hours ago", type: "alert" },
    { id: 4, text: "New ward 'Orthopedics' created", time: "1 day ago", type: "system" },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="page-header">
        <div className="title-area">
          <FileText size={24} className="title-icon" />
          <h1>Hospital Overview & Reports</h1>
          <p className="subtitle">Analytics and system performance summary</p>
        </div>
        
        <div className="header-actions">
          <div className="date-filter">
            <Calendar size={16} />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="btn-primary" onClick={handlePrint}>
            <Download size={18} /> Export Report
          </button>
        </div>
      </div>

      <div className="reports-container">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon bg-blue"><Users size={24} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Total Patients</span>
              <h3 className="kpi-value">124</h3>
              <span className="kpi-change text-green">+12% this week</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon bg-green"><Activity size={24} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Bed Occupancy</span>
              <h3 className="kpi-value">78%</h3>
              <span className="kpi-change text-orange">-2% vs yesterday</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon bg-purple"><TrendingUp size={24} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Admissions Today</span>
              <h3 className="kpi-value">18</h3>
              <span className="kpi-change text-green">High volume</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon bg-red"><AlertCircle size={24} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Critical Cases</span>
              <h3 className="kpi-value">12</h3>
              <span className="kpi-change text-red">Requires Attention</span>
            </div>
          </div>
        </div>
        <div className="charts-grid">
          <div className="chart-card large">
            <h3>Admissions vs Discharges Trend</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="admissions" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="discharges" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Occupancy by Ward</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={occupancyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="occupied" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
                  <Bar dataKey="capacity" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="bottom-grid">
          <div className="chart-card">
            <h3>Patient Status Distribution</h3>
            <div className="chart-wrapper center-content">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Recent System Activity</h3>
            <div className="activity-list">
              {activities.map(act => (
                <div key={act.id} className="activity-item">
                  <div className={`activity-dot type-${act.type}`}></div>
                  <div className="activity-content">
                    <p className="activity-text">{act.text}</p>
                    <span className="activity-time">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-view-all">View All Activity</button>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default ReportsPage;