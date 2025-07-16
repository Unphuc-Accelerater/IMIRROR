import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Card from '../components/Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const RequestFeedbackScreen = ({ navigation }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { id: 'personal-growth', name: 'Personal Growth', icon: '🌱' },
    { id: 'emotional-intelligence', name: 'Emotional Intelligence', icon: '🧠' },
    { id: 'relationship', name: 'Relationship', icon: '❤️' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧘' },
    { id: 'communication', name: 'Communication', icon: '💬' },
    { id: 'values', name: 'Values', icon: '⭐' },
    { id: 'conflict-resolution', name: 'Conflict Resolution', icon: '🤝' },
    { id: 'romantic', name: 'Romantic', icon: '💕' },
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleSendRequest = () => {
    if (selectedTemplate) {
      // Navigate to specific feedback form or show success
      navigation.goBack();
    }
  };

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
          <Text style={styles.title}>Request Feedback</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Choose a Template</Text>

            <Card style={styles.featuredCard}>
              <View style={styles.featuredIcon}>
                <Text style={styles.featuredIconText}>❤️</Text>
              </View>
              <Text style={styles.featuredTitle}>Personal Growth</Text>
            </Card>

            <View style={styles.templatesGrid}>
              {templates.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={[
                    styles.templateItem,
                    selectedTemplate?.id === template.id && styles.templateItemSelected,
                  ]}
                  onPress={() => handleTemplateSelect(template)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.templateIcon,
                    selectedTemplate?.id === template.id && styles.templateIconSelected,
                  ]}>
                    <Text style={styles.templateIconText}>{template.icon}</Text>
                  </View>
                  <Text style={styles.templateName}>{template.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button
              title="Send Request"
              onPress={handleSendRequest}
              disabled={!selectedTemplate}
              style={styles.sendButton}
            />
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
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  featuredCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    backgroundColor: colors.primaryLight,
  },
  featuredIcon: {
    width: 63,
    height: 63,
    borderRadius: 10,
    backgroundColor: colors.secondary + '45',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featuredIconText: {
    fontSize: 30,
  },
  featuredTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  templateItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  templateIcon: {
    width: 87,
    height: 87,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  templateIconSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  templateIconText: {
    fontSize: 40,
  },
  templateName: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    textAlign: 'center',
    fontFamily: typography.fontFamily,
  },
  templateItemSelected: {
    transform: [{ scale: 1.05 }],
  },
  sendButton: {
    marginTop: spacing.md,
  },
});

export default RequestFeedbackScreen;