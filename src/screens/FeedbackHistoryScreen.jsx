import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Filter, Calendar, Users, TrendingUp } from 'lucide-react'
import Card from '../components/Card'

const FeedbackHistoryScreen = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const feedbackHistory = [
    {
      id: 1,
      title: 'Leadership Skills Assessment',
      type: 'received',
      date: '2024-01-10',
      responses: 5,
      avgRating: 4.2,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Team Collaboration Feedback',
      type: 'sent',
      date: '2024-01-08',
      responses: 3,
      avgRating: 4.7,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Communication Skills Review',
      type: 'received',
      date: '2024-01-05',
      responses: 8,
      avgRating: 4.0,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Project Management Feedback',
      type: 'sent',
      date: '2024-01-03',
      responses: 2,
      avgRating: 4.5,
      status: 'pending'
    }
  ]

  const filteredHistory = feedbackHistory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesFilter
  })

  const FeedbackCard = ({ feedback }) => (
    <Card className="mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{feedback.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {feedback.date}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {feedback.responses} responses
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {feedback.avgRating}/5.0
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              feedback.type === 'received' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {feedback.type === 'received' ? 'Received' : 'Sent'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              feedback.status === 'completed'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {feedback.status}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mobile-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Feedback History</h1>
            <div className="w-9" />
          </div>

          {/* Search and Filter */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('received')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === 'received'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                Received
              </button>
              <button
                onClick={() => setFilterType('sent')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === 'sent'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                Sent
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Total Requests</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">4.3</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </Card>
          </div>

          {/* Feedback List */}
          <div>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))
            ) : (
              <Card className="text-center py-8">
                <div className="text-gray-400 mb-2">📋</div>
                <h3 className="font-medium text-gray-900 mb-1">No feedback found</h3>
                <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FeedbackHistoryScreen