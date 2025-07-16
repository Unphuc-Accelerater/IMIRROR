import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Settings, Award, TrendingUp, Calendar, Mail, Phone } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const ProfileScreen = () => {
  const navigate = useNavigate()

  const userProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Product Manager',
    department: 'Product Development',
    joinDate: 'January 2023',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: {
      totalFeedback: 24,
      avgRating: 4.3,
      goalsCompleted: 2,
      coachingSessions: 5
    },
    skills: [
      { name: 'Leadership', level: 85 },
      { name: 'Communication', level: 78 },
      { name: 'Teamwork', level: 82 },
      { name: 'Problem Solving', level: 76 }
    ],
    recentAchievements: [
      { name: 'Communication Master', icon: '💬', date: '2024-01-05' },
      { name: 'Team Player', icon: '🤝', date: '2024-01-10' },
      { name: 'Goal Crusher', icon: '🏆', date: '2024-01-12' }
    ]
  }

  const SkillBar = ({ skill }) => (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-900">{skill.name}</span>
        <span className="text-sm text-gray-600">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${skill.level}%` }}
        />
      </div>
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
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
            <button
              onClick={() => navigate('/settings')}
              className="p-2 rounded-full bg-white shadow-sm"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Profile Header */}
          <Card className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{userProfile.name}</h2>
                <p className="text-sm text-gray-600">{userProfile.role}</p>
                <p className="text-sm text-gray-600">{userProfile.department}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {userProfile.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {userProfile.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Joined {userProfile.joinDate}
              </div>
            </div>

            <Button
              onClick={() => navigate('/edit-profile')}
              variant="outline"
              className="w-full"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userProfile.stats.totalFeedback}</div>
              <div className="text-xs text-gray-600">Total Feedback</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">{userProfile.stats.avgRating}</div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userProfile.stats.goalsCompleted}</div>
              <div className="text-xs text-gray-600">Goals Completed</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userProfile.stats.coachingSessions}</div>
              <div className="text-xs text-gray-600">Coaching Sessions</div>
            </Card>
          </div>

          {/* Skills */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Top Skills
            </h3>
            <div>
              {userProfile.skills.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
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
              {userProfile.recentAchievements.map((achievement, index) => (
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

export default ProfileScreen