import { useEffect, useState } from "react"
import { Trophy, Flame, Zap, Star } from "lucide-react"

const BADGES = [
  { id: "first_task", icon: "🏆", label: "First Task", desc: "Complete your first task", condition: (stats) => stats.totalCompleted >= 1 },
  { id: "streak_3", icon: "🔥", label: "On Fire", desc: "3 day streak", condition: (stats) => stats.streak >= 3 },
  { id: "streak_7", icon: "⚡", label: "Unstoppable", desc: "7 day streak", condition: (stats) => stats.streak >= 7 },
  { id: "tasks_5", icon: "⭐", label: "Productive", desc: "Complete 5 tasks", condition: (stats) => stats.totalCompleted >= 5 },
  { id: "tasks_10", icon: "🚀", label: "Rockstar", desc: "Complete 10 tasks", condition: (stats) => stats.totalCompleted >= 10 },
  { id: "speed_runner", icon: "💨", label: "Speed Runner", desc: "Complete 3 tasks in one day", condition: (stats) => stats.todayCompleted >= 3 },
]

function getStats() {
  const today = new Date().toDateString()
  const stats = JSON.parse(localStorage.getItem("flowmind-gamification") || "{}")
  return {
    xp: stats.xp || 0,
    streak: stats.streak || 0,
    totalCompleted: stats.totalCompleted || 0,
    todayCompleted: stats.lastDate === today ? (stats.todayCompleted || 0) : 0,
    lastDate: stats.lastDate || null,
    unlockedBadges: stats.unlockedBadges || [],
  }
}

function saveStats(stats) {
  localStorage.setItem("flowmind-gamification", JSON.stringify(stats))
}

export function useGamification(tasks) {
  const [stats, setStats] = useState(getStats)
  const [newBadge, setNewBadge] = useState(null)
  const [xpPopup, setXpPopup] = useState(null)

  useEffect(() => {
    const today = new Date().toDateString()
    const completedToday = tasks.filter(t => t.done).length
    const current = getStats()

    const newStats = { ...current }

    if (current.lastDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (current.lastDate === yesterday.toDateString()) {
        newStats.streak = current.streak + 1
      } else if (current.lastDate !== today) {
        newStats.streak = completedToday > 0 ? 1 : 0
      }
      newStats.lastDate = today
      newStats.todayCompleted = completedToday
    }

    newStats.totalCompleted = tasks.filter(t => t.done).length
    newStats.todayCompleted = completedToday

    BADGES.forEach(badge => {
      if (!newStats.unlockedBadges.includes(badge.id) && badge.condition(newStats)) {
        newStats.unlockedBadges = [...newStats.unlockedBadges, badge.id]
        setNewBadge(badge)
        setTimeout(() => setNewBadge(null), 3000)
      }
    })

    saveStats(newStats)
    setStats(newStats)
  }, [tasks])

  const addXP = (amount) => {
    const current = getStats()
    const newStats = { ...current, xp: current.xp + amount }
    saveStats(newStats)
    setStats(newStats)
    setXpPopup(`+${amount} XP`)
    setTimeout(() => setXpPopup(null), 1500)
  }

  return { stats, newBadge, xpPopup, addXP, BADGES }
}

export function XPPopup({ message }) {
  if (!message) return null
  return (
    <div className="fixed top-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-sm z-50 animate-bounce shadow-lg">
      {message} ✨
    </div>
  )
}

export function BadgePopup({ badge }) {
  if (!badge) return null
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-gray-900 border border-purple-600 text-white px-6 py-4 rounded-2xl z-50 shadow-2xl text-center">
      <div className="text-3xl mb-1">{badge.icon}</div>
      <div className="font-bold text-purple-400">Badge Unlocked!</div>
      <div className="text-sm text-white">{badge.label}</div>
      <div className="text-xs text-gray-400">{badge.desc}</div>
    </div>
  )
}

export function GamificationBar({ stats, BADGES }) {
  const level = Math.floor(stats.xp / 100) + 1
  const xpInLevel = stats.xp % 100
  const unlockedBadges = BADGES.filter(b => stats.unlockedBadges.includes(b.id))

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-purple-400" />
          <span className="text-xs text-gray-400">Level {level}</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame size={14} className="text-orange-400" />
          <span className="text-xs text-orange-400">{stats.streak} day streak</span>
        </div>
        <div className="flex items-center gap-2">
          <Star size={14} className="text-yellow-400" />
          <span className="text-xs text-yellow-400">{stats.xp} XP</span>
        </div>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
        <div
          className="bg-purple-500 h-1.5 rounded-full transition-all"
          style={{ width: `${xpInLevel}%` }}
        />
      </div>
      {unlockedBadges.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {unlockedBadges.map(badge => (
            <span key={badge.id} title={badge.desc} className="text-lg cursor-help">
              {badge.icon}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Gamification() {
  return null
}