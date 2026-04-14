// @ts-nocheck
import React from "react";
import Layout from "../components/Layout";
import {Link} from "react-router-dom"
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
  // Backend data remains exactly the same
  const totalBeds = 180;
  const occupiedBeds = 145;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <Layout>
      <div className="dash-wrapper">
        
        {/* Header */}
        <header className="dash-header">
          <div className="header-titles">
            <h1>Ward Overview</h1>
            <p>Real-time resource monitoring</p>
          </div>


            <Link to="/patients" className="primary-action-btn" style={{ textDecoration: 'none' }}>
  <Plus size={16} /> Admit Patient
</Link>
        </header>

        {/* Bento Box Grid */}
        <div className="bento-grid">
          
          {/* Main Featured Card - Spans 2 columns */}
          <div className="bento-card featured-card">
            <div className="featured-content">
              <div className="card-top">
                <div className="icon-box orange">
                  <Users size={24} />
                </div>
                <span className="badge warning">{occupancyRate}% Full</span>
              </div>
              <div className="featured-stats">
                <h3>Occupied Beds</h3>
                <div className="stat-group">
                  <h2>{occupiedBeds}</h2>
                  <span>/ {totalBeds} total</span>
                </div>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${occupancyRate}%` }}></div>
              </div>
              <p className="hint-text">{totalBeds - occupiedBeds} beds remaining available</p>
            </div>
          </div>

          {/* Small Stat Card 1 */}
          <div className="bento-card standard-card">
            <div className="card-top">
              <div className="icon-box blue">
                <Activity size={22} />
              </div>
              <span className="badge success">+2 new</span>
            </div>
            <div className="card-bottom">
              <h3>Total Wards</h3>
              <h2>12</h2>
            </div>
          </div>

          {/* Small Stat Card 2 */}
          <div className="bento-card standard-card">
            <div className="card-top">
              <div className="icon-box purple">
                <BedDouble size={22} />
              </div>
            </div>
            <div className="card-bottom">
              <h3>Total Capacity</h3>
              <h2>{totalBeds}</h2>
            </div>
          </div>

          {/* Alert Card */}
          <div className="bento-card alert-card">
            <div className="card-top">
              <div className="icon-box red">
                <AlertCircle size={22} />
              </div>
              <span className="badge danger">Action Req.</span>
            </div>
            <div className="card-bottom">
              <h3 className="text-red">Critical Cases</h3>
              <h2 className="text-red">8</h2>
            </div>
          </div>

          {/* Table Section - Spans full width */}
          <div className="bento-card full-width-card">
            <div className="table-header">
              <h2>Recent Admissions</h2>
              <Link to="/admissions" className="text-btn" style={{ textDecoration: 'none' }}>
  View All
</Link>
            </div>

            {/* This wrapper prevents the table from overflowing the card */}
            <div className="table-scroll-wrapper">
              <table className="modern-table">
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
                      <div className="user-profile">
                        <div className="avatar primary">RK</div>
                        <div className="user-info">
                          <span className="user-name">Ravi Kumar</span>
                          <span className="user-id">ID: #P-9021</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="ward-info">
                        <span className="pill pill-icu">ICU</span>
                        <span className="bed-id">Bed B12</span>
                      </div>
                    </td>
                    <td className="text-muted">Oct 24, 2023</td>
                    <td><span className="status-dot active">Admitted</span></td>
                    <td>
                      <button className="icon-btn"><MoreHorizontal size={20} /></button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="user-profile">
                        <div className="avatar secondary">PS</div>
                        <div className="user-info">
                          <span className="user-name">Priya Sharma</span>
                          <span className="user-id">ID: #P-9022</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="ward-info">
                        <span className="pill pill-general">General</span>
                        <span className="bed-id">Bed G05</span>
                      </div>
                    </td>
                    <td className="text-muted">Oct 22, 2023</td>
                    <td><span className="status-dot discharged">Discharged</span></td>
                    <td>
                      <button className="icon-btn"><MoreHorizontal size={20} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;