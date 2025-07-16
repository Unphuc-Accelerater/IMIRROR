import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'

const OnboardingScreen = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const onboardingData = [
    {
      title: 'Anonymous Feedback',
      description: 'Receive honest and anonymous feedback from people who know you best!',
      icon: '💬',
      color: 'bg-blue-50',
    },
    {
      title: 'Therapists & Coaches',
      description: 'Connect with professional therapists and certified coaches who can guide your personal development journey with expert insights.',
      icon: '👨‍⚕️',
      color: 'bg-green-50',
    },
    {
      title: 'Grow Yourself Better',
      description: 'Transform feedback into actionable growth plans. Track your progress and become the best version of yourself with personalized insights.',
      icon: '🌱',
      color: 'bg-purple-50',
    },
  ]
  
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      navigate('/login')
    }
  }
  
  const handleSkip = () => {
    navigate('/login')
  }
  
  const currentItem = onboardingData[currentIndex]
  
  return (
    <div className="gradient-bg min-h-screen safe-area">
      <div className="flex flex-col h-screen section-padding">
        {/* Skip Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSkip}
            className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
          >
            Skip
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full max-w-sm"
            >
              <Card padding="large" className="text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`w-24 h-24 ${currentItem.color} rounded-3xl flex items-center justify-center mx-auto mb-8`}
                >
                  <span className="text-5xl">{currentItem.icon}</span>
                </motion.div>
                
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-2xl font-bold text-primary mb-6"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {currentItem.title}
                </motion.h2>
                
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-secondary leading-relaxed text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {currentItem.description}
                </motion.p>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Bottom Section */}
        <div className="space-y-6">
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-3">
            {onboardingData.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-gray-300'
                }`}
                animate={{
                  scale: index === currentIndex ? 1.1 : 1
                }}
              />
            ))}
          </div>
          
          {/* Next Button */}
          <Button
            onClick={handleNext}
            fullWidth
            size="large"
          >
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingScreen