import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Award, Trophy, Star, Target, Users, Calendar } from 'lucide-react'
import Card from '../components/Card'

const AchievementsScreen = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('earned')

  const achievements = {
    earned: [
      {
        id: 1,
        title: 'First Steps',
        description: 'Complete your first feedback request',
        icon: '🎯',
        category: 'Milestone',
        earnedDate: '2024-01-01',
        points: 100
      },
      {
        id: 2,
        title: 'Communication Master',
        description: 'Achieve 90% or higher in communication skills',
        icon: '💬',
        category: 'Skill',
        earnedDate: '2024-01-05',
        points: 250
      },
      {
        id: 3,
        title: 'Team Player',
        description: 'Receive positive feedback from 5 team members',
        icon: '🤝',
        category: 'Social',
        earnedDate: '2024-01-10',
        points: 200
      },
      {
        id: 4,
        title: 'Goal Crusher',
        description: 'Complete your first personal development goal',
        icon: '🏆',
        category: 'Achievement',
        earnedDate: '2024-01-12',
        points: 300
      }
    ],
    available: [
      {
        id: 5,
        title: 'Leadership Legend',
        description: 'Achieve 95% or higher in leadership skills',
        icon: '👑',
        category: 'Skill',
        progress: 85,
        requirement: 95,
        points: 500
      },
      {
        id: 6,
        title: 'Feedback Champion',
        description: 'Send feedback to 10 different people',
        icon: '📝',
        category: 'Social',
        progress: 6,
        requirement: 10,
        points: 300
      },
      {
        id: 7,
        title: 'Consistency King',
        description: 'Log journal entries for 30 consecutive days',
        icon: '📅',
        category: 'Habit',
        progress: 18,
        requirement: 30,
        points: 400
      },
      {
        id: 8,
        title: 'Coach Connector',
        description: 'Complete 5 coaching sessions',
        icon: '🎓',
        category: 'Learning',
        progress: 2,
        requirement: 5,
        points: 350
      }
    ]
  }

  const totalPoints = achievements.earned.reduce((sum, achievement) => sum + achievement.points, 0)

  const ProgressBar = ({ value, max }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  )

  const AchievementCard = ({ achievement, isEarned = false }) => (
    <Card className={`mb-4 ${isEarned ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : ''}`}>
      <div className="flex items-start space-x-4">
        <div className={`text-3xl p-3 rounded-full ${
          isEarned ? 'bg-yellow-100' : 'bg-gray-100'
        }`}>
          {achievement.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-yellow-600">
                <Star className="w-4 h-4 mr-1" />
                <span className="font-semibold">{achievement.points}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              achievement.category === 'Milestone' ? 'bg-blue-100 text-blue-800' :
              achievement.category === 'Skill' ? 'bg-green-100 text-green-800' :
              achievement.category === 'Social' ? 'bg-purple-100 text-purple-800' :
              achievement.category === 'Achievement' ? 'bg-yellow-100 text-yellow-800' :
              achievement.category === 'Habit' ? 'bg-indigo-100 text-indigo-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {achievement.category}
            </span>

            {isEarned ? (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {achievement.earnedDate}
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                {achievement.progress}/{achievement.requirement}
              </div>
            )}
          </div>

          {!isEarned && (
            <div className="mt-3">
              <ProgressBar value={achievement.progress} max={achievement.requirement} />
            </div>
          )}
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
            <h1 className="text-xl font-semibold text-gray-900">Achievements</h1>
            <div className="w-9" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
              <div className="text-xs text-gray-600">Total Points</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">{achievements.earned.length}</div>
              <div className="text-xs text-gray-600">Earned</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">{achievements.available.length}</div>
              <div className="text-xs text-gray-600">Available</div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('earned')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'earned'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Earned
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'available'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Available
            </button>
          </div>

          {/* Achievements List */}
          <div>
            {activeTab === 'earned' ? (
              achievements.earned.length > 0 ? (
                achievements.earned.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} isEarned={true} />
                ))
              ) : (
                <Card className="text-center py-8">
                  <div className="text-gray-400 mb-2">🏆</div>
                  <h3 className="font-medium text-gray-900 mb-1">No achievements yet</h3>
                  <p className="text-sm text-gray-600">Start using the app to earn your first achievement!</p>
                </Card>
              )
            ) : (
              achievements.available.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} isEarned={false} />
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AchievementsScreen