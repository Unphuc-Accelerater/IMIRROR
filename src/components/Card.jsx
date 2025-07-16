import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  animate = true, 
  padding = 'normal',
  shadow = 'normal',
  ...props 
}) => {
  const getCardClasses = () => {
    let classes = 'bg-white rounded-2xl border border-gray-100 '
    
    // Padding variants
    switch (padding) {
      case 'small':
        classes += 'p-4 '
        break
      case 'large':
        classes += 'p-8 '
        break
      case 'none':
        classes += 'p-0 '
        break
      default:
        classes += 'p-6 '
    }
    
    // Shadow variants
    switch (shadow) {
      case 'small':
        classes += 'shadow-sm '
        break
      case 'large':
        classes += 'shadow-xl '
        break
      case 'none':
        classes += 'shadow-none '
        break
      default:
        classes += 'shadow-lg '
    }
    
    return classes + className
  }
  
  const Component = animate ? motion.div : 'div'
  
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  } : {}
  
  return (
    <Component
      className={getCardClasses()}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card