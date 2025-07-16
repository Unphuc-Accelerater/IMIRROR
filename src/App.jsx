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
import JournalScreen from './screens/JournalScreen'
import JournalEntryScreen from './screens/JournalEntryScreen'
import SelfAssessmentScreen from './screens/SelfAssessmentScreen'
import AssessmentResultsScreen from './screens/AssessmentResultsScreen'
import CoachesScreen from './screens/CoachesScreen'
import CoachProfileScreen from './screens/CoachProfileScreen'
import BookSessionScreen from './screens/BookSessionScreen'
import MySessionsScreen from './screens/MySessionsScreen'
import ChatScreen from './screens/ChatScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import ProfileScreen from './screens/ProfileScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import SettingsScreen from './screens/SettingsScreen'
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen'
import TermsOfServiceScreen from './screens/TermsOfServiceScreen'
import HelpScreen from './screens/HelpScreen'
import FeedbackHistoryScreen from './screens/FeedbackHistoryScreen'
import ProgressTrackingScreen from './screens/ProgressTrackingScreen'
import GoalsScreen from './screens/GoalsScreen'
import CreateGoalScreen from './screens/CreateGoalScreen'
import AchievementsScreen from './screens/AchievementsScreen'
import InsightsScreen from './screens/InsightsScreen'
import ReportsScreen from './screens/ReportsScreen'

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
          
          {/* Main App Flow */}
          <Route path="/dashboard" element={<DashboardScreen />} />
          
          {/* Feedback Flow */}
          <Route path="/request-feedback" element={<RequestFeedbackScreen />} />
          <Route path="/feedback-templates" element={<FeedbackTemplatesScreen />} />
          <Route path="/send-feedback" element={<SendFeedbackScreen />} />
          <Route path="/feedback-responses" element={<FeedbackResponsesScreen />} />
          <Route path="/feedback-history" element={<FeedbackHistoryScreen />} />
          
          {/* Journal Flow */}
          <Route path="/journal" element={<JournalScreen />} />
          <Route path="/journal-entry" element={<JournalEntryScreen />} />
          
          {/* Assessment Flow */}
          <Route path="/self-assessment" element={<SelfAssessmentScreen />} />
          <Route path="/assessment-results" element={<AssessmentResultsScreen />} />
          
          {/* Coaches Flow */}
          <Route path="/coaches" element={<CoachesScreen />} />
          <Route path="/coach-profile/:id" element={<CoachProfileScreen />} />
          <Route path="/book-session/:coachId" element={<BookSessionScreen />} />
          <Route path="/my-sessions" element={<MySessionsScreen />} />
          <Route path="/chat/:sessionId" element={<ChatScreen />} />
          
          {/* Progress & Goals */}
          <Route path="/progress" element={<ProgressTrackingScreen />} />
          <Route path="/goals" element={<GoalsScreen />} />
          <Route path="/create-goal" element={<CreateGoalScreen />} />
          <Route path="/achievements" element={<AchievementsScreen />} />
          <Route path="/insights" element={<InsightsScreen />} />
          <Route path="/reports" element={<ReportsScreen />} />
          
          {/* Profile & Settings */}
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/edit-profile" element={<EditProfileScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          
          {/* Legal & Support */}
          <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
          <Route path="/terms-of-service" element={<TermsOfServiceScreen />} />
          <Route path="/help" element={<HelpScreen />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App