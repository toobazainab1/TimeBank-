import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ── SVG Eye Icons — professional, no emojis ─────────────── */
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

/* ── Password Strength ───────────────────────────────────── */
const getStrength = (pw) => {
  if (!pw) return null;
  if (pw.length < 6)                        return { label: "Weak",   color: "#ef4444", w: "30%" };
  if (pw.length < 10 || !/[0-9]/.test(pw)) return { label: "Fair",   color: "#f59e0b", w: "60%" };
  return                                           { label: "Strong", color: "#22c55e", w: "100%" };
};

/* ── Inject Styles ───────────────────────────────────────── */
const injectStyles = () => {
  if (document.querySelector('[data-auth-v3]')) return;
  const css = `
    .auth-root {
      min-height: 88vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f5f9;
      padding: 40px 20px;
      font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;
    }
    .auth-wrap {
      width: 100%;
      max-width: 460px;
      animation: authUp 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    @keyframes authUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    .auth-card {
      background: #fff;
      border-radius: 16px;
      padding: 32px 28px;
      box-shadow: 0 8px 30px rgba(15,23,42,0.10);
      border: 1px solid #e5e7eb;
    }
    .auth-brand {
      text-align: center;
      margin-bottom: 22px;
    }
    .auth-brand-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 4px 0;
    }
    .auth-brand-sub {
      font-size: 13px;
      color: #64748b;
      margin: 0;
    }

    /* Tabs */
    .auth-tabs {
      display: flex;
      background: #f1f5f9;
      border-radius: 10px;
      padding: 4px;
      gap: 4px;
      margin-bottom: 22px;
    }
    .auth-tab {
      flex: 1;
      padding: 9px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      background: transparent;
      color: #64748b;
      transition: all 0.2s;
      font-family: inherit;
    }
    .auth-tab.active {
      background: #2563eb;
      color: #fff;
      box-shadow: 0 2px 8px rgba(37,99,235,0.3);
    }

    /* Alert */
    .auth-err {
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 14px;
      background: #fff1f2;
      color: #9f1239;
      border: 1px solid #fecdd3;
      animation: authUp 0.2s ease;
    }

    /* Form */
    .auth-form { display: flex; flex-direction: column; gap: 12px; }
    .auth-field-label {
      font-size: 13px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 4px;
      display: block;
    }
    .auth-input,
    .auth-select {
      padding: 10px 13px;
      border-radius: 8px;
      border: 1.5px solid #d1d5db;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      color: #0f172a;
      background: #fafafa;
      font-family: inherit;
      transition: border-color 0.18s, box-shadow 0.18s;
    }
    .auth-input:focus, .auth-select:focus {
      outline: none;
      border-color: #2563eb;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.10);
    }
    .auth-input::placeholder { color: #9ca3af; }

    /* Password row */
    .auth-pw-wrap { position: relative; }
    .auth-pw-wrap .auth-input { padding-right: 42px; }
    .auth-eye {
      position: absolute;
      right: 11px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: #9ca3af;
      display: flex;
      align-items: center;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.18s;
    }
    .auth-eye:hover { color: #2563eb; }

    /* Strength bar */
    .auth-strength-bg {
      height: 4px;
      background: #e5e7eb;
      border-radius: 4px;
      margin-top: 5px;
      overflow: hidden;
    }
    .auth-strength-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s, background 0.3s;
    }
    .auth-strength-txt {
      font-size: 11px;
      font-weight: 700;
      margin-top: 2px;
    }

    /* Two col */
    .auth-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

    /* Submit */
    .auth-submit {
      padding: 11px;
      border-radius: 8px;
      border: none;
      background: #2563eb;
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      width: 100%;
      margin-top: 4px;
      font-family: inherit;
      transition: background 0.18s, transform 0.14s, box-shadow 0.18s;
      letter-spacing: 0.2px;
    }
    .auth-submit:hover:not(:disabled) {
      background: #1d4ed8;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(37,99,235,0.35);
    }
    .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }

    /* Switch */
    .auth-switch { text-align: center; font-size: 13px; color: #64748b; margin-top: 10px; }
    .auth-switch-btn {
      background: none; border: none; color: #2563eb;
      font-weight: 700; cursor: pointer; font-size: 13px; padding: 0;
      font-family: inherit;
    }
    .auth-switch-btn:hover { text-decoration: underline; }

    @media (max-width: 500px) {
      .auth-card { padding: 22px 16px; }
      .auth-two-col { grid-template-columns: 1fr; }
    }
  `;
  const el = document.createElement("style");
  el.setAttribute("data-auth-v3", "true");
  el.appendChild(document.createTextNode(css));
  document.head.appendChild(el);
};

/* ══════════════════════════════════════
   LOGIN
══════════════════════════════════════ */
const Login = ({ onSuccess, toSignup }) => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Email and password are required.");
    setLoading(true);
    try {
      const res  = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Login failed. Check your credentials.");
      else { localStorage.setItem("currentUser", JSON.stringify(data)); onSuccess(); }
    } catch { setError("Cannot connect to server. Please try again."); }
    finally  { setLoading(false); }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      {error && <div className="auth-err">{error}</div>}

      <div>
        <label className="auth-field-label">Email address</label>
        <input className="auth-input" type="email" placeholder="you@example.com"
          value={email} onChange={e => setEmail(e.target.value)}
          required autoComplete="email" />
      </div>

      <div>
        <label className="auth-field-label">Password</label>
        <div className="auth-pw-wrap">
          <input className="auth-input" type={showPw ? "text" : "password"}
            placeholder="Enter your password" value={password}
            onChange={e => setPassword(e.target.value)}
            required autoComplete="current-password" />
          <button type="button" className="auth-eye"
            onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}>
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <p className="auth-switch">
        Don't have an account?{" "}
        <button type="button" className="auth-switch-btn" onClick={toSignup}>Sign Up</button>
      </p>
    </form>
  );
};

/* ══════════════════════════════════════
   SIGNUP
══════════════════════════════════════ */
const Signup = ({ onSuccess, toLogin }) => {
  const [form, setForm] = useState({
    name: "", age: "", email: "", password: "", phone: "", category: "", role: "",
  });
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const strength = getStrength(form.password);

  const validate = () => {
    if (!form.name.trim())    return "Full name is required.";
    if (!form.email.trim())   return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.password)       return "Password is required.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.age && Number(form.age) < 16) return "Age must be 16 or above.";
    if (!form.category)       return "Please select a skill category.";
    if (!form.role)           return "Please select your role.";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const err = validate();
    if (err) return setError(err);
    setLoading(true);
    try {
      const res  = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Signup failed. Please try again.");
      else { localStorage.setItem("currentUser", JSON.stringify(data)); onSuccess(); }
    } catch { setError("Cannot connect to server. Please try again."); }
    finally  { setLoading(false); }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      {error && <div className="auth-err">{error}</div>}

      <div>
        <label className="auth-field-label">Full Name *</label>
        <input className="auth-input" placeholder="Ayesha Raza"
          value={form.name} onChange={set("name")} required autoComplete="name" />
      </div>

      <div className="auth-two-col">
        <div>
          <label className="auth-field-label">Age</label>
          <input className="auth-input" type="number" min="16" max="100"
            placeholder="21" value={form.age} onChange={set("age")} />
        </div>
        <div>
          <label className="auth-field-label">Phone</label>
          <input className="auth-input" placeholder="+92 300 0000000"
            value={form.phone} onChange={set("phone")} autoComplete="tel" />
        </div>
      </div>

      <div>
        <label className="auth-field-label">Email address *</label>
        <input className="auth-input" type="email" placeholder="you@example.com"
          value={form.email} onChange={set("email")} required autoComplete="email" />
      </div>

      <div>
        <label className="auth-field-label">Password *</label>
        <div className="auth-pw-wrap">
          <input className="auth-input" type={showPw ? "text" : "password"}
            placeholder="Min. 6 characters" value={form.password}
            onChange={set("password")} required autoComplete="new-password" />
          <button type="button" className="auth-eye"
            onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}>
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {strength && (
          <>
            <div className="auth-strength-bg">
              <div className="auth-strength-fill"
                style={{ width: strength.w, background: strength.color }} />
            </div>
            <div className="auth-strength-txt" style={{ color: strength.color }}>
              {strength.label} password
            </div>
          </>
        )}
      </div>

      <div>
        <label className="auth-field-label">Skill Category *</label>
        <select className="auth-select" value={form.category} onChange={set("category")} required>
          <option value="">Select your main skill...</option>
          <option>Computer Science</option>
          <option>Design</option>
          <option>Education</option>
          <option>Business</option>
          <option>Art</option>
          <option>Writing</option>
          <option>Marketing</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="auth-field-label">I am a... *</label>
        <select className="auth-select" value={form.role} onChange={set("role")} required>
          <option value="">Select your role...</option>
          <option value="Student">Student</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Professional">Professional</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </button>
      <p className="auth-switch">
        Already have an account?{" "}
        <button type="button" className="auth-switch-btn" onClick={toLogin}>Sign In</button>
      </p>
    </form>
  );
};

/* ══════════════════════════════════════
   AUTH PAGE
══════════════════════════════════════ */
const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const navigate        = useNavigate();

  useEffect(() => { injectStyles(); }, []);

  return (
    <div className="auth-root">
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-brand">
            <h2 className="auth-brand-title">Time Bank</h2>
            <p className="auth-brand-sub">Exchange skills. Earn time. Build community.</p>
          </div>

          <div className="auth-tabs" role="tablist">
            <button className={`auth-tab${mode === "login"  ? " active" : ""}`}
              onClick={() => setMode("login")}  role="tab">Sign In</button>
            <button className={`auth-tab${mode === "signup" ? " active" : ""}`}
              onClick={() => setMode("signup")} role="tab">Sign Up</button>
          </div>

          {mode === "login"
            ? <Login  onSuccess={() => navigate("/dashboard")} toSignup={() => setMode("signup")} />
            : <Signup onSuccess={() => navigate("/dashboard")} toLogin={() => setMode("login")}  />
          }
        </div>
      </div>
    </div>
  );
};

export default AuthPage;