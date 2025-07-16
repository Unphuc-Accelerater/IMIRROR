import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, Star, CreditCard } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const BookSessionScreen = () => {
  const navigate = useNavigate()
  const { coachId } = useParams()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [sessionType, setSessionType] = useState('video')

  const coach = {
    id: coachId,
    name: 'Dr. Sarah Johnson',
    specialty: 'Leadership Coach',
    rating: 4.9,
    price: 150,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  }

  const availableDates = [
    { date: '2024-01-15', day: 'Mon', dayNum: '15' },
    { date: '2024-01-16', day: 'Tue', dayNum: '16' },
    { date: '2024-01-17', day: 'Wed', dayNum: '17' },
    { date: '2024-01-18', day: 'Thu', dayNum: '18' },
    { date: '2024-01-19', day: 'Fri', dayNum: '19' }
  ]

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ]

  const handleBookSession = () => {
    if (selectedDate && selectedTime) {
      navigate('/my-sessions')
    }
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
            <h1 className="text-xl font-semibold text-gray-900">Book Session</h1>
            <div className="w-9" />
          </div>

          {/* Coach Info */}
          <Card className="mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={coach.avatar}
                alt={coach.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{coach.name}</h3>
                <p className="text-sm text-gray-600">{coach.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{coach.rating}</span>
                  <span className="text-lg font-semibold text-blue-600 ml-auto">
                    ${coach.price}/session
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Session Type */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Session Type</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSessionType('video')}
                className={`p-3 rounded-xl border-2 transition-colors ${
                  sessionType === 'video'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">📹</div>
                  <div className="text-sm font-medium">Video Call</div>
                </div>
              </button>
              <button
                onClick={() => setSessionType('phone')}
                className={`p-3 rounded-xl border-2 transition-colors ${
                  sessionType === 'phone'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">📞</div>
                  <div className="text-sm font-medium">Phone Call</div>
                </div>
              </button>
            </div>
          </Card>

          {/* Date Selection */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Select Date
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {availableDates.map((date) => (
                <button
                  key={date.date}
                  onClick={() => setSelectedDate(date.date)}
                  className={`p-3 rounded-xl text-center transition-colors ${
                    selectedDate === date.date
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-xs font-medium">{date.day}</div>
                  <div className="text-lg font-semibold">{date.dayNum}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Time Selection */}
          <Card className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Select Time
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </Card>

          {/* Booking Summary */}
          {selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="mb-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coach:</span>
                    <span className="font-medium">{coach.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{sessionType} Call</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-blue-600">${coach.price}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Book Button */}
          <Button
            onClick={handleBookSession}
            disabled={!selectedDate || !selectedTime}
            className="w-full"
            size="lg"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Book Session - ${coach.price}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default BookSessionScreen