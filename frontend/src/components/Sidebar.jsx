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
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-4">
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

      <div className="mt-auto">
        <div className="bg-purple-950 border border-purple-800 rounded-xl p-4">
          <p className="text-purple-300 text-xs font-medium mb-1">AI Credits</p>
          <div className="w-full bg-purple-900 rounded-full h-1.5 mb-2">
            <div className="bg-purple-400 h-1.5 rounded-full w-3/4"></div>
          </div>
          <p className="text-gray-400 text-xs">75 of 100 used</p>
        </div>

        <div className="flex items-center gap-3 mt-4 px-2">
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