import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Star } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const FeedbackTemplatesScreen = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'Personal', 'Professional', 'Relationship', 'Health']
  
  const templates = [
    {
      id: 1,
      title: 'Personal Growth',
      description: 'Get feedback on your personal development journey',
      category: 'Personal',
      icon: '🌱',
      color: 'bg-green-50',
      questions: 12,
      popular: true,
    },
    {
      id: 2,
      title: 'Communication Skills',
      description: 'Understand how others perceive your communication',
      category: 'Professional',
      icon: '💬',
      color: 'bg-blue-50',
      questions: 8,
      popular: true,
    },
    {
      id: 3,
      title: 'Emotional Intelligence',
      description: 'Learn about your emotional awareness and empathy',
      category: 'Personal',
      icon: '🧠',
      color: 'bg-purple-50',
      questions: 15,
      popular: false,
    },
    {
      id: 4,
      title: 'Leadership Style',
      description: 'Get insights on your leadership approach',
      category: 'Professional',
      icon: '👑',
      color: 'bg-yellow-50',
      questions: 10,
      popular: false,
    },
    {
      id: 5,
      title: 'Relationship Dynamics',
      description: 'Understand your role in relationships',
      category: 'Relationship',
      icon: '❤️',
      color: 'bg-pink-50',
      questions: 14,
      popular: true,
    },
    {
      id: 6,
      title: 'Work-Life Balance',
      description: 'Get feedback on how you manage priorities',
      category: 'Health',
      icon: '⚖️',
      color: 'bg-indigo-50',
      questions: 9,
      popular: false,
    },
  ]
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
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
            onClick={() => navigate('/request-feedback')}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Feedback Templates</h1>
        </motion.div>
        
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </motion.div>
        
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-2 mb-6 overflow-x-auto pb-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border-primary text-primary hover:bg-primaryLight'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Templates Grid */}
        <div className="space-y-4">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="relative">
                {template.popular && (
                  <div className="absolute top-4 right-4 bg-warning text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </div>
                )}
                
                <div className="flex items-start mb-4">
                  <div className={`w-16 h-16 ${template.color} rounded-2xl flex items-center justify-center mr-4`}>
                    <span className="text-3xl">{template.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-2">{template.title}</h3>
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      {template.description}
                    </p>
                    <div className="flex items-center text-xs text-text-light">
                      <span className="bg-gray-100 px-2 py-1 rounded mr-2">{template.category}</span>
                      <span>{template.questions} questions</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={() => navigate('/send-feedback', { state: { template } })}
                  className="w-full"
                  size="small"
                >
                  Use Template
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="text-center py-8">
              <p className="text-lg text-text-secondary mb-1">No templates found</p>
              <p className="text-sm text-text-light">
                Try a different search or category.
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default FeedbackTemplatesScreen