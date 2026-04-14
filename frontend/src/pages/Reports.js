import React, { useState } from "react";
import Layout from "../components/Layout";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import { 
  FileText, Download, Calendar, TrendingUp, Users, Activity, AlertCircle 
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
    { name: "Recovering", value: 45, color: "#10b981" }, 
    { name: "Stable", value: 30, color: "#3b82f6" }, 
    { name: "Observation", value: 15, color: "#f59e0b" },
    { name: "Critical", value: 10, color: "#ef4444" }
  ];

  const activities = [
    { id: 1, text: "Patient John Doe admitted to ICU-01", time: "2 hours ago", type: "admission" },
    { id: 2, text: "Dr. Smith discharged Sarah Lee", time: "4 hours ago", type: "discharge" },
    { id: 3, text: "Bed G-102 marked for maintenance", time: "5 hours ago", type: "alert" },
    { id: 4, text: "New ward 'Orthopedics' created", time: "1 day ago", type: "system" },
  ];

  return (
    <Layout>
      <div className="page-header print-hide">
        <div className="title-area">
          <FileText size={24} className="title-icon text-purple" />
          <div>
            <h1>Hospital Analytics</h1>
            <p className="subtitle">System performance & occupancy overview</p>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="date-filter">
            <Calendar size={16} className="text-muted" />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="btn-primary" onClick={() => window.print()}>
            <Download size={18} /> Export PDF
          </button>
        </div>
      </div>

      <div className="reports-container">
        {/* KPI Row */}
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
              <span className="kpi-label">Overall Occupancy</span>
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

        {/* Top Charts */}
        <div className="charts-grid-main">
          <div className="chart-card">
            <h3>Admissions vs Discharges</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}/>
                  <Legend iconType="circle" />
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
                <BarChart data={occupancyData} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" />
                  <Bar dataKey="occupied" name="Occupied" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={16} />
                  <Bar dataKey="capacity" name="Capacity" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="charts-grid-secondary">
          <div className="chart-card">
            <h3>Patient Status Distribution</h3>
            <div className="chart-wrapper flex-center">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="45%" innerRadius={70} outerRadius={90} paddingAngle={4} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="bottom" iconType="circle" />
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
            <button className="btn-view-all">View All Activity →</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReportsPage;