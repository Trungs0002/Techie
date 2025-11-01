import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { examAPI } from '@/services/api'
import { useAuthStore } from '@/store'
import { Button, Card, CardContent, ProgressBar, Alert, Loading } from '@/components/ui'
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import QuestionCard from '@/components/quiz/QuestionCard'
import Timer from '@/components/quiz/Timer'
import Modal from '@/components/ui/Modal'

export default function ExamPage() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuthStore()

  // State
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionIndex: [selectedOptionIndexes] }
  const [timeLeft, setTimeLeft] = useState(null)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Start exam hoặc load existing exam
  useEffect(() => {
    const startOrLoadExam = async () => {
      try {
        setLoading(true)
        
        if (examId) {
          // Load existing exam
          const response = await examAPI.getExam(examId)
          const examData = response.data?.exam || response.exam || response
          setExam(examData)
          
          // Restore previous answers
          const savedAnswers = {}
          if (examData.questions) {
            examData.questions.forEach((q, index) => {
              if (q.userAnswer && q.userAnswer.length > 0) {
                savedAnswers[index] = q.userAnswer
              }
            })
          }
          setAnswers(savedAnswers)
        } else {
          // Start new exam
          const subjectId = searchParams.get('subject')
          const numberOfQuestions = parseInt(searchParams.get('questions')) || 5
          const difficulty = searchParams.get('difficulty') || 'mixed'
          
          if (!subjectId) {
            setError('Subject ID is required')
            return
          }

          const response = await examAPI.startExam({
            subjectId,
            questionCount: numberOfQuestions,
            difficulty
          })
          
          console.log('Start exam response:', response)
          const examData = response.data?.exam || response.exam || response
          console.log('Exam data:', examData)
          
          if (!examData || !examData.questions) {
            throw new Error('Invalid exam data received')
          }
          
          setExam(examData)
          
          // Set timer if enabled
          if (user?.settings?.timer && user?.settings?.examTimer) {
            setTimeLeft(user.settings.examTimer * 60) // Convert minutes to seconds
          }
        }
      } catch (err) {
        console.error('Error starting exam:', err)
        setError(err.response?.data?.message || 'Failed to start exam')
      } finally {
        setLoading(false)
      }
    }

    startOrLoadExam()
  }, [examId, searchParams, user])

  // Handle answer selection
  const handleAnswerSelect = async (optionIndex) => {
    const question = exam.questions[currentQuestionIndex]
    const questionData = question.questionId
    let newAnswer = []

    if (questionData.type === 'true_false') {
      // True/False: only one answer
      newAnswer = [optionIndex]
    } else {
      // Multiple choice: toggle selection
      const currentAnswer = answers[currentQuestionIndex] || []
      if (currentAnswer.includes(optionIndex)) {
        newAnswer = currentAnswer.filter(i => i !== optionIndex)
      } else {
        newAnswer = [...currentAnswer, optionIndex]
      }
    }

    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: newAnswer
    }))

    // Auto-save answer to backend
    try {
      await examAPI.submitAnswer(exam._id, currentQuestionIndex, {
        userAnswer: newAnswer
      })
    } catch (err) {
      console.error('Error saving answer:', err)
    }
  }

  // Navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index)
  }

  // Submit exam
  const handleSubmitExam = async () => {
    try {
      setSubmitting(true)
      const response = await examAPI.submitExam(exam._id)
      
      console.log('Submit exam response:', response)
      
      // Unwrap response data
      const resultData = response.data?.exam || response.exam || response
      
      console.log('Result data:', resultData)
      
      // Navigate to results page
      navigate(`/results/${exam._id}`, { 
        state: { examResult: resultData } 
      })
    } catch (err) {
      console.error('Error submitting exam:', err)
      setError(err.response?.data?.message || err.message || 'Failed to submit exam')
    } finally {
      setSubmitting(false)
      setShowSubmitModal(false)
    }
  }

  // Time up handler
  const handleTimeUp = () => {
    handleSubmitExam()
  }

  // Calculate progress
  const answeredCount = Object.keys(answers).filter(qIndex => 
    answers[qIndex] && answers[qIndex].length > 0
  ).length

  const progress = exam ? (answeredCount / exam.questions.length) * 100 : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Alert variant="danger">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <p className="font-semibold">Error</p>
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/subjects')}
            >
              Back to Subjects
            </Button>
          </div>
        </Alert>
      </div>
    )
  }

  if (!exam) return null

  // Safety check
  if (!exam.questions || !Array.isArray(exam.questions) || exam.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Alert variant="danger">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <p className="font-semibold">No Questions Available</p>
            <p>This exam has no questions. Please try another subject.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/subjects')}
            >
              Back to Subjects
            </Button>
          </div>
        </Alert>
      </div>
    )
  }

  const currentQuestion = exam.questions[currentQuestionIndex]
  const questionData = currentQuestion?.questionId // The actual question data
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {exam.subject?.name || 'Exam'}
              </h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {exam.questions.length}
              </p>
            </div>
            
            {timeLeft !== null && (
              <Timer 
                duration={timeLeft} 
                onTimeUp={handleTimeUp}
              />
            )}
          </div>

          {/* Progress Bar */}
          <ProgressBar 
            value={progress} 
            variant="primary"
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {answeredCount} / {exam.questions.length} answered
            </span>
            <span className="text-gray-600">
              {Math.round(progress)}% complete
            </span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {questionData && (
          <QuestionCard
            question={questionData}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={exam.questions.length}
            selectedAnswer={answers[currentQuestionIndex] || []}
            onAnswerSelect={(optionIndex) => handleAnswerSelect(optionIndex)}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous
          </Button>

          <div className="flex gap-3">
            {isLastQuestion ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowSubmitModal(true)}
                disabled={answeredCount === 0}
              >
                Submit Exam
                <CheckCircle className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={goToNextQuestion}
              >
                Next →
              </Button>
            )}
          </div>
        </div>

        {/* Question Grid Navigation */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Question Navigator
            </h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {exam.questions.map((q, index) => {
                const isAnswered = answers[index] && answers[index].length > 0
                const isCurrent = index === currentQuestionIndex
                
                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`
                      aspect-square rounded-lg font-semibold text-sm
                      transition-all duration-200
                      ${isCurrent 
                        ? 'bg-primary-600 text-white ring-2 ring-primary-600 ring-offset-2' 
                        : isAnswered
                          ? 'bg-success-100 text-success-700 hover:bg-success-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>
            
            <div className="flex items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary-600"></div>
                <span className="text-gray-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-success-100"></div>
                <span className="text-gray-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gray-100"></div>
                <span className="text-gray-600">Not Answered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Exam?"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-warning-900">
                Are you sure you want to submit?
              </p>
              <p className="text-sm text-warning-700 mt-1">
                You have answered {answeredCount} out of {exam.questions.length} questions.
                {answeredCount < exam.questions.length && (
                  <span className="block mt-1 font-semibold">
                    {exam.questions.length - answeredCount} questions are unanswered!
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSubmitModal(false)}
              className="flex-1"
              disabled={submitting}
            >
              Continue Exam
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitExam}
              className="flex-1"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Exam'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
