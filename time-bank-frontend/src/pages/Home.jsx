import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContactUs from "./ContactUs";

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    window.scrollTo(0, 0); // ✅ FIX: always open from top
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section
        style={{
          ...styles.hero,
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Time Bank</h1>
          <h3 style={{ color: "#fff" }}>A Skill Exchange Platform</h3>

          <p style={styles.heroDesc}>
            Time Bank is a community-driven platform where people exchange skills,
            knowledge, and services using time instead of money.
          </p>

          <Link to="/auth">
            <button style={styles.heroBtn}>Get Started</button>
          </Link>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png"
          alt="Time Bank"
          style={styles.heroImg}
        />
      </section>

      {/* OUR MISSION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.sectionText}>
          At Time Bank, our mission is to create a supportive environment where
          time is valued more than money.
        </p>
        <p style={styles.sectionText}>
          We aim to empower students and professionals by enabling skill-sharing
          and collaborative growth.
        </p>

        <Link to="/mission">
          <button
            style={styles.linkBtn}
            onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
          >
            Learn More
          </button>
        </Link>
      </section>

      {/* OUR IMPACT */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>Our Impact</h2>
        <p style={styles.sectionText}>
          Time Bank creates meaningful impact by allowing users to exchange
          valuable skills and services.
        </p>

        <div style={styles.impactContainer}>
          {[
            ["100+", "Hours Exchanged"],
            ["50+", "Skills Shared"],
            ["30+", "Projects Completed"],
            ["200+", "Members Connected"],
          ].map(([num, text]) => (
            <div key={text} style={styles.impactBox}>
              <h3 style={styles.impactNumber}>{num}</h3>
              <p style={styles.impactText}>{text}</p>
            </div>
          ))}
        </div>

        <Link to="/impact">
          <button
            style={styles.linkBtn}
            onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
          >
            Learn More
          </button>
        </Link>
      </section>

      {/* CONTACT – NOT REMOVED */}
      <section style={{ ...styles.section, paddingBottom: "120px" }}>
        <ContactUs />
      </section>
    </div>
  );
};

const styles = {
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "80px 8%",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    transition: "all 0.8s ease",
    flexWrap: "wrap",
  },
  heroContent: { maxWidth: "600px", color: "#fff" },
  heroTitle: { fontSize: "3.5rem" },
  heroDesc: { lineHeight: 1.8, margin: "15px 0", color: "#fff" },
  heroBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 26px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  heroImg: { width: "360px", marginTop: "30px" },

  section: {
    padding: "70px 10%",
    textAlign: "center",
  },
  sectionAlt: {
    padding: "70px 10%",
    background: "#f9fafb",
    textAlign: "center",
  },
  sectionTitle: { fontSize: "2.4rem", marginBottom: "20px" },
  sectionText: {
    maxWidth: "750px",
    margin: "0 auto 15px",
    lineHeight: 1.8,
    color: "#374151",
  },

  impactContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "40px",
  },
  impactBox: {
    background: "#fff",
    border: "2px solid #2563eb",
    borderRadius: "12px",
    padding: "25px",
    width: "180px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  impactNumber: { fontSize: "2rem", color: "#1e3a8a" },
  impactText: { color: "#1e3a8a" },

  linkBtn: {
    marginTop: "30px",
    padding: "10px 22px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default Home;
