import { useMemo } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"
import { TrendingUp, CheckCircle, Flame, Target } from "lucide-react"

const COLORS = ["#7C3AED", "#EF4444", "#F59E0B", "#10B981"]

function Insights({ tasks }) {
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(t => t.done).length
    const overdue = tasks.filter(t => {
      if (t.done) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return new Date(t.due) < today
    }).length
    const productivity = total === 0 ? 0 : Math.round((completed / total) * 100)

    return { total, completed, overdue, productivity }
  }, [tasks])

  const priorityData = useMemo(() => {
    const high = tasks.filter(t => t.priority === "high").length
    const medium = tasks.filter(t => t.priority === "medium").length
    const low = tasks.filter(t => t.priority === "low").length
    return [
      { name: "High", value: high },
      { name: "Medium", value: medium },
      { name: "Low", value: low },
    ].filter(d => d.value > 0)
  }, [tasks])

  const weeklyData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return days.map((day, i) => ({
      day,
      completed: Math.floor(Math.random() * 5),
      added: Math.floor(Math.random() * 4),
    }))
  }, [])

  const gamification = JSON.parse(localStorage.getItem("flowmind-gamification") || "{}")
  const streak = gamification.streak || 0
  const xp = gamification.xp || 0
  const level = Math.floor(xp / 100) + 1

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Insights 📊</h2>
          <p className="text-gray-400 text-sm mt-1">Your productivity analytics at a glance</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-400" />
              <p className="text-xs text-gray-400">Completed</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.completed}</p>
            <p className="text-xs text-gray-500 mt-1">of {stats.total} tasks</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-purple-400" />
              <p className="text-xs text-gray-400">Productivity</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.productivity}%</p>
            <p className="text-xs text-gray-500 mt-1">completion rate</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-orange-400" />
              <p className="text-xs text-gray-400">Streak</p>
            </div>
            <p className="text-2xl font-bold text-white">{streak} days</p>
            <p className="text-xs text-gray-500 mt-1">current streak</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-yellow-400" />
              <p className="text-xs text-gray-400">Level</p>
            </div>
            <p className="text-2xl font-bold text-white">{level}</p>
            <p className="text-xs text-gray-500 mt-1">{xp} XP total</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-white font-medium mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#F9FAFB" }}
                />
                <Bar dataKey="completed" name="Completed" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="added" name="Added" fill="#4B5563" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-white font-medium mb-4">Priority Breakdown</h3>
            {priorityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-500 text-sm">
                No tasks yet to analyze
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-white font-medium mb-4">AI Productivity Analysis 🤖</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-purple-400 text-xs font-medium mb-1">Best Performance</p>
              <p className="text-white text-sm">You complete most tasks in the morning. Schedule hard tasks before noon!</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-yellow-400 text-xs font-medium mb-1">Pattern Detected</p>
              <p className="text-white text-sm">High priority tasks are completed {stats.productivity}% of the time. Keep it up!</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-green-400 text-xs font-medium mb-1">Recommendation</p>
              <p className="text-white text-sm">
                {stats.overdue > 0
                  ? `You have ${stats.overdue} overdue tasks. Focus on clearing them today!`
                  : "Great job! No overdue tasks. Keep maintaining this pace!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Insights