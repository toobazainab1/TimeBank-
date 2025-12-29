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
    password: "", // <-- backend expects password
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Simple validation
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
      const res = await fetch("http://localhost:5000/api/auth/signup", { // ✅ fixed URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // Store backend user object with token and _id
      localStorage.setItem("currentUser", JSON.stringify(data));

      setError("");
      if (onSignupSuccess) onSignupSuccess(data);
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="auth-form" onSubmit={handleSignup}>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
        />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <select name="category" onChange={handleChange}>
          <option value="">Select Skill Category</option>
          <option>Computer Science</option>
          <option>Art</option>
          <option>Education</option>
          <option>Business</option>
        </select>

        <select name="role" onChange={handleChange}>
          <option value="">You are a</option>
          <option>Student</option>
          <option>Freelancer</option>
          <option>Professional</option>
          <option>Other</option>
        </select>

        <textarea
          name="reason"
          placeholder="Why did you join this platform?"
          onChange={handleChange}
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
