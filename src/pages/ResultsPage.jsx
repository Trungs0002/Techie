import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Container,
  Button,
  Badge,
  Loading,
  ProgressBar,
  Alert
} from '@/components/ui'
import { Trophy, Clock, Target, CheckCircle, XCircle, Home, RotateCcw } from 'lucide-react'
import { examAPI } from '@/services/api'
import QuestionCard from '@/components/quiz/QuestionCard'

export default function ResultsPage() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviewMode, setReviewMode] = useState(false)

  useEffect(() => {
    if (examId) {
      loadExamResult()
    } else {
      loadAllResults()
    }
  }, [examId])

  const loadExamResult = async () => {
    try {
      setLoading(true)
      
      // Try from location state first (just submitted)
      if (location.state?.examResult) {
        console.log('Exam result from state:', location.state.examResult)
        const examData = location.state.examResult.data?.exam || location.state.examResult.exam || location.state.examResult
        console.log('Unwrapped exam data:', examData)
        setExam(examData)
      } else {
        // Fetch from API
        const response = await examAPI.getExam(examId)
        console.log('Exam result from API:', response)
        const examData = response.data?.exam || response.exam || response
        setExam(examData)
      }
    } catch (error) {
      console.error('Load exam result error:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAllResults = async () => {
    try {
      setLoading(true)
      const response = await examAPI.getAll()
      console.log('Get all exams response:', response)
      
      // Unwrap response
      const examsData = response.data?.exams || response.exams || response
      
      // Show only completed exams
      if (Array.isArray(examsData)) {
        const completedExams = examsData.filter(e => e.status === 'completed')
        setExam(completedExams.length > 0 ? completedExams[0] : null)
      } else {
        setExam(null)
      }
    } catch (error) {
      console.error('Load results error:', error)
      setExam(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    )
  }

  if (!exam) {
    return (
      <Container size="lg" className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kết quả</h1>
          <p className="text-gray-600">
            Xem lại các bài thi đã hoàn thành
          </p>
        </div>

        <Card>
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Chưa có kết quả nào</p>
              <p className="text-sm mt-2">Hoàn thành bài thi để xem kết quả tại đây</p>
              <Button 
                variant="primary"
                onClick={() => navigate('/subjects')}
                className="mt-6"
              >
                Bắt đầu luyện tập
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    )
  }

  // Safety check for questions array
  if (!exam.questions || !Array.isArray(exam.questions)) {
    console.error('Invalid exam data:', exam)
    return (
      <Container size="lg" className="py-8">
        <Alert variant="danger">
          <p className="font-semibold">Invalid exam data</p>
          <p>Unable to display results. Please try again.</p>
          <Button 
            variant="outline"
            onClick={() => navigate('/subjects')}
            className="mt-4"
          >
            Back to Subjects
          </Button>
        </Alert>
      </Container>
    )
  }

  // Calculate score - use percentage if available, otherwise calculate
  const percentage = exam.percentage || 0
  const score = Math.round(percentage)
  const correctCount = exam.questions.filter(q => q.isCorrect).length
  const totalQuestions = exam.questions.length
  const incorrectCount = totalQuestions - correctCount
  const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 50) return 'text-warning-600'
    return 'text-danger-600'
  }

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Xuất sắc! 🎉'
    if (score >= 50) return 'Khá tốt! 👍'
    return 'Cố gắng hơn! 💪'
  }

  if (reviewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Review Answers</h1>
                <p className="text-sm text-gray-600">
                  {exam.subject?.name || 'Exam'} - Score: {score}%
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setReviewMode(false)}
              >
                Back to Results
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {exam.questions.map((question, index) => {
            const questionData = question.questionId || question
            return (
              <QuestionCard
                key={question._id || index}
                question={questionData}
                questionNumber={index + 1}
                totalQuestions={totalQuestions}
                selectedAnswer={question.userAnswer || []}
                onAnswerSelect={() => {}}
                showExplanation={true}
                isReview={true}
              />
            )
          })}

          <div className="flex justify-center pt-6">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/subjects')}
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Subjects
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Container size="lg" className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kết quả bài thi</h1>
        <p className="text-gray-600">
          {exam.subject?.name || 'Unknown Subject'}
        </p>
      </div>

      {/* Score Summary Card */}
      <Card className="mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center">
              <div>
                <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  / 100
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {getScoreMessage(score)}
            </h2>
            
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <span className="text-3xl font-bold text-success-600">{correctCount}</span>
                </div>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              
              <div className="w-px h-12 bg-gray-300"></div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-danger-600" />
                  <span className="text-3xl font-bold text-danger-600">{incorrectCount}</span>
                </div>
                <p className="text-sm text-gray-600">Incorrect</p>
              </div>
              
              <div className="w-px h-12 bg-gray-300"></div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary-600" />
                  <span className="text-3xl font-bold text-primary-600">{accuracy.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-gray-600">Accuracy</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="text-2xl font-bold text-success-600">{correctCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-danger-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-danger-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Wrong Answers</p>
                <p className="text-2xl font-bold text-danger-600">{incorrectCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setReviewMode(true)}
          className="flex-1"
        >
          <Trophy className="w-5 h-5 mr-2" />
          Review Answers
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/subjects')}
          className="flex-1"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Another Subject
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/dashboard')}
          className="flex-1"
        >
          <Home className="w-5 h-5 mr-2" />
          Go to Dashboard
        </Button>
      </div>
    </Container>
  )
}
