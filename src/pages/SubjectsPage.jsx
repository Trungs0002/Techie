import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter,
  Button,
  Badge,
  Container,
  Loading,
  Alert
} from '@/components/ui'
import { BookOpen, PlayCircle, FileText } from 'lucide-react'
import { subjectAPI } from '@/services/api'

export default function SubjectsPage() {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubjects()
  }, [])

  const loadSubjects = async () => {
    try {
      const response = await subjectAPI.getAll()
      setSubjects(response.data.subjects || [])
    } catch (error) {
      console.error('Load subjects error:', error)
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

  return (
    <Container size="lg" className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Môn học</h1>
        <p className="text-gray-600">
          Chọn môn học để bắt đầu luyện tập
        </p>
      </div>

      {subjects.length === 0 ? (
        <Alert variant="info">
          Chưa có môn học nào. Vui lòng liên hệ quản trị viên để thêm môn học.
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <Badge variant="primary">
                    {subject.questionCount || 0} câu
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Mã môn: <span className="font-medium">{subject.code}</span>
                </p>
                {subject.description && (
                  <p className="text-sm text-gray-600">
                    {subject.description}
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/subjects/${subject._id}`)}
                  >
                    <FileText className="w-4 h-4" />
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/quiz/start?subject=${subject._id}`)}
                  >
                    <PlayCircle className="w-4 h-4" />
                    Luyện tập
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Container>
  )
}
