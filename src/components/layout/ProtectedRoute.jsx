import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { Loading } from '@/components/ui'

/**
 * Protected Route wrapper - Requires authentication
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Đang tải..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login and save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
