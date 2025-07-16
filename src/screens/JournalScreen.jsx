import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const JournalScreen = () => {
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [journalText, setJournalText] = useState('')
  const [entries, setEntries] = useState([])
  
  const moods = [
    { name: 'Excited', emoji: '😄', color: 'bg-yellow-100' },
    { name: 'Happy', emoji: '😊', color: 'bg-green-100' },
    { name: 'Neutral', emoji: '😐', color: 'bg-gray-100' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-100' },
  ]
  
  const handleSaveEntry = () => {
    if (selectedMood && journalText.trim()) {
      const newEntry = {
        id: Date.now(),
        mood: selectedMood,
        text: journalText,
        date: new Date().toLocaleDateString(),
      }
      setEntries([newEntry, ...entries])
      setJournalText('')
      setSelectedMood(null)
      setIsModalVisible(false)
    }
  }
  
  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }
  
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
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Journal</h1>
        </motion.div>
        
        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <h2 className="text-lg font-bold text-primary text-center mb-6">
              How are you today?
            </h2>
            <div className="flex justify-around">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  onClick={() => setSelectedMood(mood)}
                  className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-200 ${
                    selectedMood?.name === mood.name ? 'bg-primaryLight scale-110' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-3xl mb-1">{mood.emoji}</span>
                  <span className="text-xs font-medium text-text-primary">{mood.name}</span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">History</h3>
            {entries.length > 0 && (
              <span className="text-xs text-text-secondary">{entries.length} entries</span>
            )}
          </div>
          
          <div className="space-y-4">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${entry.mood.color}`}>
                          <span className="text-lg">{entry.mood.emoji}</span>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{entry.mood.name}</p>
                          <p className="text-xs text-text-secondary">{entry.date}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{entry.text}</p>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="text-center py-8">
                <p className="text-base text-text-secondary mb-1">No journal entries yet.</p>
                <p className="text-sm text-text-light">
                  Add your first entry by clicking the button below!
                </p>
              </Card>
            )}
          </div>
        </motion.div>
        
        {/* Floating Add Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="fixed bottom-6 right-6"
        >
          <button
            onClick={() => setIsModalVisible(true)}
            className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primaryDark transition-colors duration-200 hover:scale-110"
          >
            <Plus className="w-6 h-6" />
          </button>
        </motion.div>
        
        {/* Modal */}
        <AnimatePresence>
          {isModalVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
              onClick={() => setIsModalVisible(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm"
              >
                <Card>
                  <h3 className="text-xl font-bold text-text-primary text-center mb-6">
                    New Journal Entry
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-text-primary mb-3">How are you feeling?</p>
                    <div className="flex justify-around">
                      {moods.map((mood) => (
                        <button
                          key={mood.name}
                          onClick={() => setSelectedMood(mood)}
                          className={`p-2 rounded-2xl transition-all duration-200 ${
                            selectedMood?.name === mood.name ? 'bg-primaryLight scale-110' : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-2xl">{mood.emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      What's on your mind?
                    </label>
                    <textarea
                      placeholder="Write your thoughts here..."
                      value={journalText}
                      onChange={(e) => setJournalText(e.target.value)}
                      rows={4}
                      className="input-field resize-none"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsModalVisible(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveEntry}
                      disabled={!selectedMood || !journalText.trim()}
                      className="flex-1"
                    >
                      Save
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default JournalScreen