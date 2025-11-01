import React, { useState } from 'react'
import { useAuthStore } from '@/store'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Input,
  Alert,
  Badge,
  Container 
} from '@/components/ui'
import { User, Mail, Lock, Settings as SettingsIcon, Save } from 'lucide-react'

export default function SettingsPage() {
  const { user, updateProfile, updateSettings, changePassword } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
  })

  const [settingsData, setSettingsData] = useState({
    backgroundMusic: user?.settings?.backgroundMusic || false,
    soundEffects: user?.settings?.soundEffects || false,
    timer: user?.settings?.timer || false,
    questionsPerExam: user?.settings?.questionsPerExam || 5,
    examTimer: user?.settings?.examTimer || 30,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [message, setMessage] = useState({ type: '', text: '' })

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    
    const result = await updateProfile(profileData)
    if (result.success) {
      setMessage({ type: 'success', text: 'Cập nhật hồ sơ thành công!' })
    } else {
      setMessage({ type: 'danger', text: result.error })
    }
  }

  const handleSettingsUpdate = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    
    const result = await updateSettings(settingsData)
    if (result.success) {
      setMessage({ type: 'success', text: 'Cập nhật cài đặt thành công!' })
    } else {
      setMessage({ type: 'danger', text: result.error })
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'danger', text: 'Mật khẩu xác nhận không khớp' })
      return
    }

    const result = await changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    })

    if (result.success) {
      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' })
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      setMessage({ type: 'danger', text: result.error })
    }
  }

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'settings', label: 'Cài đặt', icon: SettingsIcon },
    { id: 'password', label: 'Mật khẩu', icon: Lock },
  ]

  return (
    <Container size="lg" className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cài đặt</h1>
        <p className="text-gray-600">
          Quản lý thông tin cá nhân và tùy chỉnh trải nghiệm
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {tabs.find(t => t.id === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {message.text && (
                <Alert variant={message.type} className="mb-6">
                  {message.text}
                </Alert>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <Input
                    label="Họ và tên"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    leftIcon={<User className="w-5 h-5" />}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    leftIcon={<Mail className="w-5 h-5" />}
                    disabled
                    helperText="Email không thể thay đổi"
                  />
                  <div className="pt-4">
                    <Button type="submit" variant="primary">
                      <Save className="w-4 h-4" />
                      Lưu thay đổi
                    </Button>
                  </div>
                </form>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSettingsUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Nhạc nền</p>
                        <p className="text-sm text-gray-600">Phát nhạc trong khi làm bài</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.backgroundMusic}
                        onChange={(e) => setSettingsData({ ...settingsData, backgroundMusic: e.target.checked })}
                        className="w-5 h-5 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Hiệu ứng âm thanh</p>
                        <p className="text-sm text-gray-600">Phát âm thanh khi chọn đáp án</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.soundEffects}
                        onChange={(e) => setSettingsData({ ...settingsData, soundEffects: e.target.checked })}
                        className="w-5 h-5 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Đồng hồ đếm ngược</p>
                        <p className="text-sm text-gray-600">Hiển thị thời gian còn lại</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.timer}
                        onChange={(e) => setSettingsData({ ...settingsData, timer: e.target.checked })}
                        className="w-5 h-5 rounded"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Số câu mỗi bài"
                      type="number"
                      min="5"
                      max="50"
                      value={settingsData.questionsPerExam}
                      onChange={(e) => setSettingsData({ ...settingsData, questionsPerExam: parseInt(e.target.value) })}
                    />
                    <Input
                      label="Thời gian (phút)"
                      type="number"
                      min="10"
                      max="120"
                      value={settingsData.examTimer}
                      onChange={(e) => setSettingsData({ ...settingsData, examTimer: parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="primary">
                      <Save className="w-4 h-4" />
                      Lưu cài đặt
                    </Button>
                  </div>
                </form>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <Input
                    label="Mật khẩu hiện tại"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    leftIcon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <Input
                    label="Mật khẩu mới"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    leftIcon={<Lock className="w-5 h-5" />}
                    helperText="Ít nhất 6 ký tự"
                    required
                  />
                  <Input
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    leftIcon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <div className="pt-4">
                    <Button type="submit" variant="primary">
                      <Lock className="w-4 h-4" />
                      Đổi mật khẩu
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
