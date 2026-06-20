import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* About */}
        <div style={styles.column}>
          <h3 style={styles.logo}>TIME BANK</h3>
          <p style={styles.text}>
            Time Bank is a skill-exchange platform where people trade time,
            knowledge, and services online without money.
          </p>

          {/* CENTERED SOCIAL ICONS */}
          <div style={styles.socials}>
            <a href="https://www.linkedin.com/company/time-bank-a-skill-exchange-platform/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582700612663" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/time.bankk" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="mailto:timebankk135@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/" style={isActive("/") ? styles.activeLink : styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/skills" style={isActive("/skills") ? styles.activeLink : styles.link}>
                Skills
              </Link>
            </li>
            <li>
              <Link to="/sessions" style={isActive("/sessions") ? styles.activeLink : styles.link}>
                Sessions
              </Link>
            </li>
            <li>
              <Link to="/impact" style={isActive("/impact") ? styles.activeLink : styles.link}>
                Our Impact
              </Link>
            </li>
            <li>
              <Link to="/mission" style={isActive("/mission") ? styles.activeLink : styles.link}>
                Our Mission
              </Link>
            </li>
            <li>
              <Link to="/contact" style={isActive("/contact") ? styles.activeLink : styles.link}>
                Contact
              </Link>
            </li>

            {user && (
              <li>
                <Link to="/dashboard" style={isActive("/dashboard") ? styles.activeLink : styles.link}>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Contact Info</h4>
          <p style={styles.text}><FaPhoneAlt /> +92 300 0000000</p>
          <p style={styles.text}><FaEnvelope /> timebankk135@gmail.com</p>
          <p style={styles.text}>Support available online</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottom}>
        © 2025 Time Bank. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#0f172a",
    color: "#e5e7eb",
    marginTop: "60px",
    animation: "fadeIn 0.8s ease-in-out",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    padding: "50px 8%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  logo: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
  },
  heading: {
    color: "#ffffff",
    fontSize: "18px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.6",
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: 0,
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  activeLink: {
    color: "#38bdf8",
    fontWeight: "bold",
    textDecoration: "none",
  },
  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    fontSize: "22px",
    marginTop: "15px",
  },
  bottom: {
    borderTop: "1px solid #1e293b",
    textAlign: "center",
    padding: "15px",
    fontSize: "13px",
    color: "#9ca3af",
  },
};

export default Footer;
