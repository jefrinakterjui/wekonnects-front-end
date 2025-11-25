// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { LogOut, Home,  User,
  
 
//   ChevronDown,

//   BriefcaseBusiness,
//   LinkIcon,
//   HandshakeIcon,
//   StarIcon, } from "lucide-react";
// import { logoutUser } from "../../api/api";
// import logo from "../../assets/logo.png";

// const UserSidebar = () => {
//   const [openMenus, setOpenMenus] = useState<string[]>(["Jobs"]);
//   const navigate = useNavigate();
//     const toggleMenu = (menu: string) => {
//     setOpenMenus((prev) =>
//       prev.includes(menu)
//         ? prev.filter((m) => m !== menu)
//         : [...prev, menu]
//     );
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       localStorage.clear();
//       navigate("/login");
//     } catch (err) {
//       alert("Logout failed");
//     }
//   };

//   return (
//     <aside className="admin-sidebar user-sidebar">
//       <div className="sidebar-logo">
//         <img src={logo} alt="Logo" />
//       </div>

//       <nav className="sidebar-nav">
//         <NavLink to="/user/dashboard" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
//           <Home size={20} />
//           <span>Home</span>
//         </NavLink>
       
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("mybusiness")}>
//                             <BriefcaseBusiness size={20} />
//                             <span>My Buisness</span>
//                             <ChevronDown className="chevron" />
//                   </div>
        
//                   {openMenus.includes("mybusiness") && (
//                     <div className="sub-menu">
//                       <NavLink
//                         to="/user/my-business/add"
//                         className={({ isActive }) => (isActive ? "sub-active" : "")}
//                       >
//                      Add new Business
//                       </NavLink>
//                        <NavLink
//                         to="/user/my-business/profile"
//                         className={({ isActive }) => (isActive ? "sub-active" : "")}
//                       >
//                      Profile
//                       </NavLink>
//                       <NavLink
//                         to="/user/my-business/package"
//                         className={({ isActive }) => (isActive ? "sub-active" : "")}
//                       >
//                        Package
//                       </NavLink>
//                     </div>
//                   )}
//           </div>
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("links")}>
//                             <LinkIcon size={20} />
//                             <span>Links</span>
//                             <ChevronDown className="chevron" />
//                   </div>
        
//                   {openMenus.includes("links") && (
//                     <div className="sub-menu">
//                       <NavLink
//                         to="/user/links/new"
//                         className={({ isActive }) => (isActive ? "sub-active" : "")}
//                       >
//                      create Link
//                       </NavLink>
//                        <NavLink
//                         to="/user/links/all"
//                         className={({ isActive }) => (isActive ? "sub-active" : "")}
//                       >
//                      Links Management
//                       </NavLink>
                      
//                     </div>
//                   )}
//           </div>
//           <div className="nav-group">
//             <div className="nav-item" onClick={() => toggleMenu("deals")}>
//                             <HandshakeIcon size={20} />
//                             <span>Deals</span>
//                             <ChevronDown className="chevron" />
//                   </div>
        
//                   {openMenus.includes("deals") && (
//                     <div className="sub-menu">
//                       <NavLink
//                         to="/user/deal/new"
//                         className={({ isActive }) => (isActive ? "sub-active" : "")}
//                       >
//                      create Deal
//                       </NavLink>
//                        <NavLink
//                         to="/user/deals/all"
//                         className={({ isActive }) => (isActive ? "sub-active" : "")}
//                       >
//                      Deals Management
//                       </NavLink>
                      
//                     </div>
//                   )}
//           </div>
           
              
//             <NavLink to="/user/support" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
//                 <User size={20} />
//                 <span>Support </span>
//               </NavLink>
//                 <NavLink to="/user/rating-review" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
//                 <StarIcon size={20} />
//                 <span>Ratings & Review </span>
//               </NavLink>
//       </nav>

//       <button className="logout-btn" onClick={handleLogout}>
//         <LogOut size={20} />
//         <span>Logout</span>
//       </button>
//     </aside>
//   );
// };

// export default UserSidebar;


import React, { useState } from "react";
import {
  LogOut,
  Home,
  ChevronDown,
  BriefcaseBusiness,
  Link as LinkIcon,
  Handshake,
  Star,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/api";
import logo from "../../assets/logo.png";

const UserSidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
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
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Hamburger Button - Only on mobile when sidebar is closed */}
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
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`user-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="We Konnects Logo" className="sidebar-logo-img" />
          <button
            className="close-sidebar-btn"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        <div className="sidebar-nav-scrollable">
          <nav className="sidebar-nav">
            {/* Dashboard */}
            <NavLink
              to="/user/dashboard"
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <Home size={22} />
              <span>Dashboard</span>
            </NavLink>

            {/* My Business */}
            <div className="nav-group">
              <div
                className="nav-item"
                onClick={() => toggleMenu("mybusiness")}
              >
                <BriefcaseBusiness size={22} />
                <span>My Business</span>
                <ChevronDown
                  className={`chevron ${openMenus.includes("mybusiness") ? "rotated" : ""}`}
                />
              </div>

              {openMenus.includes("mybusiness") && (
                <div className="sub-menu">
                  <NavLink
                    to="/user/my-business/add"
                    className={({ isActive }) => (isActive ? "sub-active" : "")}
                    onClick={closeSidebar}
                  >
                    Add New Business
                  </NavLink>
                  {/* <NavLink
                    to="/user/my-business/profile"
                    className={({ isActive }) => (isActive ? "sub-active" : "")}
                    onClick={closeSidebar}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/user/my-business/package"
                    className={({ isActive }) => (isActive ? "sub-active" : "")}
                    onClick={closeSidebar}
                  >
                    Package
                  </NavLink> */}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="nav-group">
              <div
                className="nav-item"
                onClick={() => toggleMenu("links")}
              >
                <LinkIcon size={22} />
                <span>Links</span>
                <ChevronDown
                  className={`chevron ${openMenus.includes("links") ? "rotated" : ""}`}
                />
              </div>

              {openMenus.includes("links") && (
                <div className="sub-menu">
                  {/* <NavLink
                    to="/user/links/new"
                    className={({ isActive }) => (isActive ? "sub-active" : "")}
                    onClick={closeSidebar}
                  >
                    Create Link
                  </NavLink> */}
                  <NavLink
                    to="/user/links/all"
                    className={({ isActive }) => (isActive ? "sub-active" : "")}
                    onClick={closeSidebar}
                  >
                    Links Management
                  </NavLink>
                </div>
              )}
            </div>

            {/* Deals */}
            <div className="nav-group">
              <div
                className="nav-item"
                onClick={() => toggleMenu("deals")}
              >
                <Handshake size={22} />
                <span>Deals</span>
                <ChevronDown
                  className={`chevron ${openMenus.includes("deals") ? "rotated" : ""}`}
                />
              </div>

              {openMenus.includes("deals") && (
                <div className="sub-menu">
                  <NavLink
                    to="/user/deal/new"
                    className={({ isActive }) => (isActive ? "sub-active" : "")}
                    onClick={closeSidebar}
                  >
                    Create Deal
                  </NavLink>
                  <NavLink
                    to="/user/deals/all"
                    className={({ isActive }) => (isActive ? "sub-active" : "")}
                    onClick={closeSidebar}
                  >
                    Deals Management
                  </NavLink>
                  <NavLink
                    to="/user/deal/rating"
                    className={({ isActive }) => (isActive ? "sub-active" : "")}
                    onClick={closeSidebar}
                  >
                    Deal Rating
                  </NavLink>
                </div>
              )}
            </div>

            {/* Support */}
            {/* <NavLink
              to="/user/support"
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <User size={22} />
              <span>Support</span>
            </NavLink> */}

            {/* Ratings & Reviews */}
            <NavLink
              to="/user/rating-review"
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <Star size={22} />
              <span>Ratings & Reviews</span>
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Embedded CSS - Same as AdminSidebar but tailored for User */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --sidebar-width: 300px;
          --primary: #9C27B0;
          --orange: #FF6C00;
        }

        /* Hamburger Button */
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
          transition: all 0.2s;
        }

        .hamburger-btn.hidden {
          opacity: 0;
          pointer-events: none;
        }

        @media (min-width: 1025px) {
          .hamburger-btn { display: none !important; }
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

        .user-sidebar.open ~ .sidebar-overlay {
          opacity: 1;
          pointer-events: auto;
        }

        /* Sidebar */
        .user-sidebar {
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

        .user-sidebar.open {
          transform: translateX(0);
        }

        @media (min-width: 1025px) {
          .user-sidebar {
            transform: translateX(0) !important;
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
          height: 50px;
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

        /* Nav Scrollable */
        .sidebar-nav-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 0;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          margin: 4px 12px;
          border-radius: 12px;
          color: #444;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .nav-item:hover {
          background: #f3e9ff;
        }

        .nav-item.active {
          background: #e8daf5;
          color: var(--primary);
          font-weight: 600;
        }

        .chevron {
          margin-left: auto;
          transition: transform 0.3s;
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        .sub-menu {
          margin-left: 60px;
          padding: 8px 0;
        }

        .sub-menu a {
          display: block;
          padding: 10px 0;
          color: #666;
          font-size: 0.95rem;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .sub-menu a:hover,
        .sub-menu a.sub-active {
          color: var(--primary);
          font-weight: 500;
          background: #f8f0ff;
          padding-left: 8px;
        }

        /* Logout */
        .logout-section {
          padding: 1rem;
          border-top: 1px solid #eee;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          background: #ffebee;
          color: #e74c3c;
          border: none;
          border-radius: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: #ffc7c7;
        }
      `}} />
    </>
  );
};

export default UserSidebar;