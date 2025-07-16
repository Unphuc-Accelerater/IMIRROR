import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import Card from '../components/Card'

const DashboardScreen = () => {
  const navigate = useNavigate()
  
  const dashboardItems = [
    {
      title: 'Request Feedback',
      subtitle: '1/5 completed',
      icon: '💬',
      path: '/request-feedback',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Self Assessment',
      subtitle: 'Try it now',
      icon: '📊',
      path: '/self-assessment',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Journal Stories',
      subtitle: 'Write today',
      icon: '📖',
      path: '/journal',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Coaches',
      subtitle: 'Find support',
      icon: '👨‍⚕️',
      path: '/coaches',
      color: 'bg-orange-50 border-orange-200'
    },
  ]
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="p-6 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="absolute w-6 h-10 bg-primary bg-opacity-20 border-2 border-primary rounded left-0 top-0.5"></div>
              <div className="absolute w-6 h-10 border-2 border-secondary rounded right-0 top-2.5"></div>
              <div className="absolute w-3 h-3 bg-warning rounded-full -right-0.5 -top-0.5"></div>
            </div>
            <h1 className="text-lg font-semibold text-text-primary">iMirror</h1>
          </div>
          
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200"
          >
            <Settings className="w-6 h-6 text-text-primary" />
          </button>
        </motion.div>
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-1">Welcome!</h2>
          <p className="text-sm text-text-secondary">What would you like to do today?</p>
        </motion.div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => navigate(item.path)}
              className="cursor-pointer"
            >
              <Card className={`h-44 flex flex-col items-center justify-center text-center relative border-2 ${item.color} hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary"></div>
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                <p className="text-xs text-text-secondary">{item.subtitle}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Sessions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primaryLight rounded-full flex items-center justify-center mr-4">
                <span className="text-lg">⏰</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">My Sessions</h3>
                <p className="text-xs text-text-secondary">No upcoming sessions</p>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Updates Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="text-center">
            <h3 className="text-lg font-bold text-text-primary mb-4">Updates</h3>
            <div className="w-8 h-8 bg-primaryLight rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-base">📈</span>
            </div>
            <p className="text-base font-medium text-text-primary mb-1">No updates yet</p>
            <p className="text-sm text-text-secondary mb-4">
              Complete your first Self-Assessment to track your emotional progress here.
            </p>
            <button
              onClick={() => navigate('/self-assessment')}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primaryDark transition-colors duration-200"
            >
              Take Assessment
            </button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardScreen