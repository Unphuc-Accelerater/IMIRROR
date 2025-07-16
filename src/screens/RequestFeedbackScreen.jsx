import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Users, Clock, TrendingUp } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const RequestFeedbackScreen = () => {
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  
  const templates = [
    { id: 'personal-growth', name: 'Personal Growth', icon: '🌱', popular: true },
    { id: 'emotional-intelligence', name: 'Emotional Intelligence', icon: '🧠' },
    { id: 'relationship', name: 'Relationship', icon: '❤️' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧘' },
    { id: 'communication', name: 'Communication', icon: '💬', popular: true },
    { id: 'values', name: 'Values', icon: '⭐' },
    { id: 'conflict-resolution', name: 'Conflict Resolution', icon: '🤝' },
    { id: 'romantic', name: 'Romantic', icon: '💕' },
  ]

  const recentRequests = [
    { id: 1, title: 'Leadership Skills', responses: 3, total: 5, date: '2 days ago' },
    { id: 2, title: 'Communication', responses: 5, total: 5, date: '1 week ago' },
    { id: 3, title: 'Team Collaboration', responses: 2, total: 4, date: '2 weeks ago' },
  ]
  
  const handleSendRequest = () => {
    if (selectedTemplate) {
      navigate('/feedback-templates')
    }
  }
  
  return (
    <div className="gradient-bg min-h-screen safe-area pb-20">
      <div className="p-6">
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
          <h1 className="text-2xl font-bold text-text-primary">Request Feedback</h1>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <Card className="text-center" padding="small">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-lg font-bold text-text-primary">24</div>
            <div className="text-xs text-text-secondary">Total Sent</div>
          </Card>
          <Card className="text-center" padding="small">
            <Clock className="w-6 h-6 text-warning mx-auto mb-2" />
            <div className="text-lg font-bold text-text-primary">5</div>
            <div className="text-xs text-text-secondary">Pending</div>
          </Card>
          <Card className="text-center" padding="small">
            <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
            <div className="text-lg font-bold text-text-primary">4.3</div>
            <div className="text-xs text-text-secondary">Avg Rating</div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h2 className="text-lg font-medium text-primary text-center mb-6">
              Choose a Template
            </h2>
            
            {/* Featured Template */}
            <Card className="bg-primaryLight mb-8 text-center border-2 border-primary border-opacity-20">
              <div className="w-16 h-16 bg-secondary bg-opacity-30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Personal Growth</h3>
              <p className="text-sm text-text-secondary mt-2">Most popular template</p>
            </Card>
            
            {/* Template Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 relative ${
                    selectedTemplate?.id === template.id
                      ? 'bg-primaryLight border-2 border-primary shadow-lg scale-105'
                      : 'bg-gray-50 border border-border-light hover:bg-gray-100'
                  }`}
                >
                  {template.popular && (
                    <div className="absolute -top-1 -right-1 bg-warning text-white text-xs px-1 py-0.5 rounded-full">
                      ★
                    </div>
                  )}
                  <div className={`w-20 h-20 rounded-lg flex items-center justify-center mb-2 ${
                    selectedTemplate?.id === template.id
                      ? 'bg-primary bg-opacity-20'
                      : 'bg-primaryLight'
                  }`}>
                    <span className="text-3xl">{template.icon}</span>
                  </div>
                  <span className="text-xs font-medium text-text-primary text-center leading-tight">
                    {template.name}
                  </span>
                </motion.button>
              ))}
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleSendRequest}
                disabled={!selectedTemplate}
                className="w-full"
              >
                Continue with Template
              </Button>
              
              <Button
                onClick={() => navigate('/feedback-templates')}
                variant="outline"
                className="w-full"
              >
                Browse All Templates
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Recent Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">Recent Requests</h3>
            <Button
              onClick={() => navigate('/feedback-history')}
              variant="outline"
              size="small"
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <Card key={request.id} className="cursor-pointer hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-primary">{request.title}</h4>
                    <p className="text-sm text-text-secondary">{request.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary">
                      {request.responses}/{request.total}
                    </div>
                    <div className="text-xs text-text-secondary">responses</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RequestFeedbackScreen