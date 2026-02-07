import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  I18nManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common';
import colors from '../../styles/colors';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>FIT</Text>
          </View>
          <Text style={styles.appName}>אפליקציית כושר</Text>
          <Text style={styles.tagline}>הדרך שלך לחיים בריאים יותר</Text>
        </View>

        <View style={styles.features}>
          <FeatureItem
            icon="barbell-outline"
            text="מעקב אימונים מותאם אישית"
          />
          <FeatureItem
            icon="nutrition-outline"
            text="יומן תזונה ומעקב קלוריות"
          />
          <FeatureItem
            icon="trending-up-outline"
            text="מעקב התקדמות ומשקל"
          />
        </View>

        <View style={styles.buttons}>
          <Button
            title="התחברות"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          />
          <Button
            title="הרשמה"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const FeatureItem = ({ icon, text }) => {
  const { Ionicons } = require('@expo/vector-icons');
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textOnPrimary,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  features: {
    marginVertical: 40,
  },
  featureItem: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: I18nManager.isRTL ? 16 : 0,
    marginRight: I18nManager.isRTL ? 0 : 16,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  buttons: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 12,
  },
});

export default WelcomeScreen;
