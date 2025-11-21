import React, { useState } from "react";
import "./layout.css";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Megaphone,
  Users,
  HelpCircle,
  ChevronDown,
  Users2,
  LucideBriefcaseBusiness,
 
  Users2Icon,
  
  PinIcon,
  LogOut
} from "lucide-react";
import { NavLink,useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logoutUser } from "../../api/api";

const AdminSidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<string[]>(["Jobs"]);
  const navigate = useNavigate();
  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((m) => m !== menu)
        : [...prev, menu]
    );
  };
   const handleLogout = async () => {
    try {
      await logoutUser(); // backend call
      localStorage.removeItem("token");  // Remove token
      localStorage.removeItem("userRole");  // Remove user role
      navigate("/login");               // Redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Error logging out");
    }
  };


  return (
    <aside className="admin-sidebar">
      {/* ===== Logo Section ===== */}
      <div className="sidebar-logo">
        <img src={logo} alt="We Konnects Logo" />
      </div>
<div className="sidebar-nav-scrollable">
      <nav className="sidebar-nav">
        {/* ===== Dashboard ===== */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <Users2 size={20} />
          <span>Users</span>
        </NavLink>
         <NavLink
          to="/admin/categories"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <LucideBriefcaseBusiness size={20} />
          <span>Categories</span>
        </NavLink>
        <div className="nav-group">
                  <div className="nav-item" onClick={() => toggleMenu("groups")}>
                    <Users2Icon size={20} />
                    <span>Groups</span>
                    <ChevronDown className="chevron" />
          </div>

          {openMenus.includes("groups") && (
            <div className="sub-menu">
              <NavLink
                to="/admin/groups/create-group"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
             Create Group
              </NavLink>
              <NavLink
                to="/admin/groups/info"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Groups Information
              </NavLink>
            </div>
          )}
        </div>

        <div className="nav-group">
                  <div className="nav-item" onClick={() => toggleMenu("locations")}>
                    <PinIcon size={20} />
                    <span>Locations</span>
                    <ChevronDown className="chevron" />
          </div>

          {openMenus.includes("locations") && (
            <div className="sub-menu">
              <NavLink
                to="/admin/locations/create-states"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
             Create State
              </NavLink>
              <NavLink
                to="/admin/locations/states-list"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
               States List
              </NavLink>
               <NavLink
                to="/admin/locations/create-cities"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
             Create City
              </NavLink>
              <NavLink
                to="/admin/locations/cities-list"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
               Cities List
              </NavLink>
            </div>
          )}
        </div>

        {/* ===== Business ===== */}
        <div className="nav-group">
          <div className="nav-item" onClick={() => toggleMenu("Business")}>
            <Briefcase size={20} />
            <span>Business Listing </span>
            <ChevronDown className="chevron" />
          </div>

          {openMenus.includes("Business") && (
            <div className="sub-menu">
              <NavLink
                to="/admin/business/add"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Add New
              </NavLink>
              <NavLink
                to="/admin/business/list"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Business pending List
              </NavLink>
               <NavLink
                to="/admin/business/expire-listings"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Expire Listings
              </NavLink>
            </div>
          )}
        </div>


          <div className="nav-group">
                  <div className="nav-item" onClick={() => toggleMenu("events")}>
                    <Megaphone size={20} />
                    <span>Events</span>
                    <ChevronDown className="chevron" />
          </div>

          {openMenus.includes("events") && (
            <div className="sub-menu">
              <NavLink
                to="/admin/events/create-event"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
             Create Event
              </NavLink>
              <NavLink
                to="/admin/events/list"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Event List
              </NavLink>
            </div>
          )}
        </div>

        {/* ===== Jobs ===== */}
        <div className="nav-group">
          <div className="nav-item" onClick={() => toggleMenu("Jobs")}>
            <FileText size={20} />
            <span>Jobs</span>
            <ChevronDown className="chevron" />
          </div>

          {openMenus.includes("Jobs") && (
            <div className="sub-menu">
              <NavLink
                to="/admin/jobs/education"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Education Info
              </NavLink>
              <NavLink
                to="/admin/jobs/apply-list"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Apply Job List
              </NavLink>
            </div>
          )}
        </div>

        {/* ===== Post Jobs ===== */}
        <div className="nav-group">
          <div className="nav-item" onClick={() => toggleMenu("Post Jobs")}>
            <Megaphone size={20} />
            <span>Post Jobs</span>
            <ChevronDown className="chevron" />
          </div>

          {openMenus.includes("Post Jobs") && (
            <div className="sub-menu">
              <NavLink
                to="/admin/jobs/profile"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Create Profile
              </NavLink>
              <NavLink
                to="/admin/jobs/post"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Post Job
              </NavLink>
              <NavLink
                to="/admin/jobs/list"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Jobs List
              </NavLink>
            </div>
          )}
        </div>

        {/* ===== Premium Leads ===== */}
        <div className="nav-group">
          <div className="nav-item" onClick={() => toggleMenu("Premium Leads")}>
            <Users size={20} />
            <span>Premium Leads</span>
            <ChevronDown className="chevron" />
          </div>

          {openMenus.includes("Premium Leads") && (
            <div className="sub-menu">
              <NavLink
                to="/admin/leads"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                Total Leads
              </NavLink>
            </div>
          )}
        </div>

        {/* ===== Inquiries ===== */}
        <div className="nav-group">
          <div className="nav-item" onClick={() => toggleMenu("Inquiries")}>
            <HelpCircle size={20} />
            <span>My Inquiries</span>
            <ChevronDown className="chevron" />
          </div>

          {openMenus.includes("Inquiries") && (
            <div className="sub-menu">
              <NavLink
                to="/admin/inquiries"
                className={({ isActive }) => (isActive ? "sub-active" : "")}
              >
                List of Inquiries
              </NavLink>
            </div>
          )}
        </div>
      </nav>
      </div>
      {/* LOGOUT BUTTON */}
     <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

