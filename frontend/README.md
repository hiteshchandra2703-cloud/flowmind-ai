# FlowMind AI ⚡
### AI-Powered Productivity Companion

> Built for the hackathon by **Hitesh Chandra** | IMG @ ABV-IIITM Gwalior

---

##  Live Demo
**[https://flowmind-ai-rho.vercel.app](https://flowmind-ai-rho.vercel.app)**

---

##  Problem Statement
Students, professionals, and entrepreneurs frequently miss deadlines, assignments, meetings, and important commitments. Existing productivity tools rely on passive reminders that are easy to ignore and do little to help users actually complete their tasks.

##  Solution
FlowMind AI is an intelligent productivity companion that goes beyond traditional reminders. It proactively assists users in planning, prioritizing, and completing tasks before deadlines are missed — powered by real AI that understands your workload and adapts to your mood.

---

##  Features

###  AI Intelligence
- **Smart Task Prioritization** — AI reads your actual tasks and tells you what to focus on first
- **Hour-by-hour Scheduling** — AI generates a complete daily schedule based on your deadlines and priorities
- **Mood-aware Recommendations** — AI adjusts suggestions based on your energy level
- **Context-aware Advice** — AI knows the time of day and gives morning/afternoon/evening specific tips
- **Voice Assistant** — Talk to the AI using your microphone

###  Task Management
- Add, complete, and delete tasks with ease
- Set due dates and priority levels (High/Medium/Low)
- Automatic overdue detection with red highlights
- Tasks grouped into Overdue, Pending, and Completed sections
- Voice input to add tasks by speaking
- Local storage — tasks persist across sessions

###  Goals Tracking
- Set personal, study, health, and work goals
- Track progress with visual progress bars
- AI suggested goals based on your profile
- Celebrate completed goals

###  Insights & Analytics
- Weekly activity bar chart
- Priority breakdown pie chart
- AI productivity analysis with personalized tips
- Completion rate tracking

###  Gamification
- Earn **XP points** for completing tasks
- Build daily **streaks** to stay consistent
- Unlock **badges** — First Task, On Fire, Unstoppable, Productive, Rockstar, Speed Runner
- Level up as you complete more tasks

###  Mood Check-in
- Daily mood check-in popup
- 5 mood states — Tired, Okay, Good, Energetic, In the Zone
- AI adapts task recommendations based on your mood

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| Tailwind CSS | Styling and dark theme |
| Groq API (Llama 3) | AI intelligence |
| Web Speech API | Voice input |
| Recharts | Analytics charts |
| Local Storage | Data persistence |
| Vercel | Deployment |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Groq API key (free at console.groq.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/hiteshchandra2703-cloud/flowmind-ai-1.git
cd flowmind-ai-1/frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_GROQ_API_KEY=your_groq_api_key_here" > .env

# Start the app
npm run dev
```

Open `http://localhost:5173` in your browser.

---

##  Screenshots

### Dashboard
- Smart task management with AI assistant
- Real-time stats — Completed, Pending, Overdue, Productivity

### Goals Page
- Set and track personal goals with progress bars

### Insights Page
- Weekly activity charts and AI productivity analysis

---

##  How the AI Works

1. User opens the app and selects their mood
2. App sends task list + mood + time of day to Groq's Llama 3 model
3. AI analyzes the data and generates personalized recommendations
4. User can ask the AI anything via text or voice
5. AI responds with specific, actionable advice based on actual tasks

---

##  Developer

**Hitesh Chandra**
- Branch: IMG (Information &  Technology)
- College: ABV-IIITM Gwalior
- GitHub: [@hiteshchandra2703-cloud](https://github.com/hiteshchandra2703-cloud)

---

##  License
MIT License — feel free to use and modify!
