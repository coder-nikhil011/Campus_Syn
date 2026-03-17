import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>CampusSyn</h2>

      <Link to="/student">Student Dashboard</Link>
      <Link to="/teacher">Teacher Dashboard</Link>
      <Link to="/organizer">Organizer Dashboard</Link>
      <Link to="/admin">Admin Dashboard</Link>

    </div>
  );
}

export default Sidebar;