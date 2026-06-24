import { useState, useEffect } from "react"
import { Plus, Target, Trash2, CheckCircle2, Circle, Sparkles } from "lucide-react"

const categoryColors = {
  Study: "text-blue-400 bg-blue-950 border-blue-800",
  Health: "text-green-400 bg-green-950 border-green-800",
  Personal: "text-purple-400 bg-purple-950 border-purple-800",
  Work: "text-yellow-400 bg-yellow-950 border-yellow-800",
}

const suggestedGoals = [
  { title: "Complete 5 tasks this week", category: "Work", target: 5 },
  { title: "Study for 2 hours daily", category: "Study", target: 7 },
  { title: "Exercise 3 times this week", category: "Health", target: 3 },
  { title: "Read for 30 minutes daily", category: "Personal", target: 7 },
  { title: "Finish all high priority tasks", category: "Work", target: 3 },
]

function Goals({ tasks }) {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("flowmind-goals")
    return saved ? JSON.parse(saved) : []
  })
  const [showForm, setShowForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "Study",
    target: 5,
    current: 0,
  })

  useEffect(() => {
    localStorage.setItem("flowmind-goals", JSON.stringify(goals))
  }, [goals])

  const addGoal = () => {
    if (!newGoal.title.trim()) return
    setGoals([...goals, {
      id: Date.now(),
      ...newGoal,
      current: 0,
      done: false,
      createdAt: new Date().toDateString()
    }])
    setNewGoal({ title: "", category: "Study", target: 5, current: 0 })
    setShowForm(false)
  }

  const addSuggestedGoal = (suggested) => {
    setGoals([...goals, {
      id: Date.now(),
      ...suggested,
      current: 0,
      done: false,
      createdAt: new Date().toDateString()
    }])
  }

  const incrementGoal = (id) => {
    setGoals(goals.map(g => {
      if (g.id !== id) return g
      const newCurrent = Math.min(g.current + 1, g.target)
      return { ...g, current: newCurrent, done: newCurrent >= g.target }
    }))
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  const activeGoals = goals.filter(g => !g.done)
  const completedGoals = goals.filter(g => g.done)

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-950">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">My Goals 🎯</h2>
            <p className="text-gray-400 text-sm mt-1">Set goals and track your progress</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-900 border border-purple-800 rounded-xl p-5 mb-6">
            <h3 className="text-white font-medium mb-4">Create New Goal</h3>
            <div className="flex flex-col gap-3">
              <input
                autoFocus
                type="text"
                value={newGoal.title}
                onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Goal title..."
                className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
              />
              <div className="flex gap-3">
                <select
                  value={newGoal.category}
                  onChange={e => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
                >
                  <option>Study</option>
                  <option>Health</option>
                  <option>Personal</option>
                  <option>Work</option>
                </select>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={e => setNewGoal({ ...newGoal, target: parseInt(e.target.value) })}
                  placeholder="Target"
                  min="1"
                  max="100"
                  className="w-24 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={addGoal} className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                  Create Goal
                </button>
                <button onClick={() => setShowForm(false)} className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {goals.length === 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-purple-400" />
              <p className="text-purple-400 text-sm font-medium">AI Suggested Goals</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {suggestedGoals.map((goal, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-purple-800 transition-all">
                  <div>
                    <p className="text-white text-sm font-medium">{goal.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border mt-1 inline-block ${categoryColors[goal.category]}`}>
                      {goal.category}
                    </span>
                  </div>
                  <button
                    onClick={() => addSuggestedGoal(goal)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs transition-all"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeGoals.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">Active Goals</p>
            <div className="flex flex-col gap-3">
              {activeGoals.map(goal => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onIncrement={incrementGoal}
                  onDelete={deleteGoal}
                />
              ))}
            </div>
          </div>
        )}

        {completedGoals.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">Completed Goals 🎉</p>
            <div className="flex flex-col gap-3">
              {completedGoals.map(goal => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onIncrement={incrementGoal}
                  onDelete={deleteGoal}
                  completed
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function GoalCard({ goal, onIncrement, onDelete, completed }) {
  const progress = Math.round((goal.current / goal.target) * 100)

  return (
    <div className={`bg-gray-900 border rounded-xl p-5 transition-all
      ${completed ? "border-green-800 opacity-75" : "border-gray-800 hover:border-purple-800"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className={`text-sm font-medium ${completed ? "text-green-400" : "text-white"}`}>
              {completed ? "✅ " : ""}{goal.title}
            </p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[goal.category]}`}>
            {goal.category}
          </span>
        </div>
        <button onClick={() => onDelete(goal.id)}>
          <Trash2 size={16} className="text-gray-600 hover:text-red-400 transition-colors" />
        </button>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{goal.current} / {goal.target}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${completed ? "bg-green-500" : "bg-purple-500"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!completed && (
        <button
          onClick={() => onIncrement(goal.id)}
          className="w-full bg-gray-800 hover:bg-purple-900 border border-gray-700 hover:border-purple-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all"
        >
          + Mark Progress
        </button>
      )}
    </div>
  )
}

export default Goals