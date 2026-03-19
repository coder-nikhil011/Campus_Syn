import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FacultyLogin() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !role) return alert("Select Role");
    if (step === 2 && !uid) return alert("Enter User ID");
    setStep(step + 1);
  };

  const handleLogin = () => {
    if (!password) return alert("Enter Password");
    if (role === "Teacher") {
      navigate("/teacher-dashboard");
    } else if (role === "Organizer") {
      navigate("/organizer-dashboard");
    } else {
      alert("Invalid role");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <img
        src="/faculty.jpg"
        alt="faculty background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/5"></div>

      {/* Login Box */}
      <div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-xl text-white w-80">
        {/* Dynamic Heading */}
        <h2 className="text-xl mb-4 text-center">
          {role ? `Faculty Role : ${role}` : "Faculty Login"}
        </h2>

        {step === 1 && (
          <>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black"
            >
              <option value="">Select Role</option>
              <option>Teacher</option>
              <option>Organizer</option>
            </select>
            <button
              onClick={handleNext}
              className="w-full bg-white text-blue-600 py-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
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

        {step === 3 && (
          <>
            {/* Show role + UID at top */}
            <p className="mb-4 bg-white text-black px-3 py-2 rounded text-center">
              Role: {role} | User ID: {uid}
            </p>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-white/30 text-black placeholder-gray-700"
            />

            <div className="mb-4">
              <p className="bg-white text-black px-3 py-2 rounded text-center">
                7G5K9
              </p>
              <input
                type="text"
                placeholder="Enter Captcha"
                className="w-full mt-2 p-3 rounded bg-white/30 text-black placeholder-gray-700"
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