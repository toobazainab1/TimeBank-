import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OurImpact = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);

  const [form, setForm] = useState({
    session: "",
    rating: "",
    review: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?.user?._id) {
      setError("You must be logged in to submit a review");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser?.user?._id,
          tutorId: currentUser?.user?._id,
          rating: Number(form.rating),
          comment: form.review,
          reviewerName: currentUser?.user?.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setSubmitted(true);
      setError("");
      setForm({ session: "", tutorId: "", rating: "", review: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Inject component-scoped styles
    const css = `
      .oi-root { max-width:1100px; height:82vh; margin:0 auto; padding:20px; font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial; color:#0f172a }
      .oi-header { text-align:center; margin-bottom:30px }
      .oi-title { font-size:clamp(24px,2.5vw,36px); font-weight:700; margin-bottom:12px }
      .oi-subtitle { color:#64748b; font-size:16px; margin-bottom:40px }

      .oi-stats { display:flex; justify-content:center; gap:40px; flex-wrap:wrap; margin-bottom:50px }
      .oi-stat { background:white; padding:20px 25px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05); text-align:center; min-width:120px }
      .oi-stat h3 { font-size:28px; margin:0 0 6px }
      .oi-stat p { margin:0; color:#475569; font-size:14px }

      .oi-card { background:white; padding:20px; border-radius:12px; box-shadow:0 6px 20px rgba(2,6,23,0.04); margin-bottom:30px; max-width:500px; margin-left:auto; margin-right:auto }
      .oi-input, .oi-select, .oi-textarea { width:100%; padding:10px 12px; border-radius:10px; border:1px solid #e6eef8; margin-bottom:12px; font-size:14px }
      .oi-textarea { min-height:100px; resize:vertical }
      .oi-btn { width:100%; padding:10px; border:none; border-radius:8px; font-weight:600; cursor:pointer; background:#2563eb; color:white; margin-top:10px }
      .oi-alert { padding:10px 12px; border-radius:10px; font-size:14px; margin-bottom:12px }
      .oi-success { background:#ecfdf5; color:#065f46; border:1px solid #bbf7d0 }
      .oi-error { background:#fff1f2; color:#9f1239; border:1px solid #fecdd3 }
    `;
    const style = document.createElement("style");
    style.setAttribute("data-oi-styles", "true");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="oi-root">
      <header className="oi-header">
        <h2 className="oi-title">Our Impact</h2>
        <p className="oi-subtitle">
          Empowering users to share skills and grow together.
        </p>
      </header>

      {/* ===== IMPACT STATS ===== */}
      <div className="oi-stats">
        <div className="oi-stat">
          <h3>1000+</h3>
          <p>Hours Exchanged</p>
        </div>
        <div className="oi-stat">
          <h3>500+</h3>
          <p>Active Users</p>
        </div>
        <div className="oi-stat">
          <h3>50+</h3>
          <p>Skills Shared</p>
        </div>
      </div>

      {/* ===== REVIEW FORM ===== */}
      <div className="oi-card">
        <h3 style={{ marginTop: 0, marginBottom: 15 }}>Submit Your Review</h3>

        {!currentUser?.user && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "red" }}>
              You must be logged in to submit a review.
            </p>
            <Link to="/auth">
              <button className="oi-btn">Login / Sign Up</button>
            </Link>
          </div>
        )}

        {currentUser?.user && (
          <>
            {submitted && (
              <div className="oi-alert oi-success">
                Review submitted successfully 👍
              </div>
            )}
            {error && <div className="oi-alert oi-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input
                className="oi-input"
                placeholder="Session Title"
                value={form.session}
                onChange={(e) => setForm({ ...form, session: e.target.value })}
                required
              />
              {/* <input
                className="oi-input"
                placeholder="Tutor User ID"
                value={form.tutorId}
                onChange={(e) => setForm({ ...form, tutorId: e.target.value })}
                required
              /> */}
              <select
                className="oi-select"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                required
              >
                <option value="">Give Rating</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>
              <textarea
                className="oi-textarea"
                placeholder="Write your review"
                value={form.review}
                onChange={(e) => setForm({ ...form, review: e.target.value })}
                required
              />
              <button type="submit" className="oi-btn">
                Submit Review
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OurImpact;
