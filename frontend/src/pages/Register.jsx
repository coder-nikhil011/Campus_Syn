function Register() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

      <input type="text" placeholder="Full Name" />
      <br /><br />

      <input type="text" placeholder="UID / Account Number" />
      <br /><br />

      <input type="password" placeholder="Password" />
      <br /><br />

      <select>
        <option>Select Role</option>
        <option>Student</option>
        <option>Teacher</option>
        <option>Organizer</option>
      </select>

      <br /><br />

      <button>Register</button>
    </div>
  );
}

export default Register;