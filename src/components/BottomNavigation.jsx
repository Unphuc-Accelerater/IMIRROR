import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, MessageCircle, BookOpen, Users, User } from 'lucide-react'

const BottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/dashboard',
      color: 'text-primary'
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: MessageCircle,
      path: '/request-feedback',
      color: 'text-secondary'
    },
    {
      id: 'journal',
      label: 'Journal',
      icon: BookOpen,
      path: '/journal',
      color: 'text-success'
    },
    {
      id: 'coaches',
      label: 'Coaches',
      icon: Users,
      path: '/coaches',
      color: 'text-warning'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
      color: 'text-error'
    }
  ]
  
  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }
  
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const active = isActive(item.path)
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
                active 
                  ? 'bg-primaryLight text-primary' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
              }`}
            >
              <IconComponent className={`w-6 h-6 mb-1 ${active ? 'text-primary' : ''}`} />
              <span className={`text-xs font-medium ${active ? 'text-primary' : ''}`}>
                {item.label}
              </span>
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation