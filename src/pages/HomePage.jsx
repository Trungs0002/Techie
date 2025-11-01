import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { Button, Card, CardContent, Badge, Container } from '@/components/ui'
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight,
  Target,
  Clock
} from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const features = [
    {
      icon: BookOpen,
      title: 'Ngân hàng câu hỏi phong phú',
      description: 'Hàng ngàn câu hỏi được cập nhật liên tục theo chương trình học',
      color: 'primary'
    },
    {
      icon: Target,
      title: 'Luyện tập theo từng chủ đề',
      description: 'Chọn chủ đề và độ khó phù hợp với trình độ của bạn',
      color: 'success'
    },
    {
      icon: Trophy,
      title: 'Theo dõi tiến độ',
      description: 'Xem chi tiết kết quả và thống kê để cải thiện điểm số',
      color: 'warning'
    },
    {
      icon: Zap,
      title: 'Thi thử trực tuyến',
      description: 'Mô phỏng điều kiện thi thật với giới hạn thời gian',
      color: 'secondary'
    }
  ]

  const stats = [
    { label: 'Sinh viên', value: '1000+', icon: Users },
    { label: 'Câu hỏi', value: '5000+', icon: BookOpen },
    { label: 'Môn học', value: '15+', icon: Target },
    { label: 'Bài thi', value: '10000+', icon: Trophy }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-xl font-bold text-gray-900">QuizApp</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Đăng nhập
              </Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="primary" size="lg" className="mb-6">
              🎓 Hệ thống luyện thi trực tuyến
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Nâng cao kiến thức
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Đạt điểm cao
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Luyện thi trực tuyến với ngân hàng câu hỏi phong phú, 
              theo dõi tiến độ và cải thiện kết quả học tập của bạn.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="primary" 
                size="xl"
                onClick={() => navigate('/register')}
              >
                Bắt đầu ngay
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-gray-600">
              Mọi thứ bạn cần để chuẩn bị tốt nhất cho kỳ thi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white/50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cách sử dụng
            </h2>
            <p className="text-gray-600">
              Chỉ với 3 bước đơn giản
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Đăng ký tài khoản',
                description: 'Tạo tài khoản miễn phí chỉ trong vài giây'
              },
              {
                step: '02',
                title: 'Chọn môn học',
                description: 'Chọn môn học bạn muốn luyện tập và độ khó phù hợp'
              },
              {
                step: '03',
                title: 'Bắt đầu luyện tập',
                description: 'Làm bài thi và theo dõi kết quả của bạn'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 border-0">
            <CardContent className="py-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Sẵn sàng bắt đầu?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Tham gia cùng hàng nghìn sinh viên đang luyện tập mỗi ngày
              </p>
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white text-primary-600 hover:bg-gray-100"
                onClick={() => navigate('/register')}
              >
                Đăng ký miễn phí
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <Container>
          <div className="text-center text-gray-600 text-sm">
            <p>© 2025 QuizApp. Made with ❤️ by Nhóm 05</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
