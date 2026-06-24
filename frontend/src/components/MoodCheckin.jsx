import { useState, useEffect } from "react"

const moods = [
  { emoji: "😴", label: "Tired", value: "tired", color: "border-blue-600 bg-blue-950" },
  { emoji: "😐", label: "Okay", value: "okay", color: "border-gray-600 bg-gray-800" },
  { emoji: "😊", label: "Good", value: "good", color: "border-green-600 bg-green-950" },
  { emoji: "⚡", label: "Energetic", value: "energetic", color: "border-yellow-600 bg-yellow-950" },
  { emoji: "🔥", label: "In the zone", value: "inzone", color: "border-red-600 bg-red-950" },
]

function MoodCheckin({ onMoodSelect }) {
  const [show, setShow] = useState(false)
  const [selectedMood, setSelectedMood] = useState(null)

  useEffect(() => {
    const today = new Date().toDateString()
    const savedMood = localStorage.getItem("flowmind-mood")
    const savedDate = localStorage.getItem("flowmind-mood-date")

    if (savedDate === today && savedMood) {
      setSelectedMood(savedMood)
      onMoodSelect(savedMood)
    } else {
      setTimeout(() => setShow(true), 1000)
    }
  }, [])

  const handleMoodSelect = (mood) => {
    const today = new Date().toDateString()
    localStorage.setItem("flowmind-mood", mood.value)
    localStorage.setItem("flowmind-mood-date", today)
    setSelectedMood(mood.value)
    onMoodSelect(mood.value)
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-purple-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">👋</div>
          <h2 className="text-xl font-bold text-white mb-1">Good to see you, Hitesh!</h2>
          <p className="text-gray-400 text-sm">How are you feeling today? I'll adjust your tasks accordingly.</p>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-105 ${mood.color}`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs text-gray-300 text-center leading-tight">{mood.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShow(false)}
          className="w-full text-gray-500 text-xs hover:text-gray-300 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

export default MoodCheckin