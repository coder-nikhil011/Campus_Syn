import React from "react";

function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>CampusSyn Login</h2>

      <form>
        <input 
          type="text" 
          placeholder="Enter UID / Account Number" 
        />

        <br /><br />

        <input 
          type="password" 
          placeholder="Enter Password" 
        />

        <br /><br />

        <select>
          <option>Select Role</option>
          <option>Student</option>
          <option>Teacher</option>
          <option>Organizer</option>
          <option>Admin</option>
        </select>

        <br /><br />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;