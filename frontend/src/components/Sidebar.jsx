import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-600 to-purple-700 text-white p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-10">CampusSyn</h2>

      <nav className="flex flex-col gap-5">

        <Link className="hover:bg-white/20 p-2 rounded" to="/student">Dashboard</Link>
        <Link className="hover:bg-white/20 p-2 rounded" to="#">Assignments</Link>
        <Link className="hover:bg-white/20 p-2 rounded" to="#">Events</Link>
        <Link className="hover:bg-white/20 p-2 rounded" to="#">Reminders</Link>
        <Link className="hover:bg-red-400 p-2 rounded mt-10" to="/login">Logout</Link>

      </nav>

    </div>
  );
}

export default Sidebar;