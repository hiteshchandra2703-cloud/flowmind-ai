import { LayoutDashboard, CheckSquare, Target, BarChart2, Settings, Zap } from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: Target, label: "Goals" },
  { icon: BarChart2, label: "Insights" },
  { icon: Settings, label: "Settings" },
]

function Sidebar() {
  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-8 mt-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <Zap size={18} className="text-white" />
        </div>
        <span className="text-xl font-bold text-white">FlowMind</span>
        <span className="text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full">AI</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
              ${index === 0
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto mb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
            H
          </div>
          <div>
            <p className="text-sm text-white font-medium">Hitesh</p>
            <p className="text-xs text-gray-400">IMT @ IIITM</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar