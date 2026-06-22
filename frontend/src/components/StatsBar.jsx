import { CheckCircle, Clock, Flame, TrendingUp } from "lucide-react"

function StatsBar({ stats }) {
  const items = [
    { icon: CheckCircle, label: "Completed", value: stats.completed, color: "text-green-400" },
    { icon: Clock, label: "Pending", value: stats.pending, color: "text-yellow-400" },
    { icon: Flame, label: "Overdue", value: stats.overdue, color: "text-red-400" },
    { icon: TrendingUp, label: "Productivity", value: stats.productivity + "%", color: "text-purple-400" },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-900 border-b border-gray-800">
      {items.map((stat, index) => (
        <div key={index} className="bg-gray-950 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
          <stat.icon size={22} className={stat.color} />
          <div>
            <p className="text-xs text-gray-400">{stat.label}</p>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsBar