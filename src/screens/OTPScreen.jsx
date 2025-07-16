import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'

const OTPScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const phoneNumber = location.state?.phoneNumber || '1234567890'
  
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const inputRefs = useRef([])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  
  const handleContinue = async () => {
    const otpString = otp.join('')
    if (otpString.length !== 4) return
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/profile-setup')
    }, 1000)
  }
  
  const handleResend = () => {
    setResendTimer(30)
    setOtp(['', '', '', ''])
    inputRefs.current[0]?.focus()
  }
  
  const isValidOtp = otp.every(digit => digit !== '')
  
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
              <h1 className="text-2xl font-bold text-text-primary mb-4">Enter OTP</h1>
              <p className="text-text-secondary leading-normal">
                Enter the 4-digit code that we have sent via the phone number{' '}
                <span className="font-bold text-text-primary">+91 {phoneNumber}</span>
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-12 h-12 text-center text-xl font-bold border rounded-lg transition-colors duration-200 ${
                    digit ? 'border-primary bg-primaryLight' : 'border-border-light bg-white'
                  } focus:border-primary focus:outline-none`}
                />
              ))}
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={handleContinue}
                disabled={!isValidOtp}
                loading={isLoading}
                className="w-full"
              >
                Continue
              </Button>
              
              <div className="text-center">
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className={`text-base ${
                    resendTimer > 0 ? 'text-gray-400' : 'text-primary hover:text-primaryDark'
                  } transition-colors duration-200`}
                >
                  {resendTimer > 0 ? `Resend code (${resendTimer}s)` : 'Resend code'}
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default OTPScreen