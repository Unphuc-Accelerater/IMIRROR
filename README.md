# iMirror - React Native Mobile App

A mobile application for personal growth and anonymous feedback, built with React Native.

## Features

- **Anonymous Feedback System**: Receive honest feedback from people who know you best
- **Self-Assessment Tools**: Track your emotional and personal growth
- **Journal Integration**: Write and track your daily thoughts and moods
- **Professional Coaches**: Connect with therapists and certified coaches
- **Responsive Design**: Optimized for all mobile screen sizes
- **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **React Native 0.72.6**
- **React Navigation 6+** for navigation
- **React Native Linear Gradient** for beautiful gradients
- **React Native Safe Area Context** for safe area handling
- **React Native Gesture Handler** for smooth gestures
- **React Native Image Picker** for profile image selection

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

4. For Android:
   ```bash
   npm run android
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js
│   ├── Input.js
│   └── Card.js
├── screens/            # App screens
│   ├── SplashScreen.js
│   ├── OnboardingScreen.js
│   ├── LoginScreen.js
│   ├── OTPScreen.js
│   ├── ProfileSetupScreen.js
│   └── DashboardScreen.js
├── styles/             # Style definitions
│   ├── colors.js
│   ├── typography.js
│   └── spacing.js
└── utils/              # Utility functions
```

## Key Features Implemented

### 🎨 Design System
- Consistent color palette with primary, secondary, and accent colors
- Typography system with proper font sizes and weights
- Spacing system using 8px grid
- Reusable components with proper styling

### 📱 Mobile-First Approach
- Responsive layouts that work on all screen sizes
- Touch-friendly buttons and inputs
- Proper keyboard handling
- Safe area support for modern devices

### 🚀 Performance Optimized
- Efficient navigation with React Navigation
- Optimized images and assets
- Smooth animations and transitions
- Proper memory management

### 🔧 Developer Experience
- Clean, modular code structure
- Consistent naming conventions
- Proper error handling
- Easy to extend and maintain

## Screens Overview

1. **Splash Screen**: App introduction with animated logo
2. **Onboarding**: Three-step introduction to app features
3. **Login**: Phone number authentication
4. **OTP Verification**: 4-digit code verification
5. **Profile Setup**: User profile creation with image upload
6. **Dashboard**: Main app interface with feature access
7. **Request Feedback**: Template selection for feedback requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both iOS and Android
5. Submit a pull request

## License

This project is licensed under the MIT License.