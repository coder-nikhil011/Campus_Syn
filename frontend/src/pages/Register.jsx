import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", uid: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleRegister = async () => {
    if (!form.name || !form.uid || !form.password || !form.role) {
      return alert("Please fill all fields");
    }
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-white w-80 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="UID / Account Number"
          value={form.uid}
          onChange={(e) => set("uid", e.target.value)}
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-400"
        />
        <select
          value={form.role}
          onChange={(e) => set("role", e.target.value)}
          className="w-full p-3 mb-6 rounded bg-white/20 text-white"
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="organizer">Organizer</option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-white text-blue-600 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4 text-white/60">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="underline text-blue-300">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;