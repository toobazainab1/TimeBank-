import React, { useEffect, useState } from "react";

/* IMAGE IMPORTS (FaceMasks style) */
import webDevelopment from "./assets/web-development.png";
import timebankk from "./assets/timebankk.jpg.png";

export default function OurSkills() {
  const [skillsData, setSkillsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  /* ---------------- STYLES ---------------- */
  useEffect(() => {
    const css = `
      .tb-skills { font-family: sans-serif; color:#0f172a; }

      /* HERO BANNER */
      .tb-hero {
        background: linear-gradient(135deg, #1f2937, #0f172a);
        color:white;
        padding:60px 24px;
      }
      .tb-hero-inner {
        max-width:1100px;
        margin:auto;
        display:grid;
        grid-template-columns: 1.3fr 1fr;
        gap:30px;
        align-items:center;
      }
      .tb-hero h1 { font-size:38px; margin-bottom:12px; }
      .tb-hero p { color:#cbd5f5; font-size:16px; line-height:1.6; }
      .tb-hero img { width:100%; border-radius:16px; }

      /* INFO BOX */
      .tb-info-box {
        max-width:1100px;
        margin: -35px auto 40px;
        padding:28px;
        background:white;
        border-radius:18px;
        box-shadow:0 12px 30px rgba(0,0,0,0.08);
        text-align:center;
      }
      .tb-info-box h3 { margin-bottom:10px; }
      .tb-info-box p { color:#475569; }

      /* MAIN LAYOUT */
      .tb-content {
        max-width:1100px;
        margin:auto;
        padding:0 24px 50px;
        display:grid;
        grid-template-columns: 260px 1fr;
        gap:24px;
      }

      /* CATEGORY LIST */
      .tb-categories {
        background:white;
        border-radius:16px;
        padding:20px;
        box-shadow:0 8px 20px rgba(0,0,0,0.06);
        height:fit-content;
      }
      .tb-categories h4 { margin-bottom:12px; }
      .tb-cat {
        padding:10px 12px;
        border-radius:10px;
        cursor:pointer;
        margin-bottom:6px;
        font-size:14px;
      }
      .tb-cat:hover { background:#f1f5f9; }
      .tb-cat.active {
        background:#2563eb;
        color:white;
        font-weight:600;
      }

      /* SKILL CARDS */
      .tb-grid {
        display:grid;
        grid-template-columns: repeat(auto-fill,minmax(260px,1fr));
        gap:18px;
      }
      .tb-card {
        background:white;
        border-radius:16px;
        padding:16px;
        box-shadow:0 8px 18px rgba(0,0,0,0.07);
      }
      .tb-badge {
        background:#eef2ff;
        color:#3730a3;
        font-size:12px;
        padding:4px 10px;
        border-radius:999px;
        display:inline-block;
        margin-bottom:8px;
      }
      .tb-card h4 { margin-bottom:6px; }
      .tb-card p { font-size:14px; color:#475569; }

      @media(max-width:900px){
        .tb-hero-inner,
        .tb-content {
          grid-template-columns:1fr;
        }
      }
    `;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  /* ---------------- DATA ---------------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/skills")
      .then(res => res.json())
      .then(data => setSkillsData(data || []));
  }, []);

  /* 🔹 SKILL IMAGES */
  const skillImages = {
    "Web Development": webDevelopment,
  };

  /* 🔹 CATEGORY LIST */
  const skillCategories = [
    "All",
    "Web Development",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "UI/UX Design",
    "Video Editing",
    "Public Speaking",
    "Data Analysis",
    "Mobile App Development",
    "Social Media Management"
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter(s => s.category === activeCategory);

  /* ---------------- JSX ---------------- */
  return (
    <div className="tb-skills">

      {/* HERO */}
      <section className="tb-hero">
        <div className="tb-hero-inner">
          <div>
            <h1>Exchange Skills. Earn Time.</h1>
            <p>
              Time Bank is a student-powered platform where knowledge is exchanged
              using time credits instead of money.
            </p>
          </div>

          <img src={timebankk} alt="Time Bank" />
        </div>
      </section>

      {/* INFO BOX */}
      <section className="tb-info-box">
        <h3>How Time Bank Works</h3>
        <p>
          Share your skills, earn time credits, and use them to learn from others.
          No money involved only time and knowledge.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="tb-content">

        {/* LEFT CATEGORY LIST */}
        <aside className="tb-categories">
          <h4>Skills</h4>
          {skillCategories.map(cat => (
            <div
              key={cat}
              className={`tb-cat ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </aside>

        {/* RIGHT SKILL CARDS */}
        <div className="tb-grid">
          {filteredSkills.map(skill => (
            <div key={skill._id} className="tb-card">

              {/* IMAGE ONLY FOR WEB & GRAPHIC DESIGN */}
              {skillImages[skill.category] && (
                <img
                  src={skillImages[skill.category]}
                  alt={skill.category}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <span className="tb-badge">{skill.category}</span>
              <h4>{skill.name}</h4>
              <p>Rating: {skill.rating || 4}</p>
              <p>Earn time credits by teaching this skill</p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
