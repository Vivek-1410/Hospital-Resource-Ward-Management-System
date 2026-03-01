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
  UserCircle
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
      
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">
            <Activity size={24} color="white" />
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
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      
      <main className="main-content">
        
        
        <header className="top-header">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search patients, wards..." />
          </div>

          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">Dr. Admin</span>
                <span className="user-role">Super Admin</span>
              </div>
              <UserCircle size={32} className="user-avatar" />
            </div>
          </div>
        </header>

        
        <div className="page-content">
          {children}
        </div>

      </main>
    </div>
  );
}

export default Layout;