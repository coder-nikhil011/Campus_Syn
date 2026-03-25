import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import StudentImg from "../assets/student.jpg";

function StudentLogin() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = async () => {
    if (!uid) return alert("Enter User ID");

    try {
      const res = await API.post("/auth/check-user", { uid });

      if (res.data.exists) {
        setStep(2);   // ✅ only if user exists
      } else {
        alert("User not found ❌");
      }
    } catch (err) {
      console.log("ERROR:", err);   // 🔥 show full error
      alert(err.response?.data?.msg || "Error checking user");
    }
  };

  const handleLogin = async () => {
  try {
    console.log("Sending:", { uid, password, role: "Student" });

    const res = await API.post("/auth/login", {
      uid: uid.toString().trim(),
      password: password.trim(),
      role: "Student",
    });

    console.log("Response:", res.data);

    // ✅ Save JWT token and user info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/student-dashboard"); // ✅ redirect after login
  } catch (err) {
    console.log(err.response?.data); 
    alert(err.response?.data?.msg || "Login Failed");
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

        <h2 className="text-2xl font-bold mb-6 text-center">
          Student Login
        </h2>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter User ID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black placeholder-gray-700"
            />

            <button
              onClick={handleNext}
              className="w-full bg-white text-blue-600 py-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <p className="mb-4 bg-white text-black px-3 py-2 rounded text-center">
              User ID: {uid}
            </p>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black placeholder-gray-700"
            />

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

export default StudentLogin;