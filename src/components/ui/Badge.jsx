import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Badge Component for tags, status, difficulty
 */

const badgeVariants = {
  primary: 'bg-primary-100 text-primary-700 border-primary-200',
  secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  success: 'bg-success-100 text-success-700 border-success-200',
  danger: 'bg-danger-100 text-danger-700 border-danger-200',
  warning: 'bg-warning-100 text-warning-700 border-warning-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

export const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  dot = false,
  className,
  ...props 
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        'transition-colors duration-200',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'primary' && 'bg-primary-500',
          variant === 'secondary' && 'bg-secondary-500',
          variant === 'success' && 'bg-success-500',
          variant === 'danger' && 'bg-danger-500',
          variant === 'warning' && 'bg-warning-500',
          variant === 'gray' && 'bg-gray-500',
        )} />
      )}
      {children}
    </span>
  )
}

export default Badge
