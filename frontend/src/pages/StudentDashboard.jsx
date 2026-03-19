import Layout from "../components/Layout";
import studentBg from "../assets/student.jpg";

function StudentDashboard() {
  return (
    <Layout bgImage={studentBg} >

      <h1 className="text-3xl font-bold mb-8 text-gray-700">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          📘 Assignments
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          ⏰ Reminders
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          🎉 Events
        </div>

      </div>

    </Layout>
  );
}

export default StudentDashboard;