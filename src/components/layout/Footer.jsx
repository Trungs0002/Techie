import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Q</span>
              </div>
              <span className="text-lg font-bold text-gray-900">QuizApp</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Hệ thống luyện thi trực tuyến cho sinh viên Công nghệ thông tin.
              Học tập hiệu quả với ngân hàng câu hỏi phong phú.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-danger-500 fill-current" />
              <span>by Nhóm 05</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link 
                  to="/subjects" 
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Môn học
                </Link>
              </li>
              <li>
                <Link 
                  to="/results" 
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Kết quả
                </Link>
              </li>
              <li>
                <Link 
                  to="/settings" 
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Cài đặt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@quizapp.com" 
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  support@quizapp.com
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Trường Đại học Công nghệ Thông tin<br />
                ĐHQG TP.HCM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} QuizApp. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/privacy" 
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
