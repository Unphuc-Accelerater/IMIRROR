import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', animate = true, ...props }) => {
  const Component = animate ? motion.div : 'div'
  
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {}
  
  return (
    <Component
      className={`card ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card