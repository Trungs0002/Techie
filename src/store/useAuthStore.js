import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI } from '@/services/api'
import { STORAGE_KEYS } from '@/constants'
import toast from 'react-hot-toast'

/**
 * Authentication Store with Zustand
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true })
        try {
          const response = await authAPI.login(credentials)
          const { token, user } = response.data
          
          localStorage.setItem(STORAGE_KEYS.TOKEN, token)
          set({ user, token, isAuthenticated: true, isLoading: false })
          
          toast.success(`Chào mừng ${user.fullName || user.username}!`)
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          toast.error(error.message || 'Đăng nhập thất bại')
          return { success: false, error: error.message }
        }
      },

      register: async (userData) => {
        set({ isLoading: true })
        try {
          const response = await authAPI.register(userData)
          const { token, user } = response.data
          
          localStorage.setItem(STORAGE_KEYS.TOKEN, token)
          set({ user, token, isAuthenticated: true, isLoading: false })
          
          toast.success('Đăng ký thành công!')
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          toast.error(error.message || 'Đăng ký thất bại')
          return { success: false, error: error.message }
        }
      },

      logout: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        set({ user: null, token: null, isAuthenticated: false })
        toast.success('Đăng xuất thành công')
      },

      loadUser: async () => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
        if (!token) {
          set({ isAuthenticated: false })
          return
        }

        set({ isLoading: true })
        try {
          const response = await authAPI.getMe()
          set({ 
            user: response.data.user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          })
        } catch (error) {
          localStorage.removeItem(STORAGE_KEYS.TOKEN)
          set({ user: null, token: null, isAuthenticated: false, isLoading: false })
        }
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } })
      },

      updateSettings: async (settings) => {
        set({ isLoading: true })
        try {
          const response = await authAPI.updateSettings(settings)
          set({ 
            user: response.data.user, 
            isLoading: false 
          })
          toast.success('Cập nhật cài đặt thành công')
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          toast.error(error.message || 'Cập nhật thất bại')
          return { success: false, error: error.message }
        }
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true })
        try {
          const response = await authAPI.updateProfile(profileData)
          set({ 
            user: response.data.user, 
            isLoading: false 
          })
          toast.success('Cập nhật hồ sơ thành công')
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          toast.error(error.message || 'Cập nhật thất bại')
          return { success: false, error: error.message }
        }
      },

      changePassword: async (passwordData) => {
        set({ isLoading: true })
        try {
          await authAPI.changePassword(passwordData)
          set({ isLoading: false })
          toast.success('Đổi mật khẩu thành công')
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          toast.error(error.message || 'Đổi mật khẩu thất bại')
          return { success: false, error: error.message }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)

export default useAuthStore
