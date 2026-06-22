import { useState } from "react"
import { Send, Sparkles, Bot } from "lucide-react"

const suggestions = [
  "Prioritize my tasks for today",
  "What should I focus on now?",
  "Break down my hardest task",
  "Give me a productivity tip",
]

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi Hitesh! 👋 I'm your FlowMind AI assistant. I can help you prioritize tasks, plan your day, and keep you on track. What would you like help with?"
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async (text) => {
    const userMsg = text || input
    if (!userMsg.trim()) return

    setMessages(prev => [...prev, { role: "user", text: userMsg }])
    setInput("")
    setLoading(true)

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "ai",
        text: "I'm analyzing your tasks and will provide smart recommendations soon. Connect me to the AI backend to get real responses! 🚀"
      }])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">AI Assistant</p>
          <p className="text-xs text-green-400">● Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "ai" && (
              <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={12} className="text-white" />
              </div>
            )}
            <div className={`text-xs rounded-xl px-3 py-2 max-w-[85%] leading-relaxed
              ${msg.role === "ai"
                ? "bg-gray-800 text-gray-200"
                : "bg-purple-600 text-white"
              }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot size={12} className="text-white" />
            </div>
            <div className="bg-gray-800 rounded-xl px-3 py-2 text-xs text-gray-400">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-800">
        <div className="flex flex-wrap gap-1 mb-3">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="text-xs bg-gray-800 hover:bg-purple-900 text-gray-400 hover:text-purple-300 px-2 py-1 rounded-lg transition-all border border-gray-700 hover:border-purple-700"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask AI anything..."
            className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500"
          />
          <button
            onClick={() => sendMessage()}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-all"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant