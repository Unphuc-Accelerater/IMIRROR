import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  className = '',
  fullWidth = false,
  ...props 
}) => {
  const getButtonClasses = () => {
    let classes = 'font-semibold transition-all duration-200 flex items-center justify-center gap-2 '
    
    // Size classes
    switch (size) {
      case 'small':
        classes += 'px-4 py-2 text-sm rounded-lg min-h-[36px] '
        break
      case 'large':
        classes += 'px-8 py-4 text-lg rounded-3xl min-h-[56px] '
        break
      default:
        classes += 'px-6 py-3 text-base rounded-2xl min-h-[48px] '
    }
    
    // Variant classes
    switch (variant) {
      case 'secondary':
        classes += 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white '
        break
      case 'outline':
        classes += 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 '
        break
      default:
        classes += 'btn-primary '
    }
    
    // Full width
    if (fullWidth) {
      classes += 'w-full '
    }
    
    // Disabled state
    if (disabled || loading) {
      classes += 'opacity-50 cursor-not-allowed '
    }
    
    return classes + className
  }
  
  return (
    <motion.button
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      whileHover={disabled || loading ? {} : { y: -1 }}
      className={getButtonClasses()}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="loading-spinner" />
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button