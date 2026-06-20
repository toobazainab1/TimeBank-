import React, { useState } from "react";

const Signup = ({ onSignupSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    category: "",
    role: "",
    reason: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();

    for (let key in form) {
      if (form[key] === "") {
        setError("All fields are required");
        return;
      }
    }

    if (!validateEmail(form.email)) {
      setError("Invalid email");
      return;
    }

    if (form.age < 16) {
      setError("Age must be 16 or above");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(data));

      setError("");

      if (onSignupSuccess) onSignupSuccess(data);
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  const requiredStyle = {
    color: "#b41a1aff",
    marginLeft: "2px",
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="auth-form" onSubmit={handleSignup}>

        <label>
          Full Name <span style={requiredStyle}>*</span>
        </label>
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <label>
          Age <span style={requiredStyle}>*</span>
        </label>
        <input
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
        />

        <label>
          Email <span style={requiredStyle}>*</span>
        </label>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <label>
          Phone Number <span style={requiredStyle}>*</span>
        </label>
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <label>
          Password <span style={requiredStyle}>*</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <label>
          Skill Category <span style={requiredStyle}>*</span>
        </label>
        <select name="category" onChange={handleChange}>
          <option value="">Select Skill Category</option>
          <option>Computer Science</option>
          <option>Art</option>
          <option>Education</option>
          <option>Business</option>
        </select>

        <label>
          You are a <span style={requiredStyle}>*</span>
        </label>
        <select name="role" onChange={handleChange}>
          <option value="">Select Role</option>
          <option>Student</option>
          <option>Freelancer</option>
          <option>Professional</option>
          <option>Other</option>
        </select>

        <label>
          Why did you join this platform?
          <span style={requiredStyle}>*</span>
        </label>

        <textarea
          name="reason"
          placeholder="Why did you join this platform?"
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            background: "#0f172a",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;