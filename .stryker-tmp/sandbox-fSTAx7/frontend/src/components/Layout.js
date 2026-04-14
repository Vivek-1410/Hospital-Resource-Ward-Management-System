// @ts-nocheck
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BedDouble, 
  Activity, 
  Users, 
  FileText, 
  LogOut, 
  Building2, 
  Bell, 
  Search,
  UserCircle,
  Stethoscope, 
  PieChart 
} from "lucide-react";
import "../layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation(); 

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <div className="layout-container">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">
            <Activity size={24} strokeWidth={2.5} color="white" />
          </div>
          <h2>MedCore</h2>
        </div>

        <nav className="sidebar-nav">
          <p className="menu-label">Main Menu</p>
          
          <Link to="/dashboard" className={isActive("/dashboard")}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link to="/wards" className={isActive("/wards")}>
            <Building2 size={20} />
            <span>Wards</span>
          </Link>

          <Link to="/beds" className={isActive("/beds")}>
            <BedDouble size={20} />
            <span>Bed Management</span>
          </Link>

          <Link to="/admission" className={isActive("/admission")}>
            <FileText size={20} />
            <span>Admissions</span>
          </Link>

          <Link to="/patients" className={isActive("/patients")}>
            <Users size={20} />
            <span>Patients</span>
          </Link>

          {/* NEW LINKS ADDED HERE */}
          <Link to="/equipment" className={isActive("/equipment")}>
            <Stethoscope size={20} />
            <span>Equipment</span>
          </Link>

          <Link to="/reports" className={isActive("/reports")}>
            <PieChart size={20} />
            <span>Reports</span>
          </Link>
          
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-wrapper">
        
        {/* TOP HEADER */}
        <header className="top-header">
          <div className="header-left">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search patients, wards..." />
            </div>
          </div>

          <div className="header-actions">
            <button className="icon-btn action-bell">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">Dr. Admin</span>
                <span className="user-role">Super Admin</span>
              </div>
              <div className="user-avatar-wrapper">
                <UserCircle size={36} className="user-avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <div className="page-content">
          {children}
        </div>

      </main>
    </div>
  );
}

export default Layout;