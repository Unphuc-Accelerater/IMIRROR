import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react'
import Card from '../components/Card'

const PrivacyPolicyScreen = () => {
  const navigate = useNavigate()

  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information you provide when creating an account',
        'Feedback and assessment responses',
        'Usage data and app interactions',
        'Communication preferences and settings'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'To provide personalized feedback and coaching services',
        'To track your progress and generate insights',
        'To improve our app and services',
        'To send you relevant notifications and updates'
      ]
    },
    {
      title: 'Data Protection',
      icon: Shield,
      content: [
        'All data is encrypted in transit and at rest',
        'We use industry-standard security measures',
        'Regular security audits and updates',
        'Limited access to authorized personnel only'
      ]
    },
    {
      title: 'Your Privacy Rights',
      icon: Lock,
      content: [
        'Access and download your personal data',
        'Request correction of inaccurate information',
        'Delete your account and associated data',
        'Opt-out of non-essential communications'
      ]
    }
  ]

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
            <h1 className="text-xl font-semibold text-gray-900">Privacy Policy</h1>
            <div className="w-9" />
          </div>

          {/* Introduction */}
          <Card className="mb-6">
            <div className="text-center mb-4">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Privacy Matters</h2>
              <p className="text-sm text-gray-600">
                We are committed to protecting your personal information and being transparent about how we use it.
              </p>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Last updated: January 15, 2024
            </div>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <Card key={index}>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>

          {/* Contact Information */}
          <Card className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Contact Us</h3>
            <p className="text-sm text-gray-600 mb-2">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Email: privacy@imirrorapp.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Privacy Street, Data City, DC 12345</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicyScreen