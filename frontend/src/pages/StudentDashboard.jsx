import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [assignments, setAssignments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Check token not just user
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const fetchData = async () => {
      try {
        const [a, e] = await Promise.all([
          API.get("/assignment"),
          API.get("/event"),
        ]);
        setAssignments(a.data);
        setEvents(e.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Correctly filter pending (not submitted by this student)
  const pending = assignments.filter(
    (a) => !a.submissions?.some((s) => s.studentId === user._id)
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">
        Welcome, {user?.name} 👋
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white/20 p-6 rounded-xl text-white">
          📘 Assignments
          <p className="text-2xl font-bold mt-2">{assignments.length}</p>
        </div>
        <div className="bg-white/20 p-6 rounded-xl text-white">
          🎉 Events
          <p className="text-2xl font-bold mt-2">{events.length}</p>
        </div>
        <div className="bg-white/20 p-6 rounded-xl text-white">
          ⏰ Pending
          {/* ✅ Fixed — was showing assignments.length for both */}
          <p className="text-2xl font-bold mt-2">{pending.length}</p>
        </div>
      </div>

      {/* Latest Assignments */}
      <h2 className="text-xl text-white mb-4">Latest Assignments</h2>

      {loading ? (
        <p className="text-white/60">Loading...</p>
      ) : assignments.length === 0 ? (
        <p className="text-white/60">No assignments yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {assignments.slice(0, 3).map((a) => (
            <div key={a._id} className="bg-white/20 p-5 rounded-xl text-white">
              <h3 className="font-bold">{a.title}</h3>
              <p className="text-sm text-white/70">{a.subject}</p>
              <p className="text-xs text-white/50 mt-1">
                Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "—"}
              </p>
              {a.file && (
                <a
                  href={`http://localhost:5000/uploads/${a.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-300 text-sm mt-2 block"
                >
                  📂 View File
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Events */}
      <h2 className="text-xl text-white mt-10 mb-4">Upcoming Events</h2>

      {loading ? (
        <p className="text-white/60">Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-white/60">No events yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {events.slice(0, 3).map((e) => (
            <div key={e._id} className="bg-white/20 p-5 rounded-xl text-white">
              <h3 className="font-bold">{e.title}</h3>
              <p className="text-sm text-white/70">{e.description?.substring(0, 80)}...</p>
              <p className="text-xs text-white/50 mt-1">
                📅 {e.eventDate ? new Date(e.eventDate).toLocaleDateString() : "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default StudentDashboard;