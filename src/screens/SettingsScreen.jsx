import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight, User, Users, Bell, Star, HelpCircle, Shield, FileText, LogOut } from 'lucide-react'
import Card from '../components/Card'

const SettingsScreen = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/login')
    }
  }
  
  const settingsItems = [
    {
      title: 'Account',
      items: [
        { name: 'Profile', icon: User, onPress: () => {} },
        { name: 'Refer a Friend', icon: Users, onPress: () => {} },
        { name: 'Notifications', icon: Bell, onPress: () => {} },
      ],
    },
    {
      title: 'More',
      items: [
        { name: 'Rate & Review', icon: Star, onPress: () => {} },
        { name: 'Help', icon: HelpCircle, onPress: () => {} },
        { name: 'Privacy Policy', icon: Shield, onPress: () => {} },
        { name: 'Terms of Service', icon: FileText, onPress: () => {} },
      ],
    },
  ]
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="p-6 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-6"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-3xl overflow-hidden">
            {/* Profile Section */}
            <div className="text-center py-6">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-primaryLight rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">+</span>
                </div>
              </div>
            </div>
            
            {/* Premium Membership */}
            <Card className="bg-primary mb-6">
              <h3 className="text-lg font-bold text-white mb-1">Premium Membership</h3>
              <p className="text-sm text-white opacity-80">Upgrade for more features</p>
            </Card>
            
            {/* Settings Sections */}
            {settingsItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <h3 className="text-lg font-bold text-text-primary mb-3 px-2">
                  {section.title}
                </h3>
                <div className="bg-white rounded-xl overflow-hidden">
                  {section.items.map((item, itemIndex) => {
                    const IconComponent = item.icon
                    return (
                      <button
                        key={itemIndex}
                        onClick={item.onPress}
                        className={`w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50 transition-colors duration-200 ${
                          itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <IconComponent className="w-5 h-5 text-text-secondary mr-4" />
                          <span className="text-text-primary">{item.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-secondary" />
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            
            {/* Logout */}
            <div className="text-center py-6">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center text-text-secondary hover:text-error transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsScreen