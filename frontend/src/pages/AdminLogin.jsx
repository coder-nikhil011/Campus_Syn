import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import adminImg from "../assets/student.jpg";

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 7).toUpperCase();

function AdminLogin() {
  const [step, setStep] = useState(1);
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [captcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Step 1: Check UID from DB
  const handleNext = async () => {
    if (!uid.trim()) return alert("Enter Admin ID");

    setLoading(true);
    try {
      const res = await API.post("/auth/check-user", { uid: uid.trim() });

      if (res.data.exists) {
        setStep(2);
      } else {
        alert("Admin not found ❌");
      }
    } catch {
      alert("Error checking admin");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Login
  const handleLogin = async () => {
    if (!password.trim()) return alert("Enter password");

    // ✅ Captcha validation
    if (captchaInput.trim().toUpperCase() !== captcha) {
      return alert("❌ Incorrect captcha");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        uid: uid.trim(),
        password: password.trim(),
        role: "admin",   // 🔥 internally set (no UI needed)
      });

      // ✅ Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <img
        src={adminImg}
        alt="admin background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

      {/* Card */}
      <div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-xl text-white w-80">
        <h2 className="text-xl mb-4 text-center font-bold">
          {uid ? `Admin — ${uid}` : "Admin Login"}
        </h2>

        {/* Step 1: UID */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter Admin ID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black"
              autoFocus
            />
            <button
              onClick={handleNext}
              disabled={loading}
              className="w-full bg-white text-blue-600 py-2 rounded"
            >
              {loading ? "Checking..." : "Next →"}
            </button>
          </>
        )}

        {/* Step 2: Password + Captcha */}
        {step === 2 && (
          <>
            <div className="mb-4 bg-white text-black px-3 py-2 rounded text-center flex justify-between">
              <span>{uid}</span>
              <button
                onClick={() => {
                  setStep(1);
                  setPassword("");
                  setCaptchaInput("");
                }}
                className="text-blue-500 text-sm underline"
              >
                Change
              </button>
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black"
              autoFocus
            />

            {/* CAPTCHA */}
            <div className="mb-4">
              <p className="bg-white text-black px-3 py-2 rounded text-center font-mono font-bold tracking-widest">
                {captcha}
              </p>
              <input
                type="text"
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full mt-2 p-3 rounded bg-white/30 text-black"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white text-blue-600 py-2 rounded"
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