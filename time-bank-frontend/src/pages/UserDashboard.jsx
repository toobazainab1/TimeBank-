import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const currentUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch (e) {
      return null;
    }
  }, []);

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  const token = currentUser?.token;
  const userId = currentUser?.user?._id || currentUser?._id;

  // Inject styling
  useEffect(() => {
    if (document.querySelector('[data-dashboard-styles="true"]')) return;
    const css = `
      .dashboard-root { padding:28px; min-height:82vh; background:linear-gradient(180deg,#f8fafc 0,#f1f5f9 100%); box-sizing:border-box; }
      .dash-header { display:flex; gap:12px; align-items:center; justify-content:space-between; margin-bottom:18px; flex-wrap:wrap; }
      .header-left { display:flex; gap:12px; align-items:center; }
      .avatar { width:64px; height:64px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:#eef2ff; font-weight:700; color:#1e40af; font-size:18px; }
      .user-meta { display:flex; flex-direction:column; }
      .user-name { font-size:18px; font-weight:800; color:#07103a; }
      .user-role { font-size:13px; color:#475569; margin-top:2px; }
      .dash-actions { display:flex; gap:10px; align-items:center; }
      .btn { padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:600; border:none; }
      .btn-ghost { background:transparent; border:1px solid #e2e8f0; color:#0f172a; }
      .dashboard-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
      .dashboard-card { background:#fff; padding:16px; border-radius:12px; box-shadow:0 6px 18px rgba(15,23,42,0.06); border:1px solid rgba(2,6,23,0.04); }
      .card-title { font-size:16px; font-weight:700; color:#0f172a; margin-bottom:8px; }
      .profile-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:8px; }
      .profile-item { background:#fbfbff; padding:10px; border-radius:8px; border:1px dashed #eef2ff; font-size:14px; color:#0f172a; }
      .reviews-list { margin-top:8px; display:flex; flex-direction:column; gap:10px; }
      .review-card { background:#fbfdff; padding:10px; border-radius:10px; border:1px solid #e6eef8; }
      .small-muted { font-size:13px; color:#64748b; }
      @media (max-width:900px) { .dashboard-grid { grid-template-columns:1fr; } .profile-grid { grid-template-columns:1fr; } }
    `;
    const st = document.createElement("style");
    st.setAttribute("data-dashboard-styles", "true");
    st.appendChild(document.createTextNode(css));
    document.head.appendChild(st);
  }, []);

  // Fetch user and reviews
  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // Fetch user
        const uRes = await fetch(`http://localhost:5000/api/users`, { headers });
        const uData = await uRes.json();
        if (!uRes.ok) throw new Error(uData.error || "Failed to fetch user");
        setUser(uData);

        // Fetch reviews
        const rRes = await fetch(`http://localhost:5000/api/reviews?tutorId=${userId}`, { headers });
        const rData = await rRes.json();
        setReviews(Array.isArray(rData) ? rData : []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  if (loading) return <div className="dashboard-root"><p className="small-muted">Loading dashboard…</p></div>;
  if (!user) return <div className="dashboard-root"><div className="dashboard-card"><p>No user logged in. Please sign in.</p></div></div>;

  const initials = (user.name || currentUser?.user?.name || "U")
    .split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="dashboard-root">
      <div className="dash-header">
        <div className="header-left">
          <div className="avatar">{initials}</div>
          <div className="user-meta">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role} • {user.email}</div>
          </div>
        </div>
        <div className="dash-actions">
          <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Profile Summary */}
        <div className="dashboard-card">
          <div className="card-title">Profile Summary</div>
          <div className="profile-grid">
            <div className="profile-item"><strong>Name</strong><div className="small-muted">{user.name}</div></div>
            <div className="profile-item"><strong>Role</strong><div className="small-muted">{user.role}</div></div>
            <div className="profile-item"><strong>Email</strong><div className="small-muted">{user.email}</div></div>
            <div className="profile-item"><strong>Age</strong><div className="small-muted">{user.age ?? "—"}</div></div>
            <div className="profile-item"><strong>Category</strong><div className="small-muted">{user.category ?? "—"}</div></div>
            <div className="profile-item"><strong>Available Credits</strong><div className="small-muted">{user.credits ?? 0}</div></div>
          </div>
        </div>

        {/* Ratings & Feedback */}
        <div className="dashboard-card">
          <div className="card-title">Ratings & Feedback</div>
          {reviews.length === 0 ? <div className="small-muted">No reviews yet.</div> :
            <div className="reviews-list">
              {reviews.map(r => (
                <div key={r._id || r.id} className="review-card">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div><strong>⭐ {r.rating} / 5</strong></div>
                    <div className="small-muted">{new Date(r.createdAt || r.date || Date.now()).toLocaleDateString()}</div>
                  </div>
                  <div style={{ marginTop:6, color:"#0f172a" }}>{r.comment}</div>
                  <div style={{ marginTop:6 }} className="small-muted">By: {r.reviewerName || r.reviewer || "Anonymous"}</div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
