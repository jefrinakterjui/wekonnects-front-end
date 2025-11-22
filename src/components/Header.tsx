// import { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";

// /* ---------- ScrollLink (unchanged) ---------- */
// function ScrollLink({
//   to,
//   children,
//   className,
//   onClick,
//   ...props
// }: {
//   to: string;
//   children: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
// }) {
//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const element = document.querySelector(to);
//     if (element) element.scrollIntoView({ behavior: "smooth" });
//     onClick?.();
//   };
//   return (
//     <Link to={to} className={className} onClick={handleClick} {...props}>
//       {children}
//     </Link>
//   );
// }

// /* ---------- Icons (unchanged) ---------- */


// function IconGrowth() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         d="M4 20h16v-2H4v2zM6 10h3v6H6v-6zm5-4h3v10h-3V6zm5 3h3v7h-3V9z"
//         fill="#1777cc"
//       />
//     </svg>
//   );
// }
// function IconBell() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"
//         fill="#1777cc"
//       />
//     </svg>
//   );
// }

// /* ---------- Main Header ---------- */
// export default function Header() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="site-header" role="banner">
//       <div className="container header-inner">
//         {/* LOGO */}
//         <Link className="header-logo" to="/" aria-label="Home">
//           <img src={logo} alt="We Konnects" />
//         </Link>

//         {/* DESKTOP / TABLET NAVIGATION */}
//         <nav className="header-nav" aria-label="Primary">
//           <Link className="header-tagline" to="/home">
//             Home
//           </Link>
//           <Link className="nav-item nav-about" to="/about">
//             About Us
//           </Link>
//           <Link className="nav-item nav-about" to="/leadership">
//             Leadership
//           </Link>
//           <Link className="nav-item nav-about" to="/contact">
//             Contact
//           </Link>
//           <Link className="nav-item nav-about" to="/businesscategories">
//             Business
//           </Link>

//           <Link className="nav-item nav-free" to="/free-listing">
//             <span className="free-pill">BUSINESS</span>
//             <IconGrowth /> Free Listing
//           </Link>

//           <button className="notify-btn" aria-label="Notifications">
//             <IconBell />
//           </button>
//         </nav>

//         {/* CTA + HAMBURGER (always visible on desktop) */}
//         <div className="header-right">
//           <Link className="header-cta desktop-cta" to="/login">
//             Login / Sign Up
//           </Link>

//           {/* Hamburger – hidden on desktop, visible on mobile */}
//           <button
//             className="menu-toggle"
//             aria-label="Open menu"
//             aria-expanded={open}
//             aria-controls="mobile-drawer"
//             onClick={() => setOpen(true)}
//           >
//             <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
//               <path
//                 d="M3 6h18M3 12h18M3 18h18"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* MOBILE DRAWER */}
//         <aside
//           id="mobile-drawer"
//           className={`menu-drawer ${open ? "open" : ""}`}
//           aria-hidden={!open}
//         >
//           <div className="drawer-header">
//             <img src={logo} alt="We Konnects" width={120} />
//             <button
//               className="close-btn"
//               aria-label="Close menu"
//               onClick={() => setOpen(false)}
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24">
//                 <path
//                   d="M6 6l12 12M18 6l-12 12"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="drawer-links">
//             <Link to="/home" onClick={() => setOpen(false)}>
//               Home
//             </Link>
//             <Link to="/about" onClick={() => setOpen(false)}>
//               About Us
//             </Link>
//             <Link to="/leadership" onClick={() => setOpen(false)}>
//               Leadership
//             </Link>
//             <Link to="/contact" onClick={() => setOpen(false)}>
//               Contact
//             </Link>
//             <Link to="/businesscategories" onClick={() => setOpen(false)}>
//               Business
//             </Link>

//             <ScrollLink to="#free-listing" onClick={() => setOpen(false)}>
//               <span className="free-pill">BUSINESS</span>
//               <span style={{ marginRight: 8, display: "inline-flex" }}>
//                 <IconGrowth />
//               </span>
//               Free Listing
//             </ScrollLink>

//             {/* CTA inside drawer */}
//             <Link
//               to="/login"
//               className="header-cta mobile-cta"
//               onClick={() => setOpen(false)}
//             >
//               Login / Sign Up
//             </Link>
//           </div>
//         </aside>
//       </div>
//     </header>
//   );
// }


import { useState, useEffect } from "react";
import { Link,NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

/* ---------- ScrollLink (unchanged) ---------- */
// function ScrollLink({
//   to,
//   children,
//   className,
//   onClick,
//   ...props
// }: {
//   to: string;
//   children: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
// }) {
//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const element = document.querySelector(to);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//     onClick?.();
//   };
//   return (
//     <Link to={to} className={className} onClick={handleClick} {...props}>
//       {children}
//     </Link>
//   );
// }

/* ---------- Icons ---------- */
function IconGrowth() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 20h16v-2H4v2zM6 10h3v6H6v-6zm5-4h3v10h-3V6zm5 3h3v7h-3V9z"
        fill="#1777cc"
      />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"
        fill="#1777cc"
      />
    </svg>
  );
}

/* ---------- Main Header Component ---------- */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close drawer when clicking outside (optional enhancement)
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const drawer = document.getElementById("mobile-drawer");
      if (drawer && !drawer.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        {/* LOGO */}
        <Link className="header-logo" to="/" aria-label="We Konnects - Home">
          <img src={logo} alt="We Konnects" />
        </Link>

        {/* NAVIGATION - Desktop & Tablet */}
        <nav className="header-nav" aria-label="Primary navigation">
          <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "nav-item nav-about active" : "nav-item nav-about"
              }
            >
              About Us
            </NavLink>
                      <NavLink to="/leadership"  className={({ isActive }) => 
                isActive ? "nav-item nav-about active" : "nav-item nav-about"
              }>
            Leadership
          </NavLink>
          <NavLink  to="/contact"  className={({ isActive }) => 
              isActive ? "nav-item nav-about active" : "nav-item nav-about"
            }>
            Contact
          </NavLink>
          <NavLink  className={({ isActive }) => 
            isActive ? "nav-item nav-about active" : "nav-item nav-about"
          } to="/businesscategories">
            Business
          </NavLink>

          <NavLink  className={({ isActive }) => 
            isActive ? "nav-item nav-about active" : "nav-item nav-about"
          } to="/free-listing">
            {/* <span className="free-pill">BUSINESS</span> */}
            <IconGrowth /> Jobs
          </NavLink>

          <button className="notify-btn" aria-label="Notifications">
            <IconBell />
          </button>
        </nav>

        {/* CTA + HAMBURGER */}
        <div className="header-right">
          {/* Desktop CTA */}
          <Link className="header-cta desktop-cta" to="/login">
            Login / Sign Up
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="menu-toggle"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <aside
          id="mobile-drawer"
          className={`menu-drawer ${isOpen ? "open" : ""}`}
          aria-hidden={!isOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="drawer-header">
            <img src={logo} alt="We Konnects" width={120} height="auto" />
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="drawer-links" aria-label="Mobile navigation">
            <Link to="/home" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link to="/leadership" onClick={() => setIsOpen(false)}>
              Leadership
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link to="/businesscategories" onClick={() => setIsOpen(false)}>
              Business
            </Link>

            <Link
              to="/free-listing"
              className="nav-item nav-free"
              onClick={() => setIsOpen(false)}
            >
              <span className="free-pill">BUSINESS</span>
              <span style={{ marginRight: 8, display: "inline-flex" }}>
                <IconGrowth />
              </span>
              Jobs
            </Link>

            <Link
              to="/login"
              className="header-cta"
              onClick={() => setIsOpen(false)}
            >
              Login / Sign Up
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}