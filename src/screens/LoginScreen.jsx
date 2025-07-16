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
  
  const handleContinue = async () => {
    if (phoneNumber.length !== 10) return
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/otp', { state: { phoneNumber } })
    }, 1000)
  }
  
  const isValidPhone = phoneNumber.length === 10
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="flex items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Card className="py-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome</h1>
              <p className="text-text-secondary">Log in to your account</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex space-x-3">
                <div className="flex items-center justify-center px-4 py-3 border border-border-light rounded-xl bg-gray-50">
                  <span className="text-text-primary font-medium">+91</span>
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Mobile number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    type="tel"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <p className="text-xs text-text-light">
                You will receive an SMS verification that may apply message and data rates.
              </p>
              
              <Button
                onClick={handleContinue}
                disabled={!isValidPhone}
                loading={isLoading}
                className="w-full"
              >
                Continue
              </Button>
              
              <p className="text-xs text-text-secondary text-center">
                By continuing, you agree to our{' '}
                <span className="text-primary cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-primary cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginScreen