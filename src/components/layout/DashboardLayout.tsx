// import React from "react";
// import { Outlet } from "react-router-dom";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import "./layout.css";

// const DashboardLayout: React.FC = () => {
//   return (
//     <div className="dashboard-layout">
//       <AdminHeader />
//       <div className="layout-content">
//         <AdminSidebar />
//         <main className="dashboard-main">
//           <Outlet /> 
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// src/admin/layout/DashboardLayout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./layout.css";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      {/* Pass toggle function to Header */}
      <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Sidebar with open state */}
      <AdminSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      <main className={`dashboard-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;