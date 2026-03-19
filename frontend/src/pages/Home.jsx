import campus from "../assets/campus.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Background Image */}
      <img
        src={campus}
        alt="campus"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">

        <h1 className="text-5xl font-bold mb-4">CampusSyn</h1>
        <p className="mb-10 text-lg">
          Smart Campus Management System
        </p>

        <div className="flex gap-10 justify-center">

          <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl w-64 hover:scale-105 transition">

            <h2 className="text-xl font-semibold mb-3">Student Portal</h2>
            <p className="text-sm mb-4">Access assignments & events</p>

            <Link to="/login">
              <button className="bg-white text-blue-600 px-4 py-2 rounded">
                Enter
              </button>
            </Link>

          </div>

          <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl w-64 hover:scale-105 transition">

            <h2 className="text-xl font-semibold mb-3">Faculty Portal</h2>
            <p className="text-sm mb-4">Manage system & events</p>

            <Link to="/login">
              <button className="bg-white text-blue-600 px-4 py-2 rounded">
                Enter
              </button>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;