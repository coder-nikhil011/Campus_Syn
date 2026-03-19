import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = () => {
    if (role === "Student") navigate("/student");
    else if (role === "Teacher") navigate("/teacher");
    else if (role === "Organizer") navigate("/organizer");
    else if (role === "Admin") navigate("/admin");
    else alert("Select role");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">

      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-2xl w-96 text-white">

        <h2 className="text-3xl font-bold mb-6 text-center">
          CampusSyn Login
        </h2>

        <input
          type="text"
          placeholder="UID / Account Number"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/30 placeholder-white focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/30 placeholder-white focus:outline-none"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/30 text-white"
        >
          <option value="">Select Role</option>
          <option className="text-black">Student</option>
          <option className="text-black">Teacher</option>
          <option className="text-black">Organizer</option>
          <option className="text-black">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;