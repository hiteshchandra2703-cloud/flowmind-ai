import { useState, useEffect } from "react"
import { Plus, Calendar, Trash2, CheckCircle2, Circle } from "lucide-react"
import VoiceInput from "./VoiceInput"

const initialTasks = [
  { id: 1, title: "Complete AI project report", priority: "high", due: "2026-06-22", done: false },
  { id: 2, title: "Prepare hackathon presentation", priority: "high", due: "2026-06-23", done: false },
  { id: 3, title: "Review ML assignment", priority: "medium", due: "2026-06-25", done: false },
  { id: 4, title: "Submit lab record", priority: "low", due: "2026-06-27", done: true },
]

const priorityColors = {
  high: "text-red-400 bg-red-950 border-red-800",
  medium: "text-yellow-400 bg-yellow-950 border-yellow-800",
  low: "text-green-400 bg-green-950 border-green-800",
}

function isOverdue(due, done) {
  if (done) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(due) < today
}

function formatDate(dateStr) {
  if (!dateStr) return "No date"
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (date.getTime() === today.getTime()) return "Today"
  if (date.getTime() === tomorrow.getTime()) return "Tomorrow"
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function TaskList({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("")
  const [newDue, setNewDue] = useState("")
  const [newPriority, setNewPriority] = useState("medium")
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    localStorage.setItem("flowmind-tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, {
      id: Date.now(),
      title: newTask,
      priority: newPriority,
      due: newDue || new Date().toISOString().split("T")[0],
      done: false
    }])
    setNewTask("")
    setNewDue("")
    setNewPriority("medium")
    setShowInput(false)
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const overdueTasks = tasks.filter(t => isOverdue(t.due, t.done))
  const pendingTasks = tasks.filter(t => !t.done && !isOverdue(t.due, t.done))
  const doneTasks = tasks.filter(t => t.done)

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">My Tasks</h2>
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {showInput && (
        <div className="bg-gray-900 border border-purple-800 rounded-xl p-4 mb-4 flex flex-col gap-3">
          <input
            autoFocus
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Task title..."
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={newDue}
              onChange={e => setNewDue(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
            />
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={addTask} className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
              Add Task
            </button>
            <VoiceInput onResult={(text) => setNewTask(text)} />
            <button onClick={() => setShowInput(false)} className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {overdueTasks.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-red-400 font-medium mb-2 uppercase tracking-wider">⚠️ Overdue</p>
          <div className="flex flex-col gap-3">
            {overdueTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} overdue />
            ))}
          </div>
        </div>
      )}

      {pendingTasks.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Pending</p>
          <div className="flex flex-col gap-3">
            {pendingTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </div>
        </div>
      )}

      {doneTasks.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Completed</p>
          <div className="flex flex-col gap-3">
            {doneTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task, onToggle, onDelete, overdue }) {
  return (
    <div className={`flex items-center gap-3 bg-gray-900 border rounded-xl p-4 transition-all
      ${overdue ? "border-red-800 hover:border-red-600" : "border-gray-800 hover:border-purple-800"}
      ${task.done ? "opacity-50" : ""}
    `}>
      <button onClick={() => onToggle(task.id)}>
        {task.done
          ? <CheckCircle2 size={20} className="text-purple-400" />
          : <Circle size={20} className={overdue ? "text-red-600" : "text-gray-600"} />
        }
      </button>

      <div className="flex-1">
        <p className={`text-sm font-medium ${task.done ? "line-through text-gray-500" : overdue ? "text-red-300" : "text-white"}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Calendar size={12} className={overdue ? "text-red-500" : "text-gray-500"} />
          <span className={`text-xs ${overdue ? "text-red-400" : "text-gray-500"}`}>
            {overdue ? "⚠️ " : ""}{formatDate(task.due)}
          </span>
        </div>
      </div>

      <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>

      <button onClick={() => onDelete(task.id)}>
        <Trash2 size={16} className="text-gray-600 hover:text-red-400 transition-colors" />
      </button>
    </div>
  )
}

export default TaskList