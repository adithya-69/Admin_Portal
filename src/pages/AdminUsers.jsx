import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9000/admin/users/getUser",
        {
          headers: {
            "auth-token": localStorage.getItem("mytoken"),
          },
        }
      );

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Registered Users</h2>

      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white shadow-md rounded-xl p-6 mb-6 border"
        >
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Status:</strong> {user.blocked ? "Blocked" : "Active"}</p>
            </div>

            <div>
              <p><strong>Location:</strong> {user.profile?.location || "N/A"}</p>
              <p><strong>Experience:</strong> {user.profile?.experience || "N/A"}</p>
              <p><strong>Skills:</strong> {user.profile?.skills || "N/A"}</p>
            </div>

          </div>

          {/* Resume Section */}
          {user.profile?.resume?.data && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Resume:</p>

              <a
                href={user.profile.resume.data}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                View Resume
              </a>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}