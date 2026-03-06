import React, { useState, useEffect } from "react";
import axios from "axios";
import { Shield, Trash2, LogOut } from "lucide-react";

const AdminDashboard = ({ onLogout }) => {
  const [adminView, setAdminView] = useState("overview");

  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]); // NEW

  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    category: "",
    salary: "",
    contactEmail: "",
    description: "",
    applyLink: "",
  });

  const token = localStorage.getItem("mytoken");

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([
      fetchJobs(),
      fetchUsers(),
      fetchApplications(),
      fetchFeedbacks(), // NEW
    ]);
  };

  /* ================= FETCH FUNCTIONS ================= */

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:9000/jobs/all");
      if (res.data?.success) {
        setJobs(res.data.data || []);
      }
    } catch (err) {
      console.error("Jobs Fetch Error:", err.response?.data || err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9000/admin/users/getUser",
        { headers: { "auth-token": token } }
      );

      if (res.data?.success) {
        setUsers(res.data.data || []);
      }
    } catch (err) {
      console.error("Users Fetch Error:", err.response?.data || err.message);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9000/api/applications/all",
        { headers: { "auth-token": token } }
      );

      if (res.data?.success) {
        setApplications(res.data.data || []);
      }
    } catch (err) {
      console.error("Applications Fetch Error:", err.response?.data || err.message);
    }
  };

  // ================= FEEDBACK FETCH =================
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9000/feedback/all",
        { headers: { "auth-token": token } }
      );

      if (res.data?.success) {
        setFeedbacks(res.data.data || []);
      }
    } catch (err) {
      console.error("Feedback Fetch Error:", err.response?.data || err.message);
    }
  };

  /* ================= JOB ACTIONS ================= */

  const handleAddJob = async (e) => {
    e.preventDefault();

    if (!jobForm.title || !jobForm.company) {
      alert("Title and Company are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9000/jobs/create",
        jobForm,
        { headers: { "auth-token": token } }
      );

      if (res.data?.success) {
        alert("Job posted successfully");
        setJobForm({
          title: "",
          company: "",
          location: "",
          jobType: "",
          category: "",
          salary: "",
          contactEmail: "",
          description: "",
          applyLink: "",
        });
        fetchJobs();
      }
    } catch (err) {
      console.error("Add Job Error:", err.response?.data || err.message);
      alert("Failed to add job");
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:9000/jobs/delete/${id}`,
        { headers: { "auth-token": token } }
      );

      if (res.data?.success) {
        alert("Job deleted");
        fetchJobs();
      }
    } catch (err) {
      console.error("Delete Job Error:", err.response?.data || err.message);
      alert("Failed to delete job");
    }
  };

  const handleBlockUser = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:9000/admin/users/block/${id}`,
        {},
        { headers: { "auth-token": token } }
      );

      if (res.data?.success) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Block User Error:", err.response?.data || err.message);
      alert("Failed to update user");
    }
  };

  const totalUsers = users.length;
  const blockedUsers = users.filter((u) => u.blocked).length;
  const totalApplications = applications.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="bg-white rounded-xl shadow p-2 mb-8 flex gap-2">
          {["overview", "users", "jobs", "applications", "feedback"].map((view) => (
            <button
              key={view}
              onClick={() => setAdminView(view)}
              className={`px-6 py-3 rounded-lg font-medium transition ${adminView === view
                ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              {view.toUpperCase()}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {adminView === "overview" && (
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white shadow p-6 rounded-xl">
              <p className="text-gray-500">Users</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>

            <div className="bg-white shadow p-6 rounded-xl">
              <p className="text-gray-500">Blocked Users</p>
              <p className="text-2xl font-bold">{blockedUsers}</p>
            </div>

            <div className="bg-white shadow p-6 rounded-xl">
              <p className="text-gray-500">Jobs</p>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </div>

            <div className="bg-white shadow p-6 rounded-xl">
              <p className="text-gray-500">Applications</p>
              <p className="text-2xl font-bold">{totalApplications}</p>
            </div>
          </div>
        )}

        {/* USERS */}
        {adminView === "users" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-6">Registered Users</h3>
            {users.map((user) => (
              <div key={user._id} className="border p-6 rounded-xl mb-6 bg-slate-50">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Name:</b> {user.profile?.name || user.name}</p>
                    <p><b>Phone:</b> {user.phone || "N/A"}</p>
                    <p><b>Status:</b> {user.blocked ? "Blocked" : "Active"}</p>
                  </div>

                  <div className="space-y-2">
                    <p><b>Location:</b> {user.profile?.location || "N/A"}</p>
                    <p><b>Experience:</b> {user.profile?.experience || "N/A"}</p>
                    <p><b>Skills:</b> {user.profile?.skills || "N/A"}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleBlockUser(user._id)}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <Shield size={18} />
                    {user.blocked ? "Unblock User" : "Block User"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}


        {/* JOBS */}
        {adminView === "jobs" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Add New Job</h3>

            <form onSubmit={handleAddJob} className="grid gap-3">

              <input required
                placeholder="Title"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({ ...jobForm, title: e.target.value })
                }
                className="border p-2 rounded"
              />

              <input required
                placeholder="Company"
                value={jobForm.company}
                onChange={(e) =>
                  setJobForm({ ...jobForm, company: e.target.value })
                }
                className="border p-2 rounded"
              />

              <input required
                placeholder="Location"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm({ ...jobForm, location: e.target.value })
                }
                className="border p-2 rounded"
              />

              <select required
                value={jobForm.jobType}
                onChange={(e) =>
                  setJobForm({ ...jobForm, jobType: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
              </select>

              <input required
                placeholder="Category"
                value={jobForm.category}
                onChange={(e) =>
                  setJobForm({ ...jobForm, category: e.target.value })
                }
                className="border p-2 rounded"
              />

              <input required
                placeholder="Salary"
                value={jobForm.salary}
                onChange={(e) =>
                  setJobForm({ ...jobForm, salary: e.target.value })
                }
                className="border p-2 rounded"
              />

              <input required
                type="email"
                placeholder="Contact Email"
                value={jobForm.contactEmail}
                onChange={(e) =>
                  setJobForm({ ...jobForm, contactEmail: e.target.value })
                }
                className="border p-2 rounded"
              />

              <textarea required
                placeholder="Job Description"
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({ ...jobForm, description: e.target.value })
                }
                className="border p-2 rounded"
              />

              <input required
                placeholder="Company Apply Link"
                value={jobForm.applyLink}
                onChange={(e) =>
                  setJobForm({ ...jobForm, applyLink: e.target.value })
                }
                className="border p-2 rounded"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded"
              >
                Post Job
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {jobs.map((job) => (
                <div key={job._id} className="border p-4 rounded">
                  <h4 className="font-bold">{job.title}</h4>
                  <p className="text-sm text-gray-500">{job.company}</p>
                  <p className="text-sm">{job.location}</p>
                  <p className="text-sm">{job.jobType}</p>
                  <p className="text-sm">{job.category}</p>
                  <p className="text-sm">{job.salary}</p>
                  <p className="text-sm">{job.contactEmail}</p>

                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="text-red-600 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPLICATIONS */}
        {adminView === "applications" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">User Applications</h3>

            {applications.map((app) => (
              <div key={app._id} className="border p-4 rounded mb-3">
                <p><b>User:</b> {app.user?.profile?.name || "N/A"}</p>
                <p><b>Email:</b> {app.user?.email}</p>
                <p><b>Job:</b> {app.job?.title}</p>
                <p><b>Company:</b> {app.job?.company}</p>
                <p><b>Status:</b> {app.status}</p>
              </div>
            ))}
          </div>
        )}

        {/* FEEDBACK */}
        {adminView === "feedback" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">User Feedback</h3>

            {feedbacks.length === 0 ? (
              <p className="text-gray-500">No feedback submitted yet.</p>
            ) : (
              feedbacks.map((fb) => (
                <div key={fb._id} className="border p-4 rounded mb-3 bg-slate-50">
                  <p><b>Email:</b> {fb.email}</p>
                  <p><b>Feedback:</b> {fb.message}</p>
                </div>
              ))
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;