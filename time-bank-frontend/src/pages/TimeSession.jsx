
import React, { useEffect, useState } from "react";

export default function TimeSession() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    skill: "",
    description: "",
    category: "",
    duration: "",
    role: "",
    credits: "",
  });

  const currentUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  }, []);

  // ================= STYLES (ONLY UI FIXES) =================
  useEffect(() => {
    if (document.querySelector('[data-ts-styles="true"]')) return;

    const css = `
      .ts-root {
        max-width:1100px;
        margin:0 auto;
        padding:20px;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial;
        color:#0f172a;
      }

      .ts-header {
        display:flex;
        justify-content:space-between;
        gap:12px;
        align-items:flex-start;
        margin-bottom:18px;
      }

      .ts-title {
        margin:0;
        font-size:24px;
        font-weight:800;
      }

      .ts-sub {
        margin:6px 0 0 0;
        color:#64748b;
        font-size:14px;
      }

      .ts-layout {
        display:grid;
        gap:18px;
      }

      @media (min-width:900px) {
        .ts-layout {
          grid-template-columns: 1fr 420px;
        }
      }

      .ts-card {
        background:white;
        border-radius:14px;
        padding:16px;
        box-shadow:0 6px 20px rgba(2,6,23,0.06);
        border:1px solid rgba(2,6,23,0.06);
      }

      .ts-card h3 {
        margin-top:0;
        font-weight:800;
        font-size:18px;
        border-bottom:2px solid #e5e7eb;
        padding-bottom:8px;
      }

      .ts-alert {
        padding:10px 12px;
        border-radius:10px;
        font-size:14px;
        margin-bottom:10px;
      }

      .ts-success {
        background:#ecfdf5;
        color:#065f46;
        border:1px solid #bbf7d0;
      }

      .ts-error {
        background:#fff1f2;
        color:#9f1239;
        border:1px solid #fecdd3;
      }

      .ts-list {
        display:grid;
        gap:12px;
      }

      .ts-session {
        display:flex;
        justify-content:space-between;
        gap:12px;
      }

      .ts-meta {
        color:#475569;
        font-size:13px;
      }

      .ts-small {
        font-size:13px;
        color:#64748b;
      }

      .ts-status {
        padding:6px 10px;
        border-radius:999px;
        font-weight:700;
        font-size:12px;
        text-align:center;
      }

      .ts-status.pending {
        background:#fef3c7;
        color:#92400e;
      }

      /* ================= TABLE FIX ================= */
      .ts-table-wrapper {
        width:100%;
        overflow-x:auto;
        margin-top:14px;
      }

      .ts-table {
        width:100%;
        table-layout:fixed;
        border-collapse:collapse;
      }

      .ts-table th {
        background:#1e293b;
        color:white;
        font-weight:700;
        padding:10px;
        text-align:left;
      }

      .ts-table td {
        padding:10px;
        border-bottom:1px solid #e5e7eb;
        word-wrap:break-word;
        overflow-wrap:break-word;
        white-space:normal;
        font-size:14px;
      }

      /* ================= FORM ================= */
      .ts-form {
        display:flex;
        flex-direction:column;
        gap:10px;
      }

      .ts-input,
      .ts-textarea,
      .ts-select {
        padding:10px 12px;
        border-radius:10px;
        border:1px solid #e5e7eb;
        font-size:14px;
        width:100%;
      }

      .ts-textarea {
        min-height:100px;
        resize:vertical;
      }

      .ts-actions {
        display:flex;
        gap:10px;
      }

      .ts-btn {
        padding:10px 14px;
        border-radius:10px;
        cursor:pointer;
        border:none;
        font-weight:700;
      }

      .ts-btn-primary {
        background:#2563eb;
        color:white;
      }

      .ts-btn-ghost {
        background:white;
        border:1px solid #e5e7eb;
      }
    `;

    const style = document.createElement("style");
    style.setAttribute("data-ts-styles", "true");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }, []);

  // ================= FETCH =================
  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    fetch("http://localhost:5000/api/sessions", {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    })
      .then((r) => r.json())
      .then((d) => setSessions(Array.isArray(d) ? d : []))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const payload = { userId: currentUser._id, ...form, status: "pending" };

    try {
      const res = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(payload),
      });
      const saved = await res.json();
      setSessions((p) => [saved, ...p]);
      setForm({ skill:"", description:"", category:"", duration:"", role:"", credits:"" });
    } catch {}
  };

  return (
    <div className="ts-root">
      <div className="ts-header">
        <h2 className="ts-title">Skill Session Requests</h2>
        <p className="ts-sub">
          Request a session to learn or offer to teach.
        </p>
      </div>

      <div className="ts-layout">
        <div className="ts-card">
          <h3>My Session Requests</h3>

          {loading && <div className="ts-small">Loading…</div>}

          <div className="ts-table-wrapper">
            <table className="ts-table">
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Category</th>
                  <th>Role</th>
                  <th>Duration</th>
                  <th>Credits</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s._id}>
                    <td>{s.skill}</td>
                    <td>{s.category}</td>
                    <td>{s.role}</td>
                    <td>{s.duration}</td>
                    <td>{s.credits}</td>
                    <td>{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="ts-card">
          <h3>Request a Session</h3>

          <form className="ts-form" onSubmit={handleSubmit}>
            <input className="ts-input" placeholder="Skill Title" value={form.skill}
              onChange={(e)=>setForm({...form, skill:e.target.value})} />
            <textarea className="ts-textarea" placeholder="Skill Description"
              value={form.description}
              onChange={(e)=>setForm({...form, description:e.target.value})} />
            <select className="ts-select" value={form.category}
              onChange={(e)=>setForm({...form, category:e.target.value})}>
              <option value="">Select Category</option>
              <option>Computer Science</option>
              <option>Design</option>
              <option>Business</option>
            </select>
            <input className="ts-input" placeholder="Duration"
              value={form.duration}
              onChange={(e)=>setForm({...form, duration:e.target.value})} />
            <input className="ts-input" placeholder="Credits"
              value={form.credits}
              onChange={(e)=>setForm({...form, credits:e.target.value})} />
            <select className="ts-select" value={form.role}
              onChange={(e)=>setForm({...form, role:e.target.value})}>
              <option value="">Select Purpose</option>
              <option value="learn">Learn</option>
              <option value="teach">Teach</option>
            </select>

            <div className="ts-actions">
              <button className="ts-btn ts-btn-primary">Submit</button>
              <button type="button" className="ts-btn ts-btn-ghost"
                onClick={()=>setForm({skill:"",description:"",category:"",duration:"",role:"",credits:""})}>
                Clear
              </button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}
