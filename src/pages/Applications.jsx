import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem("mytoken");

      const res = await axios.get(
        "http://localhost:9000/applications/my",
        {
          headers: { "auth-token": token },
        }
      );

      if (res.data?.success) {
        setApps(res.data.data || []);
      }
    } catch (err) {
      console.error("Applications Fetch Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <div className="content">
        <h2 style={{ marginBottom: "20px" }}>Applications</h2>

        <div className="filters">
          <button className="active">All</button>
          <button>Pending</button>
          <button>On-Hold</button>
          <button>Candidate</button>
        </div>

        <table className="app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date Applied</th>
              <th>Company</th>
              <th>Type</th>
              <th>Position</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : apps.length === 0 ? (
              <tr>
                <td colSpan="6">No Applications Found</td>
              </tr>
            ) : (
              apps.map((a) => (
                <tr key={a._id}>
                  <td>{a._id?.slice(-6)}</td>
                  <td>
                    {a.createdAt
                      ? new Date(a.createdAt).toDateString()
                      : "N/A"}
                  </td>
                  <td>{a.job?.company || "N/A"}</td>
                  <td>{a.job?.type || "N/A"}</td>
                  <td>{a.job?.title || "N/A"}</td>
                  <td>{a.status || "Pending"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}