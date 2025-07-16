import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const DashboardScreen = ({ navigation }) => {
  const dashboardItems = [
    {
      title: 'Request Feedback',
      subtitle: '1/5 completed',
      icon: '💬',
      onPress: () => navigation.navigate('RequestFeedback'),
    },
    {
      title: 'Self Assessment',
      subtitle: 'Try it now',
      icon: '📊',
      onPress: () => navigation.navigate('SelfAssessment'),
    },
    {
      title: 'Journal Stories',
      subtitle: 'Write today',
      icon: '📖',
      onPress: () => navigation.navigate('Journal'),
    },
    {
      title: 'Coaches',
      subtitle: 'Find support',
      icon: '👨‍⚕️',
      onPress: () => navigation.navigate('Coaches'),
    },
  ];

  return (
    <LinearGradient colors={colors.backgroundGradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logo}>
                <View style={styles.logoCard1} />
                <View style={styles.logoCard2} />
                <View style={styles.logoStar} />
              </View>
              <Text style={styles.appName}>iMirror</Text>
            </View>

            <View style={styles.welcome}>
              <Text style={styles.welcomeTitle}>Welcome!</Text>
              <Text style={styles.welcomeSubtitle}>What would you like to do today?</Text>
            </View>

            <View style={styles.grid}>
              {dashboardItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.gridItem}
                  onPress={item.onPress}
                  activeOpacity={0.8}
                >
                  <Card style={styles.itemCard}>
                    <View style={styles.gradientLine} />
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>

            <Card style={styles.sessionsCard}>
              <View style={styles.sessionsHeader}>
                <View style={styles.sessionsIcon}>
                  <Text style={styles.sessionsIconText}>⏰</Text>
                </View>
                <View>
                  <Text style={styles.sessionsTitle}>My Sessions</Text>
                  <Text style={styles.sessionsSubtitle}>No upcoming sessions</Text>
                </View>
              </View>
            </Card>

            <Card style={styles.updatesCard}>
              <Text style={styles.updatesTitle}>Updates</Text>
              <View style={styles.updatesContent}>
                <View style={styles.updatesIcon}>
                  <Text style={styles.updatesIconText}>📈</Text>
                </View>
                <Text style={styles.updatesText}>No updates yet</Text>
                <Text style={styles.updatesSubtext}>
                  Complete your first Self-Assessment to track your emotional progress here.
                </Text>
                <TouchableOpacity
                  style={styles.assessmentButton}
                  onPress={() => navigation.navigate('SelfAssessment')}
                >
                  <Text style={styles.assessmentButtonText}>Take Assessment</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    width: 50,
    height: 50,
    position: 'relative',
    marginRight: spacing.sm,
  },
  logoCard1: {
    position: 'absolute',
    width: 25,
    height: 40,
    backgroundColor: colors.primary + '20',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    left: 0,
    top: 3,
  },
  logoCard2: {
    position: 'absolute',
    width: 25,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.secondary,
    right: 0,
    top: 10,
  },
  logoStar: {
    position: 'absolute',
    width: 13,
    height: 13,
    backgroundColor: colors.warning,
    borderRadius: 6.5,
    right: -2,
    top: 0,
  },
  appName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  welcome: {
    marginBottom: spacing.xl,
  },
  welcomeTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  welcomeSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  gridItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
  itemCard: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gradientLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.primary,
  },
  itemIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  itemTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  itemSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  sessionsCard: {
    marginBottom: spacing.lg,
  },
  sessionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  sessionsIconText: {
    fontSize: 20,
  },
  sessionsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  sessionsSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  updatesCard: {
    alignItems: 'center',
  },
  updatesTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily,
  },
  updatesContent: {
    alignItems: 'center',
  },
  updatesIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  updatesIconText: {
    fontSize: 16,
  },
  updatesText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  updatesSubtext: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily,
  },
  assessmentButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  assessmentButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.white,
    fontFamily: typography.fontFamily,
  },
});

export default DashboardScreen;