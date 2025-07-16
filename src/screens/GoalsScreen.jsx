import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Target, Calendar, TrendingUp } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const GoalsScreen = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('active')

  const goals = {
    active: [
      {
        id: 1,
        title: 'Improve Public Speaking',
        description: 'Become more confident in presentations and public speaking',
        progress: 65,
        target: 100,
        deadline: '2024-03-01',
        category: 'Communication',
        milestones: [
          { title: 'Complete presentation course', completed: true },
          { title: 'Give 3 team presentations', completed: true },
          { title: 'Present at company meeting', completed: false },
          { title: 'Join Toastmasters', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Team Leadership Skills',
        description: 'Develop skills to effectively lead and motivate team members',
        progress: 80,
        target: 100,
        deadline: '2024-02-15',
        category: 'Leadership',
        milestones: [
          { title: 'Complete leadership assessment', completed: true },
          { title: 'Lead 2 team projects', completed: true },
          { title: 'Implement feedback system', completed: true },
          { title: 'Mentor junior team member', completed: false }
        ]
      }
    ],
    completed: [
      {
        id: 3,
        title: 'Time Management',
        description: 'Improve productivity and work-life balance',
        progress: 100,
        target: 100,
        deadline: '2024-01-01',
        category: 'Productivity',
        completedDate: '2023-12-28'
      }
    ]
  }

  const ProgressBar = ({ value, max = 100 }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  )

  const GoalCard = ({ goal, isCompleted = false }) => (
    <Card className="mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {goal.category}
          </span>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-blue-600">{goal.progress}%</div>
          {!isCompleted && (
            <div className="text-xs text-gray-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {goal.deadline}
            </div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <ProgressBar value={goal.progress} max={goal.target} />
      </div>

      {!isCompleted && goal.milestones && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Milestones:</h4>
          {goal.milestones.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                milestone.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300'
              }`}>
                {milestone.completed && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className={`text-sm ${
                milestone.completed ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {milestone.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {isCompleted && goal.completedDate && (
        <div className="text-sm text-green-600 flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          Completed on {goal.completedDate}
        </div>
      )}
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
            <h1 className="text-xl font-semibold text-gray-900">My Goals</h1>
            <button
              onClick={() => navigate('/create-goal')}
              className="p-2 rounded-full bg-blue-500 text-white shadow-sm"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-xs text-gray-600">Total Goals</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-xs text-gray-600">Completed</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-orange-600">72%</div>
              <div className="text-xs text-gray-600">Avg Progress</div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'active'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Active Goals
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Goals List */}
          <div>
            {activeTab === 'active' ? (
              goals.active.length > 0 ? (
                goals.active.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))
              ) : (
                <Card className="text-center py-8">
                  <div className="text-gray-400 mb-2">🎯</div>
                  <h3 className="font-medium text-gray-900 mb-1">No active goals</h3>
                  <p className="text-sm text-gray-600 mb-4">Create your first goal to get started</p>
                  <Button onClick={() => navigate('/create-goal')}>
                    <Target className="w-4 h-4 mr-2" />
                    Create Goal
                  </Button>
                </Card>
              )
            ) : (
              goals.completed.length > 0 ? (
                goals.completed.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} isCompleted={true} />
                ))
              ) : (
                <Card className="text-center py-8">
                  <div className="text-gray-400 mb-2">🏆</div>
                  <h3 className="font-medium text-gray-900 mb-1">No completed goals yet</h3>
                  <p className="text-sm text-gray-600">Keep working on your active goals!</p>
                </Card>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GoalsScreen