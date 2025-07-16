import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

const ProfileSetupScreen = () => {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: '',
    bio: '',
  })
  const [profileImage, setProfileImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setProfileImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }
  
  const handleContinue = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
    }, 1000)
  }
  
  const handleSkip = () => {
    navigate('/dashboard')
  }
  
  const isFormValid = profileData.name.trim() && profileData.age && profileData.gender
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="p-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-text-primary text-center mb-6">
            Set up Profile
          </h1>
          
          <Card>
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-30 h-30 rounded-full bg-primaryLight flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-10 h-10 text-primary" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primaryDark transition-colors duration-200">
                  <span className="text-white text-lg font-bold">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-base font-medium text-text-primary mt-4">Profile Picture</p>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Name"
                placeholder="Enter your name"
                value={profileData.name}
                onChange={(value) => handleInputChange('name', value)}
              />
              
              <Input
                label="Age"
                placeholder="Enter your age"
                value={profileData.age}
                onChange={(value) => handleInputChange('age', value)}
                type="number"
              />
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Gender
                </label>
                <div className="flex space-x-2">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => handleInputChange('gender', gender)}
                      className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-200 ${
                        profileData.gender === gender
                          ? 'border-primary bg-primaryLight text-primary'
                          : 'border-border-light bg-gray-50 text-text-secondary hover:bg-gray-100'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Bio
                </label>
                <textarea
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="input-field resize-none"
                />
              </div>
              
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleContinue}
                  disabled={!isFormValid}
                  loading={isLoading}
                  className="w-full"
                >
                  Continue
                </Button>
                
                <button
                  onClick={handleSkip}
                  className="w-full text-primary hover:text-primaryDark transition-colors duration-200"
                >
                  Skip
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfileSetupScreen