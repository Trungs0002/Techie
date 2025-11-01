import { create } from 'zustand'
import { examAPI, questionAPI } from '@/services/api'
import toast from 'react-hot-toast'

/**
 * Exam Store - Manage exam state during quiz
 */
const useExamStore = create((set, get) => ({
  // State
  currentExam: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: null,
  isSubmitting: false,
  examResult: null,

  // Actions
  startExam: async (examData) => {
    try {
      const response = await examAPI.start(examData)
      const exam = response.data.exam
      
      set({
        currentExam: exam,
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: exam.timeLimit * 60, // Convert to seconds
        isSubmitting: false,
        examResult: null,
      })
      
      toast.success('Bắt đầu bài thi!')
      return { success: true, exam }
    } catch (error) {
      toast.error(error.message || 'Không thể bắt đầu bài thi')
      return { success: false, error: error.message }
    }
  },

  setAnswer: (questionIndex, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionIndex]: answer,
      },
    }))
  },

  submitAnswer: async (questionIndex) => {
    const { currentExam, answers } = get()
    if (!currentExam) return

    try {
      const answer = answers[questionIndex]
      await examAPI.submitAnswer(currentExam._id, questionIndex, {
        answer: Array.isArray(answer) ? answer : [answer],
        timeSpent: 10, // TODO: Track actual time
      })
      return { success: true }
    } catch (error) {
      console.error('Submit answer error:', error)
      return { success: false }
    }
  },

  nextQuestion: () => {
    const { currentExam, currentQuestionIndex } = get()
    if (currentQuestionIndex < currentExam.questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 })
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get()
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 })
    }
  },

  goToQuestion: (index) => {
    set({ currentQuestionIndex: index })
  },

  submitExam: async () => {
    const { currentExam } = get()
    if (!currentExam) return

    set({ isSubmitting: true })
    try {
      const response = await examAPI.submitExam(currentExam._id)
      set({ 
        examResult: response.data.result,
        isSubmitting: false,
      })
      toast.success('Nộp bài thành công!')
      return { success: true, result: response.data.result }
    } catch (error) {
      set({ isSubmitting: false })
      toast.error(error.message || 'Nộp bài thất bại')
      return { success: false, error: error.message }
    }
  },

  decrementTime: () => {
    const { timeRemaining } = get()
    if (timeRemaining > 0) {
      set({ timeRemaining: timeRemaining - 1 })
    }
  },

  resetExam: () => {
    set({
      currentExam: null,
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: null,
      isSubmitting: false,
      examResult: null,
    })
  },
}))

export default useExamStore
