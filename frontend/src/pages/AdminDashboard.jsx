import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

const ROLES = ["student", "teacher", "organizer"];

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("student");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    uid: "", name: "", password: "", role: "student",
    department: "", semester: "", subject: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  // ✅ Fetch users by role
  const fetchUsers = async (role) => {
    setLoading(true);
    try {
      const res = await API.get(`/user/role/${role}`);
      setUsers(res.data);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(activeTab); }, [activeTab]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // ✅ Create user
  const handleCreate = async () => {
    if (!form.uid || !form.name || !form.password || !form.role) {
      return setMsg({ text: "UID, Name, Password aur Role required hai", type: "error" });
    }
    if (form.password.length < 4) {
      return setMsg({ text: "Password kam se kam 4 characters ka hona chahiye", type: "error" });
    }
    setFormLoading(true);
    setMsg({ text: "", type: "" });
    try {
      await API.post("/auth/register", form);
      setMsg({ text: `✅ ${form.role} account create ho gaya! UID: ${form.uid} | Pass: ${form.password}`, type: "success" });
      setForm({ uid: "", name: "", password: "", role: activeTab, department: "", semester: "", subject: "" });
      fetchUsers(activeTab);
    } catch (err) {
      setMsg({ text: err.response?.data?.msg || "Error creating user", type: "error" });
    } finally {
      setFormLoading(false);
    }
  };

  // ✅ Delete user
  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" ko delete karna chahte ho?`)) return;
    try {
      await API.delete(`/user/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      alert("Delete nahi hua, dobara try karo");
    }
  };

  // ✅ Toggle active/inactive
  const handleToggle = async (id) => {
    try {
      const res = await API.put(`/user/${id}/toggle`);
      setUsers((prev) =>
        prev.map((u) => u._id === id ? { ...u, isActive: res.data.isActive } : u)
      );
    } catch {
      alert("Status change nahi hua");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8 text-white">Admin Dashboard</h1>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {["student", "teacher", "organizer"].map((role) => (
          <button
            key={role}
            onClick={() => { setActiveTab(role); setShowForm(false); }}
            className={`p-6 rounded-xl text-white text-left transition ${
              activeTab === role
                ? "bg-white/40 border-2 border-white"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            <div className="text-2xl mb-1">
              {role === "student" ? "👨‍🎓" : role === "teacher" ? "👨‍🏫" : "🎯"}
            </div>
            <div className="font-semibold capitalize">{role}s</div>
            <div className="text-sm opacity-70">Manage {role}s</div>
          </button>
        ))}
      </div>

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white font-semibold capitalize">
          {activeTab}s List
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setMsg({ text: "", type: "" });
            setForm({ uid: "", name: "", password: "", role: activeTab, department: "", semester: "", subject: "" });
          }}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
        >
          {showForm ? "✕ Close" : `+ Add ${activeTab}`}
        </button>
      </div>

      {/* ── Create Form ── */}
      {showForm && (
        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 mb-6 text-white">
          <h3 className="text-lg font-bold mb-4 capitalize">New {activeTab} Account</h3>

          {msg.text && (
            <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${
              msg.type === "success" ? "bg-green-500/30 text-green-200" : "bg-red-500/30 text-red-200"
            }`}>
              {msg.text}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wide opacity-70 mb-1 block">UID *</label>
              <input
                className="w-full p-3 rounded bg-white/30 text-black placeholder-gray-600"
                placeholder="e.g. STU2024001"
                value={form.uid}
                onChange={(e) => set("uid", e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide opacity-70 mb-1 block">Full Name *</label>
              <input
                className="w-full p-3 rounded bg-white/30 text-black placeholder-gray-600"
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide opacity-70 mb-1 block">Password *</label>
              <input
                className="w-full p-3 rounded bg-white/30 text-black placeholder-gray-600"
                placeholder="Min 4 characters"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide opacity-70 mb-1 block">Role</label>
              <select
                className="w-full p-3 rounded bg-white/30 text-black"
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Student fields */}
            {form.role === "student" && (
              <>
                <div>
                  <label className="text-xs uppercase tracking-wide opacity-70 mb-1 block">Semester</label>
                  <input
                    className="w-full p-3 rounded bg-white/30 text-black placeholder-gray-600"
                    type="number" placeholder="e.g. 3" min={1} max={8}
                    value={form.semester}
                    onChange={(e) => set("semester", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide opacity-70 mb-1 block">Department</label>
                  <input
                    className="w-full p-3 rounded bg-white/30 text-black placeholder-gray-600"
                    placeholder="e.g. Computer Science"
                    value={form.department}
                    onChange={(e) => set("department", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Teacher fields */}
            {form.role === "teacher" && (
              <div>
                <label className="text-xs uppercase tracking-wide opacity-70 mb-1 block">Subject</label>
                <input
                  className="w-full p-3 rounded bg-white/30 text-black placeholder-gray-600"
                  placeholder="e.g. Mathematics"
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleCreate}
            disabled={formLoading}
            className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {formLoading ? "Creating..." : `Create ${form.role} Account`}
          </button>
        </div>
      )}

      {/* ── Users Table ── */}
      <div className="bg-white/20 backdrop-blur-lg rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-white opacity-60">Loading...</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-white opacity-60">
            Koi {activeTab} nahi mila. Upar se add karo.
          </div>
        ) : (
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20 text-left">
                <th className="p-4 uppercase text-xs tracking-wide opacity-60">Name</th>
                <th className="p-4 uppercase text-xs tracking-wide opacity-60">UID</th>
                {activeTab === "student" && (
                  <>
                    <th className="p-4 uppercase text-xs tracking-wide opacity-60">Semester</th>
                    <th className="p-4 uppercase text-xs tracking-wide opacity-60">Department</th>
                  </>
                )}
                {activeTab === "teacher" && (
                  <th className="p-4 uppercase text-xs tracking-wide opacity-60">Subject</th>
                )}
                <th className="p-4 uppercase text-xs tracking-wide opacity-60">Status</th>
                <th className="p-4 uppercase text-xs tracking-wide opacity-60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-white/10 hover:bg-white/10 transition">
                  <td className="p-4 font-semibold">{u.name}</td>
                  <td className="p-4">
                    <code className="bg-white/20 px-2 py-1 rounded text-xs">{u.uid}</code>
                  </td>
                  {activeTab === "student" && (
                    <>
                      <td className="p-4">{u.semester ? `Sem ${u.semester}` : "—"}</td>
                      <td className="p-4">{u.department || "—"}</td>
                    </>
                  )}
                  {activeTab === "teacher" && (
                    <td className="p-4">{u.subject || "—"}</td>
                  )}
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      u.isActive ? "bg-green-500/30 text-green-200" : "bg-red-500/30 text-red-200"
                    }`}>
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleToggle(u._id)}
                      className="bg-yellow-500/30 hover:bg-yellow-500/50 text-yellow-200 px-3 py-1 rounded text-xs"
                    >
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(u._id, u.name)}
                      className="bg-red-500/30 hover:bg-red-500/50 text-red-200 px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default AdminDashboard;