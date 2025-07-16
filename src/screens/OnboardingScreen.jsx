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
    },
    {
      title: 'Therapists & Coaches',
      description: 'Connect with professional therapists and certified coaches who can guide your personal development journey with expert insights.',
      icon: '👨‍⚕️',
    },
    {
      title: 'Grow Yourself Better',
      description: 'Transform feedback into actionable growth plans. Track your progress and become the best version of yourself with personalized insights.',
      icon: '🌱',
    },
  ]
  
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      navigate('/login')
    }
  }
  
  const currentItem = onboardingData[currentIndex]
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="flex flex-col h-screen p-6">
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm"
            >
              <Card className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-6"
                >
                  {currentItem.icon}
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-semibold text-text-primary mb-4"
                >
                  {currentItem.title}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-text-secondary leading-relaxed"
                >
                  {currentItem.description}
                </motion.p>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-center space-x-2">
            {onboardingData.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button
            onClick={handleNext}
            className="w-full"
          >
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingScreen