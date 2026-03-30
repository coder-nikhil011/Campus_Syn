import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";          // ✅ was missing
import adminImg from "../assets/student.jpg"; // use your admin asset

// ✅ Simple captcha generator
const generateCaptcha = () => Math.random().toString(36).substring(2, 7).toUpperCase();

function AdminLogin() {
  const [step, setStep] = useState(1);
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [captcha] = useState(generateCaptcha);   // ✅ real random captcha
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!uid.trim()) return alert("Enter Admin ID");
    setStep(2);
  };

  const handleLogin = async () => {
    if (!password.trim()) return alert("Enter password");

    // ✅ Validate captcha before API call
    if (captchaInput.trim().toUpperCase() !== captcha) {
      return alert("❌ Incorrect captcha. Please try again.");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        uid: uid.trim(),
        password: password.trim(),
        role: "admin",
      });

      // ✅ Save token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/admin");   // ✅ fixed route
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <img
        src={adminImg}
        alt="admin background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

      <div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-xl text-white w-80">
        <h2 className="text-xl mb-4 text-center font-bold">
          {uid ? `Admin — ${uid}` : "Admin Login"}
        </h2>

        {/* Step 1 — UID */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter Admin ID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black placeholder-gray-700"
              autoFocus
            />
            <button
              onClick={handleNext}
              className="w-full bg-white text-blue-600 py-2 rounded"
            >
              Next →
            </button>
          </>
        )}

        {/* Step 2 — Password + Captcha */}
        {step === 2 && (
          <>
            <p className="mb-4 bg-white text-black px-3 py-2 rounded text-center flex justify-between">
              <span>{uid}</span>
              <button
                onClick={() => { setStep(1); setPassword(""); setCaptchaInput(""); }}
                className="text-blue-500 text-sm underline"
              >
                Change
              </button>
            </p>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black placeholder-gray-700"
              autoFocus
            />

            {/* ✅ Real captcha */}
            <div className="mb-4">
              <p className="bg-white text-black px-3 py-2 rounded text-center font-mono font-bold tracking-widest select-none">
                {captcha}
              </p>
              <input
                type="text"
                placeholder="Enter captcha above"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full mt-2 p-3 rounded bg-white/30 text-black placeholder-gray-700"
              />
            </div>

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

export default AdminLogin;