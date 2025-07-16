import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

const LoginScreen = () => {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleContinue = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }
    
    setError('')
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      navigate('/otp', { state: { phoneNumber } })
    }, 1500)
  }
  
  const isValidPhone = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)
  
  return (
    <div className="gradient-bg min-h-screen safe-area">
      <div className="flex items-center justify-center min-h-screen section-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          <Card padding="large">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl font-bold text-primary mb-3"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-secondary text-base"
              >
                Enter your phone number to continue
              </motion.p>
            </div>
            
            {/* Phone Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex gap-3">
                <div className="flex items-center justify-center px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50">
                  <span className="text-primary font-semibold text-base">+91</span>
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Mobile number"
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value.replace(/\D/g, ''))
                      setError('')
                    }}
                    type="tel"
                    maxLength={10}
                    error={error}
                  />
                </div>
              </div>
              
              {/* Terms */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xs text-light leading-relaxed"
              >
                You will receive an SMS verification that may apply message and data rates.
              </motion.p>
              
              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                disabled={!isValidPhone}
                loading={isLoading}
                fullWidth
                size="large"
              >
                Continue
              </Button>
              
              {/* Legal */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-xs text-secondary text-center leading-relaxed"
              >
                By continuing, you agree to our{' '}
                <span className="text-primary font-medium cursor-pointer hover:underline">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-primary font-medium cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </motion.p>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginScreen