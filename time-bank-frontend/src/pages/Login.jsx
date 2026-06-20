import React, { useState } from "react";

const Login = ({ onLoginSuccess, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users");
      const users = await res.json();

      const user = users.find((u) => u.email === email);

      if (!user) {
        setError("User not found");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      setError("");
      if (onLoginSuccess) onLoginSuccess(user);
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="auth-form" onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "10px", color: "#aaa" }}>
        Don't have an account?{" "}
        <span
          onClick={switchToSignup}
          style={{ color: "#38bdf8", cursor: "pointer" }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
