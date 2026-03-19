import Layout from "../components/Layout";

function OrganizerDashboard() {
  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-8 text-white">
        Organizer Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          🎉 Create Event
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          📅 Manage Events
        </div>

        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-white">
          👥 Participants
        </div>

      </div>

    </Layout>
  );
}

export default OrganizerDashboard;