import Layout from "../components/Layout";

function TeacherDashboard() {
  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-8 text-white">
        Teacher Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          📘 Manage Assignments
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          👨‍🎓 Students
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          🔔 Notifications
        </div>

      </div>

    </Layout>
  );
}

export default TeacherDashboard;