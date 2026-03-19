import Layout from "../components/Layout";

function AdminDashboard() {
  return (
    <Layout >
      

      <h1 className="text-3xl font-bold mb-8 text-white">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          👨‍🎓 Manage Students
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          👨‍🏫 Manage Teachers
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          ⚙️ System Settings
        </div>

      </div>

    </Layout>
  );
}

export default AdminDashboard;