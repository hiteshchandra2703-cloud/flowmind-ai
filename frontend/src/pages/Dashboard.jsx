import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import TaskList from "../components/TaskList"
import AIAssistant from "../components/AIAssistant"
import StatsBar from "../components/StatsBar"
import MoodCheckin from "../components/MoodCheckin"

const initialTasks = [
  { id: 1, title: "Complete AI project report", priority: "high", due: "2026-06-22", done: false },
  { id: 2, title: "Prepare hackathon presentation", priority: "high", due: "2026-06-23", done: false },
  { id: 3, title: "Review ML assignment", priority: "medium", due: "2026-06-25", done: false },
  { id: 4, title: "Submit lab record", priority: "low", due: "2026-06-27", done: true },
]

function isOverdue(due, done) {
  if (done) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(due) < today
}

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("flowmind-tasks")
    return saved ? JSON.parse(saved) : initialTasks
  })
  const [mood, setMood] = useState(null)

  const completed = tasks.filter(t => t.done).length
  const overdue = tasks.filter(t => isOverdue(t.due, t.done)).length
  const pending = tasks.filter(t => !t.done && !isOverdue(t.due, t.done)).length
  const total = tasks.length
  const productivity = total === 0 ? 0 : Math.round((completed / total) * 100)

  const stats = { completed, overdue, pending, productivity }

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <MoodCheckin onMoodSelect={(m) => setMood(m)} />
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <StatsBar stats={stats} />
        <div className="flex flex-1 overflow-hidden">
          <TaskList tasks={tasks} setTasks={setTasks} />
          <AIAssistant tasks={tasks} mood={mood} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard