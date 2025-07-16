import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Star } from 'lucide-react'
import Input from '../components/Input'
import Card from '../components/Card'

const CoachesScreen = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  
  const coaches = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'Clinical Psychologist',
      experience: '12 years exp',
      consultations: '300+',
      type: 'Therapist',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: 2,
      name: 'Coach Mike Johnson',
      specialty: 'Life Coach',
      experience: '8 years exp',
      consultations: '250+',
      type: 'Coach',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: 3,
      name: 'Dr. Emily White',
      specialty: 'Marriage Counselor',
      experience: '15 years exp',
      consultations: '400+',
      type: 'Therapist',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: 4,
      name: 'Coach David Lee',
      specialty: 'Wellness Coach',
      experience: '10 years exp',
      consultations: '350+',
      type: 'Coach',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  ]
  
  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'All' || coach.type === filterType
    return matchesSearch && matchesFilter
  })
  
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-warning text-warning" />)
    }
    
    return stars
  }
  
  return (
    <div className="gradient-bg min-h-screen safe-area-top safe-area-bottom">
      <div className="p-6 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-4"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <h1 className="text-3xl font-bold text-text-white">Coaches</h1>
        </motion.div>
        
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-text-secondary text-center leading-relaxed">
            Connect with experienced therapists and coaches who can guide you on
            your journey to better mental health and personal growth.
          </p>
        </motion.div>
        
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </motion.div>
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-2 mb-6 overflow-x-auto pb-2"
        >
          {['All', 'Therapist', 'Coach'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                filterType === type
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border-primary text-primary hover:bg-primaryLight'
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>
        
        {/* Coaches List */}
        <div className="space-y-4">
          {filteredCoaches.length > 0 ? (
            filteredCoaches.map((coach, index) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="relative">
                  <div className="flex items-center mb-4">
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-primary mb-1">{coach.name}</h3>
                      <p className="text-sm text-text-primary mb-1">{coach.specialty}</p>
                      <div className="flex items-center text-xs text-text-secondary mb-1">
                        <span>{coach.experience}</span>
                        <span className="mx-2">|</span>
                        <span>{coach.consultations} Consultations</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {renderStars(coach.rating)}
                        </div>
                        <span className="text-sm font-bold text-primary">{coach.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="absolute bottom-4 right-4 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primaryDark transition-colors duration-200">
                    Consult
                  </button>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="text-center py-8">
                <p className="text-lg text-text-secondary mb-1">No coaches found</p>
                <p className="text-sm text-text-light">
                  Try a different search or filter.
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoachesScreen