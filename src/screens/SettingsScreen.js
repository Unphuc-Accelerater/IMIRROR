import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Clear user data and navigate to login
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        },
      ]
    );
  };

  const settingsItems = [
    {
      title: 'Account',
      items: [
        { name: 'Profile', icon: '👤', onPress: () => {} },
        { name: 'Refer a Friend', icon: '👥', onPress: () => {} },
        { name: 'Notifications', icon: '🔔', onPress: () => {} },
      ],
    },
    {
      title: 'More',
      items: [
        { name: 'Rate & Review', icon: '⭐', onPress: () => {} },
        { name: 'Help', icon: '❓', onPress: () => {} },
        { name: 'Privacy Policy', icon: '🔒', onPress: () => {} },
        { name: 'Terms of Service', icon: '📄', onPress: () => {} },
      ],
    },
  ];

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
          <Text style={styles.title}>Settings</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Card style={styles.profileCard}>
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <View style={styles.profileImagePlaceholder}>
                    <Text style={styles.profileImageIcon}>👤</Text>
                  </View>
                  <View style={styles.addPhotoButton}>
                    <Text style={styles.addPhotoButtonText}>+</Text>
                  </View>
                </View>
              </View>

              <Card style={styles.membershipCard}>
                <Text style={styles.membershipTitle}>Premium Membership</Text>
                <Text style={styles.membershipSubtitle}>Upgrade for more features</Text>
              </Card>

              {settingsItems.map((section, sectionIndex) => (
                <View key={sectionIndex} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <View style={styles.sectionItems}>
                    {section.items.map((item, itemIndex) => (
                      <TouchableOpacity
                        key={itemIndex}
                        style={[
                          styles.settingItem,
                          itemIndex === section.items.length - 1 && styles.settingItemLast,
                        ]}
                        onPress={item.onPress}
                        activeOpacity={0.7}
                      >
                        <View style={styles.settingItemLeft}>
                          <Text style={styles.settingItemIcon}>{item.icon}</Text>
                          <Text style={styles.settingItemText}>{item.name}</Text>
                        </View>
                        <Text style={styles.settingItemArrow}>→</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
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
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  profileCard: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageIcon: {
    fontSize: 32,
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButtonText: {
    color: colors.text.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  membershipCard: {
    backgroundColor: colors.primary,
    marginBottom: spacing.lg,
  },
  membershipTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.white,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  membershipSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.white,
    opacity: 0.8,
    fontFamily: typography.fontFamily,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  sectionItems: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  settingItemText: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  settingItemArrow: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  logoutText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
});

export default SettingsScreen;