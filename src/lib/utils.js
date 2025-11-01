import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to Vietnamese locale
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format time duration in seconds to MM:SS
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
  if (!seconds || seconds < 0) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Calculate percentage
 * @param {number} value - Numerator
 * @param {number} total - Denominator
 * @returns {number} Percentage rounded to 2 decimal places
 */
export function calculatePercentage(value, total) {
  if (!total || total === 0) return 0
  return Math.round((value / total) * 100 * 100) / 100
}

/**
 * Get difficulty color class
 * @param {string} difficulty - Difficulty level (easy/medium/hard)
 * @returns {string} Tailwind color class
 */
export function getDifficultyColor(difficulty) {
  const colors = {
    easy: 'text-success-600 bg-success-50',
    medium: 'text-warning-600 bg-warning-50',
    hard: 'text-danger-600 bg-danger-50',
  }
  return colors[difficulty] || colors.easy
}

/**
 * Get score color class based on percentage
 * @param {number} percentage - Score percentage
 * @returns {string} Tailwind color class
 */
export function getScoreColor(percentage) {
  if (percentage >= 80) return 'text-success-600'
  if (percentage >= 50) return 'text-warning-600'
  return 'text-danger-600'
}
