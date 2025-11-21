import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Home,  User,
  
 
  ChevronDown,

  BriefcaseBusiness,
  LinkIcon,
  HandshakeIcon,
  StarIcon, } from "lucide-react";
import { logoutUser } from "../../api/api";
import logo from "../../assets/logo.png";

const UserSidebar = () => {
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
      await logoutUser();
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <aside className="admin-sidebar user-sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/user/dashboard" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
       
          <div className="nav-group">
            <div className="nav-item" onClick={() => toggleMenu("mybusiness")}>
                            <BriefcaseBusiness size={20} />
                            <span>My Buisness</span>
                            <ChevronDown className="chevron" />
                  </div>
        
                  {openMenus.includes("mybusiness") && (
                    <div className="sub-menu">
                      <NavLink
                        to="/user/my-business/add"
                        className={({ isActive }) => (isActive ? "sub-active" : "")}
                      >
                     Add new Business
                      </NavLink>
                       <NavLink
                        to="/user/my-business/profile"
                        className={({ isActive }) => (isActive ? "sub-active" : "")}
                      >
                     Profile
                      </NavLink>
                      <NavLink
                        to="/user/my-business/package"
                        className={({ isActive }) => (isActive ? "sub-active" : "")}
                      >
                       Package
                      </NavLink>
                    </div>
                  )}
                </div>

                <NavLink to="/user/my-leads" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <LinkIcon size={20} />
          <span>My Leads</span>

        </NavLink>
        <NavLink to="/user/my-deals" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <HandshakeIcon size={20} />
          <span>My Deals</span>
        </NavLink>
       <NavLink to="/user/support" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <User size={20} />
          <span>Support </span>
        </NavLink>
          <NavLink to="/user/rating-review" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <StarIcon size={20} />
          <span>Ratings & Review </span>
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default UserSidebar;