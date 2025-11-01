import React, { useState, useEffect } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'

export default function Timer({ 
  duration, // seconds
  onTimeUp,
  warningThreshold = 60, // Show warning when less than this
  autoSubmit = true
}) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          if (autoSubmit && onTimeUp) {
            onTimeUp()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, timeLeft, autoSubmit, onTimeUp])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`
  }

  const getColorClass = () => {
    if (timeLeft <= 10) {
      return 'bg-danger-100 border-danger-500 text-danger-900'
    }
    if (timeLeft <= warningThreshold) {
      return 'bg-warning-100 border-warning-500 text-warning-900'
    }
    return 'bg-primary-100 border-primary-500 text-primary-900'
  }

  const shouldPulse = timeLeft <= 10

  return (
    <div className={`
      flex items-center gap-3 px-4 py-2 rounded-lg border-2
      transition-all duration-300
      ${getColorClass()}
      ${shouldPulse ? 'animate-pulse' : ''}
    `}>
      {timeLeft <= warningThreshold && (
        <AlertTriangle className="w-5 h-5" />
      )}
      
      <Clock className="w-5 h-5" />
      
      <div className="flex flex-col">
        <span className="text-xs font-medium opacity-75">Time Left</span>
        <span className="text-2xl font-bold font-mono tabular-nums">
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Optional pause button (commented out for now) */}
      {/* <button
        onClick={() => setIsPaused(!isPaused)}
        className="ml-2 p-1 hover:bg-white/20 rounded"
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button> */}
    </div>
  )
}
