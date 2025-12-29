import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Login Component ---------- */
const Login = ({ onLoginSuccess, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Email and password required");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        localStorage.setItem("currentUser", JSON.stringify(data));
        setError("");
        if (onLoginSuccess) onLoginSuccess(data);
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="os-card" role="region" aria-label="Sign in">
      <h3 className="os-title">Sign In</h3>
      {error && <div className="os-error">{error}</div>}
      <form className="os-form" onSubmit={handleLogin}>
        <input
          className="os-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="os-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="os-actions">
          <button
            className="os-btn os-btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Login"}
          </button>
          <button
            type="button"
            className="os-btn os-btn-ghost"
            onClick={() => {
              setEmail("");
              setPassword("");
              setError("");
            }}
          >
            Clear
          </button>
        </div>
        <p className="os-meta">
          Don't have an account?{" "}
          <button
            type="button"
            className="os-link-btn"
            onClick={switchToSignup}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

/* ---------- Signup Component ---------- */
const Signup = ({ onSignupSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    category: "",
    role: "",
    reason: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    for (let key in form)
      if (!form[key]) return setError("All fields are required");
    if (!validateEmail(form.email)) return setError("Invalid email");
    if (+form.age < 16) return setError("Age must be 16 or above");

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        localStorage.setItem("currentUser", JSON.stringify(data));
        setError("");
        if (onSignupSuccess) onSignupSuccess(data);
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="os-card" role="region" aria-label="Create account">
      <h3 className="os-title">Create Account</h3>
      {error && <div className="os-error">{error}</div>}
      <form className="os-form" onSubmit={handleSignup}>
        <input
          name="name"
          className="os-input"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          className="os-input"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          className="os-input"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          className="os-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          className="os-input"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="os-select"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Skill Category</option>
          <option>Computer Science</option>
          <option>Art</option>
          <option>Education</option>
          <option>Business</option>
        </select>
        <select
          name="role"
          className="os-select"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="">You are a</option>
          <option>Student</option>
          <option>Freelancer</option>
          <option>Professional</option>
          <option>Other</option>
        </select>
        <textarea
          name="reason"
          className="os-input"
          placeholder="Why did you join this platform?"
          value={form.reason}
          onChange={handleChange}
          style={{ minHeight: 80 }}
          required
        />
        <div className="os-actions">
          <button
            className="os-btn os-btn-primary"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Creating…" : "Create Account"}
          </button>
          <button
            type="button"
            className="os-btn os-btn-ghost"
            onClick={() => {
              setForm({
                name: "",
                age: "",
                email: "",
                password: "",
                phone: "",
                category: "",
                role: "",
                reason: "",
              });
              setError("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

/* ---------- AuthPage Wrapper ---------- */
const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const handleSuccess = () => navigate("/dashboard");

  useEffect(() => {
    if (document.querySelector('[data-auth-styles="true"]')) return;

    const css = `
      .auth-page-root { min-height:82vh; display:flex; align-items:center; justify-content:center; background:#f1f5f9; padding:40px 20px; }
      .auth-card { width:100%; max-width:500px; display:flex; flex-direction:column; gap:16px; }
      .os-card { background:#fff; border-radius:12px; padding:20px; box-shadow:0 6px 18px rgba(15,23,42,0.06); border:1px solid rgba(2,6,23,0.04); }
      .os-title { font-size:20px; color:#0f172a; margin-bottom:12px; }
      .os-error { padding:12px; text-align:center; color:#b91c1c; border-radius:8px; border:1px solid #fee2e2; background:#fef2f2; margin-bottom:10px; }
      .os-form { display:flex; flex-direction:column; gap:10px; }
      .os-input, .os-select, textarea.os-input { padding:10px 12px; border-radius:10px; border:1px solid #e2e8f0; font-size:14px; }
      .os-input::placeholder { color:#94a3b8; }
      .os-actions { display:flex; gap:10px; flex-wrap:wrap; margin-top:6px; }
      .os-btn { padding:10px 14px; border-radius:10px; border:none; cursor:pointer; font-weight:600; }
      .os-btn-primary { background:#2563eb; color:white; }
      .os-btn-ghost { background:transparent; border:1px solid #e2e8f0; }
      .os-link-btn { background:transparent; border:none; color:#2563eb; cursor:pointer; font-weight:600; padding:0; }
      .auth-toggle { display:flex; background:#eef2ff; border-radius:999px; overflow:hidden; gap:4px; margin-bottom:12px; }
      .auth-toggle button { flex:1; padding:10px; border-radius:999px; border:none; font-weight:600; cursor:pointer; background:transparent; color:#475569; }
      .auth-toggle button.active { background:#2563eb; color:white; }
      @media (max-width:640px) { .auth-card { padding:6px; } }
    `;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-auth-styles", "true");
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
  }, []);

  return (
    <div className="auth-page-root">
      <div className="auth-card os-card" role="main">
        <div className="auth-toggle" role="tablist">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Sign In
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>
        {mode === "login" ? (
          <Login
            onLoginSuccess={handleSuccess}
            switchToSignup={() => setMode("signup")}
          />
        ) : (
          <Signup onSignupSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
