import React from "react";
import Layout from "../components/Layout";
import { 
  BedDouble, 
  Activity, 
  Users, 
  AlertCircle, 
  MoreHorizontal,
  Plus
} from "lucide-react";
import "../dashboard.css";

function Dashboard() {
  const totalBeds = 180;
  const occupiedBeds = 145;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <Layout>
      <div className="dashboard-header">
        <div>
          <h1>Ward Overview</h1>
          <p className="subtitle">Real-time resource monitoring</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> Admit Patient
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="card-header">
            <div className="icon-wrapper blue">
              <Activity size={24} />
            </div>
            <span className="trend-up">+2 new</span>
          </div>
          <div className="card-content">
            <h3>Total Wards</h3>
            <p>12</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-header">
            <div className="icon-wrapper purple">
              <BedDouble size={24} />
            </div>
          </div>
          <div className="card-content">
            <h3>Total Capacity</h3>
            <p>{totalBeds}</p>
          </div>
        </div>

        <div className="stat-card highlight-card">
          <div className="card-header">
            <div className="icon-wrapper orange">
              <Users size={24} />
            </div>
            <span className="percentage-badge">{occupancyRate}% Full</span>
          </div>
          <div className="card-content">
            <h3>Occupied Beds</h3>
            <p>{occupiedBeds}</p>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${occupancyRate}%` }}></div>
          </div>
          <small className="helper-text">{totalBeds - occupiedBeds} beds remaining</small>
        </div>

        {/* Critical Alerts */}
        <div className="stat-card">
          <div className="card-header">
            <div className="icon-wrapper red">
              <AlertCircle size={24} />
            </div>
            <span className="trend-down">Action Req.</span>
          </div>
          <div className="card-content">
            <h3>Critical Cases</h3>
            <p>8</p>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="table-section">
          <div className="section-header">
            <h2>Recent Admissions</h2>
            <button className="btn-text">View All</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Ward Info</th>
                <th>Admitted Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div className="patient-cell">
                    <div className="avatar">RK</div>
                    <div>
                      <span className="name">Ravi Kumar</span>
                      <span className="sub-text">ID: #P-9021</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="ward-cell">
                    <span className="ward-badge icu">ICU</span>
                    <span className="bed-number">Bed B12</span>
                  </div>
                </td>
                <td>Oct 24, 2023</td>
                <td><span className="status active">Admitted</span></td>
                <td>
                  <button className="action-btn"><MoreHorizontal size={18} /></button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="patient-cell">
                    <div className="avatar secondary">PS</div>
                    <div>
                      <span className="name">Priya Sharma</span>
                      <span className="sub-text">ID: #P-9022</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="ward-cell">
                    <span className="ward-badge general">General</span>
                    <span className="bed-number">Bed G05</span>
                  </div>
                </td>
                <td>Oct 22, 2023</td>
                <td><span className="status discharged">Discharged</span></td>
                <td>
                  <button className="action-btn"><MoreHorizontal size={18} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;