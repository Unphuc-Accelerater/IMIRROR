import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Calendar, Clock } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const JournalEntryScreen = () => {
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const moods = [
    { name: 'Excited', emoji: '😄', color: 'bg-yellow-100' },
    { name: 'Happy', emoji: '😊', color: 'bg-green-100' },
    { name: 'Calm', emoji: '😌', color: 'bg-blue-100' },
    { name: 'Neutral', emoji: '😐', color: 'bg-gray-100' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-200' },
    { name: 'Anxious', emoji: '😰', color: 'bg-orange-100' },
    { name: 'Angry', emoji: '😠', color: 'bg-red-100' },
    { name: 'Tired', emoji: '😴', color: 'bg-purple-100' },
  ]
  
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }
  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }
  
  const handleSave = async () => {
    if (!selectedMood || !title.trim() || !content.trim()) return
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/journal', { 
        state: { 
          newEntry: {
            id: Date.now(),
            title,
            content,
            mood: selectedMood,
            tags,
            date: new Date().toISOString(),
          }
        }
      })
    }, 1000)
  }
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
  
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
              onClick={() => navigate('/journal')}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-text-primary" />
            </button>
            <h1 className="text-2xl font-bold text-text-primary">New Entry</h1>
          </div>
          <Button
            onClick={handleSave}
            disabled={!selectedMood || !title.trim() || !content.trim()}
            loading={isLoading}
            size="small"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </motion.div>
        
        {/* Date & Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card padding="small">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {currentDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {currentTime}
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <h3 className="text-lg font-bold text-text-primary mb-4">How are you feeling?</h3>
            <div className="grid grid-cols-4 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  onClick={() => setSelectedMood(mood)}
                  className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-200 ${
                    selectedMood?.name === mood.name 
                      ? 'bg-primaryLight border-2 border-primary scale-105' 
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <span className="text-2xl mb-1">{mood.emoji}</span>
                  <span className="text-xs font-medium text-text-primary text-center">
                    {mood.name}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Title
            </label>
            <input
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
          </Card>
        </motion.div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card>
            <label className="block text-sm font-medium text-text-primary mb-2">
              What's on your mind?
            </label>
            <textarea
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="input-field resize-none"
            />
          </Card>
        </motion.div>
        
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tags (Optional)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="input-field flex-1"
              />
              <Button
                onClick={addTag}
                disabled={!newTag.trim()}
                size="small"
                className="px-4"
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primaryLight text-primary px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-primaryDark"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default JournalEntryScreen