import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Card from '../components/Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const SelfAssessmentScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Do you often compare yourself to others?",
      options: ["Yes", "Sometimes", "No"],
      type: "negative",
    },
    {
      id: 2,
      text: "Are you proud of who you are becoming?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 3,
      text: "Do you prioritize your emotional well-being daily?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 4,
      text: "Are you able to set clear boundaries in personal or professional life?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 5,
      text: "Do you feel a sense of purpose in your daily activities?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestionIndex].id, answer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach(ans => {
      const question = questions.find(q => q.id === ans.questionId);
      if (question) {
        if (question.type === "negative") {
          if (ans.answer === "No") score += 1;
          else if (ans.answer === "Sometimes") score += 0.5;
        } else {
          if (ans.answer === "Yes") score += 1;
          else if (ans.answer === "Sometimes") score += 0.5;
        }
      }
    });
    return Math.round((score / questions.length) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return colors.success;
    if (score >= 60) return colors.primary;
    if (score >= 40) return colors.warning;
    return colors.error;
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const scoreColor = getScoreColor(score);
    const scoreLabel = getScoreLabel(score);

    return (
      <LinearGradient colors={colors.backgroundGradient} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Assessment Complete</Text>
          </View>

          <View style={styles.resultsContainer}>
            <Card style={styles.resultsCard}>
              <Text style={styles.resultsTitle}>Your Self-Assessment Score</Text>
              
              <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
                <Text style={[styles.scoreText, { color: scoreColor }]}>{score}%</Text>
              </View>

              <Text style={[styles.scoreLabel, { color: scoreColor }]}>{scoreLabel}</Text>
              
              <Text style={styles.resultsDescription}>
                Based on your answers, this is your current self-reflection score. 
                Regular self-assessment can help track your personal growth journey.
              </Text>

              <View style={styles.resultsButtons}>
                <Button
                  title="Retake Assessment"
                  variant="outline"
                  onPress={resetAssessment}
                  style={styles.retakeButton}
                />
                <Button
                  title="Back to Dashboard"
                  onPress={() => navigation.navigate('Dashboard')}
                  style={styles.dashboardButton}
                />
              </View>
            </Card>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <LinearGradient colors={colors.backgroundGradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Self-Assessment</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card style={styles.questionCard}>
            <Text style={styles.questionCounter}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <Card style={styles.questionContent}>
              <Text style={styles.questionText}>{currentQuestion.text}</Text>

              <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.optionButton}
                    onPress={() => handleAnswer(option)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  backButtonText: {
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  questionCard: {
    marginBottom: spacing.lg,
  },
  questionCounter: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.gray[200],
    borderRadius: 2,
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  questionContent: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  questionText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    fontFamily: typography.fontFamily,
  },
  optionsContainer: {
    width: '100%',
    maxWidth: 250,
  },
  optionButton: {
    backgroundColor: colors.gray[50],
    borderWidth: 2,
    borderColor: colors.border.light,
    borderRadius: 15,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  optionText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  resultsCard: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  resultsTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xl,
    fontFamily: typography.fontFamily,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  scoreText: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  scoreLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  resultsDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
    marginBottom: spacing.xl,
    fontFamily: typography.fontFamily,
  },
  resultsButtons: {
    width: '100%',
  },
  retakeButton: {
    marginBottom: spacing.md,
  },
  dashboardButton: {
    width: '100%',
  },
});

export default SelfAssessmentScreen;