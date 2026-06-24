import { useState, useEffect } from "react"
import { Mic, MicOff } from "lucide-react"

function VoiceInput({ onResult, placeholder = "Click mic to speak..." }) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setSupported(false)
    }
  }, [])

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      onResult(text)
      setListening(false)
    }

    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)

    recognition.start()
  }

  if (!supported) return null

  return (
    <button
      onClick={startListening}
      title="Click to speak"
      className={`p-2 rounded-lg transition-all ${
        listening
          ? "bg-red-600 hover:bg-red-700 animate-pulse"
          : "bg-purple-600 hover:bg-purple-700"
      }`}
    >
      {listening ? (
        <MicOff size={14} className="text-white" />
      ) : (
        <Mic size={14} className="text-white" />
      )}
    </button>
  )
}

export default VoiceInput