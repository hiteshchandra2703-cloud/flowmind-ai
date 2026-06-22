import Sidebar from "../components/Sidebar"
import TaskList from "../components/TaskList"
import AIAssistant from "../components/AIAssistant"
import StatsBar from "../components/StatsBar"

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <StatsBar />
        <div className="flex flex-1 overflow-hidden">
          <TaskList />
          <AIAssistant />
        </div>
      </div>
    </div>
  )
}

export default Dashboard