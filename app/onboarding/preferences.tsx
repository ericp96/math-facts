import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Switch } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { View } from '../../components/library/Themed';
import InlineTitle from '../../components/library/InlineTitle';
import { MonoText } from '../../components/library/StyledText';
import Button from '../../components/library/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { Slider } from '@react-native-assets/slider';

export default function OnboardingPreferences() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [showTimer, setShowTimer] = useState(true);
  const [examTime, setExamTime] = useState(60);

  const handleNext = () => {
    router.push({
      pathname: '/onboarding/operators',
      params: { 
        name,
        showTimer: showTimer.toString(),
        examTime: examTime.toString()
      }
    });
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
              Step 2 of 4
            </MonoText>
          </View>

          <InlineTitle style={styles.title} lightColor="#855797" darkColor="#855797">
            How do you like to practice?
          </InlineTitle>
          
          <MonoText style={styles.context} lightColor="#000" darkColor="#000">
            You can change these settings anytime
          </MonoText>

          <View style={styles.settingContainer}>
            <View style={styles.settingRow}>
              <MonoText style={styles.settingLabel} lightColor="#000" darkColor="#000">
                Show timer during practice
              </MonoText>
              <Switch
                value={showTimer}
                onValueChange={setShowTimer}
                color="#855797"
              />
            </View>

            <View style={styles.settingSection}>
              <MonoText style={styles.settingLabel} lightColor="#000" darkColor="#000">
                Exam time: {examTime} seconds
              </MonoText>
              <Slider
                style={styles.slider}
                value={examTime}
                onValueChange={setExamTime}
                min={30}
                max={300}
                step={30}
                trackStyle={{ backgroundColor: '#ccc' }}
                selectedTrackStyle={{ backgroundColor: '#855797' }}
                thumbStyle={{ backgroundColor: '#855797' }}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={handleNext} style={styles.button}>
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
  settingContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingSection: {
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '70%',
  },
});