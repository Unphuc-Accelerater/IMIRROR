import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Target, Calendar, Plus, X } from 'lucide-react'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

const CreateGoalScreen = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    milestones: ['']
  })

  const categories = [
    'Leadership',
    'Communication',
    'Teamwork',
    'Problem Solving',
    'Time Management',
    'Technical Skills',
    'Personal Development'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, '']
    }))
  }

  const removeMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }))
  }

  const updateMilestone = (index, value) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? value : milestone
      )
    }))
  }

  const handleSubmit = () => {
    if (formData.title && formData.category && formData.deadline) {
      // Here you would typically save the goal
      navigate('/goals')
    }
  }

  const isFormValid = formData.title && formData.category && formData.deadline

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
            <h1 className="text-xl font-semibold text-gray-900">Create Goal</h1>
            <div className="w-9" />
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Goal Title */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Goal Title</h3>
              <Input
                placeholder="Enter your goal title..."
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </Card>

            {/* Description */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <textarea
                placeholder="Describe your goal in detail..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </Card>

            {/* Category */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleInputChange('category', category)}
                    className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                      formData.category === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card>

            {/* Deadline */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Target Deadline
              </h3>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </Card>

            {/* Milestones */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Milestones</h3>
                <button
                  onClick={addMilestone}
                  className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder={`Milestone ${index + 1}...`}
                      value={milestone}
                      onChange={(e) => updateMilestone(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.milestones.length > 1 && (
                      <button
                        onClick={() => removeMilestone(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Preview */}
            {isFormValid && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-blue-50 border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Goal Preview
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Title:</strong> {formData.title}</div>
                    <div><strong>Category:</strong> {formData.category}</div>
                    <div><strong>Deadline:</strong> {formData.deadline}</div>
                    {formData.description && (
                      <div><strong>Description:</strong> {formData.description}</div>
                    )}
                    {formData.milestones.filter(m => m.trim()).length > 0 && (
                      <div>
                        <strong>Milestones:</strong>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          {formData.milestones
                            .filter(m => m.trim())
                            .map((milestone, index) => (
                              <li key={index}>{milestone}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full"
              size="lg"
            >
              <Target className="w-5 h-5 mr-2" />
              Create Goal
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateGoalScreen