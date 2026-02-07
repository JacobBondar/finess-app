import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  I18nManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../../components/common';
import colors from '../../styles/colors';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'נא להזין אימייל';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'אימייל לא תקין';
    }

    if (!password) {
      newErrors.password = 'נא להזין סיסמה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        Alert.alert('שגיאה', result.message);
      }
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בהתחברות');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>ברוכים השבים!</Text>
            <Text style={styles.subtitle}>התחברו כדי להמשיך</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="אימייל"
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              error={errors.email}
            />

            <Input
              label="סיסמה"
              value={password}
              onChangeText={setPassword}
              placeholder="הזינו סיסמה"
              secureTextEntry
              icon="lock-closed-outline"
              error={errors.password}
            />

            <Button
              title="התחברות"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>אין לכם חשבון? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>הירשמו עכשיו</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  form: {
    flex: 1,
  },
  loginButton: {
    marginTop: 16,
  },
  footer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
