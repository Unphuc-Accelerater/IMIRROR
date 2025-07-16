import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Users, AlertTriangle, Scale } from 'lucide-react'
import Card from '../components/Card'

const TermsOfServiceScreen = () => {
  const navigate = useNavigate()

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        'By using iMirror, you agree to these Terms of Service',
        'These terms apply to all users of the application',
        'We may update these terms from time to time',
        'Continued use constitutes acceptance of updated terms'
      ]
    },
    {
      title: 'User Responsibilities',
      icon: Users,
      content: [
        'Provide accurate and truthful information',
        'Maintain the confidentiality of your account',
        'Use the service in accordance with applicable laws',
        'Respect other users and provide constructive feedback'
      ]
    },
    {
      title: 'Prohibited Activities',
      icon: AlertTriangle,
      content: [
        'Harassment, abuse, or inappropriate behavior',
        'Sharing false or misleading information',
        'Attempting to access unauthorized areas',
        'Using the service for commercial purposes without permission'
      ]
    },
    {
      title: 'Limitation of Liability',
      icon: Scale,
      content: [
        'Service is provided "as is" without warranties',
        'We are not liable for indirect or consequential damages',
        'Our liability is limited to the amount paid for services',
        'Users are responsible for their own decisions and actions'
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
            <h1 className="text-xl font-semibold text-gray-900">Terms of Service</h1>
            <div className="w-9" />
          </div>

          {/* Introduction */}
          <Card className="mb-6">
            <div className="text-center mb-4">
              <Scale className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Terms & Conditions</h2>
              <p className="text-sm text-gray-600">
                Please read these terms carefully before using our service.
              </p>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Effective date: January 15, 2024
            </div>
          </Card>

          {/* Terms Sections */}
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

          {/* Additional Terms */}
          <Card className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Additional Information</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>Termination:</strong> We reserve the right to terminate accounts that violate these terms.
              </p>
              <p>
                <strong>Governing Law:</strong> These terms are governed by the laws of the jurisdiction where our company is incorporated.
              </p>
              <p>
                <strong>Changes to Service:</strong> We may modify or discontinue features with reasonable notice.
              </p>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Questions?</h3>
            <p className="text-sm text-gray-600 mb-2">
              If you have questions about these Terms of Service, contact us:
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Email: legal@imirrorapp.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfServiceScreen