import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, MessageCircle, Calendar, Award, Settings } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const NotificationsScreen = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  
  const notifications = [
    {
      id: 1,
      type: 'feedback',
      title: 'New Feedback Response',
      message: 'Someone responded to your Personal Growth feedback request',
      time: '2 hours ago',
      read: false,
      icon: MessageCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'session',
      title: 'Session Reminder',
      message: 'Your session with Dr. Sarah Chen starts in 1 hour',
      time: '3 hours ago',
      read: false,
      icon: Calendar,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You completed your first self-assessment',
      time: '1 day ago',
      read: true,
      icon: Award,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 4,
      type: 'feedback',
      title: 'Feedback Request Sent',
      message: 'Your feedback request was sent to 3 people',
      time: '2 days ago',
      read: true,
      icon: MessageCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 5,
      type: 'general',
      title: 'Welcome to iMirror!',
      message: 'Complete your profile to get personalized recommendations',
      time: '3 days ago',
      read: true,
      icon: Bell,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ]
  
  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'feedback', label: 'Feedback', count: notifications.filter(n => n.type === 'feedback').length },
    { id: 'session', label: 'Sessions', count: notifications.filter(n => n.type === 'session').length }
  ]
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    return notification.type === filter
  })
  
  const markAllAsRead = () => {
    // In real app, update backend
    console.log('Mark all as read')
  }
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="p-6 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-text-primary" />
            </button>
            <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={markAllAsRead}
              variant="outline"
              size="small"
            >
              Mark all read
            </Button>
            <Button
              onClick={() => navigate('/settings')}
              variant="outline"
              size="small"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-2 mb-6 overflow-x-auto pb-2"
        >
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center ${
                filter === filterOption.id
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border-primary text-primary hover:bg-primaryLight'
              }`}
            >
              {filterOption.label}
              {filterOption.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter === filterOption.id
                    ? 'bg-white text-primary'
                    : 'bg-primary text-white'
                }`}>
                  {filterOption.count}
                </span>
              )}
            </button>
          ))}
        </motion.div>
        
        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => {
              const IconComponent = notification.icon
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className={`relative ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                    <div className="flex items-start">
                      <div className={`w-12 h-12 ${notification.bgColor} rounded-xl flex items-center justify-center mr-4`}>
                        <IconComponent className={`w-6 h-6 ${notification.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className={`text-base font-bold ${!notification.read ? 'text-text-primary' : 'text-text-secondary'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-2" />
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mb-2 leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-xs text-text-light">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-text-secondary mb-2">
                  No notifications
                </h3>
                <p className="text-sm text-text-light">
                  {filter === 'all' 
                    ? "You're all caught up! New notifications will appear here."
                    : `No ${filter} notifications found.`
                  }
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsScreen