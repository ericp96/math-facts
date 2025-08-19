import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { View } from '../../components/library/Themed';
import InlineTitle from '../../components/library/InlineTitle';
import { MonoText } from '../../components/library/StyledText';
import Button from '../../components/library/Button';
import { router } from 'expo-router';

export default function OnboardingProfile() {
  const [name, setName] = useState('');

  const handleNext = () => {
    if (name.trim()) {
      // Store name temporarily - we'll save it in the final step
      router.push({
        pathname: '/onboarding/preferences',
        params: { name: name.trim() }
      });
    }
  };

  return (
    // @ts-expect-error
    <LottieView
      style={styles.container}
      source={require('../../assets/images/background-lottie.json')}
      autoPlay
      loop
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.progressContainer}>
            <MonoText style={styles.progress} lightColor="#855797" darkColor="#855797">
              Step 1 of 4
            </MonoText>
          </View>

          <InlineTitle style={styles.title} lightColor="#855797" darkColor="#855797">
            What's your name?
          </InlineTitle>
          
          <MonoText style={styles.context} lightColor="#000" darkColor="#000">
            We'll use this to track your progress and customize your experience
          </MonoText>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            autoCapitalize="words"
            autoFocus
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleNext}
              style={[styles.button, !name.trim() && styles.buttonDisabled]}
            >
              <MonoText lightColor="#855797" darkColor="#855797">
                Next
              </MonoText>
            </Button>
          </View>
        </View>
      </ScrollView>
    </LottieView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  progressContainer: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
  },
  progress: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  context: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  input: {
    width: '80%',
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '70%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});