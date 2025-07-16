import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <View style={styles.logoCard1} />
            <View style={styles.logoCard2} />
            <View style={styles.logoStar} />
          </View>
        </View>
        <Text style={styles.title}>iMirror</Text>
        <Text style={styles.subtitle}>Know yourself from who knows you best!</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.xl,
  },
  logo: {
    width: 100,
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCard1: {
    position: 'absolute',
    width: 50,
    height: 80,
    backgroundColor: colors.primary + '20',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.primary,
    left: 0,
    top: 6,
  },
  logoCard2: {
    position: 'absolute',
    width: 50,
    height: 80,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.secondary,
    right: 0,
    top: 21,
  },
  logoStar: {
    position: 'absolute',
    width: 26,
    height: 26,
    backgroundColor: colors.warning,
    borderRadius: 13,
    right: -5,
    top: 0,
  },
  title: {
    fontSize: typography.sizes['6xl'],
    fontWeight: typography.weights.normal,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    fontFamily: typography.fontFamily,
    lineHeight: typography.sizes.base * typography.lineHeights.normal,
  },
});

export default SplashScreen;