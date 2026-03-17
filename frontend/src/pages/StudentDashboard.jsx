import Sidebar from "../components/Sidebar";

function StudentDashboard(){
  return(
    <div style={{display:"flex"}}>

      <Sidebar />

      <div style={{marginLeft:"240px", padding:"30px"}}>

        <h1>Student Dashboard</h1>

        <div style={{display:"flex",gap:"20px"}}>

          <div className="card">Assignments</div>
          <div className="card">Reminders</div>
          <div className="card">Events</div>

        </div>

      </div>

    </div>
  )
}

export default StudentDashboard