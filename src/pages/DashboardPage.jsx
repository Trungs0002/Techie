import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button,
  Badge,
  ProgressBar,
  Container,
  Loading
} from '@/components/ui'
import { 
  BookOpen, 
  Trophy, 
  Target, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { subjectAPI, examAPI } from '@/services/api'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])
  const [recentExams, setRecentExams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [subjectsRes, examsRes] = await Promise.all([
        subjectAPI.getAll(),
        examAPI.getUserExams({ limit: 5 })
      ])
      setSubjects(subjectsRes.data.subjects || [])
      setRecentExams(examsRes.data.exams || [])
    } catch (error) {
      console.error('Load dashboard error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Đang tải..." />
      </div>
    )
  }

  const stats = user?.stats || {}

  return (
    <Container size="lg" className="py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Xin chào, {user?.fullName || user?.username}! 👋
        </h1>
        <p className="text-gray-600">
          Sẵn sàng cho bài học hôm nay chưa?
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-600 font-medium">Tổng bài thi</p>
                <p className="text-3xl font-bold text-primary-700 mt-1">
                  {stats.totalExams || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 border-success-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success-600 font-medium">Điểm trung bình</p>
                <p className="text-3xl font-bold text-success-700 mt-1">
                  {stats.averageScore?.toFixed(1) || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-success-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warning-600 font-medium">Điểm cao nhất</p>
                <p className="text-3xl font-bold text-warning-700 mt-1">
                  {stats.bestScore || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 font-medium">Tỷ lệ đúng</p>
                <p className="text-3xl font-bold text-secondary-700 mt-1">
                  {stats.totalQuestions > 0 
                    ? ((stats.totalCorrect / stats.totalQuestions) * 100).toFixed(0)
                    : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Môn học</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/subjects')}
                >
                  Xem tất cả
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {subjects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Chưa có môn học nào
                </div>
              ) : (
                <div className="space-y-3">
                  {subjects.slice(0, 5).map((subject) => (
                    <div
                      key={subject._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => navigate(`/subjects/${subject._id}`)}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {subject.code} • {subject.questionCount || 0} câu hỏi
                        </p>
                      </div>
                      <Button variant="primary" size="sm">
                        Luyện tập
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              {recentExams.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Chưa có hoạt động nào</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentExams.map((exam) => (
                    <div
                      key={exam._id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">
                            {exam.subjectId?.name || 'Môn học'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(exam.startTime).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <Badge 
                          variant={exam.status === 'completed' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {exam.status === 'completed' ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              {exam.score}/{exam.questions.length}
                            </>
                          ) : (
                            'Đang làm'
                          )}
                        </Badge>
                      </div>
                      {exam.status === 'completed' && (
                        <ProgressBar
                          value={exam.score}
                          max={exam.questions.length}
                          variant={exam.score / exam.questions.length >= 0.8 ? 'success' : 'warning'}
                          size="sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
