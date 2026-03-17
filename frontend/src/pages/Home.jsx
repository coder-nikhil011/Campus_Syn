import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <h1 className="title">CampusSyn</h1>
      <p className="subtitle">Smart Campus Management System</p>

      <div className="portal-container">

        <div className="portal-card">
          <h2>Student Portal</h2>
          <p>View assignments, reminders and events</p>
          <Link to="/login">
            <button>Enter</button>
          </Link>
        </div>

        <div className="portal-card">
          <h2>Faculty Portal</h2>
          <p>Manage assignments and campus events</p>
          <Link to="/login">
            <button>Enter</button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;