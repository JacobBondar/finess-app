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
import { GOALS, GOAL_VALUES } from '../../constants';
import colors from '../../styles/colors';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    weight: '',
    height: '',
    goal: GOAL_VALUES[0],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'נא להזין שם';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'נא להזין אימייל';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין';
    }

    if (!formData.password) {
      newErrors.password = 'נא להזין סיסמה';
    } else if (formData.password.length < 6) {
      newErrors.password = 'הסיסמה חייבת להכיל לפחות 6 תווים';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age ? parseInt(formData.age) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        goal: formData.goal,
      };

      const result = await register(userData);
      if (!result.success) {
        Alert.alert('שגיאה', result.message);
      }
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בהרשמה');
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
            <Text style={styles.title}>יצירת חשבון</Text>
            <Text style={styles.subtitle}>הצטרפו אלינו להתחלה חדשה</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="שם מלא"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="הזינו את שמכם"
              icon="person-outline"
              error={errors.name}
            />

            <Input
              label="אימייל"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              error={errors.email}
            />

            <Input
              label="סיסמה"
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
              placeholder="לפחות 6 תווים"
              secureTextEntry
              icon="lock-closed-outline"
              error={errors.password}
            />

            <Input
              label="אימות סיסמה"
              value={formData.confirmPassword}
              onChangeText={(value) => updateField('confirmPassword', value)}
              placeholder="הזינו שוב את הסיסמה"
              secureTextEntry
              icon="lock-closed-outline"
              error={errors.confirmPassword}
            />

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Input
                  label="גיל"
                  value={formData.age}
                  onChangeText={(value) => updateField('age', value)}
                  placeholder="שנים"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInput}>
                <Input
                  label='משקל (ק"ג)'
                  value={formData.weight}
                  onChangeText={(value) => updateField('weight', value)}
                  placeholder='ק"ג'
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Input
              label="גובה (ס״מ)"
              value={formData.height}
              onChangeText={(value) => updateField('height', value)}
              placeholder="ס״מ"
              keyboardType="numeric"
            />

            <Text style={styles.goalLabel}>מטרה</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.goalsContainer}
            >
              {GOAL_VALUES.map((goal) => (
                <TouchableOpacity
                  key={goal}
                  style={[
                    styles.goalChip,
                    formData.goal === goal && styles.goalChipActive,
                  ]}
                  onPress={() => updateField('goal', goal)}
                >
                  <Text
                    style={[
                      styles.goalChipText,
                      formData.goal === goal && styles.goalChipTextActive,
                    ]}
                  >
                    {goal}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Button
              title="הרשמה"
              onPress={handleRegister}
              loading={isLoading}
              style={styles.registerButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>כבר יש לכם חשבון? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>התחברו</Text>
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
    marginBottom: 24,
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
  row: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    marginHorizontal: -8,
  },
  halfInput: {
    flex: 1,
    paddingHorizontal: 8,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  goalsContainer: {
    marginBottom: 16,
  },
  goalChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  goalChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  goalChipText: {
    fontSize: 14,
    color: colors.text,
  },
  goalChipTextActive: {
    color: colors.textOnPrimary,
    fontWeight: '600',
  },
  registerButton: {
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

export default RegisterScreen;
