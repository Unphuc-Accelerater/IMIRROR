import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input';
import Card from '../components/Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const CoachesScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const coaches = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'Clinical Psychologist',
      experience: '12 years exp',
      consultations: '300+',
      type: 'Therapist',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Coach Mike Johnson',
      specialty: 'Life Coach',
      experience: '8 years exp',
      consultations: '250+',
      type: 'Coach',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'Dr. Emily White',
      specialty: 'Marriage Counselor',
      experience: '15 years exp',
      consultations: '400+',
      type: 'Therapist',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1594824388853-d0c2d8e8e8e8?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 4,
      name: 'Coach David Lee',
      specialty: 'Wellness Coach',
      experience: '10 years exp',
      consultations: '350+',
      type: 'Coach',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
  ];

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || coach.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={i} style={styles.star}>⭐</Text>);
    }

    if (hasHalfStar) {
      stars.push(<Text key="half" style={styles.star}>⭐</Text>);
    }

    return stars;
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
          <Text style={styles.title}>Coaches</Text>
        </View>

        <View style={styles.headerDescription}>
          <Text style={styles.description}>
            Connect with experienced therapists and coaches who can guide you on
            your journey to better mental health and personal growth.
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Input
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {['All', 'Therapist', 'Coach'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                filterType === type && styles.filterButtonActive,
              ]}
              onPress={() => setFilterType(type)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterType === type && styles.filterButtonTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.coachesContainer}>
            {filteredCoaches.length > 0 ? (
              filteredCoaches.map((coach) => (
                <Card key={coach.id} style={styles.coachCard}>
                  <View style={styles.coachContent}>
                    <Image source={{ uri: coach.image }} style={styles.coachImage} />
                    <View style={styles.coachInfo}>
                      <Text style={styles.coachName}>{coach.name}</Text>
                      <Text style={styles.coachSpecialty}>{coach.specialty}</Text>
                      <View style={styles.coachDetails}>
                        <Text style={styles.coachExperience}>{coach.experience}</Text>
                        <Text style={styles.coachSeparator}>|</Text>
                        <Text style={styles.coachConsultations}>{coach.consultations} Consultations</Text>
                      </View>
                      <View style={styles.ratingContainer}>
                        {renderStars(coach.rating)}
                        <Text style={styles.ratingText}>{coach.rating}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.consultButton}>
                    <Text style={styles.consultButtonText}>Consult</Text>
                  </TouchableOpacity>
                </Card>
              ))
            ) : (
              <Card style={styles.emptyState}>
                <Text style={styles.emptyStateTitle}>No coaches found</Text>
                <Text style={styles.emptyStateText}>
                  Try a different search or filter.
                </Text>
              </Card>
            )}
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
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.white,
    fontFamily: typography.fontFamily,
  },
  headerDescription: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    fontFamily: typography.fontFamily,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchInput: {
    marginBottom: 0,
  },
  filterContainer: {
    marginBottom: spacing.lg,
  },
  filterContent: {
    paddingHorizontal: spacing.lg,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.primary,
    backgroundColor: colors.background,
    marginRight: spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  filterButtonTextActive: {
    color: colors.text.white,
  },
  scrollView: {
    flex: 1,
  },
  coachesContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  coachCard: {
    marginBottom: spacing.lg,
    position: 'relative',
  },
  coachContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  coachImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.md,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  coachSpecialty: {
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  coachDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  coachExperience: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  coachSeparator: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    marginHorizontal: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  coachConsultations: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
    marginRight: 2,
  },
  ratingText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginLeft: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  consultButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 25,
  },
  consultButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.white,
    fontFamily: typography.fontFamily,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateTitle: {
    fontSize: typography.sizes.lg,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  emptyStateText: {
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    textAlign: 'center',
    fontFamily: typography.fontFamily,
  },
});

export default CoachesScreen;