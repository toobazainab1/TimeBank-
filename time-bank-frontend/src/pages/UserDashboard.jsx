import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const injectStyles = () => {
  if (document.querySelector('[data-dash-v3]')) return;

  const css = `
    .dash-root {
      padding: 28px 36px;
      min-height: 82vh;
      background: #f8fafc;
      box-sizing: border-box;
      font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;
      animation: dashIn 0.45s ease;
    }

    @keyframes dashIn {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 768px) {
      .dash-root {
        padding: 18px 14px;
      }
    }

    /* User Row */
    .dash-user-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 22px;
    }

    .dash-avatar {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: #e2e8f0;
      color: #0f172a;
      font-size: 20px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .dash-user-name {
      font-size: 19px;
      font-weight: 800;
      color: #0f172a;
    }

    .dash-user-meta {
      font-size: 13px;
      color: #64748b;
      margin-top: 2px;
    }

    .dash-verified {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 999px;
      margin-top: 5px;
    }

    .dash-avg-rating {
      margin-left: auto;
      text-align: center;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 10px 18px;
      box-shadow: 0 2px 8px rgba(15,23,42,0.06);
    }

    .dash-avg-num {
      font-size: 24px;
      font-weight: 900;
      color: #f59e0b;
    }

    .dash-avg-lbl {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 2px;
    }

    /* White Credits Card */
    .dash-credits-banner {
      background: #ffffff;
      border-radius: 18px;
      padding: 26px 30px;
      margin-bottom: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 18px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
      animation: dashIn 0.45s ease 0.08s both;
    }

    .dash-credits-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 8px;
    }

    .dash-credits-value {
      font-size: 54px;
      font-weight: 900;
      line-height: 1;
      color: #0f172a;
    }

    .dash-credits-sub {
      font-size: 13px;
      color: #64748b;
      margin-top: 8px;
    }

    /* Buttons */
    .dash-qa-btns {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .dash-qa-btn {
      background: #f8fafc;
      border: 1px solid #dbe3ee;
      color: #0f172a;
      padding: 10px 18px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.18s ease;
    }

    .dash-qa-btn:hover {
      background: #eef2ff;
      transform: translateY(-2px);
    }

    /* Grid */
    .dash-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    @media (max-width: 900px) {
      .dash-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Cards */
    .dash-card {
      background: #fff;
      padding: 22px;
      border-radius: 14px;
      box-shadow: 0 2px 14px rgba(15,23,42,0.07);
      border: 1px solid #e5e7eb;
    }

    .dash-card-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f1f5f9;
    }

    /* Profile */
    .dash-profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    @media (max-width: 600px) {
      .dash-profile-grid {
        grid-template-columns: 1fr;
      }
    }

    .dash-profile-item {
      background: #f8fafc;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      font-size: 14px;
      color: #0f172a;
    }

    .dash-profile-item strong {
      display: block;
      color: #64748b;
      font-size: 11px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    /* Reviews */
    .dash-reviews-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .dash-review-card {
      background: #f8fafc;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
    }

    .dash-review-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .dash-stars {
      color: #f59e0b;
      font-size: 14px;
    }

    .dash-date {
      font-size: 12px;
      color: #94a3b8;
    }

    .dash-review-comment {
      font-size: 14px;
      color: #0f172a;
    }

    .dash-review-by {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
    }

    .dash-empty {
      text-align: center;
      padding: 36px 20px;
      color: #94a3b8;
    }
  `;

  const el = document.createElement("style");
  el.setAttribute("data-dash-v3", "true");
  el.appendChild(document.createTextNode(css));
  document.head.appendChild(el);
};

const UserDashboard = () => {
  const currentUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  }, []);

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = currentUser?.token;
  const userId = currentUser?.user?._id || currentUser?._id;

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      fetch("http://localhost:5000/api/users", { headers }).then((r) => r.json()),
      fetch(`http://localhost:5000/api/reviews?tutorId=${userId}`, { headers }).then((r) => r.json()),
    ])
      .then(([uData, rData]) => {
        setUser(uData);

        const filtered = Array.isArray(rData)
          ? rData.filter((r) => String(r.userId) !== String(userId))
          : [];

        setReviews(filtered);
      })
      .finally(() => setLoading(false));
  }, [userId, token]);

  if (loading) {
    return (
      <div className="dash-root">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dash-root">
        <div className="dash-card">
          No user found. <Link to="/auth">Sign In</Link>
        </div>
      </div>
    );
  }

  const initials = (user.name || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const credits = user.credits ?? 0;

  const avgRating = reviews.length
    ? (
        reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length
      ).toFixed(1)
    : null;

  return (
    <div className="dash-root">

      <div className="dash-user-row">
        <div className="dash-avatar">{initials}</div>

        <div>
          <div className="dash-user-name">{user.name}</div>
          <div className="dash-user-meta">
            {user.role} • {user.email}
          </div>
          <div className="dash-verified">Verified Member</div>
        </div>

        {avgRating && (
          <div className="dash-avg-rating">
            <div className="dash-avg-num">{avgRating}</div>
            <div className="dash-avg-lbl">Avg Rating</div>
          </div>
        )}
      </div>

      <div className="dash-credits-banner">
        <div>
          <div className="dash-credits-label">
            Available Time Credits
          </div>

          <div className="dash-credits-value">
            {credits}
          </div>

          <div className="dash-credits-sub">
            1 credit = 1 hour of service exchanged
          </div>
        </div>

        <div className="dash-qa-btns">
          <Link to="/sessions" className="dash-qa-btn">
            Offer a Skill
          </Link>

          <Link to="/sessions" className="dash-qa-btn">
            Browse and Request
          </Link>

          <Link to="/impact" className="dash-qa-btn">
            View Impact
          </Link>
        </div>
      </div>

      <div className="dash-grid">

        <div className="dash-card">
          <div className="dash-card-title">
            Profile Summary
          </div>

          <div className="dash-profile-grid">
            {[
              ["Name", user.name || "—"],
              ["Role", user.role || "—"],
              ["Email", user.email || "—"],
              ["Age", user.age ?? "—"],
              ["Skill Category", user.category ?? "—"],
              ["Phone", user.phone ?? "—"],
            ].map(([label, val]) => (
              <div className="dash-profile-item" key={label}>
                <strong>{label}</strong>
                {val}
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">
            Ratings and Feedback
          </div>

          {reviews.length === 0 ? (
            <div className="dash-empty">
              No reviews yet.
            </div>
          ) : (
            <div className="dash-reviews-list">
              {reviews.map((r) => (
                <div
                  key={r._id || r.id}
                  className="dash-review-card"
                >
                  <div className="dash-review-top">
                    <span className="dash-stars">
                      {"★".repeat(r.rating || 0)}
                      {"☆".repeat(5 - (r.rating || 0))}
                    </span>

                    <span className="dash-date">
                      {new Date(
                        r.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="dash-review-comment">
                    {r.comment}
                  </div>

                  <div className="dash-review-by">
                    By: {r.reviewerName || "Anonymous"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;