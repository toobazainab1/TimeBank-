import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Always open new page from TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/auth");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img
          src="/timebanklogo.png"
          alt="Time Bank Logo"
          style={{ width: "45px", height: "45px", marginRight: "12px" }}
        />
        Time Bank
      </div>

      <div style={styles.links}>
        <Link
          to="/"
          style={isActive("/") ? styles.activeLink : styles.link}
        >
          Home
        </Link>
        <Link
          to="/skills"
          style={isActive("/skills") ? styles.activeLink : styles.link}
        >
          Skills
        </Link>
        <Link
          to="/sessions"
          style={isActive("/sessions") ? styles.activeLink : styles.link}
        >
          Sessions
        </Link>
        <Link
          to="/impact"
          style={isActive("/impact") ? styles.activeLink : styles.link}
        >
          Our Impact
        </Link>
        <Link
          to="/mission"
          style={isActive("/mission") ? styles.activeLink : styles.link}
        >
          Our Mission
        </Link>
        <Link
          to="/contact"
          style={isActive("/contact") ? styles.activeLink : styles.link}
        >
          Contact
        </Link>

        {!user ? (
          <Link to="/auth" style={styles.loginBtn}>
            Login
          </Link>
        ) : (
          <>
            <Link
              to="/dashboard"
              style={isActive("/dashboard") ? styles.activeLink : styles.link}
            >
              Dashboard
            </Link>
            {/* Single logout button ONLY in navbar — removed from dashboard header */}
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 25px",
    backgroundColor: "#1f2937",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },
  link: {
    color: "#d1d5db",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "4px 0",
    borderBottom: "2px solid transparent",
    transition: "color 0.2s, border-color 0.2s",
  },
  activeLink: {
    color: "#2563eb",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "700",
    padding: "4px 0",
    borderBottom: "2px solid #2563eb",
  },
  loginBtn: {
    backgroundColor: "#2563eb",
    color: "#000",
    padding: "7px 16px",
    borderRadius: "6px",
    fontWeight: "700",
    textDecoration: "none",
    fontSize: "14px",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "7px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
};

export default Header;