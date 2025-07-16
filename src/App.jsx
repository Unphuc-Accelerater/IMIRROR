import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import OTPScreen from './screens/OTPScreen'
import ProfileSetupScreen from './screens/ProfileSetupScreen'
import DashboardScreen from './screens/DashboardScreen'
import RequestFeedbackScreen from './screens/RequestFeedbackScreen'
import JournalScreen from './screens/JournalScreen'
import SelfAssessmentScreen from './screens/SelfAssessmentScreen'
import CoachesScreen from './screens/CoachesScreen'
import SettingsScreen from './screens/SettingsScreen'

function App() {
  return (
    <Router>
      <div className="mobile-container">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/otp" element={<OTPScreen />} />
          <Route path="/profile-setup" element={<ProfileSetupScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/request-feedback" element={<RequestFeedbackScreen />} />
          <Route path="/journal" element={<JournalScreen />} />
          <Route path="/self-assessment" element={<SelfAssessmentScreen />} />
          <Route path="/coaches" element={<CoachesScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App