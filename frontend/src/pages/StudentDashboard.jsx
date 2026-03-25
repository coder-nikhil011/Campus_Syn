import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import bg from "../assets/student.jpg";

function StudentDashboard() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser || {});
  const [assignments, setAssignments] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  // 🔥 Fetch Data
  useEffect(() => {
    if (!user) navigate("/");

    const fetchData = async () => {
      try {
        const a = await API.get("/assignment");
        const e = await API.get("/event");

        setAssignments(a.data);
        setEvents(e.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen relative">

      {/* 🌄 Background */}
      <img
        src={bg}
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 📌 Sidebar */}
      <div className="w-64 h-screen bg-black/40 backdrop-blur-lg text-white p-6 z-10">
        <h2 className="text-2xl font-bold mb-10">CampusSyn</h2>

        <div className="flex flex-col gap-4">
          <button onClick={() => navigate("/student-dashboard")} className="text-left hover:text-blue-300">🏠 Dashboard</button>
          <button onClick={() => navigate("/assignments")} className="text-left hover:text-blue-300">📘 Assignments</button>
          <button onClick={() => navigate("/events")} className="text-left hover:text-blue-300">🎉 Events</button>
          <button className="text-left hover:text-blue-300">👤 Profile</button>
        </div>
      </div>

      {/* 📦 Main */}
      <div className="flex-1 z-10">

        {/* 🔝 Topbar */}
        <div className="flex justify-end p-4">
          <div className="relative">

            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 cursor-pointer bg-white/20 px-4 py-2 rounded-lg"
            >
              <img
                src={user?.photo || "https://i.pravatar.cc/40"}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">
                {user?.name || "Student"}
              </span>
            </div>

            {open && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow w-40">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  👤 Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  🚪 Logout
                </button>
              </div>
            )}

          </div>
        </div>

        {/* 📊 Content */}
        <div className="p-10">

          <h1 className="text-3xl font-bold text-white mb-8">
            Welcome, {user?.name} 👋
          </h1>

          {/* 🔥 Stats */}
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
              <p className="text-2xl font-bold mt-2">{assignments.length}</p>
            </div>

          </div>

          {/* 📘 Latest Assignments */}
          <h2 className="text-xl text-white mb-4">Latest Assignments</h2>

          <div className="grid grid-cols-3 gap-6">
            {assignments.slice(0, 3).map((a) => (
              <div key={a._id} className="bg-white/20 p-5 rounded-xl text-white">
                <h3 className="font-bold">{a.title}</h3>
                <p className="text-sm">{a.subject}</p>

                {a.file && (
                  <a
                    href={`http://localhost:5000/uploads/${a.file}`}
                    target="_blank"
                    className="text-blue-300 text-sm mt-2 block"
                  >
                    📂 View File
                  </a>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;