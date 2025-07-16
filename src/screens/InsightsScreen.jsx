import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Users, Target, Calendar, BarChart3, PieChart } from 'lucide-react'
import Card from '../components/Card'

const InsightsScreen = () => {
  const navigate = useNavigate()
  const [timeframe, setTimeframe] = useState('month')

  const insightsData = {
    summary: {
      totalFeedback: 24,
      avgRating: 4.3,
      improvementAreas: 2,
      strengths: 5
    },
    trends: [
      { skill: 'Leadership', current: 85, previous: 80, trend: 'up' },
      { skill: 'Communication', current: 78, previous: 75, trend: 'up' },
      { skill: 'Teamwork', current: 82, previous: 85, trend: 'down' },
      { skill: 'Problem Solving', current: 76, previous: 70, trend: 'up' }
    ],
    topStrengths: [
      'Clear communication in meetings',
      'Proactive problem-solving approach',
      'Strong team collaboration',
      'Effective time management',
      'Positive attitude and motivation'
    ],
    improvementAreas: [
      {
        area: 'Public Speaking',
        score: 65,
        suggestion: 'Consider joining a public speaking group or taking a presentation skills course'
      },
      {
        area: 'Delegation',
        score: 70,
        suggestion: 'Practice delegating tasks more effectively to develop team members'
      }
    ],
    feedbackSources: [
      { source: 'Direct Reports', count: 8, percentage: 33 },
      { source: 'Peers', count: 10, percentage: 42 },
      { source: 'Managers', count: 4, percentage: 17 },
      { source: 'External', count: 2, percentage: 8 }
    ]
  }

  const TrendCard = ({ skill, current, previous, trend }) => (
    <Card className="mb-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-900">{skill}</h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-lg font-semibold text-blue-600">{current}%</span>
            <span className={`text-sm flex items-center ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${
                trend === 'down' ? 'rotate-180' : ''
              }`} />
              {Math.abs(current - previous)}%
            </span>
          </div>
        </div>
        <div className="w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - current / 100)}`}
              className="text-blue-500"
              strokeLinecap="round"
            />
          </svg>
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
            <h1 className="text-xl font-semibold text-gray-900">Insights</h1>
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

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">{insightsData.summary.totalFeedback}</div>
              <div className="text-xs text-gray-600">Total Feedback</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">{insightsData.summary.avgRating}</div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </Card>
          </div>

          {/* Skill Trends */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Skill Trends
            </h3>
            <div>
              {insightsData.trends.map((trend, index) => (
                <TrendCard key={index} {...trend} />
              ))}
            </div>
          </Card>

          {/* Top Strengths */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Top Strengths
            </h3>
            <div className="space-y-2">
              {insightsData.topStrengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-700">{strength}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Improvement Areas */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Areas for Improvement
            </h3>
            <div className="space-y-4">
              {insightsData.improvementAreas.map((area, index) => (
                <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{area.area}</h4>
                    <span className="text-sm font-semibold text-orange-600">{area.score}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{area.suggestion}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Feedback Sources */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Feedback Sources
            </h3>
            <div className="space-y-3">
              {insightsData.feedbackSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-900">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{source.count}</span>
                    <span className="text-sm font-semibold text-blue-600">{source.percentage}%</span>
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

export default InsightsScreen