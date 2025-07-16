import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const ProfileSetupScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        setProfileImage(response.assets[0]);
      }
    });
  };

  const handleContinue = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Dashboard');
    }, 1000);
  };

  const handleSkip = () => {
    navigation.navigate('Dashboard');
  };

  const isFormValid = profileData.name.trim() && profileData.age && profileData.gender;

  return (
    <LinearGradient colors={colors.backgroundGradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>Set up Profile</Text>

            <Card style={styles.card}>
              <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
                {profileImage ? (
                  <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.cameraIcon}>📷</Text>
                  </View>
                )}
                <View style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.imageLabel}>Profile Picture</Text>

              <View style={styles.form}>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={profileData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                />

                <Input
                  label="Age"
                  placeholder="Enter your age"
                  value={profileData.age}
                  onChangeText={(value) => handleInputChange('age', value)}
                  keyboardType="number-pad"
                />

                <View style={styles.genderContainer}>
                  <Text style={styles.genderLabel}>Gender</Text>
                  <View style={styles.genderOptions}>
                    {['Male', 'Female', 'Other'].map((gender) => (
                      <TouchableOpacity
                        key={gender}
                        style={[
                          styles.genderOption,
                          profileData.gender === gender && styles.genderOptionSelected,
                        ]}
                        onPress={() => handleInputChange('gender', gender)}
                      >
                        <Text
                          style={[
                            styles.genderOptionText,
                            profileData.gender === gender && styles.genderOptionTextSelected,
                          ]}
                        >
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <Input
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChangeText={(value) => handleInputChange('bio', value)}
                  multiline
                  numberOfLines={4}
                />

                <Button
                  title="Continue"
                  onPress={handleContinue}
                  disabled={!isFormValid}
                  loading={isLoading}
                  style={styles.continueButton}
                />

                <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                  <Text style={styles.skipText}>Skip</Text>
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
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  card: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  imageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 40,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.text.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  imageLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  form: {
    width: '100%',
  },
  genderContainer: {
    marginBottom: spacing.md,
  },
  genderLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    backgroundColor: colors.gray[50],
  },
  genderOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  genderOptionText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  genderOptionTextSelected: {
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  continueButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  skipButton: {
    alignItems: 'center',
  },
  skipText: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
});

export default ProfileSetupScreen;