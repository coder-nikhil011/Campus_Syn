import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import StudentImg from "../assets/student.jpg";

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 7).toUpperCase();

function StudentLogin() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [captcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
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
    } catch {
      alert("Error checking user");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!password.trim()) return alert("Enter password");

    // ✅ CAPTCHA check added
    if (captchaInput.trim().toUpperCase() !== captcha) {
      return alert("❌ Incorrect captcha");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        uid: uid.trim(),
        password: password.trim(),
        role: "student",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/student");
    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <img src={StudentImg} className="absolute w-full h-full object-cover" />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-8 rounded-xl text-white w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>

        {step === 1 && (
          <>
            <input
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="Enter User ID"
              className="w-full p-3 mb-4 rounded bg-white/30 text-black"
            />
            <button onClick={handleNext} className="w-full bg-white text-blue-600 py-2 rounded">
              Next →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black"
            />

            {/* CAPTCHA */}
            <div className="mb-4">
              <p className="bg-white text-black px-3 py-2 rounded text-center font-mono font-bold">
                {captcha}
              </p>
              <input
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter captcha"
                className="w-full mt-2 p-3 rounded bg-white/30 text-black"
              />
            </div>

            <button onClick={handleLogin} className="w-full bg-white text-blue-600 py-2 rounded">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentLogin;