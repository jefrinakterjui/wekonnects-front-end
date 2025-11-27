import React, { useState } from "react";
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
  PinIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logoutUser } from "../../api/api";

const AdminSidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<string[]>(["Jobs"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Error logging out");
    }
  };

  return (
    <>
      {/* Hamburger Button - Hidden when sidebar is open */}
      <button
        className={`hamburger-btn ${sidebarOpen ? "hidden" : ""}`}
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="We Konnects Logo" className="sidebar-logo-img" />
          <button
            className="close-sidebar-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        <div className="sidebar-nav-scrollable">
          <nav className="sidebar-nav">
            {/* Your existing NavLinks - unchanged */}
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard size={22} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Users2 size={22} />
              <span>Users</span>
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <LucideBriefcaseBusiness size={22} />
              <span>Categories</span>
            </NavLink>

            {/* Groups */}
            <div className="nav-group">
              <div className="nav-item" onClick={() => toggleMenu("groups")}>
                <Users2 size={22} />
                <span>Groups</span>
                <ChevronDown className={`chevron ${openMenus.includes("groups") ? "rotated" : ""}`} />
              </div>
              {openMenus.includes("groups") && (
                <div className="sub-menu">
                  <NavLink to="/admin/groups/create-group" onClick={() => setSidebarOpen(false)}>Create Group</NavLink>
                  <NavLink to="/admin/groups/info" onClick={() => setSidebarOpen(false)}>Groups Information</NavLink>
                </div>
              )}
            </div>

            {/* ... rest of your menu items (unchanged) ... */}
            {/* Locations, Business, Events, Jobs, etc. — keep exactly as before */}
            
        {/* Locations */}
        <div className="nav-group">
          <div className="nav-item" onClick={() => toggleMenu("locations")}>
             <PinIcon size={20} />
            <span>Locations</span>
           <ChevronDown className={`chevron ${openMenus.includes("locations") ? "rotated" : ""}`} />
       </div>

        {openMenus.includes("locations") && (
              <div className="sub-menu">
                <NavLink to="/admin/locations/create-states" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Create State
                </NavLink>
                <NavLink to="/admin/locations/states-list" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  States List
                </NavLink>
                <NavLink to="/admin/locations/create-cities" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Create City
                </NavLink>
                <NavLink to="/admin/locations/cities-list" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Cities List
                </NavLink>
              </div>
            )}
          </div>

          {/* Business Listing */}
          <div className="nav-group">
            <div className="nav-item" onClick={() => toggleMenu("Business")}>
              <Briefcase size={20} />
              <span>Business Listing</span>
              <ChevronDown className={`chevron ${openMenus.includes("Business") ? "rotated" : ""}`} />
            </div>

            {openMenus.includes("Business") && (
              <div className="sub-menu">
                <NavLink to="/admin/business/add" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Add New
                </NavLink>
                <NavLink to="/admin/business/list" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Business Pending List
                </NavLink>
                <NavLink to="/admin/business/expire-listings" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Expire Listings
                </NavLink>
              </div>
            )}
          </div>

          {/* Events */}
          <div className="nav-group">
            <div className="nav-item" onClick={() => toggleMenu("events")}>
              <Megaphone size={20} />
              <span>Events</span>
              <ChevronDown className={`chevron ${openMenus.includes("events") ? "rotated" : ""}`} />
            </div>

            {openMenus.includes("events") && (
              <div className="sub-menu">
                <NavLink to="/admin/events/create-event" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Create Event
                </NavLink>
                <NavLink to="/admin/events/list" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Event List
                </NavLink>
              </div>
            )}
          </div>

          {/* Jobs */}
          <div className="nav-group">
            <div className="nav-item" onClick={() => toggleMenu("Jobs")}>
              <FileText size={20} />
              <span>Jobs</span>
              <ChevronDown className={`chevron ${openMenus.includes("Jobs") ? "rotated" : ""}`} />
            </div>

            {openMenus.includes("Jobs") && (
              <div className="sub-menu">
                <NavLink to="/admin/jobs/education" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Education Info
                </NavLink>
                <NavLink to="/admin/jobs/apply-list" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Apply Job List
                </NavLink>
              </div>
            )}
          </div>

          {/* Post Jobs */}
          <div className="nav-group">
            <div className="nav-item" onClick={() => toggleMenu("Post Jobs")}>
              <Megaphone size={20} />
              <span>Post Jobs</span>
              <ChevronDown className={`chevron ${openMenus.includes("Post Jobs") ? "rotated" : ""}`} />
            </div>

            {openMenus.includes("Post Jobs") && (
              <div className="sub-menu">
                <NavLink to="/admin/jobs/profile" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Create Profile
                </NavLink>
                <NavLink to="/admin/jobs/post" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Post Job
                </NavLink>
                <NavLink to="/admin/jobs/list" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Jobs List
                </NavLink>
              </div>
            )}
          </div>

          {/* Premium Leads */}
          <div className="nav-group">
            <div className="nav-item" onClick={() => toggleMenu("Premium Leads")}>
              <Users size={20} />
              <span>Premium Leads</span>
              <ChevronDown className={`chevron ${openMenus.includes("Premium Leads") ? "rotated" : ""}`} />
            </div>

            {openMenus.includes("Premium Leads") && (
              <div className="sub-menu">
                <NavLink to="/admin/leads" className={({ isActive }) => (isActive ? "sub-active" : "")} >
                  Total Leads
                </NavLink>
              </div>
            )}
          </div>




            <div className="nav-group">
              <div className="nav-item" onClick={() => toggleMenu("Inquiries")}>
                <HelpCircle size={22} />
                <span>My Inquiries</span>
                <ChevronDown className={`chevron ${openMenus.includes("Inquiries") ? "rotated" : ""}`} />
              </div>
              {openMenus.includes("Inquiries") && (
                <div className="sub-menu">
                  <NavLink to="/admin/inquiries" onClick={() => setSidebarOpen(false)}>
                    List of Inquiries
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Updated CSS with fix */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --sidebar-width: 300px;
          --primary: #8735bc;
          --orange: #FF6C00;
        }

        /* Hamburger Button - Only visible on mobile/tablet AND when sidebar is closed */
        .hamburger-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1100;
          background: white;
          border: none;
          padding: 12px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .hamburger-btn.hidden {
          opacity: 0;
          pointer-events: none;
        }

        /* Show hamburger only on ≤1024px */
        @media (min-width: 1025px) {
          .hamburger-btn { display: none !important; }
        }

        /* Sidebar */
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--sidebar-width);
          height: 100vh;
          background: #ffffff;
          box-shadow: 4px 0 20px rgba(0,0,0,0.1);
          z-index: 1000;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
        }

        .admin-sidebar.open {
          transform: translateX(0);
        }

        /* Desktop: Always visible */
        @media (min-width: 1025px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
        }

        /* Overlay */
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 900;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }

        .sidebar-overlay.active { /* not needed, just kept for clarity */
          opacity: 1;
          pointer-events: auto;
        }

        @media (max-width: 1024px) {
          .sidebar-overlay {
            opacity: 1;
            pointer-events: auto;
          }
        }

        /* Header */
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .sidebar-logo-img {
          height: 48px;
        }

        .close-sidebar-btn {
          display: none;
          background: #f8f9fa;
          border: none;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          cursor: pointer;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .close-sidebar-btn {
            display: flex;
          }
        }

        /* Rest of your styles (nav-item, sub-menu, etc.) remain perfect */
        .sidebar-nav-scrollable { flex: 1; overflow-y: auto; padding: 1rem 0; }
        .nav-item { display: flex; align-items: center; gap: 16px; padding: 14px 20px; margin: 4px 12px; border-radius: 12px; color: #444; font-weight: 500; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .nav-item:hover { background: #f5f0ff; }
        .nav-item.active { background: #f3e9ff; color: var(--primary); font-weight: 600; }
        .chevron { margin-left: auto; transition: transform 0.3s; }
        .chevron.rotated { transform: rotate(180deg); }
        .sub-menu { margin-left: 60px; padding: 8px 0; }
        .sub-menu a { display: block; padding: 8px 0; color: #666; font-size: 0.95rem; text-decoration: none; }
        .sub-menu a:hover, .sub-menu a.sub-active { color: var(--primary); font-weight: 500; }
        .logout-section { padding: 1rem; border-top: 1px solid #eee; }
        .logout-btn { width: 100%; display: flex; align-items: center; gap: 16px; padding: 14px 20px; background: #ffeaea; color: #e74c3c; border: none; border-radius: 12px; font-weight: 500; cursor: pointer; }
        .logout-btn:hover { background: #ffc7c7; }
      `}} />
    </>
  );
};

export default AdminSidebar;


// src/admin/layout/AdminSidebar.tsx
// import React, { useState } from "react";
// import "./layout.css";
// import {
//   LayoutDashboard,
//   Briefcase,
//   FileText,
//   Megaphone,
//   Users,
//   HelpCircle,
//   ChevronDown,
//   Users2,
//   LucideBriefcaseBusiness,
//   PinIcon,
//   LogOut,
// } from "lucide-react";
// import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import { logoutUser } from "../../api/api";

// interface AdminSidebarProps {
//   isOpen: boolean;
//   closeSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, closeSidebar }) => {
//   const [openMenus, setOpenMenus] = useState<string[]>(["Jobs"]);
//   const navigate = useNavigate();

//   const toggleMenu = (menu: string) => {
//     setOpenMenus((prev) =>
//       prev.includes(menu)
//         ? prev.filter((m) => m !== menu)
//         : [...prev, menu]
//     );
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       localStorage.removeItem("token");
//       localStorage.removeItem("userRole");
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//       alert("Error logging out");
//     }
//   };

//   // Helper to create NavLink with auto-close on mobile
//   const SidebarLink = ({
//     to,
//     children,
//     icon,
//   }: {
//     to: string;
//     children: React.ReactNode;
//     icon: React.ReactNode;
//   }) => (
//     <NavLink
//       to={to}
//       className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
//       onClick={closeSidebar} // Closes sidebar on click (mobile)
//     >
//       {icon}
//       <span>{children}</span>
//     </NavLink>
//   );

//   return (
//     <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
//       {/* Logo */}
//       <div className="sidebar-logo">
//         <img src={logo} alt="We Konnects Logo" />
//       </div>

//       {/* Scrollable Navigation */}
//       <div className="sidebar-nav-scrollable">
//         <nav className="sidebar-nav">
//           {/* Dashboard */}
//           <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard size={20} />}>
//             Dashboard
//           </SidebarLink>

//           {/* Users */}
//           <SidebarLink to="/admin/users" icon={<Users2 size={20} />}>
//             Users
//           </SidebarLink>

//           {/* Categories */}
//           <SidebarLink to="/admin/categories" icon={<LucideBriefcaseBusiness size={20} />}>
//             Categories
//           </SidebarLink>

//           {/* Groups */}
//           <div className="nav-group">
//             <div
//               className="nav-item"
//               onClick={() => toggleMenu("groups")}
//             >
//               <Users size={20} />
//               <span>Groups</span>
//               <ChevronDown className={`chevron ${openMenus.includes("groups") ? "rotated" : ""}`} />
//             </div>

//             {openMenus.includes("groups") && (
//               <div className="sub-menu">
//                 <NavLink to="/admin/groups/create-group" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Create Group
//                 </NavLink>
//                 <NavLink to="/admin/groups/info" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Groups Information
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Locations */}
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("locations")}>
//               <PinIcon size={20} />
//               <span>Locations</span>
//               <ChevronDown className={`chevron ${openMenus.includes("locations") ? "rotated" : ""}`} />
//             </div>

//             {openMenus.includes("locations") && (
//               <div className="sub-menu">
//                 <NavLink to="/admin/locations/create-states" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Create State
//                 </NavLink>
//                 <NavLink to="/admin/locations/states-list" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   States List
//                 </NavLink>
//                 <NavLink to="/admin/locations/create-cities" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Create City
//                 </NavLink>
//                 <NavLink to="/admin/locations/cities-list" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Cities List
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Business Listing */}
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("Business")}>
//               <Briefcase size={20} />
//               <span>Business Listing</span>
//               <ChevronDown className={`chevron ${openMenus.includes("Business") ? "rotated" : ""}`} />
//             </div>

//             {openMenus.includes("Business") && (
//               <div className="sub-menu">
//                 <NavLink to="/admin/business/add" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Add New
//                 </NavLink>
//                 <NavLink to="/admin/business/list" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Business Pending List
//                 </NavLink>
//                 <NavLink to="/admin/business/expire-listings" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Expire Listings
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Events */}
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("events")}>
//               <Megaphone size={20} />
//               <span>Events</span>
//               <ChevronDown className={`chevron ${openMenus.includes("events") ? "rotated" : ""}`} />
//             </div>

//             {openMenus.includes("events") && (
//               <div className="sub-menu">
//                 <NavLink to="/admin/events/create-event" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Create Event
//                 </NavLink>
//                 <NavLink to="/admin/events/list" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Event List
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Jobs */}
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("Jobs")}>
//               <FileText size={20} />
//               <span>Jobs</span>
//               <ChevronDown className={`chevron ${openMenus.includes("Jobs") ? "rotated" : ""}`} />
//             </div>

//             {openMenus.includes("Jobs") && (
//               <div className="sub-menu">
//                 <NavLink to="/admin/jobs/education" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Education Info
//                 </NavLink>
//                 <NavLink to="/admin/jobs/apply-list" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Apply Job List
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Post Jobs */}
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("Post Jobs")}>
//               <Megaphone size={20} />
//               <span>Post Jobs</span>
//               <ChevronDown className={`chevron ${openMenus.includes("Post Jobs") ? "rotated" : ""}`} />
//             </div>

//             {openMenus.includes("Post Jobs") && (
//               <div className="sub-menu">
//                 <NavLink to="/admin/jobs/profile" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Create Profile
//                 </NavLink>
//                 <NavLink to="/admin/jobs/post" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Post Job
//                 </NavLink>
//                 <NavLink to="/admin/jobs/list" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Jobs List
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Premium Leads */}
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("Premium Leads")}>
//               <Users size={20} />
//               <span>Premium Leads</span>
//               <ChevronDown className={`chevron ${openMenus.includes("Premium Leads") ? "rotated" : ""}`} />
//             </div>

//             {openMenus.includes("Premium Leads") && (
//               <div className="sub-menu">
//                 <NavLink to="/admin/leads" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   Total Leads
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Inquiries */}
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("Inquiries")}>
//               <HelpCircle size={20} />
//               <span>My Inquiries</span>
//               <ChevronDown className={`chevron ${openMenus.includes("Inquiries") ? "rotated" : ""}`} />
//             </div>

//             {openMenus.includes("Inquiries") && (
//               <div className="sub-menu">
//                 <NavLink to="/admin/inquiries" className={({ isActive }) => (isActive ? "sub-active" : "")} onClick={closeSidebar}>
//                   List of Inquiries
//                 </NavLink>
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>

//       {/* Logout Button */}
//       <div className="logout-section">
//         <button className="logout-btn" onClick={handleLogout}>
//           <LogOut size={20} />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;