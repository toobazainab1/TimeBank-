import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // 🔥 FIX: Always open new page from TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/auth");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img
          src="/timebanklogo.png"
          alt="Logo"
          style={{ width: "45px", height: "45px", marginRight: "12px" }}
        />
        Time Bank
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/skills" style={styles.link}>Skills</Link>
        <Link to="/sessions" style={styles.link}>Sessions</Link>

        {/* 🔥 Separate Pages */}
        <Link to="/impact" style={styles.link}>Our Impact</Link>
        <Link to="/mission" style={styles.link}>Our Mission</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>

        {!user ? (
          <Link to="/auth" style={styles.loginBtn}>Login</Link>
        ) : (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
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
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "#fff",
    cursor: "pointer",
    textDecoration: "none",
  },
  loginBtn: {
    backgroundColor: "#38bdf8",
    color: "#000",
    padding: "6px 12px",
    borderRadius: "5px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;
