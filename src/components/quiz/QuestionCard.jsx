import React from 'react'
import { Card, CardContent, Badge } from '@/components/ui'
import AnswerOption from './AnswerOption'

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer = [],
  onAnswerSelect,
  showExplanation = false,
  isReview = false
}) {
  if (!question) return null

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'danger'
      default: return 'secondary'
    }
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        {/* Question Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-lg">
              {questionNumber}
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Question {questionNumber} of {totalQuestions}
              </p>
              <Badge 
                variant={getDifficultyColor(question.difficulty)}
                size="sm"
                className="mt-1"
              >
                {question.difficulty || 'medium'}
              </Badge>
            </div>
          </div>

          {question.type && (
            <Badge variant="secondary">
              {question.type === 'true_false' ? 'True/False' : 'Multiple Choice'}
            </Badge>
          )}
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
            {question.content || question.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options && question.options.map((option, index) => {
            // Get correct answer indexes from options
            const correctIndexes = question.options
              .map((opt, idx) => opt.isCorrect ? idx : -1)
              .filter(idx => idx !== -1)
            
            return (
              <AnswerOption
                key={index}
                option={option.text || option}
                index={index}
                isSelected={selectedAnswer.includes(index)}
                isCorrect={isReview ? correctIndexes.includes(index) : null}
                isDisabled={isReview}
                onClick={() => !isReview && onAnswerSelect(index)}
                showResult={isReview}
              />
            )
          })}
        </div>

        {/* Explanation (shown after submission in review mode) */}
        {showExplanation && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              💡 Explanation:
            </p>
            <p className="text-sm text-blue-800">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Answer Status in Review Mode */}
        {isReview && (
          <div className="mt-4">
            {selectedAnswer.length > 0 ? (
              <div className={`
                p-3 rounded-lg border-2
                ${(() => {
                  const correctAnswers = question.options
                    ?.map((opt, idx) => opt.isCorrect ? idx : -1)
                    .filter(idx => idx !== -1) || []
                  
                  // Sort both arrays for comparison
                  const sortedSelected = [...selectedAnswer].sort((a, b) => a - b)
                  const sortedCorrect = [...correctAnswers].sort((a, b) => a - b)
                  const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)
                  
                  // Debug log
                  console.log('Review check:', {
                    question: question.content?.substring(0, 50),
                    correctAnswers,
                    selectedAnswer,
                    sortedCorrect,
                    sortedSelected,
                    isCorrect
                  })
                  
                  return isCorrect 
                    ? 'bg-success-50 border-success-500'
                    : 'bg-danger-50 border-danger-500'
                })()}
              `}>
                <p className="text-sm font-semibold">
                  {(() => {
                    const correctAnswers = question.options
                      ?.map((opt, idx) => opt.isCorrect ? idx : -1)
                      .filter(idx => idx !== -1) || []
                    const sortedSelected = [...selectedAnswer].sort((a, b) => a - b)
                    const sortedCorrect = [...correctAnswers].sort((a, b) => a - b)
                    const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)
                    return isCorrect ? '✅ Correct Answer!' : '❌ Incorrect Answer'
                  })()}
                </p>
                {(() => {
                  const correctAnswers = question.options
                    ?.map((opt, idx) => opt.isCorrect ? idx : -1)
                    .filter(idx => idx !== -1) || []
                  const sortedSelected = [...selectedAnswer].sort((a, b) => a - b)
                  const sortedCorrect = [...correctAnswers].sort((a, b) => a - b)
                  const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)
                  if (!isCorrect) {
                    return (
                      <p className="text-sm mt-1">
                        Correct answer(s): {correctAnswers.map(i => 
                          String.fromCharCode(65 + i)
                        ).join(', ')}
                      </p>
                    )
                  }
                })()}
              </div>
            ) : (
              <div className="p-3 rounded-lg border-2 bg-gray-50 border-gray-300">
                <p className="text-sm font-semibold text-gray-700">
                  ⚠️ Not Answered
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
