import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Alert } from '@/components/ui'

export default function TestAPIPage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ total: 0, passed: 0, failed: 0 })
  const [testUser, setTestUser] = useState({ email: '', password: 'password123' })

  const addResult = (test, success, message, data = null) => {
    const result = {
      test,
      success,
      message,
      data,
      timestamp: new Date().toLocaleTimeString()
    }
    setResults(prev => [result, ...prev])
    setStats(prev => ({
      total: prev.total + 1,
      passed: prev.passed + (success ? 1 : 0),
      failed: prev.failed + (success ? 0 : 1)
    }))
  }

  const testRegister = async () => {
    setLoading(true)
    try {
      const timestamp = Date.now()
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: `testuser_${timestamp}`,
          email: `testuser_${timestamp}@example.com`,
          password: 'password123',
          fullName: 'Test User Auto'
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        const user = data.data?.user || data.user
        const token = data.data?.token || data.token
        if (user && token) {
          addResult('Register', true, `User created: ${user.username}`, data)
          localStorage.setItem('testToken', token)
          setTestUser({ email: user.email, password: 'password123' })
        } else {
          addResult('Register', false, 'Invalid response format', data)
        }
      } else {
        addResult('Register', false, data.message || 'Registration failed')
      }
    } catch (error) {
      addResult('Register', false, `Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testLogin = async () => {
    setLoading(true)
    try {
      if (!testUser.email) {
        addResult('Login', false, 'Please run Register test first to create a user')
        setLoading(false)
        return
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        const user = data.data?.user || data.user
        const token = data.data?.token || data.token
        if (user && token) {
          addResult('Login', true, `Logged in as: ${user.username}`, data)
          localStorage.setItem('testToken', token)
        } else {
          addResult('Login', false, 'Invalid response format', data)
        }
      } else {
        addResult('Login', false, data.message || 'Login failed')
      }
    } catch (error) {
      addResult('Login', false, `Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testGetMe = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('testToken')
      if (!token) {
        addResult('Get Me', false, 'No token found. Please login first.')
        setLoading(false)
        return
      }

      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await response.json()
      
      if (response.ok) {
        const user = data.data?.user || data
        addResult('Get Me', true, `User info retrieved: ${user.username || user.email}`, data)
      } else {
        addResult('Get Me', false, data.message || 'Failed to get user info')
      }
    } catch (error) {
      addResult('Get Me', false, `Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testGetSubjects = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/subjects')
      const data = await response.json()
      
      if (response.ok) {
        const subjects = data.data?.subjects || data
        const count = Array.isArray(subjects) ? subjects.length : data.count || 0
        addResult('Get Subjects', true, `Found ${count} subjects`, data)
      } else {
        addResult('Get Subjects', false, 'Failed to get subjects')
      }
    } catch (error) {
      addResult('Get Subjects', false, `Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testGetExams = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('testToken')
      if (!token) {
        addResult('Get Exams', false, 'No token found. Please login first.')
        setLoading(false)
        return
      }

      const response = await fetch('/api/exams', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await response.json()
      
      if (response.ok) {
        const exams = data.data?.exams || data
        const count = Array.isArray(exams) ? exams.length : data.count || 0
        addResult('Get Exams', true, `Found ${count} exams`, data)
      } else {
        addResult('Get Exams', false, data.message || 'Failed to get exams')
      }
    } catch (error) {
      addResult('Get Exams', false, `Error: ${error.message}`)
    }
    setLoading(false)
  }

  const runAllTests = async () => {
    setResults([])
    setStats({ total: 0, passed: 0, failed: 0 })
    
    await testRegister()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await testLogin()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await testGetMe()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await testGetSubjects()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await testGetExams()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🧪 API Testing Dashboard</h1>
        <p className="text-gray-600 mb-8">Test all backend APIs from the frontend</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary-600">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Tests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.passed}</p>
              <p className="text-sm text-gray-600">Passed ✅</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
              <p className="text-sm text-gray-600">Failed ❌</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-secondary-600">
                {stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Test Buttons */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Run Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={runAllTests} disabled={loading} variant="primary" size="lg">
                🚀 Run All Tests
              </Button>
              <Button onClick={testRegister} disabled={loading}>
                📝 Test Register
              </Button>
              <Button onClick={testLogin} disabled={loading}>
                🔐 Test Login
              </Button>
              <Button onClick={testGetMe} disabled={loading}>
                👤 Test Get Me
              </Button>
              <Button onClick={testGetSubjects} disabled={loading}>
                📚 Test Get Subjects
              </Button>
              <Button onClick={testGetExams} disabled={loading}>
                📝 Test Get Exams
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <Alert variant="info">
                <p>No tests run yet. Click a button above to start testing!</p>
              </Alert>
            ) : (
              <div className="space-y-3">
                {results.map((result, index) => (
                  <Alert key={index} variant={result.success ? 'success' : 'danger'}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">
                          {result.success ? '✅' : '❌'} {result.test}
                        </p>
                        <p className="text-sm mt-1">{result.message}</p>
                        {result.data && (
                          <details className="mt-2">
                            <summary className="cursor-pointer text-sm font-medium">
                              View Response Data
                            </summary>
                            <pre className="mt-2 p-3 bg-gray-900 text-gray-100 rounded text-xs overflow-x-auto">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 ml-4">{result.timestamp}</span>
                    </div>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
