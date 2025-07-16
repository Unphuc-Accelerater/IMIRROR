import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Target, Calendar, Award } from 'lucide-react'
import Card from '../components/Card'

const ProgressTrackingScreen = () => {
  const navigate = useNavigate()
  const [timeframe, setTimeframe] = useState('month')

  const progressData = {
    overall: 78,
    categories: [
      { name: 'Leadership', score: 85, change: +5 },
      { name: 'Communication', score: 72, change: +3 },
      { name: 'Teamwork', score: 80, change: +2 },
      { name: 'Problem Solving', score: 75, change: +8 }
    ],
    goals: [
      { name: 'Improve Public Speaking', progress: 65, target: 100 },
      { name: 'Team Leadership', progress: 80, target: 100 },
      { name: 'Conflict Resolution', progress: 45, target: 100 }
    ],
    achievements: [
      { name: 'First Feedback Request', date: '2024-01-01', icon: '🎯' },
      { name: 'Leadership Milestone', date: '2024-01-05', icon: '👑' },
      { name: 'Communication Expert', date: '2024-01-10', icon: '💬' }
    ]
  }

  const ProgressBar = ({ value, max = 100, color = 'blue' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
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
            <h1 className="text-xl font-semibold text-gray-900">Progress Tracking</h1>
            <div className="w-9" />
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {['week', 'month', 'quarter'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors capitalize ${
                  timeframe === period
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Overall Progress */}
          <Card className="mb-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressData.overall / 100)}`}
                    className="text-blue-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{progressData.overall}%</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Overall Progress</h3>
              <p className="text-sm text-gray-600">Great improvement this {timeframe}!</p>
            </div>
          </Card>

          {/* Category Progress */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Skills Progress
            </h3>
            <div className="space-y-4">
              {progressData.categories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{category.score}%</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        category.change > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.change > 0 ? '+' : ''}{category.change}
                      </span>
                    </div>
                  </div>
                  <ProgressBar value={category.score} />
                </div>
              ))}
            </div>
          </Card>

          {/* Goals Progress */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Goal Progress
            </h3>
            <div className="space-y-4">
              {progressData.goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{goal.name}</span>
                    <span className="text-sm text-gray-600">{goal.progress}%</span>
                  </div>
                  <ProgressBar value={goal.progress} max={goal.target} color="green" />
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Recent Achievements
            </h3>
            <div className="space-y-3">
              {progressData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {achievement.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressTrackingScreen