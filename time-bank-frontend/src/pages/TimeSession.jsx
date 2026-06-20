import React, { useEffect, useState } from "react";

/* ── Styles ─────────────────────────────────────────────── */
const injectStyles = () => {
  if (document.querySelector('[data-ts-v5]')) return;

  const css = `
    .ts-root {
      max-width: 1100px;
      margin: 0 auto;
      padding: 28px 24px;
      font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;
      animation: tsFadeIn 0.5s ease;
    }

    @keyframes tsFadeIn {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .ts-page-header {
      margin-bottom: 22px;
    }

    .ts-page-title {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }

    .ts-page-sub {
      font-size: 14px;
      color: #64748b;
      margin: 6px 0 0 0;
    }

    .ts-layout {
      display: grid;
      gap: 20px;
    }

    @media (min-width: 900px) {
      .ts-layout {
        grid-template-columns: 1fr 380px;
      }
    }

    .ts-card {
      background: #fff;
      border-radius: 16px;
      padding: 22px;
      box-shadow: 0 4px 18px rgba(15,23,42,0.07);
      border: 1px solid rgba(2,6,23,0.05);
      transition: box-shadow 0.2s;
    }

    .ts-card:hover {
      box-shadow: 0 8px 28px rgba(15,23,42,0.10);
    }

    .ts-card h3 {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 16px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #f1f5f9;
    }

    .ts-alert {
      padding: 11px 14px;
      border-radius: 10px;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .ts-success {
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    .ts-error {
      background: #fff1f2;
      color: #9f1239;
      border: 1px solid #fecdd3;
    }

    .ts-empty {
      text-align: center;
      padding: 40px 20px;
      color: #94a3b8;
    }

    .ts-empty-icon {
      font-size: 42px;
      margin-bottom: 12px;
    }

    .ts-table-wrap {
      width: 100%;
      overflow-x: auto;
    }

    .ts-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .ts-table th {
      background: #0f172a;
      color: #fff;
      padding: 10px 12px;
      text-align: left;
      font-size: 13px;
      font-weight: 700;
    }

    .ts-table td {
      padding: 11px 12px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
      word-wrap: break-word;
    }

    .ts-table tr:hover td {
      background: #f8fafc;
    }

    .ts-badge {
      padding: 4px 10px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 12px;
      display: inline-block;
      text-transform: capitalize;
    }

    .ts-badge-pending {
      background: #fef3c7;
      color: #92400e;
    }

    .ts-badge-approved {
      background: #dcfce7;
      color: #166534;
    }

    .ts-badge-completed {
      background: #dbeafe;
      color: #1e40af;
    }

    .ts-badge-rejected {
      background: #fee2e2;
      color: #991b1b;
    }

    .ts-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .ts-label {
      font-size: 13px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 4px;
      display: block;
    }

    .ts-required {
      color: #dc2626;
      margin-left: 2px;
    }

    .ts-input,
    .ts-textarea,
    .ts-select {
      padding: 10px 13px;
      border-radius: 10px;
      border: 1.5px solid #e2e8f0;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      background: #fafafa;
      color: #0f172a;
      transition: 0.2s;
    }

    .ts-input:focus,
    .ts-textarea:focus,
    .ts-select:focus {
      outline: none;
      border-color: #2563eb;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
    }

    .ts-textarea {
      min-height: 85px;
      resize: vertical;
    }

    .ts-actions {
      display: flex;
      gap: 10px;
      margin-top: 4px;
    }

    .ts-btn {
      padding: 11px 16px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      font-weight: 700;
      font-size: 14px;
      transition: 0.2s;
    }

    .ts-btn-primary {
      background: #2563eb;
      color: #fff;
      flex: 1;
    }

    .ts-btn-primary:hover {
      background: #1d4ed8;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(37,99,235,0.35);
    }

    .ts-btn-ghost {
      background: #fff;
      border: 1.5px solid #e2e8f0;
      color: #374151;
    }

    .ts-btn-ghost:hover {
      background: #f8fafc;
    }
  `;

  const el = document.createElement("style");
  el.setAttribute("data-ts-v5", "true");
  el.appendChild(document.createTextNode(css));
  document.head.appendChild(el);
};

const StatusBadge = ({ status }) => {
  const map = {
    pending: "ts-badge-pending",
    approved: "ts-badge-approved",
    completed: "ts-badge-completed",
    rejected: "ts-badge-rejected",
  };

  const cls = map[(status || "pending").toLowerCase()] || "ts-badge-pending";

  return <span className={`ts-badge ${cls}`}>{status}</span>;
};

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
    credits: "",
    role: "",
  });

  const currentUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);

    fetch("http://localhost:5000/api/sessions", {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then((r) => r.json())
      .then((d) => setSessions(Array.isArray(d) ? d : []))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    // Validation
    if (!form.skill.trim()) {
      setErrorMsg("Skill title is required.");
      return;
    }

    if (!form.description.trim()) {
      setErrorMsg("Description is required.");
      return;
    }

    if (!form.category) {
      setErrorMsg("Please select a category.");
      return;
    }

    if (!form.duration) {
      setErrorMsg("Duration is required.");
      return;
    }

    if (Number(form.duration) <= 0) {
      setErrorMsg("Duration must be a positive number.");
      return;
    }

    if (!form.credits) {
      setErrorMsg("Credits are required.");
      return;
    }

    if (Number(form.credits) <= 0) {
      setErrorMsg("Credits must be a positive number.");
      return;
    }

    if (!form.role) {
      setErrorMsg("Please select a purpose.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          ...form,
          duration: Number(form.duration),
          credits: Number(form.credits),
          status: "pending",
        }),
      });

      const saved = await res.json();

      if (!res.ok) {
        throw new Error(saved.error || "Failed to submit session.");
      }

      setSessions((prev) => [saved, ...prev]);

      setSuccessMsg("Session request submitted successfully!");

      setForm({
        skill: "",
        description: "",
        category: "",
        duration: "",
        credits: "",
        role: "",
      });

    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="ts-root">
      <div className="ts-page-header">
        <h2 className="ts-page-title">Skill Session Requests</h2>
        <p className="ts-page-sub">
          Request a session to learn or offer a skill.
        </p>
      </div>

      <div className="ts-layout">

        <div className="ts-card">
          <h3>My Session Requests</h3>

          {loading && <p>Loading...</p>}

          {!loading && sessions.length === 0 && (
            <div className="ts-empty">
              <div className="ts-empty-icon">📋</div>
              <p>No sessions yet.</p>
            </div>
          )}

          {sessions.length > 0 && (
            <div className="ts-table-wrap">
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
                      <td>
                        <StatusBadge status={s.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="ts-card">
          <h3>Request a Session</h3>

          <form className="ts-form" onSubmit={handleSubmit}>

            {successMsg && (
              <div className="ts-alert ts-success">
                ✓ {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="ts-alert ts-error">
                ⚠ {errorMsg}
              </div>
            )}

            <div>
              <label className="ts-label">
                Skill Title
                <span className="ts-required">*</span>
              </label>

              <input
                className="ts-input"
                value={form.skill}
                onChange={(e) =>
                  setForm({ ...form, skill: e.target.value })
                }
              />
            </div>

            <div>
              <label className="ts-label">
                Description
                <span className="ts-required">*</span>
              </label>

              <textarea
                className="ts-textarea"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="ts-label">
                Category
                <span className="ts-required">*</span>
              </label>

              <select
                className="ts-select"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option>Computer Science</option>
                <option>Business</option>
                <option>Art</option>
                <option>Education</option>
              </select>
            </div>

            <div>
              <label className="ts-label">
                Duration
                <span className="ts-required">*</span>
              </label>

              <input
                type="number"
                className="ts-input"
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: e.target.value })
                }
              />
            </div>

            <div>
              <label className="ts-label">
                Credits
                <span className="ts-required">*</span>
              </label>

              <input
                type="number"
                className="ts-input"
                value={form.credits}
                onChange={(e) =>
                  setForm({ ...form, credits: e.target.value })
                }
              />
            </div>

            <div>
              <label className="ts-label">
                Purpose
                <span className="ts-required">*</span>
              </label>

              <select
                className="ts-select"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="">Select Purpose</option>
                <option value="learn">Learn</option>
                <option value="teach">Teach</option>
              </select>
            </div>

            <div className="ts-actions">
              <button className="ts-btn ts-btn-primary" type="submit">
                Submit
              </button>

              <button
                className="ts-btn ts-btn-ghost"
                type="button"
                onClick={() =>
                  setForm({
                    skill: "",
                    description: "",
                    category: "",
                    duration: "",
                    credits: "",
                    role: "",
                  })
                }
              >
                Clear
              </button>
            </div>

          </form>
        </aside>
      </div>
    </div>
  );
}