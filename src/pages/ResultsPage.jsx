import React from 'react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Container 
} from '@/components/ui'
import { Trophy, Clock, Target } from 'lucide-react'

export default function ResultsPage() {
  return (
    <Container size="lg" className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kết quả</h1>
        <p className="text-gray-600">
          Xem lại các bài thi đã hoàn thành
        </p>
      </div>

      <Card>
        <CardContent className="py-12">
          <div className="text-center text-gray-500">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">Chưa có kết quả nào</p>
            <p className="text-sm mt-2">Hoàn thành bài thi để xem kết quả tại đây</p>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
