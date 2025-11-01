import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react'

/**
 * Alert Component for notifications and messages
 */

const alertVariants = {
  info: {
    container: 'bg-primary-50 border-primary-200 text-primary-900',
    icon: 'text-primary-600',
    Icon: Info,
  },
  success: {
    container: 'bg-success-50 border-success-200 text-success-900',
    icon: 'text-success-600',
    Icon: CheckCircle,
  },
  warning: {
    container: 'bg-warning-50 border-warning-200 text-warning-900',
    icon: 'text-warning-600',
    Icon: AlertCircle,
  },
  danger: {
    container: 'bg-danger-50 border-danger-200 text-danger-900',
    icon: 'text-danger-600',
    Icon: XCircle,
  },
}

export const Alert = ({ 
  children, 
  variant = 'info',
  title,
  icon = true,
  className,
  ...props 
}) => {
  const { container, icon: iconColor, Icon } = alertVariants[variant]

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4',
        'animate-slide-down',
        container,
        className
      )}
      role="alert"
      {...props}
    >
      <div className="flex gap-3">
        {icon && Icon && (
          <Icon className={cn('w-5 h-5 flex-shrink-0', iconColor)} />
        )}
        
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Alert
