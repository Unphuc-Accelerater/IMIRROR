import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const SelfAssessmentScreen = () => {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  
  const questions = [
    {
      id: 1,
      text: "Do you often compare yourself to others?",
      options: ["Yes", "Sometimes", "No"],
      type: "negative",
    },
    {
      id: 2,
      text: "Are you proud of who you are becoming?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 3,
      text: "Do you prioritize your emotional well-being daily?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 4,
      text: "Are you able to set clear boundaries in personal or professional life?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 5,
      text: "Do you feel a sense of purpose in your daily activities?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
  ]
  
  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestionIndex].id, answer }]
    setAnswers(newAnswers)
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }
  
  const calculateScore = () => {
    let score = 0
    answers.forEach(ans => {
      const question = questions.find(q => q.id === ans.questionId)
      if (question) {
        if (question.type === "negative") {
          if (ans.answer === "No") score += 1
          else if (ans.answer === "Sometimes") score += 0.5
        } else {
          if (ans.answer === "Yes") score += 1
          else if (ans.answer === "Sometimes") score += 0.5
        }
      }
    })
    return Math.round((score / questions.length) * 100)
  }
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success border-success'
    if (score >= 60) return 'text-primary border-primary'
    if (score >= 40) return 'text-warning border-warning'
    return 'text-error border-error'
  }
  
  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }
  
  const resetAssessment = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setShowResults(false)
  }
  
  if (showResults) {
    const score = calculateScore()
    const scoreColorClass = getScoreColor(score)
    const scoreLabel = getScoreLabel(score)
    
    return (
      <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
        <div className="p-6 pb-8">
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
            <h1 className="text-2xl font-bold text-text-primary">Assessment Complete</h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center min-h-[60vh]"
          >
            <Card className="text-center py-12 w-full max-w-sm">
              <h2 className="text-xl font-bold text-text-primary mb-8">
                Your Self-Assessment Score
              </h2>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className={`w-32 h-32 rounded-full border-8 flex items-center justify-center mx-auto mb-4 ${scoreColorClass}`}
              >
                <span className={`text-4xl font-bold ${scoreColorClass.split(' ')[0]}`}>
                  {score}%
                </span>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className={`text-lg font-medium mb-6 ${scoreColorClass.split(' ')[0]}`}
              >
                {scoreLabel}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm text-text-secondary leading-relaxed mb-8"
              >
                Based on your answers, this is your current self-reflection score. 
                Regular self-assessment can help track your personal growth journey.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="space-y-3"
              >
                <Button
                  variant="outline"
                  onClick={resetAssessment}
                  className="w-full"
                >
                  Retake Assessment
                </Button>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Back to Dashboard
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }
  
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="p-6 pb-8">
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
          <h1 className="text-2xl font-bold text-text-primary">Self-Assessment</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <p className="text-lg font-semibold text-text-primary text-center mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="bg-primary h-1 rounded-full"
              />
            </div>
            
            <Card className="bg-gray-50 text-center py-12 mb-8">
              <motion.p
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base font-medium text-text-primary leading-relaxed mb-8"
              >
                {currentQuestion.text}
              </motion.p>
              
              <div className="space-y-3 max-w-xs mx-auto">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => handleAnswer(option)}
                    className="w-full bg-gray-50 border-2 border-border-light rounded-2xl py-3 px-6 text-base font-medium text-text-primary hover:border-primary hover:bg-primaryLight transition-all duration-200 active:scale-95"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </Card>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default SelfAssessmentScreen