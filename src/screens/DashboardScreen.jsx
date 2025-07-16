import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const DashboardScreen = () => {
  const navigate = useNavigate()
  
  const dashboardItems = [
    {
      title: 'Request Feedback',
      subtitle: '1/5 completed',
      icon: '💬',
      path: '/request-feedback',
      color: 'bg-blue-50',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'Self Assessment',
      subtitle: 'Try it now',
      icon: '📊',
      path: '/self-assessment',
      color: 'bg-green-50',
      iconBg: 'bg-green-100',
    },
    {
      title: 'Journal Stories',
      subtitle: 'Write today',
      icon: '📖',
      path: '/journal',
      color: 'bg-purple-50',
      iconBg: 'bg-purple-100',
    },
    {
      title: 'Coaches',
      subtitle: 'Find support',
      icon: '👨‍⚕️',
      path: '/coaches',
      color: 'bg-orange-50',
      iconBg: 'bg-orange-100',
    },
  ]
  
  return (
    <div className="gradient-bg min-h-screen safe-area">
      <div className="section-padding pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-between mb-8"
        >
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative w-12 h-12">
              <div className="absolute w-6 h-10 bg-primary/20 border-2 border-primary rounded left-0 top-0.5" />
              <div className="absolute w-6 h-10 border-2 border-secondary rounded right-0 top-2.5" />
              <div className="absolute w-3 h-3 bg-warning rounded-full -right-0.5 -top-0.5" />
            </div>
            <h1 className="text-xl font-bold text-primary">iMirror</h1>
          </div>
          
          <button
            onClick={() => navigate('/settings')}
            className="p-3 hover:bg-white/50 rounded-full transition-colors duration-200"
          >
            <Settings className="w-6 h-6 text-primary" />
          </button>
        </motion.div>
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-primary mb-2">Welcome!</h2>
          <p className="text-base text-secondary">What would you like to do today?</p>
        </motion.div>
        
        {/* Dashboard Grid */}
        <div className="grid-2 mb-8">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => navigate(item.path)}
              className="cursor-pointer"
            >
              <Card 
                className={`h-44 flex flex-col items-center justify-center text-center relative border-2 border-gray-100 ${item.color} hover:shadow-xl transition-all duration-300 hover:scale-105`}
                padding="normal"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-2xl" />
                
                <div className={`w-16 h-16 ${item.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                
                <h3 className="text-lg font-bold text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-secondary">{item.subtitle}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Sessions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="section-margin"
        >
          <Card>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary mb-1">My Sessions</h3>
                <p className="text-sm text-secondary">No upcoming sessions</p>
              </div>
              <Button variant="outline" size="small">
                Schedule
              </Button>
            </div>
          </Card>
        </motion.div>
        
        {/* Updates Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="text-center" padding="large">
            <h3 className="text-xl font-bold text-primary mb-6">Updates</h3>
            
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            
            <h4 className="text-lg font-semibold text-primary mb-2">No updates yet</h4>
            <p className="text-base text-secondary mb-6 leading-relaxed">
              Complete your first Self-Assessment to track your emotional progress here.
            </p>
            
            <Button
              onClick={() => navigate('/self-assessment')}
              variant="secondary"
              fullWidth
            >
              Take Assessment
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardScreen