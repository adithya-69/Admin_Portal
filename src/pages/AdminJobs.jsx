import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    jobType: "",
    category: "",
    contactEmail: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ================= FETCH JOBS ================= */
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:9000/jobs/all");
      if (res.data.success) {
        setJobs(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Jobs Error:", err.response?.data || err.message);
    }
  };

  /* ================= ADD JOB ================= */
  const addJob = async () => {
    if (!newJob.title || !newJob.company) {
      alert("Title and Company are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9000/jobs/create",
        newJob,
        {
          headers: {
            "auth-token": localStorage.getItem("mytoken"),
          },
        }
      );

      if (res.data.success) {
        alert("Job Added Successfully");
        setNewJob({
          title: "",
          company: "",
          location: "",
          description: "",
          jobType: "",
          category: "",
          contactEmail: "",
        });
        fetchJobs();
      }
    } catch (err) {
      console.error("Add Job Error:", err.response?.data || err.message);
      alert("Failed to add job");
    }
  };

  /* ================= DELETE JOB ================= */
  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:9000/jobs/delete/${id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("mytoken"),
          },
        }
      );

      if (res.data.success) {
        alert("Job Deleted");
        fetchJobs();
      }
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      alert("Failed to delete job");
    }
  };

  return (
    <div>
      <h2>Manage Jobs</h2>

      <input
        placeholder="Title"
        value={newJob.title}
        onChange={(e) =>
          setNewJob({ ...newJob, title: e.target.value })
        }
      />

      <input
        placeholder="Company"
        value={newJob.company}
        onChange={(e) =>
          setNewJob({ ...newJob, company: e.target.value })
        }
      />

      <input
        placeholder="Location"
        value={newJob.location}
        onChange={(e) =>
          setNewJob({ ...newJob, location: e.target.value })
        }
      />

      <input
        placeholder="Description"
        value={newJob.description}
        onChange={(e) =>
          setNewJob({ ...newJob, description: e.target.value })
        }
      />

      {/* NEW FIELDS */}

      <select
        value={newJob.jobType}
        onChange={(e) =>
          setNewJob({ ...newJob, jobType: e.target.value })
        }
      >
        <option value="">Select Job Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
        <option value="Contract">Contract</option>
      </select>

      <input
        placeholder="Category (IT, Marketing, Finance...)"
        value={newJob.category}
        onChange={(e) =>
          setNewJob({ ...newJob, category: e.target.value })
        }
      />

      <input
        placeholder="Contact Email"
        type="email"
        value={newJob.contactEmail}
        onChange={(e) =>
          setNewJob({ ...newJob, contactEmail: e.target.value })
        }
      />

      <button onClick={addJob}>Add Job</button>

      <table className="app-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Type</th>
            <th>Category</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.jobType}</td>
              <td>{job.category}</td>
              <td>{job.contactEmail}</td>
              <td>
                <button onClick={() => deleteJob(job._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}