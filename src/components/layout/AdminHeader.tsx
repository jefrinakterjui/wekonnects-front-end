import React from "react";
import "./layout.css";
import { Search, Bell, MessageSquare, Settings } from "lucide-react";

const AdminHeader: React.FC = () => {
  // Directly read from localStorage (your exact keys)
  const userName = localStorage.getItem("Name") || "Guest";
  const userRole = localStorage.getItem("userRole") || "";

  const isAdminOrModerator = 
    userRole.toLowerCase() === "admin" || 
    userRole.toLowerCase() === "moderator";

 

  return (
    <header className="admin-header">
      {/* ===== CENTER SECTION: Search + Links ===== */}
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Search here..." />
          <button className="search-btn">
            <Search size={18} color="#fff" />
          </button>
        </div>

        <div className="header-links">
          <a href="#">About</a>
          <a href="#">Tools</a>
          <a href="#">Help</a>
        </div>
      </div>

      {/* ===== RIGHT SECTION: Icons + Profile ===== */}
      <div className="header-right">
        <div className="header-icons">
          <Bell className="icon" size={54} />
          <MessageSquare className="icon" size={54} />
          {isAdminOrModerator && <Settings className="icon" size={54} />}
        </div>

        <div className="admin-profile">
          <span>Hello, {userName}</span>
          
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;