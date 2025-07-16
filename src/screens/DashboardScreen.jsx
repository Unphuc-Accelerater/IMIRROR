import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings, Bell, Plus, TrendingUp, Target, Calendar, Users } from 'lucide-react'
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
    {
      title: 'Progress',
      subtitle: 'Track growth',
      icon: '📈',
      path: '/progress',
      color: 'bg-indigo-50',
      iconBg: 'bg-indigo-100',
    },
    {
      title: 'Goals',
      subtitle: 'Set targets',
      icon: '🎯',
      path: '/goals',
      color: 'bg-pink-50',
      iconBg: 'bg-pink-100',
    },
  ]

  const quickActions = [
    { title: 'My Sessions', icon: Calendar, path: '/my-sessions', count: 2 },
    { title: 'Achievements', icon: Target, path: '/achievements', count: 5 },
    { title: 'Insights', icon: TrendingUp, path: '/insights', count: null },
    { title: 'Reports', icon: Users, path: '/reports', count: null },
  ]
  
  return (
    <div className="gradient-bg min-h-screen safe-area pb-20">
      <div className="section-padding">
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
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/notifications')}
              className="p-3 hover:bg-white/50 rounded-full transition-colors duration-200 relative"
            >
              <Bell className="w-6 h-6 text-primary" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="p-3 hover:bg-white/50 rounded-full transition-colors duration-200"
            >
              <Settings className="w-6 h-6 text-primary" />
            </button>
          </div>
        </motion.div>
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back!</h2>
          <p className="text-base text-secondary">What would you like to do today?</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <Card className="text-center" padding="small">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-xs text-text-secondary">Total Feedback</div>
          </Card>
          <Card className="text-center" padding="small">
            <div className="text-2xl font-bold text-success">4.3</div>
            <div className="text-xs text-text-secondary">Avg Rating</div>
          </Card>
        </motion.div>
        
        {/* Dashboard Grid */}
        <div className="grid-2 mb-8">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <h3 className="text-lg font-bold text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Card
                  key={action.title}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200"
                  onClick={() => navigate(action.path)}
                  padding="small"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 text-primary mr-2" />
                      <span className="text-sm font-medium text-text-primary">{action.title}</span>
                    </div>
                    {action.count && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        {action.count}
                      </span>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </motion.div>
        
        {/* Updates Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="text-center" padding="large">
            <h3 className="text-xl font-bold text-primary mb-6">Recent Updates</h3>
            
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            
            <h4 className="text-lg font-semibold text-primary mb-2">Great Progress!</h4>
            <p className="text-base text-secondary mb-6 leading-relaxed">
              You've completed 2 goals this month and received positive feedback from 5 colleagues.
            </p>
            
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/progress')}
                variant="secondary"
                className="flex-1"
                size="small"
              >
                View Progress
              </Button>
              <Button
                onClick={() => navigate('/goals')}
                className="flex-1"
                size="small"
              >
                <Plus className="w-4 h-4 mr-1" />
                New Goal
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardScreen