import React from 'react'
import { Alert, Button, Card, CardContent } from '@/components/ui'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="max-w-lg w-full">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-danger-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Oops! Đã có lỗi xảy ra
                </h1>
                <p className="text-gray-600">
                  Ứng dụng gặp lỗi không mong muốn. Vui lòng tải lại trang.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Alert variant="danger" className="mb-4 text-left">
                  <p className="font-semibold mb-2">Error Details:</p>
                  <pre className="text-xs overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </Alert>
              )}

              <div className="flex gap-3 justify-center">
                <Button
                  variant="primary"
                  onClick={this.handleReload}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4" />
                  Tải lại trang
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
