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
    <div className="gradient-bg min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute w-12 h-20 bg-primary bg-opacity-20 border-4 border-primary rounded-lg left-0 top-1.5"></div>
            <div className="absolute w-12 h-20 border-4 border-secondary rounded-lg right-0 top-5"></div>
            <div className="absolute w-6 h-6 bg-warning rounded-full -right-1 -top-1"></div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl font-normal text-text-primary mb-2 text-shadow"
        >
          iMirror
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base text-text-secondary px-6 leading-relaxed"
        >
          Know yourself from who knows you best!
        </motion.p>
      </motion.div>
    </div>
  )
}

export default SplashScreen