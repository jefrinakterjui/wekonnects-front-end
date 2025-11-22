// import React from "react";
// import "./layout.css";
// import { Search, Bell, MessageSquare, Settings } from "lucide-react";

// const AdminHeader: React.FC = () => {
//   return (
//     <header className="admin-header">
//       {/* ===== CENTER SECTION: Search + Links ===== */}
//       <div className="header-center">
//         <div className="search-bar">
//           <input type="text" placeholder="Search here..." />
//           <button className="search-btn">
//             <Search size={18} color="#fff" />
//           </button>
//         </div>

//         <div className="header-links">
//           <a href="#">About</a>
//           <a href="#">Tools</a>
//           <a href="#">Help</a>
//         </div>
//       </div>

//       {/* ===== RIGHT SECTION: Icons + Profile ===== */}
//       <div className="header-right">
//         <div className="header-icons">
//           <Bell className="icon" size={54} />
//           <MessageSquare className="icon" size={54}/>
//           <Settings className="icon"  size={54}/>
//         </div>

//         <div className="admin-profile">
//           <span>Hello, Harikrishna</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

// src/admin/layout/AdminHeader.tsx
import React from "react";
import "./layout.css";
import { Search, Bell, MessageSquare, Settings, Menu, X } from "lucide-react";

interface AdminHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="admin-header">
      {/* Hamburger Button - Mobile & Tablet Only */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

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

      <div className="header-right">
        <div className="header-icons">
          <Bell className="icon" size={24} />
          <MessageSquare className="icon" size={24} />
          <Settings className="icon" size={24} />
        </div>

        <div className="admin-profile">
          <span>Hello, Harikrishna</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;