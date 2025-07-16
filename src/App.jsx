import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import OTPScreen from './screens/OTPScreen'
import ProfileSetupScreen from './screens/ProfileSetupScreen'
import DashboardScreen from './screens/DashboardScreen'
import RequestFeedbackScreen from './screens/RequestFeedbackScreen'
import FeedbackTemplatesScreen from './screens/FeedbackTemplatesScreen'
import SendFeedbackScreen from './screens/SendFeedbackScreen'
import FeedbackResponsesScreen from './screens/FeedbackResponsesScreen'
import FeedbackHistoryScreen from './screens/FeedbackHistoryScreen'
import JournalScreen from './screens/JournalScreen'
import JournalEntryScreen from './screens/JournalEntryScreen'
import SelfAssessmentScreen from './screens/SelfAssessmentScreen'
import AssessmentResultsScreen from './screens/AssessmentResultsScreen'
import CoachesScreen from './screens/CoachesScreen'
import CoachProfileScreen from './screens/CoachProfileScreen'
import BookSessionScreen from './screens/BookSessionScreen'
import MySessionsScreen from './screens/MySessionsScreen'
import ChatScreen from './screens/ChatScreen'
import ProgressTrackingScreen from './screens/ProgressTrackingScreen'
import GoalsScreen from './screens/GoalsScreen'
import CreateGoalScreen from './screens/CreateGoalScreen'
import AchievementsScreen from './screens/AchievementsScreen'
import InsightsScreen from './screens/InsightsScreen'
import ReportsScreen from './screens/ReportsScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import ProfileScreen from './screens/ProfileScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import SettingsScreen from './screens/SettingsScreen'
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen'
import TermsOfServiceScreen from './screens/TermsOfServiceScreen'
import HelpScreen from './screens/HelpScreen'
import BottomNavigation from './components/BottomNavigation'

function App() {
  return (
    <Router>
      <div className="mobile-container">
        <Routes>
          {/* Authentication Flow */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/otp" element={<OTPScreen />} />
          <Route path="/profile-setup" element={<ProfileSetupScreen />} />
          
          {/* Main App Flow with Bottom Navigation */}
          <Route path="/dashboard" element={<><DashboardScreen /><BottomNavigation /></>} />
          
          {/* Feedback Flow */}
          <Route path="/request-feedback" element={<><RequestFeedbackScreen /><BottomNavigation /></>} />
          <Route path="/feedback-templates" element={<><FeedbackTemplatesScreen /><BottomNavigation /></>} />
          <Route path="/send-feedback" element={<><SendFeedbackScreen /><BottomNavigation /></>} />
          <Route path="/feedback-responses" element={<><FeedbackResponsesScreen /><BottomNavigation /></>} />
          <Route path="/feedback-history" element={<><FeedbackHistoryScreen /><BottomNavigation /></>} />
          
          {/* Journal Flow */}
          <Route path="/journal" element={<><JournalScreen /><BottomNavigation /></>} />
          <Route path="/journal-entry" element={<><JournalEntryScreen /><BottomNavigation /></>} />
          
          {/* Assessment Flow */}
          <Route path="/self-assessment" element={<><SelfAssessmentScreen /><BottomNavigation /></>} />
          <Route path="/assessment-results" element={<><AssessmentResultsScreen /><BottomNavigation /></>} />
          
          {/* Coaches Flow */}
          <Route path="/coaches" element={<><CoachesScreen /><BottomNavigation /></>} />
          <Route path="/coach-profile/:id" element={<><CoachProfileScreen /><BottomNavigation /></>} />
          <Route path="/book-session/:coachId" element={<><BookSessionScreen /><BottomNavigation /></>} />
          <Route path="/my-sessions" element={<><MySessionsScreen /><BottomNavigation /></>} />
          <Route path="/chat/:sessionId" element={<ChatScreen />} />
          
          {/* Progress & Goals */}
          <Route path="/progress" element={<><ProgressTrackingScreen /><BottomNavigation /></>} />
          <Route path="/goals" element={<><GoalsScreen /><BottomNavigation /></>} />
          <Route path="/create-goal" element={<><CreateGoalScreen /><BottomNavigation /></>} />
          <Route path="/achievements" element={<><AchievementsScreen /><BottomNavigation /></>} />
          <Route path="/insights" element={<><InsightsScreen /><BottomNavigation /></>} />
          <Route path="/reports" element={<><ReportsScreen /><BottomNavigation /></>} />
          
          {/* Profile & Settings */}
          <Route path="/profile" element={<><ProfileScreen /><BottomNavigation /></>} />
          <Route path="/edit-profile" element={<><EditProfileScreen /><BottomNavigation /></>} />
          <Route path="/notifications" element={<><NotificationsScreen /><BottomNavigation /></>} />
          <Route path="/settings" element={<><SettingsScreen /><BottomNavigation /></>} />
          
          {/* Legal & Support */}
          <Route path="/privacy-policy" element={<><PrivacyPolicyScreen /><BottomNavigation /></>} />
          <Route path="/terms-of-service" element={<><TermsOfServiceScreen /><BottomNavigation /></>} />
          <Route path="/help" element={<><HelpScreen /><BottomNavigation /></>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App