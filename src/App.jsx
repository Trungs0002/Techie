import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ComponentShowcase from './components/ComponentShowcase'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <ComponentShowcase />
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
