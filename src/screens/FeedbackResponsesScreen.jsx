import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, CheckCircle, Users, Eye } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const FeedbackResponsesScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { template, recipients, sentAt } = location.state || {}
  
  const [responses] = useState([
    {
      id: 1,
      respondent: 'Anonymous',
      status: 'completed',
      completedAt: '2024-01-15T10:30:00Z',
      rating: 4.2,
      responses: {
        'How would you rate their communication skills?': 'Very good, always clear and concise',
        'What areas could they improve?': 'Could be more assertive in meetings',
        'What are their biggest strengths?': 'Great listener and very empathetic'
      }
    },
    {
      id: 2,
      respondent: 'Anonymous',
      status: 'completed',
      completedAt: '2024-01-15T14:20:00Z',
      rating: 4.7,
      responses: {
        'How would you rate their communication skills?': 'Excellent, very articulate',
        'What areas could they improve?': 'Sometimes talks too fast when excited',
        'What are their biggest strengths?': 'Creative problem solver'
      }
    },
    {
      id: 3,
      respondent: 'Anonymous',
      status: 'pending',
      sentAt: sentAt || '2024-01-14T09:00:00Z'
    }
  ])
  
  const completedResponses = responses.filter(r => r.status === 'completed')
  const pendingResponses = responses.filter(r => r.status === 'pending')
  
  const averageRating = completedResponses.length > 0 
    ? completedResponses.reduce((sum, r) => sum + r.rating, 0) / completedResponses.length 
    : 0
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
          <h1 className="text-2xl font-bold text-text-primary">Feedback Responses</h1>
        </motion.div>
        
        {/* Template Info */}
        {template && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card>
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center mr-3`}>
                  <span className="text-2xl">{template.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{template.title}</h3>
                  <p className="text-sm text-text-secondary">Sent to {recipients?.length || 0} people</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <Card className="text-center" padding="small">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{recipients?.length || 0}</p>
            <p className="text-xs text-text-secondary">Sent</p>
          </Card>
          <Card className="text-center" padding="small">
            <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{completedResponses.length}</p>
            <p className="text-xs text-text-secondary">Completed</p>
          </Card>
          <Card className="text-center" padding="small">
            <Clock className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{pendingResponses.length}</p>
            <p className="text-xs text-text-secondary">Pending</p>
          </Card>
        </motion.div>
        
        {/* Average Rating */}
        {completedResponses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Card className="text-center">
              <h3 className="text-lg font-bold text-text-primary mb-2">Average Rating</h3>
              <div className="text-4xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`w-6 h-6 ${
                      star <= averageRating ? 'text-warning' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Responses */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-text-primary">Responses</h3>
          
          {responses.map((response, index) => (
            <motion.div
              key={response.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primaryLight rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-primary">
                        {response.respondent.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{response.respondent}</p>
                      <p className="text-xs text-text-secondary">
                        {response.status === 'completed' 
                          ? `Completed ${formatDate(response.completedAt)}`
                          : `Sent ${formatDate(response.sentAt)}`
                        }
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    response.status === 'completed' 
                      ? 'bg-success text-white' 
                      : 'bg-warning text-white'
                  }`}>
                    {response.status === 'completed' ? 'Completed' : 'Pending'}
                  </div>
                </div>
                
                {response.status === 'completed' && (
                  <>
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-text-secondary mr-2">Rating:</span>
                      <span className="font-bold text-primary">{response.rating}/5</span>
                    </div>
                    <Button
                      onClick={() => navigate('/feedback-details', { state: { response } })}
                      variant="outline"
                      size="small"
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
        
        {responses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="text-center py-8">
              <p className="text-lg text-text-secondary mb-1">No responses yet</p>
              <p className="text-sm text-text-light">
                Responses will appear here once people complete your feedback request.
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default FeedbackResponsesScreen