import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Share, Calendar, FileText, BarChart3, TrendingUp } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const ReportsScreen = () => {
  const navigate = useNavigate()
  const [selectedReport, setSelectedReport] = useState('overview')

  const reportTypes = [
    { id: 'overview', name: 'Overview Report', icon: BarChart3 },
    { id: 'skills', name: 'Skills Analysis', icon: TrendingUp },
    { id: 'feedback', name: 'Feedback Summary', icon: FileText },
    { id: 'goals', name: 'Goals Progress', icon: Calendar }
  ]

  const reportData = {
    overview: {
      title: 'Personal Development Overview',
      period: 'January 2024',
      sections: [
        {
          title: 'Key Metrics',
          data: [
            { label: 'Total Feedback Received', value: '24' },
            { label: 'Average Rating', value: '4.3/5.0' },
            { label: 'Goals Completed', value: '2/3' },
            { label: 'Coaching Sessions', value: '5' }
          ]
        },
        {
          title: 'Top Performing Areas',
          data: [
            { label: 'Communication', value: '85%' },
            { label: 'Teamwork', value: '82%' },
            { label: 'Leadership', value: '78%' },
            { label: 'Problem Solving', value: '76%' }
          ]
        },
        {
          title: 'Improvement Opportunities',
          data: [
            { label: 'Public Speaking', value: '65%' },
            { label: 'Delegation', value: '70%' }
          ]
        }
      ]
    },
    skills: {
      title: 'Skills Development Analysis',
      period: 'January 2024',
      sections: [
        {
          title: 'Skill Progression',
          data: [
            { label: 'Leadership Skills', value: '+5% this month' },
            { label: 'Communication', value: '+3% this month' },
            { label: 'Technical Skills', value: '+8% this month' },
            { label: 'Time Management', value: '+2% this month' }
          ]
        },
        {
          title: 'Peer Comparisons',
          data: [
            { label: 'Above Average Skills', value: '6/8' },
            { label: 'Industry Percentile', value: '78th' },
            { label: 'Team Ranking', value: '3rd of 12' }
          ]
        }
      ]
    }
  }

  const currentReport = reportData[selectedReport] || reportData.overview

  const ReportSection = ({ section }) => (
    <Card className="mb-4">
      <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
      <div className="space-y-2">
        {section.data.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )

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
            <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
            <div className="w-9" />
          </div>

          {/* Report Type Selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {reportTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                    selectedReport === type.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mx-auto mb-1" />
                  {type.name}
                </button>
              )
            })}
          </div>

          {/* Report Header */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{currentReport.title}</h2>
                <p className="text-sm text-gray-600">{currentReport.period}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                  <Share className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button size="sm" variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share Report
              </Button>
            </div>
          </Card>

          {/* Report Content */}
          <div>
            {currentReport.sections.map((section, index) => (
              <ReportSection key={index} section={section} />
            ))}
          </div>

          {/* Report Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-3">Summary & Recommendations</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Continue focusing on leadership development - showing strong progress</p>
              <p>• Consider additional public speaking practice to boost confidence</p>
              <p>• Maintain current momentum in team collaboration efforts</p>
              <p>• Schedule regular coaching sessions to accelerate growth</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ReportsScreen