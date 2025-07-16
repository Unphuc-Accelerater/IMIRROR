import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Calendar, MessageCircle, Award, Clock } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const CoachProfileScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('about')
  
  // Mock coach data - in real app, fetch based on id
  const coach = {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'Clinical Psychologist',
    specialty: 'Anxiety & Depression',
    experience: '12 years',
    consultations: '300+',
    rating: 4.8,
    reviews: 127,
    price: '$80/session',
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    about: 'Dr. Sarah Chen is a licensed clinical psychologist with over 12 years of experience helping individuals overcome anxiety, depression, and life transitions. She specializes in cognitive-behavioral therapy and mindfulness-based interventions.',
    education: [
      'Ph.D. in Clinical Psychology - Stanford University',
      'M.A. in Psychology - UC Berkeley',
      'B.A. in Psychology - UCLA'
    ],
    certifications: [
      'Licensed Clinical Psychologist (CA)',
      'Certified CBT Therapist',
      'Mindfulness-Based Stress Reduction (MBSR)'
    ],
    languages: ['English', 'Mandarin', 'Spanish'],
    availability: [
      'Monday: 9:00 AM - 5:00 PM',
      'Tuesday: 9:00 AM - 5:00 PM',
      'Wednesday: 9:00 AM - 3:00 PM',
      'Thursday: 9:00 AM - 5:00 PM',
      'Friday: 9:00 AM - 3:00 PM'
    ]
  }
  
  const reviews = [
    {
      id: 1,
      author: 'Anonymous',
      rating: 5,
      date: '2024-01-10',
      comment: 'Dr. Chen is incredibly empathetic and professional. She helped me work through my anxiety with practical tools I still use today.'
    },
    {
      id: 2,
      author: 'Anonymous',
      rating: 5,
      date: '2024-01-05',
      comment: 'Excellent therapist. Very knowledgeable and creates a safe space for discussion. Highly recommend!'
    },
    {
      id: 3,
      author: 'Anonymous',
      rating: 4,
      date: '2023-12-28',
      comment: 'Great experience overall. Dr. Chen is patient and understanding. The sessions were very helpful.'
    }
  ]
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-warning text-warning' : 'text-gray-300'
        }`}
      />
    ))
  }
  
  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'availability', label: 'Availability' }
  ]
  
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
            onClick={() => navigate('/coaches')}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Coach Profile</h1>
        </motion.div>
        
        {/* Coach Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-start mb-4">
              <img
                src={coach.image}
                alt={coach.name}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-text-primary mb-1">{coach.name}</h2>
                <p className="text-base text-primary font-medium mb-1">{coach.title}</p>
                <p className="text-sm text-text-secondary mb-2">{coach.specialty}</p>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderStars(Math.floor(coach.rating))}
                  </div>
                  <span className="text-sm font-bold text-primary mr-1">{coach.rating}</span>
                  <span className="text-sm text-text-secondary">({coach.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{coach.experience} experience</span>
                  <span className="mx-2">•</span>
                  <span>{coach.consultations} sessions</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">{coach.price}</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/book-session/${coach.id}`)}
                  size="small"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
                <Button
                  variant="outline"
                  size="small"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'about' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-bold text-text-primary mb-3">About</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {coach.about}
                </p>
                <div className="flex flex-wrap gap-2">
                  {coach.languages.map((language) => (
                    <span
                      key={language}
                      className="bg-primaryLight text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </Card>
              
              <Card>
                <h3 className="text-lg font-bold text-text-primary mb-3">Education</h3>
                <div className="space-y-2">
                  {coach.education.map((edu, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-text-secondary">{edu}</p>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card>
                <h3 className="text-lg font-bold text-text-primary mb-3">Certifications</h3>
                <div className="space-y-2">
                  {coach.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <p className="text-sm text-text-secondary">{cert}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primaryLight rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-primary">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{review.author}</p>
                        <p className="text-xs text-text-secondary">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {review.comment}
                  </p>
                </Card>
              ))}
            </div>
          )}
          
          {activeTab === 'availability' && (
            <Card>
              <h3 className="text-lg font-bold text-text-primary mb-4">Weekly Schedule</h3>
              <div className="space-y-3">
                {coach.availability.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm font-medium text-text-primary">
                      {slot.split(':')[0]}
                    </span>
                    <span className="text-sm text-text-secondary">
                      {slot.split(': ')[1]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-primaryLight rounded-lg">
                <p className="text-sm text-primary">
                  <strong>Note:</strong> All times are in Pacific Standard Time (PST). 
                  Sessions can be scheduled up to 2 weeks in advance.
                </p>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CoachProfileScreen