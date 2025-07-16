import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Video, Phone, MessageCircle, Star } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const MySessionsScreen = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('upcoming')

  const upcomingSessions = [
    {
      id: 1,
      coach: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Leadership Coach',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'video',
      status: 'confirmed'
    },
    {
      id: 2,
      coach: {
        name: 'Michael Chen',
        specialty: 'Career Coach',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2024-01-18',
      time: '2:00 PM',
      type: 'phone',
      status: 'pending'
    }
  ]

  const pastSessions = [
    {
      id: 3,
      coach: {
        name: 'Dr. Emily Davis',
        specialty: 'Life Coach',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2024-01-10',
      time: '11:00 AM',
      type: 'video',
      status: 'completed',
      rating: 5
    }
  ]

  const SessionCard = ({ session, isPast = false }) => (
    <Card className="mb-4">
      <div className="flex items-start space-x-4">
        <img
          src={session.coach.avatar}
          alt={session.coach.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{session.coach.name}</h3>
          <p className="text-sm text-gray-600">{session.coach.specialty}</p>
          
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              {session.date}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {session.time}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              {session.type === 'video' ? (
                <Video className="w-4 h-4 mr-1" />
              ) : (
                <Phone className="w-4 h-4 mr-1" />
              )}
              {session.type}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              session.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              session.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {session.status}
            </span>

            <div className="flex space-x-2">
              {!isPast && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/chat/${session.id}`)}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              )}
              
              {isPast && session.rating && (
                <div className="flex items-center">
                  {[...Array(session.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              )}
            </div>
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
            <h1 className="text-xl font-semibold text-gray-900">My Sessions</h1>
            <div className="w-9" />
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Past Sessions
            </button>
          </div>

          {/* Sessions List */}
          <div>
            {activeTab === 'upcoming' ? (
              upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))
              ) : (
                <Card className="text-center py-8">
                  <div className="text-gray-400 mb-2">📅</div>
                  <h3 className="font-medium text-gray-900 mb-1">No upcoming sessions</h3>
                  <p className="text-sm text-gray-600 mb-4">Book a session with a coach to get started</p>
                  <Button onClick={() => navigate('/coaches')}>
                    Find Coaches
                  </Button>
                </Card>
              )
            ) : (
              pastSessions.length > 0 ? (
                pastSessions.map((session) => (
                  <SessionCard key={session.id} session={session} isPast={true} />
                ))
              ) : (
                <Card className="text-center py-8">
                  <div className="text-gray-400 mb-2">📋</div>
                  <h3 className="font-medium text-gray-900 mb-1">No past sessions</h3>
                  <p className="text-sm text-gray-600">Your completed sessions will appear here</p>
                </Card>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MySessionsScreen