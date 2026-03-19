import { useNavigate } from "react-router-dom";
import campusImg from "../assets/campus.jpg";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center">

      {/* 🔥 Background */}
      <img
        src={campusImg}
        alt="bg"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

      {/* 🔝 Admin Button */}
      <button
        onClick={() => navigate("/admin-login")}
        className="absolute top-5 right-5 bg-white text-blue-600 px-4 py-2 rounded-lg z-10 shadow-md"
      >
        Admin Login
      </button>

      {/* 📦 Content */}
      <div className="relative z-10 text-center text-white">

        <h1
          className="text-5xl md:text-6xl font-bold mb-2 tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Campus<span className="text-blue-400">Syn</span>
        </h1>
        <p className="mb-8">Smart Campus Management System</p>

        <div className="flex gap-8">

          {/* 🎓 Student Portal */}
          <div className="p-8 bg-white/20 backdrop-blur-lg rounded-xl w-64">
            <h2 className="text-xl font-bold mb-4">Student Portal</h2>
            <p className="text-sm mb-4">Access assignments & events</p>

            <button
              onClick={() => navigate("/student-login")}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg"
            >
              Enter
            </button>
          </div>

          {/* 🧑‍🏫 Faculty Portal */}
          <div className="p-8 bg-white/20 backdrop-blur-lg rounded-xl w-64">
            <h2 className="text-xl font-bold mb-4">Faculty Portal</h2>
            <p className="text-sm mb-4">Manage system & events</p>

            <button
              onClick={() => navigate("/faculty-login")}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg"
            >
              Enter
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;