import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, HelpCircle, MessageCircle, Mail, Phone, ChevronRight } from 'lucide-react'
import Input from '../components/Input'
import Card from '../components/Card'

const HelpScreen = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          question: 'How do I create my first feedback request?',
          answer: 'Go to the Dashboard and tap "Request Feedback". Choose a template or create a custom request, select recipients, and send!'
        },
        {
          question: 'How do I set up my profile?',
          answer: 'Navigate to Profile > Edit Profile to add your photo, bio, and professional information.'
        }
      ]
    },
    {
      title: 'Feedback & Assessment',
      icon: '💬',
      questions: [
        {
          question: 'How are feedback scores calculated?',
          answer: 'Scores are calculated based on weighted responses from your feedback requests, with recent feedback having more impact.'
        },
        {
          question: 'Can I see who gave me feedback?',
          answer: 'Feedback can be anonymous or identified based on the sender\'s preference when submitting.'
        }
      ]
    },
    {
      title: 'Coaching & Goals',
      icon: '🎯',
      questions: [
        {
          question: 'How do I book a coaching session?',
          answer: 'Browse coaches in the Coaches section, select a coach, and choose an available time slot that works for you.'
        },
        {
          question: 'How do I track my goals?',
          answer: 'Create goals in the Goals section and track progress through regular check-ins and milestone updates.'
        }
      ]
    }
  ]

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      action: () => console.log('Open chat')
    },
    {
      title: 'Email Support',
      description: 'support@imirrorapp.com',
      icon: Mail,
      action: () => console.log('Open email')
    },
    {
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
      icon: Phone,
      action: () => console.log('Call support')
    }
  ]

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-3 text-left flex items-center justify-between"
        >
          <span className="font-medium text-gray-900">{question}</span>
          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`} />
        </button>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-3"
          >
            <p className="text-sm text-gray-600">{answer}</p>
          </motion.div>
        )}
      </div>
    )
  }

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
            <h1 className="text-xl font-semibold text-gray-900">Help & Support</h1>
            <div className="w-9" />
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Actions */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Need immediate help?</h3>
            <div className="space-y-3">
              {contactOptions.map((option, index) => {
                const IconComponent = option.icon
                return (
                  <button
                    key={index}
                    onClick={option.action}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-900">{option.title}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                )
              })}
            </div>
          </Card>

          {/* FAQ Sections */}
          <div className="space-y-4">
            {(searchQuery ? filteredFAQs : faqCategories).map((category, index) => (
              <Card key={index}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                </div>
                <div>
                  {category.questions.map((faq, faqIndex) => (
                    <FAQItem key={faqIndex} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {searchQuery && filteredFAQs.length === 0 && (
            <Card className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">No results found</h3>
              <p className="text-sm text-gray-600">Try different keywords or contact support</p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default HelpScreen