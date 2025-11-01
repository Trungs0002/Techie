import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Modal,
  ModalFooter,
  Badge,
  Loading,
  ProgressBar,
  Container,
  Alert,
} from '@/components/ui'
import { Mail, Lock, Search, User, Heart, Star, Settings } from 'lucide-react'

export default function ComponentShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [progress, setProgress] = useState(65)

  return (
    <Container size="lg" className="py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            UI Components Showcase
          </h1>
          <p className="text-gray-600">
            All components are ready to use! 🎉
          </p>
        </div>

        {/* Alerts */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Alerts</h2>
          <div className="space-y-3">
            <Alert variant="success" title="Success!">
              Your profile has been updated successfully.
            </Alert>
            <Alert variant="info" title="Information">
              New features are available in this version.
            </Alert>
            <Alert variant="warning" title="Warning">
              Your session will expire in 5 minutes.
            </Alert>
            <Alert variant="danger" title="Error">
              Failed to submit exam. Please try again.
            </Alert>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Buttons</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sizes</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">States</h3>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="gray">Gray</Badge>
            <Badge variant="success" dot>With Dot</Badge>
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary" size="lg">Large</Badge>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>This is a card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Card content goes here. You can put any content inside the card.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">John Doe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-warning-500" />
                    <span className="text-sm text-gray-600">4.5 Rating</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="w-5 h-5" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              leftIcon={<Lock className="w-5 h-5" />}
              required
            />
            <Input
              label="Search"
              type="text"
              placeholder="Search..."
              leftIcon={<Search className="w-5 h-5" />}
              helperText="Type to search"
            />
            <Input
              label="With Error"
              type="text"
              error="This field is required"
            />
          </div>
        </section>

        {/* Progress Bars */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Progress Bars</h2>
          <div className="space-y-4 max-w-2xl">
            <ProgressBar value={progress} showLabel label="Exam Progress" />
            <ProgressBar value={75} variant="success" showLabel />
            <ProgressBar value={50} variant="warning" showLabel />
            <ProgressBar value={25} variant="danger" showLabel />
            
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                -10%
              </Button>
              <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                +10%
              </Button>
            </div>
          </div>
        </section>

        {/* Loading */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Loading States</h2>
          <div className="flex flex-wrap items-center gap-8">
            <Loading size="sm" />
            <Loading size="md" />
            <Loading size="lg" />
            <Loading size="xl" text="Loading..." />
          </div>
        </section>

        {/* Modal */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Modal</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            description="This is a modal dialog example"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                This is the modal content. You can put any content here including forms,
                images, or other components.
              </p>
              
              <Alert variant="info">
                Press ESC or click outside to close
              </Alert>
            </div>

            <ModalFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
        </section>

        {/* Complex Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Complex Example</h2>
          <Card className="max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quiz Statistics</CardTitle>
                  <CardDescription>Your performance overview</CardDescription>
                </div>
                <Badge variant="success" size="lg">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">15</div>
                  <div className="text-sm text-gray-600">Total Exams</div>
                </div>
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <div className="text-2xl font-bold text-success-600">85%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
                <div className="text-center p-4 bg-warning-50 rounded-lg">
                  <div className="text-2xl font-bold text-warning-600">42</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
              </div>

              <ProgressBar 
                value={85} 
                variant="success" 
                showLabel 
                label="Overall Progress"
              />

              <div className="flex flex-wrap gap-2">
                <Badge variant="success" dot>Easy: 15/20</Badge>
                <Badge variant="warning" dot>Medium: 12/15</Badge>
                <Badge variant="danger" dot>Hard: 5/10</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
                <Button className="flex-1">
                  <Heart className="w-4 h-4" />
                  Continue Learning
                </Button>
              </div>
            </CardFooter>
          </Card>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t text-center">
          <Alert variant="success" className="max-w-2xl mx-auto">
            <strong>✅ Todo #8 Complete!</strong> All UI components are ready. 
            Next: Todo #9 - Create Pages & Routing
          </Alert>
        </div>
      </div>
    </Container>
  )
}
