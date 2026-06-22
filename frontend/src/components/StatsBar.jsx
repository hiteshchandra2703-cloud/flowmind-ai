import { CheckCircle, Clock, Flame, TrendingUp } from "lucide-react"

const stats = [
  { icon: CheckCircle, label: "Completed", value: "12", color: "text-green-400" },
  { icon: Clock, label: "Pending", value: "5", color: "text-yellow-400" },
  { icon: Flame, label: "Streak", value: "7 days", color: "text-orange-400" },
  { icon: TrendingUp, label: "Productivity", value: "85%", color: "text-purple-400" },
]

function StatsBar() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-900 border-b border-gray-800">
      {stats.map((stat, index) => (
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