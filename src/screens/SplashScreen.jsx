import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const SplashScreen = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [navigate])
  
  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center section-padding">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        {/* Logo Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-12"
        >
          <div className="relative w-24 h-24 mx-auto">
            <motion.div 
              className="absolute w-12 h-20 bg-primary/20 border-4 border-primary rounded-lg left-0 top-1.5"
              initial={{ rotate: -5 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.div 
              className="absolute w-12 h-20 border-4 border-secondary rounded-lg right-0 top-5"
              initial={{ rotate: 5 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            <motion.div 
              className="absolute w-6 h-6 bg-warning rounded-full -right-1 -top-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
            />
          </div>
        </motion.div>
        
        {/* App Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl font-light text-primary mb-4 text-shadow"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          iMirror
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg text-secondary leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Know yourself from who knows you best!
        </motion.p>
        
        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex justify-center">
            <div className="loading-spinner text-primary" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SplashScreen