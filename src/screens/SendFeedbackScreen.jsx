import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, X, Send } from 'lucide-react'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

const SendFeedbackScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const template = location.state?.template
  
  const [recipients, setRecipients] = useState([])
  const [newRecipient, setNewRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  
  const addRecipient = () => {
    if (newRecipient.trim() && !recipients.includes(newRecipient.trim())) {
      setRecipients([...recipients, newRecipient.trim()])
      setNewRecipient('')
    }
  }
  
  const removeRecipient = (recipient) => {
    setRecipients(recipients.filter(r => r !== recipient))
  }
  
  const handleSend = async () => {
    if (recipients.length === 0) return
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/feedback-responses', { 
        state: { 
          template, 
          recipients, 
          sentAt: new Date().toISOString() 
        } 
      })
    }, 2000)
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
            onClick={() => navigate('/feedback-templates')}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Send Feedback Request</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Template Info */}
          {template && (
            <Card className="mb-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center mr-3`}>
                  <span className="text-2xl">{template.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{template.title}</h3>
                  <p className="text-sm text-text-secondary">{template.questions} questions</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary">{template.description}</p>
            </Card>
          )}
          
          {/* Recipients */}
          <Card className="mb-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Send to</h3>
            
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter email or phone number"
                value={newRecipient}
                onChange={setNewRecipient}
                className="flex-1"
              />
              <Button
                onClick={addRecipient}
                disabled={!newRecipient.trim()}
                size="small"
                className="px-4"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {recipients.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-text-primary">Recipients ({recipients.length})</p>
                <div className="flex flex-wrap gap-2">
                  {recipients.map((recipient, index) => (
                    <div
                      key={index}
                      className="bg-primaryLight text-primary px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <span>{recipient}</span>
                      <button
                        onClick={() => removeRecipient(recipient)}
                        className="ml-2 hover:text-primaryDark"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
          
          {/* Personal Message */}
          <Card className="mb-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Personal Message (Optional)</h3>
            <textarea
              placeholder="Add a personal note to your feedback request..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="input-field resize-none"
            />
          </Card>
          
          {/* Privacy Settings */}
          <Card className="mb-8">
            <h3 className="text-lg font-bold text-text-primary mb-4">Privacy Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(true)}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium text-text-primary">Anonymous feedback</p>
                  <p className="text-sm text-text-secondary">Recipients won't see who sent the request</p>
                </div>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  checked={!isAnonymous}
                  onChange={() => setIsAnonymous(false)}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium text-text-primary">Show my identity</p>
                  <p className="text-sm text-text-secondary">Recipients will know the request is from you</p>
                </div>
              </label>
            </div>
          </Card>
          
          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={recipients.length === 0}
            loading={isLoading}
            className="w-full"
            size="large"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Feedback Request
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default SendFeedbackScreen