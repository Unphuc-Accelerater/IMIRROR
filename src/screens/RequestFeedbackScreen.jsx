import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const RequestFeedbackScreen = () => {
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  
  const templates = [
    { id: 'personal-growth', name: 'Personal Growth', icon: '🌱' },
    { id: 'emotional-intelligence', name: 'Emotional Intelligence', icon: '🧠' },
    { id: 'relationship', name: 'Relationship', icon: '❤️' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧘' },
    { id: 'communication', name: 'Communication', icon: '💬' },
    { id: 'values', name: 'Values', icon: '⭐' },
    { id: 'conflict-resolution', name: 'Conflict Resolution', icon: '🤝' },
    { id: 'romantic', name: 'Romantic', icon: '💕' },
  ]
  
  const handleSendRequest = () => {
    if (selectedTemplate) {
      // Show success message or navigate
      alert('Feedback request sent successfully!')
      navigate('/dashboard')
    }
  }
  
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
          <h1 className="text-2xl font-bold text-text-primary">Request Feedback</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
            </Card>
            
            {/* Template Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                    selectedTemplate?.id === template.id
                      ? 'bg-primaryLight border-2 border-primary shadow-lg scale-105'
                      : 'bg-gray-50 border border-border-light hover:bg-gray-100'
                  }`}
                >
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
            
            <Button
              onClick={handleSendRequest}
              disabled={!selectedTemplate}
              className="w-full"
            >
              Send Request
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default RequestFeedbackScreen