// src/components/layout/UserDashboardLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./AdminHeader";
import UserSidebar from "./UserSidebar";
import "./layout.css";

const UserDashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <UserHeader />
      <div className="layout-content">
        <UserSidebar />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;