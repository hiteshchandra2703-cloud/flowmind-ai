import { useState } from "react"
import { Plus, Flag, Calendar, Trash2, CheckCircle2, Circle } from "lucide-react"

const initialTasks = [
  { id: 1, title: "Complete AI project report", priority: "high", due: "Today", done: false },
  { id: 2, title: "Prepare hackathon presentation", priority: "high", due: "Tomorrow", done: false },
  { id: 3, title: "Review ML assignment", priority: "medium", due: "Jun 25", done: false },
  { id: 4, title: "Submit lab record", priority: "low", due: "Jun 27", done: true },
]

const priorityColors = {
  high: "text-red-400 bg-red-950 border-red-800",
  medium: "text-yellow-400 bg-yellow-950 border-yellow-800",
  low: "text-green-400 bg-green-950 border-green-800",
}

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState("")
  const [showInput, setShowInput] = useState(false)

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, {
      id: Date.now(),
      title: newTask,
      priority: "medium",
      due: "No date",
      done: false
    }])
    setNewTask("")
    setShowInput(false)
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

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
        <div className="flex gap-2 mb-4">
          <input
            autoFocus
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Type task and press Enter..."
            className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
          />
          <button onClick={addTask} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
            Add
          </button>
          <button onClick={() => setShowInput(false)} className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg text-sm">
            Cancel
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl p-4 transition-all hover:border-purple-800 ${task.done ? "opacity-50" : ""}`}
          >
            <button onClick={() => toggleTask(task.id)}>
              {task.done
                ? <CheckCircle2 size={20} className="text-purple-400" />
                : <Circle size={20} className="text-gray-600" />
              }
            </button>

            <div className="flex-1">
              <p className={`text-sm font-medium ${task.done ? "line-through text-gray-500" : "text-white"}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={12} className="text-gray-500" />
                <span className="text-xs text-gray-500">{task.due}</span>
              </div>
            </div>

            <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>

            <button onClick={() => deleteTask(task.id)}>
              <Trash2 size={16} className="text-gray-600 hover:text-red-400 transition-colors" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList