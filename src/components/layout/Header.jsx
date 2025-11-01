import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { Button, Badge } from '@/components/ui'
import { 
  Home, 
  BookOpen, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X,
  Trophy
} from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/dashboard', label: 'Trang chủ', icon: Home },
    { path: '/subjects', label: 'Môn học', icon: BookOpen },
    { path: '/results', label: 'Kết quả', icon: Trophy },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Quiz</span>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">App</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName || user?.username}
                    </p>
                    {user?.stats && (
                      <p className="text-xs text-gray-500">
                        Điểm TB: {user.stats.averageScore?.toFixed(1) || 0}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                    {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                  </div>
                </div>

                {/* Settings & Logout */}
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    Đăng xuất
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Đăng nhập
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down">
            {/* User Info Mobile */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-lg">
                {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user?.fullName || user?.username}
                </p>
                {user?.stats && (
                  <p className="text-sm text-gray-500">
                    Điểm TB: {user.stats.averageScore?.toFixed(1) || 0}
                  </p>
                )}
              </div>
            </div>

            {/* Nav Links Mobile */}
            <nav className="space-y-1 mb-4">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
              <Link
                to="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive('/settings')
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Cài đặt</span>
              </Link>
            </nav>

            {/* Logout Mobile */}
            <Button
              variant="danger"
              size="md"
              className="w-full"
              onClick={() => {
                handleLogout()
                setIsMobileMenuOpen(false)
              }}
            >
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
