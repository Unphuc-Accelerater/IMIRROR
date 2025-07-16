import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (phoneNumber.length !== 10) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('OTP', { phoneNumber });
    }, 1000);
  };

  const isValidPhone = phoneNumber.length === 10;

  return (
    <LinearGradient colors={colors.backgroundGradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <Card style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Log in to your account</Text>
              </View>

              <View style={styles.form}>
                <View style={styles.phoneInputContainer}>
                  <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+91</Text>
                  </View>
                  <Input
                    placeholder="Mobile number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    style={styles.phoneInput}
                    inputStyle={styles.phoneInputField}
                  />
                </View>

                <Text style={styles.disclaimer}>
                  You will receive an SMS verification that may apply message and data rates.
                </Text>

                <Button
                  title="Continue"
                  onPress={handleContinue}
                  disabled={!isValidPhone}
                  loading={isLoading}
                  style={styles.continueButton}
                />

                <Text style={styles.terms}>
                  By continuing, you agree to our{' '}
                  <Text style={styles.link}>Terms of Service</Text> and{' '}
                  <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
              </View>
            </Card>
          </View>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    paddingVertical: spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  form: {
    width: '100%',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  countryCode: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 12,
    backgroundColor: colors.gray[50],
    marginRight: spacing.sm,
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  phoneInput: {
    flex: 1,
    marginBottom: 0,
  },
  phoneInputField: {
    marginBottom: 0,
  },
  disclaimer: {
    fontSize: typography.sizes.xs,
    color: colors.text.light,
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  continueButton: {
    marginBottom: spacing.md,
  },
  terms: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    textAlign: 'center',
    fontFamily: typography.fontFamily,
  },
  link: {
    color: colors.primary,
  },
});

export default LoginScreen;