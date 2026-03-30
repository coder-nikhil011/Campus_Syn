import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import facultyImg from "../assets/student.jpg";

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 7).toUpperCase();

function FacultyLogin() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [captcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ FIXED: UID check like Student/Admin
  const handleNext = async () => {
    if (step === 1 && !role) return alert("Select a role");

    if (step === 2) {
      if (!uid.trim()) return alert("Enter User ID");

      setLoading(true);
      try {
        const res = await API.post("/auth/check-user", { uid: uid.trim() });

        if (res.data.exists) {
          setStep(3);
        } else {
          alert("User not found ❌");
        }
      } catch {
        alert("Error checking user");
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleLogin = async () => {
    if (!password.trim()) return alert("Enter password");

    // ✅ CAPTCHA check
    if (captchaInput.trim().toUpperCase() !== captcha) {
      return alert("❌ Incorrect captcha");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        uid: uid.trim(),
        password: password.trim(),
        role: role.toLowerCase(),
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Navigate based on role
      if (role === "Teacher") {
        navigate("/teacher");
      } else {
        navigate("/organizer");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <img src={facultyImg} className="absolute w-full h-full object-cover" />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

      <div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-xl text-white w-80">
        <h2 className="text-xl mb-4 text-center font-bold">
          {role ? `${role} Login` : "Faculty Login"}
        </h2>

        {/* Step 1 — Select Role */}
        {step === 1 && (
          <>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black"
            >
              <option value="">Select Role</option>
              <option value="Teacher">Teacher</option>
              <option value="Organizer">Organizer</option>
            </select>

            <button
              onClick={handleNext}
              className="w-full bg-white text-blue-600 py-2 rounded"
            >
              Next →
            </button>
          </>
        )}

        {/* Step 2 — UID */}
        {step === 2 && (
          <>
            <input
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="Enter User ID"
              className="w-full p-3 mb-4 rounded bg-white/30 text-black"
            />

            <button
              onClick={handleNext}
              className="w-full bg-white text-blue-600 py-2 rounded"
            >
              Next →
            </button>
          </>
        )}

        {/* Step 3 — Password + Captcha */}
        {step === 3 && (
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

            <button
              onClick={handleLogin}
              className="w-full bg-white text-blue-600 py-2 rounded"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FacultyLogin;