import React from 'react'
import { Check, X } from 'lucide-react'

export default function AnswerOption({
  option,
  index,
  isSelected,
  isCorrect = null,
  isDisabled = false,
  onClick,
  showResult = false
}) {
  const letter = String.fromCharCode(65 + index) // A, B, C, D
  
  // Handle both string and object option format
  const optionText = typeof option === 'string' ? option : option?.text || ''

  // Determine the style based on state
  const getButtonStyle = () => {
    // Review mode with results
    if (showResult && isCorrect !== null) {
      if (isCorrect) {
        return 'bg-success-100 border-success-500 text-success-900 ring-2 ring-success-500'
      }
      if (isSelected && !isCorrect) {
        return 'bg-danger-100 border-danger-500 text-danger-900 ring-2 ring-danger-500'
      }
      return 'bg-gray-50 border-gray-200 text-gray-600'
    }

    // Active exam mode
    if (isSelected) {
      return 'bg-primary-100 border-primary-500 text-primary-900 ring-2 ring-primary-500'
    }

    return 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
  }

  const getLetterStyle = () => {
    // Review mode with results
    if (showResult && isCorrect !== null) {
      if (isCorrect) {
        return 'bg-success-500 text-white'
      }
      if (isSelected && !isCorrect) {
        return 'bg-danger-500 text-white'
      }
      return 'bg-gray-300 text-gray-600'
    }

    // Active exam mode
    if (isSelected) {
      return 'bg-primary-600 text-white'
    }

    return 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
  }

  const getIcon = () => {
    if (!showResult) return null
    
    if (isCorrect) {
      return <Check className="w-5 h-5 text-success-600" />
    }
    if (isSelected && !isCorrect) {
      return <X className="w-5 h-5 text-danger-600" />
    }
    return null
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        group w-full text-left p-4 rounded-lg border-2
        transition-all duration-200
        flex items-center gap-4
        ${getButtonStyle()}
        ${isDisabled ? 'cursor-default' : 'cursor-pointer'}
        ${!isDisabled && !showResult ? 'hover:shadow-md' : ''}
      `}
    >
      {/* Letter Badge */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-lg
        flex items-center justify-center
        font-bold text-lg
        transition-all duration-200
        ${getLetterStyle()}
      `}>
        {letter}
      </div>

      {/* Option Text */}
      <span className="flex-1 font-medium text-base">
        {optionText}
      </span>

      {/* Result Icon */}
      {showResult && (
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
      )}

      {/* Selected Indicator (only in active mode) */}
      {!showResult && isSelected && (
        <div className="flex-shrink-0">
          <Check className="w-5 h-5 text-primary-600" />
        </div>
      )}
    </button>
  )
}
