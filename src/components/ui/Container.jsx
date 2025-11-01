import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Container Component for consistent page layout
 */

export const Container = ({ 
  children, 
  size = 'default',
  className,
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 w-full',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
