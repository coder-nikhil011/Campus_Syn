import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import StudentImg from "../assets/student.jpg";

function StudentLogin() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!uid.trim()) return alert("Enter User ID");
    setLoading(true);
    try {
      const res = await API.post("/auth/check-user", { uid: uid.trim() });
      if (res.data.exists) {
        setStep(2);
      } else {
        alert("User not found ❌");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Error checking user");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!password.trim()) return alert("Enter password");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        uid: uid.trim(),
        password: password.trim(),
        role: "student",  // ✅ lowercase to match ProtectedRoute check
      });

      // ✅ Save token, role AND user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);  // ✅ fixes ProtectedRoute
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/student");  // ✅ fixed — matches App.jsx route
    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">

      {/* Background */}
      <img
        src={StudentImg}
        alt="student background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-8 rounded-xl text-white w-80 shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>

        {/* Step 1 — Enter UID */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter User ID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNext()}  // ✅ Enter key
              className="w-full p-3 mb-4 rounded bg-white/30 text-black placeholder-gray-700"
              autoFocus
            />
            <button
              onClick={handleNext}
              disabled={loading}
              className="w-full bg-white text-blue-600 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Checking..." : "Next →"}
            </button>
          </>
        )}

        {/* Step 2 — Enter Password */}
        {step === 2 && (
          <>
            <div className="mb-4 bg-white text-black px-3 py-2 rounded text-center flex justify-between items-center">
              <span>{uid}</span>
              {/* ✅ Allow going back to change UID */}
              <button
                onClick={() => { setStep(1); setPassword(""); }}
                className="text-blue-500 text-sm underline ml-2"
              >
                Change
              </button>
            </div>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}  // ✅ Enter key
              className="w-full p-3 mb-4 rounded bg-white/30 text-black placeholder-gray-700"
              autoFocus
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white text-blue-600 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default StudentLogin;