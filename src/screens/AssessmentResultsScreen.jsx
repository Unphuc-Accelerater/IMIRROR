import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Share, TrendingUp, Target } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const AssessmentResultsScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { score, answers } = location.state || { score: 75, answers: [] }
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success border-success bg-green-50'
    if (score >= 60) return 'text-primary border-primary bg-blue-50'
    if (score >= 40) return 'text-warning border-warning bg-yellow-50'
    return 'text-error border-error bg-red-50'
  }
  
  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }
  
  const getRecommendations = (score) => {
    if (score >= 80) {
      return [
        "Continue your current practices",
        "Consider mentoring others",
        "Set new challenging goals",
        "Maintain work-life balance"
      ]
    } else if (score >= 60) {
      return [
        "Focus on identified weak areas",
        "Seek feedback from peers",
        "Practice mindfulness daily",
        "Set specific improvement goals"
      ]
    } else if (score >= 40) {
      return [
        "Consider professional coaching",
        "Start with small daily habits",
        "Join support groups",
        "Track progress regularly"
      ]
    } else {
      return [
        "Seek professional help",
        "Start with basic self-care",
        "Build a support network",
        "Take small steps daily"
      ]
    }
  }
  
  const scoreColorClass = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)
  const recommendations = getRecommendations(score)
  
  const categories = [
    { name: 'Self-Awareness', score: score + Math.random() * 10 - 5 },
    { name: 'Emotional Regulation', score: score + Math.random() * 10 - 5 },
    { name: 'Social Skills', score: score + Math.random() * 10 - 5 },
    { name: 'Motivation', score: score + Math.random() * 10 - 5 },
    { name: 'Empathy', score: score + Math.random() * 10 - 5 },
  ].map(cat => ({ ...cat, score: Math.max(0, Math.min(100, cat.score)) }))
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="p-6 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center">
            <button
              onClick={() => navigate('/self-assessment')}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-text-primary" />
            </button>
            <h1 className="text-2xl font-bold text-text-primary">Assessment Results</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="small">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="small">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
        
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className={`text-center ${scoreColorClass.split(' ')[2]}`}>
            <h2 className="text-xl font-bold text-text-primary mb-4">
              Your Overall Score
            </h2>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className={`w-32 h-32 rounded-full border-8 flex items-center justify-center mx-auto mb-4 ${scoreColorClass}`}
            >
              <span className={`text-4xl font-bold ${scoreColorClass.split(' ')[0]}`}>
                {score}%
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-lg font-medium mb-2 ${scoreColorClass.split(' ')[0]}`}
            >
              {scoreLabel}
            </motion.p>
            
            <p className="text-sm text-text-secondary">
              Based on your responses to {answers.length || 5} questions
            </p>
          </Card>
        </motion.div>
        
        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <Card>
            <h3 className="text-lg font-bold text-text-primary mb-4">Category Breakdown</h3>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">
                      {category.name}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {Math.round(category.score)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.score}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="bg-primary h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-lg font-bold text-text-primary">Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-sm text-text-secondary">{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate('/goals')}
            className="w-full"
          >
            <Target className="w-5 h-5 mr-2" />
            Set Improvement Goals
          </Button>
          
          <Button
            onClick={() => navigate('/progress')}
            variant="outline"
            className="w-full"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Track Progress
          </Button>
          
          <Button
            onClick={() => navigate('/self-assessment')}
            variant="outline"
            className="w-full"
          >
            Retake Assessment
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default AssessmentResultsScreen